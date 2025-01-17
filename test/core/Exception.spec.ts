import { expect, test } from 'vitest';
import Exception from '../../src/index.js';

test('Exception - constructor with no arguments should create an instance with default values', () => {
    const exception = new Exception();
    expect(exception.name).toBe('Exception');
    expect(exception.message).toBe('');
});

test('Exception - toString method should return correct string representation', () => {
    const exception = new Exception('Test error message');
    const toStringResult = exception.toString();
    expect(toStringResult).toBe('Exception: Test error message');
});
