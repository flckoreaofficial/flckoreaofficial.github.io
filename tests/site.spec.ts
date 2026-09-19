import { expect, test } from '@playwright/test';

test('built page and assets load under a repository subpath', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (response.url().startsWith('http://127.0.0.1') && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto('./');
  await expect(page).toHaveTitle(/FLC/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('html')).toHaveClass('js');
  expect(await page.locator('.hero-visual img').evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath('homepage.png'), fullPage: true, animations: 'disabled' });
});

test('every in-page link points to an existing section', async ({ page }) => {
  await page.goto('./');
  const missingTargets = await page.locator('a[href^="#"]').evaluateAll((links) => links
    .map((link) => link.getAttribute('href') ?? '')
    .filter((hash) => !document.getElementById(hash.slice(1))));
  expect(missingTargets).toEqual([]);
  await page.getByRole('link', { name: '우리의 솔루션' }).click();
  await expect(page).toHaveURL(/#solutions$/);
});

test('mobile menu supports open, Escape, navigation and resize', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile navigation behavior');
  await page.goto('./');
  const toggle = page.getByRole('button', { name: '메뉴 열기' });
  const nav = page.getByRole('navigation', { name: '주요 메뉴' });
  await expect(nav).not.toBeVisible();
  await toggle.click();
  await expect(nav).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(nav).not.toBeVisible();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await nav.getByRole('link', { name: '회사소개' }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(nav).not.toBeVisible();
  await expect(page.locator('#about')).toBeFocused();
  await toggle.click();
  await page.setViewportSize({ width: 1100, height: 800 });
  await expect(nav).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(nav).not.toBeVisible();
});

test('company sources can be read and unconfirmed contacts are not published', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('[data-company-address]')).toHaveText('충청남도 천안시');
  await expect(page.locator('#verified-contact')).toBeHidden();
  await expect(page.locator('a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0);
  await page.getByText('기업정보 출처', { exact: true }).click();
  await expect(page.locator('.sources-content')).toBeVisible();
  expect(await page.locator('a[target="_blank"]').evaluateAll((links) => links.every((link) => link.getAttribute('rel')?.includes('noopener')))).toBe(true);
});

test('company content and navigation remain available without JavaScript', async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: testInfo.project.name === 'mobile' ? { width: 390, height: 844 } : { width: 1440, height: 1000 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/flc-preview/');
  await expect(page.getByRole('heading', { name: '다이 본딩 장비' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: '주요 메뉴' })).toBeVisible();
  await context.close();
});

test('small screens have no horizontal overflow and reduced motion is respected', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('./');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe('auto');
});
