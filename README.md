# LinkedList
A circular, doubly-linked list with some helpful methods.

## Instantiation

as an empty list:

```javascript
const emptyList = LinkedList();
```

or with some initial values:
```javascript
const listWithInitialValues = LinkedList([1, 2, 3, 4, 5]);
```
## Methods

***For inspecting and retrieving:***

### linkedList.getLength()
Retrieve the current list length

#### Return value
* number of items in the list
```javascript 
  let currentLength = listInstance.getLength();
```

---

### linkedList.at(index)
Retrieve a specific list item 

#### Parameters
  * **index** - zero-based index of item to retrieve
#### Return value
  * **value of item at supplied index**
```javascript
  let value = listInstance.at(3);
```

---

### linkedList.first()
Retrieve the first list item

#### Return value
  * **value of item at head of list**
```javascript
  let firstValue = listInstance.first();
```

---

### linkedList.last()
Retrieve the last list item 

#### Return value
  * **value of item at tail of list**
```javascript
  let lastValue = listInstance.last();
```

---

### linkedList.toArray()
Convert the list into an array 

#### Return value
  * **an array containing all list items in order**
```javascript
  let asArray = listInstance.toArray();
```
---

***For adding and removing:***

### linkedList.append(value)
Add a value to the end of the list

#### Parameters
  * **value** - value to add to end of list
```javascript
 listInstance.append(3);
```

---

### linkedList.prepend(value)
Add a value to the beginning of the list 

#### Parameters
  * **value** - value to add to front of list
```javascript
  listInstance.prepend('foobar');
```

---

### linkedList.replaceAt(index, value)
Replace value of an existing list node 

#### Parameters
  * **index** - index of target node to update
  * **value** - value to apply to target node
#### Return value
  * **old value which was just replaced**
```javascript
  let previousValue = listInstance.replaceAt(3, 'updated value');
```

---

### linkedList.insertAt(index, value)
Insert a value into the list (pushes node at target index forward)

#### Parameters
  * **index** - insertion point
  * **value** - value of new node being inserted
```javascript
  listInstance.insertAt(3, 'new value');
```

---

### linkedList.removeAt(index)
Remove a node from the list 

#### Parameters
  * **index** - target index of node to remove
#### Return value
  * **value from removed node**
```javascript
  let removedValue = listInstance.removeAt(5);
```

---

### linkedList.pop()
Remove the last node from the list 

#### Return value
  * **value from removed tail node**
```javascript
  let value = listInstance.pop();
```

---

### linkedList.shift()
Remove the first node from the list 

#### Return value
  * **value from removed head node**
```javascript
  let value = listInstance.shift();
```

---

***Higher-order methods:***

### linkedList.forEach(cbFn[, thisArg])
Execute a callback function on each list node, from head to tail

#### Parameters
  * **cbFn** - Callback function invoked with each node value
  * **thisArg (optional)** - Optional this binding for callback function
```javascript
  let listInstance = LinkedList([1,2,3]);
  
  listInstance.forEach((value) => console.log(value));
  // 1
  // 2
  // 3
  
  let testObj = {
    multiplier: 2
  };
  
  function cbFn(value) {
    console.log(this.multiplier * value);
  }
  
  listInstance.forEach(cbFn, testObj);
  // 2
  // 4
  // 6
```

---

### linkedList.forEachRev(cbFn[, thisArg])
Execute a callback on each list node, from tail to head

#### Parameters
  * **param** - Callback function invoked with each node value (from tail to head)
  * **thisArg (optional)** - Optional this binding for callback function

```javascript
  let listInstance = LinkedList([1,2,3]);
  
  listInstance.forEachRev((value) => console.log(value));
  // 3
  // 2
  // 1
```

---

### linkedList.find(cbFn[, thisArg])
Locate a list note which satisfies a predicate function

#### Parameters
  * **param** - Callback function returning true/false to indicate a match
  * * **thisArg (optional)** - Optional this binding for callback function
#### Return value
  * **Value of first matching node, undefined if none found**
```javascript
  let listInstance = LinkedList([1,2,3]);
  
  function isEven(value) {
    return value%2 == 0;
  }
  
  let foundValue = listInstance.find(isEven);
  // 2
```

---

### linkedList.filter(cbFn[, thisArg])
Locate ALL list nodes which satisfy a predicate function

#### Parameters
  * **param** - Callback function returning true/false to indicate a match
  * **thisArg (optional)** - Optional this binding for callback function
#### Return value
  * **array of matching values**
```javascript
  let listInstance = LinkedList([1,2,3,4,5]);

  function isEven(value) {
    return value%2 == 0;
  }
  
  let matches = listInstance.filter(isEven);
  // [2, 4]
```

---

### linkedList.every(cbFn[, thisArg])
Test if all nodes satisfy a predicate function

#### Parameters
  * **param** - Callback function returning true/false to indicate a match
  * **thisArg (optional)** - Optional this binding for callback function
#### Return value
  * **true if all nodes satisfied the predicate, false otherwise**
```javascript
  let listInstance = LinkedList([1,2,3,4,5]);

  function isNumber(value) {
    return typeof value == 'number';
  }
   
  function isEven(value) {
    return value%2 == 0;
  }
  
  listInstance.every(isNumber); // true
  listInstance.every(isEven); // false
```

---

### linkedList.some(cbFn[, thisArg])
Test if at least one node satisfies a predicate function 

#### Parameters
  * **param** - Callback function returning true/false to indicate a match
  * **thisArg (optional)** - Optional this binding for callback function
#### Return value
  * **true if at least one node value satisfies the predicate, false otherwise**
```javascript
  let listInstance = LinkedList([1,2,3,4,5]);
  
  function isEven(value) {
    return value%2 == 0;
  }
  
  function isString(value) {
    return typeof value == 'string';
  }
  
  listInstance.some(isEven); // true
  listInstance.some(isString); //false
```

---

***Circular Methods:***

### linkedList.traverse()
Traverse a list in forward or backwarks order, picking *n* elements at a time.

#### Return value
  * An object with the following methods
    * **next(n = 1)** - Select the next 'n' items (defaults to 1), wrapping when reaching the end
    * **prev(n = 1)** - Select the previous 'n' items (defaults to 1), wrapping when reaching the start
```javascript
  let listInstance = LinkedList([1,2,3]);
  let t = listInstance.traverse();
  
  t.next(); // 1 
  t.next(); // 2
  t.next(); // 3
  t.next(); // 1
  t.next(3); // [2, 3, 1]
  
  t.prev(); // 3
  t.prev(); // 2
  t.prev(); // 1
  t.prev(); // 3 
  t.prev(5); // [2, 1, 3, 2, 1]
```
