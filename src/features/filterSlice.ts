import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityDetails, SortingOptions, SortingOrder } from '../types/common';

const initialState = {
  isDropdownOpen: false,
  list: [] as CityDetails[],
  loading: false,
  selectedCity: null as CityDetails | null,
  sortBy: null as SortingOptions | null,
  sortOrder: null as SortingOrder | null,
};
const baseUrl = process.env.REACT_APP_BASE_URL;

export const fetchCities = createAsyncThunk<CityDetails[]>(
  'ui/fetchCities',
  async () => {
    const res = await fetch(`${baseUrl}/city`);
    console.log("response =>", res);
    let data: CityDetails[] = [];
    if (res.ok) {
      data = await res.json();
      return data as CityDetails[];
    }
    return data
  }
);

const filterSlice = createSlice({
  name: 'ui',
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
    setSorting(state, action: PayloadAction<{ sortBy: SortingOptions; sortOrder: SortingOrder }>) {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
  
      state.list = [...state.list].sort((a, b) => {
        const key = action.payload.sortBy;
        const order = action.payload.sortOrder === 'asc' ? 1 : -1;
  
        if ((a as any)[key] < (b as any)[key]) return -1 * order;
        if ((a as any)[key] > (b as any)[key]) return 1 * order;
        return 0;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action: PayloadAction<CityDetails[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchCities.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { toggleDropdown, closeDropdown, setSelectedCity } = filterSlice.actions;
export default filterSlice.reducer;
