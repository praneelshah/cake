import { Link } from "@tanstack/react-router";

import { shop, telHref } from "@/lib/shop";

const pages = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "Custom Cakes", to: "/custom" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

type SiteFooterProps = {
  variant?: "hero" | "atelier";
};

export function SiteFooter({ variant = "hero" }: SiteFooterProps) {
  const isAtelier = variant === "atelier";
  const accent = isAtelier ? "text-atelier-gold" : "text-hero-gold";

  return (
    <footer
      className={
        isAtelier
          ? "w-full bg-atelier-ink text-atelier-paper"
          : "w-full bg-hero-topbar text-hero-topbar-foreground"
      }
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 sm:px-10 md:grid-cols-3">
        <div>
          <p
            className={`${isAtelier ? "font-editorial text-5xl" : "font-display text-4xl"} italic`}
          >
            {shop.short}
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed opacity-60">
            {shop.name} — a dedicated cake shop in {shop.address.locality}, {shop.address.city}.
            Fresh cakes, brownies and custom celebration bakes, made to order.
          </p>
          <p className={`${accent} mt-6 text-[0.7rem] tracking-[0.24em] uppercase`}>
            {shop.rating} ★ · {shop.reviewCount} Google reviews
          </p>
        </div>

        <div>
          <p className={`${accent} text-[0.7rem] tracking-[0.28em] uppercase`}>Pages</p>
          <ul className="mt-6 space-y-3 text-sm">
            {pages.map((page) => (
              <li key={page.label}>
                <Link to={page.to} className="link-underline opacity-70 hover:opacity-100">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={`${accent} text-[0.7rem] tracking-[0.28em] uppercase`}>Visit</p>
          <address className="mt-6 space-y-1 text-sm not-italic opacity-70">
            {shop.address.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
          <p className="mt-4 text-sm opacity-70">{shop.hoursLine}</p>
          <div className="mt-4 space-y-2 text-sm">
            <a
              href={shop.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline block opacity-70 hover:opacity-100"
            >
              Get directions
            </a>
            {shop.phone ? (
              <a href={telHref} className="link-underline block opacity-70 hover:opacity-100">
                {shop.phone}
              </a>
            ) : null}
            {shop.email ? (
              <a
                href={`mailto:${shop.email}`}
                className="link-underline block opacity-70 hover:opacity-100"
              >
                {shop.email}
              </a>
            ) : null}
            {shop.instagram && shop.instagramUrl ? (
              <a
                href={shop.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline block opacity-70 hover:opacity-100"
              >
                {shop.instagram}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-7 text-center text-[0.7rem] tracking-[0.2em] uppercase opacity-45">
        © {new Date().getFullYear()} {shop.name} — {shop.address.locality}, {shop.address.city}
      </div>
    </footer>
  );
}
