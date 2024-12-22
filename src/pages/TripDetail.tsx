import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { TripOverview } from "@/components/trips/TripOverview";
import { Accommodation } from "@/components/trips/Accommodation";
import { DiningHighlights } from "@/components/trips/DiningHighlights";
import { ImageGallery } from "@/components/trips/ImageGallery";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchTripDetails } from "@/store/slices/tripDetailsSlice";

const TripDetails = () => {
  const { tripID } = useParams();
  const dispatch = useAppDispatch();
  const scrollToContent = () => {
    const element = document.getElementById("trip-content");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const {
    tripDetails,
    status: {
      tripDetails: { loading: tripDetailLoading, error: tripDetailError },
    },
  } = useAppSelector((state) => state.tripDetails);

  console.log("Details : ", tripDetails, tripID);

  useEffect(() => {
    if (tripID) {
      dispatch(fetchTripDetails(tripID));
    }
  }, [dispatch, tripID]);

  if (tripDetailLoading) {
    return <div>Loading trip details...</div>;
  }
  if (tripDetailError) {
    return <div>Please try again later.</div>;
  }

  return (
    <div className="min-h-screen bg-white p-0 m-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-screen"
      >
        <div className="absolute inset-0">
          <img
            src={
              tripDetails?.tripImage ||
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e"
            }
            alt="Trip hero image"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm mb-4 inline-block">
              Featured Destination
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              {tripDetails?.tripName}
            </h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 animate-bounce"
            onClick={scrollToContent}
          >
            <ChevronDown className="h-8 w-8" />
          </Button>
        </motion.div>
      </motion.div>

      <div
        id="trip-content"
        className="max-w-7xl mx-auto px-4 py-16 space-y-20"
      >
        <TripOverview
          duration={tripDetails?.duration}
          location={tripDetails?.location}
          description={tripDetails?.description}
        />
        {tripDetails?.accommodations &&
          tripDetails?.accommodations.length > 0 && (
            <Accommodation accommodations={tripDetails?.accommodations} />
          )}
        {/* <DiningHighlights /> */}
        {tripDetails?.galleryCategories &&
          tripDetails?.galleryCategories.length > 0 && (
            <ImageGallery galleryCategories={tripDetails?.galleryCategories} />
          )}
      </div>
    </div>
  );
};

export default TripDetails;
