import React, { useState, useEffect } from 'react';
import DoctorSearch from './DoctorSearch';
const HeaderDown1 = ({setView}) => {
  const [onlineCount, setOnlineCount] = useState(0);

 useEffect(() => {
    const fetchOnlineCount = async () => {
      try {
        // Ensure this URL matches your backend route exactly
        const response = await fetch('http://localhost:3000/online-doctors-count'); 
        const data = await response.json();
        if (response.ok) {
          setOnlineCount(data.count);
        }
      } catch (error) {
        console.error("Error fetching online count:", error);
      }
    };

    fetchOnlineCount();
    const interval = setInterval(fetchOnlineCount, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#fce9e9] py-12 px-10 flex flex-col md:flex-row items-center justify-between overflow-hidden">
      
      {/* Left Content */}
      <div className="max-w-xl space-y-6">
        <h1 className="text-4xl font-bold text-[#414146] leading-tight">
          Skip the travel!<br />
          Take Online Doctor Consultation
        </h1>
        
        <p className="text-lg text-[#414146] opacity-80">
          Private consultation  Video call + Audio call • Starts at just ₹50
        </p>
        

        {/* Doctor Status / Avatars */}
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src='./assets/doctor3.jpg' alt="Doctor" />
            <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src='./assets/doctor2.jpg' alt="Doctor" />
            <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src='./assets/doctor1.jpg' alt="Doctor" />
          </div>
          <p className="text-[#414146] font-medium flex items-center">
            {onlineCount > 0 ? `${onlineCount} Doctors are online` : "Connecting to doctors..."}
            <span className="ml-2 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
          </p>
        </div>

        <button onClick={() => setView("DoctorSearch")}className="bg-[#28a7df] hover:bg-[#2086b3] text-white font-bold py-3 px-10 rounded-md transition-all">
          Consult Now
        </button>

        {/* Trust Badges */}
        <div className="flex items-center space-x-6 pt-4 text-sm text-[#414146]">
          <div className="flex items-center space-x-1 italic">
            <span>🛡️</span> <span>Verified Doctors</span>
          </div>
          <div className="flex items-center space-x-1 italic">
            <span>📄</span> <span>Digital Prescription</span>
          </div>
          <div className="flex items-center space-x-1 italic">
            <span>💬</span> <span>Free Followup</span>
          </div>
        </div>
      </div>

      {/* Right Content: Image */}
      <div className="mt-10 md:mt-0 absolute pl-145 pt-32">
        <img 
          src='./assets/mainImage.png' 
          alt="Online Consultation" 
          className="max-w-[650px] min-h-[300px] w-full  "
        />
      </div>

    </section>
    
  );
};

export default HeaderDown1;