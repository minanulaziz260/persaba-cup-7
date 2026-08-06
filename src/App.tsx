import { useMemo, useState } from "react";
import Header from "./components/Header";
import StatBar from "./components/StatBar";
import RoundTabs from "./components/RoundTabs";
import MatchCard from "./components/MatchCard";
import Countdown from "./components/Countdown";

import Footer from "./components/Footer";
import { BallIcon, SearchIcon, TrophyIcon } from "./components/Icons";
import { ROUNDS } from "./data/tournament";
import trophy from "./assets/trophy.png";

interface SearchHit {
  match: (typeof ROUNDS)[number]["matches"][number];
  roundName: string;
}

export default function App() {
  const [activeId, setActiveId] = useState(ROUNDS[0].id);
  const [query, setQuery] = useState("");

  const activeRound = ROUNDS.find((r) => r.id === activeId) ?? ROUNDS[0];
  const isSearching = query.trim().length > 0;

  const searchResults = useMemo<SearchHit[]>(() => {
    if (!isSearching) return [];
    const q = query.trim().toLowerCase();
    return ROUNDS.flatMap((r) =>
      r.matches
        .filter((m) => {
          const haystack = [m.home.name, m.away.name, m.home.origin, m.away.origin]
            .join(" ")
            .toLowerCase();
          return haystack.includes(q);
        })
        .map((m) => ({ match: m, roundName: r.name })),
    );
  }, [query, isSearching]);

  const hasLive = activeRound.matches.some((m) => m.status === "live");
  const isFinal = activeRound.id === "final";

  return (
    <div className="min-h-screen bg-pitch-950 pb-10">
      <Header />
      <Countdown />
      <StatBar rounds={ROUNDS} />

      <RoundTabs rounds={ROUNDS} activeId={activeId} onSelect={setActiveId} />

      <main className="mx-auto max-w-5xl px-5 py-8">
        {/* Round header + search */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-3xl uppercase tracking-tight text-white sm:text-4xl">
                {activeRound.name}
              </span>
              {hasLive && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-1 text-[10px] font-700 uppercase tracking-wider text-red-300 ring-1 ring-inset ring-red-400/40">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-live rounded-full bg-red-500" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-400" />
                  </span>
                  Live
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {activeRound.subtitle} · {activeRound.matches.length} pertandingan
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari tim atau desa..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-9 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-amber-400/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-amber-500/20"
            />
            {isSearching && (
              <button
                onClick={() => setQuery("")}
                aria-label="Hapus pencarian"
                className="absolute right-2.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-slate-700 text-xs text-slate-300 hover:bg-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Champion banner (Final only) */}
        {isFinal && !isSearching && (
          <div className="mb-6 overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/10 via-pitch-900 to-pitch-900 p-5 sm:p-6">
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <div className="absolute inset-0 animate-glow rounded-full bg-amber-500/30 blur-2xl" />
                <img
                  src={trophy}
                  alt="Piala Juara"
                  className="relative h-24 w-24 rounded-xl object-cover ring-1 ring-amber-400/30 sm:h-28 sm:w-28"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-amber-300">
                  <TrophyIcon className="h-4 w-4" />
                  <span className="font-condensed text-[11px] font-600 uppercase tracking-[0.25em]">
                    Puncak Turnamen
                  </span>
                </div>
                <h3 className="mt-1 font-display text-2xl uppercase text-white sm:text-3xl">
                  Menuju Sang Juara
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Partai puncak berlangsung Minggu, 6 September 2026. Siapa yang
                  akan mengangkat Piala PERSABA CUP 7?
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Match grid */}
        {isSearching ? (
          searchResults.length > 0 ? (
            <>
              <p className="mb-4 text-sm text-slate-400">
                Ditemukan{" "}
                <span className="font-700 text-amber-300">{searchResults.length}</span>{" "}
                pertandingan untuk{" "}
                <span className="font-600 text-white">"{query.trim()}"</span>
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((hit, i) => (
                  <MatchCard
                    key={`${hit.roundName}-${hit.match.id}`}
                    match={hit.match}
                    index={i}
                    roundTag={hit.roundName}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-16 text-center">
              <SearchIcon className="h-10 w-10 text-slate-600" />
              <h3 className="mt-4 font-condensed text-lg uppercase tracking-wide text-slate-300">
                Tim tidak ditemukan
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Coba kata kunci lain atau periksa ejaan nama tim/desa.
              </p>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeRound.matches.map((match, i) => (
              <MatchCard key={match.id} match={match} index={i} />
            ))}
          </div>
        )}
      </main>



      {/* Quick info banner */}
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-amber-400/15 bg-gradient-to-r from-amber-500/[0.07] to-transparent p-5 text-center sm:flex-row sm:text-left">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15">
            <BallIcon className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <h3 className="font-condensed text-base font-600 uppercase tracking-wide text-white">
              Akses dari mana saja
            </h3>
            <p className="mt-0.5 text-sm text-slate-400">
              Halaman ini ringan & ramah HP. Tandai/bookmark untuk pantau jadwal
              PERSABA CUP 7 kapan saja.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
