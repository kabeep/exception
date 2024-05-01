import type { ChalkInstance } from 'chalk';
import { basename } from 'node:path';
import { cwd, stdout } from 'node:process';
import type { WriteStream } from 'node:tty';
import type { TraceOption } from '../shared/index.js';
import TraceError from './TraceError.js';

/**
 * An error with formatted printing capabilities.
 * @class
 * @extends TraceError
 */
export default class PrintError extends TraceError {
    /**
     * Constructs a new PrintError instance.
     * @constructor
     * @param {(string | Error)} message - The error message or an Error object.
     * @param {string} styles - The styles to apply to the error message.
     */
    constructor(message: string | Error, styles?: string) {
        super(message);

        const track = this.trace();

        const prefix = this.opening();

        const suffix = this.closing(styles);

        this.stack = [prefix, '', this.print(track), '', suffix].join('\n');
    }

    /**
     * Creates the opening part of the error stack trace.
     * @private
     * @param {number} [defaultLength] - The default length to use if the title length is not provided.
     * @returns {string} The opening part of the error stack trace.
     */
    private opening(defaultLength?: number) {
        const title = ` ${this.message} `;
        const { length } = title;

        const width = this.calc((defaultLength ?? length) + 2) / 2;

        const prefixLength = Math.floor(width);
        const prefixString = this.divide(prefixLength);
        const prefix = this.highlight('red', prefixString);

        const suffixLength = Math.ceil(width);
        const suffixString = this.divide(suffixLength);
        const suffix = this.highlight('red', suffixString);

        return `${prefix}${this.highlight('cyanBright', title)}${suffix}]`;
    }

    /**
     * Formats the trace information for printing.
     * @private
     * @param {TraceOption[]} track - The array of trace options.
     * @returns {string} The formatted trace information.
     */
    private print(track: TraceOption[]) {
        const root: string = basename(cwd());
        const { length } = track;

        return track
            .map((item, index) => {
                const titleStylish: ChalkInstance = this.palette('yellowBright');
                const title = titleStylish(`${item.file}:${item.line}`);
                const summary = `- ${title} ${item.name}`;

                const current = item.packageName.replace('[current]', root);
                const startIndex = item.address.indexOf(current);
                const shorthandAddress = item.address.slice(Math.max(0, startIndex));

                const descStylish: ChalkInstance = this.palette('gray');
                let description = descStylish(shorthandAddress.replace(current, `(${current})`));

                const isLatest = index === length - 1;
                if (!isLatest) {
                    description += '\n';
                }

                return [summary, `  ${description}`].join('\n');
            })
            .filter(Boolean)
            .join('\n');
    }

    /**
     * Creates the closing part of the error stack trace.
     * @private
     * @param {string} [styles] - The styles to apply to the error name.
     * @param {number} [defaultLength] - The default length to use if the title length is not provided.
     * @returns {string} The closing part of the error stack trace.
     */
    private closing(styles?: string, defaultLength?: number) {
        const title = this.padding(this.name);
        const { length } = title;

        const width = this.calc((defaultLength ?? length) + 3);

        const prefix = this.highlight('red', this.divide(width));
        const suffix = this.highlight('red', this.divide(1));

        const stylish: ChalkInstance = this.palette(styles);
        return `[${prefix}${stylish(title)}${suffix}`;
    }

    /**
     * Calculates the width of the terminal.
     * @private
     * @param {number} length - The length of the content.
     * @param {number} [defaultLength=32] - The default length to use if the terminal width cannot be determined.
     * @returns {number} The calculated width.
     */
    private calc(length: number, defaultLength = 32) {
        const columns: number | undefined = (stdout as (WriteStream & { fd: 1 }) | undefined)?.columns;

        const clientWidth = (columns ?? defaultLength) - length;
        return clientWidth <= 0 ? defaultLength : clientWidth;
    }

    /**
     * Applies a highlight color to the content.
     * @private
     * @param {string} color - The color to apply.
     * @param {string} content - The content to highlight.
     * @returns {string} The highlighted content.
     */
    private highlight(color: string, content: string) {
        const stylish: ChalkInstance = this.palette(color);
        return stylish(content);
    }

    /**
     * Creates a string of a specified length filled with a separator character.
     * @private
     * @param {number} length - The length of the string.
     * @param {string} [separator='-'] - The character to repeat.
     * @returns {string} The string filled with the separator character.
     */
    private divide(length: number, separator = '-') {
        const ls: string[] = Array.from({ length }).map(() => separator);
        return ls.join('');
    }
}
