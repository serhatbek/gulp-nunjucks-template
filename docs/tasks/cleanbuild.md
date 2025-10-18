# 🧹 Clean Build Directory

The **Clean Build Directory** task removes old files from your `dist/` folder before a new build. This ensures that your project doesn’t contain outdated or leftover files from previous builds.

It’s smart enough to **keep your images and font files safe** while deleting everything else — keeping your build clean, organized, and fast.

`tasks/cleanBuildDirectory.js`

`dist/` → your output folder

---

### How it works in the code

```js
const { deleteAsync } = require("del");
const fs = require("fs");
const path = require("path");
const { notifyMessage, onError } = require("./utils");

const cleanBuildDirectory = async () => {
  try {
    const fontsFolder = path.join("dist/assets/fonts");
    const imagesFolder = path.join("dist/assets/images");

    const fontsBefore = fs.existsSync(fontsFolder)
      ? fs.readdirSync(fontsFolder)
      : [];
    const imagesBefore = fs.existsSync(imagesFolder)
      ? fs.readdirSync(imagesFolder)
      : [];

    const deletedPaths = await deleteAsync(
      [
        "dist/*",
        "dist/assets/css",
        "dist/assets/js",
        "dist/assets/fonts/icons",
        "!dist/assets",
        "!dist/assets/images",
        "!dist/assets/files",
        "!dist/assets/fonts/*.ttf",
        "!dist/assets/fonts/*.woff",
        "!dist/assets/fonts/*.woff2",
        "!dist/assets/fonts/*.eot",
        "!dist/assets/fonts/*.svg",
      ],
      { force: true }
    );

    notifyMessage(
      "Cleaned dist folder (images and fonts preserved, icons folder deleted)"
    );

    if (deletedPaths.length) {
      notifyMessage("Deleted files/folders:");
      deletedPaths.forEach((p) => console.log(p));
    } else {
      notifyMessage("No files deleted.");
    }

    const preservedFonts = fontsBefore.filter(
      (f) => !deletedPaths.includes(path.join(fontsFolder, f))
    );
    const preservedImages = imagesBefore.filter(
      (f) => !deletedPaths.includes(path.join(imagesFolder, f))
    );

    if (preservedFonts.length) {
      notifyMessage("Preserved font files:");
      preservedFonts.forEach((f) => console.log(` - ${f}`));
    }

    if (preservedImages.length) {
      notifyMessage("Preserved images folder contents:");
      preservedImages.forEach((f) => console.log(` - ${f}`));
    }
  } catch (err) {
    onError("Cleaning build directory")(err);
  }
};

module.exports = cleanBuildDirectory;
```

### 🧠 Key Points Explained

- **`deleteAsync` (from `del`)**

  Deletes files or folders asynchronously, allowing fine control over what gets removed.

  Here it deletes everything in `dist/` _except_ specific folders and font formats.

- **File Preservation**

  The task uses “!” (negation patterns) in the delete list to **keep your important folders**:

  - Keeps `/images/`, `/files/`, and all main font formats (`.ttf`, `.woff`, etc.)
  - Deletes the `icons` folder specifically (since icons may be auto-generated later)

- **`notifyMessage` and `onError`**

  Imported from `utils.js` to show friendly logs and handle any errors gracefully.

- **Logs What Happened**

  After cleaning, it lists:

  - Deleted files/folders
  - Preserved font and image files

⚙️ How to Use

```bash
npm run dev
```

Or

```bash
npm run build
```

(It usually runs before other build tasks like compiling SCSS or JS.)

### 💡 Why This Is Useful

- Prevents leftover files from previous builds 🧩
- Keeps your output folder organized
- Avoids uploading unnecessary files to production 🚀
- Ensures your build is always fresh and consistent
