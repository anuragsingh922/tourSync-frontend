import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Slot {
  start: Date | null;
  end: Date | null;
  seats: number;
}

interface SlotsSectionProps {
  slots: Slot[];
  setSlots: (slots: Slot[]) => void;
  startingTime: Date | null;
  endingTime: Date | null;
}

export const SlotsSection = ({
  slots,
  setSlots,
  startingTime,
  endingTime,
}: SlotsSectionProps) => {
  const { toast } = useToast();
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
    setNewSlot({ start: null, end: null, seats: 0 });
  };

  const handleDeleteSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold ">Time Slots</Label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mx-10">
          <Label className="mx-2">Start Time</Label>
          <DatePicker
            selected={newSlot.start}
            onChange={(date: Date | null) =>
              setNewSlot({ ...newSlot, start: date })
            }
            minDate={startingTime}
            maxDate={endingTime}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Slot start time"
            className="w-full p-2 rounded-md border"
          />
        </div>

        <div className="mx-10 sm:mx-0">
          <Label className="mx-2">End Time</Label>
          <DatePicker
            selected={newSlot.end}
            onChange={(date: Date | null) =>
              setNewSlot({ ...newSlot, end: date })
            }
            showTimeSelect
            minDate={startingTime}
            maxDate={endingTime}
            dateFormat="Pp"
            placeholderText="Slot end time"
            className="w-full p-2 rounded-md border"
          />
        </div>
      </div>

      <div>
        <Label>Seats</Label>
        <Input
          type="number"
          value={newSlot.seats || ""}
          placeholder="Number of seats"
          onChange={(e) =>
            setNewSlot({ ...newSlot, seats: Number(e.target.value) })
          }
        />
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleAddSlot}
        className="flex items-center gap-2"
      >
        <Plus size={16} />
        Add Slot
      </Button>

      {slots.length > 0 && (
        <div className="space-y-4">
          <Label>Added Slots</Label>
          {slots.map((slot, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 border rounded-lg"
            >
              <div className="flex-1">
                <p className="text-sm">Start: {slot.start?.toLocaleString()}</p>
                <p className="text-sm">End: {slot.end?.toLocaleString()}</p>
                <p className="text-sm">Seats: {slot.seats}</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleDeleteSlot(index)}
                className="text-red-500"
              >
                <Trash size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
