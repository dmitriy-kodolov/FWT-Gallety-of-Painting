import { configureStore } from '@reduxjs/toolkit';
import authorsInfoReducer from './slices/authorsInfoSlice';
import locationsInfoReducer from './slices/locationInfoSlice';
import themeReducer from './slices/themeSlice';
import paintingsForPaginationReducer from './slices/paginationSlice';

const store = configureStore({
  reducer: {
    authors: authorsInfoReducer,
    locations: locationsInfoReducer,
    theme: themeReducer,
    paintingsForPagination: paintingsForPaginationReducer,
  },
});
export default store;
