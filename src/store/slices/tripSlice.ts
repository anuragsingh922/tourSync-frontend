import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Trip } from "@/types/trip.ts";
import api from "@/api/api";

// State Definitions
interface LoadingErrorState {
  loading: boolean;
  error: string | null;
}

interface TripState {
  trips: Trip[];
  status: Record<keyof Omit<TripState, "status">, LoadingErrorState>;
}

interface AddTripState {
  tripID: string;
}

const initialLoadingErrorState = (): LoadingErrorState => ({
  loading: false,
  error: null,
});

const initialState: TripState = {
  trips: [],
  status: {
    trips: initialLoadingErrorState(),
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
export const ftechAllTrips = createAsyncThunk("trips/fetchAll", async () => {
  const response = await api.get<TripState>("/trips");
  return response.data;
});
export const postTrip = createAsyncThunk(
  "trips/posttrip",
  async (data: any) => {
    const response = await api.post<TripState>("/trips", data);
    return response.data;
  }
);


// Slice
const tripSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    clearErrors: (state) => {
      Object.entries(state.status).forEach(([key]) => {
        state.status[key as keyof TripState["status"]].error = null;
      });
    },
  },
  extraReducers: (builder) => {
    registerAsyncReducer(builder, ftechAllTrips, "trips", "trips");

    registerAsyncReducer(
      builder,
      postTrip,
      "trips",
      "trips",
      (state, action) => {
        state.trips.unshift(action.payload as Trip);
        state.status.trips.loading = false;
      }
    );
  },
});

// Export
export const { clearErrors } = tripSlice.actions;
export default tripSlice.reducer;
