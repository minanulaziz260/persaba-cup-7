// =====================================================================
//  ⚙️ LOGO TIM — OTOMATIS (TINGGAL UPLOAD FILE LOGO, TANPA EDIT KODE)
//  -------------------------------------------------------------------
//  CARA PAKAI:
//    1. Buka folder:  src/assets/logos/
//    2. Taruh file logo tim di sana. Selesai — langsung dipakai otomatis!
//
//  Aturan nama file: cukup MIRIP nama tim (huruf besar/kecil & tanda
//  hubung bebas). Contoh untuk "Balong Raya":
//        balong-raya.png   |   balong_raya.png   |   BalongRaya.png
//
//  Contoh nama file untuk beberapa tim:
//        "Balong Raya"     -> balong-raya.png
//        "Gandasuli FC"    -> gandasuli-fc.png
//        "PSIT"            -> psit.png
//        "AFK Kalisalak"   -> afk-kalisalak.png
//        "Diklat HM"       -> diklat-hm.png
//
//  Format didukung: .png .jpg .jpeg .webp .svg
//  File logo di-EMBED ke aplikasi (tampil walau offline).
//  Tim tanpa file logo tetap pakai AVATAR INISIAL otomatis (mis. "MM").
// =====================================================================

import { ROUNDS } from "./tournament";

/** Normalisasi: "Balong Raya" / "balong-raya" -> "balongraya" */
function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Kumpulkan semua nama tim asli dari jadwal (bukan slot "Menunggu") */
const realTeamNames = Array.from(
  new Set(
    ROUNDS.flatMap((round) =>
      round.matches.flatMap((m) => [m.home.name, m.away.name]),
    ),
  ),
).filter((name) => name !== "Menunggu Pemenang");

/** Pemetaan slug -> nama tim resmi (mis. "balongraya" -> "Balong Raya") */
const TEAM_BY_SLUG: Record<string, string> = {};
for (const name of realTeamNames) {
  TEAM_BY_SLUG[slug(name)] = name;
}

/** Baca SEMUA file gambar di folder logos secara otomatis */
const logoFiles = import.meta.glob(
  "../assets/logos/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, import: "default" },
) as Record<string, string>;

/** Susun peta logo akhir: nama tim -> URL gambar */
export const TEAM_LOGOS: Record<string, string> = {};
for (const [path, url] of Object.entries(logoFiles)) {
  const fileName = path.split("/").pop() ?? path; // "balong-raya.png"
  const fileSlug = slug(fileName.replace(/\.[^.]+$/, "")); // "balongraya"
  const teamName = TEAM_BY_SLUG[fileSlug];
  if (teamName) {
    TEAM_LOGOS[teamName] = url;
  }
}
