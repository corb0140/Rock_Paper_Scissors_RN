import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

const iconMap = {
  rock: require("../../assets/images/rock.png"),
  paper: require("../../assets/images/paper.png"),
  scissors: require("../../assets/images/scissors.png"),
} as const;

export type GameIconsProps = {
  iconName: keyof typeof iconMap;
};

export default function GameIcon({ iconName }: GameIconsProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => console.log(`Icon pressed: ${iconName}`)}
    >
      <Image
        source={iconMap[iconName]}
        style={styles.image}
        contentFit="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 80,
    borderWidth: 5,
    borderRadius: 50,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 30,
    height: 30,
  },
});
