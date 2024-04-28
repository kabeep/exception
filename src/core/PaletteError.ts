import chalk, { type Chalk } from 'chalk';
import { isBgHex, isBgRgb, isHex, isRgb, isString, normalizeRgb } from '../helpers';

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
    constructor (message: string | Error) {
        super((
            message as Error
        )?.message || (
            message as string
        ));

        /**
         * The name of the error.
         * @type {string}
         */
        this.name = this.constructor.name;
    }

    /**
     * Returns a Chalk instance with specified styles applied.
     * @param {(string | string[])} [styles=[]] - The styles to apply.
     * @param {Chalk} [chain] - The Chalk instance to chain with.
     * @returns {Chalk} A Chalk instance with the specified styles.
     */
    palette (styles: string | string[] = [], chain?: Chalk): Chalk {
        console.log('styles: ', styles);
        const isArray = Array.isArray(styles);
        const isIllegal = !isArray && !isString(styles);

        if (isIllegal) return chalk;

        if (isString(styles)) {
            styles = [styles];
        }

        const style = styles.pop();
        const isLatest = styles.length === 0;

        let nextChain = this.factory(chain ?? chalk, style);

        if (!nextChain) {
            nextChain = chain ?? chalk;
            console.log(`ReferenceWarn: Unexpected ${style} style for chalk chain`);
        }

        if (isLatest) {
            return nextChain;
        }

        return this.palette(styles, nextChain);
    }

    /**
     * Creates a Chalk instance based on the given style.
     * @private
     * @param {Chalk} chain - The Chalk instance to chain with.
     * @param {string} [style] - The style to apply.
     * @returns {Chalk} A Chalk instance with the specified style.
     */
    private factory (chain: Chalk, style?: string): Chalk {
        let nextChain;

        if (!isString(style)) {
            return chain;
        }

        if (isBgRgb(style)) {
            nextChain = chain.bgRgb(...normalizeRgb(style, 'bg:'));
        } else if (isRgb(style)) {
            nextChain = chain.rgb(...normalizeRgb(style));
        } else if (isBgHex(style)) {
            nextChain =
                chain.bgHex((
                    style as string
                ).replace(/^bg:/, ''));
        } else if (isHex(style)) {
            nextChain = chain.hex(style);
        } else {
            nextChain = chain[style];
        }

        return nextChain;
    }
}
