import React, { useState, useRef, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft, FaPen } from 'react-icons/fa';

const blogs = [
  {
    id: 1,
    title: "How to Prepare for CAT",
    description: "Tips and strategies for acing the CAT exam",
  },
  {
    id: 2,
    title: "NEET Preparation Guide",
    description: "A complete guide for NEET aspirants",
  },
  {
    id: 3,
    title: "JEE Advanced Success Tips",
    description: "Expert advice for cracking JEE Advanced",
  },
  {
    id: 4,
    title: "How to Prepare for GATE",
    description: "A step-by-step preparation strategy for GATE",
  },
  {
    id: 5,
    title: "CLAT Preparation 101",
    description: "Essential tips for CLAT preparation",
  },
  {
    id: 6,
    title: "UPSC Civil Services Insights",
    description: "A guide to cracking the UPSC exam",
  },
];

export default function BlogsCarousel() {
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
        <h2 className="text-2xl font-bold">Our Blogs</h2>
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
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex-shrink-0 w-[300px] h-[250px] snap-start hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg relative"
            >
              {/* Icon Centered at the Top */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded-full">
                <FaPen className="text-2xl" />
              </div>
              {/* Center the content below the icon */}
              <div className="flex flex-col items-center justify-center h-full mt-12 p-4 overflow-hidden">
                <h3 className="font-semibold text-lg mb-1 text-center">{blog.title}</h3>
                <p className="text-sm text-gray-600 mb-2 text-center">{blog.description}</p>
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
