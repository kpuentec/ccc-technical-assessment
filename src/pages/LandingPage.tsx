import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [name, setName] = useState("");
  const navi = useNavigate();

  const handleSearch = () => {
    if (!name.trim()) return;

    navi("/results", {
      state: { name },
    });
  };

  return (
    <div className="min-h-screen w-screen bg-white flex items-center justify-center">
      <div
        className="w-[432px] md:w-[614px] lg:w-[720px]
          max-w-[1024px] bg-[#E8F0FF] rounded-2xl shadow-lg
          p-6 sm:p-8 lg:p-10"
      >
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Professor Lookup
        </h1>
        <input
          type="text"
          placeholder="Enter professor name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-[#F5F5F5] border border-gray-300
            rounded-lg px-4 py-3 text-lg text-black
            focus:outline-none focus:ring-2 focus:ring-blue-500
            mb-5 shadow"
        />

        <button
          onClick={handleSearch}
          className="w-full bg-[#F5F1FF] text-gray-800 text-lg
            py-3 rounded-lg hover:bg-[#C8B5FF] transition-colors
            shadow"
        >
          Search
        </button>
      </div>
    </div>
  );
}
