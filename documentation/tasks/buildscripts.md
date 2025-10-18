# 💻 Build Scripts

The **Build Scripts** task compiles and optionally minifies the JavaScript files. This ensures the code works in older browsers and is optimized for production.

`tasks/buildScripts.js` (or wherever this task is defined)

`dist/` (your compiled project files)

### How it works in your code:

```js
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
```

### Key Functions:

- **Babel** : Transpiles modern JavaScript (ES6+) into older syntax so it works in more browsers.
- **Terser** : Minifies JavaScript for production, removing whitespace and comments.
- **Plumber** : Prevents the Gulp process from stopping on errors and shows a friendly error message.
- **Rename** : Outputs a consistent file name based on the project name from `package.json`.
- **Sourcemaps** : Creates source maps in development for easier debugging.

### How to use:

```js
npm run dev   # Compiles JS in development mode
npm run build # Compiles and minifies JS for production
```

### Why this is useful:

- Ensures your JavaScript works in older browsers 🌐
- Optimizes your code for faster loading in production ⚡
- Keeps development errors visible without breaking the workflow
