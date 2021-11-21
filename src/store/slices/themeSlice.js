import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lightTheme: true,
};

export const getTheme = (store) => store.theme.lightTheme;

export const setThemeSlice = createSlice({
  name: 'setTheme',
  initialState,
  reducers: {
    setTheme(store) {
      store.lightTheme = !store.lightTheme;
    },
  },
});
export default setThemeSlice.reducer;
export const { setTheme } = setThemeSlice.actions;
