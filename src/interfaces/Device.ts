'use strict'

/**
 * Defines the structure of the devices defined under a Category interface.
 */
export default interface Device {
  /**
   * The name of the device with an Array that contains the width and height values for that device.
   */
  [name: string]: Array<number>;
}