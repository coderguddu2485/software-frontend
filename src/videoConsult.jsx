import React, { useState, useEffect } from "react";

const VideoConsult = ({
  initialTerm,
  setInitSearch,
  setView,
  handleSelectDoctor,
  setServiceType,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialTerm || "");
  const [doctors, setDoctors] = useState([]);
  
  useEffect(() => {
    if (initialTerm) {
      setSearchTerm(initialTerm);
      handleSearch(initialTerm);
    }
  }, [initialTerm]);

  const handleSearch = async (value) => {
    setSearchTerm(value);

    if (value.length > 1) {
      try {
        // Appends ?type=video to ensure only doctors with a video price > 0 are returned
        const response = await fetch(
          `http://localhost:3000/doctors/${value}?type=video`,
        );
        const data = await response.json();

        if (response.ok) {
          setDoctors(data);
        } else {
          setDoctors([]);
        }
      } catch (error) {
        console.error("Search error:", error);
      }
    } else {
      setDoctors([]);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="bg-[#28328c] py-16 px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-white text-3xl font-bold mb-8">
            Book a Video Consultation
          </h1>

          <div className="flex bg-white rounded-lg shadow-2xl overflow-hidden h-16">
            <div className="flex items-center px-6 text-gray-400">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by problem (e.g., Fever, Skin)"
              className="flex-1 outline-none text-lg text-gray-700"
              value={searchTerm}
              onChange={(e) => {
                if (setInitSearch) setInitSearch("");
                handleSearch(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          {doctors.length > 0
            ? `Video Specialists for "${searchTerm}"`
            : "Find a Video Specialist"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center relative"
            >
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <span
                  className={`w-3 h-3 rounded-full ${
                    !doc.isOnline
                      ? "bg-gray-400"
                      : doc.isBusy
                        ? "bg-red-500"
                        : "bg-green-500 animate-pulse"
                  }`}
                ></span>
                <span
                  className={`text-xs font-bold ${
                    !doc.isOnline
                      ? "text-gray-500"
                      : doc.isBusy
                        ? "text-red-600"
                        : "text-green-600"
                  }`}
                >
                  {!doc.isOnline ? "OFFLINE" : doc.isBusy ? "BUSY" : "LIVE"}
                </span>
              </div>
              <div className="w-24 h-24 bg-blue-100 rounded-full mb-4 flex items-center justify-center">
                <span className="text-3xl text-blue-600 font-bold">
                  {doc.FullName.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {doc.FullName}
              </h3>
              <p className="text-cyan-600 font-medium mb-4">
                {doc.specialization}
              </p>

              <div className="w-full border-t pt-4 mt-auto flex justify-between items-center">
                <div className="text-left">
                  <p className="text-xs text-gray-500 uppercase">Video Fee</p>
                  <p className="text-sm font-bold text-gray-800">
                    ₹ {doc.priceVideo}
                  </p>
                </div>
                {/* Updated button to set service type before moving to Booking */}
                <button
                  disabled={!doc.isOnline || doc.isBusy}
                  onClick={() => handleSelectDoctor(doc)}
                  className={`px-4 py-2 rounded-lg font-bold transition-all ${
                    !doc.isOnline || doc.isBusy
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-cyan-500 text-white hover:bg-cyan-600"
                  }`}
                >
                  {doc.isBusy ? "In Call" : "Book Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoConsult;
