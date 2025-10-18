const path = require("path");
const pkg = require("./package.json");

module.exports = {
  sources: path.resolve(__dirname, "src/icons"),
  output: path.resolve(__dirname, "dist/assets/fonts/icons"),
  fontName: pkg.name,
  classNamePrefix: "icon",
  css: {
    output: path.resolve(__dirname, "src/scss/base/"), // path to output .scss
    fileName: "_icons", // name of the generated file
    cssPath: "../fonts/icons/", // used in @font-face url()
    include: "\\.(scss)$",
  },
  cssTemplate: path.resolve(__dirname, "font-template.scss"),
  outSVGReact: false,
  website: null,
  rename: (name) => name.replace(/^[-_]+/, ""), // optional, removes leading dash if needed
};
