export interface TraceOption {
    original: string;
    name: string;
    address: string;
    file: string | undefined;
    line: number | undefined;
    col: number | undefined;
    packageName: string;
}
