import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart(),
    nitro({
      preset: process.env.VERCEL ? "vercel" : "node-server",
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": process.cwd() + "/src",
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
});
