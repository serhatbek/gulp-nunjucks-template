const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const gulpIf = require("gulp-if");
const terser = require("gulp-terser");
const concat = require("gulp-concat");
const { notifyMessage, onError } = require("./utils");
const config = require("../../config");
const fs = require("fs");
const chalk = require("chalk");
const log = require("fancy-log");

const { paths } = config;
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const isProd = process.env.NODE_ENV === "production";

const buildVendorScripts = () => {
  if (!paths.libscripts || paths.libscripts.length === 0) {
    log(chalk.yellow.bold("⚠ No JS libraries found to compile."));
    return Promise.resolve();
  }

  return gulp
    .src(paths.libscripts)
    .pipe(plumber({ errorHandler: onError("JS Library bundling") }))
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(gulpIf(isProd, terser()))
    .pipe(concat(`${pkg.name}.lib.min.js`))
    .pipe(gulpIf(!isProd, sourcemaps.write(".")))
    .pipe(gulp.dest(paths.dist.js))
    .on("end", () =>
      notifyMessage(`Vendor libraries bundled into ${pkg.name}.lib.min.js`)
    );
};

module.exports = buildVendorScripts;
