function normalizeRgb(color: string, prefix = ''): [number, number, number] {
    const length = color.startsWith(prefix) ? prefix.length : 0;
    const rgb = color.replace(/[\s()]/g, '').slice(Math.max(0, length));

    const [r, g, b] = rgb.split(',').map(Number);

    return [r, g, b] as const;
}

export default normalizeRgb;
