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
import { Link, useLocation } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Footer from "../layout/Footer";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

function canCancel(inputDate: string): {
  canCancel: boolean;
  daysLeft: number | string;
} {
  const input = new Date(inputDate);
  const now = new Date();

  if (isNaN(input.getTime())) {
    return { canCancel: false, daysLeft: "Invalid date format" };
  }

  // Calculate the time difference in milliseconds
  const diff = input.getTime() - now.getTime();

  if (diff >= 0) {
    const totalHoursLeft = diff / (1000 * 60 * 60);
    const daysLeft = Math.floor(totalHoursLeft / 24);

    return {
      canCancel: totalHoursLeft >= 1,
      daysLeft,
    };
  } else {
    return { canCancel: false, daysLeft: "The date is in the past." };
  }
}

function getAmount(starttimetime: string, tripCost: string): number {
  const cost = parseInt(tripCost);

  const diff = canCancel(starttimetime).daysLeft;

  if (typeof diff === "string") {
    return 0;
  }

  if (diff >= 15) {
    return cost;
  }
  if (diff >= 7) {
    return cost / 2;
  }

  return 0;
}

const CartCard = ({ _id, trip, setTotalCost }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [refundAmount, setrefundAmount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (!trip || typeof trip !== "object") {
    return null;
  }

  return (
    <Card key={_id} className="m-2">
      <Link
        to={`/trip/${trip?.tripID}`}
        className="text-xl font-semibold hover:text-primary hover:underline cursor-pointer"
      >
        <img
          src={
            trip.tripImage ||
            "https://images.unsplash.com/photo-1697518585322-a3e349924e52?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt=""
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
      </Link>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-start mb-4">
            <Link
              to={`/trip/${trip?.tripID}`}
              className="text-xl font-semibold hover:text-primary hover:underline cursor-pointer"
            >
              {trip?.tripName}
            </Link>
            <Link to={`/trip/${trip?.tripID}`}>
              <Button>Details</Button>
            </Link>
          </div>
        </CardTitle>
        <CardDescription>{trip?.description}</CardDescription>
      </CardHeader>

      <CardContent>
        {/* {trip?.slots.length > 0 && (
          <div className="mt-4">
            <label className="block font-medium mb-2">Added Slots</label>
            {trip?.slots.map((slot, index) => ( */}
        <div className="flex items-center gap-4 mb-2">
          <div className="flex flex-col">
            <span className="text-sm">
              Start Time: {formatDateTime(trip?.startingTime)}
            </span>
            <span className="text-sm">
              End Time: {formatDateTime(trip?.endingTime)}
            </span>
          </div>
        </div>
        {/* ))}
          </div>
        )} */}
      </CardContent>

      <div className="m-1 flex items-center justify-between px-5 mb-6">
        <div className="flex items-center gap-1 text-sm text-black-foreground font-bold">
          <IndianRupee width={"13px"} />{" "}
          <span className="text-green-600 text-lg">{trip?.price}</span>
        </div>
        {location.pathname === "/booked-trips" ? (
          <div className="flex flex-col gap-3">
            {/* <Button
              className="flex items-center"
              disabled={checkDateDifference(trip?.startingTime)?.days <= 0}
              onClick={() => {
                dispatch(removeCart(_id));
              }}
            >
              <ShoppingBag /> Cancel
            </Button> */}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="flex items-center"
                  disabled={!canCancel(trip?.startingTime)?.canCancel}
                >
                  <ShoppingBag /> Cancel
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cancel Trip</DialogTitle>
                </DialogHeader>
                <Card>
                  <CardHeader>
                    <CardTitle>Refund Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isDialogOpen && (
                      <ul className="flex flex-col gap-3">
                        <li>
                          Trip Date : {formatDateTime(trip?.startingTime)}
                        </li>
                        <li>
                          Refundable Amount :{" "}
                          <span className="font-bold">
                            {getAmount(trip?.startingTime, trip?.price)}
                          </span>
                        </li>
                        <li className="font-bold">
                          Note: The refunded amount will be credited back to the
                          original payment source.
                        </li>
                      </ul>
                    )}
                  </CardContent>
                  <CardFooter className="flex items-center justify-end">
                    <Button
                      onClick={() => {
                        dispatch(removebookedTrip(_id));
                      }}
                    >
                      <ShoppingBag /> Cancel
                    </Button>
                  </CardFooter>
                </Card>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <Button
            className="flex items-center"
            onClick={() => {
              setTotalCost((prev) => prev - trip?.price);
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
