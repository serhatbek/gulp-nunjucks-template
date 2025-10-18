# 🗂️ Main Gulp File

This is the central Gulp configuration file that ties all your tasks together. It defines **development** and **production build** pipelines so you can run your workflow with a single command.

### 📄 File Path

`gulpfile.js`

### ⚙️ How It Works

```js
const gulp = require("gulp");

// 📦 Core Tasks
const cleanBuildDirectory = require("./src/tasks/cleanBuild");

// 📄 Asset Processing Tasks
const iconFont = require("./src/tasks/iconFont");
const buildScripts = require("./src/tasks/buildScripts");
const buildStyles = require("./src/tasks/buildStyles");
const buildVendorScripts = require("./src/tasks/buildVendorScripts");

// 🧩 Template and Asset Injection Tasks
const {
  injectScriptsIntoLayout,
  injectStylesIntoLayout,
  injectVendorScriptsIntoLayout,
} = require("./src/tasks/injectAssets");

const renderTemplates = require("./src/tasks/renderTemplates");

// 🚀 Development Tasks
const { startDevServer } = require("./src/tasks/browserSyncTasks");
const watchSourceFiles = require("./src/tasks/watchTasks");
const reportBuildSize = require("./src/tasks/reportBuildSize");

// ----------------------
// 🛠️ Watch Task for SVG icons
// ----------------------
const watchIcons = () => {
  return gulp.watch("src/icons/**/*.svg", iconFont);
};

// 🛠️ Development Task Pipeline
const develop = gulp.series(
  cleanBuildDirectory,
  gulp.parallel(buildStyles, buildScripts, buildVendorScripts),
  gulp.parallel(
    injectStylesIntoLayout,
    injectScriptsIntoLayout,
    injectVendorScriptsIntoLayout
  ),
  renderTemplates,
  iconFont, // ✅ generate icons after build
  gulp.parallel(startDevServer, watchSourceFiles, watchIcons)
);

// 📦 Production Build Task Pipeline
const build = gulp.series(
  cleanBuildDirectory,
  gulp.parallel(buildStyles, buildScripts, buildVendorScripts),
  gulp.parallel(
    injectStylesIntoLayout,
    injectScriptsIntoLayout,
    injectVendorScriptsIntoLayout
  ),
  renderTemplates,
  iconFont, // ✅ generate icons after build
  reportBuildSize
);

module.exports = {
  devTasks: develop,
  buildTasks: build,
};
```

### 🧠 Key Points Explained

- **Core Tasks**

  `cleanBuildDirectory` removes old build files but preserves important assets like fonts and images.

- **Asset Processing Tasks**

  - `buildStyles` → Compiles SCSS to CSS, autoprefixes, minifies in production.
  - `buildScripts` → Transpiles JS with Babel and minifies in production.
  - `buildVendorScripts` → Bundles and minifies third-party library scripts.
  - `iconFont` → Converts all SVG icons into a web font and generates SCSS for use in your project.

- **Template & Asset Injection**

  - Injects compiled CSS, JS, and library scripts into your `index.njk` layout safely.
  - Ensures that every update automatically updates your HTML templates with the latest files.

- **Render Templates**

  Processes Nunjucks templates, merges JSON data, and outputs final HTML files. Minifies HTML in production.

- **Development Pipeline (`devTasks`)**

  - Runs all core and asset tasks.
  - Generates icons.
  - Starts the development server (`BrowserSync`) and watches files (SCSS, JS, Nunjucks, images, fonts, SVG icons) for changes.
  - Reloads browser automatically on changes.

- **Production Pipeline (`buildTasks`)**

  - Runs all core and asset tasks.
  - Generates icons.
  - Reports the final build size.
  - Outputs fully optimized production files.

- **Watch Task for SVG Icons**

  Ensures any new or updated SVG icons are immediately converted to font files without manual intervention.

### 💻 How to Use

- **Start development workflow:**

```bash
npm run dev
```

Or

- Run production build:

```bash
npm run build
```

### 🌟 Why This Is Useful

- Automates repetitive tasks
- Keeps development fast with live-reloading
- Produces optimized production-ready files
- Keeps your project organized, consistent, and maintainable
