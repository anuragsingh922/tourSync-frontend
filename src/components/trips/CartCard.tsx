import { Trip } from "@/types/trip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IndianRupee, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { removebookedTrip } from "@/store/slices/bookedtripsSlice";
import { removeCart } from "@/store/slices/cartSlice";

interface TripCardProps {
  _id: string;
  trip: Trip;
}

const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  // Format the date
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);

  // Format the time
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // 12-hour format
  });

  return `${formattedDate} at ${formattedTime}`;
};

const CartCard = ({ _id, trip }: TripCardProps) => {
  const dispatch = useAppDispatch();
  if (!trip || typeof trip !== "object") {
    return null;
  }

  return (
    <Card key={_id} className="m-2">
      <img
        src="https://images.unsplash.com/photo-1697518585322-a3e349924e52?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        style={{ width: "100%", height: "400px", objectFit: "cover" }}
      />
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-start mb-4">
            {/* <Link
              to={`/trip/${trip?.tripID}`}
              className="text-xl font-semibold hover:text-primary hover:underline cursor-pointer"
            >
            </Link> */}
            {trip?.tripName}
          </div>
        </CardTitle>
        <CardDescription>{trip?.description}</CardDescription>
      </CardHeader>

      <CardContent>
        {trip?.slots.length > 0 && (
          <div className="mt-4">
            <label className="block font-medium mb-2">Added Slots</label>
            {trip?.slots.map((slot, index) => (
              <div key={index} className="flex items-center gap-4 mb-2">
                <div className="flex flex-col">
                  <span className="text-sm">
                    Start Time: {formatDateTime(slot?.start)}
                  </span>
                  <span className="text-sm">
                    End Time: {formatDateTime(slot?.end)}
                  </span>
                  <span className="text-sm">Seats: {slot?.seats}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div>
          Cancellation Policy :{" "}
          <span className="w-3">{trip?.cancellationPolicy}</span>
        </div>
      </CardFooter>

      <div className="m-1 flex items-center justify-between px-5 mb-6">
        <div className="flex items-center gap-1 text-sm text-black-foreground font-bold">
          <IndianRupee width={"13px"} />{" "}
          <span className="text-green-600 text-lg">{trip?.price}</span>
        </div>
        <Button
          className="flex items-center"
          onClick={() => {
            dispatch(removeCart(_id));
          }}
        >
          <ShoppingBag /> Remove
        </Button>
      </div>
    </Card>
  );
};

export default CartCard;
