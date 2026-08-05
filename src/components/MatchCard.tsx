import type { Match, Team } from "../data/tournament";
import { cn } from "../utils/cn";
import { STATUS_META, teamColor, teamInitials } from "../lib/format";
import { TEAM_LOGOS } from "../data/logos";
import { CalendarIcon, CheckIcon, ClockIcon, LiveIcon, PinIcon } from "./Icons";

function StatusBadge({ status }: { status: Match["status"] }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-700 uppercase tracking-wider",
        meta.badge,
      )}
    >
      {status === "live" ? (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-live rounded-full bg-red-500" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-400" />
        </span>
      ) : meta.icon === "check" ? (
        <CheckIcon className="h-3 w-3" />
      ) : (
        <ClockIcon className="h-3 w-3" />
      )}
      {meta.label}
    </span>
  );
}

function Avatar({ team, dimmed }: { team: Team; dimmed?: boolean }) {
  if (team.tbd) {
    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-600 bg-slate-800/40 text-slate-500">
        <span className="text-sm">?</span>
      </div>
    );
  }

  // Pakai logo tim jika didaftarkan di src/data/logos.ts
  const logoUrl = TEAM_LOGOS[team.name];
  if (logoUrl) {
    return (
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-pitch-900 shadow-sm ring-1 ring-white/10",
          dimmed && "opacity-50 saturate-50",
        )}
      >
        <img
          src={logoUrl}
          alt={`Logo ${team.name}`}
          className="h-full w-full object-contain p-0.5"
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback: avatar inisial otomatis
  return (
    <div
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-800 text-amber-950 shadow-sm ring-1 ring-white/10",
        teamColor(team),
        dimmed && "opacity-50 saturate-50",
      )}
    >
      {teamInitials(team.name)}
    </div>
  );
}

function TeamRow({
  team,
  score,
  isWinner,
  isLoser,
  showScore,
}: {
  team: Team;
  score?: number | string | null;
  isWinner?: boolean;
  isLoser?: boolean;
  showScore: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5">
      <Avatar team={team} dimmed={isLoser} />
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            "truncate text-sm",
            team.tbd
              ? "italic text-slate-500"
              : isWinner
                ? "font-700 text-amber-300"
                : isLoser
                  ? "font-500 text-slate-500"
                  : "font-600 text-white",
          )}
        >
          {team.name}
        </div>
        <div className="truncate text-[11px] text-slate-500">{team.origin}</div>
      </div>
      {showScore && (
        <div
          className={cn(
            "w-7 text-center font-display text-2xl leading-none",
            team.tbd
              ? "text-slate-600"
              : isWinner
                ? "text-amber-300"
                : isLoser
                  ? "text-slate-600"
                  : "text-white",
          )}
        >
          {score ?? "-"}
        </div>
      )}
    </div>
  );
}

export default function MatchCard({
  match,
  index,
  roundTag,
}: {
  match: Match;
  index: number;
  roundTag?: string;
}) {
  const meta = STATUS_META[match.status];
  const showScore = match.status !== "scheduled";
  const bothTbd = match.home.tbd && match.away.tbd;
  const winner = match.status === "finished" ? match.winner : null;

  return (
    <div
      className={cn(
        "group animate-float-up relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.015] shadow-lg shadow-black/30 transition-all duration-300 hover:border-amber-400/40 hover:from-white/[0.07]",
        "before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:content-['']",
        meta.accent,
        match.status === "live" && "ring-1 ring-red-500/30",
      )}
      style={{ animationDelay: `${Math.min(index * 45, 400)}ms` }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="font-condensed text-[11px] font-600 uppercase tracking-[0.18em] text-slate-500">
            Match {String(match.id).padStart(2, "0")}
          </span>
          {roundTag && (
            <span className="rounded bg-amber-400/10 px-1.5 py-0.5 text-[9px] font-700 uppercase tracking-wider text-amber-300 ring-1 ring-inset ring-amber-400/20">
              {roundTag}
            </span>
          )}
        </div>
        <StatusBadge status={match.status} />
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 pt-3">
        <span className="inline-flex items-center gap-1.5 text-[13px] font-600 text-amber-200">
          <CalendarIcon className="h-3.5 w-3.5 text-amber-400/80" />
          {match.day ? `${match.day}, ` : ""}{match.date}
        </span>
        {match.time && (
          <span className="inline-flex items-center gap-1 text-[12px] text-slate-400">
            <ClockIcon className="h-3.5 w-3.5" />
            {match.time} WIB
          </span>
        )}
      </div>
      {match.venue && (
        <div className="px-4 pb-1 pt-1">
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
            <PinIcon className="h-3 w-3" />
            {match.venue}
          </span>
        </div>
      )}

      {/* Teams */}
      <div className="px-1 pb-3 pt-2">
        <TeamRow
          team={match.home}
          score={match.scoreHome}
          showScore={showScore}
          isWinner={winner === "home"}
          isLoser={winner === "away"}
        />

        {showScore || bothTbd ? (
          <div className="mx-4 my-0.5 h-px bg-white/[0.06]" />
        ) : (
          <div className="flex items-center gap-3 px-4 py-1.5">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] font-800 tracking-widest text-slate-600">VS</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
        )}

        <TeamRow
          team={match.away}
          score={match.scoreAway}
          showScore={showScore}
          isWinner={winner === "away"}
          isLoser={winner === "home"}
        />
      </div>

      {/* Live minute footer */}
      {match.status === "live" && match.minute && (
        <div className="flex items-center justify-center gap-1.5 border-t border-red-500/20 bg-red-500/[0.06] py-1.5">
          <LiveIcon className="h-3.5 w-3.5 text-red-400" />
          <span className="text-[11px] font-700 uppercase tracking-wider text-red-300">
            Live · Babak {match.minute}
          </span>
        </div>
      )}
    </div>
  );
}
