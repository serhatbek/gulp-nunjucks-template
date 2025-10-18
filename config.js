const config = {
  paths: {
    src: {
      njk: "src/templates/pages/",
      scss: "src/scss/",
      js: "src/js/",
      images: "src/images/",
      icons: "src/icons/",
      fonts: "src/fonts/",
      data: "src/data/",
    },
    dist: {
      njk: "dist",
      css: "dist/assets/css/",
      js: "dist/assets/js/",
      images: "dist/assets/images/",
      fonts: "dist/assets/fonts/",
    },
    libscripts: [
      // 📦 Import your installed libraries from node_modules and add them in the array like in the examples below 👇
      "node_modules/swiper/swiper-bundle.js",
      // "node_modules/...",
      // "node_modules/...",
    ],
    watch: {
      njk: "src/templates/",
      scss: "src/scss/**/*.scss",
      js: "src/js/**/*.js",
      images: "src/images/**/*.{webp,jpeg,jpg,png,svg,gif}",
      fonts: "src/fonts/*.{woff,woff2,eot,ttf}",
      data: "src/data/",
    },
    inject: {
      njk: "src/templates/includes/layout/",
      css: "../assets/css/",
      js: "../assets/js/",
    },
  },
};

module.exports = config;
