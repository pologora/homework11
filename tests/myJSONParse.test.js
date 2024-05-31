import { describe, it, expect } from 'vitest';
import { myJSONParse } from '../myJSONParse';

describe('myJSONParse', () => {
  it('should parse a simple JSON object', () => {
    const jsonString = '{"name": "John", "age": 30, "isStudent": false}';
    const result = myJSONParse(jsonString);
    expect(result).toEqual({ name: 'John', age: 30, isStudent: false });
  });

  it('should parse a JSON array', () => {
    const jsonString = '[1, 2, 3, 4, 5]';
    const result = myJSONParse(jsonString);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should parse nested objects and arrays', () => {
    const jsonString = '{"person": {"name": "John", "age": 30}, "hobbies": ["reading", "gaming"]}';
    const result = myJSONParse(jsonString);
    expect(result).toEqual({ person: { name: 'John', age: 30 }, hobbies: ['reading', 'gaming'] });
  });

  it('should parse a string', () => {
    const jsonString = '"hello world"';
    const result = myJSONParse(jsonString);
    expect(result).toBe('hello world');
  });

  it('should parse numbers', () => {
    const jsonString = '12345';
    const result = myJSONParse(jsonString);
    expect(result).toBe(12345);
  });

  it('should parse booleans', () => {
    const jsonStringTrue = 'true';
    const jsonStringFalse = 'false';
    expect(myJSONParse(jsonStringTrue)).toBe(true);
    expect(myJSONParse(jsonStringFalse)).toBe(false);
  });

  it('should parse null', () => {
    const jsonString = 'null';
    const result = myJSONParse(jsonString);
    expect(result).toBe(null);
  });

  it('should handle escape sequences in strings', () => {
    const jsonString = '"Hello\\nWorld\\tTab"';
    const result = myJSONParse(jsonString);
    expect(result).toBe('Hello\nWorld\tTab');
  });

  it('should handle unicode escape sequences in strings', () => {
    const jsonString = '"Unicode test: \\u2764"';
    const result = myJSONParse(jsonString);
    expect(result).toBe('Unicode test: ❤');
  });

  it('should apply the reviver function', () => {
    const jsonString = '{"name": "John", "age": 30}';
    const reviver = (key, value) => (typeof value === 'number' ? value * 2 : value);
    const result = myJSONParse(jsonString, reviver);
    expect(result).toEqual({ name: 'John', age: 60 });
  });

  it('should throw an error for invalid JSON', () => {
    const invalidJsonString = '{"name": "John", "age": 30, "isStudent": undefined,}';
    expect(() => myJSONParse(invalidJsonString)).toThrow();
  });

  it('should throw an error for unexpected tokens', () => {
    const invalidJsonString = '{name: "John"}';
    expect(() => myJSONParse(invalidJsonString)).toThrow();
  });

  it('should ignore whitespace around JSON values', () => {
    const jsonString = '  { "name": "John", "age": 30 }  ';
    const result = myJSONParse(jsonString);
    expect(result).toEqual({ name: 'John', age: 30 });
  });
});
