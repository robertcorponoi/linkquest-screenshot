'use strict'

import fs from 'fs-extra';

/**
 * Plugin for Linkquest that takes a screenshot of the current page with the options provided.
 * 
 * @param {Object} [options]
 * @param {string} [options.output=process.cwd()] Where should the outputted screenshots be saved to.
 * @param {Object} options.sizes The sizes for the screenshots to generate.
 * @param {Object} options.sizes.category An Object of categories which will be turned into a folder.
 * @param {Object} options.sizes.category.sub Sub categories to add to the main category.
 */
module.exports = async (options: any) => {

  const url: URL = new URL(options.page.url());

  await fs.ensureDir(options.output);

  for (const deviceType in options.sizes) {

    const deviceTypeDir: string = `${options.output}/${deviceType}`;

    await fs.ensureDir(deviceTypeDir);

    const viewports: any = options.sizes[deviceType];

    for (const device in viewports) {

      const deviceDir: string = `${deviceTypeDir}/${device}`;

      await fs.ensureDir(deviceDir);

      const sizes: Array<number> = viewports[device];

      let fullPage: boolean = sizes.length === 1;

      if (fullPage) sizes[1] = 1;

      await options.page.setViewport({ width: sizes[0], height: sizes[1] });

      const dots: number = url.hostname.split('.').length;

      let imgName: string;

      if (dots > 2) imgName = url.hostname.substring(url.hostname.indexOf(".") + 1, url.hostname.lastIndexOf("."));

      else imgName = url.hostname.substring(0, url.hostname.lastIndexOf("."));

      const imgPath: string = `${deviceDir}/${imgName}.png`;

      await options.page.screenshot({ path: imgPath, type: 'png', fullPage: fullPage });

    }

  }

};