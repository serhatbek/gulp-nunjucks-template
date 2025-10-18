# 📦 NPM Scripts Guide

This file explains the scripts included in your project. You can run them using:

```bash
npm run <script-name>
```

**1. 🏃 Development**

```bash
npm run dev
```

- Starts **Gulp** in development mode
- Compiles SCSS and JS
- Generates font icons
- Renders Nunjucks templates
- Starts **live-reloading browser**

> ⚡ Hot-reloads automatically when you save files.

**2. 🏗️ Build for Production**

```bash
npm run build
```

- Builds your project for production
- Minifies CSS, JS and HTML and removes comments
- Optimizes assets
- Prepares the project for deployment

🚨 Use this when you are ready to publish your project.

**3. 🎨 SCSS Lint**

```bash
npm run scssLint
```

- Checks your SCSS files for errors and code style issues
- Automatically fixes problems when possible
- Excludes vendor SCSS files `src/scss/vendors`
- ✅ Keep your styles clean and consistent.
- You can add or edit linting rules in `.stylelintrc.json` file in the root.

**4. 📜 JS Lint**

```bash
npm run jsLint
```

- Checks your JavaScript code for errors and best practices
- Helps you write clean and error-free JS
- You can add or edit linting rules in `eslint.config.mjs` file in the root.

**5. 🔤 Generate Icons**

```bash
npm run icons
```

- Uses configuration from `svgtofont.config.js` and `font-template.scss` files in the root.
- Converts all SVGs in `src/icons` into icon fonts
- Outputs font files to `dist/assets/fonts/icons`
- Outputs `_icons.scss` file in `src/scss/base/_icons.scss`

> 🖋️ When `npm run dev`, SVG files are watched and related files are generated automatically. Use `npm run icons` if it does not or whenever you add new SVG icons.
