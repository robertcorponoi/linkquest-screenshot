'use strict'

const test = require('ava');
const path = require('path');
const fs = require('fs-extra');
const Linkquest = require('linkquest');

const screenshotsDir = path.resolve(__dirname, 'screenshots');

test('Taking verious desktop, tablet, and mobile screenshots', async t => {
  const linkquest = new Linkquest('http://example.com/', { silent: true });

  linkquest.register(require('../build/index'), {
    output: screenshotsDir,
    sizes: {
      mobile: {
        pixel: [411, 731],
        iphone: [375, 812]
      },
      tablet: {
        ipad: [768, 1024],
        galaxy: [360, 640]
      },
      desktop: {
        hdr: [1920, 1080]
      }
    }
  });

  await linkquest.start();
  
  const pixelDir = await fs.readdir(path.resolve(screenshotsDir, 'mobile', 'pixel'));
  const iphoneDir = await fs.readdir(path.resolve(screenshotsDir, 'mobile', 'iphone'));

  const ipadDir = await fs.readdir(path.resolve(screenshotsDir, 'tablet', 'ipad'));
  const galaxyDir = await fs.readdir(path.resolve(screenshotsDir, 'tablet', 'galaxy'));

  const hdrDir = await fs.readdir(path.resolve(screenshotsDir, 'desktop', 'hdr'));

  const screenshots = [pixelDir, iphoneDir, ipadDir, galaxyDir, hdrDir];

  const expected = [['example.png', 'iana.png'], ['example.png', 'iana.png'], ['example.png', 'iana.png'], ['example.png', 'iana.png'], ['example.png', 'iana.png']];

  await fs.remove(screenshotsDir);

  t.deepEqual(screenshots, expected);
});