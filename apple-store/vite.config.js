import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración mínima de Vite para usar React
export default defineConfig({
  plugins: [react()],
});
