# 👀 Watch Tasks

The **Watch Tasks** task monitors your project files and automatically runs the appropriate Gulp tasks whenever a change is detected. This is part of your **live development workflow** , so you can see updates instantly without manually rebuilding or refreshing the browser.

### 📄 File Path

`tasks/watchTasks.js`

### ⚙️ How It Works

```js
const gulp = require("gulp");
const { reloadBrowser } = require("./browserSyncTasks");
const renderTemplates = require("./renderTemplates");
const buildStyles = require("./buildStyles");
const buildScripts = require("./buildScripts");
const buildVendorScripts = require("./buildVendorScripts");

const {
  injectStylesIntoLayout,
  injectScriptsIntoLayout,
  injectVendorScriptsIntoLayout,
} = require("./injectAssets");

const config = require("../../config");
const { paths } = config;

const watchSourceFiles = () => {
  gulp.watch(
    [paths.watch.njk + "**/*.+(html|njk)", paths.watch.data + "**/*.json"],
    gulp.series(renderTemplates, reloadBrowser)
  );

  gulp.watch(
    paths.watch.scss,
    gulp.series(buildStyles, injectStylesIntoLayout, reloadBrowser)
  );

  gulp.watch(
    paths.watch.js,
    gulp.series(buildScripts, injectScriptsIntoLayout, reloadBrowser)
  );

  gulp.watch(
    paths.libscripts,
    gulp.series(
      buildVendorScripts,
      injectVendorScriptsIntoLayout,
      reloadBrowser
    )
  );

  gulp.watch(paths.watch.images, gulp.series(reloadBrowser));

  gulp.watch(paths.watch.fonts, gulp.series(reloadBrowser));
};

module.exports = watchSourceFiles;
```

### 🧠 Key Points Explained

- **`gulp.watch()`**

  Monitors specified files for changes. Whenever a file changes, it triggers the associated task(s).

- **Watching Templates & JSON**

  - Monitors Nunjucks templates (`.njk`) and JSON data files.
  - Automatically rerenders pages and reloads the browser.

- **Watching SCSS**

  - Compiles your SCSS to CSS.
  - Injects the compiled CSS into the layout.
  - Reloads the browser so you see the new styles immediately.

- **Watching JS**

  - Transpiles and bundles your JavaScript.
  - Injects scripts into your layout.
  - Refreshes the browser automatically.

- **Watching Vendor JS**

  - Bundles library scripts (`libscripts`) if they change.
  - Injects them into your layout and reloads the browser.

- **Watching Images & Fonts**

  - Reloads the browser when assets change, so you see updated images or fonts immediately.

### 💻 How to Use

Start the development server and automatically watch for changes:

```bash
npm run dev
```

- BrowserSync will run along with the watch tasks.
- Any change you make in your source files will trigger the proper task and refresh your browser automatically.

### 🌟 Why This Is Useful

- Speeds up development ⚡
- Automatically updates browser with the latest changes
- Reduces repetitive manual tasks (rebuilding, injecting, reloading)
- Ensures a smooth, real-time preview of your project
