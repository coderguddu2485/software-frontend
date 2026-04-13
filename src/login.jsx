import React, { useState } from "react";

export default function Login({ setView ,setUser}) {
  const [form, setForm] = useState({
    identifier: "", // Corrected: changed MobileNo to identifier to match input 'name'
    password: "",
  });
  const handleLoginSuccess = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    
    // This call triggers the immediate update in the Header
    setUser(userData); 
    setView("home");
  };
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: form.identifier,
          password: form.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        alert("successfully login");
        console.log("Success: " + data.message);
        setView("home"); // Redirect to home after successful login
      } else {
        alert("Error: found is " + data.error);
      }
    } catch (error) {
      alert("error found");
      console.error("Connection error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Mobile Number</label>
            <input
              type="text"
              name="identifier" // Matches the key in setForm state
              value={form.identifier}
              onChange={handleChange}
              placeholder="Enter your Mobile Number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
          >
            Login
          </button>

          <div className="flex justify-between text-sm text-gray-500">
            {/* Ensure 'forgotPassword' matches the case used in App.jsx */}
            <button
              type="button"
              onClick={() => setView("ForgotPassword")}
              className="hover:text-indigo-500"
            >
              Forgot Password?
            </button>
            <button
              type="button"
              onClick={() => setView("register")}
              className="hover:text-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
