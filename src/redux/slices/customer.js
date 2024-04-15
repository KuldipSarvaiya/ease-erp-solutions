const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  address: localStorage.getItem("customerAddress") || "",
  address_coordinates: {
    longitude: localStorage.getItem("customerAddress_longitude") || "",
    latitude: localStorage.getItem("customerAddress_latitude") || "",
  },
};

const customerSlice = createSlice({
  name: "customer_state",
  initialState,
  reducers: {
    signIn: (currState, action) => {
      console.log(action);
      return currState;
    },
    signOut: (currState, action) => {
      console.log(action);
      return initialState;
    },
  },
});

export const { signIn, signOut } = customerSlice.actions;

export default customerSlice.reducer;
