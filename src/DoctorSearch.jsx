import React, { useState, useEffect } from "react";

const DoctorSearch = ({
  initialTerm,
  setInitSearch,
  setView, 
  handleSelectDoctor,
}) => {
  // Initialize searchTerm with initialTerm if it exists
  const [searchTerm, setSearchTerm] = useState(initialTerm || "");
  const [doctors, setDoctors] = useState([]);

  // EFFECT: Automatically search if a term is passed from App.jsx (e.g., from a card click)
  useEffect(() => {
    if (initialTerm) {
      setSearchTerm(initialTerm);
      handleSearch(initialTerm);
    }
  }, [initialTerm]);

  useEffect(() => {
  let interval;
  
  // Only start polling if there is a search term and results
  if (searchTerm && doctors.length > 0) {
    interval = setInterval(() => {
      handleSearch(); // Re-fetches the doctor list to get updated isBusy status
    }, 5000); // Refresh every 10 seconds
  }

  return () => clearInterval(interval); // Cleanup on unmount or searchTerm change
}, [searchTerm, doctors.length]);

  const handleSearch = async (manualValue) => {
    // Determine the search term: use the passed value or the current state
    const termToSearch = manualValue !== undefined ? manualValue : searchTerm;
    
    if (manualValue !== undefined) {
      setSearchTerm(manualValue);
    }

    if (termToSearch.length > 1) {
      try {
        const response = await fetch(`http://localhost:3000/doctors/${termToSearch}`);
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
      {/* Search Section */}
      <div className="bg-[#28328c] py-16 px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-white text-3xl font-bold mb-8">
            Find and Book a Consultation
          </h1>

          {/* Single Problem Search Bar */}
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
              placeholder="Enter your problem (e.g., Bone, Fever, Skin, Heart)"
              className="flex-1 outline-none text-lg text-gray-700"
              value={searchTerm}
              onChange={(e) => {
                // Clear the initSearch in App.jsx when user starts typing manually
                if (setInitSearch) setInitSearch("");
                handleSearch(e.target.value);
              }}
            />
          </div>

          <div className="mt-4 flex justify-center gap-4 text-white text-sm opacity-90">
            <span>Common problems:</span>
            <button
              onClick={() => handleSearch("Bone")}
              className="underline hover:text-cyan-300"
            >
              Bone
            </button>
            <button
              onClick={() => handleSearch("Skin")}
              className="underline hover:text-cyan-300"
            >
              Skin
            </button>
            <button
              onClick={() => handleSearch("Heart")}
              className="underline hover:text-cyan-300"
            >
              Heart
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          {doctors.length > 0
            ? `Doctors found for "${searchTerm}"`
            : "Search for a specialist"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col items-center text-center"
            >
              {/* // icon for the doctor status */}
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
                  <p className="text-xs text-gray-500 uppercase">
                    Consultation Fee
                  </p>
                  {doc.priceAudio && (
                    <p className="text-sm font-bold text-gray-800">
                      Audio - ₹ {doc.priceAudio}
                    </p>
                  )}
                  {doc.priceVideo && (
                    <p className="text-sm font-bold text-gray-800">
                      Video - ₹ {doc.priceVideo}
                    </p>
                  )}
                </div>
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

        {searchTerm.length > 1 && doctors.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">
              No specialists found for this problem yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSearch;
