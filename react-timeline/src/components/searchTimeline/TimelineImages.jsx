import React from 'react';

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
