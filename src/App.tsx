import React, { ComponentType, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
const Auth = React.lazy(() => import("./pages/Auth"));
const Profile = React.lazy(() => import("./pages/Profile"));
import TripFetcher from "./components/trips/TripFetcher";
const Authorized = React.lazy(() => import("./hooks/Authorized"));
const Cart = React.lazy(() => import("./pages/Cart"));
const OrganizerForm = React.lazy(
  () => import("./components/trips/NewTripForm")
);
const ManageTrips = React.lazy(() => import("./pages/ManageTrips"));
const EditTrip = React.lazy(() => import("./components/trips/EditTrip"));
const BookedTrips = React.lazy(() => import("./pages/BookedTrips"));
const Trips = React.lazy(() => import("./pages/Trips"));
const TripDetails = React.lazy(() => import("./pages/TripDetail"));

const withAuthorization = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => (
    <Authorized>
      <Component {...props} />
    </Authorized>
  );
};

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <TripFetcher />
          <BrowserRouter>
            <MainLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route
                    path="/manage-trips"
                    element={withAuthorization(ManageTrips)({})}
                  />
                  <Route
                    path="/edit-trip/:tripID"
                    element={withAuthorization(EditTrip)({})}
                  />
                  <Route path="/auth" element={<Auth />} />
                  <Route
                    // path="/trip/:tripID"
                    path="/tripDetail"
                    element={withAuthorization(TripDetails)({})}
                  />
                  <Route path="/trips" element={withAuthorization(Trips)({})} />
                  <Route
                    path="/profile"
                    element={withAuthorization(Profile)({})}
                  />
                  <Route
                    path="/addtrip"
                    element={withAuthorization(OrganizerForm)({})}
                  />
                  <Route path="/cart" element={withAuthorization(Cart)({})} />
                  <Route
                    path="/booked-trips"
                    element={withAuthorization(BookedTrips)({})}
                  />
                </Routes>
              </Suspense>
            </MainLayout>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
