export function myJSONParse(json, reviver) {
  let position = 0;

  return parseValue();

  function parseValue() {
    consumeWhiteSpace();
    const token = getToken();
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
    return string;
  }

  function parseEscape() {
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
    let number = '';
    while (/\d|-|\+|\.|e|E/.test(getToken())) {
      number += getToken();
      consume();
    }

    return parseFloat(number);
  }

  function parseFalse() {
    consume('f');
    consume('a');
    consume('l');
    consume('s');
    consume('e');

    return false;
  }

  function parseTrue() {
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
      throwError();
    }

    while (/\\t|\\n|\\r/.test(getToken())) {
      position++;
    }

    position++;
  }
}

const invalidJsonString = '{"name": "John", "age": 30, "isStudent": "undefined",}';
console.log(myJSONParse(invalidJsonString));
