import { chalk } from 'chalk-pipe';
import { expect, test } from 'vitest';
import PaletteError from '../../src/core/PaletteError';

test('PaletteError - should create an instance with uncorrected error message', () => {
    const error = new PaletteError(undefined as any);
    expect(error.message).toBe('');
});

test('PaletteError - should create an instance with Error object', () => {
    const errorMessage = 'Test error message';
    const errorObject = new Error(errorMessage);
    const error = new PaletteError(errorObject);
    expect(error.message).toBe(errorMessage);
});

test('PaletteError.palette - should return a Chalk instance with specified styles applied', () => {
    const styles = 'blue.bold.bgRed';
    const paletteError = new PaletteError('');
    const result = paletteError.palette(styles, chalk);
    const expected = chalk.blue.bold.bgRed;
    expect(result).toBe(expected);
});

test(
    'PaletteError.palette - should return a Chalk instance with default style if styles parameter is not a string',
    () => {
        const paletteError = new PaletteError('');
        const result = paletteError.palette(undefined, chalk);
        const expected = chalk;
        expect(result).toBe(expected);
    }
);

test('PaletteError.padding - should add padding around the provided content', () => {
    const content = 'Test content';
    const paletteError = new PaletteError('');
    const result = paletteError.padding(content);
    const expected = ` ${content} `;
    expect(result).toBe(expected);
});

test('PaletteError - should set correct name property', () => {
    const errorMessage = 'Test error message';
    const error = new PaletteError(errorMessage);
    expect(error.name).toBe('PaletteError');
});

test('PaletteError.palette - should handle rgb style without chain and return Chalk instance', () => {
    const styles = '(24, 144, 255)';
    const paletteError = new PaletteError('');
    const result = paletteError.palette(styles, undefined);
    const expected = chalk.rgb(24, 144, 255);
    expect(result('Test')).toEqual(expected('Test'));
});

test('PaletteError.palette - should handle bgRgb style with chain and return Chalk instance', () => {
    const styles = 'bg(255, 0, 0)';
    const paletteError = new PaletteError('');
    const result = paletteError.palette(styles, chalk);
    const expected = chalk.bgRgb(255, 0, 0);
    expect(result('Test')).toEqual(expected('Test'));
});

test('PaletteError.info - should return formatted message without styles', () => {
    const errorMessage = 'Test error message';
    const error = new PaletteError(errorMessage);
    const result = error.info();
    const expected = `  ${error.name}  ${errorMessage}`;
    expect(result).toBe(expected);
});

test('PaletteError.info - should return formatted message with styles', () => {
    const errorMessage = 'Test error message';
    const styles = 'red.bold.underline';
    const error = new PaletteError(errorMessage);
    const result = error.info(styles);
    const expected = ` ${chalk.red.bold.underline(` ${error.name} `)} ${errorMessage}`;
    expect(result).toBe(expected);
});

test('PaletteError.info - should handle undefined styles', () => {
    const errorMessage = 'Test error message';
    const error = new PaletteError(errorMessage);
    const result = error.info(undefined);
    const expected = `  ${error.name}  ${errorMessage}`;
    expect(result).toBe(expected);
});

test('PaletteError.info - should handle empty styles', () => {
    const errorMessage = 'Test error message';
    const error = new PaletteError(errorMessage);
    const result = error.info('');
    const expected = `  ${error.name}  ${errorMessage}`;
    expect(result).toBe(expected);
});
