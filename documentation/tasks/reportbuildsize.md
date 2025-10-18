# 📏 Report Build Size

The **Report Build Size** task analyzes your compiled project files and shows how much space they take, both **compressed (gzip)** and **uncompressed** .

This helps you monitor your project’s performance and optimize file sizes.

### 📄 File Path

`tasks/reportBuildSize.js`

- Source files: `dist/**/*` (all compiled assets)

---

### ⚙️ How It Works

```js
const reportBuildSize = async () => {
  const gulpSize = (await import("gulp-size")).default;

  const sizeReport = gulpSize({
    title: "Gzipped",
    showFiles: true,
    gzip: true,
  });
  const uncompressedSizeReport = gulpSize({
    title: "Uncompressed",
    showFiles: true,
    gzip: false,
  });

  return gulp.src("dist/**/*").pipe(sizeReport).pipe(uncompressedSizeReport);
};

module.exports = reportBuildSize;
```

- **gulp-size** : A plugin that measures file sizes in your Gulp streams.
- **sizeReport** : Measures gzipped sizes and logs them in the console.
- **uncompressedSizeReport** : Measures original sizes (without compression).
- `.pipe()` chains the reports on the same set of files.

---

### 💻 How to Use

```bash
npm run build
```

- `reportBuildSize` runs automatically as part of the build.
- Shows a clear, readable report of all files in your `dist/` folder.

---

### 🌟 Why This Is Useful

- Helps detect unusually large files early.
- Provides gzip sizes, which reflect what users actually download from your website.
- Useful for performance optimization and monitoring project growth.
