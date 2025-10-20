import { basename, dirname } from 'node:path';
import {
    getAddress,
    normalizeNumber,
    normalizePath,
    normalizeTrack,
} from '../helpers/index.js';
import type { TraceOption } from '../shared/index.js';
import PaletteError from './PaletteError.js';

/**
 * An error with stack trace information.
 * @class
 * @extends PaletteError
 */
export default class TraceError extends PaletteError {
    /**
     * Extracts trace information from the error stack.
     * @returns {TraceOption[]} An array of trace options.
     */
    trace() {
        const track: TraceOption[] = [];

        if (!this.stack) return track;

        for (const line of this.stack.split('\n')) {
            const text = line.trim();
            if (text === '') continue;

            const result = this.parse(text);
            if (result && this.funnel(result)) {
                track.push(result);
            }
        }

        return track;
    }

    /**
     * Filters out trace options with addresses starting with 'node:'.
     * @private
     * @param {TraceOption} option - The trace option to check.
     * @returns {boolean} Returns true if the option should be included.
     */
    private funnel(option: TraceOption) {
        return !option.address?.startsWith('node:');
    }

    /**
     * Parses a single line of the error stack trace.
     * @private
     * @param {string} text - The line of stack trace text.
     * @returns {TraceOption | undefined} A trace option object, or undefined if parsing fails.
     */
    private parse(text: string): TraceOption | undefined {
        const original = text;

        // Untraceable info
        if (!text.startsWith('at ')) return;

        // Unnecessary prefix
        text = text.replace(/^at /, '');

        // Unknown error
        if (
            text === 'Error (<anonymous>)' ||
            text === 'Error (<anonymous>:null:null)'
        ) {
            return undefined;
        }

        const isEval = text.startsWith('eval');
        let name: string | undefined;
        let address: string | undefined;
        let filepath: string | undefined;
        let directory: string | undefined;
        let file: string | undefined;
        let line: number | undefined;
        let col: number | undefined;
        let packageName = '[current]';

        const addressMatch = getAddress(text);
        if (addressMatch) {
            address = addressMatch.trim();
            name = isEval
                ? 'eval'
                : text
                      .slice(0, Math.max(0, text.length - address.length - 2))
                      .trim();
        } else {
            address = text;
            name = 'anonymous';
        }

        address = normalizePath(address);

        const lineMatch = /:(\d+):(\d+)\)?$/.exec(address);
        if (lineMatch) {
            line = normalizeNumber(lineMatch[1]);
            col = normalizeNumber(lineMatch[2]);
            filepath = normalizeTrack(
                address,
                0,
                address.length - lineMatch[0].length,
            );
        }

        if (filepath) {
            file = basename(filepath);
            directory = dirname(filepath);

            file = normalizePath(file);
            directory = normalizePath(directory);
        }

        if (directory) {
            const match = /node_modules\/([^/]+)(?!.*node_modules.*)/.exec(
                directory,
            );
            if (match) packageName = match[1];
        }

        return {
            original,
            name,
            address,
            file,
            line,
            col,
            packageName,
        };
    }
}
