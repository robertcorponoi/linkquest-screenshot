'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines the options available for an instance of linkquest-screenshot and their default values.
 */
class Options {
    /**
     * @param {Object} options The initialization options passed to linkquest-screenshot.
     */
    constructor(options) {
        /**
         * The output destination of the screenshots generated.
         *
         * @property {string}
         *
         * @default process.cwd()
         */
        this.output = process.cwd();
        /**
         * The sizes that define the screenshots to take.
         *
         * @property
         */
        this.sizes = {};
        Object.assign(this, options);
    }
}
exports.default = Options;
