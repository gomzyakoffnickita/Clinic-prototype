import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import { CLINIC } from "./src/data/clinic.js";
import { SEO } from "./src/data/seo.js";

const base = "/Clinic-prototype/meilleur/";
const input = {
  home: resolve(import.meta.dirname, "index.html"),
  services: resolve(import.meta.dirname, "services/index.html"),
  about: resolve(import.meta.dirname, "about/index.html"),
};
const themeFile = resolve(import.meta.dirname, "src/theme.css");

function escapeHtmlText(value) {
  return value.replace(/[&<>]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  })[char]);
}

export default defineConfig({
  base,
  plugins: [{
    name: "clinic-page-metadata",
    transformIndexHtml: {
      order: "post",
      handler(_html, { filename }) {
        const page = Object.keys(input).find((key) => input[key] === resolve(filename));
        const meta = SEO[page];
        if (!meta) return [];

        const favicon = CLINIC.favicon ? base + CLINIC.favicon : "";
        const themeColor = readFileSync(themeFile, "utf8").match(/--color-navy:\s*([^;]+);/)?.[1].trim();
        const tags = [
          { tag: "title", children: escapeHtmlText(meta.title) },
          { tag: "meta", attrs: { name: "description", content: meta.description } },
          { tag: "meta", attrs: { name: "robots", content: "noindex" } },
          { tag: "meta", attrs: { property: "og:title", content: meta.title } },
          { tag: "meta", attrs: { property: "og:description", content: meta.description } },
          { tag: "meta", attrs: { property: "og:type", content: "website" } },
        ];

        if (page === "home" && themeColor) {
          tags.push({ tag: "meta", attrs: { name: "theme-color", content: themeColor } });
        }
        if (meta.image) {
          tags.push({ tag: "meta", attrs: { property: "og:image", content: meta.image } });
        }
        if (favicon) {
          tags.push({ tag: "link", attrs: { rel: "icon", href: favicon } });
        }

        return tags.map((tag) => ({ ...tag, injectTo: "head" }));
      },
    },
  }],
  build: {
    rollupOptions: { input },
  },
});
