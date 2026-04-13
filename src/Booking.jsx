// src/Booking.jsx
import React, { useState } from 'react';

function Booking({ doctor, setView, setActiveRoomId, serviceType: passedServiceType,setServiceType:setGlobalServiceType}) {
    
    console.log("Booking component received doctor:", doctor); // Debug log
    // 1. Initialize State
    const [serviceType, setServiceType] = useState('video');
    
    // 2. Retrieve user from localStorage (Matches your login.jsx logic)
    const userData = JSON.parse(localStorage.getItem("user")); 

    // Function to inject Razorpay Script dynamically
    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleBooking = async () => {

        if (!doctor.isOnline || doctor.isBusy) {
        alert("This doctor is currently unavailable or in another call.");
        return setView("DoctorSearch");
    }
    
        // 3. Authorization Check
        if (!userData || !userData._id) {
            alert("Please login to book a consultation");
            return setView("login");
        }

        // 4. Price  Logic: Get price from the doctorobject passed as prop
        const amount = serviceType === 'video' ? doctor.priceVideo : doctor.priceAudio;

        if (!amount) {
            alert("This service is currently unavailable for this doctor.");
            return;
        }

        const sdkLoaded = await loadRazorpay();
        if (!sdkLoaded) {
            alert("Razorpay SDK failed to load. Check your internet connection.");
            return;
        }

        try {
            // 5. Create Order on Backend (Hits your createOrder controller)
            const orderRes = await fetch("http://localhost:3000/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: amount, 
                    doctorId: doctor._id, // Matches Payment Schema
                    userId: userData._id,
                    serviceType: serviceType // 'audio' or 'video'
                }),
            });
            
            if (!orderRes.ok) throw new Error("Backend failed to create order");
            const orderData = await orderRes.json();

            // 6. Razorpay Configuration
            const options = {
                key: "rzp_test_SXAYiCpisUGDT1", // FIXME: Replace with your actual Test Key ID
                amount: orderData.amount, // Amount in paise from backend
                currency: "INR",
                name: "Mayba Health",
                description: `Consultation with Dr. ${doctor.FullName}`,
                order_id: orderData.id, // The ID starting with 'order_'
                handler: async (response) => {
                    // 7. Verification: Capture and send response tokens to backend
                    const verifyRes = await fetch("http://localhost:3000/verify-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            doctorId: doctor._id,
                            userId: userData._id
                        }),
                    });

                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        alert("Payment Successful! Entering Consultation Room...");
                        setGlobalServiceType(serviceType);
                        setActiveRoomId(verifyData.roomId); // Update global room state
                        setView("video-room"); // Switch view to call component
                    } else {
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: userData.FullName,
                    contact: userData.MobileNo, // Auto-fills user mobile in popup
                },
                theme: { color: "#28328c" }, // Custom Mayba theme color
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error("Booking Flow Error:", error);
            alert("An error occurred during booking. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100 font-sans">
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-[#28328c]">Book Session</h2>
                <button onClick={() => setView("DoctorSearch")} className="text-gray-400 hover:text-red-500 transition-colors">
                    ✕
                </button>
            </div>

            {/* Doctor Info Card */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-center">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                    <span className="text-2xl font-bold text-blue-700">{doctor.FullName ? doctor.FullName.charAt(0) : "D"}</span>
                </div>
                <p className="font-bold text-lg text-gray-800">Dr. {doctor.FullName}</p>
                <p className="text-blue-600 text-sm font-medium">{doctor.specialization}</p>
            </div>

            {/* Selection UI */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3 text-center uppercase tracking-wider">
                    Choose Consultation Type
                </label>
                <div className="flex gap-4">
                    <button
                        onClick={() => setServiceType('audio')}
                        className={`flex-1 p-3 rounded-xl border-2 transition-all flex flex-col items-center ${
                            serviceType === 'audio' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-inner' : 'border-gray-100 bg-white text-gray-500'
                        }`}
                    >
                        <span className="text-sm font-bold">Audio Call</span>
                        <span className="text-xs font-semibold">₹{doctor.priceAudio || 0}</span>
                    </button>
                    <button
                        onClick={() => setServiceType('video')}
                        className={`flex-1 p-3 rounded-xl border-2 transition-all flex flex-col items-center ${
                            serviceType === 'video' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-inner' : 'border-gray-100 bg-white text-gray-500'
                        }`}
                    >
                        <span className="text-sm font-bold">Video Call</span>
                        <span className="text-xs font-semibold">₹{doctor.priceVideo || 0}</span>
                    </button>
                </div>
            </div>

            {/* Final Action Button */}
            <button
                onClick={handleBooking}
                className="w-full bg-[#28328c] hover:bg-blue-900 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95"
            >
                Pay & Start {serviceType === 'video' ? 'Video' : 'Audio'} Call
            </button>
            
            <p className="text-[10px] text-center text-gray-400 mt-4">
                Secure payment processed via Razorpay. All sessions are private and encrypted.
            </p>
        </div>
    );
}

export default Booking;