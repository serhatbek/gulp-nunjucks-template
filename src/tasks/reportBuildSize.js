const gulp = require("gulp");

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

  return gulp.src("dist/**/*").pipe(sizeReport).pipe(uncompressedSizeReport); // You just chain the .pipe again on the same stream
};

module.exports = reportBuildSize;
