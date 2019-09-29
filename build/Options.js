'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
/**
 * The options available for this plugin along with their default values.
 */
class Options {
    /**
     * @param {Object} options The initialization options passed to this plugin.
     */
    constructor(options = {}) {
        /**
         * The path to save the outputted screenshot files to.
         *
         * @property {string}
         *
         * @default process.cwd
         */
        this.output = path_1.default.resolve(process.cwd(), 'screenshots');
        /**
         * Indicates whether all output should be muted or not.
         *
         * @property {boolean}
         *
         * @default false
         */
        this.silent = false;
        Object.assign(this, options);
    }
}
exports.default = Options;
