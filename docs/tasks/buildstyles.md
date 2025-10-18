# 💅 Build Styles

The **Build Styles** task compiles the SCSS files into CSS, applies vendor prefixes, optionally minifies for production, and writes source maps during development.

This task ensures your styles are **clean, optimized, and browser-compatible** .

**File:** `tasks/buildStylesTasks.js`

**Source SCSS:** `src/scss/main.scss`

**Output CSS:** `dist/assets/css/`

### How it works in the code:

```js
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
```

---

### Functions

- `plumber({ errorHandler: onError("SCSS compilation") })`

  - Prevents Gulp from crashing if there’s a SCSS error.
  - Calls `onError` from `utils.js` to show a red error message in the console.

- `gulpIf(!isProd, sourcemaps.init())` / `sourcemaps.write(".")`

  - Generates source maps during development so you can see original SCSS in the browser dev tools.

- `scss()`

  - Compiles SCSS into CSS using Dart Sass.

- `postcss([autoprefixer("last 2 versions")])`

  - Adds vendor prefixes automatically for browser compatibility.

- `gulpIf(isProd, minifyCss())`

  - Minifies the CSS for production to reduce file size.

- `rename(`${pkg.name}.min.css`)`

  - Renames the output CSS file using your project name (from `package.json`).

- `.on("end", notifyMessage(...))`

  - Calls `notifyMessage` from `utils.js` to show a green success message in the terminal.

---

### How to use:

```bash
npm run dev
```

- Runs automatically as part of the development workflow.
- In production:

```bash
npm run build
```

- Generates **minified, autoprefixed CSS** ready for deployment.
- All comments are removed automatically.

### Why this is useful:

- Ensures CSS works across all browsers 🌐
- Saves time by automating SCSS compilation ⏱️
- Keeps code clean and production-ready 💎
- Shows clear notifications for success or errors ✅ / ❌
