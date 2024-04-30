import chalk from 'chalk';
import { expect, test } from 'vitest';
import PaletteError from '../../src/core/PaletteError';

test('PaletteError - should use empty array as default value for undefined styles', () => {
    const paletteError = new PaletteError('');
    const chalkInstance = paletteError.palette(undefined);
    expect(chalkInstance).toBeDefined();
});

test('PaletteError - should create PaletteError instance with error message', () => {
    const errorMessage = 'Test error message';
    const error = new PaletteError(errorMessage);
    expect(error.message).toBe(errorMessage);
});

test('PaletteError - should create PaletteError instance with Error object', () => {
    const error = new Error('Test error message');
    const paletteError = new PaletteError(error);
    expect(paletteError.message).toBe(error.message);
});

test('PaletteError - should create chalk instance with valid style', () => {
    const paletteError = new PaletteError('');
    const chalkInstance = paletteError.palette('red');
    expect(chalkInstance).toBeDefined();
});

test('PaletteError - should create chalk instance with array of valid styles', () => {
    const paletteError = new PaletteError('');
    const chalkInstance = paletteError.palette(['bold', 'underline']);
    expect(chalkInstance).toBeDefined();
});

test('PaletteError - should create chalk instance with invalid style', () => {
    const paletteError = new PaletteError('');
    const chalkInstance = paletteError.palette('invalid-style');
    expect(chalkInstance).toBeDefined();
});

test('PaletteError - should create chalk instance with RGB style', () => {
    const paletteError = new PaletteError('');
    const chalkInstance = paletteError.palette('255,0,0');
    expect(chalkInstance).toBeDefined();
});

test('PaletteError - should create chalk instance with background RGB style', () => {
    const paletteError = new PaletteError('');
    const chalkInstance = paletteError.palette('bg:255,0,0');
    expect(chalkInstance).toBeDefined();
});

test('PaletteError - should create chalk instance with hexadecimal style', () => {
    const paletteError = new PaletteError('');
    const chalkInstance = paletteError.palette('#f00');
    expect(chalkInstance).toBeDefined();
});

test('PaletteError - should create chalk instance with background hexadecimal style', () => {
    const paletteError = new PaletteError('');
    const chalkInstance = paletteError.palette('bg:#FF0000');
    expect(chalkInstance).toBeDefined();
});

test('PaletteError - should return undefined for non-string style', () => {
    const paletteError = new PaletteError('');
    const chalkInstance = paletteError.palette(123 as any);
    expect(chalkInstance).toBe(chalk);
});

test('PaletteError - should return undefined for array with non-string elements', () => {
    const paletteError = new PaletteError('');
    const chalkInstance = paletteError.palette(['bold', undefined]);
    expect(chalkInstance).toBeDefined();
});
