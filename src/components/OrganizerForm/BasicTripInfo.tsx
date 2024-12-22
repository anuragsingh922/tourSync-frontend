import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";

interface BasicTripInfoProps {
  tripName: string;
  setTripName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  startingTime: Date | null;
  setStartingTime: (date: Date | null) => void;
  endingTime: Date | null;
  setEndingTime: (date: Date | null) => void;
  tripImage: string;
  settripImage: (value: string) => void;
}

export const BasicTripInfo = ({
  tripName,
  setTripName,
  description,
  setDescription,
  tripImage,
  settripImage,
  price,
  setPrice,
  startingTime,
  setStartingTime,
  endingTime,
  setEndingTime,
}: BasicTripInfoProps) => {
  const now = new Date();

  return (
    <div className="space-y-4">
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
        value={tripImage}
        placeholder="Trip Image Url"
        onChange={(e) => settripImage(e.target.value)}
      />
      <Input
        value={price}
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mx-10">
          <label className="block font-medium mb-2">
            Starting Date and Time
          </label>
          <DatePicker
            selected={startingTime}
            onChange={(date: Date | null) => setStartingTime(date)}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Select starting time"
            minDate={now}
          />
        </div>
        <div className="mx-10 sm:mx-0">
          <label className="block font-medium mb-2">Ending Date and Time</label>
          <DatePicker
            selected={endingTime}
            onChange={(date: Date | null) => setEndingTime(date)}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Select ending time"
            minDate={startingTime}
          />
        </div>
      </div>
    </div>
  );
};
