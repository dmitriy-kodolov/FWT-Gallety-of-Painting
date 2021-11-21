import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLocations } from '../../utils/api/methods';

const initialState = {
  locationsInfo: [],
};
export const getLocationsInfo = (store) => store.locations.locationsInfo;
export const fetchLocationsInfo = createAsyncThunk(
  'locationsInfo',
  async () => {
    const locationsInfo = await getLocations();
    return locationsInfo.data;
  },
);

const locationsInfo = createSlice({
  name: 'setLocationsInfo',
  initialState,
  extraReducers: {
    [fetchLocationsInfo.fulfilled]: (state, action) => {
      state.locationsInfo = action.payload;
    },
  },
});

export default locationsInfo.reducer;
