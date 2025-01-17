import { expect, test } from 'vitest';
import TraceError from '../../src/core/TraceError.js';

test('trace - should return empty array when stack is empty', () => {
    const traceError = new TraceError('');
    traceError.stack = undefined;
    const result = traceError.trace();
    expect(result).toEqual([]);
});

test('trace - should return correct anonymous trace options array', () => {
    const traceError = new TraceError('');
    traceError.stack = `
            at <anonymous> (example/file.js:1:2)
            at example/file.js:3:4
    `;
    const result = traceError.trace();
    const expected = [
        {
            original: 'at <anonymous> (example/file.js:1:2)',
            name: '<anonymous>',
            address: 'example/file.js:1:2',
            file: 'file.js',
            line: 1,
            col: 2,
            packageName: '[current]',
        },
        {
            original: 'at example/file.js:3:4',
            name: 'anonymous',
            address: 'example/file.js:3:4',
            file: 'file.js',
            line: 3,
            col: 4,
            packageName: '[current]',
        },
    ];
    expect(result).toEqual(expected);
});

test('trace - should return correct partial trace options array', () => {
    const traceError = new TraceError('');
    traceError.stack = `
            at example/file.js
    `;
    const result = traceError.trace();
    const expected = [
        {
            original: 'at example/file.js',
            name: 'anonymous',
            address: 'example/file.js',
            file: undefined,
            line: undefined,
            col: undefined,
            packageName: '[current]',
        },
    ];
    expect(result).toEqual(expected);
});

test('trace - should return correct empty trace options array', () => {
    const traceError = new TraceError('');
    traceError.stack = `
            at Module._compile (node:internal/modules/cjs/loader:1256:14)
            at Object.Module._extensions..js (node:internal/modules/cjs/loader:1285:10)
            at Module.load (node:internal/modules/cjs/loader:1100:32)
            at Function.Module._load (node:internal/modules/cjs/loader:962:14)
            at Module.require (node:internal/modules/cjs/loader:1142:19)
            at require (node:internal/modules/cjs/helpers:88:18)
            at Module._compile (node:internal/modules/cjs/loader:1256:14)
            at Error (<anonymous>)
            at Error (<anonymous>:null:null)
    `;
    const result = traceError.trace();
    expect(result).toEqual([]);
});

test('trace - should return correct trace options array', () => {
    const stack = `
            at functionName (example/file.js:123:456)
            at eval (eval at <anonymous> (example/file.js:789:101112), <anonymous>:1:2)
            at Object.<anonymous> (example/file.js:171819:20)
            at Object.<anonymous> (example/file.js:212223:24)
        `;
    const traceError = new TraceError('');
    traceError.stack = stack;
    const result = traceError.trace();
    const expected = [
        {
            original: 'at functionName (example/file.js:123:456)',
            name: 'functionName',
            address: 'example/file.js:123:456',
            file: 'file.js',
            line: 123,
            col: 456,
            packageName: '[current]',
        },
        {
            original: 'at eval (eval at <anonymous> (example/file.js:789:101112), <anonymous>:1:2)',
            name: 'eval',
            address: 'example/file.js:789:101112',
            file: 'file.js',
            line: 789,
            col: 101112,
            packageName: '[current]',
        },
        {
            original: 'at Object.<anonymous> (example/file.js:171819:20)',
            name: 'Object.<anonymous>',
            address: 'example/file.js:171819:20',
            file: 'file.js',
            line: 171819,
            col: 20,
            packageName: '[current]',
        },
        {
            original: 'at Object.<anonymous> (example/file.js:212223:24)',
            name: 'Object.<anonymous>',
            address: 'example/file.js:212223:24',
            file: 'file.js',
            line: 212223,
            col: 24,
            packageName: '[current]',
        },
    ];
    expect(result).toEqual(expected);
});
