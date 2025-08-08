import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SoundState {
  soundEnabled: boolean;
}

const initialState: SoundState = {
  soundEnabled: true,
};

export const soundSlice = createSlice({
  name: "sound",
  initialState,

  reducers: {
    setSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },
  },
});

export const { setSound } = soundSlice.actions;

export const selectSoundEnabled = (state: RootState) =>
  state.sound.soundEnabled;

export default soundSlice.reducer;
