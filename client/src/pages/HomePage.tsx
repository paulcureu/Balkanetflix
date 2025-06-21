// client/src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useMovieStore } from "../store/movieStore";
import type { Movie } from "../types";
import AddMovieForm from "../components/AddMovieForm";
import EditMovieForm from "../components/EditMovieForm";

const HomePage = () => {
  const { user, token, logout } = useAuthStore();
  const { movies, setMovies, removeMovie } = useMovieStore();
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };
    fetchMovies();
  }, [setMovies]);
  const handleDelete = async (movieId: number) => {
    if (!window.confirm("Ești sigur că vrei să ștergi acest film?")) {
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:3001/api/movies/${movieId}`, config);
      removeMovie(movieId);
    } catch (error) {
      console.error("Failed to delete movie:", error);
      alert("Error deleting movie.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-wrap justify-between items-center mb-8 pb-4 border-b border-gray-700">
          <h1 className="text-3xl font-bold text-yellow-500">Balkanetflix</h1>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span className="text-gray-300">
              Bine ai venit, {user?.name}!{" "}
              <span className="font-bold text-yellow-500">({user?.role})</span>
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-bold"
            >
              Logout
            </button>
          </div>
        </header>

        <main>
          {user?.role === "ADMIN" && <AddMovieForm />}

          <h2 className="text-2xl font-bold mt-8">Lista de Filme</h2>
          <ul className="mt-4 space-y-3">
            {movies.map((movie) => (
              <li
                key={movie.id}
                className="p-4 bg-gray-800 rounded-lg flex justify-between items-center transition-all hover:bg-gray-700"
              >
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{movie.genre}</p>
                </div>
                {user?.role === "ADMIN" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingMovie(movie)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-xs font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-xs font-bold"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
            {movies.length === 0 && (
              <p className="text-gray-500 mt-4">
                Nu există filme în baza de date. Adaugă unul!
              </p>
            )}
          </ul>
        </main>

        {editingMovie && (
          <EditMovieForm
            movie={editingMovie}
            onClose={() => setEditingMovie(null)}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
