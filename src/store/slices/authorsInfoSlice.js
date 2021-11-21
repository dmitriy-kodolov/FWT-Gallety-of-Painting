import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuthors } from '../../utils/api/methods';

const initialState = {
  authorsInfo: [],
};
export const getAuthorsInfo = (store) => store.authors.authorsInfo;
export const fetchAuthorsInfo = createAsyncThunk(
  'authorsInfo',
  async () => {
    const authorsInfo = await getAuthors();
    return authorsInfo.data;
  },
);

const authorsInfo = createSlice({
  name: 'setAuthorsInfo',
  initialState,
  extraReducers: {
    [fetchAuthorsInfo.fulfilled]: (state, action) => {
      state.authorsInfo = action.payload;
    },
  },
});

export default authorsInfo.reducer;
