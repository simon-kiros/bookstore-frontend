import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  //page: "books",
  cart: [],
  //user: "",
  //userId: 0,
  wallet: 0,
  totalCart: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,

    setCart: (state, action) => {
      state.cart = action.payload;
    },

    setTotalCart: (state, action) => {
      state.totalCart = action.payload;
    },

    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
  },
});

export const { setCart, setTotalCart, setWallet } = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
