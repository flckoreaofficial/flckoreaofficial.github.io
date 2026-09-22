import { expect, test } from "@playwright/test";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

test("Vite serves current React HTML and hydrates in development", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      /react|hydration|each child/i.test(message.text())
    )
      errors.push(message.text());
  });
  // A stale generated snapshot must not leak into dev SSR after component edits.
  // Touch only this generated file and restore it even if the assertion fails.
  const snapshotPath = resolve("company-overview.html");
  const snapshot = await readFile(snapshotPath, "utf8");
  try {
    await writeFile(
      snapshotPath,
      snapshot.replace("<h1>회사개요</h1>", "<h1>STALE_SNAPSHOT</h1>"),
      "utf8",
    );
    const current = await (await request.get("company-overview.html")).text();
    expect(current).toContain("<h1>회사개요</h1>");
    expect(current).not.toContain("STALE_SNAPSHOT");
  } finally {
    await writeFile(snapshotPath, snapshot, "utf8");
  }
  for (const file of [
    "index.html",
    "company-location.html",
    "product-1.html",
  ]) {
    const response = await request.get(file);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain('id="root"');
    expect(html).toContain("<h1");
    expect(html).toContain("/@react-refresh");
    await page.goto(file);
    await expect(page.locator("html")).toHaveClass("js");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.reload();
    await expect(page.locator("html")).toHaveClass("js");
  }
  const nav = page.getByRole("navigation", { name: "주요 메뉴", exact: true });
  await nav.locator("summary").filter({ hasText: "회사소개" }).click();
  await expect(
    nav.getByRole("link", { name: "오시는길", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    nav.getByRole("link", { name: "오시는길", exact: true }),
  ).toBeHidden();
  expect(errors).toEqual([]);
});
