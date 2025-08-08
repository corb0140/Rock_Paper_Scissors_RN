import { Colors } from "@/constants/Colors";
import { persistor, store } from "@/lib/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />

          <Stack.Screen
            name="game"
            options={{
              title: "Rock Paper Scissors",
              headerTitleStyle: {
                fontFamily: "Inter-SemiBold",
              },
              headerTitleAlign: "center",
              headerShown: false,
              // headerTransparent: true,
            }}
          />

          <Stack.Screen
            name="settings"
            options={{
              title: "Settings",
              headerTitleStyle: {
                fontFamily: "Inter-SemiBold",
              },
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: Colors.background,
              },
            }}
          />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
