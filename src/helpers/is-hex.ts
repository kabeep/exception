function isHex(value: string): value is string {
    const regular = /^#[\da-fA-F]{1,3}([\da-fA-F]{3})?$/;
    return regular.test(value.replace(/\s/g, ''));
}

export default isHex;
