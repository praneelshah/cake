import aboutCake from "@/assets/about-cake.jpg";
import heroDessert from "@/assets/hero-dessert.jpg";
import homeProcessPipe from "@/assets/home-process-pipe.jpg";
import homeSeasonal from "@/assets/home-seasonal.jpg";
import menu1 from "@/assets/menu-1.jpg";
import menu2 from "@/assets/menu-2.jpg";
import menu3 from "@/assets/menu-3.jpg";
import patisserieMacarons from "@/assets/patisserie-macarons.jpg";
import patisserieTart from "@/assets/patisserie-tart.jpg";

export type MenuItem = {
  tag: "Cake" | "Slice" | "Bake";
  name: string;
  body: string;
  price: string;
  image: string;
};

/**
 * NOTE: names, descriptions and prices are placeholders shaped like a
 * neighbourhood cake shop's counter. Swap them for Amourea's real menu.
 */
export const menuItems: MenuItem[] = [
  {
    tag: "Cake",
    name: "Chocolate Truffle",
    body: "Dark cocoa sponge under a smooth truffle glaze, finished with fresh cream and a berry.",
    price: "₹749 / 500g",
    image: menu1,
  },
  {
    tag: "Cake",
    name: "Rose Cream Layer",
    body: "Soft vanilla layers stacked with whipped rose cream and piped by hand, rosette by rosette.",
    price: "₹899 / 500g",
    image: homeProcessPipe,
  },
  {
    tag: "Slice",
    name: "Belgian Gateau",
    body: "Four chocolate layers with a silk ganache centre, cut thick and served cold.",
    price: "₹180",
    image: aboutCake,
  },
  {
    tag: "Slice",
    name: "Butterscotch Crunch",
    body: "Honeyed sponge folded with butterscotch cream and a scatter of praline pearls.",
    price: "₹170",
    image: menu2,
  },
  {
    tag: "Slice",
    name: "Berry Cheesecake Tart",
    body: "Baked cheesecake in a butter shell, crowned with glazed berries and crushed pistachio.",
    price: "₹210",
    image: patisserieTart,
  },
  {
    tag: "Bake",
    name: "Fudge Brownie",
    body: "A dense cocoa brownie split by cool cream cheese, baked until the crust just crackles.",
    price: "₹110",
    image: menu3,
  },
  {
    tag: "Bake",
    name: "Caramel Cupcake",
    body: "Vanilla cupcake capped with salted caramel and a tall swirl of fresh cream.",
    price: "₹120",
    image: heroDessert,
  },
  {
    tag: "Bake",
    name: "Fig & Honey Tart",
    body: "Seasonal figs set over honey custard in a short pastry case, warm from the last bake.",
    price: "₹240",
    image: homeSeasonal,
  },
  {
    tag: "Bake",
    name: "Macaron Box",
    body: "Six shells in the day's flavours — pistachio, rose, coffee and whatever the kitchen fancies.",
    price: "₹450 / box of 6",
    image: patisserieMacarons,
  },
];
