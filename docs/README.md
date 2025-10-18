# 📦 Frontend Automation with Gulp and Nunjucks

A powerful, modern frontend build workflow using **Gulp 5**, **Nunjucks**, designed for long-term reliability and simple maintenance.

## 🚀 Features

- ✅ **Gulp 5** task runner
- ✅ **Nunjucks** templating engine
- ✅ **SCSS** with PostCSS autoprefixing
- ✅ **Babel** for JavaScript (ES6+)
- ✅ **Live development server** with BrowserSync
- ✅ **SVG to icon font** generator — no manual Unicode naming needed
- ✅ **Modular Gulp task organization**

Tested on **Node.js 22.20.0**. To ensure long-term stability, use this version (or manage via `nvm`).

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

## License

This project is open source and available under the [MIT License](https://github.com/serhatbek/gulp-nunjucks-template/blob/main/LICENSE.md).
You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this project, as long as the original copyright notice is included.
