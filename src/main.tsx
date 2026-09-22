import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { pages } from "./navigation";

const root = document.getElementById("root");
if (!root) throw new Error("Missing React root. Run npm run generate first.");
const page = pages.find((entry) => entry.id === root.dataset.page);
const initialYear = Number(root.dataset.year);
const assetBase = root.dataset.assetBase ?? "./";
if (!page || !Number.isInteger(initialYear))
  throw new Error("Invalid page metadata.");

hydrateRoot(
  root,
  <StrictMode>
    <App page={page} initialYear={initialYear} assetBase={assetBase} />
  </StrictMode>,
);
