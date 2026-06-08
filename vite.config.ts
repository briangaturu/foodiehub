import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: false,
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true
    })
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhoost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react";
            if (id.includes("sweetalert2")) return "sweetalert";
            if (id.includes("react-icons")) return "icons";
            if (id.includes("@reduxjs") || id.includes("react-redux")) return "redux";
            return "vendor";
          }
        }
      }
    }
  }
});