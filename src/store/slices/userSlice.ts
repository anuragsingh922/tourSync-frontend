import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/api/api";

// Define types for the user and state
interface User {
  name: string;
  email: string;
  role : string;
}

interface AuthResponse {
  name : string;
  email : string;
  role : string;
}

interface AuthPayload {
  email: string;
  password: string;
}
interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

interface LoadingErrorState {
  loading: boolean;
  error: string | null;
}

interface UserState {
  user: User | null;
  status: {
    user: LoadingErrorState;
  };
}

const createInitialLoadingErrorState = (): LoadingErrorState => ({
  loading: false,
  error: null,
});

const initialState: UserState = {
  user: null,
  status: {
    user: createInitialLoadingErrorState(),
  },
};

// Utility function for handling async reducer states
const createAsyncReducer = (stateKey: keyof UserState) => ({
  pending: (state: UserState) => {
    state.status.user.loading = true;
    state.status.user.error = null;
  },
  fulfilled: (state: UserState, action: PayloadAction<AuthResponse>) => {
    state.status.user.loading = false;
    state.user = action?.payload || null;
  },
  rejected: (state: UserState, action: PayloadAction<unknown>) => {
    state.status.user.loading = false;
    state.status.user.error =
      (action.payload as any)?.message || "An error occurred";
  },
});
const createAsyncReducerlogout = (stateKey: keyof UserState) => ({
  pending: (state: UserState) => {
    state.status.user.loading = true;
    state.status.user.error = null;
  },
  fulfilled: (state: UserState) => {
    state.status.user.loading = false;
    state.user = null;
  },
  rejected: (state: UserState, action: PayloadAction<unknown>) => {
    state.status.user.loading = false;
    state.status.user.error =
      (action.payload as any)?.message || "An error occurred";
  },
});

// Async thunks for sign-up and sign-in
export const signUp = createAsyncThunk<AuthResponse, SignupPayload>(
  "/auth/register",
  async (userData) => {
    const response = await api.post<AuthResponse>("/auth/register", userData);
    return response.data;
  }
);

export const signIn = createAsyncThunk<AuthResponse, AuthPayload>(
  "/auth/login",
  async (credentials) => {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  }
);

export const verify = createAsyncThunk<AuthResponse>(
  "/auth/verify",
  async () => {
    const response = await api.get<AuthResponse>("/auth/verify");
    return response.data;
  }
);
export const logout = createAsyncThunk<AuthResponse>(
  "/auth/logout",
  async () => {
    localStorage.removeItem("tour-sync-auth");
    return;
    const response = await api.get<AuthResponse>("/auth/logout");
    return response.data;
  }
);

// The slice definition
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.status.user = createInitialLoadingErrorState();
    },
    clearAuthError: (state) => {
      state.status.user.error = null;
    },
  },
  extraReducers: (builder) => {
    // Sign-Up
    builder
      .addCase(signUp.pending, createAsyncReducer("status").pending)
      .addCase(signUp.fulfilled, createAsyncReducer("status").fulfilled)
      .addCase(signUp.rejected, createAsyncReducer("status").rejected);

    // Sign-In
    builder
      .addCase(signIn.pending, createAsyncReducer("status").pending)
      .addCase(signIn.fulfilled, createAsyncReducer("status").fulfilled)
      .addCase(signIn.rejected, createAsyncReducer("status").rejected);
    builder
      .addCase(verify.pending, createAsyncReducer("status").pending)
      .addCase(verify.fulfilled, createAsyncReducer("status").fulfilled)
      .addCase(verify.rejected, createAsyncReducer("status").rejected);
    builder
      .addCase(logout.pending, createAsyncReducerlogout("status").pending)
      .addCase(logout.fulfilled, createAsyncReducerlogout("status").fulfilled)
      .addCase(logout.rejected, createAsyncReducerlogout("status").rejected);
  },
});

// Export actions and reducer
export const { logOut, clearAuthError } = userSlice.actions;
export default userSlice.reducer;
