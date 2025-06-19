import dotenv from "dotenv";
import express from "express";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

const PORT = parseInt(process.env.PORT || "3000", 10);

app.get("/status", (req, res) => {
  res.json({ message: "hi" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `🚀 Serverul a pornit și ascultă pe portul ${PORT} localhost:${PORT}`
  );
});
