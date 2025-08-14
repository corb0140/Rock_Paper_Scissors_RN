import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

const iconMap = {
  rock: require("../../assets/images/rock.png"),
  paper: require("../../assets/images/paper.png"),
  scissors: require("../../assets/images/scissors.png"),
} as const; // as const ensures that the keys are treated as literal types

export type GameIconsProps = {
  iconName: keyof typeof iconMap;
  setPlayerSelection?: (
    selection: "rock" | "paper" | "scissors" | null
  ) => void;
  iconHeight?: number;
  iconWidth?: number;
  imageHeight?: number;
  imageWidth?: number;
};

export default function GameIcon({
  iconName,
  setPlayerSelection,
  iconHeight = 80,
  iconWidth = 80,
  imageHeight = 30,
  imageWidth = 30,
}: GameIconsProps) {
  return (
    <Pressable
      style={[styles.container, { height: iconHeight, width: iconWidth }]}
      onPress={() => {
        setPlayerSelection?.(iconName);
      }}
    >
      <Image
        source={iconMap[iconName]}
        style={{ height: imageHeight, width: imageWidth }}
        contentPosition="center"
        contentFit="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 5,
    borderRadius: 100,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
