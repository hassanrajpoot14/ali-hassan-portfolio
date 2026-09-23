/**
 * Mild fringe cleanup only (no aggressive erode that eats collar/shirt).
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "public", "images", "ali-hassan-cutout.png");

async function main() {
  const { data, info } = await sharp(FILE)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const px = Buffer.from(data);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const o = (y * w + x) * 4;
      const a = px[o + 3];
      if (a < 5) {
        px[o + 3] = 0;
        continue;
      }

      let nearT = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) {
            nearT++;
            continue;
          }
          if (px[(ny * w + nx) * 4 + 3] < 30) nearT++;
        }
      }
      if (!nearT) continue;

      const lum = 0.299 * px[o] + 0.587 * px[o + 1] + 0.114 * px[o + 2];
      const edge = Math.min(1, nearT / 12);

      if (lum > 220 && edge > 0.25) {
        px[o + 3] = Math.round(a * (1 - edge * 0.95));
      } else if (lum > 185 && edge > 0.4) {
        px[o + 3] = Math.round(a * (1 - edge * 0.55));
        const f = 0.25 * edge;
        px[o] = Math.round(px[o] * (1 - f));
        px[o + 1] = Math.round(px[o + 1] * (1 - f));
        px[o + 2] = Math.round(px[o + 2] * (1 - f));
      }
    }
  }

  await sharp(px, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(FILE);

  console.log("mild clean", `${(fs.statSync(FILE).size / 1024).toFixed(0)}KB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
