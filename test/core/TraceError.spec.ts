import { expect, test } from 'vitest';
import TraceError from '../../src/core/TraceError';

test('TraceError - should parse stack trace and return trace options', () => {
    const error = new TraceError('test');
    const trace = error.trace();
    expect(trace[0].name).toEqual('<anonymous>');
    expect(trace[0].file).toEqual('TraceError.spec.ts');
    expect(trace[0].line).toEqual(5);
    expect(trace[0].col).toEqual(19);
    expect(trace[0].packageName).toEqual('[current]');
});
