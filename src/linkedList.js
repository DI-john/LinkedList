import { throwsOnFalse, throwsOnTrue, accumulatesMatches } from './util';

// Double, circular, linked list in module pattern
function LinkedList(initialData = []) {
  let head = null
  let tail = null
  let length = 0

  if(initialData.length > 0) {
    initialData.forEach( value => append(value) );
  }

  function createNode(payload, prev, next) {
    return { payload, prev, next }
  }

  function createHead(payload) {
    head = createNode(payload);
    tail = head;
    head.next = head;
    head.prev = head;
    length = 1;
  }

  function append(payload) {
    if(!head) {
      createHead(payload);
      return true;
    }

    let newNode = createNode(payload, tail, head);
    tail.next = newNode;
    tail = newNode;
    head.prev = tail;
    length++;

    return true;
  }

  function prepend(payload) {
    if(!head) {
      createHead(payload);
      return true;
    }

    let newNode = createNode(payload, tail, head);
    head.prev = newNode;
    head = newNode;
    tail.next = head;
    length++;

    return true;
  }

  function at(targetIndex) {
    let curNode, curIndex, indexDelta, direction;

    if(!Number.isInteger(targetIndex)) {
      throw new Error('Index must be an integer.');
    }
    if(length == 0) {
      throw new Error('The linked list is empty.');
    }

    if(targetIndex < 0 || targetIndex > length - 1) {
      throw new Error('The index is out of range.');
    }

    if(targetIndex < length / 2) {
      curNode = head;
      curIndex = 0;
      direction = 'next';
      indexDelta = 1;
    } else {
      curNode = tail;
      curIndex = length - 1;
      direction = 'prev';
      indexDelta = -1;
    }

    while(true) {
       if(curIndex == targetIndex) {
         return curNode;
       }

       curIndex += indexDelta;
       curNode = curNode[direction];
    }
  }

  function replaceAt(index, newPayload) {
    let targetNode = at(index);
    let oldPayload = targetNode.payload;
    targetNode.payload = newPayload;
    return oldPayload;
  }

  function insertAt(index, payload) {
    let targetNode = at(index);
    let newNode = createNode(payload, targetNode.prev, targetNode);
    targetNode.prev.next = newNode;
    targetNode.prev = newNode;

    if(index == 0) {
      head = newNode;
    }

    length++;

    return true;
  }

  function removeAt(index) {
    let targetNode = at(index);

    targetNode.prev.next = targetNode.next
    targetNode.next.prev = targetNode.prev

    // handle head removal
    if(index == 0) {
      head = targetNode.next
    }

    // handle tail removal
    if(index == length - 1) {
      tail = targetNode.prev
    }

    if(--length == 0) {
      head = null;
      tail = null;
    }

    return targetNode.payload;
  }

  function pop() {
    return removeAt(length - 1);
  }

  function shift() {
    return removeAt(0);
  }

  function toArray() {
    if(length == 0) {
      return [];
    }

    let current = head;
    let retVal = [];
    do {
      retVal.push(current.payload)
      current = current.next
    } while(current != head)

    return retVal;
  }

  function doForEach(cbFn, thisArg, startNode, direction) {
    if(length == 0) { return; }

    let curNode = startNode;
    do {
      cbFn.call(thisArg, curNode.payload);
      curNode = curNode[direction];
    } while(curNode !== startNode)
  }

  function forEach(cbFn, thisArg) {
    doForEach(cbFn, thisArg, head, 'next');
  }

  function forEachRev(cbFn, thisArg) {
    doForEach(cbFn, thisArg, tail, 'prev');
  }

  function find(cbFn, thisArg) {
    const wrappedCbFn = throwsOnTrue(cbFn, thisArg);

    try {
      forEach(wrappedCbFn, thisArg);
    } catch (match) {
      return match;
    }
  }

  function filter(cbFn, thisArg) {
    const matches = [];
    const wrappedCbFn = accumulatesMatches(cbFn, thisArg, matches);

    forEach(wrappedCbFn, thisArg);

    return matches;
  }

  function every(cbFn, thisArg) {
    const wrappedCbFn = throwsOnFalse(cbFn, thisArg);

    try {
      forEach(wrappedCbFn, thisArg);
    } catch (_e) {
      return false;
    }

    return true;
  }

  function some(cbFn, thisArg) {
    const wrappedCbFn = throwsOnTrue(cbFn, thisArg);

    try {
      forEach(wrappedCbFn, thisArg);
    } catch (_e) {
      return true;
    }

    return false;
  }

  function traverse(opts = {}) {
    const defaults = {
      startIndex: 0
    };

    const config = Object.assign({}, defaults, opts);

    const startNode = (config.startIndex == 0) ? head : at(config.startIndex);
    let curNode = null;

    function pickN(n = 1, direction) {
      if(!Number.isInteger(n)) {
        throw new Error('Number of items must be an integer.');
      }

      if(n <= 0) {
        throw new Error("Number of items must be greater than 0.")
      }

      if(!curNode) {
        curNode = (direction == 'next') ? startNode.prev : startNode;
      }

      const retVal = [];

      let cnt = 0;
      while(cnt++ < n) {
        curNode = curNode[direction];
        retVal.push(curNode.payload);
      }

     return (retVal.length == 1) ? retVal[0] : retVal;
    }

    function next(n = 1) {
      return pickN(n, 'next');
    }

    function prev(n = 1) {
      return pickN(n, 'prev');
    }

    return { next, prev }
  }

  return {
    // inspecting / retrieving
    getLength: () => length,
    at: (index) => at(index).payload,
    first: () => at(0).payload,
    last: () => at(Math.max(length - 1, 0)).payload,
    toArray,

    // adding / removing
    append,
    prepend,
    replaceAt,
    insertAt,
    removeAt,
    pop,
    shift,

    // higher-order methods
    forEach,
    forEachRev,
    find,
    filter,
    every,
    some,

    // circular methods
    traverse,
  };
}

export {LinkedList as default};
