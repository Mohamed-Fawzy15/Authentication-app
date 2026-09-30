import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
};

export const TokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    newToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { newToken, clearToken } = TokenSlice.actions;
export const tokenReducer = TokenSlice.reducer;
