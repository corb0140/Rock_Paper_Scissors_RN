import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface GameModeState {
  mode: "Single-Mode" | "Tri-Mode" | "Power-Mode";
}

const initialState: GameModeState = {
  mode: "Single-Mode",
};

export const gameModeSlice = createSlice({
  name: "gameMode",
  initialState,

  reducers: {
    setGameMode: (state, action: PayloadAction<GameModeState>) => {
      state.mode = action.payload.mode;
    },
  },
});

export const { setGameMode } = gameModeSlice.actions;

export const selectGameMode = (state: RootState) => state.gameMode.mode;
export default gameModeSlice.reducer;
