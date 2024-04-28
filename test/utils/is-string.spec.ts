import { expect, test } from 'vitest';
import isString from '../../src/helpers/is-string';

test('isString - should return true for string value', () => {
    const value = 'Hello';
    const result = isString(value);
    expect(result).toBe(true);
});

test('isString - should return false for non-string value', () => {
    const value = 123;
    const result = isString(value);
    expect(result).toBe(false);
});

test('isString - should return false for null value', () => {
    const value = null;
    const result = isString(value);
    expect(result).toBe(false);
});

test('isString - should return false for undefined value', () => {
    const value = undefined;
    const result = isString(value);
    expect(result).toBe(false);
});
