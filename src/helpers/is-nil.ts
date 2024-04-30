function isNil(value: any): value is undefined {
    // eslint-disable-next-line eqeqeq, no-eq-null
    return value == null;
}

export default isNil;
