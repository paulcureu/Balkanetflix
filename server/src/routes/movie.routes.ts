// server/src/api/movie.routes.ts
import { Router } from "express";
import { validate } from "../middleware/validate";
import { createMovieSchema, updateMovieSchema } from "../schemas/movie.schema";
import { isAuthenticated, isAdmin } from "../middleware/auth.middleware";
import {
  getAllMoviesHandler,
  createMovieHandler,
  deleteMovieHandler,
  updateMovieHandler,
} from "../controllers/movie.controller";

const router = Router();

router.get("/", getAllMoviesHandler);

router.post(
  "/",
  isAuthenticated,
  validate(createMovieSchema),
  createMovieHandler
);

router.patch(
  "/:id",
  isAuthenticated,
  isAdmin,
  validate(updateMovieSchema),
  updateMovieHandler
);

router.delete("/:id", isAuthenticated, isAdmin, deleteMovieHandler);

export default router;
