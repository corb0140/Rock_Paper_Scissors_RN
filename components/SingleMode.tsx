import { Colors } from "@/constants/Colors";
import { useGameLogic } from "@/hooks/gameLogic";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import GameIcon from "./game/gameIcon";
import HealthBar from "./game/healthBar";

const iconHeight = 100;
const iconWidth = 100;
const imageHeight = 50;
const imageWidth = 50;

export default function SingleMode() {
  const [playerSelection, setPlayerSelection] = useState<
    "rock" | "paper" | "scissors" | null
  >(null);
  const [aiSelection, setAiSelection] = useState<
    "rock" | "paper" | "scissors" | null
  >(null);

  const { playerHealth, aiHealth, roundOutcome, resetGame } = useGameLogic({
    initialPlayerHealth: 250,
    initialAiHealth: 250,
    playerChoice: playerSelection,
    aiChoice: aiSelection,
  });

  const handleConfirmButton = () => {
    const choices = ["rock", "paper", "scissors"] as const;
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setAiSelection(randomChoice);
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
            setPlayerSelection(null);
            setAiSelection(null);
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    console.log("Player selection changed:", playerSelection);
  }, [playerSelection]);

  return (
    <View style={styles.container}>
      {/* AI */}
      <View style={styles.healthAndIconContainer}>
        {/* AI Health Bar */}
        <HealthBar health={aiHealth} />

        <View>
          {aiSelection && (
            <GameIcon
              iconName={aiSelection}
              iconHeight={iconHeight}
              iconWidth={iconWidth}
              imageHeight={imageHeight}
              imageWidth={imageWidth}
            />
          )}
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
        <View>
          {playerSelection && (
            <GameIcon
              iconName={playerSelection}
              iconHeight={iconHeight}
              iconWidth={iconWidth}
              imageHeight={imageHeight}
              imageWidth={imageWidth}
            />
          )}
        </View>

        {/* Player Health Bar */}
        <HealthBar health={playerHealth} />

        <View style={styles.gameIconsContainer}>
          <GameIcon iconName="rock" setPlayerSelection={setPlayerSelection} />

          <GameIcon iconName="paper" setPlayerSelection={setPlayerSelection} />

          <GameIcon
            iconName="scissors"
            setPlayerSelection={setPlayerSelection}
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
          disabled={!playerSelection}
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
});
