/**
 * Production-grade cutout via IMG.LY ONNX model.
 * Source: native studio photo (white bg).
 */
const fs = require("fs");
const path = require("path");
const { removeBackground } = require("@imgly/background-removal-node");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "public", "images", "ali-hassan-hero.jpg");
const OUT = path.join(ROOT, "public", "images", "ali-hassan-cutout.png");

async function blobToBuffer(blob) {
  const ab = await blob.arrayBuffer();
  return Buffer.from(ab);
}

async function main() {
  if (!fs.existsSync(SRC)) {
    throw new Error(`Missing source: ${SRC}`);
  }

  const srcUrl = `file://${SRC.replace(/\\/g, "/")}`;
  console.log("Source:", srcUrl);
  console.log("Removing background (medium model)…");
  const blob = await removeBackground(srcUrl, {
    model: "medium",
    debug: true,
    output: {
      format: "image/png",
      type: "foreground",
      quality: 1,
    },
  });

  const buf = await blobToBuffer(blob);
  fs.writeFileSync(OUT, buf);
  console.log("Wrote", OUT, `${(buf.length / 1024).toFixed(0)}KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
