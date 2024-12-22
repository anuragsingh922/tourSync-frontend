import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";
import { updateTrip } from "@/store/slices/organizerTripsSlice";

interface Slot {
  start: Date | null;
  end: Date | null;
  seats: number;
}

const EditTrip = () => {
  const { tripID } = useParams();
  const dispatch = useAppDispatch();
  const [tripName, setTripName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [startingTime, setStartingTime] = useState<Date | null>(null);
  const [endingTime, setEndingTime] = useState<Date | null>(null);
  const [cancellationPolicy, setCancellationPolicy] = useState<string>("");
  const [tempDays, settempDays] = useState<number>(null);
  const [tempRefund, settempRefund] = useState<number>(null);
  const [slots, setSlots] = useState<Slot[]>([]); // Array of slot objects
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);

  const { organizerTrips: trips } = useAppSelector(
    (state) => state.organizerTrips
  );

  useEffect(() => {
    if (!tripID) {
      setIsLoading(false);
      return;
    }

    // Find the trip by its ID from the Redux store
    const trip = trips.find((item) => item?.tripID === tripID);

    if (trip) {
      setTripName(trip.tripName || "");
      setPrice(trip.price || "");
      setDescription(trip.description || "");
      setStartingTime(trip.startingTime ? new Date(trip.startingTime) : null);
      setEndingTime(trip.endingTime ? new Date(trip.endingTime) : null);
      setCancellationPolicy(trip.cancellationPolicy || "");
      setSlots(trip.slots || []);
    } else {
      toast({
        description: "Trip not found.",
        variant: "destructive",
      });
      navigate("/manage-trips");
    }

    setIsLoading(false);
  }, [tripID, trips, navigate, toast]);

  const [newSlot, setNewSlot] = useState<Slot>({
    start: null,
    end: null,
    seats: 0,
  });

  const handleAddSlot = () => {
    if (!newSlot.start || !newSlot.end || newSlot.seats <= 0) {
      toast({
        description: "Please fill in all slot details.",
        variant: "destructive",
      });
      return;
    }

    setSlots([...slots, newSlot]);
    setNewSlot({ start: null, end: null, seats: 0 }); // Reset the form for a new slot
  };

  const handleDeleteSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index)); // Remove slot at the specified index
  };

  const handleAddTrip = () => {
    if (!tripName.trim() || !description.trim() || !price.trim()) {
      toast({
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!startingTime || !endingTime) {
      toast({
        description: "Please select starting and ending times.",
        variant: "destructive",
      });
      return;
    }

    const tripObj = {
      tripName,
      description,
      price,
      startingTime,
      endingTime,
      slots,
      tripID,
    };

    dispatch(updateTrip(tripObj));

    toast({
      title: "Trip Added",
      description: "Your trip has been successfully modified.",
    });

    // Reset the form
    setTripName("");
    setDescription("");
    setPrice("");
    setStartingTime(null);
    setEndingTime(null);
    setSlots([]);

    navigate("/manage-trips");
  };

  return (
    <div className="space-y-4 p-5">
      <Input
        value={tripName}
        placeholder="Trip Name"
        onChange={(e) => setTripName(e.target.value)}
      />
      <Textarea
        placeholder="Trip Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        value={price}
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4 pl-14">
        <div>
          <label className="block font-medium mb-2">Starting Time</label>
          <DatePicker
            selected={startingTime}
            onChange={(date) => setStartingTime(date)}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Select starting time"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Ending Time</label>
          <DatePicker
            selected={endingTime}
            onChange={(date) => setEndingTime(date)}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Select ending time"
          />
        </div>
      </div>

      {/* Slot Addition Form */}
      {startingTime && endingTime && (
        <div className="mt-4">
          <label className="block font-medium mb-2">Add Slots</label>
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <label className="text-sm">
                Start Time <span className="w-20"></span>
              </label>
              <DatePicker
                selected={newSlot.start}
                onChange={(date) => setNewSlot({ ...newSlot, start: date! })}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Slot start time"
                minDate={startingTime}
                maxDate={endingTime}
              />
            </div>

            <div>
              <label className="text-sm">End Time</label>
              <DatePicker
                selected={newSlot.end}
                onChange={(date) => setNewSlot({ ...newSlot, end: date! })}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Slot end time"
                minDate={startingTime}
                maxDate={endingTime}
              />
            </div>
          </div>

          <div>
            <label className="text-sm">Seats</label>
            <Input
              type="number"
              value={newSlot.seats || ""}
              placeholder="Seats"
              onChange={(e) =>
                setNewSlot({ ...newSlot, seats: Number(e.target.value) })
              }
            />
          </div>

          {/* Add Slot Button */}
          <Button
            variant="outline"
            onClick={handleAddSlot}
            className="mt-4 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Slot
          </Button>
        </div>
      )}

      {/* Display Added Slots */}
      {slots.length > 0 && (
        <div className="mt-4">
          <label className="block font-medium mb-2">Added Slots</label>
          {slots.map((slot, index) => (
            <div key={index} className="flex items-center gap-4 mb-2">
              <div className="flex flex-col">
                <span className="text-sm">
                  Start Time: {slot.start?.toLocaleString()}
                </span>
                <span className="text-sm">
                  End Time: {slot.end?.toLocaleString()}
                </span>
                <span className="text-sm">Seats: {slot.seats}</span>
              </div>

              {/* Delete Button */}
              <Button
                variant="ghost"
                onClick={() => handleDeleteSlot(index)}
                className="p-2 text-sm"
              >
                <Trash size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}

      <Button onClick={handleAddTrip} className="w-full">
        Update Trip
      </Button>
    </div>
  );
};

export default EditTrip;
