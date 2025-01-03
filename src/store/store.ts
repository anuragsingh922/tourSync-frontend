import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "./slices/tripSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import organizerTripsReducer from "./slices/organizerTripsSlice";
import bookedTripsReducer from "./slices/bookedtripsSlice";
import paymentsReducer from "./slices/paymentSlice";
import tripDetailsReducer from "./slices/tripDetailsSlice";

export const store = configureStore({
  reducer: {
    trips: tripReducer,
    user: userReducer,
    cart: cartReducer,
    organizerTrips: organizerTripsReducer,
    bookedTrips: bookedTripsReducer,
    payments: paymentsReducer,
    tripDetails: tripDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
