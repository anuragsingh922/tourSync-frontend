import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

interface Accommodation {
  name: string;
  description: string;
  imageUrl: string;
  amenities: string[];
}

interface AccommodationSectionProps {
  accommodations: Accommodation[];
  setAccommodations: (accommodations: Accommodation[]) => void;
}

export const AccommodationSection = ({
  accommodations,
  setAccommodations,
}: AccommodationSectionProps) => {
  const handleAddAccommodation = () => {
    setAccommodations([
      ...accommodations,
      { name: "", description: "", imageUrl: "", amenities: [] },
    ]);
  };

  const handleRemoveAccommodation = (index: number) => {
    setAccommodations(accommodations.filter((_, i) => i !== index));
  };

  const updateAccommodation = (
    index: number,
    field: keyof Accommodation,
    value: string
  ) => {
    const newAccommodations = [...accommodations];

    const updatedAccommodation = { ...newAccommodations[index] };
    if (field === "amenities") {
      // Safely update the field
      updatedAccommodation[field] = value.split(",").map((item) => item.trim());
    } else {
      updatedAccommodation[field] = value;
    }

    // Replace the modified accommodation in the array
    newAccommodations[index] = updatedAccommodation;
    setAccommodations(newAccommodations);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-lg font-semibold">Accommodations</Label>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddAccommodation}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Accommodation
        </Button>
      </div>

      {accommodations.map((accommodation, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleRemoveAccommodation(index)}
              className="text-red-500"
            >
              <Trash size={16} />
            </Button>
          </div>
          <div>
            <Label>Hotel Name</Label>
            <Input
              value={accommodation.name}
              onChange={(e) =>
                updateAccommodation(index, "name", e.target.value)
              }
              placeholder="e.g., Grand Hotel Zermatterhof"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={accommodation.description}
              onChange={(e) =>
                updateAccommodation(index, "description", e.target.value)
              }
              placeholder="e.g., 5-star luxury hotel with stunning Matterhorn views"
            />
          </div>
          <div>
            <Label>Image URL</Label>
            <Input
              value={accommodation.imageUrl}
              onChange={(e) =>
                updateAccommodation(index, "imageUrl", e.target.value)
              }
              placeholder="Enter image URL"
            />
          </div>
          <div>
            <Label>Amenities (comma-separated)</Label>
            <Input
              value={accommodation.amenities.join(", ")}
              onChange={(e) =>
                updateAccommodation(index, "amenities", e.target.value)
              }
              placeholder="e.g., Spa, Fine Dining, Mountain View, Pool"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
