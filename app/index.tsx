import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Ionicons
        name="settings"
        size={30}
        color={Colors.brown}
        style={styles.settingsIcon}
        onPress={() => router.push("/settings")}
      />

      <Image
        source={require("../assets/images/logo.png")}
        style={styles.image}
      />

      <View style={styles.logoTextView}>
        <Text style={[styles.logoText, { color: Colors.pink }]}>R</Text>
        <Text style={[styles.logoText, { color: Colors.pink }]}>-</Text>
        <Text style={[styles.logoText, { color: Colors.yellow }]}>P</Text>
        <Text style={[styles.logoText, { color: Colors.yellow }]}>-</Text>
        <Text style={[styles.logoText, { color: Colors.lightBlue }]}>S</Text>
      </View>

      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => router.push("/game")}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Start Game</Text>
          <Ionicons name="chevron-forward" size={25} color={Colors.brown} />
        </View>

        <View style={styles.buttonShadow} />
      </TouchableOpacity>
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
  settingsIcon: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logoTextView: {
    flexDirection: "row",
    gap: 10,
  },
  logoText: {
    fontSize: 32,
    fontFamily: "Inter-Bold",
    color: Colors.lightBlue,
    textAlign: "center",
  },
  buttonWrapper: {
    position: "relative",
    top: 100,
    width: 200,
  },
  buttonShadow: {
    position: "absolute",
    top: 6,
    borderRadius: 30,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.brown,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 10,
    padding: 15,
    backgroundColor: Colors.peach,
    borderRadius: 30,
    zIndex: 1,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
    color: Colors.brown,
  },
});
