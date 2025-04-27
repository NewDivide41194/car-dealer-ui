import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "../features/carsSlice";
import themeReducer from "../features/themeSlice";
import filterReducer from "../features/filterSlice";
import sortReducer from "../features/sortingSlice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    theme: themeReducer,
    filter: filterReducer,
    sort: sortReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
