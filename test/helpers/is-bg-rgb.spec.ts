import { expect, test } from 'vitest';
import isBgRgb from '../../src/helpers/is-bg-rgb';

test('isBgRgb - should return true for valid background RGB color format', () => {
    const value = 'bg(255,0,0)';
    const result = isBgRgb(value);
    expect(result).toBe(true);
});

test('isBgRgb - should return false for invalid background RGB color format', () => {
    const value = 'bg(red)';
    const result = isBgRgb(value);
    expect(result).toBe(false);
});

test('isBgRgb - should return false for background RGB color format with invalid values', () => {
    const value = 'bg(300,200,100)';
    const result = isBgRgb(value);
    expect(result).toBe(false);
});

test('isBgRgb - should return false for background RGB color format with invalid length', () => {
    const value = 'bg(255,0)';
    const result = isBgRgb(value);
    expect(result).toBe(false);
});

test('isBgRgb - should return false for background RGB color format with invalid characters', () => {
    const value = 'bg(255,0,abc)';
    const result = isBgRgb(value);
    expect(result).toBe(false);
});

test('isBgRgb - should return false for empty string', () => {
    const value = '';
    const result = isBgRgb(value);
    expect(result).toBe(false);
});
