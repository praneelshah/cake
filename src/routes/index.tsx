import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock3, MapPin, Star } from "lucide-react";

import heroContact from "@/assets/hero-contact.jpg";
import heroDessert from "@/assets/hero-dessert.jpg";
import homeCounter from "@/assets/home-counter.jpg";
import homeIngredients from "@/assets/home-ingredients.jpg";
import homeProcessPipe from "@/assets/home-process-pipe.jpg";
import homeProving from "@/assets/home-proving.jpg";
import homeSeasonal from "@/assets/home-seasonal.jpg";
import patisserieMacarons from "@/assets/patisserie-macarons.jpg";
import { HeroSlider } from "@/components/HeroSlider";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import {
  CountUp,
  DrawLine,
  Magnetic,
  Marquee,
  ParallaxImage,
  SplitText,
  TiltCard,
  useInView,
} from "@/components/motion";
import { menuItems } from "@/lib/menu-data";
import { shop } from "@/lib/shop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${shop.name} — Cake shop in Chandivali, Mumbai` },
      {
        name: "description",
        content: `${shop.name} is a cake shop on Saki Vihar Road, Chandivali. Fresh cakes, brownies, cupcakes and custom celebration cakes, ${shop.hoursLine.toLowerCase()}.`,
      },
      { property: "og:title", content: `${shop.name} — Cake shop in Chandivali, Mumbai` },
      {
        property: "og:description",
        content: `Fresh cakes, brownies and custom celebration cakes from ${shop.name}, Saki Vihar Road, Chandivali.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const bandWords = [
  shop.name,
  shop.address.locality,
  "Baked fresh every morning",
  "Custom celebration cakes",
  shop.hoursLine,
  `${shop.rating} on Google`,
];

const pillars = [
  {
    number: "01",
    title: "Baked each morning",
    body: "The ovens go on before the shutter does, so what reaches the counter was made the same day.",
  },
  {
    number: "02",
    title: "Made to your occasion",
    body: "Birthdays, anniversaries, a plain Tuesday — tell us the size, flavour and finish and we build it.",
  },
  {
    number: "03",
    title: "Right around the corner",
    body: `A short walk from Saki Naka on ${shop.address.short} — ${shop.address.landmark.toLowerCase()}.`,
  },
];

const kitchenSteps = [
  {
    label: "Weighed",
    title: "Good things, measured properly",
    body: "Butter, cocoa, flour and vanilla go on the scale before anything goes in a bowl. The recipe never gets rushed.",
    image: homeIngredients,
    alt: "Bowls of butter, cocoa, flour, sugar and vanilla pods laid out on linen",
  },
  {
    label: "Rested",
    title: "Time does half the work",
    body: "Batters settle, sponges cool all the way down and creams are whipped only when they are about to be used.",
    image: homeProving,
    alt: "Dough resting in a floured proving basket in a dim bakery kitchen",
  },
  {
    label: "Finished",
    title: "The last hour is all hands",
    body: "Layers are stacked, the crumb coat goes on and every rosette is piped by hand, one at a time.",
    image: homeProcessPipe,
    alt: "Baker piping pink cream rosettes onto a naked layer cake",
  },
];

function Index() {
  const spotlight = menuItems.slice(0, 3);

  return (
    <div className="min-h-screen bg-hero-bg text-hero-ink">
      <HeroSlider />

      <main>
        <TickerBand />
        <StorySection />
        <PillarsSection />
        <SpotlightSection items={spotlight} />
        <KitchenScroller />
        <SeasonalBand />
        <CelebrationSection />
        <RatingSection />
        <VisitSection />
        <QuoteBand />
        <ClosingBand />
      </main>

      <SiteFooter />
    </div>
  );
}

/* ---------------------------------------------------------------- */

function TickerBand() {
  return (
    <section className="w-full overflow-hidden bg-hero-tint">
      <Marquee items={bandWords} seconds={42} className="text-hero-ink/45" />
    </section>
  );
}

/* ---------------------------------------------------------------- */

function StorySection() {
  return (
    <section className="w-full bg-hero-bg">
      <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal as="p" className="text-[0.7rem] tracking-[0.34em] uppercase text-hero-gold-ink">
              {shop.name} / {shop.address.locality}
            </Reveal>

            <SplitText
              as="h2"
              text="Your cake shop on Saki Vihar Road"
              className="mt-6 max-w-[13em] font-display text-4xl leading-[1.12] text-balance sm:text-5xl lg:text-6xl"
              delay={120}
              italicFrom={4}
            />

            <Reveal
              as="p"
              variant="blur"
              delay={260}
              className="mt-7 max-w-md text-sm leading-loose text-hero-ink/60"
            >
              {shop.name} is a dedicated cake shop in {shop.address.locality}, {shop.address.city}.
              We keep the ingredients honest — real butter, good cocoa, fresh cream — and bake in
              fresh batches through the day, so the first slice tastes like the last one you
              remember.
            </Reveal>

            <Reveal
              as="p"
              variant="blur"
              delay={340}
              className="mt-5 max-w-md text-sm leading-loose text-hero-ink/60"
            >
              Walk in for a slice, or tell us what you are celebrating and we will build the cake
              around it.
            </Reveal>

            <Reveal delay={420}>
              <Link
                to="/about"
                className="mt-10 inline-flex items-center gap-2 text-[0.7rem] tracking-[0.28em] uppercase text-hero-ink wipe-underline"
              >
                Our story <ArrowUpRight className="size-3.5" />
              </Link>
            </Reveal>
          </div>

          <ParallaxImage
            src={homeCounter}
            alt="Warm bakery counter with glass cloches of pastries and shelves of bread behind"
            className="parallax-sheen h-[26rem] sm:h-[34rem]"
            speed={64}
            scale={1.32}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function PillarsSection() {
  return (
    <section className="w-full border-y border-hero-ink/10 bg-hero-bg">
      <div className="mx-auto grid max-w-[1400px] gap-px bg-hero-ink/10 sm:grid-cols-3">
        {pillars.map((pillar, i) => (
          <Reveal
            key={pillar.title}
            as="article"
            variant="rise"
            delay={i * 130}
            className="fill-card group bg-hero-bg px-8 py-16 sm:px-10"
          >
            <p className="font-display text-4xl italic text-hero-gold-ink">{pillar.number}</p>
            <h3 className="mt-6 font-display text-2xl text-hero-ink transition-colors duration-500 group-hover:text-hero-bg">
              {pillar.title}
            </h3>
            <p className="mt-4 text-sm leading-loose text-hero-ink/60 transition-colors duration-500 group-hover:text-hero-bg/70">
              {pillar.body}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function SpotlightSection({ items }: { items: typeof menuItems }) {
  return (
    <section className="w-full bg-hero-bg">
      <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
        <div className="text-center">
          <Reveal as="p" className="text-[0.7rem] tracking-[0.34em] uppercase text-hero-gold-ink">
            From the counter
          </Reveal>
          <SplitText
            as="h2"
            text="What people come back for"
            className="mx-auto mt-6 max-w-[14em] font-display text-4xl leading-[1.12] text-balance sm:text-5xl lg:text-6xl"
            delay={100}
            italicFrom={3}
          />
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={item.name}
              as="article"
              variant="rise"
              delay={i * 150}
              className="group text-center"
            >
              <TiltCard className="relative overflow-hidden">
                <span className="tilt-glare" aria-hidden="true" />
                <img
                  src={item.image}
                  alt={item.name}
                  width={816}
                  height={816}
                  loading="lazy"
                  className="h-72 w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
              </TiltCard>
              <p className="mt-8 text-[0.65rem] tracking-[0.3em] uppercase text-hero-gold-ink">
                {item.tag}
              </p>
              <h3 className="mt-3 font-display text-2xl text-hero-ink">{item.name}</h3>
              <p className="mx-auto mt-4 max-w-xs text-sm leading-loose text-hero-ink/60">
                {item.body}
              </p>
              <p className="mt-5 font-display text-lg italic text-hero-ink/80">{item.price}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220} className="mt-20 text-center">
          <Magnetic>
            <Link
              to="/menu"
              className="fill-button inline-flex border border-hero-ink px-10 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-hero-ink transition-colors duration-500 hover:text-hero-bg"
            >
              See the full menu
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

/**
 * Sticky left column whose copy swaps as each tall image panel on the right
 * takes over the middle of the viewport.
 */
function KitchenScroller() {
  const [active, setActive] = useState(0);
  const panels = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const nodes = panels.current.filter((node): node is HTMLDivElement => node !== null);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = nodes.indexOf(entry.target as HTMLDivElement);
          if (index >= 0) setActive(index);
        }
      },
      { threshold: 0.5, rootMargin: "-15% 0px -15% 0px" },
    );
    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const step = kitchenSteps[active] ?? kitchenSteps[0]!;

  return (
    <section className="w-full border-y border-hero-ink/10 bg-hero-bg">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Sticky copy */}
          <div className="lg:sticky lg:top-24 lg:self-start lg:py-32">
            <div className="py-16 lg:py-0">
              <Reveal
                as="p"
                className="text-[0.7rem] tracking-[0.34em] uppercase text-hero-gold-ink"
              >
                Inside the kitchen
              </Reveal>
              <SplitText
                as="h2"
                text="How a cake gets made here"
                className="mt-6 max-w-[11em] font-display text-4xl leading-[1.12] text-balance sm:text-5xl lg:text-6xl"
                delay={100}
                italicFrom={4}
              />

              {/* Keyed on the active step so it re-mounts and replays the fade. */}
              <div key={active} className="fade-swap mt-10 min-h-[9rem]">
                <p className="font-display text-2xl text-hero-ink">{step.title}</p>
                <p className="mt-4 max-w-sm text-sm leading-loose text-hero-ink/60">{step.body}</p>
              </div>

              <ol className="mt-10 space-y-5">
                {kitchenSteps.map((item, i) => (
                  <li
                    key={item.label}
                    className={`sticky-step flex items-center gap-4 ${i === active ? "is-active" : ""}`}
                  >
                    <span className="w-8 font-display text-sm italic text-hero-gold-ink">
                      0{i + 1}
                    </span>
                    <span className="text-[0.7rem] tracking-[0.26em] uppercase text-hero-ink">
                      {item.label}
                    </span>
                    <span className="sticky-step-bar w-16 flex-1" />
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Scrolling panels */}
          <div className="pb-16 lg:py-32">
            {kitchenSteps.map((item, i) => (
              <div
                key={item.label}
                ref={(node) => {
                  panels.current[i] = node;
                }}
                className={`sticky-panel relative mb-10 overflow-hidden last:mb-0 ${i === active ? "is-active" : ""}`}
              >
                <ParallaxImage
                  src={item.image}
                  alt={item.alt}
                  className="h-[26rem] sm:h-[36rem]"
                  speed={58}
                  scale={1.26}
                  wipe={false}
                />
                <span className="absolute bottom-5 left-5 font-display text-sm tracking-[0.24em] uppercase text-white/85">
                  0{i + 1} — {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function SeasonalBand() {
  return (
    <section className="relative w-full overflow-hidden bg-hero-topbar text-hero-topbar-foreground">
      <ParallaxImage
        src={homeSeasonal}
        alt="Fig and honey tart on a ceramic plate in raking afternoon light"
        className="h-[34rem] opacity-55 sm:h-[42rem]"
        speed={110}
        scale={1.42}
        wipe={false}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center">
        <div>
          <SplitText
            as="p"
            text="Made this morning"
            className="font-display text-[13vw] leading-[1.04] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] sm:text-[9vw]"
            stagger={90}
          />
          <Reveal
            as="p"
            variant="blur"
            delay={420}
            className="mx-auto mt-6 max-w-md text-[0.72rem] leading-loose tracking-[0.28em] uppercase text-white/75"
          >
            Not yesterday, not from a freezer
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function CelebrationSection() {
  return (
    <section className="w-full bg-hero-bg">
      <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Collage */}
          <div className="relative grid grid-cols-2 gap-5 sm:gap-7">
            <TiltCard className="relative">
              <span className="tilt-glare" aria-hidden="true" />
              <ParallaxImage
                src={homeProcessPipe}
                alt="Piping pink cream rosettes onto a layered vanilla cake"
                className="h-[18rem] sm:h-[26rem]"
                speed={46}
                scale={1.24}
              />
            </TiltCard>

            <div className="grid gap-5 sm:gap-7">
              <TiltCard className="relative">
                <span className="tilt-glare" aria-hidden="true" />
                <ParallaxImage
                  src={heroDessert}
                  alt="Caramel-topped cupcake with a tall swirl of fresh cream"
                  className="h-[8rem] sm:h-[12rem]"
                  speed={34}
                  scale={1.3}
                />
              </TiltCard>
              <TiltCard className="relative">
                <span className="tilt-glare" aria-hidden="true" />
                <ParallaxImage
                  src={patisserieMacarons}
                  alt="A tray of pastel macarons"
                  className="h-[9rem] sm:h-[13rem]"
                  speed={40}
                  scale={1.3}
                />
              </TiltCard>
            </div>
          </div>

          {/* Copy */}
          <div className="relative lg:pl-6">
            <DrawLine className="absolute -left-6 top-2 hidden h-40 lg:block" />
            <Reveal as="p" className="text-[0.7rem] tracking-[0.34em] uppercase text-hero-gold-ink">
              Celebration cakes
            </Reveal>
            <SplitText
              as="h2"
              text="Tell us what you are celebrating"
              className="mt-6 max-w-[12em] font-display text-4xl leading-[1.12] text-balance sm:text-5xl lg:text-6xl"
              delay={100}
              italicFrom={3}
            />
            <Reveal
              as="p"
              variant="blur"
              delay={240}
              className="mt-7 max-w-md text-sm leading-loose text-hero-ink/60"
            >
              Birthdays, anniversaries, a farewell at the office, or a Sunday that needed cake. Pick
              a flavour, a size and how you want it finished — piped, glazed, or kept plain and
              elegant — and we will make it for the day you need it.
            </Reveal>

            <ul className="mt-10 space-y-4">
              {[
                "Choose your flavour and size",
                "Photo, message or plain finish",
                "Ready for pickup on your date",
              ].map((line, i) => (
                <Reveal
                  key={line}
                  as="li"
                  variant="left"
                  delay={320 + i * 110}
                  className="flex items-baseline gap-4 border-t border-hero-ink/10 pt-4 text-sm text-hero-ink/70"
                >
                  <span className="font-display text-sm italic text-hero-gold-ink">0{i + 1}</span>
                  {line}
                </Reveal>
              ))}
            </ul>

            <Reveal delay={620}>
              <Magnetic>
                <Link
                  to="/contact"
                  className="fill-button mt-10 inline-flex items-center gap-2 border border-hero-ink px-9 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-hero-ink transition-colors duration-500 hover:text-hero-bg"
                >
                  Ask about a cake <ArrowUpRight className="size-3.5" />
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function RatingSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="w-full border-y border-hero-ink/10 bg-hero-bg">
      <div
        ref={ref}
        className={`mx-auto max-w-[1400px] px-6 py-24 text-center sm:px-10 sm:py-28 ${inView ? "is-in" : ""}`}
      >
        <p className="text-[0.7rem] tracking-[0.34em] uppercase text-hero-gold-ink">
          What the neighbourhood says
        </p>

        <div className="mt-8 flex items-center justify-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star
              key={i}
              className="star size-7 fill-hero-gold-ink text-hero-gold-ink sm:size-9"
              style={{ transitionDelay: `${i * 110}ms` }}
            />
          ))}
        </div>

        <p className="mt-8 font-display text-6xl leading-none text-hero-ink sm:text-8xl">
          <CountUp value={5} decimals={1} />
        </p>
        <p className="mt-5 text-sm text-hero-ink/55">
          {shop.rating} out of 5, from {shop.reviewCount} Google reviews of {shop.name}.
        </p>

        <Reveal delay={200}>
          <Magnetic>
            <a
              href={shop.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-flex items-center gap-2 text-[0.7rem] tracking-[0.28em] uppercase text-hero-ink wipe-underline"
            >
              Read them on Google <ArrowUpRight className="size-3.5" />
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function VisitSection() {
  return (
    <section className="w-full bg-hero-bg">
      <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <Reveal as="p" className="text-[0.7rem] tracking-[0.34em] uppercase text-hero-gold-ink">
              Find us
            </Reveal>
            <SplitText
              as="h2"
              text="Come by the shop"
              className="mt-6 font-display text-4xl leading-[1.12] text-balance sm:text-5xl lg:text-6xl"
              delay={100}
              italicFrom={2}
            />

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <Reveal variant="left" delay={200}>
                <p className="flex items-center gap-2 text-[0.65rem] tracking-[0.28em] uppercase text-hero-gold-ink">
                  <MapPin className="size-4" /> Address
                </p>
                <address className="mt-4 space-y-1 text-sm leading-relaxed text-hero-ink/60 not-italic">
                  {shop.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </Reveal>

              <Reveal variant="left" delay={300}>
                <p className="flex items-center gap-2 text-[0.65rem] tracking-[0.28em] uppercase text-hero-gold-ink">
                  <Clock3 className="size-4" /> Hours
                </p>
                <p className="mt-4 text-sm leading-relaxed text-hero-ink/60">
                  {shop.hoursLine}
                  <br />
                  Walk in, or call ahead for a whole cake.
                </p>
              </Reveal>
            </div>

            <Reveal delay={420}>
              <Magnetic>
                <a
                  href={shop.mapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="fill-button mt-10 inline-flex items-center gap-2 border border-hero-ink px-9 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-hero-ink transition-colors duration-500 hover:text-hero-bg"
                >
                  Get directions <ArrowUpRight className="size-3.5" />
                </a>
              </Magnetic>
            </Reveal>
          </div>

          <ParallaxImage
            src={heroContact}
            alt="Corner shopfront with bistro tables and warm afternoon light"
            className="parallax-sheen h-[24rem] sm:h-[32rem]"
            speed={62}
            scale={1.3}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function QuoteBand() {
  return (
    <section className="relative w-full overflow-hidden bg-hero-topbar py-28 text-hero-topbar-foreground">
      <span className="ambient-glow" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <SplitText
          as="p"
          text="A little sweetness, made close to home."
          className="font-display text-3xl leading-[1.4] italic sm:text-5xl"
          stagger={70}
        />
        <Reveal
          as="p"
          delay={320}
          className="mt-8 text-[0.7rem] tracking-[0.34em] uppercase text-hero-gold"
        >
          {shop.name} — {shop.address.locality}, {shop.address.city}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function ClosingBand() {
  return (
    <section className="w-full overflow-hidden border-t border-hero-ink/10 bg-hero-bg py-16 text-hero-ink sm:py-20">
      <Marquee
        items={["Order a cake", shop.short, "Baked today", shop.address.locality]}
        seconds={30}
        className="home-marquee-display text-hero-ink/25"
      />
      <div className="mt-10 text-center">
        <Magnetic>
          <Link
            to="/contact"
            className="fill-button inline-flex items-center gap-2 border border-hero-ink px-10 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-hero-ink transition-colors duration-500 hover:text-hero-bg"
          >
            Place an order <ArrowUpRight className="size-3.5" />
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
