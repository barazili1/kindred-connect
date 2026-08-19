import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import ballAsset from "@/assets/t/ball.png.asset.json";
import cupAsset from "@/assets/t/cup.png.asset.json";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import {
  buildEnterDelayMs,
  buildPrediction,
  formatEnterTime,
  getGameBySlug,
  getKind,
  type Prediction,
} from "@/lib/predict";

export const Route = createFileRoute("/game/$slug")({
  loader: ({ params }) => {
    const game = getGameBySlug(params.slug);
    if (!game) throw notFound();
    return { name: game.name, image: game.image };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — Casino Ai" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} predictor — Casino Ai`;
    const description = `AI signal predictor for ${loaderData.name}: get a predicted round and the best moment to enter the game.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:image", content: loaderData.image },
        { name: "twitter:image", content: loaderData.image },
      ],
    };
  },
  component: GamePredictor,
  notFoundComponent: () => (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-xl font-bold text-foreground">Game not found</h1>
      <Link to="/lobby" className="text-sm text-primary underline">
        Back to lobby
      </Link>
    </main>
  ),
});

type Phase = "idle" | "waiting" | "ready";

function fmt(ms: number) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function GamePredictor() {
  const { name, image } = Route.useLoaderData();
  const kind = getKind(name);

  const [phase, setPhase] = useState<Phase>("idle");
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [enterAt, setEnterAt] = useState<number | null>(null);
  const [total, setTotal] = useState(1);
  const timer = useRef<number | null>(null);
  const [placeholder, setPlaceholder] = useState<Prediction | null>(null);

  useEffect(() => {
    setPlaceholder(buildPrediction(kind));
  }, [kind]);

  useEffect(() => {
    if (phase !== "waiting" || enterAt == null) return;
    const tick = () => {
      const left = enterAt - Date.now();
      setRemaining(left);
      if (left <= 0) setPhase("ready");
    };
    tick();
    timer.current = window.setInterval(tick, 250);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [phase, enterAt]);

  const start = () => {
    setPrediction(buildPrediction(kind));
    const delay = buildEnterDelayMs();
    setTotal(delay);
    setEnterAt(Date.now() + delay);
    setPhase("waiting");
  };

  const reset = () => {
    setPhase("idle");
    setPrediction(null);
    setEnterAt(null);
  };

  return (
    <>
      <ParticlesBackground />
      <main className="relative z-10 min-h-screen pb-24">
        <header className="sticky top-0 z-30 border-b border-border bg-background/40 backdrop-blur-xl">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
            <Link
              to="/lobby"
              className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                className="h-4 w-4"
              >
                <path d="m14 6-6 6 6 6" />
              </svg>
              Lobby
            </Link>
            <span className="bg-gradient-to-b from-accent to-primary bg-clip-text text-sm font-extrabold tracking-[0.2em] text-transparent">
              Casino Ai
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4">
          {/* Game hero */}
          <section className="relative mt-6 overflow-hidden rounded-3xl border border-primary/40 backdrop-blur-md shadow-[0_0_40px_oklch(0.66_0.26_300/0.35)]">
            <img
              src={image}
              alt={`${name} game artwork`}
              width={301}
              height={180}
              className="h-40 w-full object-cover opacity-70 sm:h-56"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
              <div>
                <h1 className="text-lg font-extrabold text-foreground sm:text-2xl">{name}</h1>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-accent">
                  AI Signal Predictor
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-accent/50 bg-background/70 px-3 py-1 text-[10px] font-bold text-accent backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                LIVE
              </span>
            </div>
          </section>

          {/* Prediction board */}
          <section className="relative mt-5 overflow-hidden rounded-3xl border border-border p-5 backdrop-blur-xl">
            <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-[70px]" />
            <div className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-accent/15 blur-[70px]" />

            {kind !== "none" && (
              <>
                <div className="relative flex items-center justify-between">
                  <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
                    Prediction
                  </h2>
                  <span className="text-[10px] font-semibold text-muted-foreground" dir="rtl">
                    توقّع الجيم القادم
                  </span>
                </div>

                <div
                  className={`relative mt-4 transition-all duration-500 ${
                    prediction ? "opacity-100" : "select-none opacity-40 blur-[6px]"
                  }`}
                >
                  {(prediction ?? placeholder) && (
                    <Board prediction={(prediction ?? placeholder)!} revealed={prediction !== null} />
                  )}
                </div>
              </>
            )}

            {/* Status / CTA */}
            <div className="relative mt-6">
              {phase === "idle" && (
                <button
                  type="button"
                  onClick={start}
                  className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-4 text-base font-extrabold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_0_34px_oklch(0.66_0.26_300/0.55)] transition-transform active:scale-[0.98]"
                >
                  بدأ
                </button>
              )}

              {phase === "waiting" && (
                <div className="rounded-2xl border border-primary/40 p-5 text-center">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    Enter at
                  </p>
                  <p className="mt-1 font-mono text-2xl font-extrabold text-accent drop-shadow-[0_0_18px_oklch(0.8_0.18_180/0.6)]">
                    {enterAt != null ? formatEnterTime(enterAt) : "--:--"}
                  </p>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    Next entry in
                  </p>
                  <p className="mt-1 font-mono text-4xl font-extrabold text-foreground drop-shadow-[0_0_20px_oklch(0.66_0.26_300/0.7)]">
                    {fmt(remaining)}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground" dir="rtl">
                    استنى لحد ما ييجي الوقت المناسب… متخشش دلوقتي
                  </p>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-300"
                      style={{
                        width: `${Math.min(100, Math.max(0, 100 - (remaining / total) * 100))}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {phase === "ready" && (
                <div className="animate-[pulse-glow_2s_ease-in-out_infinite] rounded-2xl border border-accent bg-accent/10 p-6 text-center shadow-[0_0_40px_oklch(0.8_0.18_180/0.5)]">
                  <p className="text-3xl font-extrabold text-accent drop-shadow-[0_0_18px_oklch(0.8_0.18_180/0.8)]" dir="rtl">
                    خش جيم 🚀
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground" dir="rtl">
                    دخول الآن على {name} بالتوقع اللي فوق
                  </p>
                  <p className="mt-1 font-mono text-xs text-accent">
                    {enterAt != null ? formatEnterTime(enterAt) : ""}
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-4 rounded-full border border-border px-5 py-2 text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:border-primary"
                  >
                    توقع جديد
                  </button>
                </div>
              )}
            </div>

            <p className="relative mt-4 text-center text-[10px] leading-relaxed text-muted-foreground">
              Predictions are statistical suggestions only and never guarantee an outcome.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}


function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/70 p-3 text-center backdrop-blur-md">
      <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-extrabold text-foreground">{value}</p>
    </div>
  );
}

