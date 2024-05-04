function getAddress(text: string) {
    let index = 0;
    let start = -1;
    let end = -1;

    while (index >= 0) {
        const nextIndex = text.slice(Math.max(0, index)).indexOf('(');
        index = nextIndex > 0 ? nextIndex + index + 1 : -1;

        if (nextIndex > 0) {
            start = index;
        }
    }

    if (start === -1) return '';

    index = text.slice(Math.max(0, start)).indexOf(')');
    if (index === -1) return '';

    end = index + start;

    return text.slice(start, end);
}

export default getAddress;
