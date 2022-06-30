import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const currencySlice = createSlice({
  name: "symbol",
  initialState,
  reducers: {
    liveCurrency: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { liveCurrency } = currencySlice.actions;

export default currencySlice.reducer;
