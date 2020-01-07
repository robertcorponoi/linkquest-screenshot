'use strict'

import fs from 'fs-extra';

import Options from './options/Options';

/**
 * Plugin for Linkquest that takes a screenshot of the current page with the options provided.
 * 
 * @param {Object} [options]
 * @param {string} [options.output=process.cwd()] Where should the outputted screenshots be saved to.
 * @param {Object} options.sizes The sizes for the screenshots to generate.
 */
module.exports = async (options: Options) => {
  const opts: Options = new Options(options);

  const url: URL = new URL(opts.page.url());

  await fs.ensureDir(opts.output);

  for (const deviceType in opts.sizes) {
    const deviceTypeDir: string = `${opts.output}/${deviceType}`;

    await fs.ensureDir(deviceTypeDir);

    const viewports: any = opts.sizes[deviceType];

    for (const device in viewports) {
      const deviceDir: string = `${deviceTypeDir}/${device}`;

      await fs.ensureDir(deviceDir);

      const sizes: Array<number> = viewports[device];

      let fullPage: boolean = sizes.length === 1;

      if (fullPage) sizes[1] = 1;

      await opts.page.setViewport({ width: sizes[0], height: sizes[1] });

      const dots: number = url.hostname.split('.').length;

      let imgName: string;

      if (dots > 2) imgName = url.hostname.substring(url.hostname.indexOf(".") + 1, url.hostname.lastIndexOf("."));
      else imgName = url.hostname.substring(0, url.hostname.lastIndexOf("."));

      const imgPath: string = `${deviceDir}/${imgName}.png`;

      await opts.page.screenshot({ path: imgPath, type: 'png', fullPage: fullPage });
    }
  }
};