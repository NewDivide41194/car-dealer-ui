import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CarDetails, SearchCategories } from "../types/common";

const baseUrl = process.env.REACT_APP_BASE_URL;

// Fetch Cars API
export const fetchCars = createAsyncThunk<
  CarDetails[],
  { page: number; filters?: Record<string, string> }
>("cars/fetchCars", async ({ page, filters }) => {
  const searchParams = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        searchParams.append(key, value);
      }
    });
  }

  const res = await fetch(
    `${baseUrl}/car?page=${page}&limit=10&${searchParams.toString()}`,
  );

  let data: CarDetails[] = [];
  if (res.ok) {
    data = await res.json();
    return data as CarDetails[];
  }
  return data;
});

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    list: [] as CarDetails[],
    page: 1,
    filters: {} as Record<string, string>,
    selectedCategory: SearchCategories.NAME,
    hasMore: true,
    loading: false,
    isDropdownOpen: false,
  },
  reducers: {
    toggleCategoryDropdown(state) {
      state.isDropdownOpen = !state.isDropdownOpen;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    setFilter: (state, action: PayloadAction<Record<string, string>>) => {
      state.filters = action.payload;
      state.page = 1;
      state.list = []; // Clear old results
      state.hasMore = true;
    },
    setSelelectedCategory: (state, action: PayloadAction<SearchCategories>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCars.fulfilled,
        (state, action: PayloadAction<CarDetails[]>) => {
          if (action.payload.length === 0) {
            state.hasMore = false;
          } else {
            // Check if the new data is empty
            const existingCarIds = new Set(state.list.map((car) => car.id)); // Check for existing car IDs
            const newCars = action.payload.filter(
              (car) => !existingCarIds.has(car.id),
            );
            // Add only new cars
            state.list.push(...newCars);
          }
          state.loading = false;
        },
      )
      .addCase(fetchCars.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  incrementPage,
  setFilter,
  setSelelectedCategory,
  toggleCategoryDropdown,
} = carsSlice.actions;
export default carsSlice.reducer;
