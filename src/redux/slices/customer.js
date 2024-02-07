const { createSlice } = require("@reduxjs/toolkit");

const initialState = { isLoggedIn: false, auth: { id: "", name: "" } };

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
