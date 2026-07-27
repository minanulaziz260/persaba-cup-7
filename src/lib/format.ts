import type { MatchStatus, Team } from "../data/tournament";

export interface StatusMeta {
  label: string;
  /** Tailwind classes untuk badge */
  badge: string;
  /** Warna aksen border kiri kartu */
  accent: string;
  dot: string;
  icon: "clock" | "live" | "check";
}

export const STATUS_META: Record<MatchStatus, StatusMeta> = {
  scheduled: {
    label: "Belum Main",
    badge: "bg-white/[0.06] text-slate-300 ring-1 ring-inset ring-white/15",
    accent: "before:bg-slate-500",
    dot: "bg-slate-400",
    icon: "clock",
  },
  live: {
    label: "Sedang Tanding",
    badge: "bg-red-500/15 text-red-300 ring-1 ring-inset ring-red-400/40",
    accent: "before:bg-red-500",
    dot: "bg-red-500",
    icon: "live",
  },
  finished: {
    label: "Selesai",
    badge: "bg-amber-400/15 text-amber-300 ring-1 ring-inset ring-amber-400/40",
    accent: "before:bg-amber-400",
    dot: "bg-amber-400",
    icon: "check",
  },
};

/** Inisial tim dari nama (max 2 huruf) */
export function teamInitials(name: string): string {
  if (!name) return "?";
  const clean = name.replace(/\b(fc|united|sfc)\b/gi, "").trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}

/** Palet warna avatar tim (nuansa emas/kuning) — dipilih konsisten berdasarkan nama */
const AVATAR_COLORS = [
  "from-amber-400 to-yellow-500",
  "from-yellow-400 to-amber-600",
  "from-amber-500 to-orange-500",
  "from-yellow-500 to-amber-700",
  "from-amber-300 to-yellow-600",
  "from-orange-400 to-amber-600",
  "from-amber-600 to-yellow-700",
  "from-yellow-400 to-orange-500",
];

export function teamColor(team: Team): string {
  let hash = 0;
  const name = team.name + team.origin;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function isWinner(match: {
  status: MatchStatus;
  winner?: "home" | "away" | null;
  home: Team;
}): "home" | "away" | null {
  if (match.status !== "finished" || !match.winner) return null;
  return match.winner;
}
