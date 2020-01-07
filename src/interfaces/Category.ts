'use strict'

import Device from './Device';

/**
 * Defines the structure of the categories that can be created under the Sizes interface.
 */
export default interface Category {
  /**
   * One or more devices that fall under this Category.
   */
  [name: string]: Device;
}