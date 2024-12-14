import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Coursal.css"; // Custom CSS for styling the Swiper component

// import required modules
import { FreeMode, Pagination, Navigation } from "swiper/modules";

export default function Coursal() {
  return (
    <div className="coursal-container">
      <Swiper
        slidesPerView={3} // Set how many slides to show at once
        spaceBetween={30} // Set space between slides
        freeMode={true} // Enable free mode (slides can be scrolled freely)
        pagination={{
          clickable: true, // Enable clickable pagination
        }}
        navigation={true} // Enable navigation arrows
        autoplay={{
          delay: 1500, // Slide change interval in milliseconds
          disableOnInteraction: false, // Autoplay does not stop after user interaction
        }}
        modules={[FreeMode, Pagination, Navigation]} // Enable FreeMode, Pagination, and Navigation modules
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <img
            src="https://via.placeholder.com/400x300?text=Slide+1"
            alt="Slide 1"
          />
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <img
            src="https://via.placeholder.com/400x300?text=Slide+2"
            alt="Slide 2"
          />
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <img
            src="https://via.placeholder.com/400x300?text=Slide+3"
            alt="Slide 3"
          />
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <img
            src="https://via.placeholder.com/400x300?text=Slide+4"
            alt="Slide 4"
          />
        </SwiperSlide>

        {/* Slide 5 */}
        <SwiperSlide>
          <img
            src="https://via.placeholder.com/400x300?text=Slide+5"
            alt="Slide 5"
          />
        </SwiperSlide>

        {/* Slide 6 */}
        <SwiperSlide>
          <img
            src="https://via.placeholder.com/400x300?text=Slide+6"
            alt="Slide 6"
          />
        </SwiperSlide>

        {/* Slide 7 */}
        <SwiperSlide>
          <img
            src="https://via.placeholder.com/400x300?text=Slide+7"
            alt="Slide 7"
          />
        </SwiperSlide>

        {/* Slide 8 */}
        <SwiperSlide>
          <img
            src="https://via.placeholder.com/400x300?text=Slide+8"
            alt="Slide 8"
          />
        </SwiperSlide>

        {/* Slide 9 */}
        <SwiperSlide>
          <img
            src="https://via.placeholder.com/400x300?text=Slide+9"
            alt="Slide 9"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
