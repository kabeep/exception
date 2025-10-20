import { expect, test } from 'vitest';
import normalizeNumber from '../../src/helpers/normalize-number';

test('normalizeNumber - should convert string to number', () => {
    const value = '123';
    const result = normalizeNumber(value);
    expect(result).toBe(123);
});

test('normalizeNumber - should convert string with leading spaces to number', () => {
    const value = '  456  ';
    const result = normalizeNumber(value);
    expect(result).toBe(456);
});

test('normalizeNumber - should return original number', () => {
    const value = 789;
    const result = normalizeNumber(value);
    expect(result).toBe(789);
});

test('normalizeNumber - should return NaN for undefined', () => {
    const value = undefined;
    const result = normalizeNumber(value);
    expect(Number.isNaN(result)).toBe(true);
});

test('normalizeNumber - should return NaN for null', () => {
    const value = null;
    const result = normalizeNumber(value as any);
    expect(Number.isNaN(result)).toBe(true);
});

test('normalizeNumber - should return NaN for non-numeric string', () => {
    const value = 'abc';
    const result = normalizeNumber(value);
    expect(Number.isNaN(result)).toBe(true);
});
