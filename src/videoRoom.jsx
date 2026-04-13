// src/videoRoom.jsx
import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function VideoRoom({ setView, roomId,serviceType}) {
    const containerRef = useRef(null);
    const zpRef = useRef(null); // Ref to store instance for cleanup

    useEffect(() => {
        // Handle cases where roomId might be an object
        const cleanRoomId = typeof roomId === 'object' ? roomId.roomId || JSON.stringify(roomId) : String(roomId);
        
        console.log("Room ID received:", cleanRoomId);

        if (!cleanRoomId || cleanRoomId === "undefined" || zpRef.current) return;

        const myMeeting = async () => {
            const appID = 1388657559; 
            const serverSecret = "b30c2158ed3752468b0a191688a9e246"; 

            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID, 
                serverSecret, 
                cleanRoomId, 
                Date.now().toString(),
                "User " + cleanRoomId
            );

            const zp = ZegoUIKitPrebuilt.create(kitToken);
            zpRef.current = zp; // Save to ref for cleanup

            zp.joinRoom({
                container: containerRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall, 
                },
                turnOnCameraWhenJoining: serviceType === 'video', // Only ON for video
                showMyCameraToggleButton: serviceType === 'video', // Hide button for audio
                showAudioVideoSettingsButton: serviceType === 'video', 
                showScreenSharingButton: false, // Usually hidden for consultations
                onLeaveRoom: () => {
                    setView("home");
                }
            });
        };

        myMeeting();

        // CLEANUP: Uses the ref to avoid the "zp is not defined" error
        return () => {
            if (zpRef.current) {
                zpRef.current.destroy();
                zpRef.current = null;
            }
        };
    }, [roomId, setView ,serviceType]);

    if (!roomId) return <div className="h-screen bg-black text-white p-10">Connecting...</div>;

    return (
        <div className="w-full h-screen bg-gray-900 flex flex-col">
            <div className="p-4 bg-white border-b flex justify-between items-center">
                <h1 className="text-xl font-bold text-[#28328c]">Mayba Consultation</h1>
                <button 
                    onClick={() => setView("home")}
                    className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm"
                >
                    Exit
                </button>
            </div>
            <div ref={containerRef} className="flex-grow w-full h-full bg-black" />
        </div>
    );
}

export default VideoRoom;