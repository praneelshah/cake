import imgMixFruitSouffle from "@/assets/menu/mix-fruit-souffle.jpg";
import imgDeathByChocoCake from "@/assets/menu/death-by-choco-cake.jpg";
import imgItalianChocoCake from "@/assets/menu/italian-choco-cake.jpg";
import imgNutellaChocolateCake from "@/assets/menu/nutella-chocolate-cake.jpg";
import imgChocoNutsCake from "@/assets/menu/choco-nuts-cake.jpg";
import imgBelgiumBite from "@/assets/menu/belgium-bite.jpg";
import imgBelgiumTruffleCake from "@/assets/menu/belgium-truffle-cake.jpg";
import imgRedVelvetCake from "@/assets/menu/red-velvet-cake.jpg";
import imgMixFruitCake from "@/assets/menu/mix-fruit-cake.jpg";
import imgPineappleCake from "@/assets/menu/pineapple-cake.jpg";
import imgButterScotchCake from "@/assets/menu/butter-scotch-cake.jpg";
import imgLotusBiscoffCheeseCake from "@/assets/menu/lotus-biscoff-cheese-cake.jpg";
import imgPremiumChocolate from "@/assets/menu/premium-chocolate.jpg";
import imgFerreroRocherCake from "@/assets/menu/ferrero-rocher-cake.jpg";
import imgKitkatChocolateCake from "@/assets/menu/kitkat-chocolate-cake.jpg";
import imgMeltingMomentCake from "@/assets/menu/melting-moment-cake.jpg";
import imgChocoDreamCake from "@/assets/menu/choco-dream-cake.jpg";
import imgChocoCrunchCake from "@/assets/menu/choco-crunch-cake.jpg";
import imgChocoCelebrationCake from "@/assets/menu/choco-celebration-cake.jpg";
import imgSwissTruffleCake from "@/assets/menu/swiss-truffle-cake.jpg";
import imgDutchTruffleCake from "@/assets/menu/dutch-truffle-cake.jpg";
import imgChocoMousseCake from "@/assets/menu/choco-mousse-cake.jpg";
import imgAlmondChocolateCake from "@/assets/menu/almond-chocolate-cake.jpg";
import imgButterScotchPastry from "@/assets/menu/butter-scotch-pastry.jpg";
import imgPineapplePastry from "@/assets/menu/pineapple-pastry.jpg";
import imgRedVelvetPastry from "@/assets/menu/red-velvet-pastry.jpg";
import imgBelgiumTrufflePastry from "@/assets/menu/belgium-truffle-pastry.jpg";
import imgDutchTrufflePastry from "@/assets/menu/dutch-truffle-pastry.jpg";
import imgBlackForestPastry from "@/assets/menu/black-forest-pastry.jpg";
import imgFerreroRocherPastry from "@/assets/menu/ferrero-rocher-pastry.jpg";
import imgBakedBlueberryCheesePastry from "@/assets/menu/baked-blueberry-cheese-pastry.jpg";
import imgBakedLotuscheeseCakePastry from "@/assets/menu/baked-lotuscheese-cake-pastry.jpg";
import imgSweetAndSaltCookies from "@/assets/menu/sweet-and-salt-cookies.jpg";
import imgCoconutCrunchCookies from "@/assets/menu/coconut-crunch-cookies.jpg";
import imgNankataiCookies from "@/assets/menu/nankatai-cookies.jpg";
import imgShrewsburyCookies from "@/assets/menu/shrewsbury-cookies.jpg";
import imgChocoCookies from "@/assets/menu/choco-cookies.jpg";
import imgTilCookies from "@/assets/menu/til-cookies.jpg";
import imgAlmondCookies from "@/assets/menu/almond-cookies.jpg";
import imgDryFruitCookies from "@/assets/menu/dry-fruit-cookies.jpg";
import imgVanillaCookies from "@/assets/menu/vanilla-cookies.jpg";
import imgLotusBiscoffBrownie from "@/assets/menu/lotus-biscoff-brownie.jpg";
import imgNutellaBrownie from "@/assets/menu/nutella-brownie.jpg";
import imgWalnutBrownie from "@/assets/menu/walnut-brownie.jpg";
import imgChocoLava from "@/assets/menu/choco-lava.jpg";
import imgCoffeeMousseSouffle from "@/assets/menu/coffee-mousse-souffle.jpg";
import imgMudBrownieChocolate from "@/assets/menu/mud-brownie-chocolate.jpg";
import imgDarkMousseSouffle from "@/assets/menu/dark-mousse-souffle.jpg";
import imgMilkToast from "@/assets/menu/milk-toast.jpg";
import imgMaskaButter from "@/assets/menu/maska-butter.jpg";
import imgBlackForestCake2 from "@/assets/menu/black-forest-cake-2.jpg";

