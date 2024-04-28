function isBgRgb(value: string): value is string {
    const rgbRegular = /^bg:(?:\d{1,3},){2}\d{1,3}$/;
    const numberRegular = /\d{1,3}/g;

    const numberMatch = value.match(numberRegular);
    const validNumber = Boolean(numberMatch?.every((item) => Number(item) <= 255));

    const validRgb = rgbRegular.test(value.replace(/\s/g, ''));
    return validNumber && validRgb;
}

export default isBgRgb;
