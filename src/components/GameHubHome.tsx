import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Clock3,
  Gamepad2,
  Grid2X2,
  Grid3X3,
  Heart,
  Search,
  Sparkles,
  Trophy,
  X,
  type LucideIcon,
} from "lucide-react";

export type GameId = "sudoku" | "memory" | "rps" | "2048" | "tic-tac-toe" | "word-quest";
type Category = "All games" | "Puzzle" | "Brain games" | "Quick play";

type Game = {
  id: GameId;
  name: string;
  subtitle: string;
  category: Exclude<Category, "All games">;
  icon: LucideIcon;
  color: string;
  pill: string;
  ready: boolean;
};

const games: Game[] = [
  { id: "sudoku", name: "Sudoku", subtitle: "Give your brain a gentle workout.", category: "Puzzle", icon: Grid3X3, color: "lavender", pill: "Logic", ready: false },
  { id: "memory", name: "Memory Match", subtitle: "Flip, match, and remember!", category: "Brain games", icon: BrainCircuit, color: "pink", pill: "Memory", ready: false },
  { id: "rps", name: "Rock Paper Scissors", subtitle: "A classic little showdown.", category: "Quick play", icon: Gamepad2, color: "peach", pill: "Playable now", ready: true },
  { id: "2048", name: "2048", subtitle: "Slide the tiles. Reach the goal.", category: "Puzzle", icon: Grid2X2, color: "mint", pill: "Numbers", ready: false },
  { id: "tic-tac-toe", name: "Tic Tac Toe", subtitle: "Three in a row wins the day.", category: "Quick play", icon: X, color: "sky", pill: "Strategy", ready: false },
  { id: "word-quest", name: "Word Quest", subtitle: "Find the words hiding in plain sight.", category: "Brain games", icon: Sparkles, color: "yellow", pill: "Words", ready: false },
];

const categories: Category[] = ["All games", "Puzzle", "Brain games", "Quick play"];

type GameHubHomeProps = { onPlay: (id: GameId) => void };

