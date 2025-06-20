import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import movieRouter from "./routes/movie.routes";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.use("/api/auth", authRouter);
app.use("/api/movies", movieRouter);

const PORT = parseInt(process.env.PORT || "3000", 10);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server: localhost:${PORT}`);
});
