import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // Bundle analyzer (safe on Windows)
    visualizer({
      open: false,
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true
    })
  ],

  build: {
    // Increase warning limit (does NOT affect performance)
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules into logical chunks
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react";
            if (id.includes("sweetalert2")) return "sweetalert";
            if (id.includes("react-icons")) return "icons";
            if (id.includes("@reduxjs") || id.includes("react-redux"))
              return "redux";
            return "vendor";
          }
        }
      }
    }
  }
});
