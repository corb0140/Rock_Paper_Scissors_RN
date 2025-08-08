import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DifficultyState {
  difficulty: "Easy" | "Medium" | "Hard";
}

const initialState: DifficultyState = {
  difficulty: "Easy",
};

export const difficultySlice = createSlice({
  name: "difficulty",
  initialState,

  reducers: {
    setDifficulty: (state, action: PayloadAction<DifficultyState>) => {
      state.difficulty = action.payload.difficulty;
    },
  },
});

export const { setDifficulty } = difficultySlice.actions;

export const selectDifficulty = (state: RootState) =>
  state.difficulty.difficulty;

export default difficultySlice.reducer;
