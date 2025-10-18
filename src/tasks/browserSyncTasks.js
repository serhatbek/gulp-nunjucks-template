const browserSync = require("browser-sync");
const { notifyMessage, onError } = require("./utils");

const startDevServer = (cb) => {
  browserSync.init({ server: { baseDir: "dist" } });
  notifyMessage("BrowserSync started for live-reloading");
  cb();
};

const reloadBrowser = (cb) => {
  browserSync.reload();
  cb();
};

module.exports = {
  startDevServer,
  reloadBrowser,
};
