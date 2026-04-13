import { useState, useEffect } from "react";
import react from "react";
import Login from "./login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import Header from "./header";
import HeaderDown1 from "./headerDown1";
import HeaderDown2 from "./headerDown2";
import HeaderDown3 from "./headerDown3";
import HeaderDown4 from "./headerDown4";
import HeaderDown5 from "./headerDown5";
import HeaderDown6 from "./headerDown6";
import DoctorRegister from "./DoctorRegister";
import DoctorSearch from "./DoctorSearch";
import VideoHome from "./videoHome";
import VideoRoom from "./videoRoom";
import Booking from "./Booking";
import VideoConsult from "./videoConsult";
import AudioConsult from "./audioConsult";
import DoctorDashboard from "./DoctorDashboard";
import DoctorLogin from "./DoctorLogin";

import "./App.css";

function App() {
  const [view, setView] = useState("home");
  const [initSearch, setInitSearch] = useState("");
  const [activeRoomId, setActiveRoomId] = useState("");
  const [activeServiceType, setActiveServiceType] = useState("video");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Function to bridge the click from HeaderDown2 to DoctorSearch
  const handleCardClick = (specialtyName) => {
    setInitSearch(specialtyName);
    setView("DoctorSearch");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedDoctor = localStorage.getItem("doctorUser");
    if (savedDoctor) {
      // If a doctor is found in cache, send them to dashboard
      setView("DoctorDashboard");
    } else if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setView("home");
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor); // Store full doctor object for Booking
    setView("Booking");
  };

  return (
    <>
    <Header 
      view={view} 
      setView={setView} 
      setInitSearch={setInitSearch} 
      user={user} 
      setUser={setUser} 
    />
      {/* 1. HOME VIEW */}
      {view === "home" && (
        <>
          <HeaderDown1 setView={setView} />
          <HeaderDown2 setView={setView} handleSearch={handleCardClick} />
          <HeaderDown3 />
          <HeaderDown4 />
          <HeaderDown5 />
          <HeaderDown6 />
        </>
      )}
      {/* 2. AUTH VIEWS */}
      {view === "login" && <Login setView={setView} setUser={setUser}/>}
      {view === "register" && <Register setView={setView} />}
      {view === "ForgotPassword" && <ForgotPassword setView={setView} />}
      {/* 3. DOCTOR SEARCH VIEW (Now only appears once) */}
      {view === "DoctorSearch" && (
        <DoctorSearch
          setView={setView}
          initialTerm={initSearch}
          setInitSearch={setInitSearch}
          handleSelectDoctor={handleSelectDoctor}
          setServiceType={setActiveServiceType} // Pass this setter
        />
      )}
      {view === "VideoConsult" && (
        <VideoConsult
          setView={setView}
          initialTerm={initSearch}
          setInitSearch={setInitSearch}
          handleSelectDoctor={handleSelectDoctor}
          setServiceType={setActiveServiceType}
        />
      )}
      {view === "AudioConsult" && (
        <AudioConsult
          setView={setView}
          initialTerm={initSearch}
          setInitSearch={setInitSearch}
          handleSelectDoctor={handleSelectDoctor}
          setServiceType={setActiveServiceType}
        />
      )}
      {/* 4. DOCTOR REGISTRATION */}
      {view === "DoctorRegister" && <DoctorRegister setView={setView} />}
      {/* 5. BOOKING & VIDEO VIEWS */}
      {view === "Booking" && selectedDoctor && (
        <Booking
          doctor={selectedDoctor}
          setView={setView}
          serviceType={activeServiceType}
          setActiveRoomId={setActiveRoomId}
          setServiceType={setActiveServiceType}
        />
      )}
      {view === "video-home" && (
        <VideoHome setView={setView} setActiveRoomId={setActiveRoomId} />
      )}
      {view === "video-room" && (
        <VideoRoom
          setView={setView}
          roomId={activeRoomId}
          serviceType={activeServiceType} // Pass serviceType
        />
      )}
      {view === "DoctorDashboard" && (
        <DoctorDashboard
          setView={setView}
          setActiveRoomId={setActiveRoomId}
          setServiceType={setActiveServiceType}
        />
      )}
      {view === "DoctorLogin" && <DoctorLogin setView={setView} />}
    </>
  );
}

export default App;
