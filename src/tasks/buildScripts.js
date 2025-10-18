const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const gulpIf = require("gulp-if");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const { notifyMessage, onError } = require("./utils");
const config = require("../../config");
const fs = require("fs");

const { paths } = config;
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const isProd = process.env.NODE_ENV === "production";

const buildScripts = () => {
  return gulp
    .src(paths.src.js + "*.js")
    .pipe(plumber({ errorHandler: onError("JavaScript compilation") }))
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(gulpIf(isProd, terser()))
    .pipe(rename(`${pkg.name}.min.js`))
    .pipe(gulpIf(!isProd, sourcemaps.write(".")))
    .pipe(gulp.dest(paths.dist.js))
    .on("end", () =>
      notifyMessage(
        `JavaScript transpiled${isProd ? " and minified for production" : ""}`
      )
    );
};

module.exports = buildScripts;
