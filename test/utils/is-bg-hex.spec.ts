import { expect, test } from 'vitest';
import isBgHex from '../../src/helpers/is-bg-hex';

test('isBgHex - should return true for valid background color hex format', () => {
    const value = 'bg:#ff0000'; // 红色背景色
    const result = isBgHex(value);
    expect(result).toBe(true);
});

test('isBgHex - should return true for background color hex format with shorthand', () => {
    const value = 'bg:#abc'; // 长度不合法
    const result = isBgHex(value);
    expect(result).toBe(true);
});

test('isBgHex - should return false for invalid background color hex format', () => {
    const value = 'bg:red'; // 非十六进制格式
    const result = isBgHex(value);
    expect(result).toBe(false);
});

test('isBgHex - should return false for background color hex format with invalid characters', () => {
    const value = 'bg:#gggggg'; // 包含非十六进制字符
    const result = isBgHex(value);
    expect(result).toBe(false);
});

test('isBgHex - should return false for empty string', () => {
    const value = ''; // 空字符串
    const result = isBgHex(value);
    expect(result).toBe(false);
});
