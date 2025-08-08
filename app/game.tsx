import { Colors } from "@/constants/Colors";
import { useAppSelector } from "@/hooks/reduxHooks";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import SingleMode from "@/components/SingleMode";

export default function Game() {
  const gameMode = useAppSelector((state) => state.gameMode.mode);
  const difficultyLevel = useAppSelector(
    (state) => state.difficulty.difficulty
  );

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
            <SingleMode />
          </View>
        </SafeAreaView>
      </View>
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
