import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs'],
    outDir: 'dist',
    target: ['es2020'],
    // treeshake: 'smallest',
    bundle: true,
    clean: true,
    minify: false,
    splitting: true,
    cjsInterop: true,
    legacyOutput: true,
});
