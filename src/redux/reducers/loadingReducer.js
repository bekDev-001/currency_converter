import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    loadingCycle: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { loadingCycle } = loadingSlice.actions;

export default loadingSlice.reducer;
