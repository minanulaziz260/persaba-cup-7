import { useEffect, useState } from "react";
import { ROUNDS } from "../data/tournament";
import { ClockIcon } from "./Icons";

const MONTHS: Record<string, string> = {
  Januari: "January",
  Februari: "February",
  Maret: "March",
  April: "April",
  Mei: "May",
  Juni: "June",
  Juli: "July",
  Agustus: "August",
  September: "September",
  Oktober: "October",
  November: "November",
  Desember: "December",
};

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  const [nextMatch, setNextMatch] = useState<any>(null);

  useEffect(() => {
    let next: any = null;
    let targetDate: Date | null = null;

    // Find the very next scheduled match (preferably where both teams are known)
    for (const round of ROUNDS) {
      for (const match of round.matches) {
        if (match.status === "scheduled" && !match.home.tbd && !match.away.tbd) {
          next = match;
          break;
        }
      }
      if (next) break;
    }
    
    // Fallback: if all matches have TBD, just pick the next scheduled one
    if (!next) {
       for (const round of ROUNDS) {
         for (const match of round.matches) {
           if (match.status === "scheduled") {
             next = match;
             break;
           }
         }
         if (next) break;
       }
    }

    if (next) {
      setNextMatch(next);
      const parts = next.date.split(" ");
      if (parts.length >= 3) {
        const [day, month, year] = parts;
        const engMonth = MONTHS[month] || month;
        const time = next.time || "16:00";
        // parse as WIB (+0700)
        targetDate = new Date(`${day} ${engMonth} ${year} ${time}:00 GMT+0700`);
      }
    }

    if (!targetDate) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate!.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    // Run once immediately to prevent 1-second delay
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;
    if (difference > 0) {
      setTimeLeft({
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      });
    } else {
      setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
    }

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft || !nextMatch) return null;

  return (
    <div className="mx-auto max-w-5xl px-5 mt-[-1.5rem] mb-8 relative z-20">
      <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-amber-400/20 bg-pitch-900/90 p-5 backdrop-blur-md sm:flex-row shadow-xl shadow-black/50">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
            <ClockIcon className="h-6 w-6 text-amber-400 animate-pulse" />
          </div>
          <div>
            <p className="text-[11px] font-600 uppercase tracking-widest text-amber-400/80">Laga Berikutnya</p>
            <p className="font-display text-lg tracking-wide text-white mt-0.5">
              {nextMatch.home.name} <span className="text-slate-500 text-sm font-sans mx-1">vs</span> {nextMatch.away.name}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {nextMatch.day}, {nextMatch.date} • {nextMatch.time} WIB
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {[
            { label: "Hari", value: timeLeft.d },
            { label: "Jam", value: timeLeft.h },
            { label: "Menit", value: timeLeft.m },
            { label: "Detik", value: timeLeft.s },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-black/40 border border-white/5 font-display text-lg text-white">
                {item.value.toString().padStart(2, "0")}
              </div>
              <span className="mt-1.5 text-[9px] sm:text-[10px] font-600 uppercase tracking-wider text-slate-400">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
