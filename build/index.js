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
/**
 * Plugin for Linkquest that takes a screenshot of the current page with the options provided.
 *
 * @param {Object} [options]
 * @param {string} [options.output=process.cwd()] Where should the outputted screenshots be saved to.
 * @param {Object} options.sizes The sizes for the screenshots to generate.
 * @param {Object} options.sizes.category An Object of categories which will be turned into a folder.
 * @param {Object} options.sizes.category.sub Sub categories to add to the main category.
 */
module.exports = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const url = new URL(options.page.url());
    yield fs_extra_1.default.ensureDir(options.output);
    for (const deviceType in options.sizes) {
        const deviceTypeDir = `${options.output}/${deviceType}`;
        yield fs_extra_1.default.ensureDir(deviceTypeDir);
        const viewports = options.sizes[deviceType];
        for (const device in viewports) {
            const deviceDir = `${deviceTypeDir}/${device}`;
            yield fs_extra_1.default.ensureDir(deviceDir);
            const sizes = viewports[device];
            let fullPage = sizes.length === 1;
            if (fullPage)
                sizes[1] = 1;
            yield options.page.setViewport({ width: sizes[0], height: sizes[1] });
            const dots = url.hostname.split('.').length;
            let imgName;
            if (dots > 2)
                imgName = url.hostname.substring(url.hostname.indexOf(".") + 1, url.hostname.lastIndexOf("."));
            else
                imgName = url.hostname.substring(0, url.hostname.lastIndexOf("."));
            const imgPath = `${deviceDir}/${imgName}.png`;
            yield options.page.screenshot({ path: imgPath, type: 'png', fullPage: fullPage });
        }
    }
});
