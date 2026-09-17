import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const colors = {
  primary: "#0B0D10",
  accent: "#1E6BFF",
  light: "#F4F5F7",
  gray: "#D4D7DC",
  white: "#FFFFFF",
};

function createSvg(width, height, bg, label, sublabel = "", textColor = colors.primary) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bg}"/>
  <rect x="20" y="20" width="${width - 40}" height="${height - 40}" fill="none" stroke="${textColor}" stroke-width="1" opacity="0.15"/>
  <text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}" font-family="system-ui, sans-serif" font-size="${Math.min(width, height) * 0.06}" font-weight="700" letter-spacing="2">${label}</text>
  ${sublabel ? `<text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}" font-family="system-ui, sans-serif" font-size="${Math.min(width, height) * 0.035}" opacity="0.6">${sublabel}</text>` : ""}
</svg>`;
}

const root = path.join(__dirname, "..", "public");

const payments = [
  { name: "visa.svg", label: "VISA", color: "#1A1F71" },
  { name: "mastercard.svg", label: "MC", color: "#EB001B" },
  { name: "amex.svg", label: "AMEX", color: "#006FCF" },
  { name: "paypal.svg", label: "PayPal", color: "#003087" },
  { name: "apple-pay.svg", label: "Pay", color: "#000000" },
];

function createPaymentIcon(name, color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="32" viewBox="0 0 48 32">
  <rect width="48" height="32" rx="2" fill="${colors.light}" stroke="${colors.gray}" stroke-width="1"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${color}" font-family="system-ui, sans-serif" font-size="8" font-weight="700">${name}</text>
  </svg>`;
}

fs.mkdirSync(path.join(root, "payments"), { recursive: true });
payments.forEach((p) => fs.writeFileSync(path.join(root, "payments", p.name), createPaymentIcon(p.label, p.color)));

const productsFile = fs.readFileSync(path.join(__dirname, "..", "data", "products.ts"), "utf8");
const slugMatches = [...productsFile.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);

fs.mkdirSync(path.join(root, "products"), { recursive: true });
slugMatches.forEach((slug) => {
  const label = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  for (let j = 1; j <= 2; j++) {
    const dest = path.join(root, "products", `${slug}-${j}.jpg`);
    if (fs.existsSync(dest)) continue;
    fs.writeFileSync(
      path.join(root, "products", `${slug}-${j}.svg`),
      createSvg(600, 750, colors.light, label, `View ${j}`)
    );
  }
});

console.log("Generated UPPER DECK placeholder SVGs where JPGs are missing");
