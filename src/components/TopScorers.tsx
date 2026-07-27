import { BallIcon, TrophyIcon } from "./Icons";

export default function TopScorers() {
  return (
    <section id="top-skor" className="mx-auto max-w-5xl px-5 py-12">
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <TrophyIcon className="h-5 w-5 text-amber-400" />
            <h2 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
              Top Skor
            </h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">Daftar pencetak gol terbanyak</p>
        </div>
        <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-[11px] font-600 uppercase tracking-wide text-amber-300">
          Belum Tersedia
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent">
        {/* Table head */}
        <div className="grid grid-cols-[40px_1fr_auto] items-center gap-2 border-b border-white/[0.06] px-4 py-2.5 sm:grid-cols-[56px_1fr_1fr_auto]">
          <span className="text-[11px] font-600 uppercase tracking-wide text-slate-500">#</span>
          <span className="text-[11px] font-600 uppercase tracking-wide text-slate-500">Pemain</span>
          <span className="hidden text-[11px] font-600 uppercase tracking-wide text-slate-500 sm:block">Tim</span>
          <span className="text-[11px] font-600 uppercase tracking-wide text-slate-500">Gol</span>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 animate-glow rounded-full bg-amber-500/20 blur-2xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-500/10">
              <BallIcon className="h-8 w-8 text-amber-400/70" />
            </div>
          </div>
          <h3 className="font-condensed text-lg font-600 uppercase tracking-wide text-slate-300">
            Belum ada data pencetak gol
          </h3>
          <p className="mt-1.5 max-w-sm text-sm text-slate-500">
            Klasemen top skor akan diperbarui secara berkala setelah pertandingan
            dimulai. Pantau terus perkembangannya di sini!
          </p>
        </div>
      </div>
    </section>
  );
}
