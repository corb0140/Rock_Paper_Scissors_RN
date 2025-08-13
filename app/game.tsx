import { Colors } from "@/constants/Colors";
import { useGameLogic } from "@/hooks/gameLogic";
import { useAppSelector } from "@/hooks/reduxHooks";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import GameEndModal from "@/components/GameEndModal";
import SingleMode from "@/components/SingleMode";

export type Choice = "rock" | "paper" | "scissors" | null;

export default function Game() {
  const gameMode = useAppSelector((state) => state.gameMode.mode);
  const difficultyLevel = useAppSelector(
    (state) => state.difficulty.difficulty
  );

  const [playerSelection, setPlayerSelection] = useState<Choice>(null);
  const [aiSelection, setAiSelection] = useState<Choice>(null);
  const [isGameEndVisible, setGameEndVisible] = useState(false);
  const [gameResult, setGameResult] = useState<"Victory" | "Loss" | null>(null);

  const { playerHealth, aiHealth, roundOutcome, disableGame, resetGame } =
    useGameLogic({
      initialPlayerHealth: 250,
      initialAiHealth: 250,
      playerChoice: playerSelection,
      aiChoice: aiSelection,
    });

  const handleRestart = () => {
    resetGame();
    setPlayerSelection(null);
    setAiSelection(null);
    setGameEndVisible(false);
    setGameResult(null);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <LinearGradient
          colors={[Colors.pink, Colors.reddishOrange]}
          style={styles.gradient}
        />

        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.headingView}>
            <Text style={{ fontSize: 24, fontFamily: "Inter-Bold" }}>
              {gameMode}
            </Text>
            <Text style={{ fontSize: 18, fontFamily: "Inter-Regular" }}>
              {difficultyLevel}
            </Text>
          </View>

          {/* GAME AREA */}
          <View style={{ flex: 1 }}>
            <SingleMode
              playerSelection={playerSelection}
              setPlayerSelection={setPlayerSelection}
              aiSelection={aiSelection}
              setAiSelection={setAiSelection}
              isGameEndVisible={isGameEndVisible}
              setGameEndVisible={setGameEndVisible}
              gameResult={gameResult}
              setGameResult={setGameResult}
              playerHealth={playerHealth}
              aiHealth={aiHealth}
              roundOutcome={roundOutcome}
              disableGame={disableGame}
              resetGame={handleRestart}
            />
          </View>
        </SafeAreaView>
      </View>

      {/* GAME END MODAL (now at game level) */}
      {isGameEndVisible && (
        <GameEndModal
          result={gameResult}
          onRestart={handleRestart}
          isVisible={isGameEndVisible}
        />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: Colors.background,
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  headingView: {
    marginTop: 50,
    alignItems: "center",
  },
});
