import { useEffect, useRef, useState, type CSSProperties } from "react";

import { SiteHeader } from "@/components/SiteHeader";

type AtelierHeroProps = {
  eyebrow: string;
  titleLines: { text: string; italic?: boolean }[];
  text: string;
  image: string;
  imageAlt: string;
  note?: string;
  marquee?: string[];
  accent?: "rose" | "sage" | "gold";
};

export function AtelierHero({
  eyebrow,
  titleLines,
  text,
  image,
  imageAlt,
  note,
  marquee = [],
  accent = "rose",
}: AtelierHeroProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.setProperty("--px", String(x));
      node.style.setProperty("--py", String(y));
    };
    const onLeave = () => {
      node.style.setProperty("--px", "0");
      node.style.setProperty("--py", "0");
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  let wordIndex = 0;

  return (
    <header className="atelier-hero relative w-full overflow-hidden bg-atelier-paper text-atelier-ink">
      <div className={`atelier-hero-veil atelier-hero-veil-${accent}`} aria-hidden="true" />
      <SiteHeader variant="atelier" />

      <div
        ref={stageRef}
        className={`atelier-hero-stage relative mx-auto grid max-w-[1400px] items-center gap-12 px-6 pt-10 pb-16 sm:px-10 sm:pt-16 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 ${
          mounted ? "is-in" : ""
        }`}
      >
        <div className="relative z-10 atelier-hero-parallax-soft">
          <p className="atelier-kicker atelier-hero-eyebrow text-atelier-gold">
            <span className="atelier-hero-rule" aria-hidden="true" />
            {eyebrow}
          </p>

          <h1 className="atelier-hero-title mt-6 font-editorial text-[3.4rem] leading-[0.9] sm:text-8xl">
            {titleLines.map((line) => (
              <span key={line.text} className="block overflow-hidden">
                {line.text.split(" ").map((word) => {
                  const delay = 120 + wordIndex * 90;
                  wordIndex += 1;
                  return (
                    <span
                      key={`${line.text}-${word}-${wordIndex}`}
                      className="atelier-hero-word"
                      style={{ animationDelay: `${delay}ms` } as CSSProperties}
                    >
                      {line.italic ? <em>{word}</em> : word}
                      {"\u00A0"}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <p
            className="atelier-hero-fade mt-8 max-w-lg font-body text-base leading-relaxed text-atelier-ink/65 sm:text-lg"
            style={{ animationDelay: "620ms" }}
          >
            {text}
          </p>
        </div>

        <div className="atelier-hero-media relative z-10">
          <span className="atelier-hero-ring" aria-hidden="true" />
          <span className="atelier-hero-square" aria-hidden="true" />
          <div className="atelier-hero-frame">
            <img
              src={image}
              alt={imageAlt}
              width={1200}
              height={1504}
              className="atelier-hero-img h-[22rem] w-full object-cover sm:h-[34rem] lg:h-[38rem]"
            />
            <span className="atelier-hero-sheen" aria-hidden="true" />
          </div>
          {note ? <span className="atelier-hero-note">{note}</span> : null}
        </div>
      </div>

      {marquee.length > 0 ? (
        <div className="atelier-marquee" aria-hidden="true">
          <div className="atelier-marquee-track">
            {[0, 1].map((pass) => (
              <div key={pass} className="atelier-marquee-group">
                {marquee.map((word) => (
                  <span key={`${pass}-${word}`} className="atelier-marquee-item">
                    {word}
                    <i className="atelier-marquee-dot" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
