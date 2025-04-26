import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CarDetails } from '../types/common';

const baseUrl = process.env.REACT_APP_BASE_URL;

// Allow both page and query
export const fetchCars = createAsyncThunk<CarDetails[], { page: number; query?: string }>(
  'cars/fetchCars',
  async ({ page, query }) => {
    const searchParam = query ? `&name=${encodeURIComponent(query)}` : '';
    const res = await fetch(`${baseUrl}/car?page=${page}&limit=10${searchParam}`);
    console.log("response =>", res);
    let data: CarDetails[] = [];
    if (res.ok) {
      data = await res.json();
      return data as CarDetails[];
    }
    return data
  }
);

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    list: [] as CarDetails[],
    page: 1,
    query: '',
    hasMore: true,
    loading: false,
  },
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.page = 1;
      state.list = []; // Clear old results on new search
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action: PayloadAction<CarDetails[]>) => {
        if (action.payload.length === 0) {
          state.hasMore = false;
        } else {
          state.list.push(...action.payload);
        }
        state.loading = false;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { incrementPage, setQuery } = carsSlice.actions;
export default carsSlice.reducer;
