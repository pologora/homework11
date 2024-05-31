# Homework 11 myJSONParse

## Table of Contents

- [Functions](#functions)
  - [myJSONParse](#myjsonparse)
  - [parseValue](#parsevalue)
  - [getToken](#gettoken)
  - [consume](#consume)
  - [consumeWhiteSpace](#consumewhitespace)
  - [throwError](#throwerror)
  - [parseString](#parsestring)
  - [parseEscape](#parseescape)
  - [parseNumber](#parsenumber)
  - [parseTrue](#parsetrue)
  - [parseFalse](#parsefalse)
  - [parseNull](#parsenull)
  - [parseArray](#parsearray)
  - [parseObject](#parseobject)
  - [parsePair](#parsepair)

## Functions

### myJSONParse

The myJSONParse function takes two arguments:

`json`: A JSON string to be parsed.

`reviver` (optional): A function that can transform the results.

```JavaScript
const jsonString = '{"name": "John", "age": 30, "isStudent": false}';
const result = myJSONParse(jsonString);
console.log(result); // { name: 'John', age: 30, isStudent: false }

const reviver = (key, value) => (typeof value === 'number' ? value * 2 : value);
const transformedResult = myJSONParse(jsonString, reviver);
console.log(transformedResult); // { name: 'John', age: 60, isStudent: false }
```

### parseValue

Parses a JSON value (object, array, string, number, true, false, null).

### getToken

`Returns`: The current character at the current position in the JSON string.

### consume

Parameters:
`value` (string, optional): The specific character to consume.

Advances the position.

### consumeWhiteSpace

Advances the position past any whitespace characters.

### throwError

`Throws` an error with details about the invalid token and its position.

### parseString

`Returns`: The parsed string value.

### parseEscape

`Returns`: The parsed escape sequence character.

Handles common escape sequences like \n, \t, and Unicode escapes.

### parseNumber

`Returns`: The parsed number value.

Handles integers, decimals, and scientific notation.

### parseTrue

`Returns`: true

### parseFalse

`Returns`: false

### parseNull

`Returns`: null

### parseArray

`Returns`: The parsed array.

Parses an array and optionally applies the `reviver` function to each element.

### parseObject

`Returns`: The parsed object.

Parses an object and optionally applies the `reviver` function to each key-value pair.

### parsePair

`Returns`: An array containing the key and value.
