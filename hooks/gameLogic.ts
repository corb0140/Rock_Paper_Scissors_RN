import { useEffect, useState } from "react";

export type GameLogicProps = {
  initialPlayerHealth?: number;
  initialAiHealth?: number;
  playerChoice?: "rock" | "paper" | "scissors" | null;
  aiChoice?: "rock" | "paper" | "scissors" | null;
  roundOutcomes?: "Victory" | "Loss" | "Draw" | null;
};

export const useGameLogic = ({
  initialPlayerHealth = 250,
  initialAiHealth = 250,
  playerChoice = null,
  aiChoice = null,
  roundOutcomes = null,
}: GameLogicProps) => {
  const [playerHealth, setPlayerHealth] = useState<number>(initialPlayerHealth);
  const [aiHealth, setAiHealth] = useState<number>(initialAiHealth);
  const [roundOutcome, setRoundOutcome] = useState<
    "Victory" | "Loss" | "Draw" | null
  >(roundOutcomes);

  useEffect(() => {
    const handleRoundOutcome = () => {
      if (playerChoice && aiChoice) {
        if (playerChoice === aiChoice) {
          setRoundOutcome("Draw");
          return;
        } else if (
          (playerChoice === "rock" && aiChoice === "scissors") ||
          (playerChoice === "paper" && aiChoice === "rock") ||
          (playerChoice === "scissors" && aiChoice === "paper")
        ) {
          setRoundOutcome("Victory");
          setAiHealth((prev) => prev - 25);
        } else {
          setRoundOutcome("Loss");
          setPlayerHealth((prev) => prev - 25);
        }
      }
    };
    handleRoundOutcome();
  }, [aiChoice]);

  const resetGame = () => {
    setPlayerHealth(initialPlayerHealth);
    setAiHealth(initialAiHealth);
    setRoundOutcome(null);
  };

  return {
    playerHealth,
    aiHealth,
    playerChoice,
    aiChoice,
    roundOutcome,
    resetGame,
  };
};
