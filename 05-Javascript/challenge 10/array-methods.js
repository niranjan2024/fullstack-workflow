function myMap(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}

function myFilter(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

function myReduce(arr, callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  if (accumulator === undefined) {
    accumulator = arr[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < arr.length; i++) {
    accumulator = callback(accumulator, arr[i], i, arr);
  }
  return accumulator;
}

function myFind(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      return arr[i];
    }
  }
  return undefined;
}

function myEvery(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    if (!callback(arr[i], i, arr)) {
      return false;
    }
  }
  return true;
}

function mySome(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      return true;
    }
  }
  return false;
}

function myFlat(arr, depth = 1) {
  const result = [];

  function flatten(array, d) {
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i]) && d > 0) {
        flatten(array[i], d - 1);
      } else {
        result.push(array[i]);
      }
    }
  }

  flatten(arr, depth);
  return result;
}

//Output Check
console.log(myMap([1, 2, 3], x => x * 2));            // [2, 4, 6]
console.log(myFilter([1, 2, 3, 4], x => x > 2));      // [3, 4]
console.log(myReduce([1, 2, 3], (a, b) => a + b, 0)); // 6
console.log(myFind([1, 2, 3], x => x > 1));           // 2
console.log(myFlat([1, [2, [3, [4]]]], 2));           // [1, 2, 3, [4]]
