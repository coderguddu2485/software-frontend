import React from "react";

const Header = ({ view, setView, user, setUser }) => {
  // Check if a patient user (from props) or doctor user (from storage) is logged in
  const doctor = JSON.parse(localStorage.getItem("doctorUser"));
  const isLoggedIn = !!(user || doctor);

  const handleLogout = () => {
    // 1. Clear all authentication data
    localStorage.removeItem("user");
    localStorage.removeItem("doctorUser");
    
    // 2. Update global state immediately
    if (setUser) setUser(null);
    
    // 3. Redirect to home
    setView("home");
  };

  const getLinkStyle = (linkView) => {
    const baseStyle = "px-5 h-full flex items-center font-bold transition-all cursor-pointer ";
    const activeStyle = "text-[#28328c] border-b-4 border-[#28c1f2]";
    const inactiveStyle = "text-[#414146] hover:text-blue-900 border-b-4 border-transparent";
    return baseStyle + (view === linkView ? activeStyle : inactiveStyle);
  };

  const handleDoctorPortalClick = () => {
    const savedDoctor = localStorage.getItem("doctorUser");
    if (savedDoctor) {
      setView("DoctorDashboard");
    } else {
      setView("DoctorLogin");
    }
  };

  return (
    <nav className="flex items-center justify-between px-10 h-[72px] bg-white border-b border-gray-100 font-sans sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center">
        <div className="flex items-center cursor-pointer" onClick={() => setView("home")}>
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="mx-1 text-2xl font-black text-[#28328c]">MAYBA</span>
          <span className="w-2 h-2 rounded-full bg-sky-400"></span>
        </div>
      </div>

      {/* Middle: Navigation Links */}
      <div className="flex items-center h-full">
        <a onClick={() => setView("DoctorSearch")} className={getLinkStyle("DoctorSearch")}>
          Find Doctors
        </a>
        <a onClick={() => setView("VideoConsult")} className={getLinkStyle("VideoConsult")}>
          Video Consult
        </a>
        <a onClick={() => setView("AudioConsult")} className={getLinkStyle("AudioConsult")}>
          Audio Consult
        </a>
      </div>

      {/* Right: Utilities */}
      <div className="flex items-center space-x-6 text-sm font-medium text-[#414146]">
        <div className="flex items-center cursor-pointer">
          <span className="bg-[#28328c] text-[10px] text-white px-1.5 py-0.5 rounded-full font-bold mr-2">NEW</span>
          <span>Health Blog</span>
        </div>

        <button
          onClick={handleDoctorPortalClick}
          className={`flex items-center gap-2 px-4 py-2 rounded transition-all text-sm font-bold whitespace-nowrap ${
            view === "DoctorLogin" || view === "DoctorDashboard"
              ? "bg-[#28c1f2] text-white"
              : "bg-[#28328c] text-white hover:bg-blue-900"
          }`}
        >
          Doctor Portal
        </button>

        {/* DYNAMIC TOGGLE */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-50 border border-red-200 rounded text-red-600 font-bold hover:bg-red-100 transition-colors cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => setView("login")}
            className="px-4 py-2 border border-gray-300 rounded text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Login / Signup
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;