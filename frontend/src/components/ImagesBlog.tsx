import React from "react";
import { useNavigate } from "react-router-dom";

const ImagesBlog = ({ images, title }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="text-start font-semibold mb-2">{title}</div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg cursor-pointer aspect-[4/2] width-full h-auto"
            onClick={() =>
              navigate("/aibot", {
                state: { code: image.code },
              })
            }
          >
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
