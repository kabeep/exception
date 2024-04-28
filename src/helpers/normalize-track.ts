function normalizeTrack(string_: string, start: number, end: number) {
    return string_.slice(Math.max(0, start), Math.max(0, end)).trim();
}

export default normalizeTrack;
