const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const minifyCss = require("gulp-clean-css");
const gulpSass = require("gulp-sass");
const sass = require("sass");
const gulpIf = require("gulp-if");
const { notifyMessage, onError } = require("./utils");
const fs = require("fs");
const scss = gulpSass(sass);
const config = require("../../config");
const { paths } = config;
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const isProd = process.env.NODE_ENV === "production";

const buildStyles = async () => {
  const autoprefixerModule = await import("autoprefixer");
  const autoprefixer = autoprefixerModule.default;

  return gulp
    .src(paths.src.scss + "main.scss")
    .pipe(plumber({ errorHandler: onError("SCSS compilation") }))
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(scss())
    .pipe(postcss([autoprefixer("last 2 versions")]))
    .pipe(gulpIf(isProd, minifyCss()))
    .pipe(rename(`${pkg.name}.min.css`))
    .pipe(gulpIf(!isProd, sourcemaps.write(".")))
    .pipe(gulp.dest(paths.dist.css))
    .on("end", () =>
      notifyMessage(
        `SCSS compiled into CSS${
          isProd ? ", autoprefixed and minified for production" : ""
        }`
      )
    );
};

module.exports = buildStyles;
