import { z } from "zod";

export const createMovieSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }).min(1),
    genre: z.string({ required_error: "Genre is required" }).min(1),
    imageUrl: z.string().url("Must be a valid URL").optional(),
    trailerUrl: z.string().url("Must be a valid URL").optional(),
  }),
});

export const updateMovieSchema = createMovieSchema.partial();
