import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ImagePlus, Mail, MessageCircle, Phone, Send, Trash2 } from "lucide-react";

import customBigBoss from "@/assets/shop/custom-bigboss.jpg";
import customBrief from "@/assets/shop/custom-brief.jpg";
import customCabinet from "@/assets/shop/custom-cabinet.jpg";
import customFarhan from "@/assets/shop/custom-farhan.jpg";
import customQueen from "@/assets/shop/custom-queen.jpg";
import { AtelierHero } from "@/components/AtelierHero";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { shop, telHref } from "@/lib/shop";

export const Route = createFileRoute("/custom")({
  head: () => ({
    meta: [
      { title: `Personalised Cakes — ${shop.name}, Sakinaka` },
      {
        name: "description",
        content: `Order a custom cake from ${shop.name} on Saki Vihar Road, Sakinaka. Photo cakes, tiered birthdays and 3D designer cakes — send your brief and a reference picture.`,
      },
      { property: "og:title", content: `Personalised Cakes — ${shop.name}` },
      {
        property: "og:description",
        content: `Photo cakes, tiered birthdays and 3D designer cakes, made to your brief at ${shop.name}.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CustomCakePage,
});

const steps = [
  [
    "01 / Tell us",
    "Your name, a number we can reach you on, the date you need it and what you have in mind. A reference picture helps more than anything.",
  ],
  [
    "02 / We price it",
    "We come back with a flavour, a size in kilos and a price. Photo toppers, tiers and 3D work all change the number, so we would rather say it upfront.",
  ],
  [
    "03 / We bake it",
    "Confirmed orders need at least 24 hours, and longer for tiered or sculpted cakes. Collect from the shop, or send it on delivery.",
  ],
];

/** Cakes the shop has actually built, not stock photography. */
const madeHere = [
  {
    image: customBigBoss,
    title: "Two tiers, one inside joke",
    body: "A photo topper, a signpost of nicknames, an employer's logo and a scatter of notes and coins. Everything on it was asked for by name.",
    alt: "Two-tier black and gold birthday cake with a photo panel, signpost topper and money detailing",
  },
  {
    image: customFarhan,
    title: "Black and gold, named in fondant",
    body: "A two-tier fondant cake finished with gold nuggets, printed notes and the name spelled out on the board.",
    alt: "Two-tier black fondant cake with gold nuggets, printed notes and a name on the board",
  },
  {
    image: customQueen,
    title: "One tier, all statement",
    body: "A split leopard panel, hand-lettered gold and a crown on top. Proof that a single tier can carry a whole theme.",
    alt: "Single-tier black cake with a leopard-print panel, gold lettering and a crown topper",
  },
];

/** No backend, so the form composes an email to the shop rather than posting one. */
function CustomCakePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [size, setSize] = useState("");
  const [brief, setBrief] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [handedOff, setHandedOff] = useState<"shared" | "email" | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // Object URLs have to be released or the blob stays in memory.
  useEffect(() => {
    if (!photo) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(photo);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  const subject = `Personalised cake enquiry${name ? ` — ${name}` : ""}`;
  const message = [
    `Hello ${shop.short}, I would like to order a personalised cake.`,
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    date ? `Needed on: ${date}` : null,
    size ? `Size: ${size}` : null,
    "",
    "What I have in mind:",
    brief,
  ]
    .filter((line) => line !== null)
    .join("\n");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // On a phone the share sheet can carry the reference picture along with
    // the text, so the customer can pick their mail app and the photograph
    // travels with the brief. A mailto: link cannot carry an attachment.
    if (photo && typeof navigator !== "undefined" && navigator.canShare?.({ files: [photo] })) {
      try {
        await navigator.share({ title: subject, text: message, files: [photo] });
        setHandedOff("shared");
        return;
      } catch {
        // Cancelled or unsupported — fall through to the mail link below.
      }
    }

    window.location.href = `mailto:${shop.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(message)}`;
    setHandedOff("email");
  }

  return (
    <div className="atelier-page min-h-screen bg-atelier-paper text-atelier-ink">
      <AtelierHero
        eyebrow="Personalised cakes / made to your brief"
        titleLines={[{ text: "Describe it." }, { text: "We'll build it.", italic: true }]}
        text="Photo cakes, tiered birthdays, 3D designer pieces and the one you saw online and cannot stop thinking about. Send us the picture and we will tell you what it takes."
        image={customCabinet}
        imageAlt="Lit cabinet of custom themed and tiered cakes at Amourea"
        note={"Your cake,\nyour way"}
        accent="gold"
        marquee={[
          "Photo cakes",
          "Tiered birthdays",
          "3D designer cakes",
          "Anniversaries",
          "Weddings & engagements",
          "Corporate orders",
        ]}
      />

      <main>
        {/* How it works */}
        <section className="border-y border-atelier-ink/10 bg-atelier-rose/25 px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <h2 className="max-w-sm font-editorial text-5xl leading-[0.9] sm:text-6xl">
                Three steps,
                <br />
                <em>no surprises.</em>
              </h2>
            </Reveal>
            <div className="grid gap-x-10 gap-y-12 sm:grid-cols-3">
              {steps.map(([label, body], i) => (
                <Reveal
                  key={label}
                  variant="rise"
                  delay={i * 110}
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

        {/* Cakes we have actually built */}
        <section className="px-6 py-16 sm:px-10 sm:py-24" aria-label="Past custom cakes">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Reveal as="p" className="atelier-kicker text-atelier-gold">
                  Made here
                </Reveal>
                <Reveal
                  as="h2"
                  variant="rise"
                  delay={100}
                  className="mt-5 max-w-lg font-editorial text-5xl leading-[0.9] sm:text-6xl"
                >
                  A few we have <em>already built.</em>
                </Reveal>
              </div>
              <Reveal
                as="p"
                delay={180}
                className="max-w-xs font-body text-sm leading-relaxed text-atelier-ink/55"
              >
                Every one of these started as a picture and a paragraph, much like the form below.
              </Reveal>
            </div>

            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-3">
              {madeHere.map((cake, i) => (
                <Reveal
                  key={cake.title}
                  as="article"
                  variant="rise"
                  delay={i * 130}
                  className="group"
                >
                  <div className="atelier-product-frame atelier-depth">
                    <img
                      src={cake.image}
                      alt={cake.alt}
                      width={1200}
                      height={1200}
                      loading="lazy"
                      className="h-[26rem] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[30rem]"
                    />
                    <span className="atelier-product-index">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 font-editorial text-2xl leading-tight text-atelier-ink">
                    {cake.title}
                  </h3>
                  <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-atelier-ink/60">
                    {cake.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* The brief */}
        <section
          className="border-t border-atelier-ink/10 px-6 py-16 sm:px-10 sm:py-24"
          aria-label="Personalised cake enquiry"
        >
          <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <Reveal as="p" className="atelier-kicker text-atelier-gold">
                Send your brief
              </Reveal>
              <Reveal
                as="h2"
                variant="rise"
                delay={100}
                className="mt-5 max-w-md font-editorial text-5xl leading-[0.9] sm:text-6xl"
              >
                What are we making?
              </Reveal>
              <Reveal
                as="p"
                variant="blur"
                delay={180}
                className="mt-6 max-w-sm font-body text-sm leading-relaxed text-atelier-ink/60"
              >
                Fill this in and it reaches us by email, with your details already written out. We
                usually reply the same day.
              </Reveal>

              <Reveal delay={260} className="mt-10 space-y-3 font-body text-sm">
                {shop.email ? (
                  <a
                    href={`mailto:${shop.email}`}
                    className="flex items-center gap-3 text-atelier-ink/70 transition-colors hover:text-atelier-gold"
                  >
                    <Mail className="size-4" /> {shop.email}
                  </a>
                ) : null}
                {shop.phone ? (
                  <a
                    href={telHref}
                    className="flex items-center gap-3 text-atelier-ink/70 transition-colors hover:text-atelier-gold"
                  >
                    <Phone className="size-4" /> {shop.phone}
                  </a>
                ) : null}
                <a
                  href={`https://wa.me/${shop.whatsapp}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-3 text-atelier-ink/70 transition-colors hover:text-atelier-gold"
                >
                  <MessageCircle className="size-4" /> Or message us on WhatsApp
                </a>
              </Reveal>

              {/* Fills the column beside the form on wide screens. Hidden below
                  lg, where the column stacks above the form and an image here
                  would only push the fields further down. */}
              <Reveal
                variant="zoom"
                delay={340}
                className="atelier-photo-frame atelier-depth mt-12 hidden lg:block"
              >
                <img
                  src={customBrief}
                  alt="Chocolate cake finished with a Ferrero and wafer shards, carrying the Amourea crest"
                  width={880}
                  height={1100}
                  loading="lazy"
                  className="h-[26rem] w-full object-cover xl:h-[32rem]"
                />
                <span className="atelier-photo-note">
                  Made to
                  <br />a brief
                </span>
              </Reveal>
            </div>

            <form className="atelier-form atelier-depth" onSubmit={handleSubmit}>
              <div className="grid gap-7 sm:grid-cols-2">
                <label className="atelier-field">
                  Your name
                  <input
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </label>
                <label className="atelier-field">
                  Contact number
                  <input
                    required
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    pattern="[0-9+ ]{10,15}"
                    title="Please enter a phone number we can reach you on"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    autoComplete="tel"
                  />
                </label>
              </div>

              <div className="mt-7 grid gap-7 sm:grid-cols-2">
                <label className="atelier-field">
                  Date you need it
                  <input
                    name="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </label>
                <label className="atelier-field">
                  Size
                  <select name="size" value={size} onChange={(e) => setSize(e.target.value)}>
                    <option value="">Not sure yet</option>
                    <option value="500g">500g</option>
                    <option value="1kg">1kg</option>
                    <option value="1.5kg">1.5kg</option>
                    <option value="2kg">2kg</option>
                    <option value="Tiered / larger">Tiered or larger</option>
                  </select>
                </label>
              </div>

              <label className="atelier-field mt-7">
                Describe the cake
                <textarea
                  required
                  name="brief"
                  rows={5}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Flavour, colours, the message on top, a theme or character, anything written on it…"
                />
              </label>

              {/* Reference picture */}
              <div className="atelier-field mt-7">
                Reference photo
                <input
                  ref={fileRef}
                  name="reference"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                />
                {preview ? (
                  <div className="mt-1 flex items-center gap-4">
                    <img
                      src={preview}
                      alt="Your reference picture"
                      className="size-24 shrink-0 object-cover"
                    />
                    <div className="min-w-0 font-body text-xs normal-case tracking-normal">
                      <p className="truncate text-atelier-ink/70">{photo?.name}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setPhoto(null);
                          if (fileRef.current) fileRef.current.value = "";
                        }}
                        className="mt-2 inline-flex items-center gap-1.5 text-atelier-ink/50 transition-colors hover:text-atelier-gold"
                      >
                        <Trash2 className="size-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="mt-1 flex w-full items-center justify-center gap-3 border border-dashed border-atelier-ink/25 bg-atelier-paper/80 px-6 py-8 font-body text-xs normal-case tracking-normal text-atelier-ink/55 transition-colors hover:border-atelier-gold hover:text-atelier-gold"
                  >
                    <ImagePlus className="size-4" />
                    Add a picture of the cake you have in mind
                  </button>
                )}
              </div>

              <Button
                type="submit"
                className="mt-8 rounded-none bg-atelier-ink px-7 py-6 font-body text-xs tracking-[0.2em] uppercase text-atelier-paper hover:bg-atelier-gold"
              >
                Send <Send />
              </Button>

              {handedOff ? (
                <p
                  role="status"
                  className="mt-6 font-body text-sm leading-relaxed text-atelier-gold"
                >
                  {handedOff === "shared"
                    ? "Your brief and picture were handed to your mail app — press send there and it reaches us."
                    : photo
                      ? `Your mail app is open with the brief addressed to ${shop.email}. Attach the picture you chose before sending — a browser cannot add it for you.`
                      : `Your mail app is open with the brief addressed to ${shop.email}. Press send there and it reaches us.`}
                </p>
              ) : (
                <p className="mt-6 font-body text-xs leading-relaxed text-atelier-ink/45">
                  This opens your mail app with the brief written out and addressed to us. On a
                  phone your picture goes with it; on a computer you will need to attach it before
                  sending.
                </p>
              )}
            </form>
          </div>
        </section>

        {/* Closing */}
        <section className="bg-atelier-ink px-6 py-20 text-atelier-paper sm:px-10 sm:py-28">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Reveal as="p" className="atelier-kicker text-atelier-gold">
                Rather talk it through?
              </Reveal>
              <Reveal
                as="h2"
                variant="rise"
                delay={110}
                className="mt-5 max-w-2xl font-editorial text-5xl leading-[0.9] sm:text-6xl"
              >
                Come in and we&apos;ll sketch it together.
              </Reveal>
              <Reveal
                as="p"
                variant="blur"
                delay={190}
                className="mt-6 max-w-md font-body text-sm leading-relaxed text-atelier-paper/60"
              >
                {shop.address.short} — {shop.address.landmark.toLowerCase()}. {shop.hoursLine}.
              </Reveal>
            </div>
            <Reveal delay={260} className="flex flex-wrap gap-4">
              <Button
                asChild
                className="rounded-none bg-atelier-paper px-7 py-6 font-body text-[0.7rem] tracking-[0.28em] uppercase text-atelier-ink hover:bg-atelier-gold hover:text-atelier-paper"
              >
                <a href={shop.mapsUrl} target="_blank" rel="noreferrer noopener">
                  Get directions <ArrowUpRight />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none border-atelier-paper/40 bg-transparent px-7 py-6 font-body text-[0.7rem] tracking-[0.28em] uppercase text-atelier-paper hover:bg-atelier-paper hover:text-atelier-ink"
              >
                <Link to="/menu">
                  See the menu <ArrowUpRight />
                </Link>
              </Button>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter variant="atelier" />
    </div>
  );
}
