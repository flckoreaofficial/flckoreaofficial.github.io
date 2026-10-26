import { defineConfig, normalizePath } from "vite";
import type { Plugin } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { routes } from "./src/navigation";

function serveReactPages(): Plugin {
  return {
    name: "flc-react-pages",
    apply: "serve",
    transformIndexHtml: {
      order: "pre",
      async handler(_html, context) {
        if (!context.server) return;
        const route = routes.find(
          (entry) =>
            normalizePath(resolve(import.meta.dirname, entry.file)) ===
            normalizePath(context.filename),
        );
        if (!route) return;
        // Render current components on each dev request so refreshes stay in sync with HMR.
        const renderer = await context.server.ssrLoadModule(
          "/scripts/render.tsx",
        );
        return renderer.renderDocument(
          route.page,
          undefined,
          route.locale === "en" ? "../" : context.server.config.base,
          route.locale,
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
        routes.map((route) => [
          `${route.locale}-${route.page.id}`,
          resolve(import.meta.dirname, route.file),
        ]),
      ),
    },
  },
});
