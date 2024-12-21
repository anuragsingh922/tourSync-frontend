import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useToast } from "@/hooks/use-toast";
import { verify } from "@/store/slices/userSlice";
import { ftechAllTrips } from "@/store/slices/tripSlice";
import { fetchAllItemsCart } from "@/store/slices/cartSlice";
import { fetchAllItemsbooked } from "@/store/slices/bookedtripsSlice";

const useFetchQuestions = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const {
    trips,
    status: {
      trips: { loading: loadingTrip, error: tripError },
    },
  } = useAppSelector((state) => state.trips);

  const {
    user,
    status: {
      user: { loading: userloading, error: userError },
    },
  } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      dispatch(verify());
    }
  }, [user, dispatch]);

  // Fetch trending and recent questions
  useEffect(() => {
    dispatch(ftechAllTrips());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchAllItemsCart());
      dispatch(fetchAllItemsbooked());
    }
  }, [dispatch, user]);

  // Handle errors with toasts
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

export default useFetchQuestions;