import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  darkMode: boolean;
}

const initialState: ThemeState = {
  darkMode: false, // Početno stanje je svijetla tema
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode; // Prebacivanje između svijetle i tamne teme
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
