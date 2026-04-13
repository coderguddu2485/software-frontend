import React, { useState } from "react";

export default function DoctorRegister({ setView }) {
  const [form, setForm] = useState({
    FullName: "",
    MobileNo: "",
    doctorId: "",
    specialization: "",
    description: "", // Added description
    password: "",
    consultAudio: false, // Track if audio is offered
    priceAudio: "",      // Audio price
    consultVideo: false, // Track if video is offered
    priceVideo: "",      // Video price
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/register-doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      const data = await response.json();
      if (response.ok) {
        alert("Doctor registered successfully!");
        setView("login");
      } else {
        alert("Registration failed: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm w-full max-w-lg">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-xl font-bold text-[#28328c]">Doctor Registration</h2>
          <button onClick={() => setView("register")} className="text-sm text-cyan-500 font-medium hover:underline">
            Not a doctor? Register here
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... Previous fields (Name, Specialization, ID, Mobile) remain the same ... */}
          <input type="text" name="FullName" value={form.FullName} onChange={handleChange} placeholder="Dr. Name" className="w-full px-4 py-2 border rounded-md outline-none focus:ring-1 focus:ring-cyan-500" required />
          <input type="text" name="specialization" value={form.specialization} onChange={handleChange} placeholder="e.g. MBBS, Cardiologist" className="w-full px-4 py-2 border rounded-md outline-none focus:ring-1 focus:ring-cyan-500" required />
          <input type="text" name="doctorId" value={form.doctorId} onChange={handleChange} placeholder="Unique Medical ID" className="w-full px-4 py-2 border rounded-md outline-none focus:ring-1 focus:ring-cyan-500" required />
          <input type="tel" name="MobileNo" value={form.MobileNo} onChange={handleChange} placeholder="Mobile Number" className="w-full px-4 py-2 border rounded-md outline-none focus:ring-1 focus:ring-cyan-500" required />

          {/* Description */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Doctor Description/Bio</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Tell patients about your experience..."
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-1 focus:ring-cyan-500 h-24"
              required
            />
          </div>

          {/* Consultation Options */}
          <div className="border-t pt-4">
            <label className="block text-gray-700 font-bold text-sm mb-2">Consultation Types & Pricing</label>
            
            <div className="flex flex-col space-y-3">
              {/* Audio Consult */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" name="consultAudio" checked={form.consultAudio} onChange={handleChange} />
                  <span>Audio Consultation</span>
                </label>
                {form.consultAudio && (
                  <input
                    type="number"
                    name="priceAudio"
                    value={form.priceAudio}
                    onChange={handleChange}
                    placeholder="Price (₹)"
                    className="w-32 px-2 py-1 border rounded-md outline-none focus:ring-1 focus:ring-cyan-500"
                    required
                  />
                )}
              </div>

              {/* Video Consult */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" name="consultVideo" checked={form.consultVideo} onChange={handleChange} />
                  <span>Video Consultation</span>
                </label>
                {form.consultVideo && (
                  <input
                    type="number"
                    name="priceVideo"
                    value={form.priceVideo}
                    onChange={handleChange}
                    placeholder="Price (₹)"
                    className="w-32 px-2 py-1 border rounded-md outline-none focus:ring-1 focus:ring-cyan-500"
                    required
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Create Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full px-4 py-2 border rounded-md outline-none focus:ring-1 focus:ring-cyan-500" required />
          </div>

          <button type="submit" className="w-full bg-[#28328c] text-white font-medium py-3 rounded-md hover:bg-blue-900 transition duration-200">
            Register as Doctor
          </button>
        </form>
      </div>
    </div>
  );
}