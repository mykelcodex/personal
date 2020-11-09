---
title: Array in Javascript
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

#### push()

The `push()` method add a new item to an array.

```js
let updatedFood = food.push('Beans')
console.log(updatedFood)
//['Rice','Bread','Meat','Beans']
```

#### pop()

The `pop()` method remove an item from an array

```js
let updatedFood = food.pop()
console.log(updatedFood)
//['Rice','Bread']
```