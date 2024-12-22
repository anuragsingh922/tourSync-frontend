import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TripDetailsSectionProps {
  location: string;
  setLocation: (value: string) => void;
  groupSize: string;
  setGroupSize: (value: string) => void;
  bestTime: string;
  setBestTime: (value: string) => void;
  duration: string;
  setDuration: (value: string) => void;
}

export const TripDetailsSection = ({
  location,
  setLocation,
  groupSize,
  setGroupSize,
  bestTime,
  setBestTime,
  duration,
  setDuration,
}: TripDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Location</Label>
        <Input
          value={location}
          placeholder="e.g., Zermatt, Switzerland"
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <Label>Group Size</Label>
        <Input
          value={groupSize}
          placeholder="e.g., 2-8 People"
          onChange={(e) => setGroupSize(e.target.value)}
        />
      </div>
      <div>
        <Label>Duration</Label>
        <Input
          value={duration}
          placeholder="e.g., 7 Days"
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
    </div>
  );
};
