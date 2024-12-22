import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export const Accommodation = ({ accommodations: hotels }) => {
  const defaulthotels = [
    {
      name: "Grand Hotel Zermatterhof",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      description: "5-star luxury hotel with stunning Matterhorn views",
      amenities: ["Spa", "Fine Dining", "Mountain View", "Pool"],
    },
  ];
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div className="text-center">
        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 mb-4 inline-block">
          Where You'll Stay
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Luxury Accommodations
        </h2>
      </div>
      <div className="grid gap-8">
        {hotels.map((hotel, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-64 md:h-full">
                <img
                  src={hotel.imageUrl || defaulthotels[0].image}
                  alt={hotel.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {hotel.name}
                </h3>
                <p className="text-gray-600">{hotel.description}</p>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity, i) => {
                    if (!amenity) return;
                    return (
                      <Badge key={i} variant="secondary">
                        {amenity}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};
