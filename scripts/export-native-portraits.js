const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "images");
const ORIG = path.join(
  process.env.USERPROFILE || "",
  ".cursor/projects/c-Users-Dell-Desktop-ALI-HASSAN-porfoliio/assets",
  "c__Users_Dell_AppData_Roaming_Cursor_User_workspaceStorage_7c02c87c0dcc1a1ae28dc8710f737db8_images_ALI_HASSAN-91f97bf9-6c5a-49ae-a9ce-bb6f613dd76b.jpg"
);
const ABOUT = path.join(
  process.env.USERPROFILE || "",
  ".cursor/projects/c-Users-Dell-Desktop-ALI-HASSAN-porfoliio/assets",
  "ali-hassan-about-bg.jpg"
);

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  await sharp(ORIG)
    .sharpen({ sigma: 0.8, m1: 0.7, m2: 0.3 })
    .jpeg({ quality: 98, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(path.join(OUT, "ali-hassan-hero.jpg"));

  const meta = await sharp(ORIG).metadata();
  const pad = 72;
  const W = (meta.width || 990) + pad * 2;
  const H = (meta.height || 993) + pad * 2;

  const svg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ecfeff"/>
          <stop offset="45%" stop-color="#cffafe"/>
          <stop offset="100%" stop-color="#ecfccb"/>
        </linearGradient>
        <radialGradient id="v" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <rect width="100%" height="100%" fill="url(#v)"/>
    </svg>`
  );

  const subject = await sharp(ORIG)
    .sharpen({ sigma: 0.75 })
    .jpeg({ quality: 98, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();

  await sharp(svg)
    .composite([{ input: subject, left: pad, top: pad }])
    .jpeg({ quality: 98, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(path.join(OUT, "ali-hassan-hero-brand.jpg"));

  if (fs.existsSync(ABOUT)) {
    await sharp(ABOUT)
      .sharpen({ sigma: 0.7 })
      .jpeg({ quality: 98, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toFile(path.join(OUT, "ali-hassan-about.jpg"));
  } else {
    fs.copyFileSync(
      path.join(OUT, "ali-hassan-hero-brand.jpg"),
      path.join(OUT, "ali-hassan-about.jpg")
    );
  }

  await sharp(ORIG)
    .resize(320, 320, { fit: "cover", position: "top" })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(OUT, "ali-hassan-avatar.jpg"));

  await sharp(path.join(OUT, "ali-hassan-hero-brand.jpg"))
    .resize(1200, 630, { fit: "cover", position: "top" })
    .jpeg({ quality: 94, mozjpeg: true })
    .toFile(path.join(OUT, "ali-hassan-og.jpg"));

  fs.copyFileSync(
    path.join(OUT, "ali-hassan-hero-brand.jpg"),
    path.join(ROOT, "public", "ali-hassan.jpg")
  );
  fs.copyFileSync(
    path.join(OUT, "ali-hassan-hero-brand.jpg"),
    path.join(OUT, "ali-hassan-master.jpg")
  );

  for (const f of [
    "ali-hassan-hero.jpg",
    "ali-hassan-hero-brand.jpg",
    "ali-hassan-about.jpg",
    "ali-hassan-avatar.jpg",
  ]) {
    const p = path.join(OUT, f);
    const m = await sharp(p).metadata();
    console.log(f, `${m.width}x${m.height}`, `${(fs.statSync(p).size / 1024).toFixed(0)}KB`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
