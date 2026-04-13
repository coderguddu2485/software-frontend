import React, { useState } from "react";

const DoctorLogin = ({ setView }) => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // You should create a specific doctor login endpoint in your backend
      const response = await fetch("http://localhost:3000/doctor-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok && data.user.role === "doctor") {
        localStorage.setItem("doctorUser", JSON.stringify(data.user));
        alert("Doctor Login Successful");
        setView("DoctorDashboard"); // Redirect to the dashboard
      } else {
        setError("Invalid credentials or not a doctor account.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-[#28328c] mb-6">Doctor Portal Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Mobile Number / Doctor ID"
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-6"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button className="w-full bg-[#28328c] text-white py-3 rounded-lg font-bold">
          Login to Dashboard
        </button>
      </form>
    </div>
  );
};

export default DoctorLogin;