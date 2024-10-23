import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import userAtom from '../atoms/userAtom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const setUser = useSetRecoilState(userAtom);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/login", {
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
      navigate('/');
    } catch (err) {
      alert(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="max-w-sm w-full p-8 shadow-lg rounded-lg bg-gray-900">
        <h2 className="text-3xl text-center font-bold text-green-400 mb-6">Login</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-green-300 mb-2">Username</label>
          <input
            type="text"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            className="w-full px-4 py-3 bg-black text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-green-300 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              className="w-full px-4 py-3 bg-black text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-green-500 text-sm cursor-pointer"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={handleLogin}
            className={`w-full px-4 py-3 bg-green-500 text-black font-bold rounded-md transition-all ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-green-300">
            Don't have an account?{' '}
            <a
              href="#"
              onClick={() => setAuthScreen("signup")}
              className="text-green-500 underline hover:text-green-400 cursor-pointer"
            >
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
