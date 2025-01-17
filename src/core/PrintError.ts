import { basename } from 'node:path';
import { cwd, stdout } from 'node:process';
import type { WriteStream } from 'node:tty';
import { eastAsianWidth } from 'get-east-asian-width';
import type { ChalkInstance } from 'chalk-pipe';
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
    private opening(defaultLength?: number): string {
        let title = this.padding(this.message);
        const length = this.length(title);

        const width = this.calc((defaultLength ?? length) + 2);
        let halfWidth = Math.floor(width / 2);
        const isAlternate = halfWidth <= 0;
        if (isAlternate) {
            title = this.padding('Error Message');
            halfWidth = Math.floor((width + length - 15) / 2);
        }

        const prefixString = this.divide(halfWidth);
        const prefix = this.highlight('red', prefixString);

        const suffixString = this.divide(halfWidth);
        const suffix = this.highlight('red', suffixString);

        let output = `${prefix}${this.highlight('cyanBright', title)}${suffix}]`;
        if (isAlternate) {
            output += `\n${this.message}`;
            const divider = this.divide((this.column() ?? 32) - 2);
            output += `\n${this.highlight('grey', `[${divider}]`)}`;
        }

        return output;
    }

    /**
     * Formats the trace information for printing.
     * @private
     * @param {TraceOption[]} track - The array of trace options.
     * @returns {string} The formatted trace information.
     */
    private print(track: TraceOption[]): string {
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
    private closing(styles?: string, defaultLength?: number): string {
        let title = this.padding(this.name);
        const length = this.length(title);

        let width = this.calc((defaultLength ?? length) + 3);
        if (width <= 0) {
            title = this.padding('Exception');
            width += length - 9;
        }

        const prefix = this.highlight('red', this.divide(width));
        const suffix = this.highlight('red', this.divide(1));

        const stylish: ChalkInstance = this.palette(styles);
        return `[${prefix}${stylish(title)}${suffix}`;
    }

    /**
     * Calculates the display length of a string, considering East Asian Width rules.
     * @private
     * @param {string} content - The string content whose display length is to be calculated.
     * @returns {number} The total display length of the string, accounting for wide and narrow characters.
     */
    private length(content: string): number {
        let result = 0;
        for (const char of content) {
            const codePoint = char.codePointAt(0);
            if (typeof codePoint !== 'number') continue;

            result += eastAsianWidth(codePoint);
        }

        return result;
    }

    /**
     * Calculates the width of the terminal.
     * @private
     * @param {number} length - The length of the content.
     * @param {number} [defaultLength=32] - The default length to use if the terminal width cannot be determined.
     * @returns {number} The calculated width.
     */
    private calc(length: number, defaultLength = 32): number {
        const columns = this.column();

        return (columns ?? defaultLength) - length;
    }

    /**
     * Retrieves the current width of the terminal in columns.
     * @private
     * @returns {number | undefined} The number of columns in the terminal, or `undefined` if the terminal width cannot be determined.
     */
    private column(): number | undefined {
        return (stdout as (WriteStream & { fd: 1 }) | undefined)?.columns;
    }

    /**
     * Applies a highlight color to the content.
     * @private
     * @param {string} color - The color to apply.
     * @param {string} content - The content to highlight.
     * @returns {string} The highlighted content.
     */
    private highlight(color: string, content: string): string {
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
    private divide(length: number, separator = '-'): string {
        const ls: string[] = Array.from({ length }).map(() => separator);
        return ls.join('');
    }
}
