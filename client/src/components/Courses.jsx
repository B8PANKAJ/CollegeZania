import React, { useState, useRef, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft, FaGraduationCap } from 'react-icons/fa';

const courses = [
  {
    id: 1,
    name: "CAT",
    description: "Common Admission Test for MBA programs",
    syllabus: "Management, Quantitative Ability, Data Interpretation",
  },
  {
    id: 2,
    name: "NEET",
    description: "National Eligibility cum Entrance Test for Medical",
    syllabus: "Physics, Chemistry, Biology",
  },
  {
    id: 3,
    name: "JEE",
    description: "Joint Entrance Examination for Engineering colleges",
    syllabus: "Mathematics, Physics, Chemistry",
  },
  {
    id: 4,
    name: "GATE",
    description: "Graduate Aptitude Test in Engineering",
    syllabus: "Engineering, Mathematics, General Aptitude",
  },
  {
    id: 5,
    name: "CLAT",
    description: "Common Law Admission Test for Law Schools",
    syllabus: "English, Logical Reasoning, Legal Aptitude",
  },
  {
    id: 6,
    name: "UPSC",
    description: "Union Public Service Commission Exam for Civil Services",
    syllabus: "General Studies, Current Affairs, Essay Writing",
  },
];

export default function CoursesCarousel() {
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
        <h2 className="text-2xl font-bold">Popular Courses</h2>
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
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex-shrink-0 w-[300px] h-[250px] snap-start hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg relative"
            >
              {/* Icon Centered at the Top */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded-full">
                <FaGraduationCap className="text-2xl" />
              </div>
              {/* Center the content below the icon */}
              <div className="flex flex-col items-center justify-center h-full mt-12 p-4 overflow-hidden">
                <h3 className="font-semibold text-lg mb-1 text-center">{course.name}</h3>
                <p className="text-sm text-gray-600 mb-2 text-center">{course.description}</p>
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-medium text-gray-600">{course.syllabus}</span>
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
