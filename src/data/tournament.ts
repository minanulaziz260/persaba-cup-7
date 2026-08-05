// =====================================================================
//  PERSABA CUP 7 — DATA TURNAMEN
//  Semua jadwal & tim ada di file ini, mudah diedit.
//  Status tiap pertandingan: "scheduled" | "live" | "finished"
//  Tim pemenang (winner) diisi manual saat pertandingan selesai.
//
//  KONDISI SAAT INI: Belum ada pertandingan yang dimainkan.
//  Semua jadwal jam 16:00 sore, mulai 31 Juli 2026.
// =====================================================================

// =====================================================================
//  ⚙️ LOGO TURNAMEN (SETTING LOGO)
//  Logo dipakai di pojok kanan atas header (rasio 1:1 / kotak).
//  CARA GANTI LOGO:
//    1. Siapkan gambar logo Anda (kotak/1:1, format .png disarankan).
//    2. Timpa file: src/assets/logo.png  (pertahankan nama "logo.png")
//  Selesai — logo otomatis ter-update di seluruh tampilan.
// =====================================================================
import logoImage from "../assets/logo.png";
export const LOGO = logoImage;

export type MatchStatus = "scheduled" | "live" | "finished";

export interface Team {
  name: string;
  /** Asal / warga desa perwakilan */
  origin: string;
  /** true jika slot tim belum diketahui (pemenang babak sebelumnya) */
  tbd?: boolean;
}

export interface Match {
  id: number;
  /** Hari, contoh: "Jumat" */
  day: string;
  /** Tanggal lengkap, contoh: "31 Juli 2026" */
  date: string;
  /** Waktu kick-off, contoh: "16:00" (opsional) */
  time?: string;
  /** Lapangan / venue (opsional) */
  venue?: string;
  home: Team;
  away: Team;
  status: MatchStatus;
  /** Skor (hanya jika status live / finished) */
  scoreHome?: number | string | null;
  scoreAway?: number | string | null;
  /** Menit berjalan untuk status live, contoh "67'" */
  minute?: string;
  /** Pemenang pertandingan, diisi saat status finished */
  winner?: "home" | "away" | null;
}

export interface Round {
  id: string;
  name: string;
  /** Label kecil di bawah nama babak */
  subtitle: string;
  matches: Match[];
}

export const TOURNAMENT_INFO = {
  name: "PERSABA CUP 7",
  tagline: "Turnamen Sepakbola Antarkampung",
  location: "Desa Rengasbandung",
  region: "Kec. Jatibarang, Kabupaten Brebes",
  system: "Sistem Gugur (Knockout)",
  totalTeams: 32,
  dateRange: "31 Juli – SELESAI",
} as const;

/** Waktu kick-off seragam */
const KICKOFF = "16:00";
/** Lapangan pertandingan */
const VENUE = "Lapangan Rengasbandung";

/** Helper untuk slot tim yang belum diketahui pemenangnya */
const TBD = (note = "Pemenang Babak Sebelumnya"): Team => ({
  name: "Menunggu Pemenang",
  origin: note,
  tbd: true,
});

