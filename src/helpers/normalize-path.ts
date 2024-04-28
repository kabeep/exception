function normalizePath(path: string): string {
    return path.replace(/\\{1,2}/g, '/');
}

export default normalizePath;
