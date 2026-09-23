/**
 * Build sharp portrait assets WITHOUT heavy upscaling (avoids soft/pixelated look).
 * Original photo detail is preserved; branded teal/lime backdrop is added.
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "images");
const ASSETS = path.join(
  process.env.USERPROFILE || "",
  ".cursor/projects/c-Users-Dell-Desktop-ALI-HASSAN-porfoliio/assets"
);

const ORIG = path.join(
  ASSETS,
  "c__Users_Dell_AppData_Roaming_Cursor_User_workspaceStorage_7c02c87c0dcc1a1ae28dc8710f737db8_images_ALI_HASSAN-91f97bf9-6c5a-49ae-a9ce-bb6f613dd76b.jpg"
);

async function brandBackdrop(w, h) {
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ecfeff"/>
        <stop offset="45%" stop-color="#cffafe"/>
        <stop offset="100%" stop-color="#ecfccb"/>
      </linearGradient>
      <radialGradient id="v" cx="50%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(8,145,178,0.06)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#v)"/>
    <rect width="100%" height="100%" fill="url(#grid)"/>
  </svg>`);
  return sharp(svg).png().toBuffer();
}

async function softKeyOriginal() {
  // Keep near-native size — mild enlarge only (1.35x) with lanczos + light sharpen
  const base = await sharp(ORIG)
    .resize(1340, 1340, {
      fit: "inside",
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    })
    .sharpen({ sigma: 0.9, m1: 0.9, m2: 0.4 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = Buffer.from(base.data);
  const { width: sw, height: sh } = base.info;
  const cx = sw / 2;
  const cy = sh * 0.4;

  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      const i = (y * sw + x) * 4;
      const r = px[i];
      const g = px[i + 1];
      const b = px[i + 2];
      const maxc = Math.max(r, g, b);
      const minc = Math.min(r, g, b);
      const sat = maxc === 0 ? 0 : (maxc - minc) / maxc;
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const dx = (x - cx) / (sw * 0.48);
      const dy = (y - cy) / (sh * 0.58);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const edge = Math.min(1, Math.max(0, (dist - 0.5) / 0.6));
      const score = (lum / 255) * (1 - sat) * (0.25 + 0.75 * edge);

      if (score > 0.8 && lum > 228 && sat < 0.1) px[i + 3] = 0;
      else if (score > 0.65 && lum > 210 && sat < 0.14) {
        px[i + 3] = Math.round(255 * Math.max(0, 1 - (score - 0.65) / 0.28));
      }
    }
  }

  return {
    png: await sharp(px, { raw: { width: sw, height: sh, channels: 4 } }).png().toBuffer(),
    w: sw,
    h: sh,
  };
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const hi = path.join(ASSETS, "ali-hassan-4k.jpg");
  const brandAi = path.join(ASSETS, "ali-hassan-portfolio-hero.jpg");
  const aboutAi = path.join(ASSETS, "ali-hassan-about-bg.jpg");

  // Prefer newest generated asset if present; otherwise composite original
  let heroSource = ORIG;
  if (fs.existsSync(hi)) heroSource = hi;
  else if (fs.existsSync(brandAi)) heroSource = brandAi;

  const meta = await sharp(heroSource).metadata();
  console.log("Hero source:", path.basename(heroSource), `${meta.width}x${meta.height}`);

  // Export hero at source size (or mild 1.5x max) — never stretch to fake 4K
  const targetW = Math.min(Math.round((meta.width || 990) * 1.5), 1600);
  const targetH = Math.min(Math.round((meta.height || 990) * 1.5), 2000);

  // Clean branded versions from AI assets if available (sharpen only, limited upscale)
  if (fs.existsSync(brandAi)) {
    await sharp(brandAi)
      .resize(1200, 1500, {
        fit: "cover",
        position: "attention",
        kernel: sharp.kernel.lanczos3,
      })
      .sharpen({ sigma: 0.85 })
      .jpeg({ quality: 98, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toFile(path.join(OUT, "ali-hassan-hero-brand.jpg"));
  }

  if (fs.existsSync(aboutAi)) {
    await sharp(aboutAi)
      .resize(900, 1125, {
        fit: "cover",
        position: "attention",
        kernel: sharp.kernel.lanczos3,
      })
      .sharpen({ sigma: 0.85 })
      .jpeg({ quality: 98, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toFile(path.join(OUT, "ali-hassan-about.jpg"));
  }

  if (fs.existsSync(hi)) {
    await sharp(hi)
      .resize(Math.min(meta.width, 1600), Math.min(meta.height, 2000), {
        fit: "inside",
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3,
      })
      .sharpen({ sigma: 0.7 })
      .jpeg({ quality: 98, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toFile(path.join(OUT, "ali-hassan-hero-brand.jpg"));
  }

  // Composite original onto brand backdrop (authentic detail)
  const { png: cut, w: sw, h: sh } = await softKeyOriginal();
  const canvasW = Math.max(1200, sw + 160);
  const canvasH = Math.max(1500, sh + 200);
  const backdrop = await brandBackdrop(canvasW, canvasH);
  const left = Math.round((canvasW - sw) / 2);
  const top = Math.round(canvasH - sh - 40);

  const composed = await sharp(backdrop)
    .composite([{ input: cut, left, top }])
    .jpeg({ quality: 98, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();

  await sharp(composed).toFile(path.join(OUT, "ali-hassan-hero.jpg"));
  await sharp(composed).toFile(path.join(OUT, "ali-hassan-master.jpg"));

  await sharp(composed)
    .resize(360, 360, { fit: "cover", position: "top" })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(OUT, "ali-hassan-avatar.jpg"));

  await sharp(composed)
    .resize(1200, 630, { fit: "cover", position: "top" })
    .jpeg({ quality: 94, mozjpeg: true })
    .toFile(path.join(OUT, "ali-hassan-og.jpg"));

  await sharp(cut).png().toFile(path.join(OUT, "ali-hassan-cutout.png"));

  fs.copyFileSync(path.join(OUT, "ali-hassan-master.jpg"), path.join(ROOT, "public", "ali-hassan.jpg"));

  console.log("targets", targetW, targetH);
  for (const f of ["ali-hassan-hero-brand.jpg", "ali-hassan-hero.jpg", "ali-hassan-about.jpg", "ali-hassan-avatar.jpg"]) {
    const p = path.join(OUT, f);
    if (!fs.existsSync(p)) continue;
    const m = await sharp(p).metadata();
    console.log(f, `${m.width}x${m.height}`, `${(fs.statSync(p).size / 1024).toFixed(0)}KB`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
