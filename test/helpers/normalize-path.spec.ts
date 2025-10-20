import { expect, test } from 'vitest';
import normalizePath from '../../src/helpers/normalize-path';

test('normalizePath - should replace single backslashes with slashes', () => {
    const path = 'C:\\Users\\User\\Documents\\file.txt';
    const result = normalizePath(path);
    expect(result).toBe('C:/Users/User/Documents/file.txt');
});

test('normalizePath - should replace double backslashes with slashes', () => {
    const path = '\\\\server\\share\\file.txt';
    const result = normalizePath(path);
    expect(result).toBe('/server/share/file.txt');
});

test('normalizePath - should handle mixed backslashes and slashes', () => {
    const path = 'C:\\Users/User/Documents\\file.txt';
    const result = normalizePath(path);
    expect(result).toBe('C:/Users/User/Documents/file.txt');
});

test('normalizePath - should handle path with no backslashes', () => {
    const path = '/usr/local/bin/file.txt';
    const result = normalizePath(path);
    expect(result).toBe('/usr/local/bin/file.txt');
});
