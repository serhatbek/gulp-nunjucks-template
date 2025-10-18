# 🖼️ Render Nunjucks Templates

The **Render Templates** task compiles your Nunjucks (`.njk`) files into plain HTML files.

It also merges data from JSON files so your pages can use dynamic content like titles, menus, or other variables.

### 📄 File Path

`tasks/renderTemplates.js`

Source templates: `src/templates/`

Global & page-specific data: `src/data/`

Output HTML files: `dist/` (or as configured in `paths.dist.njk`)

---

### ⚠️ Safety Note

> Do not manually edit compiled HTML files in the `dist/` folder.
>
> These are automatically generated from your templates and JSON data. Any changes here will be overwritten on the next build.

---

### ⚙️ How It Works

```js
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const gulpData = require("gulp-data");
const htmlmin = require("gulp-htmlmin");
const nunjucksRender = require("gulp-nunjucks-render");
const { notifyMessage, onError } = require("./utils");
const config = require("../../config");
const fs = require("fs");
const path = require("path");
const gulpIf = require("gulp-if");

const { paths } = config;
const isProd = process.env.NODE_ENV === "production";

const renderTemplates = (cb) => {
  return gulp
    .src(paths.src.njk + "**/*.+(html|njk)")
    .pipe(
      gulpData((file) => {
        const fileName = path.basename(file.path, path.extname(file.path));
        const pageDataPath = path.join(paths.src.data, `${fileName}.json`);
        const globalDataDir = paths.src.data;

        let data = {};

        // Load global JSON files (like header.json, footer.json, etc.)
        fs.readdirSync(globalDataDir).forEach((filename) => {
          if (path.extname(filename) === ".json") {
            const content = JSON.parse(
              fs.readFileSync(path.join(globalDataDir, filename), "utf8")
            );
            Object.assign(data, content);
          }
        });

        // Merge page-specific JSON if available
        if (fs.existsSync(pageDataPath)) {
          Object.assign(
            data,
            JSON.parse(fs.readFileSync(pageDataPath, "utf8"))
          );
        }

        return data;
      })
    )
    .pipe(plumber({ errorHandler: onError("Nunjucks rendering") }))
    .pipe(
      nunjucksRender({
        path: ["src/templates"], // where your layout and includes live
        watch: true,
      })
    )
    .pipe(
      gulpIf(
        isProd,
        htmlmin({ collapseWhitespace: true, removeComments: true })
      )
    )
    .pipe(gulp.dest(paths.dist.njk))
    .on("end", () => {
      notifyMessage(
        `Nunjucks templates rendered${isProd ? " and minified" : ""}`
      );
      cb();
    });
};

module.exports = renderTemplates;
```

- **gulpData** : Loads JSON data for each template (both global and page-specific).
- **plumber + onError** : Prevents the task from crashing and logs friendly errors.
- **nunjucksRender** : Compiles `.njk` files into `.html`.
- **htmlmin** : Minifies HTML in production (removes spaces and comments).
- **gulp.dest** : Saves the output HTML to your `dist/` folder.
- **notifyMessage** : Shows a console message when the task completes.

---

### 💻 How to Use

```bash
npm run dev
```

- This task runs automatically during development.
- It watches your template files and regenerates HTML whenever changes are detected.

---

### 📊 Using JSON Data in Nunjucks

You can create JSON files in `src/data/` to provide data for your templates:

#### 1. Global Data

Create a JSON file, e.g., `header.json`:

```json
{
  "siteTitle": "My Project",
  "navigation": ["Home", "About", "Contact"]
}
```

This data is **merged with global data** and only used for the `about` page.

#### 3. Accessing Data in Templates

In your `.njk` file, you can use the data like this:

```nunjucks
<h1>{{ pageTitle }}</h1>
<p>{{ content }}</p>

<nav>
  <ul>
    {% for item in navigation %}
      <li>{{ item }}</li>
    {% endfor %}
  </ul>
</nav>


```

- `pageTitle` and `content` come from the page-specific JSON.
- `navigation` comes from global JSON.

---

### 🌟 Why This Is Useful

- Allows dynamic HTML using JSON data and reusable templates.
- Automatically minifies HTML for production.
- Avoids repetitive manual updates to HTML files.
- Lets you separate content from layout, making your project easier to maintain.
