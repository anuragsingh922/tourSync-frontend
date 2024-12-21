import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash } from "lucide-react";
import DatePicker from "react-datepicker"; // Assume you're using a date picker library
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { postTrip } from "@/store/slices/tripSlice";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";

interface Slot {
  start: Date | null;
  end: Date | null;
  seats: number;
}

const OrganizerForm = () => {
  const dispatch = useAppDispatch();
  const [tripName, setTripName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [startingTime, setStartingTime] = useState<Date | null>(null);
  const [endingTime, setEndingTime] = useState<Date | null>(null);
  const [cancellationPolicy, setCancellationPolicy] = useState([]);
  const [tempDays, settempDays] = useState<number>(null);
  const [tempRefund, settempRefund] = useState<number>(null);
  const [slots, setSlots] = useState<Slot[]>([]); // Array of slot objects
  const { toast } = useToast();
  const navigate = useNavigate();

  const [newSlot, setNewSlot] = useState<Slot>({
    start: null,
    end: null,
    seats: 0,
  });

  useEffect(() => {
    console.log("Policy : ", cancellationPolicy);
  }, [cancellationPolicy]);

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
      cancellationPolicy,
    };

    dispatch(postTrip(tripObj));

    toast({
      title: "Trip Added",
      description: "Your trip has been successfully added.",
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

  const now = new Date();

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
            minDate={now}
          />
        </div>
        {startingTime && (
          <div>
            <label className="block font-medium mb-2">Ending Time</label>
            <DatePicker
              selected={endingTime}
              onChange={(date) => setEndingTime(date)}
              showTimeSelect
              dateFormat="Pp"
              placeholderText="Select ending time"
              minDate={startingTime}
            />
          </div>
        )}
      </div>

      {/* Slot Addition Form */}
      {startingTime && endingTime && (
        <div className="mt-4">
          <label className="block font-medium mb-2">Add Slots</label>
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <label className="text-sm mx-2">
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
                className="p-2 rounded-md"
              />
            </div>

            <div>
              <label className="text-sm mx-2">End Time</label>
              <DatePicker
                selected={newSlot.end}
                onChange={(date) => setNewSlot({ ...newSlot, end: date! })}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Slot end time"
                minDate={startingTime}
                maxDate={endingTime}
                className="p-2 rounded-md"
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

      <label className="block font-medium mb-2">Added Slots</label>

      {slots.length === 0 && (
        <label className="block font-medium mb-2">No Slots</label>
      )}

      {/* Display Added Slots */}
      {slots.length > 0 && (
        <div className="mt-4">
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

      {cancellationPolicy && cancellationPolicy.length < 3 && (
        <>
          <div>
            <label className="block font-medium mb-2">
              Add Cancellation Policy{" "}
              <span className="mx-4">{3 - cancellationPolicy.length} left</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex gap-2 items-center">
                <Label className="block font-medium mb-2">{`Time (>=Days)`}</Label>
                <Input
                  type="number"
                  value={tempDays}
                  onChange={(e) => {
                    settempDays(parseInt(e.target.value));
                  }}
                />
              </div>
              <div className="flex gap-2 items-center">
                <Label className="block font-medium mb-2">Refund (%)</Label>
                <Input
                  type="number"
                  value={tempRefund}
                  onChange={(e) => {
                    settempRefund(parseInt(e.target.value));
                  }}
                />
              </div>
            </div>
          </div>

          <Button
            onClick={() => {
              const newPolicy = {
                [tempDays]: tempRefund,
              };
              settempDays(0);
              settempRefund(0);
              setCancellationPolicy((prev) => [...prev, newPolicy]);
            }}
          >
            Add Policy
          </Button>
        </>
      )}

      <label className="block font-medium mb-2">Cancellation Policy</label>

      {cancellationPolicy &&
        cancellationPolicy.length > 0 &&
        cancellationPolicy.map((policy, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center w-full"
          >
            <Label className="text-center sm:text-left">
              Cancellation Policy {index + 1}
            </Label>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Loop through the object entries of the policy */}
              {Object.entries(policy).map(([days, refund]) => (
                <div key={days}>
                  <div className="flex gap-2 items-center">
                    <div>
                      <Label className="block font-medium mb-2">
                        Time {`(>=Days)`}
                      </Label>
                      <Input type="number" disabled value={days} />
                    </div>
                    <div>
                      <Label className="block font-medium mb-2">
                        Refund (%)
                      </Label>
                      <Input type="number" disabled value={refund} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delete button */}
            <button
              onClick={() =>
                setCancellationPolicy((prev) =>
                  prev.filter((_, i) => i !== index)
                )
              }
              className="bg-red-500 text-white p-2 rounded mt-4 sm:mt-0"
            >
              Delete
            </button>
          </div>
        ))}

      {/* </div> */}

      <Button onClick={handleAddTrip} className="w-full">
        Add Trip
      </Button>
    </div>
  );
};

export default OrganizerForm;
