import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import heroAbout from "@/assets/hero-about.jpg";
import aboutCake from "@/assets/about-cake.jpg";
import { AtelierHero } from "@/components/AtelierHero";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { shop } from "@/lib/shop";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `Our Story — ${shop.name}, Chandivali` },
      {
        name: "description",
        content: `Step inside ${shop.name}, a dedicated cake shop on Saki Vihar Road in Chandivali, Mumbai, built around patient work, honest ingredients and cake made to order.`,
      },
      { property: "og:title", content: `Our Story — ${shop.name}` },
      {
        property: "og:description",
        content: `A dedicated cake shop in ${shop.address.locality}, built around patient work and honest ingredients.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const principles = [
  [
    "01 / Ingredients",
    "Real butter, good chocolate, fresh cream and fruit bought close by. Nothing hidden behind a long list.",
  ],
  [
    "02 / Rhythm",
    "The kitchen starts early, the shutter goes up at ten and the counter is restocked through the day.",
  ],
  [
    "03 / Neighbours",
    "We bake for the flats, offices and gyms around Chandivali — most of what leaves the counter is walking home.",
  ],
  [
    "04 / Occasion",
    "A single brownie or a two-tier birthday cake, every order gets the same patient attention.",
  ],
];

function AboutPage() {
  return (
    <div className="atelier-page min-h-screen bg-atelier-paper text-atelier-ink">
      <AtelierHero
        eyebrow={`The kitchen / ${shop.address.locality}`}
        titleLines={[
          { text: "A cake shop made" },
          { text: "for the neighbourhood.", italic: true },
        ]}
        text={`${shop.name} is a full cake kitchen on Saki Vihar Road. We bake in fresh batches through the day, take orders for the occasions that matter, and believe the best part of a cake is the quiet second after the first bite.`}
        image={heroAbout}
        imageAlt="Baker working dough on a flour-dusted counter in warm morning light"
        note={"A morning\nin the kitchen"}
        accent="gold"
        marquee={[
          "Real butter",
          "Fresh cream",
          "Made to order",
          "Fresh batches",
          `Opens ${shop.opensAt}`,
          shop.address.locality,
        ]}
      />
      <main>
        <section className="border-y border-atelier-ink/10 bg-atelier-rose/25 px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.75fr_1.25fr]">
            <Reveal>
              <h2 className="max-w-sm font-editorial text-5xl leading-[0.9] sm:text-7xl">
                Keep it simple.
                <br />
                <em>Make it memorable.</em>
              </h2>
            </Reveal>
            <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
              {principles.map(([label, body], index) => (
                <Reveal
                  key={label}
                  variant="rise"
                  delay={index * 100}
                  className="border-t border-atelier-ink/20 pt-5"
                >
                  <p className="atelier-kicker text-atelier-gold">{label}</p>
                  <p className="mt-4 font-body text-sm leading-relaxed text-atelier-ink/65">
                    {body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-10 sm:py-32">
          <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal
              variant="zoom"
              className="atelier-photo-frame atelier-photo-frame-small atelier-depth"
            >
              <img
                src={aboutCake}
                alt="Slice of layered chocolate cake on a plate with a cocoa truffle"
                width={1200}
                height={912}
                loading="lazy"
                className="h-[24rem] w-full object-cover sm:h-[34rem]"
              />
            </Reveal>
            <Reveal variant="right" className="lg:pl-10">
              <p className="atelier-kicker">The {shop.short} way</p>
              <h2 className="mt-5 font-editorial text-5xl leading-[0.92] sm:text-7xl">
                Every layer has a reason.
              </h2>
              <p className="mt-7 max-w-md font-body text-base leading-relaxed text-atelier-ink/65">
                We keep recipes short and the ingredients honest. The work is in the details: the
                temperature of the butter, how long a sponge is left to cool, the exact second a
                ganache turns glossy.
              </p>
              <Button
                asChild
                variant="link"
                className="mt-8 h-auto rounded-none p-0 font-body text-xs tracking-[0.2em] uppercase text-atelier-ink hover:text-atelier-gold"
              >
                <Link to="/menu">
                  See what is on the counter <ArrowUpRight />
                </Link>
              </Button>
            </Reveal>
          </div>
        </section>

        <section className="bg-atelier-sage px-6 py-20 text-atelier-ink sm:px-10 sm:py-28">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="atelier-kicker">Come say hello</p>
              <h2 className="mt-5 max-w-2xl font-editorial text-5xl leading-[0.9] sm:text-7xl">
                The best stories start around a table.
              </h2>
              <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-atelier-ink/65">
                {shop.address.short} — {shop.address.landmark.toLowerCase()}. {shop.hoursLine}.
              </p>
            </div>
            <Button
              asChild
              className="w-fit rounded-none bg-atelier-ink px-7 py-6 font-body text-xs tracking-[0.2em] uppercase text-atelier-paper hover:bg-atelier-gold"
            >
              <Link to="/contact">
                Plan your visit <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter variant="atelier" />
    </div>
  );
}
