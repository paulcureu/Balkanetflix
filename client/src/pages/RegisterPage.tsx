import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await axios.post("http://localhost:3001/api/auth/register", {
        email,
        password,
        name,
      });

      setSuccessMessage(
        "Înregistrare reușită! Vei fi redirecționat la pagina de login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 409) {
          setError("Un utilizator cu acest email există deja.");
        } else {
          setError("Înregistrarea a eșuat. Te rugăm să încerci din nou.");
        }
      } else {
        setError("A apărut o eroare neașteptată.");
      }
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Creează un Cont</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Nume</label>
            <input
              type="text"
              placeholder="Numele tău"
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Parolă</label>
            <input
              type="password"
              placeholder="Parolă"
              required
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md font-bold transition-colors"
          >
            Înregistrează-te
          </button>
          {successMessage && (
            <p className="mt-4 text-center text-green-400">{successMessage}</p>
          )}
          {error && <p className="mt-4 text-center text-red-400">{error}</p>}
        </form>
        <p className="mt-6 text-center text-sm">
          Ai deja un cont?{" "}
          <Link to="/login" className="text-yellow-500 hover:underline">
            Autentifică-te
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
