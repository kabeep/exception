function isRgb(value: string): value is string {
    const rgbRegular = /^\(\d{1,3},\d{1,3},\d{1,3}\)$/;
    const validRgb = rgbRegular.test(value.replace(/\s/g, ''));
    if (!validRgb) return false;

    const numberRegular = /\d{1,3}/g;
    const numberMatch = value.match(numberRegular);

    return Boolean(numberMatch?.every((item) => Number(item) <= 255));
}

export default isRgb;
