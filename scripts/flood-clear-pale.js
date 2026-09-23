/**
 * Expand transparency into any near-white pocket that touches transparent pixels.
 * This reliably clears arm-gap whites without eating the enclosed white shirt
 * (shirt is surrounded by dark suit, not by transparency).
 */
const sharp = require("sharp");
const path = require("path");

const FILE = path.join(__dirname, "..", "public", "images", "ali-hassan-cutout.png");

async function main() {
  // Start from fresh ML output ideally — this script assumes current cutout
  const { data, info } = await sharp(FILE)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const px = Buffer.from(data);
  const N = w * h;

  const lumSat = (i) => {
    const o = i * 4;
    const r = px[o];
    const g = px[o + 1];
    const b = px[o + 2];
    const maxc = Math.max(r, g, b);
    const minc = Math.min(r, g, b);
    const sat = maxc === 0 ? 0 : (maxc - minc) / maxc;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return { lum, sat, a: px[o + 3] };
  };

  const canEat = (i) => {
    const { lum, sat, a } = lumSat(i);
    if (a < 8) return false;
    // bright / pale leftover background
    return lum > 155 && sat < 0.18;
  };

  const q = [];
  const seen = new Uint8Array(N);

  // Seed: any eatable pixel next to transparency (or image edge)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (!canEat(i)) continue;
      let touchT = x === 0 || y === 0 || x === w - 1 || y === h - 1;
      if (!touchT) {
        for (const n of [i - 1, i + 1, i - w, i + w]) {
          if (n < 0 || n >= N) continue;
          if (px[n * 4 + 3] < 20) {
            touchT = true;
            break;
          }
        }
      }
      if (touchT) {
        seen[i] = 1;
        q.push(i);
      }
    }
  }

  let cleared = 0;
  while (q.length) {
    const i = q.pop();
    px[i * 4 + 3] = 0;
    cleared++;
    const x = i % w;
    const y = (i / w) | 0;
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
    ]) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      const ni = ny * w + nx;
      if (seen[ni]) continue;
      if (!canEat(ni)) continue;
      seen[ni] = 1;
      q.push(ni);
    }
  }

  await sharp(px, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(FILE);

  console.log("flood-cleared pale leftovers:", cleared);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
