import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CityDetails } from "../types/common";

const initialState = {
  isDropdownOpen: false,
  list: [] as CityDetails[],
  loading: false,
  selectedCity: null as CityDetails | null,
  selectedRating: 0,
};
const baseUrl = process.env.REACT_APP_BASE_URL;

export const fetchCities = createAsyncThunk<CityDetails[]>(
  "ui/fetchCities",
  async () => {
    const res = await fetch(`${baseUrl}/city`);
    let data: CityDetails[] = [];
    if (res.ok) {
      data = await res.json();
      return data as CityDetails[];
    }
    return data;
  },
);

const filterSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDropdown(state) {
      state.isDropdownOpen = !state.isDropdownOpen;
    },
    closeDropdown(state) {
      state.isDropdownOpen = false;
    },
    setSelectedCity(state, action: PayloadAction<CityDetails | null>) {
      state.selectedCity = action.payload;
    },
    setRating(state, action: PayloadAction<number>) {
      state.selectedRating = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCities.fulfilled,
        (state, action: PayloadAction<CityDetails[]>) => {
          state.list = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchCities.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { toggleDropdown, closeDropdown, setSelectedCity, setRating } =
  filterSlice.actions;
export default filterSlice.reducer;
