"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovieSchema = exports.createMovieSchema = void 0;
const zod_1 = require("zod");
exports.createMovieSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Title is required" }).min(1),
        genre: zod_1.z.string({ required_error: "Genre is required" }).min(1),
        imageUrl: zod_1.z.string().url("Must be a valid URL").optional(),
        trailerUrl: zod_1.z.string().url("Must be a valid URL").optional(),
    }),
});
exports.updateMovieSchema = exports.createMovieSchema.partial();
