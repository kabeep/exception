import chalk, { type ChalkInstance } from 'chalk';
import chalkPipe from 'chalk-pipe';
import { isBgRgb, isNil, isRgb, isString, normalizeRgb } from '../helpers/index.js';

/**
 * A palette error.
 * @class
 * @extends Error
 */
export default class PaletteError extends Error {
    /**
     * Constructs a new PaletteError instance.
     * @constructor
     * @param {(string | Error)} message - The error message or an Error object.
     */
    constructor(message: string | Error) {
        super(isString(message) ? message : message?.message || '');

        /**
         * The name of the error.
         * @type {string}
         */
        this.name = this.constructor.name;
    }

    /**
     * Returns a Chalk instance with specified styles applied.
     * @param {string} styles - The styles to apply.
     * @param {ChalkInstance} chain - The Chalk instance to chain with.
     * @returns {ChalkInstance} A Chalk instance with the specified styles.
     */
    palette(styles?: string, chain?: ChalkInstance): ChalkInstance {
        if (!isString(styles)) {
            styles = '';
        }

        const list = styles
            .split('.')
            .map((style: string) => {
                const _isRgb = isRgb(style);
                const _isBgRgb = isBgRgb(style);
                if (!_isRgb && !_isBgRgb) return style;

                if (isNil(chain)) chain = chalk;

                const rgb = normalizeRgb(style, 'bg');
                chain = _isRgb ? chain.rgb(...rgb) : chain.bgRgb(...rgb);

                return undefined;
            })
            .filter(Boolean);

        return chalkPipe(list.join('.'), chain);
    }

    /**
     * Adds padding around the provided content.
     * @param {string} content - The content to pad.
     * @returns {string} The padded content.
     */
    padding(content: string) {
        return ` ${content} `;
    }
}
