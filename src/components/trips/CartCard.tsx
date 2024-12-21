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
import { useLocation } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Footer from "../layout/Footer";
import { useState } from "react";

interface TripCardProps {
  _id: string;
  trip: Trip;
}

interface DiffFormat {
  days: number;
  hours: number;
  minutes: number;
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

function checkDateDifference(inputDate: string): DiffFormat | string {
  // Parse the input date string into a Date object
  const input = new Date(inputDate);
  const now = new Date(); // Current date and time

  if (isNaN(input.getTime())) {
    return "Invalid date format";
  }

  // Check if the input date is less than the current date
  if (input < now) {
    // Calculate the difference in milliseconds
    const diff = now - input;

    // Convert milliseconds to days, hours, and minutes
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return { days, hours, minutes };
  } else {
    return "The date is not in the past.";
  }
}

const CartCard = ({ _id, trip }: TripCardProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [refundAmount, setrefundAmount] = useState(0);
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
      <div>
        {trip?.cancellationPolicy &&
          trip?.cancellationPolicy.length > 0 &&
          trip?.cancellationPolicy.map((policy, index) => {
            return (
              <div
                key={index}
                className="flex flex-wrap gap-4 sm:gap-6 justify-center items-stretch"
              >
                <Label className="text-center sm:text-left w-full">
                  Cancellation Policy {index + 1}
                </Label>

                <div className="flex flex-wrap justify-evenly gap-4 sm:gap-6">
                  {/* Loop through the object entries of the policy */}
                  {Object.entries(policy).map(([days, refund]) => {
                    const refundAmountt = (refund / 100) * trip?.price;
                    if (refundAmountt !== refundAmount) {
                      setrefundAmount(refundAmountt);
                    }
                    console.log("Refund Amount : ", refundAmountt);
                    return (
                      <div
                        key={days}
                        className="sm:w-1/3 p-4 max-w-full flex-grow flex-shrink"
                      >
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-evenly">
                          <div className="flex flex-col sm:w-1/2 gap-4 sm:gap-6 items-center">
                            <Label className="block font-medium mb-2">
                              Time {`(>=Days)`}
                            </Label>
                            <Input type="number" disabled value={days} />
                          </div>
                          <div className="flex flex-col sm:w-1/2 gap-4 sm:gap-6 items-center">
                            <Label className="block font-medium mb-2">
                              Refund (%)
                            </Label>
                            <Input type="number" disabled value={refund} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>

      <div className="m-1 flex items-center justify-between px-5 mb-6">
        <div className="flex items-center gap-1 text-sm text-black-foreground font-bold">
          <IndianRupee width={"13px"} />{" "}
          <span className="text-green-600 text-lg">{trip?.price}</span>
        </div>
        {location.pathname === "/booked-trips" ? (
          <div className="flex flex-col gap-3">
            <Button
              className="flex items-center"
              disabled={checkDateDifference(trip?.startingTime)?.days <= 0}
              onClick={() => {
                dispatch(removeCart(_id));
              }}
            >
              <ShoppingBag /> Cancel
            </Button>
            <div>Refund Amount : {refundAmount}</div>
          </div>
        ) : (
          <Button
            className="flex items-center"
            onClick={() => {
              dispatch(removeCart(_id));
            }}
          >
            <ShoppingBag /> Remove
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CartCard;
