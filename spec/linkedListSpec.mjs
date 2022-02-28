import LinkedList from '../dist/linkedList.mjs';

describe("LinkedList", function() {
  let ll = null
  const BAD_INDICES = ['foo', 2.5, false, -10, 1000];

  beforeEach(function() {
    ll = LinkedList([1, 2, 3, 4, 5]);
  });

  describe("Initialization", function() {
    it("Can be initialized as empty", function() {
      ll = LinkedList();
      expect(ll.getLength()).toBe(0);
    });

    it("Can be initialized with an array", function() {
      ll = LinkedList([1,2,3,4,5]);
      expect(ll.getLength()).toBe(5);
    });
  });

  describe("getLength", function() {
    it("Retrieves the length of a list", function() {
      let emptyList = LinkedList();
      let listWithItems = LinkedList([1,"two",3,"four",5]);

      expect(emptyList.getLength()).toBe(0);
      expect(listWithItems.getLength()).toBe(5);
    });
  });

  describe("at", function() {
    it("Retrieves the value of the node at the supplied index", function() {
      expect(ll.at(0)).toBe(1);
      expect(ll.at(4)).toBe(5);
      expect(ll.at(2)).toBe(3);
      expect(ll.getLength()).toBe(5);
    });

    it("Throws error when supplied bad index value", function() {
      BAD_INDICES.forEach( badIndex => {
        expect(() => ll.at(badIndex)).toThrowError();
      });
    });
  });

  describe("first", function() {
    it("Returns value of first list node", function() {
      expect(ll.first()).toBe(1);
    });

    it("Throws error is the list is empty", function() {
      ll = LinkedList();
      expect(() => ll.first()).toThrow();
    });
  });

  describe("last", function() {
    it("Returns value of last list node", function() {
      expect(ll.last()).toBe(5);
    });

    it("Throws error is the list is empty", function() {
      ll = LinkedList();
      expect(() => ll.last()).toThrow();
    });
  });

  describe("append", function() {
    it("Adds items to the end of the list", function() {
      ll = LinkedList();

      ll.append(1);
      ll.append(2);
      ll.append(3);

      expect(ll.getLength()).toBe(3);
      expect(ll.toArray()).toEqual([1,2,3]);
    });
  });

  describe("prepend", function() {
    it("Adds items to the beginning of the list", function() {
      ll = LinkedList();

      ll.prepend(1);
      ll.prepend(2);
      ll.prepend(3);

      expect(ll.getLength()).toBe(3);
      expect(ll.toArray()).toEqual([3,2,1]);
    });
  });

  describe("replaceAt", function() {
    it("Replaces the value of the node at the specified index", function() {
      ll.replaceAt(1, 'foo');
      ll.replaceAt(3, 'bar');

      expect(ll.toArray()).toEqual([1,'foo',3,'bar',5]);
    });

    it("Throws error when supplied bad index value", function() {
      BAD_INDICES.forEach( badIndex => {
        expect(() => ll.replaceAt(badIndex, 'bar')).toThrowError();
      });
    });
  });

  describe("insertAt", function() {
    it("Inserts new node at specified index, pushing replaced node forward", function() {
      ll.insertAt(0, 'first');
      ll.insertAt(2, 'third');
      ll.insertAt(ll.getLength() - 1, 'penultimate');

      expect(ll.toArray()).toEqual(
        ['first', 1, 'third', 2, 3, 4, 'penultimate', 5]
      );
    });

    it("Throws error when supplied bad index value", function() {
      BAD_INDICES.forEach( badIndex => {
        expect(() => ll.insertAt(badIndex, 'bar')).toThrowError();
      });
    });
  });

  describe("removeAt", function() {
    it("Removes node from specified index, returning it's value", function() {
      expect(ll.removeAt(2)).toBe(3);
      expect(ll.removeAt(0)).toBe(1);
      expect(ll.getLength()).toBe(3);
      expect(ll.toArray()).toEqual([2,4,5]);
    });

    it("Throws error when supplied bad index value", function() {
      BAD_INDICES.forEach( badIndex => {
        expect(() => ll.removeAt(badIndex)).toThrowError();
      });
    });
  });

  describe("pop", function() {
    it("Removes the last item from list, returning it's value", function(){
      expect(ll.pop()).toBe(5)
      expect(ll.getLength()).toBe(4);

      expect(ll.pop()).toBe(4);
      expect(ll.getLength()).toBe(3);

      expect(ll.toArray()).toEqual([1,2,3]);
    })

    it("Throws error when list is empty", function() {
      while(ll.getLength() > 0) {
        ll.pop();
      }

      expect(() => ll.pop()).toThrow();
    });
  });

  describe("shift", function() {
    it("Removes the first item from list, returning it's value", function(){
      expect(ll.shift()).toBe(1)
      expect(ll.getLength()).toBe(4);

      expect(ll.shift()).toBe(2);
      expect(ll.getLength()).toBe(3);

      expect(ll.toArray()).toEqual([3,4,5]);
    })

    it("Throws error when list is empty", function() {
      while(ll.getLength() > 0) {
        ll.shift();
      }

      expect(() => ll.shift()).toThrow();
    });
  });

  describe("forEach", function() {
    it("Invokes a callback with each value in order", function() {
      let cnt = 0;
      let accum = "";

      function cbFn(value) {
        cnt++;
        accum += `${value}`;
      }

      ll.forEach(cbFn);

      expect(cnt).toBe(5);
      expect(accum).toBe('12345');
    });

    it("Supports passing a 'this' argument", function() {
      let cnt = 0;
      let accum = "";

      let testObj = {
        addThree: function(value) {
          return value + 3;
        }
      };

      function cbFn(value) {
        cnt++;
        accum += `${this.addThree(value)}`;
      }

      ll.forEach(cbFn, testObj);

      expect(cnt).toBe(5);
      expect(accum).toBe('45678');
    });
  });

  describe("forEachRev", function() {
    it("Invokes a callback with each value in reverse order", function() {
      let cnt = 0;
      let accum = "";

      function cbFn(value) {
        cnt++;
        accum += `${value}`;
      }

      ll.forEachRev(cbFn);

      expect(cnt).toBe(5);
      expect(accum).toBe('54321');
    });

    it("Supports passing a 'this' argument", function() {
      let cnt = 0;
      let accum = "";

      let testObj = {
        addThree: function(value) {
          return value + 3;
        }
      };

      function cbFn(value) {
        cnt++;
        accum += `${this.addThree(value)}`;
      }

      ll.forEachRev(cbFn, testObj);

      expect(cnt).toBe(5);
      expect(accum).toBe('87654');
    });
  });

  describe("find", function() {
    it("Locates the first value in list passing a predicate fn", function() {
      function predicateFn(value) {
        return value > 3;
      }

      expect(ll.find(predicateFn)).toBe(4);
    });

    it("Returns undefined if no matching item is found", function() {
      function predicateFn(value) {
        return value > 1000;
      }

      expect(ll.find(predicateFn)).not.toBeDefined();
    });

    it("Supports passing a 'this' argument", function() {
      let testObj = {
        min: 2.5,
        max: 3.5
      };

      function predicateFn(value) {
        return value >= this.min && value <= this.max;
      }

      expect(ll.find(predicateFn, testObj)).toBe(3);
    });
  });

  describe("filter", function() {
    it("Returns an array of all values satisfying a supplied predicate fn", function() {
      function isEven(value) {
        return value%2 == 0;
      }

      expect(ll.filter(isEven)).toEqual([2, 4])
    })

    it("Returns empty array when no matches are found", function() {
      function predicateFn(value) {
        return value > 1000;
      }

      let retVal = ll.filter(predicateFn);
      expect(Array.isArray(retVal)).toBe(true);
      expect(retVal.length).toBe(0);
    });

    it("Support a 'this' argument", function() {
      let testObj = {
        min: 1.2,
        max: 3.8
      };

      function predicateFn(value) {
        return value >= this.min && value <= this.max;
      }

      expect(ll.filter(predicateFn, testObj)).toEqual([2,3]);
    });
  });

  describe("every", function() {
    it("Return true when all items satisfy a predicate fn", function() {
      function isLessThan10(value) {
        return value < 10;
      }

      function isEven(value) {
        return value%2;
      }

      expect(ll.every(isLessThan10)).toBe(true);
      expect(ll.every(isEven)).toBe(false);
    });

    it("Supports passing a 'this' argument", function() {
      let passingObj = {
        min: 1,
        max: 10
      };

      let failingObj = {
        min: 3,
        max: 10
      };

      function predicateFn(value) {
        return value >= this.min && value <= this.max;
      }

      expect(ll.every(predicateFn, passingObj)).toBe(true);
      expect(ll.every(predicateFn, failingObj)).toBe(false);
    });
  });

  describe("some", function() {
    it("Return true when at least one item satisfies a predicate fn", function() {
      function isLessThan3(value) {
        return value < 3;
      }

      function isGreaterThan10(value) {
        return value > 10;
      }

      expect(ll.some(isLessThan3)).toBe(true);
      expect(ll.some(isGreaterThan10)).toBe(false);
    });

    it("Supports passing a 'this' argument", function() {
      let passingObj = {
        min: 3,
        max: 10
      };

      let failingObj = {
        min: 10,
        max: 20
      };

      function predicateFn(value) {
        return value >= this.min && value <= this.max;
      }

      expect(ll.some(predicateFn, passingObj)).toBe(true);
      expect(ll.some(predicateFn, failingObj)).toBe(false);
    });
  });

  describe("traverse", function() {
    let t = null

    beforeEach(function() {
      ll = LinkedList([1,2,3]);
      t = ll.traverse();
    })

    it("Returns object with 'next' and 'prev' functions for traversal.", function() {
      expect(t.next).toBeDefined();
      expect(typeof t.next).toBe('function');

      expect(t.prev).toBeDefined();
      expect(typeof(t.prev)).toBe('function');
    });

    describe("next", function() {
      it("Returns the next sequential value in list, wrapping back to start", function() {
        expect(t.next()).toBe(1);
        expect(t.next()).toBe(2);
        expect(t.next()).toBe(3);

        expect(t.next()).toBe(1);
      });

      it("Can be passed an optional 'n' parameter, to select multiple items", function() {
        expect(t.next(10)).toEqual([1,2,3,1,2,3,1,2,3,1]);
      });
    })

    describe("prev", function() {
      it("Returns the previous sequential value in list, wrapping back to end", function() {
        expect(t.prev()).toBe(3);
        expect(t.prev()).toBe(2);
        expect(t.prev()).toBe(1);

        expect(t.prev()).toBe(3);
      });

      it("Can be passed an optional 'n' parameter, to select multiple items", function() {
        expect(t.prev(10)).toEqual([3,2,1,3,2,1,3,2,1,3]);
      });
    })
  });
});
