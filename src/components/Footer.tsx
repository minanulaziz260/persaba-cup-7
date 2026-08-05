import { TOURNAMENT_INFO, ROUNDS } from "../data/tournament";
import { BallIcon, PinIcon, ShieldIcon } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-8 overflow-hidden border-t border-amber-400/10 bg-pitch-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      <div className="mx-auto max-w-5xl px-5 py-12">
        {/* Knockout flow */}
        <div className="mb-10">
          <p className="mb-4 text-center font-condensed text-[11px] font-600 uppercase tracking-[0.25em] text-slate-500">
            Alur Sistem Gugur
          </p>
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
            {ROUNDS.map((round, i) => (
              <div key={round.id} className="flex shrink-0 items-center gap-2">
                <div className="flex flex-col items-center gap-1 rounded-xl border border-amber-400/15 bg-white/[0.03] px-3 py-2">
                  <span className="font-display text-base text-amber-300">{round.name}</span>
                  <span className="text-[9px] uppercase tracking-wide text-slate-500">
                    {round.matches.length} laga
                  </span>
                </div>
                {i < ROUNDS.length - 1 && (
                  <span className="text-amber-500/60">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-white/[0.07] pt-8 text-center">
          <div className="flex items-center gap-2">
            <BallIcon className="h-5 w-5 text-amber-400" />
            <span className="font-display text-xl tracking-wide text-white">PERSABA CUP 7</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <PinIcon className="h-4 w-4 text-amber-500" />
              {TOURNAMENT_INFO.location}, {TOURNAMENT_INFO.region}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldIcon className="h-4 w-4 text-amber-500" />
              {TOURNAMENT_INFO.system}
            </span>
          </div>

          <a
            href="https://maps.app.goo.gl/M1uWFSWXP4gQpDXj8"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-5 py-2.5 text-sm font-600 text-amber-300 transition-all hover:bg-amber-500/20 hover:text-amber-200 active:scale-95"
          >
            <PinIcon className="h-4 w-4" />
            Live Maps: Lapangan Sipung Jati Rengasbandung
          </a>

          <p className="mt-4 max-w-md text-xs text-slate-600">
            Jadwal dapat berubah sewaktu-waktu mengikuti ketentuan panitia.
          </p>
          <p className="mt-3 text-[11px] text-slate-600">
            © {year} Panitia PERSABA CUP 7 · Dibuat untuk warga Rengasbandung.
          </p>
        </div>
      </div>
    </footer>
  );
}
