# Homework 11 myJSONParse

## Table of Contents

- [Reflection](#reflaction)
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

## Reflaction

### Challenges and Solutions

### 1. **Tokenization and Parsing Logic**:

**Challenges**:

- **Complex Grammar**: JSON's grammar, while relatively straightforward, still involves various data types (objects, arrays, strings, numbers, booleans, null), each with its own parsing rules.
- **Lookahead and Context Management**: Managing the position within the JSON string and ensuring the correct parsing logic for each token was complex, especially with nested structures.

**Solutions**:

- **Function Decomposition**: Breaking down the parser into modular functions (e.g., `parseValue`, `parseObject`, `parseArray`, etc.) helped manage the complexity. Each function was responsible for a specific part of the JSON structure, making the code more readable and maintainable.
- **Regular Expressions for Token Identification**: Using regular expressions to identify tokens (e.g., strings, numbers, special characters) allowed for efficient parsing. The regex patterns helped in quickly matching and consuming tokens while moving through the input string.

### 2. **Handling Edge Cases**:

**Challenges**:

- **Whitespace Handling**: JSON allows for various types of whitespace (spaces, tabs, newlines). Ensuring that these were correctly consumed without interfering with actual token parsing required careful attention.
- **Escaped Characters in Strings**: Parsing strings, particularly those with escaped characters (e.g., \", \\, \n), required implementing escape sequences correctly to prevent errors.

**Solutions**:

- **Consume Function**: Implementing a consume function that managed whitespace and token advancement ensured that the parser maintained the correct position and context. This function also helped skip unnecessary characters without disrupting the parsing logic.
- **Pattern Matching**: Using regular expressions to identify special characters

### 3. **Error Handling**:

**Challenges**:

- **Meaningful Errors**: Providing meaningful error messages for invalid JSON inputs was crucial. This involved not only identifying where an error occurred but also what type of token or structure was expected.

**Solutions**:

- **ThrowError Function**: Centralizing error handling in the `throwError` function made it easier to provide consistent and informative error messages, improving debugging and user feedback.
