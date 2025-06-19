"use strict";
// ./server/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express")); // Asigură-te că ai importurile necesare
// Încarcă variabilele din fișierul .env local DOAR dacă nu suntem în producție.
// Când rulăm în Docker, variabilele sunt deja injectate, deci acest pas nu e neapărat necesar,
// dar este esențial pentru rularea locală.
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config();
}
const app = (0, express_1.default)();
// Citim portul din mediul de rulare. Folosim 3000 ca un default consistent și logic.
// Acesta va fi portul INTERN al aplicației.
const PORT = parseInt(process.env.PORT || "3000", 10);
app.get("/status", (req, res) => {
    res.json({ message: "hi" });
});
// ... restul configurării tale express (middleware, rute, etc.)
// Folosim '0.0.0.0' pentru a asculta pe toate interfețele, o practică bună pentru compatibilitate cu Docker
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Serverul a pornit și ascultă pe portul ${PORT} localhost:${PORT}`);
});
