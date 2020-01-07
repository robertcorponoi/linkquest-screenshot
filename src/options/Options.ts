'use strict'

import Sizes from '../interfaces/Sizes';

/**
 * Defines the options available for an instance of linkquest-screenshot and their default values.
 */
export default class Options {
  /**
   * The output destination of the screenshots generated.
   * 
   * @property {string}
   * 
   * @default process.cwd()
   */
  output: string = process.cwd();

  /**
   * The sizes that define the screenshots to take.
   * 
   * @property
   */
  sizes: Sizes = {};

  /**
   * Any other properties passed by the main linkquest module for the plugin to be able to work.
   * 
   * @property {*}
   */
  [key: string]: any;

  /**
   * @param {Object} options The initialization options passed to linkquest-screenshot.
   */
  constructor(options: Object) {
    Object.assign(this, options);
  }
}