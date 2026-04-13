import { useState } from "react";
import react from "react";

// src/videoHome.jsx
function VideoHome({ setView, setActiveRoomId }) {
    const [roomId, setRoomId] = useState(''); 

    const handleJoin = () => {
        const loggedInUser = localStorage.getItem("user");
        
        if (!loggedInUser) {
            alert("You must be logged in to join a consultation!");
            setView("login");
            return;
        }
        if (roomId.trim()) {
            setActiveRoomId(roomId); // Save the ID to the main App state
            setView("video-room");   // Switch the view
        }
        else {
            alert("Please enter a Room ID");
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
     <div className="p-8 bg-white shadow-lg rounded-2xl border border-gray-100">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Join Consultation</h2>
        <input 
            className="border-2 border-blue-100 p-3 rounded-lg w-full mb-4 focus:outline-none focus:border-blue-400"
            placeholder='Enter Room ID' 
            type='text' 
            value={roomId} 
            onChange={(e)=>setRoomId(e.target.value)} 
        />
        <button 
            onClick={handleJoin}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
            Join Room
        </button>
     </div>
    </div>
  );
}
export default VideoHome;