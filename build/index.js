'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const Options_1 = __importDefault(require("./options/Options"));
/**
 * Plugin for Linkquest that takes a screenshot of the current page with the options provided.
 *
 * @param {Object} [options]
 * @param {string} [options.output=process.cwd()] Where should the outputted screenshots be saved to.
 * @param {Object} options.sizes The sizes for the screenshots to generate.
 */
module.exports = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const opts = new Options_1.default(options);
    const url = new URL(opts.page.url());
    yield fs_extra_1.default.ensureDir(opts.output);
    for (const deviceType in opts.sizes) {
        const deviceTypeDir = `${opts.output}/${deviceType}`;
        yield fs_extra_1.default.ensureDir(deviceTypeDir);
        const viewports = opts.sizes[deviceType];
        for (const device in viewports) {
            const deviceDir = `${deviceTypeDir}/${device}`;
            yield fs_extra_1.default.ensureDir(deviceDir);
            const sizes = viewports[device];
            let fullPage = sizes.length === 1;
            if (fullPage)
                sizes[1] = 1;
            yield opts.page.setViewport({ width: sizes[0], height: sizes[1] });
            const dots = url.hostname.split('.').length;
            let imgName;
            if (dots > 2)
                imgName = url.hostname.substring(url.hostname.indexOf(".") + 1, url.hostname.lastIndexOf("."));
            else
                imgName = url.hostname.substring(0, url.hostname.lastIndexOf("."));
            const imgPath = `${deviceDir}/${imgName}.png`;
            yield opts.page.screenshot({ path: imgPath, type: 'png', fullPage: fullPage });
        }
    }
});
