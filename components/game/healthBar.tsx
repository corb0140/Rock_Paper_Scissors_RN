import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type HealthBarProps = {
  health: number; // Optional prop to set player health
};

export default function HealthBar({ health }: HealthBarProps) {
  return (
    <View style={styles.bar}>
      <View style={[styles.health, { width: health }]}></View>

      <Text style={{ fontFamily: "Inter-Regular" }}>{health}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "relative",
    height: 40,
    width: 250,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  health: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    backgroundColor: Colors.softGreen,
    borderRadius: 10,
  },
});
