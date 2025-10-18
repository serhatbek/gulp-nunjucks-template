const gulp = require("gulp");

// 📦 Core Tasks
const cleanBuildDirectory = require("./src/tasks/cleanBuild");

// 📄 Asset Processing Tasks
const iconFont = require("./src/tasks/iconFont");
const buildScripts = require("./src/tasks/buildScripts");
const buildStyles = require("./src/tasks/buildStyles");
const buildVendorScripts = require("./src/tasks/buildVendorScripts");

// 🧩 Template and Asset Injection Tasks
const {
  injectScriptsIntoLayout,
  injectStylesIntoLayout,
  injectVendorScriptsIntoLayout,
} = require("./src/tasks/injectAssets");

const renderTemplates = require("./src/tasks/renderTemplates");

// 🚀 Development Tasks
const { startDevServer } = require("./src/tasks/browserSyncTasks");
const watchSourceFiles = require("./src/tasks/watchTasks");
const reportBuildSize = require("./src/tasks/reportBuildSize");

// ----------------------
// 🛠️ Watch Task for SVG icons
// ----------------------
const watchIcons = () => {
  return gulp.watch("src/icons/**/*.svg", iconFont);
};

// 🛠️ Development Task Pipeline
const develop = gulp.series(
  cleanBuildDirectory,
  gulp.parallel(buildStyles, buildScripts, buildVendorScripts),
  gulp.parallel(
    injectStylesIntoLayout,
    injectScriptsIntoLayout,
    injectVendorScriptsIntoLayout
  ),
  renderTemplates,
  iconFont, // ✅ generate icons after build
  gulp.parallel(startDevServer, watchSourceFiles, watchIcons)
);

// 📦 Production Build Task Pipeline
const build = gulp.series(
  cleanBuildDirectory,
  gulp.parallel(buildStyles, buildScripts, buildVendorScripts),
  gulp.parallel(
    injectStylesIntoLayout,
    injectScriptsIntoLayout,
    injectVendorScriptsIntoLayout
  ),
  renderTemplates,
  iconFont, // ✅ generate icons after build
  reportBuildSize
);

module.exports = {
  devTasks: develop,
  buildTasks: build,
};
