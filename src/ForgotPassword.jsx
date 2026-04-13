import React, { useState } from "react";

export default function ForgotPassword({ setView }) {
  const [mobileNo, setMobileNo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic for password reset (e.g., sending an OTP) would go here
    alert("Instructions sent to " + mobileNo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Reset Password</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Enter your registered mobile number to receive reset instructions.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-left text-gray-600 mb-1">Mobile Number</label>
            <input
              type="text"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              placeholder="Enter your Mobile Number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200 font-bold"
          >
            Send Reset Link
          </button>

          <div className="pt-2">
            <button 
              type="button"
              onClick={() => setView('login')} 
              className="text-sm text-indigo-500 hover:underline"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}