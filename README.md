# Shifumi Game

![image_info](./pictures/homepage.jpg)

## Technical Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeSript](https://www.typescriptlang.org/)
- [Panda CSS](https://panda-css.com/)
- [Radix Primitives](https://www.radix-ui.com/primitives)
- [Radix Icons](https://www.radix-ui.com/primitives)
- [Heroicons](https://heroicons.com/)
- [Framer Motion](https://www.framer.com/motion/)

## Quick Start

1. Clone the project and navigate to it.

```
git clone https://github.com/Mzettor/zettor-shifumi shifumi-game
```

2. Install dependencies.

```
npm install
```

3. Create panda.config.ts file

```
npx panda init --postcss
```

4. Run in development mode.

```
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) with your browser.

## Folder Structure

```
.
├── index.html
├── package.json
├── package-lock.json
├── panda.config.ts
├── pictures
│   └── homepage.jpg
├── postcss.config.cjs
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── GameOver.tsx
│   │   ├── Game.tsx
│   │   ├── Menu.tsx
│   │   ├── Navbar.tsx
│   │   └── Settings.tsx
│   ├── helpers
│   │   └── helpers.ts
│   ├── images
│   │   ├── Images.tsx
│   │   ├── paper.png
│   │   ├── rcp.png
│   │   ├── rock.png
│   │   └── scissors.png
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
