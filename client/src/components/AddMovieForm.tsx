import React, { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useMovieStore } from "../store/movieStore";

const AddMovieForm = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");

  const { token } = useAuthStore();
  const { addMovie } = useMovieStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        "http://localhost:3001/api/movies",
        { title, genre },
        config
      );

      addMovie(response.data);
      setTitle("");
      setGenre("");
    } catch (err) {
      setError("Failed to add movie. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="my-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="text-xl font-bold mb-4">Add a New Movie</h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Titlu"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
        <input
          type="text"
          placeholder="Gen"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="flex-grow px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-md font-bold"
        >
          Add
        </button>
      </form>
      {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
    </div>
  );
};

export default AddMovieForm;
