import { Colors } from "@/constants/Colors";
import {
  difficultyDescription,
  gameModeDescription,
} from "@/data/descriptions";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectDifficulty, setDifficulty } from "@/lib/slices/difficultySlice";
import { selectGameMode, setGameMode } from "@/lib/slices/gameModeSlice";
import { selectSoundEnabled, setSound } from "@/lib/slices/soundSlice";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Modes = ["Single-Mode", "Tri-Mode", "Power-Mode"];
const Difficulties = ["Easy", "Medium", "Hard"];

export default function Settings() {
  const dispatch = useAppDispatch();
  const gameMode = useAppSelector(selectGameMode);
  const difficultyLevel = useAppSelector(selectDifficulty);
  const soundEnabled = useAppSelector(selectSoundEnabled);

  const [selectedMode, setSelectedMode] = useState<string>(gameMode);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>(difficultyLevel);

  const slideAnim = useRef(new Animated.Value(soundEnabled ? 0 : 1)).current;

  useEffect(() => {
    switch (true) {
      case Modes.includes(selectedMode):
        setSelectedMode(selectedMode);
        break;
      default:
        console.log("No Mode Selected");
    }
  }, [selectedMode]);

  useEffect(() => {
    switch (true) {
      case Difficulties.includes(selectedDifficulty):
        setSelectedDifficulty(selectedDifficulty);
        break;
      default:
        console.log("No Difficulty Selected");
    }
  }, [selectedDifficulty]);

  const toggleSound = () => {
    const toValue = soundEnabled ? 1 : 0;

    Animated.timing(slideAnim, {
      toValue,
      duration: 800,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    dispatch(setSound());
  };

  const saveGameMode = () => {
    dispatch(
      setGameMode({
        mode: selectedMode as "Single-Mode" | "Tri-Mode" | "Power-Mode",
      })
    );

    dispatch(
      setDifficulty({
        difficulty: selectedDifficulty as "Easy" | "Medium" | "Hard",
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* GAME MODE */}
      <View style={{ marginTop: 30 }}>
        <Text>Game Mode</Text>

        <View style={styles.gameModeWrapper}>
          {Modes.map((mode) => (
            <TouchableOpacity
              key={mode}
              style={[
                styles.modeButton,
                selectedMode === mode && styles.selectedModeButton,
              ]}
              onPress={() => setSelectedMode(mode)}
            >
              <Text style={styles.modeText}>{mode}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* DIFFICULTY   */}
      <View>
        <Text>Difficulty</Text>

        <View style={styles.gameModeWrapper}>
          {Difficulties.map((difficulty) => (
            <TouchableOpacity
              key={difficulty}
              style={[
                styles.modeButton,
                selectedDifficulty === difficulty && styles.selectedModeButton,
              ]}
              onPress={() => setSelectedDifficulty(difficulty)}
            >
              <Text style={styles.modeText}>{difficulty}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* SOUND */}
      <View style={{ alignSelf: "flex-start" }}>
        <Text>Sound</Text>

        <View style={styles.soundWrapper}>
          <TouchableOpacity style={styles.soundButton} onPress={toggleSound}>
            <Animated.View
              style={[
                styles.soundIcon,
                {
                  transform: [
                    {
                      translateX: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-15, 15],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Ionicons
                name={soundEnabled ? "volume-high" : "volume-mute"}
                size={25}
                color={Colors.white}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>

      {/* DESCRIPTION */}
      <View style={styles.descriptionView}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.descriptionTitle}>{selectedMode}</Text>
          {Object.entries(gameModeDescription).map(([key, value]) => {
            if (key === selectedMode) {
              return (
                <Text key={key} style={{ textAlign: "center" }}>
                  {value as string}
                </Text>
              );
            }
          })}
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.descriptionTitle}>{selectedDifficulty}</Text>
          {Object.entries(difficultyDescription).map(([key, value]) => {
            if (key === selectedDifficulty) {
              return (
                <Text key={key} style={{ textAlign: "center" }}>
                  {value as string}
                </Text>
              );
            }
          })}
        </View>
      </View>

      {/* SAVE BUTTON */}
      <TouchableOpacity
        style={[
          styles.modeButton,
          {
            alignSelf: "center",
            flex: 0,
            marginTop: 20,
            backgroundColor: Colors.pink,
          },
        ]}
        onPress={saveGameMode}
      >
        <Text style={{ color: Colors.white }}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  gameModeWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  modeText: {
    fontSize: 13,
  },
  modeButton: {
    flex: 1,
    alignItems: "center",
    marginRight: 8,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.lightGray,
  },
  selectedModeButton: {
    backgroundColor: Colors.pink,
  },
  soundWrapper: {
    height: 45,
    width: 85,
    overflow: "hidden",
    borderRadius: 25,
    marginTop: 5,
  },
  soundButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGray,
    padding: 5,
  },
  soundIcon: {
    width: 40,
    height: 35,
    backgroundColor: Colors.pink,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionView: {
    marginTop: 20,
    gap: 15,
  },
  descriptionTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    marginBottom: 10,
  },
});
