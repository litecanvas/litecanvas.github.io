import { copyFile, unlink, readFile, appendFile } from "node:fs/promises";
import esbuild from "esbuild";

const root = process.env["PWD"];
const engineFile = root + "/public/litecanvas.js";

await unlink(engineFile);

await copyFile(root + "/node_modules/litecanvas/dist/dist.dev.js", engineFile);

const utils = await readFile(
  root + "/node_modules/@litecanvas/utils/dist/all.min.js",
  { encoding: "utf8" }
);

await appendFile(engineFile, "\n\n" + utils);

const pluginAssetLoader = await readFile(
  root + "/node_modules/@litecanvas/plugin-asset-loader/dist/dist.min.js",
  { encoding: "utf8" }
);

await appendFile(engineFile, "\n" + pluginAssetLoader);

await esbuild.build({
  entryPoints: [engineFile],
  outfile: engineFile,
  bundle: true,
  minify: true,
  legalComments: "eof",
  allowOverwrite: true,
});
