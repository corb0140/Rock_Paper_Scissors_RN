import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { difficultySlice } from "./slices/difficultySlice";
import { gameModeSlice } from "./slices/gameModeSlice";
import { soundSlice } from "./slices/soundSlice";

const rootReducer = combineReducers({
  gameMode: gameModeSlice.reducer,
  difficulty: difficultySlice.reducer,
  sound: soundSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["gameMode", "difficulty", "sound"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
