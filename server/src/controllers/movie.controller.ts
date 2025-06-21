import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const getAllMoviesHandler = async (req: Request, res: Response) => {
  try {
    const movies = await prisma.movie.findMany({
      include: { author: { select: { name: true } } },
    });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createMovieHandler = async (req: Request, res: Response) => {
  try {
    const { title, genre, imageUrl, trailerUrl } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const movie = await prisma.movie.create({
      data: {
        title,
        genre,
        imageUrl,
        trailerUrl,
        authorId: userId,
      },
    });

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteMovieHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.movie.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(204).send();
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "PrismaClientKnownRequestError"
    ) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateMovieHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;

    const movie = await prisma.movie.update({
      where: {
        id: parseInt(id, 10),
      },
      data: dataToUpdate,
    });

    res.status(200).json(movie);
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "PrismaClientKnownRequestError"
    ) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};
