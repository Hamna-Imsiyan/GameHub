import { useEffect, useState } from "react";
import { GameHubHome, type GameId } from "@/components/GameHubHome";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { RockPaperScissors } from "@/games/rock-paper-scissors/RockPaperScissors";

export default function App() {
  // Do not persist this flag: the welcome screen appears on each fresh URL visit.
  const [entered, setEntered] = useState(false);
  const [activeGame, setActiveGame] = useState<GameId | null>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    if (!entered) document.body.style.overflow = "hidden";
    else document.body.style.overflow = previous;
    return () => { document.body.style.overflow = previous; };
  }, [entered]);

  function enterHub() {
    if (!entered) setEntered(true);
  }

  function playGame(id: GameId) {
    setActiveGame(id);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <>
      {activeGame === "rps" ? (
        <RockPaperScissors onBack={() => { setActiveGame(null); window.scrollTo(0, 0); }} />
      ) : (
        <GameHubHome onPlay={playGame} />
      )}
      <WelcomeScreen entered={entered} onEnter={enterHub} />
    </>
  );
}
