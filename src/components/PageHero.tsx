import type { CSSProperties } from "react";

import { SiteHeader } from "@/components/SiteHeader";
import s1i1 from "@/assets/hero/slide-1-image-1.png";
import s2i2 from "@/assets/hero/slide-2-image-2.png";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  text?: string;
};

const floats = [
  {
    src: s1i1,
    alt: "",
    className: "left-[3%] top-[18%] w-[13%] max-w-[170px]",
    from: { x: "-90px", y: "40px", rot: "16deg" },
    delay: 200,
  },
  {
    src: s2i2,
    alt: "",
    className: "right-[4%] bottom-[8%] w-[14%] max-w-[190px]",
    from: { x: "90px", y: "50px", rot: "-16deg" },
    delay: 380,
  },
];

export function PageHero({ eyebrow, title, text }: PageHeroProps) {
  return (
    <header className="relative w-full overflow-hidden bg-hero-bg text-hero-ink">
      <SiteHeader />

      <div className="relative mx-auto max-w-[1400px] px-6 pt-14 pb-24 text-center sm:px-10 sm:pt-20 sm:pb-32">
        {floats.map((float, i) => (
          <img
            key={i}
            src={float.src}
            alt={float.alt}
            aria-hidden="true"
            className={`hero-anim-img pointer-events-none absolute z-0 select-none object-contain opacity-90 ${float.className}`}
            style={
              {
                "--from-x": float.from.x,
                "--from-y": float.from.y,
                "--from-rot": float.from.rot,
                animationDelay: `${float.delay}ms`,
              } as CSSProperties
            }
          />
        ))}

        <div className="relative z-10">
          <p
            className="hero-anim-text text-[0.7rem] tracking-[0.34em] uppercase text-hero-gold"
            style={{ animationDelay: "80ms" }}
          >
            {eyebrow}
          </p>
          <h1 className="hero-anim-title mx-auto mt-6 max-w-[16em] font-display text-5xl leading-[1.03] font-normal text-hero-ink sm:text-7xl">
            {title}
          </h1>
          {text ? (
            <p
              className="hero-anim-text mx-auto mt-8 max-w-xl font-display text-base leading-relaxed text-hero-ink/60 sm:text-lg"
              style={{ animationDelay: "380ms" }}
            >
              {text}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
