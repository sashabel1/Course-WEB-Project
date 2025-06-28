import React from 'react';

/**
 * TimelineImages component displays a responsive grid of images.
 * 
 * Props:
 * - images: array of image objects with `src` and `alt` properties
 * 
 * Behavior:
 * - Returns null if no images are provided or the array is empty
 * - Displays images in a responsive grid with consistent aspect ratio (3:2)
 * - Each image is centered, cropped, and fills its container
 */


const TimelineImages = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[60px] p-5 mt-5 rounded-lg bg-transparent">
      {images.map((image, index) => (
        <div
          key={index}
          className="aspect-[3/2] flex flex-col items-center text-center rounded-lg overflow-hidden"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full aspect-[3/2] object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default TimelineImages;
