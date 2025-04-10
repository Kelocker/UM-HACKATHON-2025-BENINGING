import React from "react";

const ImagesBlog = ({ images, title }) => {
  return (
    <div className="p-4">
      <div className="text-start font-semibold mb-2">{title}</div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="bg-gray-100 h-32 rounded-lg">
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesBlog;
