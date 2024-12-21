import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const TripDetails = () => {
  const { tripID } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tripData, setTripData] = useState<any | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Replace with your actual API endpoint
        const data = {
          name: "Luxury Paris Getaway",
          location: "Paris, France",
          duration: "5 days, 4 nights",
          description:
            "Explore the romantic city of Paris with luxury stays and guided tours.",
          images: {
            hotel: [
              "https://via.placeholder.com/150/0000FF",
              "https://via.placeholder.com/150/FF0000",
            ],
            transport: [
              "https://via.placeholder.com/150/00FF00",
              "https://via.placeholder.com/150/FFFF00",
            ],
            meals: ["https://via.placeholder.com/150/FFFFFF"],
            sights: [
              "https://via.placeholder.com/150/000000",
              "https://via.placeholder.com/150/808080",
            ],
          },
          baseFare: 500,
          tax: 50,
          coupons: ["10% OFF", "HOLIDAY50"],
          isBooked: false,
          refundAmount: 300,
        };
        setTripData(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [tripID]);

  const handleBookTrip = () => {
    toast({
      title: "Trip Booked",
      description: `You have successfully booked the trip to ${tripData?.location}.`,
      variant: "default",
    });
  };

  const handleCancelTrip = () => {
    toast({
      title: "Trip Canceled",
      description: `Your trip to ${tripData?.location} has been canceled.`,
      variant: "destructive",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Progress
          value={100}
          className="w-full h-2 bg-gray-200 rounded-full relative"
          style={{ height: "4px" }}
        >
          <Progress.Bar
            style={{
              width: "100%",
              backgroundColor: "#1D4ED8",
              height: "100%",
              borderRadius: "4px",
            }}
          />
        </Progress>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!tripData) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-500">No trip details found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800">
            {tripData.name}
          </CardTitle>
          <p className="text-sm text-gray-500">{tripData.location}</p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Duration & Description */}
          <div className="space-y-4">
            <Badge className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Duration: {tripData.duration}
            </Badge>
            <p className="text-gray-700 text-lg">{tripData.description}</p>
          </div>

          {/* Image Gallery */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700">Gallery</h3>
            {Object.keys(tripData.images).map((category) => (
              <div key={category} className="space-y-4">
                <h4 className="text-lg font-medium text-gray-800 capitalize">
                  {category}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {tripData.images[category].map(
                    (url: string, index: number) => (
                      <img
                        key={index}
                        src={url}
                        alt={`${category}-${index}`}
                        className="w-full h-40 object-cover rounded-lg shadow-md"
                      />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Pricing Details
            </h3>
            <div className="grid grid-cols-2 gap-6 text-gray-800">
              <div>
                <p className="text-base">Base Fare:</p>
                <p className="text-xl font-medium">
                  ${tripData.baseFare.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-base">Tax:</p>
                <p className="text-xl font-medium">
                  ${tripData.tax.toFixed(2)}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-base font-semibold">Total:</p>
                <p className="text-2xl font-bold">
                  ${(tripData.baseFare + tripData.tax).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Coupons */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Available Coupons
            </h3>
            {tripData.coupons.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {tripData.coupons.map((coupon: string, index: number) => (
                  <Badge
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {coupon}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No coupons available for this trip.
              </p>
            )}
          </div>

          {/* Booking Actions */}
          <div className="text-center">
            {!tripData.isBooked ? (
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                onClick={handleBookTrip}
              >
                Book This Trip
              </Button>
            ) : (
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  Refund Amount:{" "}
                  <span className="font-bold">
                    ${tripData.refundAmount?.toFixed(2)}
                  </span>
                </p>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                  onClick={handleCancelTrip}
                >
                  Cancel Trip
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TripDetails;
