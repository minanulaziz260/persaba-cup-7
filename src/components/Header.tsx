import { TOURNAMENT_INFO, LOGO } from "../data/tournament";
import { BallIcon, CalendarIcon, PinIcon, WhistleIcon } from "./Icons";
import heroField from "../assets/hero-field.jpg";

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroField}
          alt="Lapangan sepakbola Rengasbandung"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/40" />
      </div>

      {/* Pitch line decoration */}
      <div className="pitch-lines absolute inset-0 opacity-40" />

      {/* Logo kanan atas (1:1) */}
      <div className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6">
        <div className="relative">
          <div className="absolute inset-0 animate-glow rounded-2xl bg-amber-400/30 blur-xl" />
          <img
            src={LOGO}
            alt="Logo PERSABA CUP 7"
            className="relative aspect-square h-14 w-14 rounded-2xl object-cover ring-2 ring-amber-400/50 shadow-lg shadow-black/50 sm:h-20 sm:w-20"
          />
        </div>
      </div>

      {/* Glow accents */}
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl animate-glow" />
      <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-yellow-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-5 pt-16 pb-14 sm:pt-20 sm:pb-20">
        {/* Crest badge */}
        <div className="mb-7 flex justify-center sm:justify-start">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 backdrop-blur-sm">
            <BallIcon className="h-4 w-4 text-amber-300" />
            <span className="font-condensed text-xs font-600 uppercase tracking-[0.25em] text-amber-200">
              Edisi Ke-7 · 2026
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center sm:text-left">
          <h1 className="font-display text-5xl leading-[0.92] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-7xl md:text-8xl">
            PERSABA
            <span className="block bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              CUP 7
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl font-condensed text-base uppercase tracking-[0.3em] text-amber-200/80 sm:mx-0 sm:text-lg">
            {TOURNAMENT_INFO.tagline}
          </p>
        </div>

        {/* Info chips */}
        <div className="mt-8 flex flex-col gap-3">
          <div className="flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-sm sm:justify-start">
            <PinIcon className="h-5 w-5 shrink-0 text-amber-400" />
            <span className="text-sm font-500 text-slate-200">
              {TOURNAMENT_INFO.location},{" "}
              <span className="text-slate-400">{TOURNAMENT_INFO.region}</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <span className="inline-flex items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-400/[0.07] px-3 py-1.5">
              <WhistleIcon className="h-4 w-4 text-amber-300" />
              <span className="text-xs font-600 uppercase tracking-wide text-amber-100">
                {TOURNAMENT_INFO.system}
              </span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5">
              <CalendarIcon className="h-4 w-4 text-slate-300" />
              <span className="text-xs font-500 tracking-wide text-slate-300">
                {TOURNAMENT_INFO.dateRange}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
    </header>
  );
}
