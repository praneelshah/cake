/**
 * Single source of truth for Amourea Cake's business details.
 *
 * The confirmed fields come from the shop's Google Business listing. Fields
 * left empty are not published anywhere we could verify — fill them in and the
 * UI starts rendering them automatically (empty values are hidden rather than
 * shown blank).
 */
type Shop = {
  name: string;
  short: string;
  category: string;
  rating: string;
  reviewCount: number;
  opensAt: string;
  hoursLine: string;
  address: {
    lines: string[];
    locality: string;
    city: string;
    short: string;
    landmark: string;
  };
  mapsUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  orderUrl: string;
};

export const shop: Shop = {
  name: "Amourea Cake",
  short: "Amourea",
  category: "Cake shop",

  /** Google rating and review count. */
  rating: "5.0",
  reviewCount: 5,

  /** The listing shows "Opens 10 am". A closing time is not published. */
  opensAt: "10 am",
  hoursLine: "Open daily from 10 am",

  address: {
    lines: [
      "Shop No. 3, Clipwala Compound",
      "Saki Vihar Road, beside the bus stop",
      "Near Indus Gym, Tunga Gaon, Chandivali",
      "Saki Naka, Mumbai, Maharashtra 400072",
    ],
    locality: "Chandivali, Saki Naka",
    city: "Mumbai",
    short: "Saki Vihar Road, Chandivali",
    landmark: "Beside the bus stop, near Indus Gym",
  },

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Amourea+cake+Saki+Vihar+Road+Chandivali+Mumbai",

  // TODO: add the shop's real details — each one appears on the site once set.
  phone: "",
  whatsapp: "",
  email: "",
  instagram: "",
  instagramUrl: "",
  orderUrl: "",
};

/** Digits only, for tel: and wa.me links. */
export const telHref = `tel:${shop.phone.replace(/[^\d+]/g, "")}`;
