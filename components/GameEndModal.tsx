import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type GameEndModalProps = {
  isVisible?: boolean;
  result?: "Victory" | "Loss" | "Draw" | null;
  onRestart?: () => void;
};

export default function GameEndModal({
  isVisible = false,
  result,
  onRestart,
}: GameEndModalProps) {
  const router = useRouter();
  return (
    <>
      {isVisible && (
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Inter-SemiBold",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            {result === "Victory"
              ? "Whatever, it was all luck. I let you win!"
              : result === "Loss" && "Hahaha, you lost! get better buddy!"}
          </Text>

          <Pressable
            onPress={() => router.push("/")}
            style={[styles.button, { backgroundColor: Colors.lightBlue }]}
          >
            <Text style={styles.buttonText}>Menu</Text>
          </Pressable>

          <Pressable
            onPress={onRestart}
            style={[styles.button, { backgroundColor: Colors.reddishOrange }]}
          >
            <Text style={styles.buttonText}>Restart</Text>
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
  },
});
