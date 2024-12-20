import React, { ComponentType } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import TripDetail from "./pages/TripDetail";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import TripFetcher from "./components/trips/TripFetcher";
import Authorized from "./hooks/Authorized";
import Cart from "./pages/Cart";
import OrganizerForm from "./components/trips/NewTripForm";
import ManageTrips from "./pages/ManageTrips";
import EditTrip from "./components/trips/EditTrip";
import BookedTrips from "./pages/BookedTrips";
import Trips from "./pages/Trips";

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
                  path="/trip/:tripID"
                  element={withAuthorization(TripDetail)({})}
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
            </MainLayout>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
