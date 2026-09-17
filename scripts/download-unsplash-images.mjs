/**
 * Downloads unique Unsplash images for UPPER DECK LLC.
 * Hero, categories, banners, products (×2), and review photos.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const PRODUCT_IMAGES = {
  "tempo-knit-tee": ["photo-1521572163474-6864f9cf17ab", "photo-1583743814966-8936f5b7be1a"],
  "motion-training-shorts": ["photo-1591195853828-11db59a44f6b", "photo-1515886657613-9f3515b0c78f"],
  "ridge-softshell": ["photo-1591047139829-d91aecb6caea", "photo-1544022613-e87ca75a784a"],
  "pulse-cap": ["photo-1588850561407-ed78c282e89b", "photo-1521369909029-2afed882baee"],
  "charge-crew-socks": ["photo-1586350977771-b3b0abd50c37", "photo-1580906853132-f15cae870c64"],
  "trail-28-pack": ["photo-1553062407-98eeb64c6a62", "photo-1501555085422-7ae57c8d6c6d"],
  "summit-bottle": ["photo-1602143407151-7111542de6e8", "photo-1523362628745-0c100150b504"],
  "compact-camp-tent": ["photo-1504280390367-361c6d9f38f4", "photo-1478131143081-80f7f84ca84d"],
  "storm-packable-shell": ["photo-1544923246-77307dd6542d", "photo-1521223890158-f9f7c3d5d504"],
  "trail-camp-light": ["photo-1504851149312-7a075b496cc7", "photo-1445308394109-0bf7df30521b"],
  "studio-grip-mat": ["photo-1592432670736-3299669ea351", "photo-1544367567-0f2fcb009e0b"],
  "five-loop-bands": ["photo-1517836357463-d25dfeac3438", "photo-1598289431512-b97b0917affc"],
  "recovery-foam-roller": ["photo-1571019614242-c5c5dee9f50b", "photo-1601925265168-242426a8c117"],
  "weighted-speed-rope": ["photo-1518611012118-696072aa579a", "photo-1434596922112-19c563067271"],
  "cast-iron-kettlebell": ["photo-1517963879433-6ad2b056d712", "photo-1576678927484-cc907957088c"],
  "weekender-duffel": ["photo-1547949003-9792a18a2601", "photo-1565026057447-bc90a3dceb87"],
  "packing-cube-trio": ["photo-1553413077-190dd305871c", "photo-1581553680321-4fffae59fccd"],
  "cabin-backpack": ["photo-1491637639811-60e2756cc1c7", "photo-1622560480605-d83c853bc5c3"],
  "travel-dopp-kit": ["photo-1581605405669-fdf9368a9878", "photo-1596462502278-27bfdc403348"],
  "packable-day-sack": ["photo-1506318137071-3d4d0ce2ee1b", "photo-1473186578142-8404ed065627"],
  "heavyweight-hoodie": ["photo-1556821840-3a63f95609a7", "photo-1509942774463-acf339cf87d5"],
  "merino-long-sleeve": ["photo-1434389677669-e08b4cac3105", "photo-1618354691373-d851c5c3a990"],
  "trail-quarter-zip": ["photo-1620799140408-edc6dcb6d633", "photo-1578768079052-aa76e1699ae1"],
  "everyday-knit-polo": ["photo-1581655353564-df123a1eb820", "photo-1617137984095-74e4e5e3613f"],
  "lined-training-joggers": ["photo-1552902865-b72c031ac5ea", "photo-1506629082955-511b1aa562c8"],
  "court-trainer": ["photo-1460353581641-37baddab0fa2", "photo-1560769629-975ec94e6a86"],
  "ridge-trail-runner": ["photo-1606107557195-0e29a4b5b4aa", "photo-1542291026-7eec264c27ff"],
  "rest-slide": ["photo-1603808033192-082d6919d3e1", "photo-1562273138-f46be4ebdf33"],
  "approach-hiking-shoe": ["photo-1520219306100-ec4afeeefe58", "photo-1551107696-a4b0c5a0d9a2"],
  "daily-knit-trainer": ["photo-1595950653106-6c9ebd614d3a", "photo-1549298916-b41d501d3772"],
  "field-sunglasses": ["photo-1511499767150-a48a237f0083", "photo-1572635196237-14bfbfe68983"],
  "watch-cap-beanie": ["photo-1576871337622-98d48d1cf531", "photo-1510595418814-38df85230999"],
  "insulated-camp-mug": ["photo-1544148103-0773bf10d330", "photo-1577937927823-6d9253853f1e"],
  "microfiber-gym-towel": ["photo-1571902943202-507ec2618e8f", "photo-1534438327276-14e5300c3a48"],
  "training-grip-gloves": ["photo-1483104874007-4ecec25d4fc2", "photo-1583472607433-64bddc025cf2"],
  "slim-field-wallet": ["photo-1627123424574-724758594e93", "photo-1563013544-824ae1b704d3"],
  "everyday-sling": ["photo-1548036328-09df44490dd9", "photo-1590874103328-eac38a941956"],
  "tech-organizer-pouch": ["photo-1484480974693-6ca0a78fb36b", "photo-1586075010923-2ddab37a3e8f"],
  "compact-field-light": ["photo-1595433707802-6b2626ef1c36", "photo-1513828583688-c52646dbbfd4"],
  "trail-carabiner-set": ["photo-1522163182402-834f871d8b0d", "photo-1464822759023-fed622ff2c3b"],
};

const SITE_IMAGES = [
  { file: "hero/hero-1.jpg", width: 2000, photoId: "photo-1476480862126-209bfaa8edc8" },
  { file: "banners/about.jpg", width: 1600, photoId: "photo-1571019613454-1cb2f99b2d8b" },
  { file: "banners/featured.jpg", width: 1600, photoId: "photo-1517837801035-3514370dcd74" },
  { file: "banners/editorial.jpg", width: 1600, photoId: "photo-1551632811-561732d1e306" },
  { file: "banners/editorial-detail.jpg", width: 1200, photoId: "photo-1483721310020-03333e577066" },
  { file: "banners/travel.jpg", width: 1600, photoId: "photo-1469854523086-cc02fe5d8800" },
  { file: "categories/performance.jpg", width: 900, photoId: "photo-1571008887538-b36bb32f4571" },
  { file: "categories/outdoor.jpg", width: 900, photoId: "photo-1501554728187-ce583db5c2c2" },
  { file: "categories/training.jpg", width: 900, photoId: "photo-1534438327276-14e5300c3a48" },
  { file: "categories/travel.jpg", width: 900, photoId: "photo-1488646953014-85cb44e3f2ea" },
  { file: "categories/apparel.jpg", width: 900, photoId: "photo-1489987707025-9413ea3494b0" },
  { file: "categories/footwear.jpg", width: 900, photoId: "photo-1491553895911-0055eca6402d" },
  { file: "categories/accessories.jpg", width: 900, photoId: "photo-1473496169904-658ba7c44d8a" },
  { file: "categories/everyday-carry.jpg", width: 900, photoId: "photo-1523275335684-37898b6baf30" },
];

const FALLBACK_POOL = [
  "photo-1461896836934-ffe607ba6851",
  "photo-1517649763962-0c623066027b",
  "photo-1552674605-db6ffd4facb5",
  "photo-1571019613454-1cb2f99b2d8b",
  "photo-1534438327276-14e5300c3a48",
  "photo-1517963879433-6ad2b056d712",
  "photo-1541534741688-6078c6bfb5c5",
  "photo-1518611012118-696072aa579a",
  "photo-1476480862126-209bfaa8edc8",
  "photo-1483721310020-03333e577066",
  "photo-1551632811-561732d1e306",
  "photo-1504280390367-361c6d9f38f4",
  "photo-1522163182402-834f871d8b0d",
  "photo-1547949003-9792a18a2601",
  "photo-1553062407-98eeb64c6a62",
  "photo-1602143407151-7111542de6e8",
  "photo-1592432670736-3299669ea351",
  "photo-1460353581641-37baddab0fa2",
  "photo-1511499767150-a48a237f0083",
  "photo-1556821840-3a63f95609a7",
  "photo-1588850561407-ed78c282e89b",
  "photo-1576678927484-cc907957088c",
  "photo-1506126613408-eca07ce68773",
  "photo-1518611012118-696072aa579a",
  "photo-1520219306100-ec4afeeefe58",
  "photo-1542291026-7eec264c27ff",
  "photo-1595950653106-6c9ebd614d3a",
  "photo-1627123424574-724758594e93",
  "photo-1548036328-09df44490dd9",
  "photo-1581655353564-df123a1eb820",
  "photo-1434389677669-e08b4cac3105",
  "photo-1509942774463-acf339cf87d5",
  "photo-1571902943202-507ec2618e8f",
  "photo-1483104874007-4ecec25d4fc2",
  "photo-1544148103-0773bf10d330",
  "photo-1576871337622-98d48d1cf531",
  "photo-1517836357463-d25dfeac3438",
  "photo-1603808033192-082d6919d3e1",
  "photo-1491637639811-60e2756cc1c7",
  "photo-1553413077-190dd305871c",
  "photo-1469854523086-cc02fe5d8800",
  "photo-1488646953014-85cb44e3f2ea",
  "photo-1501554728187-ce583db5c2c2",
  "photo-1571008887538-b36bb32f4571",
  "photo-1544367567-0f2fcb009e0b",
  "photo-1591195853828-11db59a44f6b",
  "photo-1521572163474-6864f9cf17ab",
  "photo-1544923246-77307dd6542d",
  "photo-1504851149312-7a075b496cc7",
  "photo-1445308394109-0bf7df30521b",
];

function unsplashUrl(photoId, width) {
  return `https://images.unsplash.com/${photoId}?fm=jpg&q=85&w=${width}&auto=format&fit=crop`;
}

function parseProducts() {
  const content = fs.readFileSync(path.join(ROOT, "data", "products.ts"), "utf8");
  const blocks = content.split(/\n  \{/);
  const products = [];

  for (const block of blocks.slice(1)) {
    const slug = block.match(/slug: "([^"]+)"/)?.[1];
    if (slug) products.push({ slug });
  }

  return products;
}

function buildTargets() {
  const products = parseProducts();
  const targets = [...SITE_IMAGES];

  for (const product of products) {
    const pair = PRODUCT_IMAGES[product.slug] || [];
    targets.push({
      file: `products/${product.slug}-1.jpg`,
      width: 900,
      photoId: pair[0] || FALLBACK_POOL[0],
    });
    targets.push({
      file: `products/${product.slug}-2.jpg`,
      width: 900,
      photoId: pair[1] || FALLBACK_POOL[1],
    });
  }

  for (let i = 1; i <= 8; i++) {
    targets.push({
      file: `reviews/review-${i}.jpg`,
      width: 600,
      photoId: FALLBACK_POOL[i + 4],
    });
  }

  return targets;
}

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "UpperDeckLLC/1.0 (image-setup)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error("File too small");
  return buf;
}

async function main() {
  const targets = buildTargets();
  console.log(`Downloading ${targets.length} Unsplash images...\n`);

  const usedPhotoIds = new Set();
  const usedHashes = new Set();
  let fallbackIndex = 0;

  const getFallback = (exclude) => {
    while (fallbackIndex < FALLBACK_POOL.length) {
      const id = FALLBACK_POOL[fallbackIndex++];
      if (!usedPhotoIds.has(id) && id !== exclude) return id;
    }
    return null;
  };

  let success = 0;
  let failed = 0;

  for (const target of targets) {
    const dest = path.join(PUBLIC, target.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });

    let saved = false;
    const tryIds = [target.photoId, getFallback(target.photoId)].filter(Boolean);

    for (const photoId of tryIds) {
      if (usedPhotoIds.has(photoId)) continue;

      try {
        const buf = await download(unsplashUrl(photoId, target.width));
        const hash = crypto.createHash("sha256").update(buf).digest("hex");

        if (usedHashes.has(hash)) {
          console.warn(`  skip duplicate: ${target.file}`);
          usedPhotoIds.add(photoId);
          continue;
        }

        fs.writeFileSync(dest, buf);
        usedPhotoIds.add(photoId);
        usedHashes.add(hash);
        saved = true;
        success++;
        console.log(`✓ ${target.file} ← ${photoId}`);
        break;
      } catch (err) {
        console.warn(`  retry ${target.file} (${photoId}): ${err.message}`);
      }
    }

    if (!saved) {
      for (let attempt = 0; attempt < 20 && !saved; attempt++) {
        const photoId = getFallback();
        if (!photoId || usedPhotoIds.has(photoId)) continue;

        try {
          const buf = await download(unsplashUrl(photoId, target.width));
          const hash = crypto.createHash("sha256").update(buf).digest("hex");
          if (usedHashes.has(hash)) continue;

          fs.writeFileSync(dest, buf);
          usedPhotoIds.add(photoId);
          usedHashes.add(hash);
          saved = true;
          success++;
          console.log(`✓ ${target.file} ← ${photoId} (fallback)`);
        } catch {
          /* continue */
        }
      }
    }

    if (!saved) {
      failed++;
      console.error(`✗ failed: ${target.file}`);
    }
  }

  console.log(`\nDone: ${success} downloaded, ${failed} failed, ${usedPhotoIds.size} unique photos`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
