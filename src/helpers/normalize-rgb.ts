function normalizeRgb(color: string, prefix = ''): [number, number, number] {
    const rgb = color.replace(/[\s()]/g, '').replace(new RegExp(`^${prefix}`), '');

    const [r, g, b] = rgb.split(',').map(Number);

    return [r, g, b] as const;
}

export default normalizeRgb;
