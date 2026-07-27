import type { Round } from "../data/tournament";
import { cn } from "../utils/cn";

interface Props {
  rounds: Round[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function RoundTabs({ rounds, activeId, onSelect }: Props) {
  return (
    <div className="sticky top-0 z-30 border-b border-amber-400/10 bg-pitch-950/80 backdrop-blur-lg">
      <div className="mx-auto max-w-5xl px-2">
        <nav className="no-scrollbar flex gap-1.5 overflow-x-auto py-3">
          {rounds.map((round) => {
            const active = round.id === activeId;
            return (
              <button
                key={round.id}
                onClick={() => onSelect(round.id)}
                className={cn(
                  "group relative flex shrink-0 flex-col items-start rounded-xl px-4 py-2 transition-all duration-200",
                  active
                    ? "bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-900/40"
                    : "bg-white/[0.04] hover:bg-white/[0.08] ring-1 ring-inset ring-white/5",
                )}
              >
                <span
                  className={cn(
                    "font-condensed text-sm font-700 uppercase tracking-wide",
                    active ? "text-black" : "text-slate-300",
                  )}
                >
                  {round.name}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-500",
                    active ? "text-amber-950/70" : "text-slate-500",
                  )}
                >
                  {round.matches.length} pertandingan
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
