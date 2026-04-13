import React, { useState } from "react";

export default function Register({setView}) {
  const [form, setForm] = useState({
    FullName: "",
    MobileNo: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FullName: form.FullName, // Match backend schema
          MobileNo: form.MobileNo, // Match backend schema
          password: form.password,
        }),
      });
      // ... handle response
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm w-full max-w-lg">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-xl font-bold text-gray-700">Join mayba</h2>
          <span className="text-sm text-gray-500">
            Are you a doctor?{" "}
            <a href="#" onClick={() => setView("DoctorRegister")} className="text-orange-400 font-medium">
              Register Here
            </a>
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-600 text-sm mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="FullName"
              value={form.FullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-gray-600 text-sm mb-2">
              Mobile Number
            </label>
            <div className="flex gap-2">
              <select className="px-2 py-2 border rounded-md bg-gray-50 text-sm outline-none">
                <option>+91(IND)</option>
              </select>
              <input
                type="tel"
                name="MobileNo"
                value={form.MobileNo}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="flex-1 px-4 py-2 border rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                required
              />
            </div>
          </div>

          {/* Create Password */}
          <div>
            <label className="block text-gray-600 text-sm mb-2">
              Create Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
              required
            />
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 text-cyan-500 border-gray-300 rounded"
              defaultChecked
            />
            <div className="text-xs text-gray-500 leading-relaxed">
              Receive relevant offers and promotional communication from mayba
              <p className="mt-1">
                By signing up, I agree to{" "}
                <a href="#" className="text-cyan-500">
                  terms
                </a>
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white font-medium py-3 rounded-md hover:bg-cyan-600 transition duration-200"
          >
            Submit
          </button>
          <div className="mt-4 text-center text-sm text-gray-500">
            Already have an account?
            <button
              onClick={() => setView("login")}
              className="text-cyan-500 ml-1"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
