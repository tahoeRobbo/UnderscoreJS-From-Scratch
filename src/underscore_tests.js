/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    var firstArr = [];
    if(!(n)) {
      return array[0];
    }
    else {
      if(array.length >= n) {
        for(var i = 0; i < n; i++) {
        firstArr.push(array[i]);
        }
        return firstArr;
      }
      else {
        return array;
      }
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  //
  // this tests true but doesn't work in repl.it
  // _.last = function(array, n) {
  //   var lastArr = [];
  //   if(!(n)) {
  //     return array[array.length-1];
  //   }
  //   else {
  //   	if(array.length >= n) {
  //     		for(var i = n; i > 0; i--) {
  //     		lastArr.push(array[i]);
  //         lastArr.reverse();
  //     		}
  //     		return lastArr;
  //     	}
  //     	else {
  //     		return array;
  //     	}
  //   }
  // };
  // this doesn't test true, but also doesn't work in repl.it
  _.last = function(array, n) {
     var lastArr = [];
     if(!(n)) {
       return array[array.length-1];
     }
     else if (n >= array.length) {
        return array;
       	}
    else if (n < array.length) {
    	for(var i = array.length - n; i <= n; i++) {
    		lastArr.push(array[i]);
       	}
       	return lastArr;
     }

};


  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {

    if(Array.isArray(collection)) {
      //collection is array
      for(var i = 0; i < collection.length; i++) {
        iterator(collection[i], collection.indexOf(collection[i]), collection);
      }
    } else {
      //collection is object
      for(var i in collection) {
        iterator(collection[i], i, collection);
      }
    }
  };



  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for(var i = 0; i < array.length; i++) {
      if(array[i] === target) {
      	return i;
      }
    }
    return -1;
  };


  // Return all elements of an array that pass a truth test ('iterator' function argument)
  _.filter = function(collection, iterator) {
	var returnArr = [];
    for(var i = 0; i < collection.length; i++) {
      if(iterator(collection[i])) {
        returnArr.push(collection[i]);
      }

    }
    return returnArr;
  };

  // Return all elements of an array that don't pass a truth test (the 'iterator' function argument)
  _.reject = function(collection, iterator) {
	var returnArr = [];
    for(var i = 0; i < collection.length; i++) {
      if(iterator(collection[i]) === false) {
        returnArr.push(collection[i]);
      }

    }
    return returnArr;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var returnArr = [];
    for(var i = 0; i < array.length; i++) {
      if(returnArr.indexOf(array[i]) === -1) {
        returnArr.push(array[i]);
      }
    }
    return returnArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    for(var i in array)  {
      array[i] = iterator(array[i]);
    }
  return array;

  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var rElements = [];
    for(var i = 0; i < array.length; i++) {
    	for(var j in array[i]) {
      		if(j === propertyName) {
        	rElements.push(array[i][j]);
      }
    }
    }
    return rElements;
  };

  // Calls the method named by methodName on each value in the list.
  //
  //commented out because current state breaks rest of code
  // _.invoke = function(list, methodName, args) {
  //   for(var i = 0; i < list.length; i++) {
  //     var item = list[i];
  //     if (typeOf(methodName) === 'string') {
  //       item[methodName](args);
  //     }
  //     else {
  //       methodName.call(item, args);
  //     }
  //   }
  //   return list;
  // };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  //come back to this one, understand how it really works, still fuzzy
  _.reduce = function(collection, iterator, accumulator) {
    var start = accumulator === undefined;
    _.each(collection, function(item) {
      if (start) {
        accumulator = item;
        start = false;
      } else {
        accumulator = iterator(accumulator, item);
      }
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    var existence = false;
    for(var i in collection) {
      if(collection[i] === target) {
        existence = true;
      }
    }
    return existence;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if(collection.length === 0) {
      return true;
    }
    else if (!(iterator)) {
      return true;
      }
    for(var i in collection) {
      if (!(iterator(collection[i]))){
        return false;
      }
      }
    return true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if (!(iterator)) {
        for(var i in collection) {
          if (collection[i]) {
            return true;
          }
        }
      }
    else {
      for (var i in collection) {
        if (iterator(collection[i])) {
          return true;
        }
      }
    }
return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    for(var i = 1; i < arguments.length; i++) {
    	for(var j in arguments[i]) {
    		obj[j] = arguments[i][j];
    	}
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  //
  //Why does taking in falsy values not work but undefined does not
  _.defaults = function(obj) {
    for(var i = 1; i < arguments.length; i++) {
      for(var j in arguments[i]) {
        if((obj[j]) === undefined) {
        obj[j] = arguments[i][j];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
      var alreadyCalled = false;
      var result;
      return function() {
          if (!alreadyCalled) {
              result = func.apply(this, arguments);
              alreadyCalled = true;
          }
          return result;
      };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var cache = {};
    return function(){
      var args = JSON.stringify(arguments[0]);
        if (cache[args]) {
          return cache[args];
        } else {
          cache[args] = func.apply(this, arguments);
          return cache[args];
        }
      return cache[args];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  };



  // Shuffle an array.
  _.shuffle = function(array) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

}).call(this);
