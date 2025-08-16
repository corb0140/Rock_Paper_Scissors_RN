// powers.tsx
import { Colors } from "@/constants/Colors";
import { availablePowers, Power } from "@/data/powers";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type PowerModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (power: Power) => void;
};

export default function PowerModal({
  isVisible,
  onClose,
  onSelect,
}: PowerModalProps) {
  return (
    <Modal transparent visible={isVisible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.heading}>Choose Your Power</Text>

          <View style={styles.cardContainer}>
            {availablePowers.slice(0, 5).map((power) => (
              <Pressable
                key={power.id}
                style={styles.card}
                onPress={() => onSelect(power)}
              >
                <Text style={styles.title}>{power.name}</Text>
                <Text style={styles.desc}>{power.description}</Text>
              </Pressable>
            ))}
          </View>

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={{ color: Colors.white, fontWeight: "bold" }}>
              Close
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    width: "90%",
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  card: {
    backgroundColor: Colors.lightBlue,
    padding: 15,
    borderRadius: 12,
    width: "45%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5,
  },
  desc: {
    fontSize: 12,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: Colors.reddishOrange,
    padding: 10,
    borderRadius: 10,
  },
});
