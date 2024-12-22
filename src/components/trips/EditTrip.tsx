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
import { SlotsSection } from "../OrganizerForm/SlotsSection";
import { AccommodationSection } from "../OrganizerForm/AccommodationSection";
import { DiningSection } from "../OrganizerForm/DiningSection";
import { ImageGallerySection } from "../OrganizerForm/ImageGallerySection";
import { BasicTripInfo } from "../OrganizerForm/BasicTripInfo";
import { Label } from "../ui/label";

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
  const [location, setLocation] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [tripImage, settripImage] = useState("");
  const [duration, setDuration] = useState("");

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
      setSlots(trip.slots || []);
      settripImage(trip?.tripImage);
      setLocation(trip?.location);
      setGroupSize(trip?.groupSize);
      setDuration(trip?.duration);
      setGalleryCategories(trip?.galleryCategories);
      setAccommodations(trip?.accommodations);
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
      tripImage,
      slots,
      location,
      duration,
      groupSize,
      tripID,
      accommodations,
      galleryCategories,
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
      <Input
        value={tripImage}
        placeholder="Trip Image"
        onChange={(e) => settripImage(e.target.value)}
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
      {/* Display Added Slots */}
      {startingTime && endingTime && (
        <SlotsSection
          slots={slots}
          setSlots={setSlots}
          startingTime={startingTime}
          endingTime={endingTime}
        />
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
        Update Trip
      </Button>
    </div>
  );
};

export default EditTrip;
