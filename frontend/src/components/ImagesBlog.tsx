import React from "react";
import { useNavigate } from "react-router-dom";

const ImagesBlog = ({ images, title, Icon, iconColor }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="text-start flex font-semibold mb-2">
        <Icon className={iconColor} />

        {title}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index}>
            <div
              className="relative bg-gray-100 rounded-lg cursor-pointer aspect-[4/2] w-full h-auto overflow-hidden"
              onClick={() =>
                navigate("/aibot", {
                  state: { code: image.code, title: image.title },
                })
              }
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover rounded-lg"
              />

              <div className="absolute bottom-0 left-0 w-full backdrop-blur-sm bg-white/30 p-2">
                <span className="text-white text-xs font-bold leading-snug block">
                  {image.title}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesBlog;
