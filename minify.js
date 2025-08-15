"use strict";

const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const minify = require("minify");
const pkg = require("./package.json");

const SRC = path.resolve(__dirname, "lib/qrcode-compact.js");
const DST_DIR = path.resolve(__dirname, "dist");
const DST = path.join(DST_DIR, "qrcode-compact.min.js");

(async () => {
  try {
    // Ensure destination directory exists
    await fsp.mkdir(DST_DIR, { recursive: true });

    const data = await minify(SRC);
    const banner = `/*! ${pkg.name} v${pkg.version} | ${pkg.homepage} | MIT license */\n`;
    const out = banner + String(data);

    await fsp.writeFile(DST, out, "utf8");
    console.log(`Minified ${path.relative(process.cwd(), SRC)} -> ${path.relative(process.cwd(), DST)}`);
  } catch (error) {
    console.error("Minification failed:", error);
    process.exitCode = 1;
  }
})();

