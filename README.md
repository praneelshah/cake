# Amourea Cake

Website for **Amourea Cake**, a cake shop on Saki Vihar Road, Chandivali, Saki Naka, Mumbai.

Built with TanStack Start, React 19, Tailwind CSS 4 and shadcn/ui.

## Editing the shop details

Every business fact on the site (name, address, hours, Google rating, phone,
email, Instagram, maps link) comes from one file:

    src/lib/shop.ts

Fields left as empty strings are hidden across the site rather than rendered
blank — fill one in and it appears in the header, footer and contact page
automatically.

Menu items, descriptions and prices live in `src/lib/menu-data.ts`.

## Development

You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
npm i
npm run dev
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint
- `npm run format` — format with Prettier
