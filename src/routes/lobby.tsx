import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import logo from "@/assets/casino-ai-logo.png";
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
  const usersOnline = useMemo(() => 2000 + Math.floor(Math.random() * 900), []);

  const visible = tab === "all" ? games : games.filter((g) => g.category === tab);

  return (
    <main className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur-md">
        <span className="bg-gradient-to-b from-primary to-accent bg-clip-text text-base font-extrabold tracking-widest text-transparent">
          Casino Ai
        </span>
        <span className="flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1 text-[11px] font-medium text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Users online : <span className="text-foreground">{usersOnline.toLocaleString()}</span>
        </span>
      </header>

      <section className="flex flex-col items-center px-4 pt-7">
        <img
          src={logo}
          alt="Casino Ai logo"
          width={816}
          height={816}
          className="w-24 drop-shadow-[0_0_28px_hsl(45_100%_60%/0.3)]"
        />
        <h1 className="mt-3 bg-gradient-to-b from-primary to-accent bg-clip-text text-2xl font-extrabold tracking-[0.18em] text-transparent">
          Casino Ai
        </h1>
      </section>

      <nav className="mt-6 px-4">
        <div className="flex items-center gap-1 rounded-full border border-border/60 bg-card/60 p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-all ${
                tab === t.id
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_0_18px_hsl(45_100%_60%/0.35)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <section className="px-4 pt-5">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-bold text-foreground">
            {tabs.find((t) => t.id === tab)?.label}
          </h2>
          <span className="text-xs text-muted-foreground">{visible.length} games</span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((game, i) => (
            <button
              key={game.name}
              type="button"
              className="group overflow-hidden rounded-xl border border-border/60 bg-card text-left transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[0_0_24px_hsl(45_100%_60%/0.18)]"
            >
              <img
                src={game.image}
                alt={`${game.name} game artwork`}
                loading={i < 4 ? "eager" : "lazy"}
                width={301}
                height={180}
                className="aspect-[301/180] w-full object-cover"
              />
              <span className="block truncate px-2.5 py-2 text-xs font-medium text-card-foreground">
                {game.name}
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
