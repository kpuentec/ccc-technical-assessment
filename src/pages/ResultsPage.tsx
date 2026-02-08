import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import defaultPfp from "../assets/Default_pfp.jpg";
import axios from "axios";

export default function ResultsPage() {
  const navi = useNavigate();
  const loc = useLocation();
  const profName = loc.state?.name;
  const [prof, setProf] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [courseAvg, setCourseAvg] = useState<number | null>(null);
  const [showCourses, setShowCourses] = useState(false);
  const [openCourse, setOpenCourse] = useState<number | null>(null);

  const toLetter = (gpa: number) => {
    if (gpa >= 3.7) return "A";
    if (gpa >= 3.3) return "A-";
    if (gpa >= 3.0) return "B+";
    if (gpa >= 2.7) return "B";
    if (gpa >= 2.3) return "B-";
    if (gpa >= 2.0) return "C+";
    if (gpa >= 1.7) return "C";
    if (gpa >= 1.3) return "C-";
    if (gpa >= 1.0) return "D";
    return "F";
  };

  useEffect(() => {
    if (!profName)
        return;
    const fetchProf = async () => {
        try {
            const res = await axios.get("https://planetterp.com/api/v1/professor",
            { params: { name : profName}}
            ); 
            setProf(res.data);
        } catch (e) {
            console.error("Error fetching prof data", e);
        } finally {
            setLoading(false);
        }
    };
    fetchProf();
  }, [profName]);
  const handleCourseToggle = async (index: number, course: string) => {
    if (openCourse === index) {
        setOpenCourse(null);
        setCourseAvg(null);
        return;
    }
    setOpenCourse(index);
    setCourseAvg(null);
    try {
        const res = await axios.get(
        "https://planetterp.com/api/v1/course",
        { params: { name: course } }
        );
        setCourseAvg(res.data.average_gpa);
    } catch (e) {
        console.error("Error fetching course data", e);
    }
  };

  const getStars = (rating: number) => {
    const fullStars = Math.round(rating);
    return "⭐".repeat(fullStars);
  };

  if (loading || !prof) {
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
        </div>
    );
  }

  
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
            src={defaultPfp}
            alt="Professor"
            className="w-24 h-24 rounded-full border-4 border-[#E8F0FF] absolute -bottom-12"
            />
        </div>
        <div className="pt-16 pb-8 px-6 sm:px-8 lg:px-10 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            {prof.name}
            </h1>
            <p className="text-lg mb-6 text-black">
            {prof.average_rating.toFixed(1)} {getStars(prof.average_rating)}
            </p>
            <button
            onClick={() => setShowCourses(!showCourses)}
            className="w-full bg-[#DFDFDF] text-black px-4 py-3 rounded-lg hover:bg-[#E0E0E0] transition-shadow shadow mb-4"
            >
            {showCourses ? "Hide Courses Taught" : "Show Courses Taught"}
            </button>
            {showCourses && (
            <div className="text-left space-y-3">
                {prof.courses.map((course: string, index: number) => (
                <div key={`${course}-${index}`}>
                    <button
                    onClick={() => handleCourseToggle(index, course)}
                    className="w-full text-left text-black bg-[#F5F5F5] px-4 py-3 rounded-lg hover:bg-[#E0E0E0] transition-shadow shadow flex justify-between items-center"
                    >
                    {course}
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
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                    >
                    {openCourse === index &&
                        (courseAvg !== null ? (
                            <>
                                <p>Average GPA: {courseAvg.toFixed(2)}</p>
                                <p>Average Grade: {toLetter(courseAvg)}</p>
                            </>
                        ) : (
                         "Loading"))}
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
