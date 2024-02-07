import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./slices/customer.js";

const store = configureStore({
  reducer: {
    customer: customerSlice,
  },
});

export default store;
