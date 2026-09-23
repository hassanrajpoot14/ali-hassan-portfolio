/**
 * High-quality transparent cutout:
 * 1) Flood-fill near-white from image edges
 * 2) Grow subject core and restore any holes (white shirt)
 * 3) Feather fringe for clean soft edges
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "images");
const SRC = path.join(OUT, "ali-hassan-hero.jpg");

async function main() {
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const px = Buffer.from(data);
  const N = w * h;

  const lumAt = (i) => {
    const o = i * 4;
    return 0.299 * px[o] + 0.587 * px[o + 1] + 0.114 * px[o + 2];
  };
  const satAt = (i) => {
    const o = i * 4;
    const r = px[o];
    const g = px[o + 1];
    const b = px[o + 2];
    const maxc = Math.max(r, g, b);
    const minc = Math.min(r, g, b);
    return maxc === 0 ? 0 : (maxc - minc) / maxc;
  };
  const nearWhite = (i) => lumAt(i) > 236 && satAt(i) < 0.085;

  // --- Pass 1: edge flood fill ---
  const bg = new Uint8Array(N);
  const q = [];
  const seed = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const i = y * w + x;
    if (bg[i] || !nearWhite(i)) return;
    bg[i] = 1;
    q.push(i);
  };
  for (let x = 0; x < w; x++) {
    seed(x, 0);
    seed(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    seed(0, y);
    seed(w - 1, y);
  }
  while (q.length) {
    const i = q.pop();
    const x = i % w;
    const y = (i / w) | 0;
    seed(x + 1, y);
    seed(x - 1, y);
    seed(x, y + 1);
    seed(x, y - 1);
  }

  // --- Pass 2: subject core from non-bg, keep largest blob near center ---
  const subject = new Uint8Array(N);
  const visited = new Uint8Array(N);
  const blobs = [];

  for (let i = 0; i < N; i++) {
    if (bg[i] || visited[i]) continue;
    const stack = [i];
    visited[i] = 1;
    const cells = [];
    let sumX = 0;
    let sumY = 0;
    while (stack.length) {
      const cur = stack.pop();
      cells.push(cur);
      const x = cur % w;
      const y = (cur / w) | 0;
      sumX += x;
      sumY += y;
      const neigh = [cur + 1, cur - 1, cur + w, cur - w];
      for (const n of neigh) {
        if (n < 0 || n >= N) continue;
        const nx = n % w;
        const ny = (n / w) | 0;
        if (Math.abs(nx - x) + Math.abs(ny - y) !== 1) continue;
        if (visited[n] || bg[n]) continue;
        visited[n] = 1;
        stack.push(n);
      }
    }
    blobs.push({
      cells,
      size: cells.length,
      cx: sumX / cells.length,
      cy: sumY / cells.length,
    });
  }

  blobs.sort((a, b) => b.size - a.size);
  const centerBlob =
    blobs.find(
      (b) =>
        Math.abs(b.cx - w / 2) < w * 0.25 &&
        Math.abs(b.cy - h / 2) < h * 0.3 &&
        b.size > N * 0.05
    ) || blobs[0];

  for (const i of centerBlob.cells) subject[i] = 1;

  // Dilate subject a few times to cover shirt / thin gaps
  let cur = subject;
  for (let pass = 0; pass < 10; pass++) {
    const next = new Uint8Array(cur);
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        if (cur[i]) continue;
        if (
          cur[i - 1] ||
          cur[i + 1] ||
          cur[i - w] ||
          cur[i + w] ||
          cur[i - w - 1] ||
          cur[i - w + 1] ||
          cur[i + w - 1] ||
          cur[i + w + 1]
        ) {
          next[i] = 1;
        }
      }
    }
    cur = next;
  }

  // Restore holes: bg pixels inside dilated subject become subject again
  for (let i = 0; i < N; i++) {
    if (cur[i] && bg[i]) bg[i] = 0;
  }

  // --- Alpha + fringe feather ---
  for (let i = 0; i < N; i++) {
    const o = i * 4;
    if (bg[i]) {
      px[o + 3] = 0;
      continue;
    }
    px[o + 3] = 255;
    const x = i % w;
    const y = (i / w) | 0;
    let nearBg = 0;
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) {
          nearBg++;
          continue;
        }
        if (bg[ny * w + nx]) nearBg++;
      }
    }
    if (nearBg > 0 && lumAt(i) > 200) {
      const t = Math.max(0, 1 - nearBg / 20);
      px[o + 3] = Math.round(255 * t);
    }
  }

  // Trim
  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (px[(y * w + x) * 4 + 3] > 12) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  const pad = 8;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad);
  maxY = Math.min(h - 1, maxY + pad);

  await sharp(px, { raw: { width: w, height: h, channels: 4 } })
    .extract({
      left: minX,
      top: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1,
    })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, "ali-hassan-cutout.png"));

  const m = await sharp(path.join(OUT, "ali-hassan-cutout.png")).metadata();
  console.log(
    "cutout",
    `${m.width}x${m.height}`,
    `${(fs.statSync(path.join(OUT, "ali-hassan-cutout.png")).size / 1024).toFixed(0)}KB`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
