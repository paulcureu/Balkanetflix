// client/src/types/index.ts

// Cuvântul cheie `export` face ca această interfață să fie vizibilă
// și importabilă în alte fișiere din proiect.
export interface Movie {
  id: number;
  title: string;
  genre: string;
  imageUrl: string | null;
  trailerUrl: string | null;
  createdAt: string; // TypeScript/JSON va trata datele ca string
  updatedAt: string;
  authorId: string;
}

// Poți adăuga și tipul pentru User aici, pentru a fi organizat
export interface User {
  id: string;
  email: string;
  name: string | null;
  role: "USER" | "ADMIN";
}
