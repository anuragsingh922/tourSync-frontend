import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
export const DiningHighlights = () => {
  const dining = [
    {
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      name: "Alpine Cuisine Experience",
      description: "Savor traditional Swiss dishes with a modern twist",
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
          Culinary Journey
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Dining Highlights</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {dining.map((item, index) => (
          <Card key={index} className="overflow-hidden group">
            <div className="relative h-64">
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-sm text-gray-200">{item.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};