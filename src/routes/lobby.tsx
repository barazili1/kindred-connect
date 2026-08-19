import { createFileRoute } from "@tanstack/react-router";

import logo from "@/assets/casino-ai-logo.png";
import { games } from "@/data/games";

export const Route = createFileRoute("/lobby")({
  head: () => ({
    meta: [
      { title: "Lobby — Casino Ai" },
      {
        name: "description",
        content:
          "Browse 28 crash and instant win games in the Casino Ai lobby, from Aviator-style classics to Cash or Crash.",
      },
      { property: "og:title", content: "Lobby — Casino Ai" },
      {
        property: "og:description",
        content: "Browse crash and instant win games in the Casino Ai lobby.",
      },
    ],
  }),
  component: Lobby,
});

function Lobby() {
  return (
    <main className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur-md">
        <img src={logo} alt="Casino Ai logo" width={816} height={816} className="h-9 w-9" />
        <span className="bg-gradient-to-b from-primary to-accent bg-clip-text text-lg font-extrabold tracking-widest text-transparent">
          Casino Ai
        </span>
      </header>

      <section className="px-4 pt-6">
        <div className="flex items-baseline justify-between">
          <h1 className="text-xl font-bold text-foreground">Crash &amp; Instant Games</h1>
          <span className="text-xs text-muted-foreground">{games.length} games</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {games.map((game, i) => (
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
