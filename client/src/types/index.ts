export interface Movie {
  id: number;
  title: string;
  genre: string;
  imageUrl: string | null;
  trailerUrl: string | null;
  createdAt: string;
  updatedAt: string;
  authorId: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: "USER" | "ADMIN";
}
