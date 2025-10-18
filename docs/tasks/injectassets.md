# 🧩 Inject Assets

The **Inject Assets** task automatically inserts links to your compiled CSS and JavaScript files into your HTML/Nunjucks layout.

This ensures your final project always references the latest compiled files without manually editing the layout each time.

### 📄 File Path

`tasks/injectAssets.js`

Layout file: `src/templates/layout.njk` (or your main layout file)

### Safety Note

> **Do not manually edit your `layout.njk` file.**
>
> The **Inject Assets** task automatically updates placeholders in this file with your compiled CSS and JavaScript files.
>
> Manual changes might be overwritten or break the automated injection process.

### ⚙️ How It Works

```js
const fs = require("fs");
const path = require("path");
const config = require("../../config.js");
const { notifyMessage, onError } = require("./utils.js");
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const { paths } = config;

// Utility function to inject content into layout
const injectIntoLayout =
  ({ placeholder, tag, regex }) =>
  (cb) => {
    try {
      const layoutPath = path.join(paths.inject.njk, "layout.njk");
      let layout = fs.readFileSync(layoutPath, "utf8");

      const hasTagAlready = regex && regex.test(layout);

      if (hasTagAlready) {
        layout = layout.replace(regex, tag); // Replace old injected tag
      } else if (layout.includes(placeholder)) {
        layout = layout.replace(placeholder, tag); // Replace placeholder
      }

      fs.writeFileSync(layoutPath, layout);
      notifyMessage(`✅ Injected ${placeholder}`);
      cb();
    } catch (err) {
      onError("Error injecting into layout")(err);
    }
  };

// Inject CSS
const injectStylesIntoLayout = injectIntoLayout({
  placeholder: "<!-- style_placeholder -->",
  tag: `<link rel="stylesheet" href="${path.join(
    paths.inject.css,
    pkg.name
  )}.min.css" class="injected-style">`,
  regex: /<link[^>]*class="injected-style"[^>]*>/,
});

// Inject Vendor Scripts
const injectVendorScriptsIntoLayout = injectIntoLayout({
  placeholder: "<!-- libscript_placeholder -->",
  tag: `<script src="${path.join(
    paths.inject.js,
    pkg.name
  )}.lib.min.js" class="injected-lib-script"></script>`,
  regex: /<script[^>]*class="injected-lib-script"[^>]*><\/script>/,
});

// Inject Main JS
const injectScriptsIntoLayout = injectIntoLayout({
  placeholder: "<!-- script_placeholder -->",
  tag: `<script src="${path.join(
    paths.inject.js,
    pkg.name
  )}.min.js" class="injected-main-script"></script>`,
  regex: /<script[^>]*class="injected-main-script"[^>]*><\/script>/,
});

module.exports = {
  injectStylesIntoLayout,
  injectVendorScriptsIntoLayout,
  injectScriptsIntoLayout,
};
```

### 🧠 Key Points Explained

- **`injectIntoLayout` utility function**
  - Reads the layout file (`layout.njk`)
  - Looks for a placeholder or an existing injected tag
  - Replaces it with the new `<link>` or `<script>` tag
- **Injecting Styles**
  - Adds the compiled CSS file into your layout
- **Injecting Vendor Scripts**
  - Adds the bundled library scripts
- **Injecting Main Scripts**
  - Adds your main project JavaScript
- **Regex check**
  - Prevents duplicate injection if the tag already exists
- **`notifyMessage` & `onError`**
  - Provide consistent messages and error handling across Gulp tasks

### 💻 How to Use

```bash
npm run dev
```

- Runs automatically as part of the development workflow
- Ensures your HTML/Nunjucks layout always references the latest compiled assets

### 🌟 Why This Is Useful

- Saves time by avoiding manual edits
- Prevents mistakes like linking outdated or missing CSS/JS files
- Keeps development workflow consistent and automated
