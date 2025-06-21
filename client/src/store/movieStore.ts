import { create } from "zustand";
import type { Movie } from "../types";

interface MovieState {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  addMovie: (movie: Movie) => void;
  updateMovie: (id: number, updatedMovieData: Partial<Movie>) => void;
  removeMovie: (id: number) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
  addMovie: (movie) => set((state) => ({ movies: [movie, ...state.movies] })),
  updateMovie: (id, updatedMovieData) =>
    set((state) => ({
      movies: state.movies.map((movie) =>
        movie.id === id ? { ...movie, ...updatedMovieData } : movie
      ),
    })),

  removeMovie: (id) =>
    set((state) => ({
      movies: state.movies.filter((movie) => movie.id !== id),
    })),
}));
