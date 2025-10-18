const fs = require("fs");
const path = require("path");
const config = require("../../config.js");
const { notifyMessage, onError } = require("./utils.js");

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));
// const pkg = require("../../package.json");

const { paths } = config;

// Utility function to inject content into layout
const injectIntoLayout =
  ({ placeholder, tag, regex }) =>
  (cb) => {
    try {
      const layoutPath = path.join(paths.inject.njk, "layout.njk");
      let layout = fs.readFileSync(layoutPath, "utf8");

      const hasTagAlready = regex && regex.test(layout);

      if (hasTagAlready) {
        layout = layout.replace(regex, tag); // Replace old injected tag
      } else if (layout.includes(placeholder)) {
        layout = layout.replace(placeholder, tag); // Replace placeholder
      }

      fs.writeFileSync(layoutPath, layout);
      notifyMessage(`✅ Injected ${placeholder}`);
      cb();
    } catch (err) {
      onError("Error injecting into layout")(err);
    }
  };

// Inject CSS into layout
const injectStylesIntoLayout = injectIntoLayout({
  placeholder: "<!-- style_placeholder -->",
  tag: `<link rel="stylesheet" href="${path.join(
    paths.inject.css,
    pkg.name
  )}.min.css" class="injected-style">`,
  regex: /<link[^>]*class="injected-style"[^>]*>/,
});

// Inject Vendor Scripts into layout
const injectVendorScriptsIntoLayout = injectIntoLayout({
  placeholder: "<!-- libscript_placeholder -->",
  tag: `<script src="${path.join(
    paths.inject.js,
    pkg.name
  )}.lib.min.js" class="injected-lib-script"></script>`,
  regex: /<script[^>]*class="injected-lib-script"[^>]*><\/script>/,
});

// Inject JS into layout
const injectScriptsIntoLayout = injectIntoLayout({
  placeholder: "<!-- script_placeholder -->",
  tag: `<script src="${path.join(
    paths.inject.js,
    pkg.name
  )}.min.js" class="injected-main-script"></script>`,
  regex: /<script[^>]*class="injected-main-script"[^>]*><\/script>/,
});

module.exports = {
  injectStylesIntoLayout,
  injectVendorScriptsIntoLayout,
  injectScriptsIntoLayout,
};
