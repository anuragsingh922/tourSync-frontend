import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export const ImageGallery = ({ galleryCategories: categories }) => {
  const cdefaultategories = [
    {
      title: "Accommodation",
      images: [
        {
          url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          alt: "Luxury hotel room",
        },
        {
          url: "https://images.unsplash.com/photo-1582719508461-905c673771fd",
          alt: "Hotel exterior",
        },
      ],
    },
    {
      title: "Dining",
      images: [
        {
          url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          alt: "Swiss cuisine",
        },
        {
          url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
          alt: "Fine dining restaurant",
        },
      ],
    },
    {
      title: "Transportation",
      images: [
        {
          url: "https://images.unsplash.com/photo-1545158535-c3f7168c28b6",
          alt: "Swiss train through mountains",
        },
        {
          url: "https://images.unsplash.com/photo-1468818438311-4bab781ab9b8",
          alt: "Cable car in Alps",
        },
      ],
    },
    {
      title: "Activities",
      images: [
        {
          url: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
          alt: "Hiking in Swiss Alps",
        },
        {
          url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
          alt: "Winter sports",
        },
      ],
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-12"
    >
      <div className="text-center">
        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 mb-4 inline-block">
          Photo Gallery
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Experience Preview
        </h2>
      </div>

      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          {/* Category Title */}
          <h3 className="text-2xl font-semibold text-gray-800 text-center">
            {category.title}
          </h3>

          {/* Images Layout */}
          <div className="flex flex-wrap gap-4 justify-center">
            {category.images.map((image, imageIndex) => (
              <motion.div
                key={imageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: imageIndex * 0.1 }}
                viewport={{ once: true }}
                className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)]"
              >
                <Card className="overflow-hidden group cursor-pointer">
                  {/* Image Wrapper */}
                  <div className="relative aspect-video min-h-72 min-w-96">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </motion.section>
  );
};
