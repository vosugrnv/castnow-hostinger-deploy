// Chuyển PNG trong public/ sang WebP đúng cỡ hiển thị, nén lại JPG tại chỗ,
// rồi đổi tham chiếu "/x.png" -> "/x.webp" trong app/, components/, lib/.
import { readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

sharp.cache(false);

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
const pub = join(root, "public");

const KEEP_PNG = new Set(["og-tasknow.png", "favicon.png", "qr-tasknow.png"]);

/** Cạnh dài tối đa (px) theo nhóm ảnh. */
function maxSide(name) {
  if (/^avatar-/.test(name)) return 256;
  if (/^logo-/.test(name)) return 448;
  if (/^(hero-|screen-|app-banner)/.test(name)) return 1280;
  if (/^card-/.test(name)) return 640;
  if (/^ai-robot/.test(name)) return 720;
  return 512;
}

let before = 0;
let after = 0;
const converted = [];

for (const name of readdirSync(pub).sort()) {
  if (name.endsWith(".tmp")) continue;
  const file = join(pub, name);
  const size = statSync(file).size;
  if (/\.png$/i.test(name) && !KEEP_PNG.has(name)) {
    const out = join(pub, name.replace(/\.png$/i, ".webp"));
    const side = maxSide(name);
    await sharp(file)
      .resize({ width: side, height: side, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, alphaQuality: 90, effort: 6 })
      .toFile(out);
    before += size;
    after += statSync(out).size;
    converted.push(name);
  } else if (/\.jpe?g$/i.test(name)) {
    const buf = await sharp(file)
      .resize({ width: 1280, height: 1280, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();
    if (buf.length < size * 0.9) {
      writeFileSync(`${file}.tmp`, buf);
      renameSync(`${file}.tmp`, file);
      before += size;
      after += buf.length;
    }
  }
}

console.log(`Ảnh: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB, ${converted.length} PNG -> WebP`);

const SRC_DIRS = ["app", "components", "lib"];
const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|css)$/.test(n) ? [p] : [];
  });

let edits = 0;
const leftovers = [];
for (const file of SRC_DIRS.flatMap((d) => walk(join(root, d)))) {
  let text = readFileSync(file, "utf8");
  const orig = text;
  for (const name of converted) {
    const base = name.replace(/\.png$/i, "");
    const re = new RegExp(`(["'(])/${base.replace(/[-.]/g, "\\$&")}\\.png`, "g");
    text = text.replace(re, `$1/${base}.webp`);
    if (text.includes(`/${name}`)) leftovers.push(`${file.replace(root, "")}: ${name}`);
  }
  if (text !== orig) {
    writeFileSync(file, text);
    edits++;
  }
}
console.log(`Đã sửa ${edits} file nguồn`);
if (leftovers.length) console.log("Còn tham chiếu PNG (giữ nguyên):\n  " + leftovers.join("\n  "));
