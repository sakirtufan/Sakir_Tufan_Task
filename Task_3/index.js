// a) Write a function that uses an array of non-negative integers and strings and returns a new
// array without strings. Return an empty array if there is no match.
const filterArray = (arr) => {
  const filteredArray = arr.filter(item => typeof(item) === "number");
  return filteredArray;
}

console.log(filterArray([1, 2, "a", "b"])); //[ 1, 2 ]
console.log(filterArray([1, "a", "b", 0, 15])); //[ 1, 0, 15 ]
console.log(filterArray(["a", "1", "c", "3", "abc", "123"])); //[]


// b) Write a function that converts an object into an array, where each element represents a keyvalue pair in form of an array. Return an empty array if the object is empty
const toArray = (obj) => {
  return Object.entries(obj);
}

console.log(toArray({ a: 1 })); //[ [ 'a', 1 ] ]
console.log(toArray({ train: 15, tree: 12 })); // [ [ 'train', 15 ], [ 'tree', 12 ] ]
console.log(toArray({})); // []

// c) Write a function that, given a number, returns an array containing the two halves of that
// number. If the number is odd, make the rightmost number higher.
const numberSplit = (num) => {
  if(num !=0){
    if(num % 2 === 0){
      const a = num / 2;
      const b = num / 2
      return new Array(a,b)
    }else{
      const a = ((num+1) / 2) - 1;
      const b = (num + 1) / 2;
      return new Array(a,b);
    }
  }else{
    return [0, 0];
  }  
}

console.log(numberSplit(4)); //[ 2, 2 ]
console.log(numberSplit(11)); //[ 5, 6 ]
console.log(numberSplit(-9)); //[ -5, -4 ]
console.log(numberSplit(0)); //[ 0, 0 ]

// d) Write a function that takes an array of numbers and returns the second largest number
const secondLargest = (arr) => {
   arr.sort((a,b) => b-a);
   return arr[1];
  
}

console.log(secondLargest([10, 40, 30, 20, 50]));  //40
console.log(secondLargest([25, 143, 89, 13, 105]));  //105
console.log(secondLargest([54, 23, 11, 17, 10]));  //23


// e) Write a function that returns true if all parameters are true, otherwise false

const allTruthy = (...args) => {
  return args.every(x => x)
}

console.log(allTruthy(true, true, true)); // true
console.log(allTruthy(true, false, true)); // false
console.log(allTruthy(5, 4, 3, 2, 1, 0)); // false