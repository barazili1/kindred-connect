import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import logo from "@/assets/casino-ai-logo.png";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { games, type GameCategory } from "@/data/games";

export const Route = createFileRoute("/lobby")({
  head: () => ({
    meta: [
      { title: "Lobby — Casino Ai" },
      {
        name: "description",
        content:
          "Browse casino and instant win games in the Casino Ai lobby, from crash classics to slots and hold-and-win hits.",
      },
      { property: "og:title", content: "Lobby — Casino Ai" },
      {
        property: "og:description",
        content: "Browse casino and instant win games in the Casino Ai lobby.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Lobby,
});

type Tab = "all" | GameCategory;

const tabs: { id: Tab; label: string }[] = [
  { id: "all", label: "All games" },
  { id: "casino", label: "Casino games" },
  { id: "instant", label: "Instant games" },
];

function Lobby() {
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const [usersOnline, setUsersOnline] = useState(2417);

  useEffect(() => {
    const id = window.setInterval(() => {
      setUsersOnline((n) =>
        Math.min(3200, Math.max(1800, n + Math.round((Math.random() - 0.5) * 24))),
      );
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  // Luck rotation (client-only to keep SSR markup stable)
  const [slot, setSlot] = useState<{ index: number; endsAt: number } | null>(null);

  useEffect(() => {
    let timer: number;
    const tick = () => {
      const s = getLuckSlot(Date.now());
      setSlot({ index: s.index, endsAt: s.endsAt });
      timer = window.setTimeout(tick, Math.max(1000, s.endsAt - Date.now()));
    };
    tick();
    return () => window.clearTimeout(timer);
  }, []);

  const luckMap = useMemo(
    () => (slot ? getLuckMap(slot.index) : ({} as Record<string, LuckInfo>)),
    [slot],
  );

  const hotGames = useMemo(
    () => games.filter((g) => luckMap[g.name]?.level === "hot"),
    [luckMap],
  );
  const stableGames = useMemo(
    () => games.filter((g) => luckMap[g.name]?.level === "stable"),
    [luckMap],
  );

  const visible = useMemo(() => {
    const byTab = tab === "all" ? games : games.filter((g) => g.category === tab);
    const q = query.trim().toLowerCase();
    return q ? byTab.filter((g) => g.name.toLowerCase().includes(q)) : byTab;
  }, [tab, query]);

  return (
    <>
      <ParticlesBackground />
      <main className="relative z-10 min-h-screen pb-20">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/40 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <span className="bg-gradient-to-b from-accent to-primary bg-clip-text text-base font-extrabold tracking-[0.2em] text-transparent">
              Casino Ai
            </span>
            <span className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[11px] font-medium text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Users online :{" "}
              <span className="text-foreground">{usersOnline.toLocaleString("en-US")}</span>
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-6xl">
          {/* Hero */}
          <section className="relative flex flex-col items-center px-4 pt-8">
            <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/25 blur-[80px]" />
            <img
              src={logo}
              alt="Casino Ai logo"
              width={816}
              height={816}
              className="relative w-24 drop-shadow-[0_0_38px_oklch(0.66_0.26_300/0.65)]"
            />
            <h1 className="relative mt-3 bg-gradient-to-b from-accent via-foreground to-primary bg-clip-text text-3xl font-extrabold tracking-[0.2em] text-transparent">
              Casino Ai
            </h1>
            <p className="relative mt-2 text-center text-xs text-muted-foreground">
              {games.length} premium games · instant play · live multipliers
            </p>

            {/* Search */}
            <label className="relative mt-5 flex w-full max-w-md items-center gap-2 rounded-full border border-border px-4 py-2.5 backdrop-blur-md focus-within:border-primary focus-within:shadow-[0_0_24px_oklch(0.66_0.26_300/0.35)]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4 shrink-0 text-muted-foreground"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search games…"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </label>
          </section>

          {/* Luck rails */}
          <LuckRail
            title="ننصحك بتجربة الألعاب"
            subtitle="Recommended now"
            luck={90}
            tone="hot"
            list={hotGames}
            endsAt={slot?.endsAt}
          />
          <LuckRail
            title="ألعاب مستقرة"
            subtitle="Stable games"
            luck={70}
            tone="stable"
            list={stableGames}
            endsAt={slot?.endsAt}
          />

          {/* Tabs */}
          <nav className="mt-8 px-4">
            <div className="flex items-center gap-1 rounded-full border border-border p-1 backdrop-blur-md">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-all ${
                    tab === t.id
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_0_20px_oklch(0.66_0.26_300/0.5)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Grid */}
          <section className="px-4 pt-6">
            <div className="flex items-baseline justify-between">
              <div className="flex items-center gap-2">
                <span className="h-4 w-1 rounded-full bg-gradient-to-b from-accent to-primary" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                  {tabs.find((t) => t.id === tab)?.label}
                </h2>
              </div>
              <span className="text-xs text-muted-foreground">{visible.length} games</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {visible.map((game, i) => (
                <button
                  key={game.name}
                  type="button"
                  className="group relative overflow-hidden rounded-2xl border border-border text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_30px_oklch(0.66_0.26_300/0.4)]"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={game.image}
                      alt={`${game.name} game artwork`}
                      loading={i < 6 ? "eager" : "lazy"}
                      width={301}
                      height={180}
                      className="aspect-[301/180] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                      <span className="rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary-foreground shadow-[0_0_22px_oklch(0.66_0.26_300/0.6)]">
                        Play
                      </span>
                    </span>
                  </div>
                  <span className="flex items-center justify-between gap-2 px-2.5 py-2">
                    <span className="truncate text-xs font-semibold text-card-foreground">
                      {game.name}
                    </span>
                    <span className="shrink-0 rounded-full border border-border px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
                      {game.category === "casino" ? "Casino" : "Instant"}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {visible.length === 0 && (
              <p className="py-16 text-center text-sm text-muted-foreground">
                No games match “{query}”.
              </p>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
