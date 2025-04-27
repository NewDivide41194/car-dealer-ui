import { createSlice } from "@reduxjs/toolkit";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: prefersDark,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const { toggleTheme, setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
