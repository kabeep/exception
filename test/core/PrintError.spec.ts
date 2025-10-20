import { expect, test } from 'vitest';
import PrintError from '../../src/core/PrintError';
import type { TraceOption } from '../../src/shared';

test('PrintError - should create an instance with correct message and stack', () => {
    const errorMessage = 'Test error message';
    const error = new PrintError(errorMessage);
    expect(error.message).toBe(errorMessage);
    expect(error.stack).toContain(errorMessage);
});

test('PrintError.opening - should generate correct opening part of error stack trace', () => {
    const errorMessage = 'Test error message';
    const printError = new PrintError(errorMessage);
    const opening = printError['opening']();
    expect(opening).toContain(errorMessage);
});

test('PrintError.opening - should generate correct opening part of error stack trace', () => {
    const errorMessage = 'Test error message';
    const printError = new PrintError(errorMessage);
    const opening = printError['opening']();
    const expectedPrefix = printError['highlight']('red', printError['divide'](process.stdout?.columns - 20));
    const expectedSuffix = printError['highlight']('red', printError['divide'](process.stdout?.columns - 20));
    expect(opening).toContain(errorMessage);
    expect(opening).toContain(expectedPrefix);
    expect(opening).toContain(expectedSuffix);
});

test('PrintError.closing - should generate correct closing part of error stack trace', () => {
    const errorMessage = 'Test error message';
    const printError = new PrintError(errorMessage);
    const closing = printError['closing']();
    const expectedPrefix = printError['highlight']('red', printError['divide'](process.stdout?.columns - 21));
    const expectedSuffix = printError['highlight']('red', printError['divide'](1));
    expect(closing).toContain(printError.constructor.name);
    expect(closing).toContain(expectedPrefix);
    expect(closing).toContain(expectedSuffix);
});

test('PrintError.print - should generate correct trace information', () => {
    const printError = new PrintError('');
    const track: TraceOption[] = [
        {
            original: 'at exampleFunction (/path/to/example-package/example.js:10:1)',
            file: 'example.js',
            line: 10,
            col: 1,
            name: 'exampleFunction',
            packageName: 'example-package',
            address: '/path/to/example-package/example.js'
        },
        {
            original: 'at anotherFunction (/path/to/current/another.js:20:2)',
            file: 'another.js',
            line: 20,
            col: 2,
            name: 'anotherFunction',
            packageName: '[current]',
            address: '/path/to/current/another.js'
        }
    ];

    const expected =
        `- ${printError.palette('yellowBright')('example.js:10')} exampleFunction\n` +
        `  ${printError.palette('gray')('(example-package)/example.js')}\n\n` +
        `- ${printError.palette('yellowBright')('another.js:20')} anotherFunction\n` +
        `  ${printError.palette('gray')('/path/to/current/another.js')}`;

    const result = printError['print'](track as TraceOption[]);
    expect(result).toBe(expected);
});
