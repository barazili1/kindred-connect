import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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
  const [usersOnline, setUsersOnline] = useState(2417);

  useEffect(() => {
    const id = window.setInterval(() => {
      setUsersOnline((n) =>
        Math.min(3200, Math.max(1800, n + Math.round((Math.random() - 0.5) * 24))),
      );
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  const visible = tab === "all" ? games : games.filter((g) => g.category === tab);

  return (
    <>
      <ParticlesBackground />
      <main className="relative z-10 min-h-screen pb-16">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-transparent px-4 py-3 backdrop-blur-md">
          <span className="bg-gradient-to-b from-accent to-primary bg-clip-text text-base font-extrabold tracking-widest text-transparent">
            Casino Ai
          </span>
          <span className="flex items-center gap-2 rounded-full border border-border bg-transparent px-3 py-1 text-[11px] font-medium text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Users online : <span className="text-foreground">{usersOnline.toLocaleString("en-US")}</span>
          </span>
        </header>

        <section className="flex flex-col items-center px-4 pt-7">
          <img
            src={logo}
            alt="Casino Ai logo"
            width={816}
            height={816}
            className="w-24 drop-shadow-[0_0_32px_oklch(0.66_0.26_300/0.55)]"
          />
          <h1 className="mt-3 bg-gradient-to-b from-accent to-primary bg-clip-text text-2xl font-extrabold tracking-[0.18em] text-transparent">
            Casino Ai
          </h1>
        </section>

        <nav className="mt-6 px-4">
          <div className="flex items-center gap-1 rounded-full border border-border bg-transparent p-1 backdrop-blur-sm">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-all ${
                  tab === t.id
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_0_20px_oklch(0.66_0.26_300/0.45)]"
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
                className="group overflow-hidden rounded-xl border border-border bg-transparent text-left backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_0_26px_oklch(0.66_0.26_300/0.35)]"
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
    </>
  );
}
