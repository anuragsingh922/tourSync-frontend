import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Trip } from "@/types/trip.ts";
import api from "@/api/api";

// State Definitions
interface LoadingErrorState {
  loading: boolean;
  error: string | null;
}

interface TripState {
  tripDetails: TripDetail;
  status: Record<keyof Omit<TripState, "status">, LoadingErrorState>;
}

const initialLoadingErrorState = (): LoadingErrorState => ({
  loading: false,
  error: null,
});

const initialState: TripState = {
  tripDetails: [],
  status: {
    tripDetails: initialLoadingErrorState(),
  },
};

// Utility to create async reducers
const createAsyncReducer = <T extends TripState[]>(
  stateKey: keyof TripState,
  statusKey: keyof TripState["status"]
) => ({
  pending: (state: TripState) => {
    state.status[statusKey].loading = true;
    state.status[statusKey].error = null;
  },
  fulfilled: (state: TripState, action: PayloadAction<T>) => {
    state[stateKey] = action.payload as any;
    state.status[statusKey].loading = false;
  },
  rejected: (state: TripState, action: PayloadAction<unknown>) => {
    state.status[statusKey].loading = false;
    state.status[statusKey].error =
      (action.payload as any)?.message || "An error occurred";
  },
});

const registerAsyncReducer = <T>(
  builder: any,
  asyncThunk: any,
  stateKey: keyof TripState,
  statusKey: keyof TripState["status"],
  specialCase?: (state: TripState, action: PayloadAction<T>) => void
) => {
  const asyncReducer = createAsyncReducer<T>(stateKey, statusKey);
  builder
    .addCase(asyncThunk.pending, asyncReducer.pending)
    .addCase(asyncThunk.fulfilled, specialCase || asyncReducer.fulfilled)
    .addCase(asyncThunk.rejected, asyncReducer.rejected);
};

// Async Thunks
export const fetchTripDetails = createAsyncThunk(
  "trips/fetchtripdetails",
  async (data: string) => {
    const response = await api.get<TripState>(`/trips/detail?tripID=${data}`);
    return response.data;
  }
);

// Slice
const tripDetailsSlice = createSlice({
  name: "tripDetails",
  initialState,
  reducers: {
    clearErrors: (state) => {
      Object.entries(state.status).forEach(([key]) => {
        state.status[key as keyof TripState["status"]].error = null;
      });
    },
  },
  extraReducers: (builder) => {
    registerAsyncReducer(builder, fetchTripDetails, "tripDetails", "tripDetails");
  },
});

// Export
export const { clearErrors } = tripDetailsSlice.actions;
export default tripDetailsSlice.reducer;
