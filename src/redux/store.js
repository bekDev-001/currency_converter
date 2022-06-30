import { configureStore, createSlice } from "@reduxjs/toolkit";
import currencyReducer from "./reducers/currencySymbol";
import loadingReducer from "./reducers/loadingReducer";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    loading: loadingReducer,
  },
});
