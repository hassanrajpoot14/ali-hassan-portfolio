const sharp = require("sharp");
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
  let n = 0;

  for (let y = Math.floor(h * 0.5); y < Math.floor(h * 0.95); y++) {
    for (let x = 0; x < w; x++) {
      const rel = x / w;
      if (rel >= 0.38 && rel <= 0.62) continue; // protect center torso/hands
      const o = (y * w + x) * 4;
      if (px[o + 3] < 20) continue;
      const lum = 0.299 * px[o] + 0.587 * px[o + 1] + 0.114 * px[o + 2];
      if (lum > 140) {
        px[o + 3] = 0;
        n++;
      }
    }
  }

  await sharp(px, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(FILE);

  console.log("force cleared", n);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
