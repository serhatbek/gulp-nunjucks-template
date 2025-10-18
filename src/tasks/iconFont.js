const { exec } = require("child_process");
const { notifyMessage, onError } = require("./utils");
const pkg = require("../../package.json"); // adjust path if needed

const iconFont = () => {
  return new Promise((resolve, reject) => {
    const cmd =
      "svgtofont --sources ./src/icons --output ./dist/assets/fonts/icons --config ./svgtofont.config.js";

    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        onError("Icon font generation")(err);
        reject(err);
        return;
      }

      if (stdout) {
        notifyMessage(`Icons generated for ${pkg.name}`, stdout);
      }

      if (stderr) {
        console.error(stderr);
      }

      resolve();
    });
  });
};

module.exports = iconFont;
