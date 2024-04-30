import { expect, test } from 'vitest';
import isNil from '../../src/helpers/is-nil';

test('isNil - should return true for null value', () => {
    const value = null;
    const result = isNil(value);
    expect(result).toBe(true);
});

test('isNil - should return true for undefined value', () => {
    const value = undefined;
    const result = isNil(value);
    expect(result).toBe(true);
});

test('isNil - should return false for non-null and non-undefined values', () => {
    const value = 0;
    const result = isNil(value);
    expect(result).toBe(false);
});

test('isNil - should return false for empty string value', () => {
    const value = '';
    const result = isNil(value);
    expect(result).toBe(false);
});

test('isNil - should return false for false boolean value', () => {
    const value = false;
    const result = isNil(value);
    expect(result).toBe(false);
});

test('isNil - should return false for NaN value', () => {
    const value = NaN;
    const result = isNil(value);
    expect(result).toBe(false);
});
