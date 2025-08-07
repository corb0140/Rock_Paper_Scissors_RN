import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.white,
    fontSize: 20,
  },
});
