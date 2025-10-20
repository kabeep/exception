import { magenta } from '@kabeep/palette';
import { accessSync, constants as fsMode, unlinkSync as remove } from 'node:fs';
import { resolve as pathResolve } from 'node:path';
import { defineConfig } from 'tsup';

const resolve = (...args: string[]) => pathResolve(__dirname, ...args);
const print = (label: string) => (text: string) => console.log(label, text);

export default defineConfig((opts) => (
    {
        entry: ['src/index.ts'],
        format: ['cjs', 'esm'],
        target: ['es2015'],
        outDir: 'dist',
        bundle: true,
        clean: !opts.watch,
        minify: false,
        treeshake: opts.watch ? false : 'smallest',
        sourcemap: false,
        splitting: false,
        cjsInterop: true,
        legacyOutput: false,
        dts: true,
        async onSuccess () {
            if (opts.watch) return;

            const label = magenta('HOOK');
            const log = print(label);

            // The `tsup` will emit separate d.ts and d.mts declarations starting from version 8.0.1,
            // but this package does not need it currently. It will only increase the package size.
            // See https://github.com/egoist/tsup/pull/934
            const srcMtsFile = 'dist/index.d.mts';
            const srcMtsFilePath = resolve(srcMtsFile);
            const isExists = await wait(srcMtsFilePath);
            if (!isExists) return;
            remove(srcMtsFilePath);
            log(`rm ${magenta(srcMtsFile)}`);
        }
    }
));

function sleep (interval: number) {
    return new Promise<void>((res) => {
        setTimeout(() => {
            res();
        }, interval);
    });
}

/** Exists sync for file or directory */
function access (path: string) {
    try {
        accessSync(path, fsMode.F_OK);
        return true;
    } catch {
        return false;
    }
}

/** Wait for file */
async function wait (path: string, timeout = 5000, interval = 1000) {
    let poll = Math.floor(timeout / interval);
    if (poll <= 0) return false;

    while (poll--) {
        if (access(path)) return true;
        await sleep(interval);
    }
}
