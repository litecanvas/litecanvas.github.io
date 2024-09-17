import { copyFile, unlink, readFile, appendFile } from "node:fs/promises";

const root = process.env["PWD"];
const engineFile = root + "/public/litecanvas.js";

await unlink(engineFile);

await copyFile(root + "/node_modules/litecanvas/dist/dist.min.js", engineFile);

const utils = await readFile(
  root + "/node_modules/@litecanvas/utils/dist/all.min.js",
  { encoding: "utf8" }
);

await appendFile(engineFile, "\n\n" + utils);

const pluginAssetLoader = await readFile(
  root + "/node_modules/@litecanvas/plugin-asset-loader/dist/dist.js",
  { encoding: "utf8" }
);

await appendFile(engineFile, "\n" + pluginAssetLoader);
