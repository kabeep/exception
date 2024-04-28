import { expect, test } from 'vitest';
import isBgRgb from '../../src/helpers/is-bg-rgb';

test('isBgRgb - should return true for valid background RGB color format', () => {
    const value = 'bg:255,0,0'; // 红色背景色
    const result = isBgRgb(value);
    expect(result).toBe(true);
});

test('isBgRgb - should return false for invalid background RGB color format', () => {
    const value = 'bg:red'; // 非 RGB 格式
    const result = isBgRgb(value);
    expect(result).toBe(false);
});

test('isBgRgb - should return false for background RGB color format with invalid values', () => {
    const value = 'bg:300,200,100'; // 超出范围的值
    const result = isBgRgb(value);
    expect(result).toBe(false);
});

test('isBgRgb - should return false for background RGB color format with invalid length', () => {
    const value = 'bg:255,0'; // 长度不合法
    const result = isBgRgb(value);
    expect(result).toBe(false);
});

test('isBgRgb - should return false for background RGB color format with invalid characters', () => {
    const value = 'bg:255,0,abc'; // 包含非数字字符
    const result = isBgRgb(value);
    expect(result).toBe(false);
});

test('isBgRgb - should return false for empty string', () => {
    const value = ''; // 空字符串
    const result = isBgRgb(value);
    expect(result).toBe(false);
});
