import type { Round } from "../data/tournament";
import { TOURNAMENT_INFO } from "../data/tournament";
import { CheckIcon, ClockIcon, LiveIcon, ShieldIcon, TrophyIcon, UsersIcon } from "./Icons";

export default function StatBar({ rounds }: { rounds: Round[] }) {
  const allMatches = rounds.flatMap((r) => r.matches);
  const total = allMatches.length;
  const live = allMatches.filter((m) => m.status === "live").length;
  const finished = allMatches.filter((m) => m.status === "finished").length;
  const scheduled = total - live - finished;

  const stats = [
    { icon: UsersIcon, label: "Tim Peserta", value: TOURNAMENT_INFO.totalTeams },
    { icon: ShieldIcon, label: "Total Pertandingan", value: total },
    { icon: TrophyIcon, label: "Jumlah Babak", value: rounds.length },
  ];

  const status = [
    { icon: ClockIcon, label: "Belum Main", value: scheduled, color: "text-slate-300", ring: "ring-white/15 bg-white/[0.06]" },
    { icon: LiveIcon, label: "Tanding", value: live, color: "text-red-300", ring: "ring-red-500/30 bg-red-500/10" },
    { icon: CheckIcon, label: "Selesai", value: finished, color: "text-amber-300", ring: "ring-amber-400/30 bg-amber-400/10" },
  ];

  return (
    <div className="mx-auto -mt-8 max-w-5xl px-5">
      <div className="relative rounded-2xl border border-amber-400/15 bg-pitch-900/90 p-4 shadow-xl shadow-black/40 backdrop-blur sm:p-5">
        <div className="grid grid-cols-3 divide-x divide-white/[0.07]">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-1 text-center sm:flex-row sm:justify-center sm:gap-3 sm:text-left">
              <s.icon className="h-5 w-5 text-amber-400" />
              <div>
                <div className="font-display text-2xl leading-none text-white sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-[10px] font-500 uppercase tracking-wide text-slate-500 sm:text-[11px]">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 border-t border-white/[0.07] pt-4">
          {status.map((s) => (
            <div
              key={s.label}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 ring-1 ring-inset ${s.ring}`}
            >
              <s.icon className={`h-3.5 w-3.5 ${s.color}`} />
              <span className={`text-sm font-700 ${s.color}`}>{s.value}</span>
              <span className="text-[11px] text-slate-400">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
