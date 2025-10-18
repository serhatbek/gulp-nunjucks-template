# 🔤 Icon Font Generation

The **Icon Font** task converts all SVG files in your project into a single web font.
This makes it easy to use icons just like text — with full control over size, color, and effects using CSS.
It uses the command-line tool **`svgtofont`** to automate the process.

### 📄 File Path

`tasks/iconFont.js`

Icons source: `src/icons/`

Generated fonts: `dist/assets/fonts/icons/`

Generated file: `dist/assets/scss/base/_icons.scss`

### ⚙️ How It Works

```js
const { exec } = require("child_process");
const { notifyMessage, onError } = require("./utils");
const pkg = require("../../package.json");

const iconFont = () => {
  return new Promise((resolve, reject) => {
    const cmd =
      "svgtofont --sources ./src/icons --output ./dist/assets/fonts/icons --config ./svgtofont.config.js";

    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        onError("Icon font generation")(err);
        reject(err);
        return;
      }

      if (stdout) {
        notifyMessage(`Icons generated for ${pkg.name}`, stdout);
      }

      if (stderr) {
        console.error(stderr);
      }

      resolve();
    });
  });
};

module.exports = iconFont;
```

### 🧠 Key Points Explained

- **`exec()` (from `child_process`)**

  Runs shell commands directly from Node.js.
  Here it executes the `svgtofont` command-line tool.

- **`svgtofont` Command**

  - Converts all `.svg` files in `src/icons/` into webfont files (`.woff`, `.ttf`, etc.)
  - Saves the generated font files to `dist/assets/fonts/icons/`
  - Reads settings (like font name, class prefix, and output types) from your `svgtofont.config.js`

- **`notifyMessage` & `onError`**
  Provide friendly terminal messages for success and error handling, keeping logs consistent with other Gulp tasks.
- **Package Name Integration**
  Uses your `package.json` name in messages for easy identification when working on multiple projects.

---

### ⚙️ Configuration Files

#### 🧩 `svgtofont.config.js`

This file defines how the **SVG to Font** conversion behaves.

It tells `svgtofont` where to find your icons, where to save output files, how to name the font, and how the generated CSS/SCSS should look.

**Key options:**

- **`sources`** – Folder containing your SVG icons (`src/icons/`).
- **`output`** – Destination for generated font files (`dist/assets/fonts/icons/`).
- **`fontName`** – The name of your font (usually your project name from `package.json`).
- **`classNamePrefix`** – Prefix for each icon class (e.g., `.icon-home`).
- **`css`** – Configures how and where the generated SCSS file is output.
  - `output`: Path to your SCSS folder
  - `fileName`: Name of the SCSS partial (e.g. `_icons.scss`)
  - `cssPath`: Relative path to font files used in `@font-face`
- **`cssTemplate`** – Path to a custom SCSS template that controls how classes are generated.
- **`rename`** – Optional function to modify icon names before generating classes (for example, to remove extra dashes).

---

#### 🎨 `font-template.scss`

This is the **template** that defines the structure and style of the generated SCSS file.

It uses **EJS templating syntax (`<%= ... %>`)** to dynamically insert your font name, file paths, and icon glyphs.

**What it does:**

- Defines the `@font-face` rule (links to `.woff`, `.ttf`, `.svg`, etc.)
- Loops through each icon glyph and creates CSS classes like:

```scss
.icon-home::before {
  content: "\ea01";
}
```

Ensures all icons use your generated font and follow the same naming pattern.

### 💻 How to Use

```bash
npm run icons
```

Or runs automatically as part of the development workflow

```bash
npm run dev
```

Or as part of your full build process:

```bash
npm run build
```

### 🌟 Why This Is Useful

- Replaces multiple SVG imports with a single font file
- Makes icons scalable and easily styled with CSS
- Keeps your project’s performance optimized
- Ensures visual consistency across all icons

### 🧩 Example CSS Usage

Once your icons are generated, you can include them like this:

```scss
@font-face {
  font-family: "project-icons";
  src: url("assets/fonts/icons/project-icons.woff2") format("woff2");
}

.icon {
  font-family: "project-icons";
  font-style: normal;
}

.icon-home::before {
  content: "\e001";
}
```

Then in HTML:

```html
<i class="icon icon-home"></i>
```
