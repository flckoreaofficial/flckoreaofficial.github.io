import { expect, test } from "@playwright/test";
import { pages } from "../src/navigation";
import { translate } from "../src/i18n";
const runtimeErrors = new WeakMap<object, string[]>();
test.beforeEach(async ({ page }) => {
  await page.route("https://fonts.googleapis.com/**", (route) => route.abort());
  await page.route("https://fonts.gstatic.com/**", (route) => route.abort());
  const errors: string[] = [];
  runtimeErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      /hydration|react|each child/i.test(message.text())
    )
      errors.push(message.text());
  });
});
test.afterEach(async ({ page }) => expect(runtimeErrors.get(page)).toEqual([]));

test("all English pages render translated content and preserve the language in links", async ({
  page,
}, testInfo) => {
  test.setTimeout(180000);
  for (const entry of pages) {
    const response = await page.goto(`./en/${entry.file}`);
    expect(response?.status(), entry.file).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveClass("js");
    await expect(page.locator("#root")).toHaveAttribute("data-locale", "en");
    await expect(page.locator("h1")).toHaveCount(1);
    if (entry.id !== "home")
      await expect(page.locator("h1")).toHaveText(translate(entry.label, "en"));
    expect(await page.locator("body").innerText(), entry.file).not.toMatch(
      /[가-힣]/,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      entry.file,
    ).toBe(true);
    const urls = await page
      .locator('main a[href^="./"], #main-nav a')
      .evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).href),
      );
    expect(
      urls.every((url) => new URL(url).pathname.includes("/en/")),
      entry.file,
    ).toBe(true);
    const images = await page
      .locator("main img")
      .evaluateAll((images) =>
        images.map((img) => (img as HTMLImageElement).src),
      );
    for (const src of new Set(images))
      expect((await page.request.get(src)).ok()).toBe(true);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/en\//,
    );
    await expect(page.locator('link[hreflang="ko"]')).toHaveCount(1);
    if (["home", "product-zsd-1", "support-contact"].includes(entry.id))
      await page.screenshot({
        path: testInfo.outputPath(`${entry.id}-en.png`),
        fullPage: testInfo.project.name !== "mobile",
        animations: "disabled",
      });
  }
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("language switch preserves page, query and fragment on desktop and mobile", async ({
  page,
}) => {
  await page.goto("./support-contact.html?product=zsd-1#main");
  const language = page.locator(".language-switch");
  await expect(language).toBeVisible();
  await expect(
    language.getByRole("link", { name: "한국어로 보기" }),
  ).toHaveAttribute("aria-current", "true");
  await language.getByRole("link", { name: "View in English" }).click();
  await expect(page).toHaveURL(
    /\/en\/support-contact\.html\?product=zsd-1#main$/,
  );
  await expect(
    page.getByRole("combobox", { name: "Product of interest", exact: true }),
  ).toHaveValue("zsd-1");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page
    .locator(".language-switch")
    .getByRole("link", { name: "한국어로 보기" })
    .click();
  await expect(page).toHaveURL(
    /\/flc-preview\/support-contact\.html\?product=zsd-1#main$/,
  );
  await expect(
    page.getByRole("combobox", { name: "관심 제품", exact: true }),
  ).toHaveValue("zsd-1");
  await page.goto("./product-mcpd-1.html#specifications");
  await page
    .locator(".language-switch")
    .getByRole("link", { name: "View in English" })
    .click();
  await expect(page).toHaveURL(/\/en\/product-mcpd-1.html#specifications$/);
  await expect(page.locator(".status-badge")).toHaveText("In development");
});

test("English filters and product inquiries produce an English email draft", async ({
  page,
}) => {
  await page.goto("./en/product-solutions.html");
  await expect(page.locator(".catalog-card")).toHaveCount(11);
  await page
    .getByRole("button", { name: "Process parts & tools", exact: true })
    .click();
  await expect(page.locator(".catalog-card")).toHaveCount(4);
  await page
    .getByRole("combobox", { name: "Application process", exact: true })
    .selectOption("Saw Singulation");
  await expect(page.locator(".catalog-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Reset filters" }).click();
  await page.getByLabel("Search products").fill("magnetic");
  await expect(page.locator(".catalog-card")).toHaveCount(1);
  await page.getByRole("link", { name: "View details", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/product-magnetic-collet.html$/);
  await page
    .getByRole("link", { name: "Discuss product specifications" })
    .click();
  await expect(
    page.getByRole("combobox", { name: "Product of interest", exact: true }),
  ).toHaveValue("magnetic-collet");
  await page.getByLabel("Company (required)").fill("Example Semiconductors");
  await page.getByLabel("Contact name (required)").fill("Alex Kim");
  await page.getByLabel("Email (required)").fill("alex@example.com");
  await page
    .getByLabel("Message (required)")
    .fill("Please review HBM pickup conditions & quantity 10.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Prepare inquiry email" }).click();
  await expect(page.locator(".email-draft")).toContainText(
    "Nothing has been sent yet.",
  );
  const href = await page
    .getByRole("link", { name: "Open in email app" })
    .getAttribute("href");
  const body = new URL(href!).searchParams.get("body")!;
  expect(body).toContain(
    "Product of interest: Magnetic Collet & Automatic Change Parts",
  );
  expect(body).toContain("Please review HBM pickup conditions & quantity 10.");
  expect(body).not.toMatch(/[가-힣]/);
  await expect(page.locator('main a[href^="tel:"]')).toHaveAttribute(
    "href",
    "tel:+82415378115",
  );
});

test("English downloads are real, and English pages work without JavaScript", async ({
  page,
  browser,
}, testInfo) => {
  await page.goto("./en/support-downloads.html");
  for (const link of await page.locator("a[download]").all()) {
    const href = await link.getAttribute("href");
    expect(href).toMatch(/-en\.(pdf|txt)$/);
    const response = await page.request.get(new URL(href!, page.url()).href);
    expect(response.ok()).toBe(true);
    if (href!.endsWith(".pdf"))
      expect((await response.body()).subarray(0, 4).toString()).toBe("%PDF");
    else {
      expect(await response.text()).toContain("Product Selection");
      expect(await response.text()).not.toMatch(/[가-힣]/);
    }
  }
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport:
      testInfo.project.name === "mobile"
        ? { width: 390, height: 844 }
        : { width: 1440, height: 1000 },
  });
  const staticPage = await context.newPage();
  await staticPage.route("https://fonts.googleapis.com/**", (route) =>
    route.abort(),
  );
  await staticPage.goto(
    "http://127.0.0.1:4173/flc-preview/en/product-zsd-1.html",
  );
  await expect(staticPage.locator("#specifications")).toContainText(
    "Bonding accuracy",
  );
  await staticPage
    .locator(".language-switch")
    .getByRole("link", { name: "한국어로 보기" })
    .click();
  await expect(staticPage.locator("html")).toHaveAttribute("lang", "ko");
  await context.close();
});

test("English navigation and long text fit narrow viewports", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  for (const file of [
    "index.html",
    "product-solutions.html",
    "product-magnetic-collet.html",
    "company-overview.html",
    "technology-research.html",
    "support-contact.html",
  ]) {
    await page.goto(`./en/${file}`);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      file,
    ).toBe(true);
    await expect(page.locator(".language-switch")).toBeVisible();
  }
  await page.getByRole("button", { name: "Open menu" }).click();
  const nav = page.getByRole("navigation", {
    name: "Main navigation",
    exact: true,
  });
  await nav.locator("summary").filter({ hasText: "Products" }).click();
  await nav.getByRole("link", { name: "All products", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/product-solutions.html$/);
});
