import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:"http://35.200.148.90:8000" ,
        changeOrigin: true,
      },
    },
  },
});
