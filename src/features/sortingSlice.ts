import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortingOptions, SortingOrder } from "../types/common";

const initialState = {
  isDropdownOpen: false,
  selectedSortOrder: null as SortingOptions | null,
  sortOrder: null as SortingOrder | null,
};

const sortingSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDropdownSort(state) {
      state.isDropdownOpen = !state.isDropdownOpen;
    },
    setSortBy(state, action: PayloadAction<SortingOptions | null>) {
      state.selectedSortOrder = action.payload;
    },
    setSortOrder(state, action: PayloadAction<{ sortOrder: SortingOrder }>) {
      state.sortOrder = action.payload.sortOrder;
    },
  },
});

export const { toggleDropdownSort, setSortBy, setSortOrder } =
  sortingSlice.actions;
export default sortingSlice.reducer;
