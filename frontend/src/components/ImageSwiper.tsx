import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // basic Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
// import SwiperCore from "swiper";
// SwiperCore.use([Navigation, Pagination]);

const ImageSwiper = ({ images, title }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="text-start font-semibold mb-2">{title}</div>
      <Swiper
        spaceBetween={20}
        slidesPerView={1.5}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="bg-gray-100 rounded-lg cursor-pointer aspect-[4/2] width-full h-auto"
              onClick={() =>
                navigate("/aibot", {
                  state: { code: image.code },
                })
              }
            >
              <img
                src={image.src}
                className="h-full w-full object-cover rounded-md"
                alt={image.alt}
              />
              <div className="text-center mt-2">{image.code}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
