const { deleteAsync } = require("del");
const fs = require("fs");
const path = require("path");
const { notifyMessage, onError } = require("./utils");

const cleanBuildDirectory = async () => {
  try {
    // List of items in fonts and images folders before cleaning
    const fontsFolder = path.join("dist/assets/fonts");
    const imagesFolder = path.join("dist/assets/images");

    const fontsBefore = fs.existsSync(fontsFolder)
      ? fs.readdirSync(fontsFolder)
      : [];
    const imagesBefore = fs.existsSync(imagesFolder)
      ? fs.readdirSync(imagesFolder)
      : [];

    // Delete everything except main font files and images folder
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

    // Log preserved items
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
