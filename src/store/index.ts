import { configureStore } from '@reduxjs/toolkit';
import carsReducer from '../features/carsSlice';
import themeReducer from '../features/themeSlice';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    theme: themeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;