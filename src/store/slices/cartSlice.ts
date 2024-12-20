import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Trip } from "@/types/trip.ts";
import api from "@/api/api";

// State Definitions
interface LoadingErrorState {
  loading: boolean;
  error: string | null;
}

interface CartState {
  cart: Trip[];
  status: Record<keyof Omit<CartState, "status">, LoadingErrorState>;
}

const initialLoadingErrorState = (): LoadingErrorState => ({
  loading: false,
  error: null,
});

const initialState: CartState = {
  cart: [],
  status: {
    cart: initialLoadingErrorState(),
  },
};

// Utility to create async reducers
const createAsyncReducer = <T extends CartState[]>(
  stateKey: keyof CartState,
  statusKey: keyof CartState["status"]
) => ({
  pending: (state: CartState) => {
    state.status[statusKey].loading = true;
    state.status[statusKey].error = null;
  },
  fulfilled: (state: CartState, action: PayloadAction<T>) => {
    state[stateKey] = action.payload as any;
    state.status[statusKey].loading = false;
  },
  rejected: (state: CartState, action: PayloadAction<unknown>) => {
    state.status[statusKey].loading = false;
    state.status[statusKey].error =
      (action.payload as any)?.message || "An error occurred";
  },
});

const registerAsyncReducer = <T>(
  builder: any,
  asyncThunk: any,
  stateKey: keyof CartState,
  statusKey: keyof CartState["status"],
  specialCase?: (state: CartState, action: PayloadAction<T>) => void
) => {
  const asyncReducer = createAsyncReducer<T>(stateKey, statusKey);
  builder
    .addCase(asyncThunk.pending, asyncReducer.pending)
    .addCase(asyncThunk.fulfilled, specialCase || asyncReducer.fulfilled)
    .addCase(asyncThunk.rejected, asyncReducer.rejected);
};

// Async Thunks
export const fetchAllItemsCart = createAsyncThunk("cart/fetchAll", async () => {
  const response = await api.get<CartState>("/cart");
  return response.data;
});
export const postCart = createAsyncThunk("cart/posttrip", async (data) => {
  const response = await api.post<CartState>("/cart", data);
  return response.data;
});
export const removeCart = createAsyncThunk("cart/deletetrip", async (data) => {
  const response = await api.delete<CartState>(`/cart?tripID=${data}`);
  return response.data;
});
export const clearCart = createAsyncThunk("cart/clear", async () => {
  const response = await api.delete<CartState>(`/cart/clear`);
  return response.data;
});

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearErrors: (state) => {
      Object.entries(state.status).forEach(([key]) => {
        state.status[key as keyof CartState["status"]].error = null;
      });
    },
  },
  extraReducers: (builder) => {
    registerAsyncReducer(builder, fetchAllItemsCart, "cart", "cart");
    registerAsyncReducer(builder, clearCart, "cart", "cart");

    registerAsyncReducer(builder, postCart, "cart", "cart", (state, action) => {
      state.cart = action.payload as Trip[];
      state.status.cart.loading = false;
    });
    registerAsyncReducer(
      builder,
      removeCart,
      "cart",
      "cart",
      (state, action) => {
        state.cart = action.payload as Trip[];
        state.status.cart.loading = false;
      }
    );
  },
});

// Export
export const { clearErrors } = cartSlice.actions;
export default cartSlice.reducer;
