const fs = require("fs");
const path = require("path");

const publicDir = path.resolve(__dirname, "../public");
const outputPath = path.resolve(__dirname, "brand-logo-ratios.json");

function parseViewBox(svgContent) {
  const match = svgContent.match(/viewBox\s*=\s*["']([^"']+)["']/i);
  if (!match) return null;

  const parts = match[1].trim().split(/\s+/).map(Number);
  if (parts.length !== 4 || parts.some(Number.isNaN)) return null;

  const [, , width, height] = parts;
  return { width, height };
}

function computeRatio(width, height) {
  if (!width || !height) return null;
  return width / height;
}

const result = {};

for (const folder of fs.readdirSync(publicDir, { withFileTypes: true })) {
  if (!folder.isDirectory()) continue;

  const logoPath = path.join(publicDir, folder.name, "images", "brandLogo.svg");
  if (!fs.existsSync(logoPath)) continue;

  const svg = fs.readFileSync(logoPath, "utf8");
  const viewBox = parseViewBox(svg);

  if (!viewBox) {
    console.warn(`Skipping ${logoPath}: no valid viewBox found`);
    continue;
  }

  result[folder.name] = {
    width: viewBox.width,
    height: viewBox.height,
    ratio: computeRatio(viewBox.width, viewBox.height),
  };
}

fs.writeFileSync(outputPath, JSON.stringify(result, null, 2) + "\n");
console.log(`Wrote ${outputPath}`);