const gulp = require("gulp");
const plumber = require("gulp-plumber");
const gulpData = require("gulp-data");
const htmlmin = require("gulp-htmlmin");
const nunjucksRender = require("gulp-nunjucks-render");
const { notifyMessage, onError } = require("./utils");
const config = require("../../config");
const fs = require("fs");
const path = require("path");
const gulpIf = require("gulp-if");

const { paths } = config;
const isProd = process.env.NODE_ENV === "production";

const renderTemplates = (cb) => {
  return gulp
    .src(paths.src.njk + "**/*.+(html|njk)")
    .pipe(
      gulpData((file) => {
        const fileName = path.basename(file.path, path.extname(file.path));
        const pageDataPath = path.join(paths.src.data, `${fileName}.json`);
        const globalDataDir = paths.src.data;

        let data = {};

        // Load global JSON files (like header.json, footer.json, etc.)
        fs.readdirSync(globalDataDir).forEach((filename) => {
          if (path.extname(filename) === ".json") {
            const content = JSON.parse(
              fs.readFileSync(path.join(globalDataDir, filename), "utf8")
            );
            Object.assign(data, content);
          }
        });

        // Merge page-specific JSON if available
        if (fs.existsSync(pageDataPath)) {
          Object.assign(
            data,
            JSON.parse(fs.readFileSync(pageDataPath, "utf8"))
          );
        }

        return data;
      })
    )
    .pipe(plumber({ errorHandler: onError("Nunjucks rendering") }))
    .pipe(
      nunjucksRender({
        path: ["src/templates"], // where your layout and includes live
        watch: true,
      })
    )
    .pipe(
      gulpIf(
        isProd,
        htmlmin({ collapseWhitespace: true, removeComments: true })
      )
    )
    .pipe(gulp.dest(paths.dist.njk))
    .on("end", () => {
      notifyMessage(
        `Nunjucks templates rendered${isProd ? " and minified" : ""}`
      );
      cb();
    });
};

module.exports = renderTemplates;