// ---------------------------------------------------------------------
//  BABAK 32 BESAR — 16 pertandingan
//  Mulai 31 Juli 2026, semua jam 16:00 sore, belum ada yang main.
// ---------------------------------------------------------------------
const roundOf32: Match[] = [
  {
    id: 1,
    day: "Jumat",
    date: "31 Juli 2026",
    time: KICKOFF,
    venue: VENUE,
    home: { name: "Balong Raya", origin: "Sidamulya" },
    away: { name: "Mitra Muda", origin: "Slawi" },
    status: "finished",
    scoreHome: 0,
    scoreAway: 1,
    winner: "away",
  },
  {
    id: 2,
    day: "Sabtu",
    date: "1 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: { name: "Sinar Muda", origin: "Klampis" },
    away: { name: "Gandasuli FC", origin: "Gandasuli" },
    status: "finished",
    scoreHome: "4 (1)",
    scoreAway: "3 (1)",
    winner: "home",
  },
  {
    id: 3,
    day: "Minggu",
    date: "2 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: { name: "Perseka", origin: "Kedungtukang" },
    away: { name: "Tritama", origin: "Pesantunan" },
    status: "finished",
    scoreHome: 5,
    scoreAway: 0,
    winner: "home",
  },
  {
    id: 4,
    day: "Senin",
    date: "3 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: { name: "Solidaritas FC", origin: "Jatibarang" },
    away: { name: "Dekid FC", origin: "Debong Kidul" },
    status: "finished",
    scoreHome: 4,
    scoreAway: 1,
    winner: "home",
  },
  {
    id: 5,
    day: "Selasa",
    date: "4 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: { name: "Gelora Muda", origin: "Kendawa" },
    away: { name: "Brader FC", origin: "Sigambir" },
    status: "finished",
    scoreHome: 0,
    scoreAway: 3,
    winner: "away",
  },
  {
    id: 6,
    day: "Rabu",
    date: "5 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: { name: "Gema FC", origin: "Gumalar" },
    away: { name: "Prasaja", origin: "Cipetung Paguyangan" },
    status: "finished",
    scoreHome: 4,
    scoreAway: 1,
    winner: "home",
  },
  {
    id: 7,
    day: "Kamis",
    date: "6 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: { name: "Jakid United", origin: "Jatibarang Kidul" },
    away: { name: "Alea FC", origin: "Pasarbatang" },
    status: "scheduled",
  },
  {
    id: 8,
    day: "Jumat",
    date: "7 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: { name: "PSIT", origin: "Terlangu" },
    away: { name: "Pandansari FC", origin: "Paguyangan" },
    status: "scheduled",
  },
  {
    id: 9,
    day: "Sabtu",
    date: "8 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: { name: "URG", origin: "Slawi" },
    away: { name: "Bhima Sena", origin: "Pebatan" },
    status: "scheduled",
  },
  {
    id: 10,
    day: "Minggu",
    date: "9 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: { name: "Persaba", origin: "Rengasbandung" },
    away: { name: "AFK Kalisalak", origin: "Kalisalak" },
    status: "scheduled",
  },
  {
    id: 11,
    day: "Senin",
    date: "10 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: { name: "Liring Galing", origin: "Rajegwesi" },
    away: { name: "Asri FC", origin: "Bumiayu" },
    status: "scheduled",
  },
  {
    id: 12,
    day: "Selasa",
    date: "11 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: { name: "Brebes United", origin: "Kauman" },
    away: { name: "Stronger", origin: "Slawi" },
    status: "scheduled",
  },
  {
    id: 13,
    day: "Rabu",
    date: "12 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: { name: "Sindujaya FC", origin: "Kertasinduyasa" },
    away: { name: "Diklat HM", origin: "Kedungbokor" },
    status: "scheduled",
  },
  {
    id: 14,
    day: "Kamis",
    date: "13 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: { name: "Kebogadung FC", origin: "Kebogadung" },
    away: { name: "Lhumbunk FC", origin: "Randusanga Kulon" },
    status: "scheduled",
  },
  {
    id: 15,
    day: "Jumat",
    date: "14 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: { name: "Tunas Melati", origin: "Karangdawa" },
    away: { name: "Putra Teratai", origin: "Krasak" },
    status: "scheduled",
  },
  {
    id: 16,
    day: "Sabtu",
    date: "15 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: { name: "Persekal", origin: "Kalipucang" },
    away: { name: "Pokek", origin: "Rengaspendawa" },
    status: "scheduled",
  },
];

