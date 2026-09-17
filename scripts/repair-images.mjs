/**
 * Repair pass: download missing or mismatched UPPER DECK images.
 * Matching product identity is prioritized over uniqueness.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "..", "public");

const REPAIRS = [
  { file: "banners/featured.jpg", width: 1600, ids: ["photo-1534438327276-14e5300c3a48", "photo-1571019613454-1cb2f99b2d8b"] },
  { file: "banners/editorial-detail.jpg", width: 1200, ids: ["photo-1501555085422-7ae57c8d6c6d", "photo-1551632811-561732d1e306"] },
  { file: "categories/outdoor.jpg", width: 900, ids: ["photo-1551632811-561732d1e306", "photo-1464822759023-fed622ff2c3b"] },
  { file: "categories/travel.jpg", width: 900, ids: ["photo-1469854523086-cc02fe5d8800", "photo-1488646953014-85cb44e3f2ea"] },
  { file: "categories/apparel.jpg", width: 900, ids: ["photo-1523381210434-271e8be1f52b", "photo-1490481651871-ab68de25d43d", "photo-1445205170230-053b83016050"] },
  { file: "categories/everyday-carry.jpg", width: 900, ids: ["photo-1553062407-98eeb64c6a62", "photo-1547949003-9792a18a2601"] },
  { file: "products/charge-crew-socks-1.jpg", width: 900, ids: ["photo-1582966772680-202e62169670", "photo-1576566588028-4147f3842f27", "photo-1521572163474-6864f9cf17ab"] },
  { file: "products/charge-crew-socks-2.jpg", width: 900, ids: ["photo-1583743814966-8936f5b7be1a", "photo-1618354691373-d851c5c3a990"] },
  { file: "products/trail-28-pack-1.jpg", width: 900, ids: ["photo-1553062407-98eeb64c6a62", "photo-1491637639811-60e2756cc1c7"] },
  { file: "products/trail-28-pack-2.jpg", width: 900, ids: ["photo-1622560480605-d83c853bc5c3", "photo-1501555085422-7ae57c8d6c6d"] },
  { file: "products/compact-camp-tent-1.jpg", width: 900, ids: ["photo-1504280390367-361c6d9f38f4", "photo-1478131143081-80f7f84ca84d"] },
  { file: "products/compact-camp-tent-2.jpg", width: 900, ids: ["photo-1478131143081-80f7f84ca84d", "photo-1504851149312-7a075b496cc7"] },
  { file: "products/storm-packable-shell-1.jpg", width: 900, ids: ["photo-1521223890158-f9f7c3d5d504", "photo-1591047139829-d91aecb6caea"] },
  { file: "products/trail-camp-light-2.jpg", width: 900, ids: ["photo-1504851149312-7a075b496cc7", "photo-1478131143081-80f7f84ca84d"] },
  { file: "products/studio-grip-mat-1.jpg", width: 900, ids: ["photo-1544367567-0f2fcb009e0b", "photo-1571019614242-c5c5dee9f50b"] },
  { file: "products/studio-grip-mat-2.jpg", width: 900, ids: ["photo-1593810451137-5dc55105dace", "photo-1518611012118-696072aa579a"] },
  { file: "products/five-loop-bands-1.jpg", width: 900, ids: ["photo-1517836357463-d25dfeac3438", "photo-1534438327276-14e5300c3a48"] },
  { file: "products/five-loop-bands-2.jpg", width: 900, ids: ["photo-1598289431512-b97b0917affc", "photo-1571019614242-c5c5dee9f50b"] },
  { file: "products/recovery-foam-roller-2.jpg", width: 900, ids: ["photo-1571019613454-1cb2f99b2d8b", "photo-1518611012118-696072aa579a"] },
  { file: "products/cast-iron-kettlebell-1.jpg", width: 900, ids: ["photo-1517963879433-6ad2b056d712", "photo-1576678927484-cc907957088c"] },
  { file: "products/weekender-duffel-1.jpg", width: 900, ids: ["photo-1547949003-9792a18a2601", "photo-1553062407-98eeb64c6a62"] },
  { file: "products/packing-cube-trio-1.jpg", width: 900, ids: ["photo-1553413077-190dd305871c", "photo-1565026057447-bc90a3dceb87"] },
  { file: "products/travel-dopp-kit-1.jpg", width: 900, ids: ["photo-1581605405669-fdf9368a9878", "photo-1596462502278-27bfdc403348"] },
  { file: "products/packable-day-sack-1.jpg", width: 900, ids: ["photo-1491637639811-60e2756cc1c7", "photo-1622560480605-d83c853bc5c3"] },
  { file: "products/packable-day-sack-2.jpg", width: 900, ids: ["photo-1553062407-98eeb64c6a62", "photo-1547949003-9792a18a2601"] },
  { file: "products/merino-long-sleeve-1.jpg", width: 900, ids: ["photo-1434389677669-e08b4cac3105", "photo-1618354691373-d851c5c3a990"] },
  { file: "products/trail-quarter-zip-2.jpg", width: 900, ids: ["photo-1556821840-3a63f95609a7", "photo-1620799140408-edc6dcb6d633"] },
  { file: "products/everyday-knit-polo-1.jpg", width: 900, ids: ["photo-1581655353564-df123a1eb820", "photo-1617137984095-74e4e5e3613f"] },
  { file: "products/daily-knit-trainer-1.jpg", width: 900, ids: ["photo-1595950653106-6c9ebd614d3a", "photo-1460353581641-37baddab0fa2"] },
  { file: "products/field-sunglasses-2.jpg", width: 900, ids: ["photo-1577803645773-f96470509666", "photo-1473496169904-658ba7c44d8a"] },
  { file: "products/watch-cap-beanie-2.jpg", width: 900, ids: ["photo-1521369909029-2afed882baee", "photo-1576871337622-98d48d1cf531"] },
  { file: "products/insulated-camp-mug-1.jpg", width: 900, ids: ["photo-1544148103-0773bf10d330", "photo-1602143407151-7111542de6e8"] },
  { file: "products/insulated-camp-mug-2.jpg", width: 900, ids: ["photo-1523362628745-0c100150b504", "photo-1544148103-0773bf10d330"] },
  { file: "products/microfiber-gym-towel-2.jpg", width: 900, ids: ["photo-1571902943202-507ec2618e8f", "photo-1534438327276-14e5300c3a48"] },
  { file: "products/training-grip-gloves-1.jpg", width: 900, ids: ["photo-1517836357463-d25dfeac3438", "photo-1571019614242-c5c5dee9f50b"] },
  { file: "products/training-grip-gloves-2.jpg", width: 900, ids: ["photo-1534438327276-14e5300c3a48", "photo-1518611012118-696072aa579a"] },
  { file: "products/slim-field-wallet-1.jpg", width: 900, ids: ["photo-1627123424574-724758594e93", "photo-1563013544-824ae1b704d3"] },
  { file: "products/everyday-sling-1.jpg", width: 900, ids: ["photo-1547949003-9792a18a2601", "photo-1553062407-98eeb64c6a62"] },
  { file: "products/everyday-sling-2.jpg", width: 900, ids: ["photo-1491637639811-60e2756cc1c7", "photo-1622560480605-d83c853bc5c3"] },
  { file: "products/tech-organizer-pouch-2.jpg", width: 900, ids: ["photo-1484480974693-6ca0a78fb36b", "photo-1553413077-190dd305871c"] },
  { file: "products/compact-field-light-1.jpg", width: 900, ids: ["photo-1504851149312-7a075b496cc7", "photo-1478131143081-80f7f84ca84d"] },
  { file: "products/compact-field-light-2.jpg", width: 900, ids: ["photo-1464822759023-fed622ff2c3b", "photo-1504280390367-361c6d9f38f4"] },
  { file: "products/trail-carabiner-set-1.jpg", width: 900, ids: ["photo-1522163182402-834f871d8b0d", "photo-1464822759023-fed622ff2c3b"] },
  { file: "reviews/review-1.jpg", width: 600, ids: ["photo-1476480862126-209bfaa8edc8"] },
  { file: "reviews/review-3.jpg", width: 600, ids: ["photo-1551632811-561732d1e306"] },
  { file: "reviews/review-4.jpg", width: 600, ids: ["photo-1571008887538-b36bb32f4571"] },
  { file: "reviews/review-5.jpg", width: 600, ids: ["photo-1534438327276-14e5300c3a48"] },
  { file: "reviews/review-6.jpg", width: 600, ids: ["photo-1469854523086-cc02fe5d8800"] },
  { file: "reviews/review-7.jpg", width: 600, ids: ["photo-1491553895911-0055eca6402d"] },
  { file: "reviews/review-8.jpg", width: 600, ids: ["photo-1556821840-3a63f95609a7"] },
];

function unsplashUrl(photoId, width) {
  return `https://images.unsplash.com/${photoId}?fm=jpg&q=80&w=${width}&auto=format&fit=crop`;
}

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "UpperDeckLLC/1.0 (image-repair)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error("File too small");
  return buf;
}

async function main() {
  let success = 0;
  let failed = 0;

  for (const target of REPAIRS) {
    const dest = path.join(PUBLIC, target.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    let saved = false;

    for (const photoId of target.ids) {
      try {
        const buf = await download(unsplashUrl(photoId, target.width));
        fs.writeFileSync(dest, buf);
        console.log(`✓ ${target.file} ← ${photoId}`);
        saved = true;
        success++;
        break;
      } catch (err) {
        console.warn(`  retry ${target.file} (${photoId}): ${err.message}`);
      }
    }

    if (!saved) {
      failed++;
      console.error(`✗ failed: ${target.file}`);
    }
  }

  console.log(`\nRepair done: ${success} saved, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
