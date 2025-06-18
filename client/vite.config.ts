import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // necesar pentru a expune în rețeaua docker
    port: 3000,
    proxy: {
      "/api": {
        target: "http://server:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // scoate /api din URL-ul final
      },
    },
  },
});
