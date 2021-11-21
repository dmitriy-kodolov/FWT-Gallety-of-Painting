/* eslint-disable no-unused-expressions */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPaintingsForPagination } from '../../utils/api/methods';

const initialState = {
  isLoad: false,
  isError: false,
  curentPage: 1,
  items: [],
  perPage: 9,
  allPages: 5,
  totalCountPaintings: 33,
};
export const fetchPaintingsForPagination = createAsyncThunk(
  'paintingsForPagination',
  async (newUrl) => {
    const paintingsForPagination = await getPaintingsForPagination(newUrl);
    return paintingsForPagination.data;
  },
);
export const getPaintingsPagination = (store) => store.paintingsForPagination.items;
export const getCurentPage = (store) => store.paintingsForPagination.curentPage;
export const getLimitPage = (store) => store.paintingsForPagination.perPage;
export const getIsError = (store) => store.paintingsForPagination.isError;
export const getIsLoad = (store) => store.paintingsForPagination.isLoad;
export const getAllPages = (store) => store.paintingsForPagination.allPages;

const paintingsForPagination = createSlice({
  name: 'setPaginationInfo',
  initialState,
  reducers: {
    setPerPage: (state, action) => {
      if (action.payload <= 1024) {
        state.perPage = 8;
      }
      if (action.payload <= 768) {
        state.perPage = 6;
      }
    },
    setAllPages: (state, action) => {
      state.allPages = action.payload;
    },
    setCurentPage: (state, action) => {
      state.curentPage = action.payload;
    },
    incremetPage: (state) => {
      state.curentPage === state.allPages
        ? state.curentPage = state.allPages
        : state.curentPage += 1;
    },
    decrementPage: (state) => {
      state.curentPage === 1
        ? state.curentPage = 1
        : state.curentPage -= 1;
    },
    setStartPage: (state) => { state.curentPage = 1; },
    setLastPage: (state) => { state.curentPage = state.allPages; },
  },
  extraReducers: {
    [fetchPaintingsForPagination.pending]: (state) => {
      state.isLoad = false;
    },
    [fetchPaintingsForPagination.rejected]: (state) => {
      state.isLoad = true;
      state.isError = true;
    },
    [fetchPaintingsForPagination.fulfilled]: (state, action) => {
      state.isLoad = true;
      state.items = action.payload;
    },
  },
});
export const {
  setCurentPage, setAllPages, setPerPage, setStartPage, setLastPage, incremetPage, decrementPage,
} = paintingsForPagination.actions;
export default paintingsForPagination.reducer;
