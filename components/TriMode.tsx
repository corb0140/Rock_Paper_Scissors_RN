import { Choice } from "@/app/game";
import { Colors } from "@/constants/Colors";
import {
  iconHeight,
  iconWidth,
  imageHeight,
  imageWidth,
} from "@/constants/iconDimensions";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import GameIcon from "./game/gameIcon";
import HealthBar from "./game/healthBar";
import { ModeProps } from "./SingleMode";

export type TriModeProps = Omit<
  ModeProps,
  "playerSelection" | "setPlayerSelection" | "aiSelection" | "setAiSelection"
> & {
  playerSelections: Choice[];
  setPlayerSelections: (choices: Choice[]) => void;
  aiSelections: Choice[];
  setAiSelections: (choices: Choice[]) => void;
};

export default function TriMode({
  playerSelections,
  setPlayerSelections,
  aiSelections,
  setAiSelections,
  setGameEndVisible,
  setGameResult,
  playerHealth,
  aiHealth,
  roundOutcome,
  disableGame,
  resetGame,
}: TriModeProps) {
  const handlePlayerChoice = (choice: Choice) => {
    if (playerSelections.length < 3) {
      setPlayerSelections([...playerSelections, choice]);
    }
  };

  const handleConfirmButton = () => {
    const choices: Choice[] = ["rock", "paper", "scissors"];
    const aiChoices = Array.from({ length: 3 }, () => {
      return choices[Math.floor(Math.random() * choices.length)];
    });
    setAiSelections(aiChoices);

    // Now compare each pair to determine winner
    let playerScore = 0;
    let aiScore = 0;

    for (let i = 0; i < 3; i++) {
      const player = playerSelections[i];
      const ai = aiChoices[i];
      if (player === ai) continue;

      if (
        (player === "rock" && ai === "scissors") ||
        (player === "paper" && ai === "rock") ||
        (player === "scissors" && ai === "paper")
      ) {
        playerScore++;
      } else {
        aiScore++;
      }
    }

    if (playerScore > aiScore) {
      setGameResult("Victory");
    } else if (aiScore > playerScore) {
      setGameResult("Loss");
    } else {
      setGameResult(null);
    }
  };

  const handleResetButton = () => {
    Alert.alert(
      "Reset Game",
      "Are you sure you want to reset the game?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            resetGame();
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    if (playerHealth <= 0) {
      setGameResult("Loss");
      setGameEndVisible(true);
    } else if (aiHealth <= 0) {
      setGameResult("Victory");
      setGameEndVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerHealth, aiHealth]);

  return (
    <View style={styles.container}>
      {/* AI */}
      <View style={styles.healthAndIconContainer}>
        {/* AI Health Bar */}
        <HealthBar health={aiHealth} />

        <View style={styles.selectionView}>
          {aiSelections.map((choice, index) => (
            <GameIcon
              key={index}
              iconName={choice!}
              iconHeight={iconHeight - 10}
              iconWidth={iconWidth - 10}
              imageHeight={imageHeight - 10}
              imageWidth={imageWidth - 10}
            />
          ))}
        </View>
      </View>

      {/* VICTORY / LOSS INDICATOR */}
      <View style={{ width: "100%" }}>
        {roundOutcome && (
          <Text style={styles.VictoryLossText}>
            {roundOutcome === "Victory"
              ? "Victory!"
              : roundOutcome === "Loss"
              ? "Defeat!"
              : "Draw!"}
          </Text>
        )}
      </View>

      {/* PLAYER */}
      <View style={styles.healthAndIconContainer}>
        {/* Player Selection */}
        <View style={styles.selectionView}>
          {playerSelections.map((choice, index) => (
            <GameIcon
              key={index}
              iconName={choice!}
              iconHeight={iconHeight - 10}
              iconWidth={iconWidth - 10}
              imageHeight={imageHeight - 10}
              imageWidth={imageWidth - 10}
            />
          ))}
        </View>

        {/* Player Health Bar */}
        <HealthBar health={playerHealth} />

        <View style={styles.gameIconsContainer}>
          <GameIcon iconName="rock" setPlayerSelection={handlePlayerChoice} />

          <GameIcon iconName="paper" setPlayerSelection={handlePlayerChoice} />

          <GameIcon
            iconName="scissors"
            setPlayerSelection={handlePlayerChoice}
          />
        </View>
      </View>

      {/* CONFIRM & RESET BUTTON */}
      <View style={styles.confirmAndResetContainer}>
        <Pressable style={styles.button} onPress={handleResetButton}>
          <Ionicons name="refresh" size={24} color={Colors.reddishOrange} />
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={handleConfirmButton}
          disabled={!playerSelections || disableGame}
        >
          <Ionicons name="checkmark" size={24} color={Colors.lightBlue} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 30,
  },
  healthAndIconContainer: {
    alignItems: "center",
    gap: 25,
  },
  gameIconsContainer: {
    flexDirection: "row",
    gap: 25,
    justifyContent: "space-around",
    alignItems: "center",
  },
  VictoryLossText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  confirmAndResetContainer: {
    position: "absolute",
    bottom: 320,
    right: 20,
    gap: 5,
  },
  button: {
    borderWidth: 2,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 100,
    height: 55,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  selectionView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },
});
