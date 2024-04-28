export type TraceOption = {
    original: string;
    name: string | undefined;
    address: string | undefined;
    file: string | undefined;
    line: number | undefined;
    col: number | undefined;
    packageName: string;
};
