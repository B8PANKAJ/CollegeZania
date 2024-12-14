import React, { useState, useRef, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft, FaBuilding } from 'react-icons/fa';

const colleges = [
  {
    id: 1,
    name: "IIT Delhi",
    location: "New Delhi",
    rating: 9.1,
    fees: "₹2.11 Lakhs",
  },
  {
    id: 2,
    name: "University of Delhi",
    location: "New Delhi",
    rating: 8.9,
    fees: "₹1.95 Lakhs",
  },
  {
    id: 3,
    name: "Jawaharlal Nehru University",
    location: "New Delhi",
    rating: 8.8,
    fees: "₹2.05 Lakhs",
  },
  {
    id: 4,
    name: "IIT Bombay",
    location: "Mumbai",
    rating: 9.2,
    fees: "₹2.15 Lakhs",
  },
  {
    id: 5,
    name: "Anna University",
    location: "Chennai",
    rating: 8.7,
    fees: "₹1.85 Lakhs",
  },
  {
    id: 6,
    name: "Banaras Hindu University",
    location: "Varanasi",
    rating: 8.6,
    fees: "₹1.75 Lakhs",
  },
];

export default function CollegeCarousel() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);

  const handleScroll = (direction) => {
    const container = carouselRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      const handleScrollEvent = () => {
        setScrollPosition(container.scrollLeft);
      };
      container.addEventListener('scroll', handleScrollEvent);
      return () => container.removeEventListener('scroll', handleScrollEvent);
    }
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Top Colleges</h2>
        <a href="#" className="text-blue-600 hover:underline">
          View All
        </a>
      </div>
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {colleges.map((college) => (
            <div
              key={college.id}
              className="flex-shrink-0 w-[300px] h-[180px] snap-start hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg relative"
            >
              {/* Icon Centered at the Top */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded-full">
                <FaBuilding className="text-2xl" />
              </div>
              {/* Center the content below the icon */}
              <div className="flex flex-col items-center justify-center h-full mt-12 p-4">
                <h3 className="font-semibold text-lg mb-1 text-center">{college.name}</h3>
                <p className="text-sm text-gray-600 mb-2 text-center">{college.location}</p>
                <div className="flex justify-between items-center w-full">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {college.rating}/10
                  </span>
                  <span className="text-sm font-medium">{college.fees}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full"
          onClick={() => handleScroll('left')}
          disabled={scrollPosition === 0}
        >
          <FaArrowLeft className="h-4 w-4" />
        </button>
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full"
          onClick={() => handleScroll('right')}
          disabled={
            carouselRef.current &&
            scrollPosition >=
              carouselRef.current.scrollWidth - carouselRef.current.clientWidth
          }
        >
          <FaArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
