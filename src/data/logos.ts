// =====================================================================
//  ⚙️ LOGO TIM (SETTING LOGO TIAP TIM YANG TANDING)
//  -------------------------------------------------------------------
//  Secara default, tiap tim ditampilkan sebagai AVATAR INISIAL otomatis
//  (mis. "Balong Raya" -> "BR", "Mitra Muda" -> "MM").
//  Jika Anda mendaftarkan logo di bawah, tim tersebut akan memakai
//  logonya sebagai ganti inisial. Tim yang TIDAK didaftarkan tetap
//  memakai inisial otomatis.
//
//  CARA MENAMBAH LOGO TIM:
//
//  A) Dari file lokal (DI-EMBED ke aplikasi — paling disarankan):
//     1. Buat folder  src/assets/logos/  lalu taruh gambar logo di sana.
//     2. Import gambar di bawah, lalu daftarkan ke TEAM_LOGOS.
//
//  B) Dari URL internet:
//     - Langsung tulis URL-nya sebagai nilai. (Aplikasi harus online
//       saat dibuka agar gambar tampil.)
//
//  PENTING: Kunci (key) HARUS SAMA PERSIS dengan "name" tim di file
//  src/data/tournament.ts — termasuk huruf besar/kecil & spasi.
// =====================================================================

// Contoh import logo dari file lokal (hapus "//" untuk memakainya):
// import balongRaya from "../assets/logos/balong-raya.png";
// import mitraMuda from "../assets/logos/mitra-muda.png";

export const TEAM_LOGOS: Record<string, string> = {
  // --- Contoh pemetaan ---
  // "Balong Raya": balongRaya,                   // logo dari file lokal
  // "Mitra Muda": "https://contoh.com/mitra.png", // logo dari URL
};
