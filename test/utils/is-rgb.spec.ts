import { expect, test } from 'vitest';
import isRgb from '../../src/helpers/is-rgb';

test('isRgb - should return true for valid RGB color format', () => {
    const value = '255,0,0'; // 红色
    const result = isRgb(value);
    expect(result).toBe(true);
});

test('isRgb - should return false for invalid RGB color format', () => {
    const value = 'red'; // 非 RGB 格式
    const result = isRgb(value);
    expect(result).toBe(false);
});

test('isRgb - should return false for RGB color format with invalid values', () => {
    const value = '300,200,100'; // 超出范围的值
    const result = isRgb(value);
    expect(result).toBe(false);
});

test('isRgb - should return false for RGB color format with invalid length', () => {
    const value = '255,0'; // 长度不合法
    const result = isRgb(value);
    expect(result).toBe(false);
});

test('isRgb - should return false for RGB color format with invalid characters', () => {
    const value = '255,0,abc'; // 包含非数字字符
    const result = isRgb(value);
    expect(result).toBe(false);
});

test('isRgb - should return false for empty string', () => {
    const value = ''; // 空字符串
    const result = isRgb(value);
    expect(result).toBe(false);
});
