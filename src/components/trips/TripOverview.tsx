import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
export const TripOverview = ({ description, location, duration }) => {
  const details = [
    { icon: Calendar, label: "Duration", value: `${duration} Days` },
    { icon: MapPin, label: "Location", value: location },
    { icon: MapPin, description: "Description", value: description },
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
          Trip Overview
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Essential Details
        </h2>
      </div>
      <div className="flex items-centre justify-evenly gap-6">
        {details.slice(0, 2).map((detail, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-lg transition-shadow w-96"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-gray-50 rounded-full">
                <detail.icon className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{detail.label}</p>
                <p className="text-lg font-semibold text-gray-900">
                  {detail.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};
