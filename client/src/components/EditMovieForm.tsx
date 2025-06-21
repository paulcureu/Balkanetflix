// client/src/components/EditMovieForm.tsx
import React, { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useMovieStore } from "../store/movieStore";
import type { Movie } from "../types";

interface EditMovieFormProps {
  movie: Movie;
  onClose: () => void;
}

const EditMovieForm: React.FC<EditMovieFormProps> = ({ movie, onClose }) => {
  const [title, setTitle] = useState(movie.title);
  const [genre, setGenre] = useState(movie.genre);
  const [error, setError] = useState("");

  const { token } = useAuthStore();
  const { updateMovie } = useMovieStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.patch(
        `http://localhost:3001/api/movies/${movie.id}`,
        { title, genre },
        config
      );

      updateMovie(movie.id, response.data);
      onClose();
    } catch (err) {
      setError("Failed to update movie.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="p-8 bg-gray-800 rounded-lg shadow-2xl w-full max-w-md border border-gray-700">
        <h3 className="text-2xl font-bold mb-6 text-yellow-500">
          Editează Filmul
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-300">
              Titlu
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-300">
              Gen
            </label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md font-bold"
            >
              Anulează
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-md font-bold"
            >
              Salvează Modificările
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovieForm;
