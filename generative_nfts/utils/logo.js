const fs = require("fs");
const path = require("path");
const console = require("console");
const basePath = process.cwd();
const { createCanvas, loadImage } = require("canvas");
const { format, pixelFormat } = require(`${basePath}/src/config.js`);
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");
var images = require("images");
const buildDir = `${basePath}/build/logo_images`;
const inputDir = `${basePath}/build/images`;
const logo = `${basePath}/flipkart_icon.jpg`
var gm = require('gm');

const buildSetup = () => {
    if (fs.existsSync(buildDir)) {
      fs.rmdirSync(buildDir, { recursive: true });
    }
    fs.mkdirSync(buildDir);
};


const getImages = (_dir) => {
    try {
      return fs
        .readdirSync(_dir)
        .filter((item) => {
          let extension = path.extname(`${_dir}${item}`);
          if (extension == ".png" || extension == ".jpg") {
            return item;
          }
        })
        .map((i) => {
          return {
            filename: i,
            path: `${_dir}/${i}`,
          };
        });
    } catch {
      return null;
    }
};

const startDrawing = async() => {
    const all_images = getImages(inputDir);
    if (all_images == null) {
        console.log("Please generate collection first.");
        return;
    }

    all_images.forEach((imgObject) => {
        images(imgObject.path).draw(images(logo), 10, 10).save(`${buildDir}/${imgObject.filename}`);
    })
}
buildSetup();
startDrawing();