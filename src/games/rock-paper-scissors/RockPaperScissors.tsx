import { useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";

type Choice = "rock" | "paper" | "scissors";
const choices: { id: Choice; label: string; emoji: string }[] = [
  { id: "rock", label: "Rock", emoji: "✊" },
  { id: "paper", label: "Paper", emoji: "✋" },
  { id: "scissors", label: "Scissors", emoji: "✌️" },
];

export function RockPaperScissors({ onBack }: { onBack: () => void }) {
  const [player, setPlayer] = useState<Choice | null>(null);
  const [computer, setComputer] = useState<Choice | null>(null);
  const [score, setScore] = useState({ player: 0, computer: 0, draws: 0 });
  const [result, setResult] = useState("Choose your move to begin!");

  function play(move: Choice) {
    const cpu = choices[Math.floor(Math.random() * choices.length)].id;
    setPlayer(move);
    setComputer(cpu);
    if (move === cpu) {
      setScore((s) => ({ ...s, draws: s.draws + 1 }));
      setResult("It's a tie! Try again ✨");
    } else if (
      (move === "rock" && cpu === "scissors") ||
      (move === "paper" && cpu === "rock") ||
      (move === "scissors" && cpu === "paper")
    ) {
      setScore((s) => ({ ...s, player: s.player + 1 }));
      setResult("You win this round! 🎉");
    } else {
      setScore((s) => ({ ...s, computer: s.computer + 1 }));
      setResult("Computer wins! You'll get the next one 💜");
    }
  }

  function reset() {
    setPlayer(null); setComputer(null);
    setScore({ player: 0, computer: 0, draws: 0 });
    setResult("Choose your move to begin!");
  }

  const emojiFor = (choice: Choice | null) => choices.find((item) => item.id === choice)?.emoji ?? "❔";
  return (
    <main className="rps-page">
      <div className="rps-shell">
        <button type="button" className="rps-back" onClick={onBack}><ArrowLeft size={18} /> Back to games</button>
        <div className="rps-top">
          <span className="hero-pill">QUICK PLAY</span>
          <h1>Rock, Paper, Scissors!</h1>
          <p>A classic game with a pastel twist.</p>
        </div>
        <div className="rps-scores">
          <div><span>YOU</span><strong>{score.player}</strong></div>
          <div><span>DRAWS</span><strong>{score.draws}</strong></div>
          <div><span>COMPUTER</span><strong>{score.computer}</strong></div>
        </div>
        <div className="rps-arena">
          <div><span>Your move</span><div className="rps-emoji">{emojiFor(player)}</div></div>
          <strong>VS</strong>
          <div><span>Computer</span><div className="rps-emoji">{emojiFor(computer)}</div></div>
        </div>
        <p className="rps-result" role="status">{result}</p>
        <div className="rps-choice-row">
          {choices.map((choice) => (
            <button key={choice.id} type="button" className="rps-choice" onClick={() => play(choice.id)}>
              <span>{choice.emoji}</span>{choice.label}
            </button>
          ))}
        </div>
        <button type="button" className="rps-reset" onClick={reset}><RotateCcw size={16} /> Reset scores</button>
      </div>
    </main>
  );
}
