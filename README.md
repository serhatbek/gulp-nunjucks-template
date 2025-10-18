![Gulp + Nunjucks Automation](assets/20251018_184329_gulp-banner.png)

# ⚙️ Gulp + Nunjucks Automation

A powerful, modern frontend build workflow using **Gulp 5**, **Nunjucks**, and **SCSS**. Designed for long-term reliability and simple maintenance.

For more detail see the [documentation](https://).

---

## 🚀 Features

- ✅ **Gulp 5** task runner
- ✅ **Nunjucks** templating engine
- ✅ **SCSS** with PostCSS autoprefixing
- ✅ **Babel** for JavaScript (ES6+)
- ✅ **Live development server** with BrowserSync
- ✅ **SVG to icon font** generator — no manual Unicode naming needed
- ✅ **Modular Gulp task organization**

Tested on **Node.js 22.20.0**. To ensure long-term stability, use this version (or manage via `nvm`).

---

## 📁 Folder Structure

```text
┣ 📂dist
┃ ┣ 📂About
┃ ┣ 📂assets
┃ ┃ ┣ 📂css
┃ ┃ ┣ 📂fonts
┃ ┃ ┃ ┗ 📂icons
┃ ┃ ┣ 📂images
┃ ┃ ┗ 📂js
┃ ┗ 📜index.html
┃
┣ 📂path
┣ 📂src
┃ ┣ 📂data
┃ ┣ 📂icons
┃ ┣ 📂js
┃ ┣ 📂scss
┃ ┃ ┣ 📂base
┃ ┃ ┣ 📂components
┃ ┃ ┣ 📂pages
┃ ┃ ┣ 📂vendors
┃ ┃ ┗ 📜main.scss
┃ ┣ 📂tasks
┃ ┗ 📂templates
┃   ┣ 📂includes
┃   ┃ ┣ 📂components
┃   ┃ ┗ 📂layout
┃   ┗ 📂pages
┃     ┗ 📜index.njk
┣ 📜.babelrc
┣ 📜.gitignore
┣ 📜.nvmrc
┣ 📜.stylelintrc.json
┣ 📜config.js
┣ 📜eslint.config.mjs
┣ 📜font-template.scss
┣ 📜gulpfile.js
┣ 📜package.json
┣ 📜README.md
┗ 📜svgtofont.config.js
```

---

## 🚀 Getting Started

**1. 📁 Create a new folder for your project (for example my-project) and navigate into it:**

```bash
mkdir my-project && cd my-project
```

**2. 📝 Clone this starter into your current folder:**

```bash
git clone https://github.com/serhatbek/gulp-nunjucks-template.git ./
```

The final dot (./) tells Git to clone into the current directory instead of creating a new folder.

**3. ⚡ Install and use [node.js](https://nodejs.org/en/download) v22.20.0** to ensure long-term stability. If [nvm](https://github.com/nvm-sh/nvm) is installed and you already have v22.20.0, you can:

```bash
nvm use
```

The **.nvmrc** file in the project specifies the correct Node.js version.

4. ✏️ **Change the project name in the `package.json` file to your project name.** This is important because later Gulp will inject JS and CSS files automatically using your project name.

   From this:

   ```bash
   {
     "name": "gulp-nunjucks-template",
     "version": "1.0.0",
     "main": "gulpfile.js",
   }
   ```

   To whatever your project name is:

   ```bash
   {
     "name": "my-project",
     "version": "1.0.0",
     "main": "gulpfile.js",
   }
   ```

**5. 📦 Install dependencies**

```bash
npm install
```

**6. 🏃 Start development server**

```bash
npm run dev
```

This will:

- 🧹 Clean the build folders (except 'dist/assets/images' and 'dist/assets/fonts')
- 💅 Compile SCSS and JS
- 🔤 Generate font icons from SVG files
- 🖼️ Render Nunjucks templates
- 🌐 Start live-reloading browser

---

## 💡 Best Practices

- Use Node.js 22.20.0 for maximum compatibility
- Run npm run icons whenever you add, remove, or rename an SVG icon
- Structure your SCSS and templates modularly (base/, components/, layouts/)
- Use nvm or .nvmrc to lock Node version across systems

---

## 🧩 Troubleshooting

| Problem                      | Solution                                                   |
| ---------------------------- | ---------------------------------------------------------- |
| Build fails or icons missing | Check for invalid or corrupted SVGs in`src/icons/`         |
| Icons not displaying         | Run`npm run icons` again after changing icons              |
| Live reload not working      | Ensure`npm run dev` is running and not blocked by firewall |
| Styles not updating          | Confirm your SCSS files are saved and inside`src/scss/`    |

---

Made with ❤️ for reusability.

## License

This project is open source and available under the [MIT License](LICENSE.md).
You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this project, as long as the original copyright notice is included.
