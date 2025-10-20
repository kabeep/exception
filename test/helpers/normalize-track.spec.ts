import { expect, test } from 'vitest';
import normalizeTrack from '../../src/helpers/normalize-track';

test('normalizeTrack - should extract and trim substring within specified range', () => {
    const string_ = 'This is a test string.';
    const start = 2;
    const end = 15;
    const result = normalizeTrack(string_, start, end);
    expect(result).toBe('is is a test');
});

test('normalizeTrack - should handle negative start index', () => {
    const string_ = 'This is a test string.';
    const start = -5;
    const end = 10;
    const result = normalizeTrack(string_, start, end);
    expect(result).toBe('This is a');
});

test('normalizeTrack - should handle end index beyond string length', () => {
    const string_ = 'This is a test string.';
    const start = 5;
    const end = 100;
    const result = normalizeTrack(string_, start, end);
    expect(result).toBe('is a test string.');
});

test('normalizeTrack - should handle start index beyond string length', () => {
    const string_ = 'This is a test string.';
    const start = 100;
    const end = 105;
    const result = normalizeTrack(string_, start, end);
    expect(result).toBe('');
});

test('normalizeTrack - should handle empty string', () => {
    const string_ = '';
    const start = 0;
    const end = 5;
    const result = normalizeTrack(string_, start, end);
    expect(result).toBe('');
});
