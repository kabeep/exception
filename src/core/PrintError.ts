import { basename } from 'node:path';
import process from 'node:process';
import type { ChalkStyle, TraceOption } from '../shared';
import TraceError from './TraceError';

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
     * @param {(ChalkStyle | ChalkStyle[])} styles - The styles to apply to the error message.
     */
    constructor(message: string | Error, styles: ChalkStyle | ChalkStyle[]) {
        super(message);

        const track = this.trace();

        const prefix = this.opening();

        const suffix = this.closing(styles);

        this.stack = [prefix, '', this.print(track), '', suffix].join('\n');
    }

    /**
     * Creates the opening part of the error stack trace.
     * @private
     * @returns {string} The opening part of the error stack trace.
     */
    private opening() {
        const title = ` ${this.message} `;
        const { length } = title;

        const width = this.calc(length + 2);

        const prefix = this.highlight('red', this.divide(Math.floor(width / 2)));
        const suffix = this.highlight('red', this.divide(Math.ceil(width / 2)));

        return `${prefix}${this.highlight('cyanBright', title)}${suffix}]`;
    }

    /**
     * Formats the trace information for printing.
     * @private
     * @param {TraceOption[]} track - The array of trace options.
     * @returns {string} The formatted trace information.
     */
    private print(track: TraceOption[]) {
        const root = process.cwd();
        const { length } = track;

        return track
            .map((item, index) => {
                if (!item) return;

                const title = this.palette('yellowBright')(`${item.file}:${item.line}`);
                const summary = `- ${title} ${item.name}`;

                const current = item.packageName.replace('[current]', basename(root));
                const startIndex = item.address?.indexOf(current);
                if (typeof startIndex !== 'number' || startIndex === -1) return;

                const shorthandAddress = item.address?.slice(Math.max(0, startIndex));
                if (!shorthandAddress) return;

                const isLatest = index === length - 1;
                let description = this.palette('gray')(shorthandAddress.replace(current, `(${current})`));
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
     * @param {(ChalkStyle | ChalkStyle[])} styles - The styles to apply to the error name.
     * @returns {string} The closing part of the error stack trace.
     */
    private closing(styles: ChalkStyle | ChalkStyle[]) {
        const title = ` ${this.name} `;
        const { length } = title;

        const width = this.calc(length + 3);

        const prefix = this.highlight('red', this.divide(width));
        const suffix = this.highlight('red', this.divide(1));

        return `[${prefix}${this.palette(styles)(title)}${suffix}`;
    }

    /**
     * Calculates the width of the terminal.
     * @private
     * @param {number} length - The length of the content.
     * @param {number} [defaultLength=32] - The default length to use if the terminal width cannot be determined.
     * @returns {number} The calculated width.
     */
    private calc(length: number, defaultLength = 32) {
        const clientWidth = (process.stdout?.columns || defaultLength) - length;

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
        return this.palette(color)(content);
    }

    /**
     * Creates a string of a specified length filled with a separator character.
     * @private
     * @param {number} length - The length of the string.
     * @param {string} [separator='-'] - The character to repeat.
     * @returns {string} The string filled with the separator character.
     */
    private divide(length: number, separator = '-') {
        return Array.from({ length }).fill(separator).join('');
    }
}
