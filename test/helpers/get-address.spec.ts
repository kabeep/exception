import { expect, test } from 'vitest';
import getAddress from '../../src/helpers/get-address';

test('getAddress - should return empty string for invalid input', () => {
    const text = '';
    const result = getAddress(text);
    const expected = '';
    expect(result).toBe(expected);
});

test('getAddress - should return empty string if no parentheses are found', () => {
    const text = 'This is a test string without parentheses';
    const result = getAddress(text);
    const expected = '';
    expect(result).toBe(expected);
});

test('getAddress - should return empty string if parentheses are not closed', () => {
    const text =
        'This is a test string with an open parenthesis ( but no closing parenthesis';
    const result = getAddress(text);
    const expected = '';
    expect(result).toBe(expected);
});

test('getAddress - should return the content within the parentheses', () => {
    const text = 'This is a test string with (some content) within parentheses';
    const result = getAddress(text);
    const expected = 'some content';
    expect(result).toBe(expected);
});

test('getAddress - should return the content within the last set of parentheses', () => {
    const text =
        'This is a test string with (multiple sets of parentheses) but should return the content within the last one';
    const result = getAddress(text);
    const expected = 'multiple sets of parentheses';
    expect(result).toBe(expected);
});

test('getAddress - should handle nested parentheses and return the content within the outermost set', () => {
    const text =
        'This is a test string with (nested (parentheses) within parentheses)';
    const result = getAddress(text);
    const expected = 'parentheses';
    expect(result).toBe(expected);
});
