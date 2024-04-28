import { expect, test } from 'vitest';
import isHex from '../../src/helpers/is-hex';

test('isHex - should return true for valid hex color format', () => {
    const value = '#f00'; // 红色
    const result = isHex(value);
    expect(result).toBe(true);
});

test('isHex - should return true for hex color format with shorthand', () => {
    const value = '#abc'; // 长度不合法
    const result = isHex(value);
    expect(result).toBe(true);
});

test('isHex - should return false for invalid hex color format', () => {
    const value = 'red'; // 非十六进制格式
    const result = isHex(value);
    expect(result).toBe(false);
});

test('isHex - should return false for hex color format with invalid characters', () => {
    const value = '#gggggg'; // 包含非十六进制字符
    const result = isHex(value);
    expect(result).toBe(false);
});

test('isHex - should return false for empty string', () => {
    const value = ''; // 空字符串
    const result = isHex(value);
    expect(result).toBe(false);
});
