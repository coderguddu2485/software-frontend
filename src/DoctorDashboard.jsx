import React, { useState, useEffect } from "react";
// Add these props to your component definition in App.jsx
const DoctorDashboard = ({ setView, setActiveRoomId, setServiceType }) => {
  const [doctorData, setDoctorData] = useState(null);
  const [requests, setRequests] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [earnings, setEarnings] = useState(0);

  const loadDashboardData = async (docId) => {
    try {
      const requestRes = await fetch(
        `http://localhost:3000/doctor-requests/${docId}`,
      );
      const requestData = await requestRes.json();
      if (requestRes.ok) setRequests(requestData);

      const earningsRes = await fetch(
        `http://localhost:3000/doctor-earnings/${docId}`,
      );
      const earningsData = await earningsRes.json();
      if (earningsRes.ok) setEarnings(earningsData.totalEarnings);
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
    }
  };

  useEffect(() => {
    const savedDoc = JSON.parse(localStorage.getItem("doctorUser"));
    if (!savedDoc) return setView("DoctorLogin");

    setDoctorData(savedDoc);
    setIsOnline(savedDoc.isOnline || false);
    loadDashboardData(savedDoc._id);

    const handleTabClose = () => {
      if (savedDoc.doctorId) {
        const blob = new Blob(
          [JSON.stringify({ doctorId: savedDoc.doctorId, status: false })],
          { type: "application/json" },
        );
        navigator.sendBeacon(
          "http://localhost:3000/doctor/toggle-status",
          blob,
        );
      }
    };

    window.addEventListener("beforeunload", handleTabClose);
    return () => window.removeEventListener("beforeunload", handleTabClose);
  }, [setView]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (doctorData?._id) loadDashboardData(doctorData._id);
    }, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [doctorData]);

  const handleFinishSession = async (sessionId) => {
  try {
    const response = await axios.post('http://localhost:5000/api/user/finish-session', {
      sessionId: sessionId 
    });
    
    if (response.status === 200) {
      alert("Session finished and status updated to Available");
      // Refresh local state if necessary
    }
  } catch (error) {
    console.error("Error finishing session:", error);
  }
};

  const handleJoinSession = (req) => {
    const idToJoin =
      typeof req.roomId === "object" ? req.roomId.roomId : req.roomId;
    if (!idToJoin) {
      alert("Error: No Room ID found for this request.");
      return;
    }
    setActiveRoomId(idToJoin);
    setServiceType(req.serviceType);
    setView("video-room"); // Redirects to the room
  };

  const handleCompleteSession = async (roomId) => {
    try {
      const res = await fetch("http://localhost:3000/finish-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId }),
      });
      if (res.ok) {
        alert("Session marked as completed!");
        const savedDoc = JSON.parse(localStorage.getItem("doctorUser"));
        loadDashboardData(doctorData._id); // Refresh lists
      }
    } catch (err) {
      console.error("Error completing session:", err);
    }
  };
  // zFolder/frontend/mayba/src/DoctorDashboard.jsx

  const toggleStatus = async () => {
    if (!doctorData || !doctorData.doctorId) {
      console.error("CRITICAL: doctorData or doctorId is missing!", doctorData);
      alert("Error: Doctor session data not found. Please log in again.");
      return;
    }

    const newStatus = !isOnline;
    try {
      const res = await fetch("http://localhost:3000/doctor/toggle-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: doctorData.doctorId,
          status: newStatus,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // Update the local state to trigger the UI change
        setIsOnline(newStatus);

        // Update localStorage so the status persists on refresh
        const updatedDoc = { ...doctorData, isOnline: newStatus };
        localStorage.setItem("doctorUser", JSON.stringify(updatedDoc));
        setDoctorData(updatedDoc);

        console.log("Status updated successfully:", data.isOnline);
      } else {
        const errorData = await res.json();
        alert(`Update failed: ${errorData.error}`);
      }
    } catch (err) {
      console.error("Fetch failed entirely:", err);
    }
  };

  // Filter requests into two groups
  const liveSessions = requests.filter((req) => !req.isFinished);
  const completedSessions = requests.filter((req) => req.isFinished);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Dr. {doctorData?.FullName}
            </h1>
            <p className="text-gray-500 text-sm">Consultation Management</p>
          </div>
          <button
            onClick={toggleStatus}
            className={`px-6 py-2 rounded-full font-bold border-2 transition-all duration-300 ${
              isOnline
                ? "bg-green-50 text-green-600 border-green-500 shadow-md"
                : "bg-gray-100 text-gray-400 border-gray-300"
            }`}
          >
            {isOnline ? "● ONLINE" : "○ OFFLINE"}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* LIVE SESSIONS */}
            <div className="bg-green-100 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4 text-green-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>{" "}
                Live Requests
              </h2>
              {liveSessions.length === 0 ? (
                <p className="text-gray-400 text-center py-4">
                  No active requests.
                </p>
              ) : (
                liveSessions.map((req) => (
                  <div
                    key={req._id}
                    className="flex justify-between items-center p-4 border-b last:border-0"
                  >
                    <div>
                      <p className="font-bold text-gray-800">
                        {req.userId?.FullName || "Patient"}
                      </p>
                      <p className="text-xs text-blue-500 font-bold uppercase">
                        {req.serviceType} CALL
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleJoinSession(req)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
                      >
                        Join
                      </button>
                      <button
                        onClick={() => handleCompleteSession(req.roomId)}
                        className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-50 hover:text-red-600"
                      >
                        Finish
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* COMPLETED SESSIONS */}
            <div className="bg-blue-100 rounded-xl shadow-sm p-6 opacity-80">
              <h2 className="text-lg font-bold mb-4 text-gray-600">History</h2>
              {completedSessions.length === 0 ? (
                <p className="text-gray-400 text-center py-4">
                  No history yet.
                </p>
              ) : (
                completedSessions.map((req) => (
                  <div
                    key={req._id}
                    className="flex justify-between items-center p-4 border-b last:border-0 grayscale"
                  >
                    <p className="font-medium text-gray-700">
                      {req.userId?.FullName || "Patient"}
                    </p>
                    <span className="text-xs font-bold text-gray-400">
                      COMPLETED
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* STATS */}
          <div className="bg-[#28328c] text-white rounded-xl shadow-sm p-6 h-fit">
            <h2 className="font-bold mb-4">Earnings</h2>
            <p className="text-3xl font-black mb-6">
              ₹ {earnings.toLocaleString("en-IN")}
            </p>
            <button
              onClick={() => {
                localStorage.removeItem("doctorUser");
                setView("home");
              }}
              className="w-full py-3 border-2 border-red-400 text-red-400 font-bold rounded-xl hover:bg-red-400 hover:text-white transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {/* <DoctorDashboard/> */}
    </div>
  );
};

export default DoctorDashboard;
