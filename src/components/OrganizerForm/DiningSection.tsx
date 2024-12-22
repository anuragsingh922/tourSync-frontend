import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

interface DiningExperience {
  name: string;
  description: string;
  imageUrl: string;
}

interface DiningSectionProps {
  diningExperiences: DiningExperience[];
  setDiningExperiences: (experiences: DiningExperience[]) => void;
}

export const DiningSection = ({
  diningExperiences,
  setDiningExperiences,
}: DiningSectionProps) => {
  const handleAddExperience = () => {
    setDiningExperiences([
      ...diningExperiences,
      { name: "", description: "", imageUrl: "" },
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    setDiningExperiences(diningExperiences.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: keyof DiningExperience, value: string) => {
    const newExperiences = [...diningExperiences];
    newExperiences[index][field] = value;
    setDiningExperiences(newExperiences);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-lg font-semibold">Dining Experiences</Label>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddExperience}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Dining Experience
        </Button>
      </div>

      {diningExperiences.map((experience, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleRemoveExperience(index)}
              className="text-red-500"
            >
              <Trash size={16} />
            </Button>
          </div>
          <div>
            <Label>Experience Name</Label>
            <Input
              value={experience.name}
              onChange={(e) => updateExperience(index, "name", e.target.value)}
              placeholder="e.g., Alpine Cuisine Experience"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={experience.description}
              onChange={(e) => updateExperience(index, "description", e.target.value)}
              placeholder="e.g., Savor traditional Swiss dishes with a modern twist"
            />
          </div>
          <div>
            <Label>Image URL</Label>
            <Input
              value={experience.imageUrl}
              onChange={(e) => updateExperience(index, "imageUrl", e.target.value)}
              placeholder="Enter image URL"
            />
          </div>
        </div>
      ))}
    </div>
  );
};