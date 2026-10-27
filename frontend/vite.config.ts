import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// The dev server proxies API + WebSocket calls to the FastAPI backend so the
// frontend can use same-origin relative URLs (no CORS gymnastics in the browser).
export default defineConfig(({ mode }) => {
  const { VITE_API_TARGET = "http://127.0.0.1:8000" } = loadEnv(mode, ".", "VITE_");
  const wsTarget = VITE_API_TARGET.replace(/^http/, "ws");

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        "/api": { target: VITE_API_TARGET, changeOrigin: true },
        "/ws": { target: wsTarget, ws: true },
      },
    },
  };
});