export const menuCategories = [
  "All",
  "Cakes",
  "Pastries",
  "Cookies",
  "Desserts",
  "Breakfast",
] as const;

export type MenuCategory = Exclude<(typeof menuCategories)[number], "All">;

export type MenuItem = {
  name: string;
  category: MenuCategory;
  /** The sub-section this sits under on the counter, e.g. "Chocolate cake". */
  group: string;
  body: string;
  veg: boolean;
  /** Absent for the handful of items with no photo on the listing. */
  image?: string;
  /**
   * Zomato keeps item prices behind a login, so none could be read from the
   * listing. Fill one in and it renders on the card automatically; leave it
   * out and the card simply shows no price.
   */
  price?: string;
};

/**
 * Taken from the shop's Zomato listing (Amourea The Cake Atelier, Powai):
 * names, descriptions and dish photography are the shop's own.
 */
export const menuItems: MenuItem[] = [
  {
    name: "Death by Choco Cake",
    price: "₹705",
    category: "Cakes",
    group: "Premium cake",
    body: "Rich, indulgent and irresistibly chocolatey A decadent chocolate cake layered with smooth chocolate cream, finished with a glossy dark chocolate glaze and elegant white chocolate décor. Perfectly balanced, beautifully crafted and made for true chocolate lovers.",
    veg: true,
    image: imgDeathByChocoCake,
  },
  {
    name: "Italian Choco Cake",
    price: "₹799",
    category: "Cakes",
    group: "Premium cake",
    body: "Chocolate Dark Mousse Cream, cherry feeling, Topping with Chocolate Flakes",
    veg: true,
    image: imgItalianChocoCake,
  },
  {
    name: "Nutella Chocolate Cake",
    price: "₹140 pastry · ₹700 / 500g",
    category: "Cakes",
    group: "Premium cake",
    body: "A heavenly treat for Nutella lovers. This moist, rich chocolate cake is generously layered and frosted with creamy Nutella, giving every bite a smooth hazelnut-chocolate bliss. Soft, indulgent and irresistibly flavorful it’s the perfect cake to celebrate, share or simply spoil yourself with.",
    veg: true,
    image: imgNutellaChocolateCake,
  },
  {
    name: "Triple Chocolate Cake",
    price: "₹130 pastry · ₹680 / 500g",
    category: "Cakes",
    group: "Premium cake",
    body: "Indulge in a chocoholic’s dream. Our triple chocolate cake is layered with rich chocolate, silky chocolate and smooth chocolate all coming together for the ultimate melt-in-your-mouth experience. Moist, decadent, and perfectly balanced in sweetness, this cake is crafted to satisfy every craving.",
    veg: true,
  },
  {
    name: "Choco Nuts Cake",
    category: "Cakes",
    group: "Premium cake",
    body: "A wholesome twist on indulgence! This rich, moist chocolate cake is blended with the creamy goodness, making it lighter, softer, and irresistibly smooth. Perfectly balanced between decadent and refreshing, it’s a guilt-free treat you’ll keep coming back for. **",
    veg: true,
    image: imgChocoNutsCake,
  },
  {
    name: "Belgian Bite",
    price: "₹130 pastry · ₹650 / 500g",
    category: "Cakes",
    group: "Premium cake",
    body: "Dark Chocolate rich Cream With Chocolate sponge",
    veg: true,
    image: imgBelgiumBite,
  },
  {
    name: "Belgian Truffle Cake",
    price: "₹110 pastry · ₹600 / 500g",
    category: "Cakes",
    group: "Premium cake",
    body: "",
    veg: true,
    image: imgBelgiumTruffleCake,
  },
  {
    name: "Red Velvet Cake",
    price: "₹110 pastry · ₹600 / 500g",
    category: "Cakes",
    group: "Creamy vanilla cake",
    body: "Red Velvet Sponge Layered with Cream Cheese Frosting.",
    veg: true,
    image: imgRedVelvetCake,
  },
  {
    name: "Mixed Fruit Cake",
    price: "₹90 pastry · ₹490 / 500g",
    category: "Cakes",
    group: "Creamy vanilla cake",
    body: "Spongy Vanilla Cake Layered with Fresh Fruits and Covered with Mix Fruit Frosting Garnish with Tropical Fruits.",
    veg: true,
    image: imgMixFruitCake,
  },
  {
    name: "Pineapple Cake",
    price: "₹60 pastry · ₹310 / 500g",
    category: "Cakes",
    group: "Creamy vanilla cake",
    body: "Cake Made with Fresh Cream, Pineapple Chunks and Vanilla Sponge.",
    veg: true,
    image: imgPineappleCake,
  },
  {
    name: "Butter Scotch Cake",
    price: "₹65 pastry · ₹340 / 500g",
    category: "Cakes",
    group: "Creamy vanilla cake",
    body: "Cake Made with Butter Scotch Cream and Vanilla Sponge and Topped with Butter Scotch.",
    veg: true,
    image: imgButterScotchCake,
  },
  {
    name: "Lotus Biscoff Cheese Cake",
    price: "₹130 pastry · ₹650 / 500g",
    category: "Cakes",
    group: "Cheese cake",
    body: "Cream Cheese with White Chocolate Topped with Biscoff Spread with Biscoff Biscuit Crust.",
    veg: true,
    image: imgLotusBiscoffCheeseCake,
  },
  {
    name: "Premium Chocolate",
    price: "₹120 pastry · ₹660 / 500g · ₹1,280 / 1kg",
    category: "Cakes",
    group: "Chocolate cake",
    body: "Dark & Milk Chocolate Ganache with Chocolate Sponge. Without Cream Cake and Mild Bitter As A Taste.",
    veg: true,
    image: imgPremiumChocolate,
  },
  {
    name: "Ferrero Rocher Cake",
    price: "₹140 pastry · ₹700 / 500g · ₹1,400 / 1kg",
    category: "Cakes",
    group: "Chocolate cake",
    body: "Chocolate ganache and Ferrero Rocher chocolate layered on chocolate sponge. It is a combination.",
    veg: true,
    image: imgFerreroRocherCake,
  },
  {
    name: "KitKat Chocolate Cake",
    price: "₹110 pastry · ₹550 / 500g · ₹1,100 / 1kg",
    category: "Cakes",
    group: "Chocolate cake",
    body: "Semi sweet chocolate ganache and KitKat chocolate with chocolate sponge. Served without cream cake.",
    veg: true,
    image: imgKitkatChocolateCake,
  },
  {
    name: "Melting Moment Cake",
    category: "Cakes",
    group: "Chocolate cake",
    body: "Dark chocolate ganache, dark chocolate chips with chocolate sponge and without cream cake.",
    veg: true,
    image: imgMeltingMomentCake,
  },
  {
    name: "Choco Dream Cake",
    price: "₹100 pastry · ₹550 / 500g",
    category: "Cakes",
    group: "Chocolate cake",
    body: "Chocolate mousse cream and caramel flavor with chocolate chunks.",
    veg: true,
    image: imgChocoDreamCake,
  },
  {
    name: "Choco Crunch Cake",
    price: "₹70 pastry · ₹400 / 500g",
    category: "Cakes",
    group: "Chocolate cake",
    body: "Chocolate cream, chocolate sponge with mix dry fruits and chocolate chips.",
    veg: true,
    image: imgChocoCrunchCake,
  },
  {
    name: "Choco Celebration Cake",
    price: "₹90 pastry · ₹490 / 500g",
    category: "Cakes",
    group: "Chocolate cake",
    body: "Mousse Cream, Chocolate Brownie Chunks, with Chocolate Sponge and Sweet As A.",
    veg: true,
    image: imgChocoCelebrationCake,
  },
  {
    name: "Swiss Truffle Cake",
    category: "Cakes",
    group: "Chocolate cake",
    body: "Semi Sweet Chocolate Ganache with Chocolate Sponge.",
    veg: true,
    image: imgSwissTruffleCake,
  },
  {
    name: "Dutch Truffle Cake",
    price: "₹90 pastry · ₹470 / 500g · ₹900 / 1kg",
    category: "Cakes",
    group: "Chocolate cake",
    body: "Dark Chocolate Ganache with Chocolate Sponge.",
    veg: true,
    image: imgDutchTruffleCake,
  },
  {
    name: "Choco Mousse Cake",
    price: "₹70 pastry · ₹350 / 500g",
    category: "Cakes",
    group: "Chocolate cake",
    body: "Dark chocolate sponge with sweet cream.",
    veg: true,
    image: imgChocoMousseCake,
  },
  {
    name: "Black Forest Cake",
    price: "₹65 pastry · ₹330 / 500g · ₹650 / 1kg",
    category: "Cakes",
    group: "Chocolate cake",
    body: "Chocolate Sponge with the Dark Chocolate Ganache of Red Cherries and Whipped Cream.",
    veg: true,
    image: imgBlackForestCake2,
  },
  {
    name: "Almond Chocolate Cake",
    price: "₹130 pastry · ₹650 / 500g",
    category: "Cakes",
    group: "Chocolate cake",
    body: "Semi Dark Chocolate Ganache Layered With Chopped Roasted Almond And Chocolate Sponge.",
    veg: true,
    image: imgAlmondChocolateCake,
  },
  {
    name: "Butter Scotch Pastry",
    price: "₹65 each",
    category: "Pastries",
    group: "Cream cake pastry",
    body: "Cake Made with Butter Scotch Cream and Vanilla Sponge and Topped with Butter Scotch.",
    veg: true,
    image: imgButterScotchPastry,
  },
  {
    name: "Pineapple Pastry",
    price: "₹60 each",
    category: "Pastries",
    group: "Cream cake pastry",
    body: "Cake made with fresh cream, pineapple chunks and vanilla sponge.",
    veg: true,
    image: imgPineapplePastry,
  },
  {
    name: "Red Velvet Pastry (1 piece)",
    price: "₹110 each",
    category: "Pastries",
    group: "Cream cake pastry",
    body: "Red velvet sponge layered with cream cheese frosting.",
    veg: true,
    image: imgRedVelvetPastry,
  },
  {
    name: "Belgian Truffle Pastry",
    price: "₹110 each",
    category: "Pastries",
    group: "Premium cake pastry",
    body: "Chocolate Sponge, with Nuts and Mild Chocolate Flavor.",
    veg: true,
    image: imgBelgiumTrufflePastry,
  },
  {
    name: "Dutch Truffle Pastry",
    price: "₹90 each",
    category: "Pastries",
    group: "Chocolate cake pastry",
    body: "Dark Chocolate Ganache with Chocolate Sponge.",
    veg: true,
    image: imgDutchTrufflePastry,
  },
  {
    name: "Black Forest Pastry",
    price: "₹65 each",
    category: "Pastries",
    group: "Chocolate cake pastry",
    body: "Chocolate Sponge with the Dark Chocolate Ganache of Red Cherries and Whipped Cream.",
    veg: true,
    image: imgBlackForestPastry,
  },
  {
    name: "Ferrero Rocher Pastry (1 piece)",
    price: "₹140 each",
    category: "Pastries",
    group: "Chocolate cake pastry",
    body: "Chocolate Ganache and Ferrero Rocher Chocolate Layered On Chocolate Sponge. It's A Combination.",
    veg: true,
    image: imgFerreroRocherPastry,
  },
  {
    name: "Baked Blueberry Cheese Pastry (1 piece)",
    price: "₹140 each",
    category: "Pastries",
    group: "Baked cheesecake pastry",
    body: "Rich, creamy, and full of fruity goodness! Buttery pastry layers are filled with smooth baked cheesecake and topped with a luscious blueberry glaze. Sweet, tangy, and melt-in-the-mouth – a perfect indulgence for any dessert lover.",
    veg: true,
    image: imgBakedBlueberryCheesePastry,
  },
  {
    name: "Baked Lotus Cheese Cake Pastry",
    price: "₹140 each",
    category: "Pastries",
    group: "Baked cheesecake pastry",
    body: "A rich and creamy baked cheesecake with a buttery Lotus biscuit base, smooth cheesecake filling, and a luscious Lotus caramel topping, finished with crunchy Lotus biscuit crumbs. Perfectly indulgent, creamy, and irresistible.",
    veg: true,
    image: imgBakedLotuscheeseCakePastry,
  },
  {
    name: "Baked Nutella Cheese Pastry",
    price: "₹140 each",
    category: "Pastries",
    group: "Baked cheesecake pastry",
    body: "Baked Biscuit Base, Layering Of Nutella Filling And Topping With Nutella Chocolate.",
    veg: true,
  },
  {
    name: "New York Cheese Pastry",
    category: "Pastries",
    group: "Baked cheesecake pastry",
    body: "Rich and creamy New York style cheesecake pastry with a smooth texture and buttery base.",
    veg: true,
  },
  {
    name: "Sweet and Salt Cookies (250 g)",
    price: "₹120 / 250g",
    category: "Cookies",
    group: "Cookies",
    body: "Freshly baked, perfectly golden and delightfully crisp cookies with a rich, buttery texture. Lightly flavoured with aromatic fennel seeds, these cookies offer a delicious crunch and a classic homemade taste—perfect with tea or coffee.",
    veg: true,
    image: imgSweetAndSaltCookies,
  },
  {
    name: "Coconut Crunch Cookies (250 g)",
    price: "₹210 / 250g",
    category: "Cookies",
    group: "Cookies",
    body: "Golden-baked coconut cookies with a beautifully crisp, caramelized exterior and a soft, chewy coconut centre. Rich in flavour and generously packed with coconut, offering the perfect balance of crunch and melt-in-the-mouth texture. Perfect with tea or coffee.",
    veg: true,
    image: imgCoconutCrunchCookies,
  },
  {
    name: "Nankatai Cookies (250 g)",
    price: "₹120 / 250g",
    category: "Cookies",
    group: "Cookies",
    body: "Traditional Indian shortbread cookies that are crisp on the outside, soft inside, and melt in your mouth with every bite. Made with ghee, cardamom, and a touch of sweetness, our Nankatai Cookies are a perfect blend of homely comfort and rich flavor.",
    veg: true,
    image: imgNankataiCookies,
  },
  {
    name: "Shrewsbury Cookies (250 g)",
    price: "₹190 / 250g",
    category: "Cookies",
    group: "Cookies",
    body: "Buttery, crisp, and delicately sweet, our Shrewsbury Cookies are baked to golden perfection. Made with rich butter and premium ingredients, each bite offers a melt-in-the-mouth texture with a classic homemade charm. Perfect with tea, coffee, or simply as a delightful anytime treat.",
    veg: true,
    image: imgShrewsburyCookies,
  },
  {
    name: "Choco Cookies (250 g)",
    price: "₹130 / 250g",
    category: "Cookies",
    group: "Cookies",
    body: "Premium Chocolate Cookies Rich, intensely chocolatey and irresistibly indulgent. These soft-baked cookies are loaded with deep cocoa flavour, featuring a fudgy centre and a slightly crisp, textured exterior. Perfect for chocolate lovers who enjoy a rich, decadent bite with every piece. Perfect for: Tea-time, gifting, dessert cravings & celebrations.",
    veg: true,
    image: imgChocoCookies,
  },
  {
    name: "Til Cookies (250 g)",
    price: "₹160 / 250g",
    category: "Cookies",
    group: "Cookies",
    body: "A wholesome, crunchy and flavourful baked treat made with a hearty blend of grains, seeds and aromatic spices. Packed with a rustic texture and delicious savoury notes, these cookies are perfect for tea-time snacking or a light, guilt-free bite.",
    veg: true,
    image: imgTilCookies,
  },
  {
    name: "Almond Cookies (250 g)",
    price: "₹210 / 250g",
    category: "Cookies",
    group: "Cookies",
    body: "Buttery, crisp cookies baked with crunchy almonds for a delightful nutty flavour and satisfying sweetness.",
    veg: true,
    image: imgAlmondCookies,
  },
  {
    name: "Dry Fruit Cookies (250 g)",
    price: "₹210 / 250g",
    category: "Cookies",
    group: "Cookies",
    body: "Buttery, crunchy cookies loaded with assorted dry fruits for a rich and wholesome bite.",
    veg: true,
    image: imgDryFruitCookies,
  },
  {
    name: "Vanilla Cookies (250 g)",
    price: "₹120 / 250g",
    category: "Cookies",
    group: "Cookies",
    body: "Delicately crisp, buttery, and infused with the classic aroma of vanilla, our Vanilla Cookies are baked to golden perfection. Light, crunchy, and wonderfully satisfying, they’re the perfect companion for tea, coffee, or a sweet little treat anytime.",
    veg: true,
    image: imgVanillaCookies,
  },
  {
    name: "Lotus Biscoff Brownie",
    price: "₹90 each",
    category: "Desserts",
    group: "Brownie",
    body: "Flour, Lotus Biscoff, Sugar, Butter, Milk Substances, Leavening Agent, Natural and Artificial Flavours",
    veg: true,
    image: imgLotusBiscoffBrownie,
  },
  {
    name: "Nutella Brownie",
    price: "₹90 each",
    category: "Desserts",
    group: "Brownie",
    body: "Flour, Nutella, Sugar, Butter, Milk Substances, Leavening Agent, Natural and Artificial Flavours",
    veg: true,
    image: imgNutellaBrownie,
  },
  {
    name: "Walnut Brownie",
    price: "₹70 each",
    category: "Desserts",
    group: "Brownie",
    body: "Flour, Cocoa, Sugar, Butter, Milk Substances, Leavening Agent, Natural and Artificial Flavours",
    veg: true,
    image: imgWalnutBrownie,
  },
  {
    name: "Choco Lava (1 piece)",
    category: "Desserts",
    group: "Brownie",
    body: "Flour, Refined Palm Oil, Butter, Cocoa, Sugar, Milk Solids, Leavening Agent, Natural & Artificial Flavours",
    veg: true,
    image: imgChocoLava,
  },
  {
    name: "Coffee Mousse Soufflé (1 piece)",
    price: "₹70 each",
    category: "Desserts",
    group: "Souffle",
    body: "A rich and creamy coffee mousse made with smooth chocolate and aromatic coffee, layered to perfection. Light, velvety and indulgent, with a perfect balance of deep coffee flavour and chocolate richness. A delicious dessert for every coffee lover.",
    veg: true,
    image: imgCoffeeMousseSouffle,
  },
  {
    name: "Mud Brownie Chocolate (1 piece)",
    category: "Desserts",
    group: "Souffle",
    body: "Chocolate Brownie With Chocolate",
    veg: true,
    image: imgMudBrownieChocolate,
  },
  {
    name: "Mixed Fruit Soufflé (1 piece)",
    price: "₹100 each",
    category: "Desserts",
    group: "Souffle",
    body: "Fresh, creamy & fruity indulgence in every spoonful Layered with smooth, velvety cream, juicy mixed fruit and vibrant fruit compote, this delightful dessert is finished with fresh fruit toppings for a refreshing burst of flavour. A perfect balance of creamy, fruity and sweet—beautifully served for a premium dessert experience. Perfect for: Parties • Celebrations • Gifting • Everyday indulgence",
    veg: true,
    image: imgMixFruitSouffle,
  },
  {
    name: "Dark Mousse Soufflé",
    category: "Desserts",
    group: "Souffle",
    body: "Indulge in our rich and velvety Dark Mousse, crafted with premium dark chocolate for an intense, smooth and luxurious chocolate experience. Topped with delicate chocolate shavings for the perfect finishing touch.",
    veg: true,
    image: imgDarkMousseSouffle,
  },
  {
    name: "Vanilla Tres Leches",
    price: "₹80 each",
    category: "Cakes",
    group: "Cakes",
    body: "Vanilla tres leches is a classic Latin American dessert featuring a light vanilla sponge cake soaked in a mixture of three milk sweetened condensed milk, evaporated milk and regular milk and topped with whipped cream.",
    veg: true,
  },
  {
    name: "Chocolate Tres Leches",
    price: "₹100 each",
    category: "Cakes",
    group: "Cakes",
    body: "Chocolate tres leches is a decadent, chocolate flavored twist on the classic Latin American three milk cake, where a chocolate sponge cake is baked and then soaked in a mixture of three milks, typically evaporated milk, condensed milk, and heavy cream, often with added cocoa powder or chocolate for a richer taste.",
    veg: true,
  },
  {
    name: "Milk Toast (200 g)",
    price: "₹70 / 200g",
    category: "Breakfast",
    group: "Breakfast",
    body: "Crisp and lightly sweet milk toast, ideal for snacking with tea or coffee.",
    veg: true,
    image: imgMilkToast,
  },
  {
    name: "Maska Butter (200 g)",
    category: "Breakfast",
    group: "Breakfast",
    body: "Soft and buttery maska, perfect as a creamy breakfast spread or tea-time side.",
    veg: true,
    image: imgMaskaButter,
  },
  {
    name: "Hazelnut Chocolate Cake (1kg)",
    price: "₹1,350 / 1kg",
    category: "Cakes",
    group: "Chocolate cake",
    body: "Hazelnut chocolate ganache and nuts with chocolate sponge. Sweet as a taste.",
    veg: true,
  },
];
