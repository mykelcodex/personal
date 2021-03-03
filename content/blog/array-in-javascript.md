---
title: Array in JavaScript
description: An array is a collection of items that consist of the same datatype
createdAt: 2020-11-09T00:00:00+01:00

---
### What is an array?

In a simple term, an array is a collection of items that consist of the same datatype. It usually have at least one item in the collection and it's starting index is always 0.

Let's create our first array

```js
let food = ['Rice','Bread','Meat']
```

We have created an array and stored it in a variable.

We can retrieve an item from an array by specifying the index.

```js
let first = food[0]
 console.log(first)
 // Rice
```

### Methods of an array

#### **push**

The `push()` method add a new item to an array.

```js
let updatedFood = food.push('Beans')
console.log(updatedFood)
// ['Rice','Bread','Meat','Beans']
```

#### **pop**

The `pop()` method remove an item from an array

```js
let updatedFood = food.pop()
console.log(updatedFood)
// ['Rice','Bread']
```

#### **includes**

The `includes()`method checks if an item is in the array(usually return a boolean value)

```js
let checkFood = food.includes('Bread')
console.log(checkFood)
// true
```

#### **indexOf**

The `indexOf()` method search for an item in the array and returns the position is found else it returns -1

```js
let foodPosition = food.indexOf('Rice')
console.log(foodPosition)
// 0
```

#### **map**

The `map()` method returns a new array with a result of calling a function on every item of the array

```js
let numbers = ['1','2','3']

function addToNumber(num){
	return num + 2;
}

let newArray = numbers.map(addToNumber)
console.log(newArray)
// ['2','4','6']
```

#### **slice**

The `slice()` method extracts items from an array based on passed in arguments or else it will copy the array. This method can take two arguments, the first argument is the starting position of the item you want to extract while the second argument is the ending position. It returns a new array with of result with the passed in argument and the arguments.

```js
let extractedFood = food.slice(1,2)
console.log(extractedFood)
// ['Beans','Meat']
```

#### **filter**

The `filter()` method returns a new array containing all items of the calling array for which the provided filtering function returns `true`.

```js
let result = food.filter(word => word.length > 4);
console.log(result);
// ["Bread", "Meat"]
```

#### **toString**

The `toString()` method converts an array to a sting

```js
let foodString = food.toString()
console.log(foodString)
// Rice,Bread,Meat
```

#### **sort**

The `sort()` method returns a sorted array

```js
let sortedFood = food.sort()
console.log(sortedFood)
// ['Bread','Meat','Rice']
```

Hope it helped.

Thanks