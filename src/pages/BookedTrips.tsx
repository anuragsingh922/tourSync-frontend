import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/useAppSelector";
import { ShoppingCart } from "lucide-react";
import CartCard from "@/components/trips/CartCard";
import { Skeleton } from "@/components/ui/skeleton";

const BookedTrips = () => {
  const {
    bookedTrips,
    status: {
      bookedTrips: { loading: bookedTripsloading, error: bookedTripsError },
    },
  } = useAppSelector((state) => state.bookedTrips);


  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-8">
      {/* Top Questions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Trips
          </CardTitle>
        </CardHeader>
        <CardContent>
          {bookedTrips &&
            bookedTrips.length > 0 &&
            bookedTrips.map((trip) => {
              if (bookedTripsloading) {
                return <Skeleton />;
              }
              return (
                <CartCard key={trip?._id} _id={trip?._id} trip={trip} />
              );
            })}

            {bookedTrips.length===0 && <div>You haven't booked any trip.</div>}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookedTrips;
