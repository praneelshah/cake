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
  /** The full trading name as it appears on the Zomato listing. */
  name: "Amourea The Cake Atelier",
  short: "Amourea",
  category: "Cake shop",

  /** Google rating and review count. */
  rating: "5.0",
  reviewCount: 5,

  /** The listing shows "Opens 10 am". A closing time is not published. */
  opensAt: "10 am",
  hoursLine: "Open daily from 10 am",

  /** Address exactly as printed on the shop's own menu card. */
  address: {
    lines: [
      "Shop No. R-4, Clipwala Compound",
      "Tunga Gaon, Saki Vihar Road",
      "Sakinaka, Mumbai - 400072",
    ],
    locality: "Sakinaka",
    city: "Mumbai",
    short: "Saki Vihar Road, Sakinaka",
    landmark: "Beside the bus stop, near Indus Gym",
  },

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Amourea+The+Cake+Atelier+Clipwala+Compound+Saki+Vihar+Road+Sakinaka+Mumbai",

  /** Zomato ordering page for the Saki Vihar Road kitchen. */
  orderUrl: "https://www.zomato.com/mumbai/amourea-the-cake-atelier-1-powai/order",

  /** All from the shop's menu card. */
  phone: "+91 99677 37008",
  whatsapp: "919967737008",
  email: "amoureacake@gmail.com",
  instagram: "@Amoureacake",
  instagramUrl: "https://www.instagram.com/amoureacake/",
};

/** Digits only, for tel: and wa.me links. */
export const telHref = `tel:${shop.phone.replace(/[^\d+]/g, "")}`;
