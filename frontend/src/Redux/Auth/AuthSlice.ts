import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  loginInterface,
  signUpInterface,
  UserResponse,
} from "../../Types/types";
import { ApiClient } from "../../Client/client";

interface AuthState {
  isLoading: boolean;
  token: string | null;
  error: string | null;
  user: UserResponse | null;
}

const initialState: AuthState = {
  isLoading: false,
  user: null,
  token: localStorage.getItem("token") || null,
  error: null,
};

export const addUser = createAsyncThunk<UserResponse, signUpInterface>(
  "auth/addUser",
  async (values: signUpInterface) => {
    try {
      const data = await ApiClient("/user/signup", {
        method: "POST",
        data: values,
      });

      return data as UserResponse;
    } catch (error) {
      console.error(`signup failed with error: ${error}`);
      throw error;
    }
  },
);

export const loginUser = createAsyncThunk<string, loginInterface>(
  "auth/login",
  async (values: loginInterface) => {
    try {
      const data = await ApiClient("/user/login", {
        method: "POST",
        data: values,
      });

      if (!data?.access_token) {
        throw new Error("No Access token received");
      }

      return data.access_token;
    } catch (error) {
      console.error(`Login failed with error: ${error}`);
      throw error;
    }
  },
);

export const userProfile = createAsyncThunk("auth/profile", async () => {
  try {
    const data = await ApiClient("/user/profile", {
      method: "GET",
    });
    return data as UserResponse;
  } catch (error) {
    console.error(`Failed to load user profile ${error}`);
    throw error;
  }
});

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isLoading = false;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // ====================== signUp ========================
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = (action.payload as string) || "sign up failed";
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
    });

    // ============================ login =======================
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = (action.payload as string) || "Login failed";
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    });

    // ================== user profile =========================
    builder.addCase(userProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(userProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(userProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
    });
  },
});

export const { logout } = AuthSlice.actions;
export const authReducer = AuthSlice.reducer;
