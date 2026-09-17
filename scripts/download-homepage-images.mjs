/**
 * Downloads unique Unsplash images for homepage-only slots:
 * categories (6), banners (3), instagram (6).
 * Does NOT touch hero or product images.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const PHOTO_POOL = [
  "photo-1496890185067-72d7d9af66b1",
  "photo-1589898362790-edba11d34869",
  "photo-1596683705523-eb49540c3934",
  "photo-1602658327972-85bb6521a086",
  "photo-1603400522537-35e25a14bc1e",
  "photo-1616663717839-2fea42e1a1f6",
  "photo-1619263719761-165c773ee5df",
  "photo-1620000190821-abd8f262b86f",
  "photo-1630381260593-45e8f922997b",
  "photo-1639298107786-fc9e5880016f",
  "photo-1639298109207-5a9ccc254481",
  "photo-1666934209606-a955a12edd63",
  "photo-1674924389976-005a3dba2896",
  "photo-1687951812646-efa29195a80d",
  "photo-1724847885015-be191f1a47ef",
  "photo-1523471826770-c437b4636fe6",
  "photo-1558505780-1e584fab3ede",
  "photo-1574421233376-06f2ccf017f7",
  "photo-1590439471364-192aa70c0b53",
  "photo-1609840112990-4265448268d1",
  "photo-1616627502968-858f7b39f574",
  "photo-1617811449482-31093c8cee16",
  "photo-1621468644541-deea173bd43e",
  "photo-1638232928539-6e91c47ddec5",
  "photo-1639298107851-058984903954",
  "photo-1650481093978-6cc58e4649f4",
  "photo-1533759413974-9e15f3b745ac",
  "photo-1595182939836-5d4ba24ae7bf",
  "photo-1608651061499-ff031fbf6645",
  "photo-1664881353843-769f951ff470",
  "photo-1700590906201-2739ba9efbe9",
  "photo-1707291173710-10514ef55814",
  "photo-1716078103276-133ae3e98424",
  "photo-1758192496546-dc59dd3baa59",
  "photo-1758239873506-82d0e76244f6",
  "photo-1764551355886-d5b25e4b90b6",
  "photo-1764551385451-81fbf705e64c",
  "photo-1769028715040-16cb345ced84",
  "photo-1769770639042-05e6b54a70cb",
  "photo-1769770648224-114810619496",
  "photo-1772476361253-90a9be5e0c19",
  "photo-1639298108944-76a403a7c38d",
  "photo-1760722974657-f64bce2f9cc5",
  "photo-1761992157695-f0dd8d6d2db6",
  "photo-1766727923581-d4df2f4e9308",
  "photo-1766727923586-b37a346bfc76",
  "photo-1766727923650-951353d8255f",
  "photo-1766727923667-4686db7e9bcb",
  "photo-1766727923683-8cc366dfe23b",
  "photo-1766727923864-730fd98dcce2",
  "photo-1766727923624-2e8eede5aa8c",
  "photo-1773867567838-3292f16e4aca",
  "photo-1571896349842-33c89424de2d",
  "photo-1584622650111-993a426fbf0a",
  "photo-1616486338812-3dadae4b4ace",
  "photo-1560185127-6ed189bf02f4",
  "photo-1615529328331-f8917597711f",
  "photo-1600585154526-990dced4db0d",
  "photo-1600566753086-00f18fb6b3ea",
  "photo-1600607687939-ce8a6c25118c",
  "photo-1556228578-8c89e6adf883",
  "photo-1540555700478-4be289fbecef",
  "photo-1600566752355-35792bedcfea",
  "photo-1558618666-fcd25c85cd64",
  "photo-1600585152915-d208bec867a1",
  "photo-1600607687920-4e2a09cf159d",
  "photo-1600585154363-67eb9e2e2099",
  "photo-1505693416388-ac5ce068fe85",
  "photo-1595526114035-0d45ed16cfbf",
  "photo-1604014237800-1c9102c219da",
  "photo-1581578731548-c64695cc6952",
  "photo-1556228720-195a672e8a03",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1631049307264-da0ec9d70304",
  "photo-1600585154340-be6161a56a0c",
  "photo-1600210492486-724fe5c67fb0",
  "photo-1560448075-71d129397b25",
  "photo-1564071665922-072f0d6f6bd8",
  "photo-1586023496775-813d975d5192",
  "photo-1615873964743-90a0b759fc5e",
  "photo-1600607687644-c7171b42498b",
  "photo-1552320884-9c4fef4ef589",
  "photo-1595514537822-8e284785127e",
  "photo-1527515637465-c94e0ddbfe09",
  "photo-1620626011764-996317b8d101",
  "photo-1631889992164-882aae16d807",
  "photo-1600566753190-17fedebaa088",
  "photo-1616628188855-8c7a03445b07",
  "photo-1596394516093-87feb5cb33dd",
  "photo-1556911221-bff31c812bea",
  "photo-1570172619644-df0cb7bf0a08",
  "photo-1519823551278-64ae032d27e0",
  "photo-1600047509807-ba8f88d3cdf7",
  "photo-1618221195710-e982f1f8752b",
  "photo-1631679705879-a6ba6902b779",
  "photo-1560448204-e02f11c2d0e2",
  "photo-1502672260266-1c1ef1d93688",
  "photo-1555042879-3bbffead5596",
  "photo-1516975080662-de93384bdaf7",
  "photo-1523481400522-73651ccf5d4b",
  "photo-1513693902810-1b7c3ceaa280",
  "photo-1600573472592-401b489b3cdc",
  "photo-1584622781867-0d7f090daa3e",
  "photo-1600607688969-a5bfcd6461fe",
  "photo-1515377905543-f15e52645c35",
  "photo-1507652313519-d4e9174996ca",
  "photo-1555041169-4ebf927d8357",
  "photo-1585412727319-8e4b7b5c0b0e",
  "photo-1600185365483-26edb4bd4c45",
  "photo-1628177150159-2f8ce6df1f1e",
  "photo-1583847260160-a63b3f677b9a",
  "photo-1600880292089-3d770f7eefb9",
  "photo-1563453397-107a7c3efb2e",
  "photo-1661940968217-583e272f6fc6",
  "photo-1725901056426-de7ba9b652e8",
  "photo-1733514432941-6a6954b67d0a",
  "photo-1769022452224-ea67ae73a4ce",
  "photo-1765260807545-9e6bfd8f5679",
  "photo-1684445034670-b36aca25c25a",
  "photo-1677354538246-c533b035ae5c",
  "photo-1670930887547-518452a967fb",
  "photo-1664372899275-05bdd18c8516",
  "photo-1679064287065-66207aa15ab7",
  "photo-1676638155455-7db84193f440",
  "photo-1674747086448-2270b41ac808",
  "photo-1556228453-efd6c1ff04f6",
  "photo-1587043862100-01920db231ba",
];

const TARGETS = [
  { file: "categories/bath-towels.jpg", width: 800 },
  { file: "categories/beach-towels.jpg", width: 800 },
  { file: "categories/bathrobes.jpg", width: 800 },
  { file: "categories/cleaning-towels.jpg", width: 800 },
  { file: "categories/face-towels.jpg", width: 800 },
  { file: "categories/accessories.jpg", width: 800 },
  { file: "banners/promo-1.jpg", width: 1600 },
  { file: "banners/about.jpg", width: 1600 },
  { file: "banners/featured.jpg", width: 1600 },
  { file: "instagram/1.jpg", width: 900 },
  { file: "instagram/2.jpg", width: 900 },
  { file: "instagram/3.jpg", width: 900 },
  { file: "instagram/4.jpg", width: 900 },
  { file: "instagram/5.jpg", width: 900 },
  { file: "instagram/6.jpg", width: 900 },
];

function unsplashUrl(photoId, width) {
  return `https://images.unsplash.com/${photoId}?fm=jpg&q=85&w=${width}&auto=format&fit=crop`;
}

function loadExistingHashes() {
  const hashes = new Set();
  const patterns = ["products/*-1.jpg", "products/*-2.jpg", "hero/*.jpg"];
  for (const pattern of patterns) {
    const dir = pattern.split("/")[0];
    const glob = pattern.replace(`${dir}/`, "");
    const folder = path.join(PUBLIC, dir);
    if (!fs.existsSync(folder)) continue;
    for (const name of fs.readdirSync(folder)) {
      if (!name.endsWith(".jpg")) continue;
      if (glob.startsWith("*") && !name.endsWith(glob.slice(1))) continue;
      const buf = fs.readFileSync(path.join(folder, name));
      hashes.add(crypto.createHash("sha256").update(buf).digest("hex"));
    }
  }
  return hashes;
}

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "UpperDeckLLC/1.0 (homepage-images)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error("File too small");
  return buf;
}

async function main() {
  const existingHashes = loadExistingHashes();
  console.log(`Loaded ${existingHashes.size} existing product/hero hashes to avoid.\n`);

  const pool = [...new Set(PHOTO_POOL)];
  const usedPhotoIds = new Set();
  const usedHashes = new Set();
  const failedIds = new Set();
  let poolIndex = 0;

  const getNextPhoto = () => {
    while (poolIndex < pool.length) {
      const id = pool[poolIndex++];
      if (!usedPhotoIds.has(id) && !failedIds.has(id)) return id;
    }
    throw new Error("Ran out of unique photos in pool");
  };

  let success = 0;
  let failed = 0;

  for (const target of TARGETS) {
    const dest = path.join(PUBLIC, target.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });

    let saved = false;
    let attempts = 0;

    while (!saved && attempts < 30) {
      attempts++;
      let photoId;
      try {
        photoId = getNextPhoto();
      } catch {
        break;
      }

      try {
        const buf = await download(unsplashUrl(photoId, target.width));
        const hash = crypto.createHash("sha256").update(buf).digest("hex");

        if (usedHashes.has(hash) || existingHashes.has(hash)) {
          usedPhotoIds.add(photoId);
          continue;
        }

        fs.writeFileSync(dest, buf);
        usedPhotoIds.add(photoId);
        usedHashes.add(hash);
        saved = true;
        success++;
        console.log(`✓ ${target.file} ← ${photoId}`);
      } catch (err) {
        failedIds.add(photoId);
        console.warn(`  retry ${target.file} (${photoId}): ${err.message}`);
      }
    }

    if (!saved) {
      failed++;
      console.error(`✗ failed: ${target.file}`);
    }
  }

  console.log(`\nDone: ${success} downloaded, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
