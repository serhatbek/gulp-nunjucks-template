# 🌐 Browser Sync

The Browser Sync task starts a local development server and automatically refreshes your browser whenever you make changes to your files (HTML, CSS, JS). This helps you see updates in real-time without manually refreshing the browser.

`tasks/browserSyncTasks.js` (or wherever this task is defined)

`dist/` (your compiled project files)

How it works in your code:

```js
const browserSync = require("browser-sync");
const { notifyMessage, onError } = require("./utils");

const startDevServer = (cb) => {
  browserSync.init({ server: { baseDir: "dist" } });
  notifyMessage("BrowserSync started for live-reloading");
  cb();
};

const reloadBrowser = (cb) => {
  browserSync.reload();
  cb();
};

module.exports = {
  startDevServer,
  reloadBrowser,
};
```

- `startDevServer`:

  - Starts a local server that serves files from the `dist/` folder.
  - Uses `notifyMessage` from `utils.js` to show **BrowserSync started** in the terminal.

- `reloadBrowser`:

  - Refreshes the browser when changes are detected.

How to use:

```bash
npm run dev
```

- Browser Sync runs automatically as part of the development workflow.
- Open `http://localhost:3000` in your browser to see your project

Why this is useful:

- Speeds up development ⚡
- Always shows the latest changes immediately
- Can test on multiple devices at the same time
