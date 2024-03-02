import { copyFile, unlink, readFile, appendFile } from "node:fs/promises";

const root = process.env["PWD"];
const engineFile = root + "/public/litecanvas.js";

unlink(engineFile);

await copyFile(
  root + "/node_modules/@litecanvas/litecanvas/dist/dist.js",
  engineFile
);

const pluginAssetLoader = await readFile(
  root + "/node_modules/@litecanvas/plugin-asset-loader/dist/dist.js",
  { encoding: "utf8" }
);

await appendFile(engineFile, "\n" + pluginAssetLoader);
