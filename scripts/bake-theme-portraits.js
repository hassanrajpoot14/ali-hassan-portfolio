/**
 * Bake ML cutout onto light + dark hero plates (no transparent fringe issues).
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "images");
const CUTOUT = path.join(OUT, "ali-hassan-cutout.png");

async function plate(w, h, mode) {
  const svg =
    mode === "light"
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
          <defs>
            <radialGradient id="a" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="45%" stop-color="#ecfeff"/>
              <stop offset="100%" stop-color="#a5f3fc"/>
            </radialGradient>
            <radialGradient id="b" cx="80%" cy="85%" r="45%">
              <stop offset="0%" stop-color="#d9f99d" stop-opacity="0.45"/>
              <stop offset="100%" stop-color="#d9f99d" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#a)"/>
          <rect width="100%" height="100%" fill="url(#b)"/>
        </svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
          <defs>
            <radialGradient id="a" cx="50%" cy="38%" r="70%">
              <stop offset="0%" stop-color="#164e63"/>
              <stop offset="55%" stop-color="#0f172a"/>
              <stop offset="100%" stop-color="#020617"/>
            </radialGradient>
            <radialGradient id="b" cx="70%" cy="80%" r="50%">
              <stop offset="0%" stop-color="#365314" stop-opacity="0.35"/>
              <stop offset="100%" stop-color="#365314" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#a)"/>
          <rect width="100%" height="100%" fill="url(#b)"/>
        </svg>`;

  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function bake(mode, filename) {
  const meta = await sharp(CUTOUT).metadata();
  const subjectH = 1180;
  const subject = await sharp(CUTOUT)
    .resize({ height: subjectH, fit: "inside", kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer({ resolveWithObject: true });

  const sw = subject.info.width;
  const sh = subject.info.height;
  const W = Math.max(900, sw + 120);
  const H = Math.max(1120, sh + 100);
  const bg = await plate(W, H, mode);
  const left = Math.round((W - sw) / 2);
  const top = Math.round(H - sh - 20);

  await sharp(bg)
    .composite([{ input: subject.data, left, top }])
    .jpeg({ quality: 96, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(path.join(OUT, filename));

  const m = await sharp(path.join(OUT, filename)).metadata();
  console.log(filename, `${m.width}x${m.height}`, `${(fs.statSync(path.join(OUT, filename)).size / 1024).toFixed(0)}KB`);
}

async function main() {
  if (!fs.existsSync(CUTOUT)) throw new Error("Run ml-cutout first");
  await bake("light", "ali-hassan-hero-light.jpg");
  await bake("dark", "ali-hassan-hero-dark.jpg");
  // About uses light plate by default
  fs.copyFileSync(path.join(OUT, "ali-hassan-hero-light.jpg"), path.join(OUT, "ali-hassan-about.jpg"));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
