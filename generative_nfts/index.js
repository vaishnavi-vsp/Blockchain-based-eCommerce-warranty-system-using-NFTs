const basePath = process.cwd();
const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);
let apiKey = "sSEM2NtxDdMCSSPkiN8LS5Pc";
// let imgPath = `${basePath}/base.jpg`;
let imgPath = `${basePath}/flash-5.jpg`;
const bg = require("remove.bg");

const outputFile = `${basePath}/layers/base/img.png`;

(async () => {
  data = await bg.removeBackgroundFromImageFile({
    path: imgPath,
    apiKey: apiKey,
    size: "regular",
    type: "auto",
    scale: "50%",
    outputFile,
  });
  console.log(`image saved to ${outputFile}`);
  buildSetup();
  startCreating();
})();
