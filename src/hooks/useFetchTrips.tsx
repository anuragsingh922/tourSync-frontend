import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useToast } from "@/hooks/use-toast";
import { verify } from "@/store/slices/userSlice";
import { fetchAllItemsCart } from "@/store/slices/cartSlice";
import { fetchAllItemsbooked } from "@/store/slices/bookedtripsSlice";
import { ftechAllTrips } from "@/store/slices/tripSlice";

const useFetchTripss = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const {
    trips,
    status: {
      trips: { loading: loadingTrip, error: tripError },
    },
  } = useAppSelector((state) => state.trips);

  const { user } = useAppSelector((state) => state.user);

  const token = localStorage?.getItem("tour-sync-auth");

  useEffect(() => {
    if (!user) {
      dispatch(verify());
    }
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(ftechAllTrips());
  }, [dispatch]);

  useEffect(() => {
    if (user && token) {
      dispatch(fetchAllItemsCart());
      dispatch(fetchAllItemsbooked());
    }
  }, [dispatch, user, token]);

  useEffect(() => {
    if (tripError) {
      toast({
        title: "Error",
        description: tripError,
        variant: "destructive",
      });
    }
  }, [tripError, toast]);
};

export default useFetchTripss;
