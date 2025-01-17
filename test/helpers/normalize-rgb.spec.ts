import { expect, test } from 'vitest';
import normalizeRgb from '../../src/helpers/normalize-rgb.js';

test('normalizeRgb - should normalize RGB color string', () => {
    const color = '(255, 0, 0)';
    const result = normalizeRgb(color);
    expect(result).toEqual([255, 0, 0]);
});

test('normalizeRgb - should normalize RGB color string with prefix', () => {
    const color = 'bg(0, 255, 0)';
    const result = normalizeRgb(color, 'bg');
    expect(result).toEqual([0, 255, 0]);
});
