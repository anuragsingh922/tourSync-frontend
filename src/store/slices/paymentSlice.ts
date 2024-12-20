import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Payment, paymentPayload, Trip } from "@/types/trip.ts";
import api from "@/api/api";

// State Definitions
interface LoadingErrorState {
  loading: boolean;
  error: string | null;
}

interface PaymentState {
  payments: Payment[];
  status: Record<keyof Omit<PaymentState, "status">, LoadingErrorState>;
}

const initialLoadingErrorState = (): LoadingErrorState => ({
  loading: false,
  error: null,
});

const initialState: PaymentState = {
  payments: [],
  status: {
    payments: initialLoadingErrorState(),
  },
};

// Utility to create async reducers
const createAsyncReducer = <T extends PaymentState[]>(
  stateKey: keyof PaymentState,
  statusKey: keyof PaymentState["status"]
) => ({
  pending: (state: PaymentState) => {
    state.status[statusKey].loading = true;
    state.status[statusKey].error = null;
  },
  fulfilled: (state: PaymentState, action: PayloadAction<T>) => {
    state[stateKey] = action.payload as any;
    state.status[statusKey].loading = false;
  },
  rejected: (state: PaymentState, action: PayloadAction<unknown>) => {
    state.status[statusKey].loading = false;
    state.status[statusKey].error =
      (action.payload as any)?.message || "An error occurred";
  },
});

const registerAsyncReducer = <T>(
  builder: any,
  asyncThunk: any,
  stateKey: keyof PaymentState,
  statusKey: keyof PaymentState["status"],
  specialCase?: (state: PaymentState, action: PayloadAction<T>) => void
) => {
  const asyncReducer = createAsyncReducer<T>(stateKey, statusKey);
  builder
    .addCase(asyncThunk.pending, asyncReducer.pending)
    .addCase(asyncThunk.fulfilled, specialCase || asyncReducer.fulfilled)
    .addCase(asyncThunk.rejected, asyncReducer.rejected);
};

// Async Thunks
export const createPayment = createAsyncThunk(
  "payment/create-payment",
  async (data : paymentPayload) => {
    const response = await api.post<PaymentState>(
      "/payments/create-payment",
      data
    );
    return response.data;
  }
);
export const processPayment = createAsyncThunk(
  "payment/process-payment",
  async (data) => {
    const response = await api.post<PaymentState>(
      "/payments/process-payment",
      data
    );
    return response.data;
  }
);
export const fetchPayments = createAsyncThunk(
  "payment/get-payments",
  async (data) => {
    const response = await api.delete<PaymentState>(
      `/payments/get-payments?paymentID=${data}`
    );
    return response.data;
  }
);

// Slice
const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    clearErrors: (state) => {
      Object.entries(state.status).forEach(([key]) => {
        state.status[key as keyof PaymentState["status"]].error = null;
      });
    },
  },
  extraReducers: (builder) => {
    registerAsyncReducer(builder, createPayment, "payments", "payments");

    registerAsyncReducer(
      builder,
      processPayment,
      "payments",
      "payments",
      (state, action) => {
        state.payments = action.payload as Payment[];
        state.status.payments.loading = false;
      }
    );
    registerAsyncReducer(
      builder,
      fetchPayments,
      "payments",
      "payments",
      (state, action) => {
        state.payments = action.payload as Payment[];
        state.status.payments.loading = false;
      }
    );
  },
});

// Export
export const { clearErrors } = paymentSlice.actions;
export default paymentSlice.reducer;
