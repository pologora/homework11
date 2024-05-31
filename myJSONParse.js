export function myJSONParse(json, reviver) {
  let position = 0;

  return parseValue();

  function parseValue() {
    console.log('parse value');
    consumeWhiteSpace();
    const token = getToken();
    console.log(token);
    if (/{/.test(token)) {
      return parseObject();
    }

    if (/\[/.test(token)) {
      return parseArray();
    }

    if (/"/.test(token)) {
      return parseString();
    }

    if (/\d|-/.test(token)) {
      return parseNumber();
    }

    if (/t/.test(token)) {
      return parseTrue();
    }
    if (/f/.test(token)) {
      return parseFalse();
    }

    if (/n/.test(token)) {
      return parseNull();
    }

    if (/{/.test(token)) {
      return parseObject();
    }

    throwError();
  }

  function getToken() {
    return json.charAt(position);
  }

  function parseString() {
    console.log('parse string');
    consume('"');

    let string = '';
    while (!/"/.test(getToken())) {
      if (getToken() === '\\') {
        string += parseEscape();
      } else {
        string += getToken();
        consume();
      }
    }

    consume('"');
    console.log('STRING', string);
    return string;
  }

  function parseEscape() {
    console.log('parse escape');

    consume('\\');
    const token = getToken();
    if (/u/.test(token)) {
      consume('u');
      let code = '';
      for (let i = 0; i < 4; i++) {
        code += getToken();
        consume();
      }

      return String.fromCharCode(parseInt(code, 16));
    } else if (/\\\|\/|"/.test(token)) {
      consume();

      return token;
    } else if (/b|f|n|r|t/.test(token)) {
      const escapeMap = {
        b: '\b',
        f: '\f',
        n: '\n',
        r: '\r',
        t: '\t',
      };
      consume();

      return escapeMap[token];
    }

    throwError();
  }

  function parseArray() {
    console.log('parse array');
    consume('[');
    consumeWhiteSpace();
    const array = [];

    while (!/]/.test(getToken())) {
      array.push(parseValue());
      consumeWhiteSpace();

      if (/,/.test(getToken())) {
        consume(',');
        consumeWhiteSpace();
      } else if (!/]/.test(getToken())) {
        throwError();
      }
    }

    if (reviver) {
      for (let i = 0; i < array.length; i++) {
        array[i] = reviver(i, array[i]);
      }
    }
    consume(']');

    return array;
  }

  function throwError() {
    const token = getToken();
    throw new Error(`Invalid JSON token '${token}' at position ${position}`);
  }

  function parseObject() {
    console.log('parse obj');
    const resultObject = {};
    consume('{');
    consumeWhiteSpace();

    while (!/}/.test(getToken())) {
      const [key, value] = parsePair();
      resultObject[key] = value;
      consumeWhiteSpace();

      if (/,/.test(getToken())) {
        consume(',');
        consumeWhiteSpace();
      } else if (!/\}/.test(getToken())) {
        throwError();
      }
    }

    if (reviver) {
      for (const key in resultObject) {
        resultObject[key] = reviver(key, resultObject[key]);
      }
    }

    consume('}');

    return resultObject;
  }

  function parseNumber() {
    console.log('parse number');
    let number = '';
    while (/\d|-|\+|\.|e|E/.test(getToken())) {
      number += getToken();
      consume();
    }

    return parseFloat(number);
  }

  function parseFalse() {
    console.log('parse false');
    consume('f');
    consume('a');
    consume('l');
    consume('s');
    consume('e');

    return false;
  }

  function parseTrue() {
    console.log('parse true');
    consume('t');
    consume('r');
    consume('u');
    consume('e');

    return true;
  }

  function parseNull() {
    consume('n');
    consume('u');
    consume('l');
    consume('l');

    return null;
  }

  function parsePair() {
    console.log('parse pair');
    let key = '';
    consume('"');

    while (!/"/.test(getToken())) {
      key += getToken();
      consume();
    }

    consume('"');
    consume(':');

    const value = parseValue();

    return [key, value];
  }

  function consumeWhiteSpace() {
    while (/\s|\\t|\\n|\\r/.test(getToken())) {
      position++;
    }
  }

  function consume(value) {
    const token = getToken();

    if (value && token !== value) {
      console.log(`error at value ${value} actual ${token}`);
      throwError();
    }

    while (/\\t|\\n|\\r/.test(getToken())) {
      position++;
    }

    position++;
  }
}

const json = `[
    { "a": 1, "c": { "d": true }, "g":null, "m": [ 1, 2, 3] },
    { "a": 2, "c": { "d": false } }
  ]`;
const json1 = `{ "a": "text", "b": "more test", "f": 4.567e8, "num": 33, "array": [ 1, 3, {"a": 4} ], "true": true,
 "false": false, "NULL": null, "unicode": "\\u0047", "textEscape": "text \\n more"}`;

const reviver = (key, value) => {
  if (typeof value === 'number') {
    return value * 2;
  }
  return value;
};

// console.log(myJSONParse(json));
console.log(myJSONParse(json1, reviver));
console.log(JSON.parse(json1, reviver));
