<div align="center">

# Linkquest Screenshot

linkquest-screenshot is a plugin for [Linkquest](https://github.com:robertcorponoi/linkquest) that can take various sizes of screenshots of each page that Linkquest visits.

</div>

<div align="center">

[![NPM version](https://img.shields.io/npm/v/linkquest-screenshot.svg?style=flat)](https://www.npmjs.com/package/linkquest-screenshot)
[![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/linkquest-screenshot/badge.svg)](https://snyk.io/test/github/robertcorponoi/linkquest-screenshot)
[![NPM downloads](https://img.shields.io/npm/dm/linkquest-screenshot.svg?style=flat)](https://www.npmjs.com/package/linkquest-screenshot)
<a href="https://badge.fury.io/js/linkquest-screenshot"><img src="https://img.shields.io/github/issues/robertcorponoi/linkquest-screenshot.svg" alt="issues" height="18"></a>
<a href="https://badge.fury.io/js/linkquest-screenshot"><img src="https://img.shields.io/github/license/robertcorponoi/linkquest-screenshot.svg" alt="license" height="18"></a>
[![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

## **Table of contents**

- [Install](#install)
- [Usage](#usage)
- [Options](#options)
- [Tests](#tests)
- [License](#license)

## **Install**

To install linkquest-screenshot you can use:

```shell
$ npm install linkquest-screenshot
```

## **Usage**

To use linkquest-screenshot you must register it with linkquest like so:

```js
const linkquest = new Linkquest('http://example.com/', { silent: true });

linkquest.register(require('../build/index'), {
  // Defines the directory where the screenshots will be output to.
  output: screenshotsDir,
  // Defines a collection of sizes to screenshot.
  sizes: {
    // An overarching level.
    mobile: {
      // Individual levels within the overarching level.
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
```

You can see that linkquest's register method takes the plugin as the first parameter and then the plugin's options as the second parameter.

This will crawl the page and save the output to the current working directory. If you want to instead crawl the whole host, you want to use:

## **Options**

The options that can be passed to linkquest-screenshot are as follows:

| param                      	| type   	| description                                                 	| default        	|
|----------------------------	|--------	|-------------------------------------------------------------	|----------------	|
| options                    	| Object 	|                                                             	|                	|
| options.output             	| string 	| Where should the outputted screenshots be saved to.         	| proccess.cwd() 	|
| options.sizes              	| Object 	| The sizes for the screenshots to generate.                  	| {}             	|
| options.sizes.category     	| Object 	| An Object of categories which will be turned into a folder. 	| {}             	|
| options.sizes.category.sub 	| Object 	| Sub categories to add to the main category.                 	| {}             	|

**Example:**

This example explains the code shown in the usage above.

Going through this line by line:

Line 1: Of course to be able to use the plugin, we need to require the base Linkquest module and we're just passing the silent = false flag to it to hide output.

Line 3: Here we use the `register` method of Linkquest to add a reference to our plugin, and then as the second parameter we pass an Object of options for the plugin.

Line 4: One of the options for this plugin is output which specifies the directory that the screenshots will be stored in. If the directory does not yet exist, then it will be created. By default this plugin will use `process.cwd()` as the default directory for storing screenshots.

Line 5-17: Here we are specifying 3 device types: mobile, tablet, and desktop. Under each device type we are specifying one or two devices for each one with the first index of the array being the width and the second being the height. You'll notice that the second index of the hdr array is '*' which tells the plugin that it should take a screenshot of the full height of the page.

```js
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
      hdr: [1920, '*']
    }
  }
});

await linkquest.start();
```

## **Tests**

To run the available tests for linkquest-screenshot use:

```bash
npm run test
```

## **License**

MIT