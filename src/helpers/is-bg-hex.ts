function isBgHex(value: string): value is string {
    const regular = /^bg:#[\da-fA-F]{1,3}([\da-fA-F]{3})?$/;
    return regular.test(value.replace(/\s/g, ''));
}

export default isBgHex;