function Board({ prediction, revealed }: { prediction: Prediction; revealed: boolean }) {
  switch (prediction.kind) {
    case "crash":
      return (
        <div>
          <div className="relative overflow-hidden rounded-2xl border border-accent/40 bg-background/40 p-6 text-center">
            <svg
              aria-hidden="true"
              viewBox="0 0 300 100"
              className="absolute inset-x-0 bottom-0 h-20 w-full text-accent/40"
              preserveAspectRatio="none"
            >
              <path d="M0 100 C120 100 200 60 300 0 L300 100 Z" fill="currentColor" opacity="0.15" />
              <path d="M0 100 C120 100 200 60 300 0" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <p className="relative text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Predicted crash
            </p>
            <p className="relative mt-1 font-mono text-5xl font-extrabold text-accent drop-shadow-[0_0_22px_oklch(0.8_0.18_180/0.7)]">
              {prediction.multiplier}
            </p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Stat label="Safe cashout" value={prediction.safeCashout} />
            <Stat label="Round" value={`#${prediction.round}`} />
          </div>
        </div>
      );

    case "dice":
      return (
        <div>
          <div className="rounded-2xl border border-primary/40 bg-background/40 p-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Roll {prediction.direction}
            </p>
            <p className="mt-1 font-mono text-5xl font-extrabold text-primary drop-shadow-[0_0_22px_oklch(0.66_0.26_300/0.7)]">
              {prediction.target}
            </p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Stat label="Direction" value={prediction.direction === "over" ? "Over" : "Under"} />
            <Stat label="Win chance" value={`${prediction.chance}%`} />
          </div>
        </div>
      );

    case "thimbles":
      return (
        <div className="rounded-3xl border border-primary/30 bg-background/40 p-4">
          <div className="grid grid-cols-3 items-end gap-3">
            {[0, 1, 2].map((i) => {
              const hit = revealed && i === prediction.pick;
              return (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`relative w-full rounded-2xl px-2 pt-2 transition-all duration-500 ${
                      hit ? "drop-shadow-[0_0_26px_oklch(0.8_0.18_180/0.7)]" : ""
                    }`}
                  >
                    <img
                      src={cupAsset.url}
                      alt={`Thimble cup ${i + 1}`}
                      width={200}
                      height={200}
                      className={`mx-auto h-auto w-full transition-transform duration-500 ${
                        hit ? "-translate-y-2 scale-105" : "opacity-80"
                      }`}
                    />
                  </div>
                  <div className="mt-1 h-1 w-full rounded-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                  <div className="mt-2 flex h-10 items-center justify-center">
                    {hit ? (
                      <img
                        src={ballAsset.url}
                        alt="Predicted ball position"
                        width={80}
                        height={80}
                        className="h-9 w-9 animate-[pulse-glow_2s_ease-in-out_infinite] drop-shadow-[0_0_18px_oklch(0.8_0.18_180/0.8)]"
                      />
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        #{i + 1}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground" dir="rtl">
            الكوبّاية اللي تحتها الكورة هي المتوقّعة
          </p>
        </div>
      );

    case "mines":
      return (
        <div>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: prediction.total }, (_, i) => {
              const safe = prediction.safe.includes(i);
              return (
                <div
                  key={i}
                  className={`flex aspect-square items-center justify-center rounded-xl border text-lg ${
                    safe
                      ? "border-accent bg-accent/10 shadow-[0_0_22px_oklch(0.8_0.18_180/0.5)]"
                      : "border-border/50 opacity-45"
                  }`}
                >
                  {safe ? "💎" : ""}
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-center text-[11px] text-muted-foreground" dir="rtl">
            الخانات المضيئة هي المتوقّعة آمنة
          </p>
        </div>
      );

    case "goal":
      return (
        <div>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => {
              const hit = i === prediction.pick;
              return (
                <div
                  key={i}
                  className={`flex aspect-[3/4] flex-col items-center justify-center gap-1 rounded-2xl border ${
                    hit
                      ? "border-accent bg-accent/10 shadow-[0_0_30px_oklch(0.8_0.18_180/0.55)]"
                      : "border-border/60 opacity-50"
                  }`}
                >
                  <span className="text-3xl">{hit ? "⚽" : "🥅"}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {["Left", "Center", "Right"][i]}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3">
            <Stat label="Suggested shots" value={String(prediction.corners)} />
          </div>
        </div>
      );

    case "wheel":
      return <Stat label="Predicted segment" value={prediction.segment} />;

    case "swamp":
      return (
        <div className="space-y-2 rounded-2xl border border-primary/40 bg-background/40 p-3">
          {prediction.rows.map((row, r) => (
            <div key={r} className="flex items-center gap-2">
              <span className="w-16 shrink-0 rounded-lg border border-accent/40 py-1 text-center text-[10px] font-bold text-accent">
                {row.multiplier}
              </span>
              <div
                className="grid flex-1 gap-2"
                style={{ gridTemplateColumns: `repeat(${prediction.cols}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: prediction.cols }, (_, c) => {
                  const safe = c === row.safe;
                  return (
                    <div
                      key={c}
                      className={`flex aspect-square items-center justify-center rounded-xl border text-lg ${
                        safe
                          ? "border-accent bg-accent/10 shadow-[0_0_22px_oklch(0.8_0.18_180/0.5)]"
                          : "border-border/50 opacity-45"
                      }`}
                    >
                      {safe ? "🐸" : "🍃"}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <p className="pt-1 text-center text-[11px] text-muted-foreground" dir="rtl">
            الورقة المضيئة في كل صف هي الطريق الآمن
          </p>
        </div>
      );

    case "gems":
      return (
        <div>
          <div
            className="grid gap-1 rounded-2xl border border-primary/40 bg-background/40 p-2"
            style={{ gridTemplateColumns: `repeat(${prediction.cols}, minmax(0, 1fr))` }}
          >
            {prediction.grid.map((sym, i) => {
              const hit = prediction.cluster.includes(i);
              return (
                <div
                  key={i}
                  className={`flex aspect-square items-center justify-center rounded-lg border text-sm ${
                    hit
                      ? "border-accent bg-accent/10 shadow-[0_0_18px_oklch(0.8_0.18_180/0.5)]"
                      : "border-border/40 opacity-40"
                  }`}
                >
                  {sym}
                </div>
              );
            })}
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3">
            <Stat label="Predicted cluster" value={`${prediction.cluster.length} gems`} />
          </div>
        </div>
      );

    case "none":
      return null;

    case "cashout":
      return (
        <div className="space-y-3">
          {prediction.steps.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 rounded-2xl border border-accent/50 bg-accent/10 px-4 py-3 shadow-[0_0_26px_oklch(0.8_0.18_180/0.35)]"
              dir="rtl"
            >
              <span className="text-sm font-extrabold text-accent">اسحب الآن</span>
              <span className="font-mono text-xs text-muted-foreground">الخطوة {s.step}</span>
              <span className="font-mono text-lg font-extrabold text-foreground">{s.multiplier}</span>
            </div>
          ))}
          <p className="text-center text-[11px] text-muted-foreground" dir="rtl">
            اسحب عند المضاعفات اللي فوق — التوقيت عشوائي كل جيم
          </p>
        </div>
      );

    case "eastern":
      return (
        <div className="space-y-1.5 rounded-2xl border border-primary/40 bg-background/40 p-3">
          {prediction.rows.map((row, r) => (
            <div key={r} className="flex items-center gap-2">
              <span className="w-16 shrink-0 rounded-lg border border-accent/40 py-1 text-center text-[10px] font-bold text-accent">
                {row.multiplier}
              </span>
              <div
                className="grid flex-1 gap-1.5"
                style={{ gridTemplateColumns: `repeat(${prediction.cols}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: prediction.cols }, (_, c) => {
                  const safe = c === row.safe;
                  return (
                    <div
                      key={c}
                      className={`flex aspect-square items-center justify-center rounded-lg border text-xs ${
                        safe
                          ? "border-accent bg-accent/10 shadow-[0_0_18px_oklch(0.8_0.18_180/0.5)]"
                          : "border-border/50 opacity-40"
                      }`}
                    >
                      {safe ? "✦" : ""}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <p className="pt-1 text-center text-[11px] text-muted-foreground" dir="rtl">
            ١٠ صفوف — الخانة المضيئة في كل صف هي المتوقّعة
          </p>
        </div>
      );

    default:
      return (
        <div>
          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-primary/40 bg-background/40 p-3">
            {prediction.reels.map((reel, c) => (
              <div key={c} className="grid gap-2">
                {reel.map((sym, r) => (
                  <div
                    key={r}
                    className={`flex aspect-square items-center justify-center rounded-xl border text-2xl ${
                      r === prediction.payline - 1
                        ? "border-accent bg-accent/10 shadow-[0_0_22px_oklch(0.8_0.18_180/0.45)]"
                        : "border-border/50 opacity-60"
                    }`}
                  >
                    {sym}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Stat label="Spins" value={String(prediction.spins)} />
            <Stat label="Payline" value={`#${prediction.payline}`} />
          </div>
        </div>
      );
  }
}
