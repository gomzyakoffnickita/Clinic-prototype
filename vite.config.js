import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "/Clinic-prototype/",
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        services: resolve(import.meta.dirname, "services/index.html"),
        about: resolve(import.meta.dirname, "about/index.html"),
      },
    },
  },
});
