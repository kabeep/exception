import isString from './is-string.js';

function normalizeNumber(value?: string | number) {
    return isString(value) ? Number.parseInt(value, 10) : value ?? Number.NaN;
}

export default normalizeNumber;
