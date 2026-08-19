import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import logo from "@/assets/casino-ai-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casino Ai — Crash Games Lobby" },
      {
        name: "description",
        content:
          "Casino Ai: enter the lobby and play the hottest crash and instant win games.",
      },
      { property: "og:title", content: "Casino Ai — Crash Games Lobby" },
      {
        property: "og:description",
        content: "Enter the Casino Ai lobby and play the hottest crash games.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = window.setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / 3000) * 100);
      setProgress(pct);
    }, 30);
    const timeout = window.setTimeout(() => {
      navigate({ to: "/lobby" });
    }, 3000);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-8">
      <div className="pointer-events-none absolute -top-32 h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      <img
        src={logo}
        alt="Casino Ai logo"
        width={816}
        height={816}
        className="relative w-40 animate-pulse-glow drop-shadow-[0_0_35px_hsl(45_100%_60%/0.35)]"
      />

      <h1 className="relative mt-6 bg-gradient-to-b from-primary to-accent bg-clip-text text-4xl font-extrabold tracking-[0.15em] text-transparent">
        Casino Ai
      </h1>

      <div className="relative mt-10 w-full max-w-xs">
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent via-primary to-accent shadow-[0_0_18px_hsl(45_100%_60%/0.6)] transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-center text-xs tracking-widest text-muted-foreground">
          LOADING {Math.round(progress)}%
        </p>
      </div>
    </main>
  );
}
