'use strict'

import Category from './Category';

/**
 * Defines the structure of the sizes of screenshots that should be taken.
 */
export default interface Sizes {
  /**
   * One or more categories for screenshot sizes.
   */
  [key: string]: Category;
}