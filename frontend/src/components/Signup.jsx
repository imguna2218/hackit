import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import userAtom from '../atoms/userAtom';
import { useNavigate } from 'react-router-dom';

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    mobileNumber: "",
    country: ""
  });

  const handleSignup = async () => {
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      if (data.error) {
        alert(`Error: ${data.error}`);
        return;
      }

      localStorage.setItem("hackit", JSON.stringify(data));
      setUser(data);
      console.log(data);
      navigate('/')
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="max-w-md w-full p-8 rounded-lg shadow-lg bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-400">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-green-300 mb-2">Full Name</label>
          <input
            type="text"
            value={inputs.fullName}
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-green-400 focus:border-green-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-green-300 mb-2">Username</label>
          <input
            type="text"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-green-400 focus:border-green-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-green-300 mb-2">Email</label>
          <input
            type="email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-green-400 focus:border-green-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-green-300 mb-2">Mobile Number</label>
          <input
            type="tel"
            value={inputs.mobileNumber}
            onChange={(e) => setInputs({ ...inputs, mobileNumber: e.target.value })}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-green-400 focus:border-green-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-green-300 mb-2">Country</label>
          <input
            type="text"
            value={inputs.country}
            onChange={(e) => setInputs({ ...inputs, country: e.target.value })}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-green-400 focus:border-green-400"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-green-300 mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-green-400 focus:border-green-400"
            required
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-green-400 cursor-pointer"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          onClick={handleSignup}
          className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
        >
          Sign Up
        </button>

        <div className="text-center mt-4 text-green-300">
          Already a user?{' '}
          <a
            href="#"
            onClick={() => setAuthScreen("login")}
            className="text-green-400 underline hover:text-green-500"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
