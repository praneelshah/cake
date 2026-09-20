import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock3 } from "lucide-react";

import { AtelierHero } from "@/components/AtelierHero";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import shopPastryCase from "@/assets/shop/shop-pastry-case.jpg";
import { menuCategories, menuItems } from "@/lib/menu-data";
import { shop } from "@/lib/shop";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: `The Menu — ${shop.name}, Sakinaka` },
      {
        name: "description",
        content: `Cakes, slices, brownies and cupcakes from ${shop.name} on Saki Vihar Road, Sakinaka. Custom celebration cakes made to order.`,
      },
      { property: "og:title", content: `The Menu — ${shop.name}` },
      {
        property: "og:description",
        content: `Cakes, slices and bakes from the ${shop.name} counter in ${shop.address.locality}.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof menuCategories)[number]>("All");
  const visibleItems = useMemo(
    () =>
      activeCategory === "All"
        ? menuItems
        : menuItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="atelier-page min-h-screen bg-atelier-paper text-atelier-ink">
      <AtelierHero
        eyebrow={`From the counter / opens ${shop.opensAt}`}
        titleLines={[{ text: "What we" }, { text: "bake today.", italic: true }]}
        text="Whole cakes, thick slices and everyday bakes, made in fresh batches through the day and set out while they are still at their best."
        image={shopPastryCase}
        imageAlt="The chilled pastry case at Amourea, filled for the day"
        note={"No. 01\nthe first bite"}
        accent="rose"
        marquee={[
          "Death by Choco",
          "Ferrero Rocher",
          "Red Velvet",
          "Lotus Biscoff",
          "Dutch Truffle",
          "Black Forest",
          "Tres Leches",
          "Brownies",
        ]}
      />

      <main>
        <section
          className="border-y border-atelier-ink/10 px-6 py-14 sm:px-10 sm:py-20"
          aria-label="Cake shop menu"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-3" aria-label="Filter menu by category">
                {menuCategories.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                    variant={activeCategory === category ? "default" : "ghost"}
                    className={`rounded-none px-4 py-2 text-[0.7rem] tracking-[0.22em] uppercase transition-colors ${
                      activeCategory === category
                        ? "bg-atelier-ink text-atelier-paper hover:bg-atelier-ink/90"
                        : "text-atelier-ink/50 hover:bg-atelier-rose/40 hover:text-atelier-ink"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <p className="flex items-center gap-2 text-[0.7rem] tracking-[0.24em] uppercase text-atelier-ink/45">
                <Clock3 className="size-4" />
                {visibleItems.length} on the counter
              </p>
            </div>

            <div className="mt-16 grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-12">
              {visibleItems.map((item, i) => (
                <Reveal
                  key={item.name}
                  as="article"
                  variant="rise"
                  delay={(i % 3) * 120}
                  className={`group lg:col-span-4 ${i % 3 === 1 ? "lg:mt-14" : ""}`}
                >
                  <div className="atelier-product-frame atelier-depth">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        width={960}
                        height={960}
                        loading="lazy"
                        className="h-[30rem] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      // A few items have no photo on the listing; a typographic
                      // card is honest, where borrowing another cake's photo
                      // would not be.
                      <div className="flex h-[30rem] w-full items-center justify-center bg-atelier-rose/60 px-8">
                        <p className="text-center font-editorial text-4xl italic text-atelier-ink/70">
                          {item.name}
                        </p>
                      </div>
                    )}
                    <span className="atelier-product-index">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="mt-6 flex items-baseline justify-between gap-4">
                    <p className="atelier-kicker flex items-center gap-2 text-atelier-gold">
                      <VegMark veg={item.veg} />
                      {item.group}
                    </p>
                    {item.price ? (
                      <p className="font-editorial text-xl italic text-atelier-gold">
                        {item.price}
                      </p>
                    ) : null}
                  </div>
                  <h2 className="mt-2 font-editorial text-3xl leading-none text-atelier-ink">
                    {item.name}
                  </h2>
                  <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-atelier-ink/60">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>

            <p className="mt-20 max-w-2xl font-body text-xs leading-relaxed text-atelier-ink/45">
              Counter prices, GST extra. Ordering through Swiggy or Zomato costs more — their
              listing carries its own rates. Whole cakes are made to order, so give us a day&apos;s
              notice where you can, and call to confirm before you plan around a price.
            </p>
          </div>
        </section>

        <section className="bg-atelier-ink px-6 py-24 text-atelier-paper sm:px-10 sm:py-32">
          <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Reveal as="p" className="atelier-kicker text-atelier-gold">
                Something special?
              </Reveal>
              <Reveal
                as="h2"
                variant="rise"
                delay={120}
                className="mt-6 max-w-xl font-editorial text-5xl leading-[0.95] sm:text-7xl"
              >
                We love a thoughtful celebration cake.
              </Reveal>
              <Reveal
                as="p"
                variant="blur"
                delay={200}
                className="mt-6 max-w-lg font-body text-sm leading-loose text-atelier-paper/60"
              >
                Tell us what you&apos;re celebrating and we&apos;ll point you toward the right
                flavour, finish and number of slices.
              </Reveal>
            </div>
            <Reveal delay={280} className="flex flex-wrap gap-4">
              {shop.orderUrl ? (
                <Button
                  asChild
                  className="rounded-none bg-atelier-paper px-7 py-6 font-body text-[0.7rem] tracking-[0.28em] uppercase text-atelier-ink hover:bg-atelier-gold hover:text-atelier-paper"
                >
                  <a href={shop.orderUrl} target="_blank" rel="noreferrer noopener">
                    Order online <ArrowUpRight />
                  </a>
                </Button>
              ) : null}
              <Button
                asChild
                variant="outline"
                className="rounded-none border-atelier-paper/40 bg-transparent px-7 py-6 font-body text-[0.7rem] tracking-[0.28em] uppercase text-atelier-paper hover:bg-atelier-paper hover:text-atelier-ink"
              >
                <Link to="/contact">
                  Ask about a cake <ArrowUpRight />
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

/** The green/brown square every Indian menu carries. */
function VegMark({ veg }: { veg: boolean }) {
  const label = veg ? "Vegetarian" : "Contains egg or non-vegetarian";
  return (
    <span
      title={label}
      className={`inline-flex size-3 shrink-0 items-center justify-center border ${
        veg ? "border-green-700" : "border-red-800"
      }`}
    >
      <span className="sr-only">{label}</span>
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${veg ? "bg-green-700" : "bg-red-800"}`}
      />
    </span>
  );
}
