import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

interface GalleryCategory {
  title: string;
  images: { url: string; alt: string }[];
}

interface ImageGallerySectionProps {
  categories: GalleryCategory[];
  setCategories: (categories: GalleryCategory[]) => void;
}

export const ImageGallerySection = ({
  categories,
  setCategories,
}: ImageGallerySectionProps) => {
  const handleAddImage = (categoryIndex: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].images.push({ url: "", alt: "" });
    setCategories(newCategories);
  };

  const handleRemoveImage = (categoryIndex: number, imageIndex: number) => {
    // Create a shallow copy of the categories array
    const newCategories = [...categories];

    // Create a shallow copy of the images array in the target category
    const updatedImages = newCategories[categoryIndex].images.filter(
      (_, i) => i !== imageIndex
    );

    // Update the images in the specific category
    newCategories[categoryIndex] = {
      ...newCategories[categoryIndex],
      images: updatedImages,
    };

    // Update the state
    setCategories(newCategories);
  };

  const updateImage = (
    categoryIndex: number,
    imageIndex: number,
    field: "url" | "alt",
    value: string
  ) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].images[imageIndex][field] = value;
    setCategories(newCategories);
  };

  return (
    <div className="space-y-6">
      <Label className="text-lg font-semibold">Photo Gallery</Label>
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>{category.title}</Label>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleAddImage(categoryIndex)}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Add Image
            </Button>
          </div>
          {category.images.map((image, imageIndex) => (
            <div key={imageIndex} className="flex gap-4 items-start">
              <div className="flex-1 space-y-2">
                <Input
                  value={image.url}
                  onChange={(e) =>
                    updateImage(
                      categoryIndex,
                      imageIndex,
                      "url",
                      e.target.value
                    )
                  }
                  placeholder="Image URL"
                />
                <Input
                  value={image.alt}
                  onChange={(e) =>
                    updateImage(
                      categoryIndex,
                      imageIndex,
                      "alt",
                      e.target.value
                    )
                  }
                  placeholder="Image description"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleRemoveImage(categoryIndex, imageIndex)}
                className="text-red-500"
              >
                <Trash size={16} />
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
