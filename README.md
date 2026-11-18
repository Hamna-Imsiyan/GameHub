# Game Hub — Pastel welcome screen starter

This is a **React + TypeScript + Vite + Tailwind CSS v4** starter, with the **shadcn/ui-style folder structure** and the user's original `HandwritingSvg` integration. It includes:

- Fullscreen pastel-gradient welcome view on **every fresh page visit**.
- Animated handwriting for **"Welcome to Game Hub"** using `opentype.js` + `framer-motion`.
- **Swipe up** (phone/tablet), **scroll down** (mouse/trackpad), **Arrow Down / Page Down / Space** (keyboard), or **click** to enter.
- Welcome view slides **up off the screen** to reveal the responsive homepage.
- Game library, category filters, search, and placeholder "coming soon" dialogs.
- Working **Rock Paper Scissors** game as the first independent module.
- No backend or account required for this prototype.

## Prerequisites

Node.js 20.19+ or 22.12+ and npm. (Vite version included here supports current Node versions.)

## Run locally

```bash
npm install
npm run dev
```

Open the local URL from Vite (usually `http://localhost:5173`).

To check the build:

```bash
npm run build
```

## Folder structure

```
src/
  App.tsx
  index.css
  main.tsx
  components/
    WelcomeScreen.tsx
    GameHubHome.tsx
    ui/
      handwriting-svg.tsx
      demo.tsx
  games/
    rock-paper-scissors/
      RockPaperScissors.tsx
  lib/
    utils.ts
```

## Why `src/components/ui`?

This starter uses Vite's conventional **`src` source root**. Therefore the equivalent of `/components/ui` is **`src/components/ui`**, and the `@/` import alias points at `src/`. This is the standard layout for a Vite + shadcn/ui project. Keep reusable UI components there to keep shadcn CLI imports and component additions consistent.

The included `components.json` configures shadcn CLI aliases. If you want to **install official shadcn/ui component files** (buttons, dialogs, cards), use:

```bash
npx shadcn@latest add button card dialog
```

The intro component itself is fully included; it doesn't require a context provider or additional asset. The UI uses `lucide-react` for icons; stock photographs are not used because these games have custom illustration-style cards, not photographic content.

## Supplied handwriting font

`HandwritingSvg` fetches the exact remote TTF URL supplied with your component at runtime. If the remote server is unavailable or blocks cross-origin requests, the component falls back to plain cursive text. For a reliable production deployment, host a properly licensed copy of your preferred handwriting font in `public/fonts/` and pass `fontUrl="/fonts/your-font.ttf"`. No font file is bundled or redistributed here.

The animation provided draws the **outlines** of font glyphs; it is not real handwriting stroke-order recognition. That distinction comes from the supplied code's `font.getPath()` operation.

## Next games

Implement games independently in their own `src/games/<game-name>/` folders, then import their screen into `App.tsx`, and switch the matching game to `ready: true` inside `GameHubHome.tsx`.

## Note about prototype scope

The homepage cards for Sudoku, Memory Match, 2048, Tic Tac Toe, and Word Quest are design-ready placeholders. Only Rock Paper Scissors is playable. Scores are local React state and are not persisted after refreshing the page.

`design/welcome-concept.png` is a **static visual concept** of the requested welcome screen. The working screen is implemented as responsive CSS + SVG, **not** as a flat background image.
