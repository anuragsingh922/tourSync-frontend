import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { postTrip } from "@/store/slices/tripSlice";
import { useNavigate } from "react-router-dom";
import { BasicTripInfo } from "@/components/OrganizerForm/BasicTripInfo";
import { TripDetailsSection } from "@/components/OrganizerForm/TripDetailsSection";
import { AccommodationSection } from "@/components/OrganizerForm/AccommodationSection";
import { DiningSection } from "@/components/OrganizerForm/DiningSection";
import { ImageGallerySection } from "@/components/OrganizerForm/ImageGallerySection";
import { SlotsSection } from "@/components/OrganizerForm/SlotsSection";

interface Slot {
  start: Date | null;
  end: Date | null;
  seats: number;
}

interface Accommodation {
  name: string;
  description: string;
  imageUrl: string;
  amenities: string[];
}

interface DiningExperience {
  name: string;
  description: string;
  imageUrl: string;
}

interface GalleryCategory {
  title: string;
  images: { url: string; alt: string }[];
}

const OrganizerForm = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Basic trip info
  const [tripName, setTripName] = useState("");
  const [description, setDescription] = useState("");
  const [tripImage, settripImage] = useState("");
  const [price, setPrice] = useState("");
  const [startingTime, setStartingTime] = useState<Date | null>(null);
  const [endingTime, setEndingTime] = useState<Date | null>(null);

  // Trip details
  const [location, setLocation] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [duration, setDuration] = useState("");

  // Slots
  const [slots, setSlots] = useState<Slot[]>([]);

  // Accommodations
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  // Dining experiences
  const [diningExperiences, setDiningExperiences] = useState<
    DiningExperience[]
  >([]);

  // Gallery categories
  const [galleryCategories, setGalleryCategories] = useState<GalleryCategory[]>(
    [
      { title: "Accommodation", images: [] },
      { title: "Dining", images: [] },
      { title: "Transportation", images: [] },
      { title: "Activities", images: [] },
    ]
  );

  const handleAddTrip = () => {
    // console.log({
    //   tripName,
    //   description,
    //   tripImage,
    //   price,
    //   startingTime,
    //   endingTime,
    //   location,
    //   groupSize,
    //   bestTime,
    //   duration,
    //   slots,
    //   accommodations,
    //   diningExperiences,
    //   galleryCategories,
    // });
    if (
      !tripName.trim() ||
      !description.trim() ||
      !price.trim() ||
      !location.trim()
    ) {
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
      tripImage,
      startingTime,
      endingTime,
      location,
      groupSize,
      bestTime,
      duration,
      slots,
      accommodations,
      galleryCategories,
    };

    dispatch(postTrip(tripObj));

    toast({
      title: "Trip Added",
      description: "Your trip has been successfully added.",
    });

    navigate("/manage-trips");
  };

  return (
    <div className="space-y-8 p-5">
      <div className="space-y-6">
        <BasicTripInfo
          tripName={tripName}
          setTripName={setTripName}
          description={description}
          setDescription={setDescription}
          tripImage={tripImage}
          settripImage={settripImage}
          price={price}
          setPrice={setPrice}
          startingTime={startingTime}
          setStartingTime={setStartingTime}
          endingTime={endingTime}
          setEndingTime={setEndingTime}
        />

        <TripDetailsSection
          location={location}
          setLocation={setLocation}
          groupSize={groupSize}
          setGroupSize={setGroupSize}
          bestTime={bestTime}
          setBestTime={setBestTime}
          duration={duration}
          setDuration={setDuration}
        />

        {startingTime && endingTime && (
          <SlotsSection slots={slots} setSlots={setSlots} startingTime={startingTime} endingTime={endingTime} />
        )}

        <AccommodationSection
          accommodations={accommodations}
          setAccommodations={setAccommodations}
        />

        {/* <DiningSection
          diningExperiences={diningExperiences}
          setDiningExperiences={setDiningExperiences}
        /> */}

        <ImageGallerySection
          categories={galleryCategories}
          setCategories={setGalleryCategories}
        />

        <Button onClick={handleAddTrip} className="w-full">
          Add Trip
        </Button>
      </div>
    </div>
  );
};

export default OrganizerForm;
