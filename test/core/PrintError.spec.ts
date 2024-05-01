import { expect, test } from 'vitest';
import PrintError from '../../src/core/PrintError';
import type { TraceOption } from '../../src/shared';

test('PrintError - should create an instance with correct message and stack', () => {
    const errorMessage = 'Test error message';
    const error = new PrintError(errorMessage);
    expect(error.message).toBe(errorMessage);
    expect(error.stack).toContain(errorMessage); // 栈中应包含错误消息
});

test('PrintError.opening - should generate correct opening part of error stack trace', () => {
    const errorMessage = 'Test error message';
    const printError = new PrintError(errorMessage);
    const opening = printError['opening'](); // 使用私有方法需要使用字符串形式的键名
    expect(opening).toContain(errorMessage); // 开头部分应包含错误消息
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

test('PrintError.calc - should return default length when terminal width is minimal', () => {
    const printError = new PrintError('');
    process.stdout.columns = 1;
    const width = printError['calc'](12);
    expect(width).toBe(32);
});

test('PrintError.print - should generate correct trace information', () => {
    const printError = new PrintError('');
    const track = [
        {
            file: 'example.js',
            line: 10,
            name: 'exampleFunction',
            packageName: 'example-package',
            address: '/path/to/example-package/example.js',
        },
        {
            file: 'another.js',
            line: 20,
            name: 'anotherFunction',
            packageName: '[current]',
            address: '/path/to/current/another.js',
        },
        {
            file: 'another.js',
            line: 20,
            name: 'anotherFunction',
            packageName: '[current]',
        },
    ];

    const expected =
        `- ${printError.palette('yellowBright')('example.js:10')} exampleFunction\n` +
        `  ${printError.palette('gray')('(example-package)/example.js')}\n`;

    const result = printError['print'](track as TraceOption[]);
    expect(result).toBe(expected);
});
