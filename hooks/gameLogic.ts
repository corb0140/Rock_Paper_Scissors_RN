import { useEffect, useState } from "react";
import { useAppSelector } from "./reduxHooks";

export type GameLogicProps = {
  initialPlayerHealth?: number;
  initialAiHealth?: number;
  playerChoice?: "rock" | "paper" | "scissors" | null;
  aiChoice?: "rock" | "paper" | "scissors" | null;
  playerChoices?: ("rock" | "paper" | "scissors" | null)[];
  aiChoices?: ("rock" | "paper" | "scissors" | null)[];
  roundOutcomes?: "Victory" | "Loss" | "Draw" | null;
  disabled?: boolean;
};

export const useGameLogic = ({
  initialPlayerHealth = 250,
  initialAiHealth = 250,
  playerChoice = null,
  aiChoice = null,
  playerChoices = [],
  aiChoices = [],
  roundOutcomes = null,
  disabled = false,
}: GameLogicProps) => {
  const difficultyLevel = useAppSelector(
    (state) => state.difficulty.difficulty
  );
  const [playerHealth, setPlayerHealth] = useState<number>(initialPlayerHealth);
  const [aiHealth, setAiHealth] = useState<number>(initialAiHealth);
  const [roundOutcome, setRoundOutcome] = useState<
    "Victory" | "Loss" | "Draw" | null
  >(roundOutcomes);
  const [disableGame, setDisableGame] = useState<boolean>(disabled);

  // SINGLE MODE
  useEffect(() => {
    const handleSingleMode = () => {
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
          setAiHealth((prev) => {
            if (difficultyLevel === "Easy") return prev - 25;
            if (difficultyLevel === "Medium") return prev - 25;
            return prev - 15;
          });
        } else {
          setRoundOutcome("Loss");
          setPlayerHealth((prev) => {
            if (difficultyLevel === "Easy") return prev - 25;
            if (difficultyLevel === "Medium") return prev - 35;
            return prev - 35;
          });
        }
      }
    };
    handleSingleMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiChoice]);

  // TRI MODE
  useEffect(() => {
    if (playerChoices.length === 3 && aiChoices.length === 3) {
      let playerWins = 0;
      let aiWins = 0;

      for (let i = 0; i < 3; i++) {
        const p = playerChoices[i];
        const a = aiChoices[i];

        if (!p || !a || p === a) continue;

        if (
          (p === "rock" && a === "scissors") ||
          (p === "paper" && a === "rock") ||
          (p === "scissors" && a === "paper")
        ) {
          playerWins++;
        } else {
          aiWins++;
        }
      }

      // Determine round outcome
      if (playerWins > aiWins) {
        setRoundOutcome("Victory");
        setAiHealth((prev) => prev - (playerWins - aiWins) * 10);
      } else if (aiWins > playerWins) {
        setRoundOutcome("Loss");
        setPlayerHealth((prev) => prev - (aiWins - playerWins) * 10);
      } else {
        setRoundOutcome("Draw");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiChoices]);

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
