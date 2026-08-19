import { games, type Game } from "@/data/games";

export type PredictionKind =
  | "crash"
  | "dice"
  | "thimbles"
  | "mines"
  | "goal"
  | "slot"
  | "wheel"
  | "swamp"
  | "gems";

export function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const instantGames: Game[] = games.filter((g) => g.category === "instant");

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => slugify(g.name) === slug);
}

const kindByName: Record<string, PredictionKind> = {
  "Air Crash": "crash",
  Crash: "crash",
  "Crash Point": "crash",
  Dice: "dice",
  Thimbles: "thimbles",
  "Gems & Mines": "mines",
  "Goal!": "goal",
  Goal: "goal",
  "Swamp Land": "swamp",
  Crystal: "gems",
};

export function getKind(name: string): PredictionKind {
  return kindByName[name] ?? "slot";
}

const slotSymbols = ["7", "★", "♦", "♣", "♥", "🔔", "🍒", "💎"];
const gemSymbols = ["🔷", "🔶", "💎", "❤️", "💚", "💜", "🔺"];

export type Prediction =
  | { kind: "crash"; multiplier: string; safeCashout: string; round: number }
  | { kind: "dice"; target: number; direction: "over" | "under"; chance: number }
  | { kind: "thimbles"; pick: number }
  | { kind: "mines"; safe: number[]; total: number }
  | { kind: "goal"; pick: number; corners: number }
  | { kind: "slot"; reels: string[][]; spins: number; payline: number }
  | { kind: "wheel"; segment: string }
  | { kind: "swamp"; rows: { multiplier: string; safe: number }[]; cols: number }
  | { kind: "gems"; grid: string[]; cluster: number[]; cols: number };

function rnd(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function buildPrediction(kind: PredictionKind): Prediction {
  switch (kind) {
    case "crash": {
      const m = rnd(1.6, 9.4);
      return {
        kind: "crash",
        multiplier: `${m.toFixed(2)}x`,
        safeCashout: `${Math.max(1.2, m * 0.62).toFixed(2)}x`,
        round: Math.floor(rnd(100000, 999999)),
      };
    }
    case "dice": {
      const over = Math.random() > 0.5;
      const target = Math.round(rnd(over ? 12 : 46, over ? 52 : 88));
      return {
        kind: "dice",
        target,
        direction: over ? "over" : "under",
        chance: Math.round(over ? 100 - target : target),
      };
    }
    case "thimbles":
      return { kind: "thimbles", pick: Math.floor(rnd(0, 3)) };
    case "mines": {
      const total = 25;
      const safe = new Set<number>();
      while (safe.size < 5) safe.add(Math.floor(rnd(0, total)));
      return { kind: "mines", safe: [...safe], total };
    }
    case "goal":
      return { kind: "goal", pick: Math.floor(rnd(0, 3)), corners: Math.round(rnd(2, 4)) };
    case "wheel":
      return { kind: "wheel", segment: `x${Math.round(rnd(2, 40))}` };
    case "swamp": {
      const cols = 5;
      const mults = [27.16, 5.43, 2.17, 1.3];
      return {
        kind: "swamp",
        cols,
        rows: mults.map((m) => ({ multiplier: `x${m.toFixed(2)}`, safe: Math.floor(rnd(0, cols)) })),
      };
    }
    case "gems": {
      const cols = 7;
      const grid = Array.from(
        { length: cols * cols },
        () => gemSymbols[Math.floor(Math.random() * gemSymbols.length)]!,
      );
      const start = Math.floor(rnd(0, cols * (cols - 2)));
      const cluster = [start, start + 1, start + 2, start + cols, start + cols + 1].filter(
        (n) => n < cols * cols,
      );
      const sym = gemSymbols[Math.floor(Math.random() * gemSymbols.length)]!;
      for (const i of cluster) grid[i] = sym;
      return { kind: "gems", grid, cluster, cols };
    }
    default: {
      const reels = Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => slotSymbols[Math.floor(Math.random() * slotSymbols.length)]!),
      );
      return { kind: "slot", reels, spins: Math.round(rnd(3, 14)), payline: Math.round(rnd(1, 3)) };
    }
  }
}

/** Random enter-game delay: 1–5 minutes from now. */
export function buildEnterDelayMs() {
  return Math.round(rnd(60_000, 300_000));
}

/** Exact entry time in 12-hour format, e.g. "7:43:20 PM". */
export function formatEnterTime(ts: number) {
  const d = new Date(ts);
  let h = d.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${h}:${mm}:${ss} ${ampm}`;
}
