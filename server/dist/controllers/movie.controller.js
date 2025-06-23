"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovieHandler = exports.deleteMovieHandler = exports.createMovieHandler = exports.getAllMoviesHandler = void 0;
const prisma_1 = require("../utils/prisma");
const getAllMoviesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield prisma_1.prisma.movie.findMany({
            include: { author: { select: { name: true } } },
        });
        res.status(200).json(movies);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getAllMoviesHandler = getAllMoviesHandler;
const createMovieHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, genre, imageUrl, trailerUrl } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const movie = yield prisma_1.prisma.movie.create({
            data: {
                title,
                genre,
                imageUrl,
                trailerUrl,
                authorId: userId,
            },
        });
        res.status(201).json(movie);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createMovieHandler = createMovieHandler;
const deleteMovieHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma_1.prisma.movie.delete({
            where: { id: parseInt(id, 10) },
        });
        res.status(204).send();
    }
    catch (error) {
        if (error instanceof Error &&
            error.name === "PrismaClientKnownRequestError") {
            res.status(404).json({ message: "Movie not found" });
            return;
        }
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.deleteMovieHandler = deleteMovieHandler;
const updateMovieHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const dataToUpdate = req.body;
        const movie = yield prisma_1.prisma.movie.update({
            where: {
                id: parseInt(id, 10),
            },
            data: dataToUpdate,
        });
        res.status(200).json(movie);
    }
    catch (error) {
        if (error instanceof Error &&
            error.name === "PrismaClientKnownRequestError") {
            res.status(404).json({ message: "Movie not found" });
            return;
        }
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.updateMovieHandler = updateMovieHandler;
