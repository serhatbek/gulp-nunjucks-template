const gulp = require("gulp");
const { reloadBrowser } = require("./browserSyncTasks");
const renderTemplates = require("./renderTemplates");
const buildStyles = require("./buildStyles");
const buildScripts = require("./buildScripts");
const buildVendorScripts = require("./buildVendorScripts");

const {
  injectStylesIntoLayout,
  injectScriptsIntoLayout,
  injectVendorScriptsIntoLayout,
} = require("./injectAssets");

const config = require("../../config");
const { paths } = config;

const watchSourceFiles = () => {
  gulp.watch(
    [paths.watch.njk + "**/*.+(html|njk)", paths.watch.data + "**/*.json"],
    gulp.series(renderTemplates, reloadBrowser)
  );

  gulp.watch(
    paths.watch.scss,
    gulp.series(buildStyles, injectStylesIntoLayout, reloadBrowser)
  );

  gulp.watch(
    paths.watch.js,
    gulp.series(buildScripts, injectScriptsIntoLayout, reloadBrowser)
  );

  gulp.watch(
    paths.libscripts,
    gulp.series(
      buildVendorScripts,
      injectVendorScriptsIntoLayout,
      reloadBrowser
    )
  );

  gulp.watch(paths.watch.images, gulp.series(reloadBrowser));

  gulp.watch(paths.watch.fonts, gulp.series(reloadBrowser));
};

module.exports = watchSourceFiles;
