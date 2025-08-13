import { useEffect, useState } from "react";

export type GameLogicProps = {
  initialPlayerHealth?: number;
  initialAiHealth?: number;
  playerChoice?: "rock" | "paper" | "scissors" | null;
  aiChoice?: "rock" | "paper" | "scissors" | null;
  roundOutcomes?: "Victory" | "Loss" | "Draw" | null;
  disabled?: boolean;
};

export const useGameLogic = ({
  initialPlayerHealth = 250,
  initialAiHealth = 250,
  playerChoice = null,
  aiChoice = null,
  roundOutcomes = null,
  disabled = false,
}: GameLogicProps) => {
  const [playerHealth, setPlayerHealth] = useState<number>(initialPlayerHealth);
  const [aiHealth, setAiHealth] = useState<number>(initialAiHealth);
  const [roundOutcome, setRoundOutcome] = useState<
    "Victory" | "Loss" | "Draw" | null
  >(roundOutcomes);
  const [disableGame, setDisableGame] = useState<boolean>(disabled);

  //   Handle the round outcome based on player and AI choices
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
          setAiHealth((prev) => prev - 250);
        } else {
          setRoundOutcome("Loss");
          setPlayerHealth((prev) => prev - 250);
        }
      }
    };
    handleRoundOutcome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiChoice]);

  // Handle disabling game end
  useEffect(() => {
    if (aiHealth <= 0 || playerHealth <= 0) {
      setDisableGame(true);
    }
  }, [aiHealth, playerHealth]);

  const resetGame = () => {
    setPlayerHealth(initialPlayerHealth);
    setAiHealth(initialAiHealth);
    setDisableGame(false);
    setRoundOutcome(null);
  };

  return {
    playerHealth,
    aiHealth,
    playerChoice,
    aiChoice,
    roundOutcome,
    resetGame,
    disableGame,
  };
};
