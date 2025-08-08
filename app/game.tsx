import { useAppSelector } from "@/hooks/reduxHooks";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Game() {
  const gameMode = useAppSelector((state) => state.gameMode.mode);
  const difficultyLevel = useAppSelector(
    (state) => state.difficulty.difficulty
  );

  return (
    <View style={styles.container}>
      <Text>{gameMode}</Text>
      <Text>{difficultyLevel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
});
