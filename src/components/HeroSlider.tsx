import { useCallback, useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { shop } from "@/lib/shop";

import s1i1 from "@/assets/hero/slide-1-image-1.png";
import s1i2 from "@/assets/hero/slide-1-image-2.png";
import s1i3 from "@/assets/hero/slide-1-image-3.png";
import s2i1 from "@/assets/hero/slide-2-image-1.png";
import s2i2 from "@/assets/hero/slide-2-image-2.png";
import s2i3 from "@/assets/hero/slide-2-image-3.png";
import s3i1 from "@/assets/hero/slide-3-image-1.png";
import s3i2 from "@/assets/hero/slide-3-image-2.png";

type HeroImage = {
  src: string;
  alt: string;
  /** Size for the phone layout, where the images sit in a row above the headline. */
  mobileClassName: string;
  /** Absolute placement from `sm` up, where they scatter around the headline. */
  className: string;
  from: { x: string; y: string; rot: string };
  delay: number;
  floatRot: string;
  floatDelay: number;
};

type Slide = {
  id: string;
  lines: string[];
  titleClass: string;
  text?: string;
  images: HeroImage[];
};

const slides: Slide[] = [
  {
    id: "baked-with-love",
    lines: ["Baked with love"],
    titleClass: "text-[13vw] leading-[0.95] sm:text-[11vw] lg:text-[8.5rem]",
    text: "Cakes, brownies and cupcakes made fresh through the day at our counter on Saki Vihar Road, Chandivali.",
    images: [
      {
        src: s1i2,
        alt: "Pink macaron",
        mobileClassName: "w-16",
        className: "sm:left-[44%] sm:top-[16%] sm:w-[22%] sm:max-w-[260px]",
        from: { x: "0px", y: "-90px", rot: "-14deg" },
        delay: 120,
        floatRot: "4deg",
        floatDelay: 0,
      },
      {
        src: s1i1,
        alt: "Single pink macaron shell",
        mobileClassName: "w-12",
        className: "sm:left-[9%] sm:bottom-[22%] sm:w-[16%] sm:max-w-[210px]",
        from: { x: "-100px", y: "60px", rot: "18deg" },
        delay: 320,
        floatRot: "-4deg",
        floatDelay: 900,
      },
      {
        src: s1i3,
        alt: "Stacked raspberry macarons",
        mobileClassName: "w-12",
        className: "sm:right-[9%] sm:bottom-[16%] sm:w-[16%] sm:max-w-[220px]",
        from: { x: "110px", y: "70px", rot: "-16deg" },
        delay: 480,
        floatRot: "5deg",
        floatDelay: 1600,
      },
    ],
  },
  {
    id: "celebrate-well",
    lines: ["Celebrate well,", "Share often,", "Savour every bite"],
    titleClass: "text-[9vw] leading-[1.06] sm:text-[7.5vw] lg:text-[5.75rem]",
    text: `Rated ${shop.rating} by our neighbours in ${shop.address.locality} — come and taste why.`,
    images: [
      {
        src: s2i1,
        alt: "Chocolate cake slice",
        mobileClassName: "w-14",
        className: "sm:left-[6%] sm:top-[14%] sm:w-[20%] sm:max-w-[250px]",
        from: { x: "-120px", y: "-50px", rot: "16deg" },
        delay: 120,
        floatRot: "-5deg",
        floatDelay: 300,
      },
      {
        src: s2i2,
        alt: "Frosted cupcake",
        mobileClassName: "w-16",
        className: "sm:right-[7%] sm:top-[10%] sm:w-[22%] sm:max-w-[260px]",
        from: { x: "120px", y: "-70px", rot: "-18deg" },
        delay: 300,
        floatRot: "4deg",
        floatDelay: 1100,
      },
      {
        src: s2i3,
        alt: "Berry dessert",
        mobileClassName: "w-14",
        className: "sm:left-[16%] sm:bottom-[6%] sm:w-[18%] sm:max-w-[230px]",
        from: { x: "-60px", y: "90px", rot: "14deg" },
        delay: 440,
        floatRot: "6deg",
        floatDelay: 1800,
      },
      {
        src: s1i1,
        alt: "Pink macaron",
        mobileClassName: "w-12",
        className: "sm:right-[16%] sm:bottom-[4%] sm:w-[15%] sm:max-w-[200px]",
        from: { x: "80px", y: "90px", rot: "-14deg" },
        delay: 580,
        floatRot: "-6deg",
        floatDelay: 2400,
      },
    ],
  },
  {
    id: "a-bite-of-joy",
    lines: ["A Bite of Joy"],
    titleClass: "text-[13vw] leading-[0.95] sm:text-[11vw] lg:text-[9rem]",
    text: "From one brownie to a two-tier birthday cake — tell us the occasion and we will make it for you.",
    images: [
      {
        src: s3i1,
        alt: "Layered cream cake",
        mobileClassName: "w-20",
        className: "sm:left-[5%] sm:bottom-[8%] sm:w-[26%] sm:max-w-[330px]",
        from: { x: "-130px", y: "60px", rot: "12deg" },
        delay: 160,
        floatRot: "-3deg",
        floatDelay: 500,
      },
      {
        src: s3i2,
        alt: "Chocolate dessert",
        mobileClassName: "w-16",
        className: "sm:right-[6%] sm:top-[16%] sm:w-[22%] sm:max-w-[280px]",
        from: { x: "130px", y: "-60px", rot: "-15deg" },
        delay: 360,
        floatRot: "5deg",
        floatDelay: 1400,
      },
    ],
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  const go = useCallback((next: number) => {
    setIndex((current) => (next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => go(index + 1), 7000);
    return () => window.clearInterval(timer);
  }, [index, go]);

  const slide = slides[index]!;

  return (
    <header className="relative w-full overflow-hidden bg-hero-bg text-hero-ink">
      <SiteHeader />

      {/* Slide stage. On phones the images are ordinary flex items in a row
          above the headline, so nothing can overlap the type; from `sm` up they
          become absolutely placed and scatter around it. */}
      <div className="relative mx-auto flex min-h-[58vh] max-w-[1400px] flex-wrap items-center justify-center gap-x-3 px-6 pt-2 pb-28 sm:min-h-[72vh] sm:flex-nowrap sm:gap-0 sm:px-10 sm:pt-0 sm:pb-20">
        {slide.images.map((image, i) => (
          <img
            key={`${slide.id}-${i}`}
            src={image.src}
            alt={image.alt}
            loading={index === 0 ? "eager" : "lazy"}
            className={`hero-anim-img pointer-events-none z-0 shrink-0 select-none object-contain sm:absolute ${image.mobileClassName} ${image.className}`}
            style={
              {
                "--from-x": image.from.x,
                "--from-y": image.from.y,
                "--from-rot": image.from.rot,
                animationDelay: `${image.delay}ms`,
              } as React.CSSProperties
            }
          />
        ))}

        <div className="relative z-10 mt-6 w-full text-center sm:mt-0">
          <h1
            key={`${slide.id}-title`}
            className={`hero-anim-title font-display font-normal text-balance text-hero-ink ${slide.titleClass}`}
          >
            {slide.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          {slide.text ? (
            <p
              key={`${slide.id}-text`}
              className="hero-anim-text mx-auto mt-6 max-w-md font-display text-[0.95rem] leading-relaxed text-hero-ink/70 sm:mt-8 sm:ml-auto sm:mr-[6%] sm:text-right sm:text-lg"
              style={{ animationDelay: "420ms" }}
            >
              {slide.text}
            </p>
          ) : null}
        </div>

        {/* Side arrows, from `sm` up. On a phone they would sit on top of the
            headline, so the controls move into the row below instead. */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(index - 1)}
          className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 p-3 text-4xl text-hero-ink/25 transition-colors hover:text-hero-ink sm:block"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(index + 1)}
          className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 p-3 text-4xl text-hero-ink/25 transition-colors hover:text-hero-ink sm:block"
        >
          ›
        </button>

        {/* Dots, flanked by arrows on phones */}
        <div className="absolute bottom-9 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 sm:bottom-8">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
            className="-my-2 px-2 py-2 text-3xl leading-none text-hero-ink/35 transition-colors hover:text-hero-ink sm:hidden"
          >
            ‹
          </button>
          {slides.map((dot, i) => (
            <button
              key={dot.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === index ? "bg-hero-ink/60" : "bg-hero-ink/20 hover:bg-hero-ink/40"
              }`}
            />
          ))}
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(index + 1)}
            className="-my-2 px-2 py-2 text-3xl leading-none text-hero-ink/35 transition-colors hover:text-hero-ink sm:hidden"
          >
            ›
          </button>
        </div>
      </div>
    </header>
  );
}
