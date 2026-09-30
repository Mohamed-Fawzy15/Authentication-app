import { configureStore } from "@reduxjs/toolkit";
import { setStoreInstance } from "../Client/client";
import { tokenReducer } from "./Token/TokenSlice";
import { authReducer } from "./Auth/AuthSlice";

export const Store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
  },
});

setStoreInstance(Store);

export type GlobalState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