// ---------------------------------------------------------------------
//  BABAK 16 BESAR — 8 pertandingan (semua slot menunggu pemenang 32 Besar)
// ---------------------------------------------------------------------
const roundOf16: Match[] = [
  {
    id: 17,
    day: "Sabtu",
    date: "22 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: TBD("di 32 besar"),
    away: TBD("di 32 besar"),
    status: "scheduled",
  },
  {
    id: 18,
    day: "Minggu",
    date: "23 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: TBD("di 32 besar"),
    away: TBD("di 32 besar"),
    status: "scheduled",
  },
  {
    id: 19,
    day: "Senin",
    date: "24 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: TBD("di 32 besar"),
    away: TBD("di 32 besar"),
    status: "scheduled",
  },
  {
    id: 20,
    day: "Selasa",
    date: "25 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: TBD("di 32 besar"),
    away: TBD("di 32 besar"),
    status: "scheduled",
  },
  {
    id: 21,
    day: "Rabu",
    date: "26 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: TBD("di 32 besar"),
    away: TBD("di 32 besar"),
    status: "scheduled",
  },
  {
    id: 22,
    day: "Kamis",
    date: "27 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: TBD("di 32 besar"),
    away: TBD("di 32 besar"),
    status: "scheduled",
  },
  {
    id: 23,
    day: "Jumat",
    date: "28 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: TBD("di 32 besar"),
    away: TBD("di 32 besar"),
    status: "scheduled",
  },
  {
    id: 24,
    day: "Sabtu",
    date: "29 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: TBD("di 32 besar"),
    away: TBD("di 32 besar"),
    status: "scheduled",
  },
];

// ---------------------------------------------------------------------
//  BABAK 8 BESAR (Perempat Final) — 4 pertandingan
// ---------------------------------------------------------------------
const roundOf8: Match[] = [
  {
    id: 25,
    day: "Minggu",
    date: "30 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: TBD("Pemenang 16 Besar"),
    away: TBD("Pemenang 16 Besar"),
    status: "scheduled",
  },
  {
    id: 26,
    day: "Senin",
    date: "31 Agustus 2026",
    time: KICKOFF,
    venue: VENUE,
    home: TBD("Pemenang 16 Besar"),
    away: TBD("Pemenang 16 Besar"),
    status: "scheduled",
  },
  {
    id: 27,
    day: "Selasa",
    date: "1 September 2026",
    time: KICKOFF,
    venue: VENUE,
    home: TBD("Pemenang 16 Besar"),
    away: TBD("Pemenang 16 Besar"),
    status: "scheduled",
  },
  {
    id: 28,
    day: "Rabu",
    date: "2 September 2026",
    time: KICKOFF,
    venue: VENUE,
    home: TBD("Pemenang 16 Besar"),
    away: TBD("Pemenang 16 Besar"),
    status: "scheduled",
  },
];

// ---------------------------------------------------------------------
//  SEMI FINAL — 2 pertandingan
// ---------------------------------------------------------------------
const semiFinal: Match[] = [
  {
    id: 29,
    day: "Kamis",
    date: "3 September 2026",
    time: KICKOFF,
    venue: VENUE,
    home: TBD("Pemenang 8 Besar"),
    away: TBD("Pemenang 8 Besar"),
    status: "scheduled",
  },
  {
    id: 30,
    day: "Jumat",
    date: "4 September 2026",
    time: KICKOFF,
    venue: VENUE,
    home: TBD("Pemenang 8 Besar"),
    away: TBD("Pemenang 8 Besar"),
    status: "scheduled",
  },
];

// ---------------------------------------------------------------------
//  FINAL — 1 pertandingan
// ---------------------------------------------------------------------
const finalRound: Match[] = [
  {
    id: 31,
    day: "Minggu",
    date: "6 September 2026",
    time: KICKOFF,
    venue: VENUE,
    home: TBD("Pemenang Semi Final"),
    away: TBD("Pemenang Semi Final"),
    status: "scheduled",
  },
];

export const ROUNDS: Round[] = [
  { id: "32", name: "32 Besar", subtitle: "Babak Penyisihan", matches: roundOf32 },
  { id: "16", name: "16 Besar", subtitle: "Babak Berikutnya", matches: roundOf16 },
  { id: "8", name: "8 Besar", subtitle: "Perempat Final", matches: roundOf8 },
  { id: "semifinal", name: "Semi Final", subtitle: "Babak Semifinal", matches: semiFinal },
  { id: "final", name: "Final", subtitle: "Puncak Turnamen", matches: finalRound },
];
