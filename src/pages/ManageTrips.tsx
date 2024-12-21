import { useEffect } from "react";
import { MountainSnowIcon, Plus } from "lucide-react";
import TripCard from "@/components/trips/TripCard";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchOrganizerAllTrips } from "@/store/slices/organizerTripsSlice";

const ManageTrips = () => {
  const dispatch = useAppDispatch();
  const {
    organizerTrips: trips,
    status: {
      organizerTrips: { loading: tripsLoading, error: tripError },
    },
  } = useAppSelector((state) => state.organizerTrips);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrganizerAllTrips());
    }
  }, [dispatch, user]);

  if (!tripsLoading && tripError) {
    return <div>No Trips.</div>;
  }

  if (tripsLoading) {
    return <div>Loading..</div>;
  }

  // Ensure questions is an array
  const validTrips =
    Array.isArray(trips) && trips && trips.length > 0 ? trips : [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MountainSnowIcon className="h-6 w-6 text-primary" />
          Trips
        </h2>

        {user && user?.role === "organizer" && (
          <Link to="/addtrip" className="flex w-auto items-center">
            <Button className="p-2 rounded-md">
              <Plus className="mr-2 h-4 w-4" /> Add Trip
            </Button>
          </Link>
        )}
      </div>

      {validTrips.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No questions found. Be the first to ask one!
        </div>
      )}

      {validTrips &&
        validTrips.length > 0 &&
        validTrips.map((trip, index) => (
          <div className="space-y-4">
            <TripCard key={trip?._id} trip={trip} user={user} />
          </div>
        ))}
    </div>
  );
};

export default ManageTrips;
