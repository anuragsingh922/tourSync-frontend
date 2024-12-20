import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Trip } from "@/types/trip.ts";
import api from "@/api/api";

// State Definitions
interface LoadingErrorState {
  loading: boolean;
  error: string | null;
}

interface CartState {
  bookedTrips: Trip[];
  status: Record<keyof Omit<CartState, "status">, LoadingErrorState>;
}

const initialLoadingErrorState = (): LoadingErrorState => ({
  loading: false,
  error: null,
});

const initialState: CartState = {
  bookedTrips: [],
  status: {
    bookedTrips: initialLoadingErrorState(),
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
export const fetchAllItemsbooked = createAsyncThunk(
  "bookedtrips/fetchAll",
  async () => {
    const response = await api.get<CartState>("/booked-trips");
    return response.data;
  }
);
export const postbookedTrip = createAsyncThunk(
  "bookedtrips/posttrip",
  async (data) => {
    const response = await api.post<CartState>("/booked-trips", data);
    return response.data;
  }
);
export const removebookedTrip = createAsyncThunk(
  "bookedtrips/deletetrip",
  async (data) => {
    const response = await api.delete<CartState>(
      `/booked-trips?tripID=${data}`
    );
    return response.data;
  }
);

// Slice
const bookedTripsSlice = createSlice({
  name: "bookedTrips",
  initialState,
  reducers: {
    clearErrors: (state) => {
      Object.entries(state.status).forEach(([key]) => {
        state.status[key as keyof CartState["status"]].error = null;
      });
    },
  },
  extraReducers: (builder) => {
    registerAsyncReducer(
      builder,
      fetchAllItemsbooked,
      "bookedTrips",
      "bookedTrips"
    );

    registerAsyncReducer(
      builder,
      postbookedTrip,
      "bookedTrips",
      "bookedTrips",
      (state, action) => {
        state.bookedTrips = action.payload as Trip[];
        state.status.bookedTrips.loading = false;
      }
    );
    registerAsyncReducer(
      builder,
      removebookedTrip,
      "bookedTrips",
      "bookedTrips",
      (state, action) => {
        state.bookedTrips = action.payload as Trip[];
        state.status.bookedTrips.loading = false;
      }
    );
  },
});

// Export
export const { clearErrors } = bookedTripsSlice.actions;
export default bookedTripsSlice.reducer;
