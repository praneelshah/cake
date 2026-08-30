import { useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock3, Instagram, Mail, MapPin, Phone, Send, Star } from "lucide-react";

import heroContact from "@/assets/hero-contact.jpg";
import { AtelierHero } from "@/components/AtelierHero";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { shop, telHref } from "@/lib/shop";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Visit & Contact — ${shop.name}, Chandivali` },
      {
        name: "description",
        content: `Visit ${shop.name} on Saki Vihar Road in Chandivali, Mumbai, or send a note about a celebration cake, bulk order or special request.`,
      },
      { property: "og:title", content: `Visit & Contact — ${shop.name}` },
      {
        property: "og:description",
        content: `Find ${shop.name} on Saki Vihar Road, Chandivali, or send a note about a celebration cake.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="atelier-page min-h-screen bg-atelier-paper text-atelier-ink">
      <AtelierHero
        eyebrow={`Find us / ${shop.address.short}`}
        titleLines={[{ text: "Come for the cake." }, { text: "Stay for a while.", italic: true }]}
        text={`Whether you are planning something special or simply need a good slice, there is a warm welcome waiting in ${shop.address.locality}.`}
        image={heroContact}
        imageAlt="Corner shopfront with bistro tables and warm afternoon light"
        note={"Take one\nfor the road"}
        accent="sage"
        marquee={[
          shop.address.short,
          shop.hoursLine,
          "Celebration cakes",
          "Bulk orders",
          `${shop.rating} on Google`,
          "Say hello",
        ]}
      />
      <main>
        <section className="border-y border-atelier-ink/10 px-6 py-14 sm:px-10 sm:py-20">
          <div className="mx-auto grid max-w-[1400px] gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <Info icon={<MapPin />} label="Address" delay={0}>
              {shop.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </Info>

            <Info icon={<Clock3 />} label="Opening hours" delay={90}>
              {shop.hoursLine}
              <br />
              <span className="opacity-70">Closing time varies — call before a late run.</span>
            </Info>

            {shop.phone ? (
              <Info icon={<Phone />} label="Phone" delay={180}>
                <a href={telHref} className="transition-colors hover:text-atelier-gold">
                  {shop.phone}
                </a>
              </Info>
            ) : (
              <Info icon={<Star />} label="Rated on Google" delay={180}>
                <a
                  href={shop.mapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-atelier-gold"
                >
                  {shop.rating} from {shop.reviewCount} reviews
                </a>
              </Info>
            )}

            {shop.email ? (
              <Info icon={<Mail />} label="Email" delay={270}>
                <a
                  href={`mailto:${shop.email}`}
                  className="transition-colors hover:text-atelier-gold"
                >
                  {shop.email}
                </a>
              </Info>
            ) : shop.instagram && shop.instagramUrl ? (
              <Info icon={<Instagram />} label="Follow along" delay={270}>
                <a
                  href={shop.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-atelier-gold"
                >
                  {shop.instagram}
                </a>
              </Info>
            ) : (
              <Info icon={<MapPin />} label="Getting here" delay={270}>
                <a
                  href={shop.mapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-atelier-gold"
                >
                  Open in Google Maps
                </a>
              </Info>
            )}
          </div>
        </section>

        <section className="bg-atelier-rose/25 px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="atelier-kicker">Send a note</p>
              <h2 className="mt-5 max-w-md font-editorial text-5xl leading-[0.9] sm:text-7xl">
                What can we bake for you?
              </h2>
              <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-atelier-ink/60">
                Flavour, size, the date you need it — tell us as much as you know and we will take
                it from there.
              </p>
            </div>
            <form
              className="atelier-form atelier-depth"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-7 sm:grid-cols-2">
                <label className="atelier-field">
                  Your name
                  <input required name="name" placeholder="Your name" />
                </label>
                <label className="atelier-field">
                  Phone or email
                  <input required name="contact" placeholder="How we reach you" />
                </label>
              </div>
              <label className="atelier-field mt-7">
                What&apos;s the occasion?
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Flavour, size, the date you need it..."
                />
              </label>
              {sent ? (
                <p
                  role="status"
                  className="mt-7 flex items-center gap-2 font-body text-sm text-atelier-gold"
                >
                  <Send className="size-4" /> Thanks for writing — we&apos;ll be in touch soon.
                </p>
              ) : (
                <Button
                  type="submit"
                  className="mt-7 rounded-none bg-atelier-ink px-7 py-6 font-body text-xs tracking-[0.2em] uppercase text-atelier-paper hover:bg-atelier-gold"
                >
                  Send your note <Send />
                </Button>
              )}
            </form>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-10 sm:py-20">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-5 border-t border-atelier-ink/15 pt-7">
            <p className="font-body text-sm text-atelier-ink/60">
              Looking for something sweet right now?
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button
                asChild
                variant="link"
                className="h-auto rounded-none p-0 font-body text-xs tracking-[0.2em] uppercase text-atelier-ink hover:text-atelier-gold"
              >
                <a href={shop.mapsUrl} target="_blank" rel="noreferrer noopener">
                  Get directions <ArrowUpRight />
                </a>
              </Button>
              <Button
                asChild
                variant="link"
                className="h-auto rounded-none p-0 font-body text-xs tracking-[0.2em] uppercase text-atelier-ink hover:text-atelier-gold"
              >
                <Link to="/menu">
                  Browse the menu <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter variant="atelier" />
    </div>
  );
}

function Info({
  icon,
  label,
  children,
  delay = 0,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal variant="rise" delay={delay} className="font-body text-sm text-atelier-ink/65">
      <div className="flex items-center gap-2 text-atelier-gold">
        {icon}
        <span className="atelier-kicker">{label}</span>
      </div>
      <p className="mt-4 leading-relaxed">{children}</p>
    </Reveal>
  );
}
