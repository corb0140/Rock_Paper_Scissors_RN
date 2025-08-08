import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import GameIcon from "./game/gameIcon";
import HealthBar from "./game/healthBar";

export default function SingleMode() {
  const [playerHealth, setPlayerHealth] = useState<number>(250);
  const [aiHealth, setAiHealth] = useState<number>(250);

  return (
    <View style={styles.container}>
      <View style={styles.healthAndIconContainer}>
        {/* AI Health Bar */}
        <HealthBar health={aiHealth} />

        <View></View>
      </View>

      <View style={styles.healthAndIconContainer}>
        {/* Player Health Bar */}
        <HealthBar health={playerHealth} />

        <View style={styles.gameIconsContainer}>
          <GameIcon iconName="rock" />
          <GameIcon iconName="paper" />
          <GameIcon iconName="scissors" />
        </View>
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
});
