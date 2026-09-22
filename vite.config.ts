import { defineConfig, normalizePath } from "vite";
import type { Plugin } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { pages } from "./src/navigation";

function serveReactPages(): Plugin {
  return {
    name: "flc-react-pages",
    apply: "serve",
    transformIndexHtml: {
      order: "pre",
      async handler(_html, context) {
        if (!context.server) return;
        const page = pages.find(
          (entry) =>
            normalizePath(resolve(import.meta.dirname, entry.file)) ===
            normalizePath(context.filename),
        );
        if (!page) return;
        // Render current components on each dev request so refreshes stay in sync with HMR.
        const renderer = await context.server.ssrLoadModule(
          "/scripts/render.tsx",
        );
        return renderer.renderDocument(
          page,
          undefined,
          context.server.config.base,
        );
      },
    },
  };
}

export default defineConfig({
  // Relative assets work for both username.github.io and username.github.io/repo/.
  base: "./",
  plugins: [serveReactPages(), react(), tailwindcss()],
  build: {
    target: "es2022",
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page.id, resolve(import.meta.dirname, page.file)]),
      ),
    },
  },
});
