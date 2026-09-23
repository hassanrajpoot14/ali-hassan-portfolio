/**
 * Remove trapped white pockets (arm gaps) from ML cutout without touching the shirt.
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
  const N = w * h;
  const visited = new Uint8Array(N);

  const isTrappedWhite = (i) => {
    const o = i * 4;
    if (px[o + 3] < 40) return false;
    const r = px[o];
    const g = px[o + 1];
    const b = px[o + 2];
    const maxc = Math.max(r, g, b);
    const minc = Math.min(r, g, b);
    const sat = maxc === 0 ? 0 : (maxc - minc) / maxc;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return lum > 210 && sat < 0.12;
  };

  const components = [];

  for (let i = 0; i < N; i++) {
    if (visited[i] || !isTrappedWhite(i)) continue;
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
      for (const n of [cur + 1, cur - 1, cur + w, cur - w]) {
        if (n < 0 || n >= N) continue;
        const nx = n % w;
        const ny = (n / w) | 0;
        if (Math.abs(nx - x) + Math.abs(ny - y) !== 1) continue;
        if (visited[n] || !isTrappedWhite(n)) continue;
        visited[n] = 1;
        stack.push(n);
      }
    }
    components.push({
      cells,
      size: cells.length,
      cx: sumX / cells.length / w,
      cy: sumY / cells.length / h,
    });
  }

  let cleared = 0;
  for (const c of components) {
    // Shirt is large + centered. Arm-gap pockets are smaller and off-center / lower.
    const isShirt =
      c.size > N * 0.015 &&
      c.cx > 0.38 &&
      c.cx < 0.62 &&
      c.cy > 0.28 &&
      c.cy < 0.55;

    const isArmGap =
      c.cy > 0.48 &&
      c.cy < 0.9 &&
      (c.cx < 0.42 || c.cx > 0.58) &&
      c.size < N * 0.04;

    const isTinySpeck = c.size < 80;

    if (isShirt) continue;
    if (isArmGap || isTinySpeck || (c.size < N * 0.008 && c.cy > 0.5)) {
      for (const i of c.cells) {
        px[i * 4 + 3] = 0;
        cleared++;
      }
    }
  }

  // Mild outer fringe
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const o = (y * w + x) * 4;
      const a = px[o + 3];
      if (a < 5) continue;
      let nearT = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) {
            nearT++;
            continue;
          }
          if (px[(ny * w + nx) * 4 + 3] < 25) nearT++;
        }
      }
      if (!nearT) continue;
      const lum = 0.299 * px[o] + 0.587 * px[o + 1] + 0.114 * px[o + 2];
      const edge = Math.min(1, nearT / 12);
      if (lum > 215 && edge > 0.3) px[o + 3] = Math.round(a * (1 - edge * 0.9));
    }
  }

  await sharp(px, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(FILE);

  console.log(`cleared ${cleared} trapped-white pixels; components=${components.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
