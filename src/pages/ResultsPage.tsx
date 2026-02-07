import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import defaultPfp from "../assets/Default_pfp.jpg";

export default function ResultsPage() {
  const navi = useNavigate();
  const loc = useLocation();
  const profName = loc.state?.profName || "Professor Name";
  const [prof] = useState({
    name: profName,
    rating: 4.0,
    image: defaultPfp,
    courses: [
      { name: "Course1", avg: "B-" },
      { name: "Course2", avg: "A-" },
      { name: "Course3", avg: "C+" },
    ],
  });

  const [showCourses, setShowCourses] = useState(false);
  const [openCourse, setOpenCourse] = useState<number | null>(null);
  const handleCourseToggle = (index: number) => {
    setOpenCourse(openCourse === index ? null : index);
  };

  const getStars = (rating: number) => {
    const fullStars = Math.round(rating);
    return "⭐".repeat(fullStars);
  };

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col items-center px-4 py-8 font-sans">
      <button
        onClick={() => navi("/")}
        className="self-start mb-6 bg-[#F5F1FF] text-gray-800 py-2 px-4 rounded-lg hover:bg-[#C8B5FF] transition-shadow shadow"
      >
        ← Back
      </button>
      <div className="w-[432px] md:w-[614px] lg:w-[720px] max-w-[1024px] bg-[#E8F0FF] rounded-2xl shadow-lg overflow-hidden">
        <div className="relative h-32 bg-blue-100 flex justify-center items-end">
          <img
            src={prof.image}
            alt="Professor"
            className="w-24 h-24 rounded-full border-4 border-[#E8F0FF] absolute -bottom-12"
          />
        </div>
        <div className="pt-16 pb-8 px-6 sm:px-8 lg:px-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            {prof.name}
          </h1>
          <p className="text-lg mb-6 text-black">
            {prof.rating.toFixed(1)} {getStars(prof.rating)}
          </p>
          <button
            onClick={() => setShowCourses(!showCourses)}
            className="w-full bg-[#DFDFDF] text-black px-4 py-3 rounded-lg hover:bg-[#E0E0E0] transition-shadow shadow mb-4"
          >
            {showCourses ? "Hide Courses Taught" : "Show Courses Taught"}
          </button>
          {showCourses && (
            <div className="text-left space-y-3">
              {prof.courses.map((course, index) => (
                <div key={index}>
                  <button
                    onClick={() => handleCourseToggle(index)}
                    className="w-full text-left text-black bg-[#F5F5F5] px-4 py-3 rounded-lg hover:bg-[#E0E0E0] transition-shadow shadow flex justify-between items-center"
                  >
                    {course.name}
                    <span
                      className={`transition-transform duration-300 ${
                        openCourse === index ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`ml-4 mt-2 text-black bg-[#F5F1FF] px-4 py-2 rounded-lg shadow overflow-hidden transition-all duration-300 ${
                      openCourse === index
                        ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    Average Grade: {course.avg}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
