# 📦 Build Vendor Scripts

The **Build Vendor Scripts** task takes the external JavaScript libraries (like jQuery, Lodash, etc.), bundles them together, optionally minifies them for production, and outputs a single file. This keeps your project organized and optimized.

`tasks/buildVendorScripts.js` (or wherever this task is defined)

`dist/` (your compiled project files)

### How it works in your code:

```js
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
```

### Key Functions:

- **Concat** : Combines multiple library files into one single file to reduce HTTP requests, name based on the project name from `package.json`.
- **Terser** : Minifies the combined file in production for faster loading.
- **Plumber** : Prevents the Gulp process from stopping on errors.
- **Sourcemaps** : Helps debug the combined files in development.
- **NotifyMessage** : Prints a friendly notification when the task finishes.

### How to use:

```js
npm run dev   # Bundles vendor JS in development mode
npm run build # Bundles and minifies vendor JS for production
```

### Why this is useful:

- Combines all external libraries into one file for better performance ⚡
- Minifies code in production to reduce file size 📦
- Prevents errors from stopping your workflow 🚫