export function GameHubHome({ onPlay }: GameHubHomeProps) {
  const [category, setCategory] = useState<Category>("All games");
  const [query, setQuery] = useState("");
  const [comingSoon, setComingSoon] = useState<Game | null>(null);
  const visibleGames = useMemo(
    () => games.filter((game) =>
      (category === "All games" || category === game.category) &&
      `${game.name} ${game.subtitle}`.toLowerCase().includes(query.toLowerCase()),
    ),
    [category, query],
  );

  function chooseGame(game: Game) {
    if (game.ready) onPlay(game.id);
    else setComingSoon(game);
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="home-header-inner">
          <a href="#top" className="brand-link" aria-label="Game Hub homepage">
            <span className="brand-icon"><Gamepad2 size={24} strokeWidth={2.2} /></span>
            <span>game<span className="brand-accent">hub</span><span className="brand-period">.</span></span>
          </a>
          <nav className="home-nav" aria-label="Main navigation">
            <a href="#games" className="nav-active">Explore games</a>
            <a href="#how-it-works">How it works</a>
          </nav>
          <a href="#games" className="header-action">Let's play <ArrowRight size={16} /></a>
        </div>
      </header>

      <main id="top">
        <section className="home-hero">
          <div className="hero-spark hero-spark-1" aria-hidden="true">✦</div>
          <div className="hero-spark hero-spark-2" aria-hidden="true">✧</div>
          <div className="hero-inner">
            <div className="hero-text">
              <span className="hero-pill"><Sparkles size={15} /> YOUR DAILY DOSE OF FUN</span>
              <h1>Big smiles.<br /><span>Little games.</span></h1>
              <p>A cozy corner of the internet to solve, think, laugh and play. Pick a game and let the happy moments begin!</p>
              <button
                type="button"
                className="hero-primary"
                onClick={() => document.getElementById("games")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore games <ArrowRight size={19} />
              </button>
              <div className="hero-meta"><Heart size={16} fill="currentColor" /> Made for curious minds and playful hearts</div>
            </div>
            <div className="hero-illustration" aria-hidden="true">
              <div className="hero-blob" />
              <div className="hero-orbit hero-orbit-one">✦</div>
              <div className="hero-orbit hero-orbit-two">✦</div>
              <div className="hero-main-icon"><Gamepad2 size={128} strokeWidth={1.6} /></div>
              <div className="hero-float hero-float-1"><Grid3X3 size={30} /></div>
              <div className="hero-float hero-float-2"><BrainCircuit size={30} /></div>
              <div className="hero-float hero-float-3"><Trophy size={26} /></div>
            </div>
          </div>
        </section>

        <section id="games" className="games-section">
          <div className="games-heading-row">
            <div>
              <span className="section-kicker">PICK YOUR PLAYTIME</span>
              <h2>Choose your happy place <span aria-hidden="true">🌸</span></h2>
              <p>There's a little something for every kind of player.</p>
            </div>
            <span className="game-count">{games.length} mini games</span>
          </div>
          <div className="games-controls">
            <div className="category-tabs" role="group" aria-label="Filter games by category">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={category === cat}
                  className={category === cat ? "category-tab category-tab-active" : "category-tab"}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <label className="game-search">
              <Search size={18} />
              <span className="sr-only">Search games</span>
              <input
                type="search"
                placeholder="Search a game..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          </div>
          <div className="games-grid">
            {visibleGames.map((game) => {
              const Icon = game.icon;
              return (
                <motion.button
                  type="button"
                  key={game.id}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.99 }}
                  className="game-card"
                  onClick={() => chooseGame(game)}
                  aria-label={`${game.name}, ${game.ready ? "play" : "coming soon"}`}
                >
                  <div className={`game-card-art art-${game.color}`}>
                    <span className="game-card-bubble bubble-a" />
                    <span className="game-card-bubble bubble-b" />
                    <span className="game-card-icon"><Icon size={62} strokeWidth={1.55} /></span>
                    <span className="art-sparkle sparkle-left">✦</span>
                    <span className="art-sparkle sparkle-right">✧</span>
                  </div>
                  <div className="game-card-body">
                    <div className="game-card-topline">
                      <span className="game-pill">{game.pill}</span>
                      {game.ready && <span className="ready-dot" title="Playable now" />}
                    </div>
                    <h3>{game.name}</h3>
                    <p>{game.subtitle}</p>
                    <span className="game-card-cta">{game.ready ? "Play now" : "Coming soon"} <ArrowRight size={16} /></span>
                  </div>
                </motion.button>
              );
            })}
          </div>
          {visibleGames.length === 0 && <p className="games-empty">No games match that search. Try another name!</p>}
        </section>

        <section id="how-it-works" className="end-banner">
          <div className="end-banner-icon"><Clock3 size={28} /></div>
          <div><h2>Just one more game?</h2><p>Take a little break, challenge yourself, and have some fun.</p></div>
          <a href="#games">Find a game <ArrowRight size={17} /></a>
        </section>
      </main>
      <footer className="home-footer"><span>game<span className="brand-accent">hub</span>.</span> · Made to make playtime a little brighter. © {new Date().getFullYear()}</footer>

      {comingSoon && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setComingSoon(null)}
        >
          <div
            className="soon-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="soon-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="dialog-close" onClick={() => setComingSoon(null)} aria-label="Close dialog"><X size={20} /></button>
            <div className="soon-emoji" aria-hidden="true">🎮</div>
            <h2 id="soon-title">{comingSoon.name} is coming soon!</h2>
            <p>This game will be added as its own module. Rock Paper Scissors is playable in this starter.</p>
            <button type="button" className="dialog-ok" onClick={() => setComingSoon(null)}>Got it!</button>
          </div>
        </div>
      )}
    </div>
  );
}
