import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import { shop, telHref } from "@/lib/shop";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

type SiteHeaderProps = {
  variant?: "hero" | "atelier";
};

export function SiteHeader({ variant = "hero" }: SiteHeaderProps) {
  const isAtelier = variant === "atelier";
  const accent = isAtelier ? "text-atelier-gold" : "text-hero-gold-ink";
  const [open, setOpen] = useState(false);

  // While the panel is open, Escape closes it and the page behind stops
  // scrolling, so the overlay never slides over content that has moved.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={`relative z-50 w-full ${isAtelier ? "atelier-header" : ""}`}>
      {/* Utility bar. The hero variant deliberately has none, so nothing reads
          as a band across the top of the home page. */}
      {isAtelier ? (
        <div className="hidden bg-atelier-ink text-atelier-paper md:block">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-3 text-[0.7rem] tracking-wide sm:px-10">
            <div className="flex items-center gap-4">
              <Link to="/contact" className="opacity-80 transition-opacity hover:opacity-100">
                Contact
              </Link>
              <span className="opacity-30">|</span>
              <a
                href={shop.mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={`${accent} transition-opacity hover:opacity-80`}
              >
                {shop.address.short}
              </a>
              {shop.phone ? (
                <>
                  <span className="opacity-30">|</span>
                  <a href={telHref} className={accent}>
                    {shop.phone}
                  </a>
                </>
              ) : null}
            </div>
            <p className="opacity-70">{shop.hoursLine}</p>
          </div>
        </div>
      ) : null}

      {/* Main nav. Positioned and above the panel's z-40: the panel is a
          sibling inside this wrapper, so a static nav would be painted over
          by it and the close button would be unreachable. */}
      <nav className="relative z-50 mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-6 sm:px-10">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className={`${isAtelier ? "font-editorial text-4xl text-atelier-ink" : "font-display text-3xl text-hero-ink"} italic tracking-tight`}
        >
          {shop.short}
        </Link>

        <ul
          className={`${isAtelier ? "text-atelier-ink" : "text-hero-ink"} hidden items-center gap-9 text-[0.72rem] tracking-[0.18em] uppercase md:flex`}
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                activeProps={{
                  className: `border-b-2 pb-1 ${isAtelier ? "border-atelier-ink text-atelier-ink" : "border-hero-ink text-hero-ink"}`,
                }}
                className={
                  isAtelier
                    ? "text-atelier-ink/65 transition-colors hover:text-atelier-ink"
                    : "text-hero-ink/70 transition-colors hover:text-hero-ink"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="site-mobile-nav"
          className={`nav-toggle grid place-items-center md:hidden ${open ? "is-open" : ""} ${
            isAtelier ? "text-atelier-ink" : "text-hero-ink"
          }`}
        >
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </nav>

      {/* Mobile panel. It sits beneath the nav row, so the same button that
          opens it is still on top to close it. */}
      <div
        id="site-mobile-nav"
        className={`mobile-nav flex flex-col md:hidden ${open ? "is-open" : ""} ${
          isAtelier ? "bg-atelier-paper text-atelier-ink" : "bg-hero-bg text-hero-ink"
        }`}
      >
        <ul className="flex flex-col px-6">
          {navLinks.map((link, i) => (
            <li
              key={link.label}
              className="mobile-nav-item"
              style={{ transitionDelay: `${140 + i * 70}ms` }}
            >
              <Link
                to={link.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "is-current" }}
                className={`mobile-nav-link ${isAtelier ? "font-editorial" : "font-display"}`}
              >
                <span className={`mobile-nav-index ${accent}`}>0{i + 1}</span>
                <span className="mobile-nav-label">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="mobile-nav-item mt-auto px-6 pt-10 pb-12 text-sm"
          style={{ transitionDelay: `${140 + navLinks.length * 70}ms` }}
        >
          <p className={`${accent} text-[0.65rem] tracking-[0.28em] uppercase`}>Visit us</p>
          <address className="mt-4 space-y-1 not-italic opacity-60">
            {shop.address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-4 opacity-60">{shop.hoursLine}</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.7rem] tracking-[0.2em] uppercase">
            <a
              href={shop.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => setOpen(false)}
              className="link-underline"
            >
              Get directions
            </a>
            {shop.phone ? (
              <a href={telHref} className="link-underline">
                {shop.phone}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
