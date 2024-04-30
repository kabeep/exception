import type { ChalkStyle } from '../shared/index.js';
import PrintError from './PrintError.js';

/**
 * A custom exception with enhanced printing capabilities.
 * @class
 * @extends PrintError
 */
class Exception extends PrintError {
    /**
     * Constructs a new Exception instance.
     * @constructor
     * @param {(string | Error)} [message] - The error message or an Error object.
     * @param {(ChalkStyle | ChalkStyle[])} [styles] - The styles to apply to the error message.
     */
    constructor(message?: string | Error, styles?: ChalkStyle | ChalkStyle[]) {
        super(message ?? '', styles ?? ['black', 'bgRed']);
    }

    /**
     * Returns a string representation of the Exception.
     * @returns {string} A string containing the name and message of the Exception.
     */
    toString() {
        return `${this.name}: ${this.message}`;
    }
}

export default Exception;
