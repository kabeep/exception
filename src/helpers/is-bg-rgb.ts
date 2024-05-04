import isRgb from './is-rgb.js';

function isBgRgb(value: string): value is string {
    if (!value.startsWith('bg')) return false;

    const rgbValue = value.slice(2).replace(/\s/g, '');
    return isRgb(rgbValue);
}

export default isBgRgb;
