import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // basic Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
// import SwiperCore from "swiper";
// SwiperCore.use([Navigation, Pagination]);

const ImageSwiper = ({ images, title }) => {
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
            <div className="bg-gray-100 h-32 rounded-md">
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
