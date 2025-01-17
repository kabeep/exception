import { expect, test } from 'vitest';
import isRgb from '../../src/helpers/is-rgb.js';

test('isRgb - should return true for valid RGB color format', () => {
    const value = '(255,0,0)';
    const result = isRgb(value);
    expect(result).toBe(true);
});

test('isRgb - should return false for invalid RGB color format', () => {
    const value = 'red';
    const result = isRgb(value);
    expect(result).toBe(false);
});

test('isRgb - should return false for RGB color format with invalid values', () => {
    const value = '(300,200,100)';
    const result = isRgb(value);
    expect(result).toBe(false);
});

test('isRgb - should return false for RGB color format with invalid length', () => {
    const value = '(255,0)';
    const result = isRgb(value);
    expect(result).toBe(false);
});

test('isRgb - should return false for RGB color format with invalid characters', () => {
    const value = '(255,0,abc)';
    const result = isRgb(value);
    expect(result).toBe(false);
});

test('isRgb - should return false for empty string', () => {
    const value = '';
    const result = isRgb(value);
    expect(result).toBe(false);
});
