import React, { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        }
      );
      const { accessToken, user } = response.data;
      login(accessToken, user);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-500">
          Autentificare
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-300">
              Parolă
            </label>
            <input
              type="password"
              placeholder="Parolă"
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-md font-bold transition-colors"
          >
            Login
          </button>

          {error && <p className="mt-4 text-center text-red-400">{error}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Nu ai un cont?{" "}
          <Link
            to="/register"
            className="font-semibold text-yellow-500 hover:underline"
          >
            Înregistrează-te aici
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
