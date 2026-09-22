import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { navigation, pages } from '../src/navigation';
import { company } from '../src/company';

const reactErrors = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  reactErrors.set(page, errors);
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error' && /hydration|react|each child/i.test(message.text())) errors.push(message.text());
  });
});
test.afterEach(async ({ page }) => {
  expect(reactErrors.get(page) ?? [], 'React runtime and hydration errors').toEqual([]);
});

test('home loads Tailwind styles and the official logo without resource errors', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (response.url().startsWith('http://127.0.0.1') && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto('./');
  await expect(page).toHaveTitle(/FLC/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('html')).toHaveClass('js');
  expect(await page.locator('.brand img').first().evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBe(200);
  expect(await page.locator('.hero-visual img').evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  expect(await page.locator('.hero').evaluate((element) => getComputedStyle(element).backgroundColor)).toBe('rgb(8, 36, 72)');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath('home.png'), fullPage: true, animations: 'disabled' });
});

test('all 17 static pages support direct loading and refresh under a repository path', async ({ page }, testInfo) => {
  test.setTimeout(90000);
  for (const entry of pages) {
    const response = await page.goto(`./${entry.file}`);
    expect(response?.status(), entry.file).toBe(200);
    await expect(page.locator('#root')).toHaveAttribute('data-page', entry.id);
    await expect(page.locator('html')).toHaveClass('js');
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    if (entry.id !== 'home') {
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(entry.label);
      await expect(page.locator('.section-nav [aria-current="page"]')).toHaveText(entry.label);
      await expect(page.locator('main')).toContainText('@@수정필요@@');
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), entry.file).toBe(true);
    const invalid = await page.locator('a[href^="./"]').evaluateAll((links) => links.map((link) => link.getAttribute('href')!.slice(2)));
    expect(invalid.every((file) => pages.some((entry) => entry.file === file))).toBe(true);
    if (entry.id === 'product-1' || entry.id === 'company-location') {
      await page.screenshot({ path: testInfo.outputPath(`${entry.id}.png`), fullPage: true, animations: 'disabled' });
    }
  }
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('인재상');
});

test('navigation has the requested hierarchy and keyboard accessible dropdowns', async ({ page }, testInfo) => {
  await page.goto('./');
  const nav = page.getByRole('navigation', { name: '주요 메뉴', exact: true });
  if (testInfo.project.name === 'mobile') await page.getByRole('button', { name: '메뉴 열기' }).click();
  await expect(nav.locator(':scope > a, :scope > details')).toHaveCount(6);
  await expect(nav.locator('.nav-home')).toHaveText('홈');
  for (const group of navigation) {
    const summary = nav.locator('summary').filter({ hasText: group.label });
    await summary.focus();
    await page.keyboard.press('Enter');
    const details = nav.locator('details').filter({ has: page.locator('summary').filter({ hasText: group.label }) });
    await expect(details).toHaveAttribute('open', '');
    await expect(details.locator('a')).toHaveText(group.pages.map((entry) => entry.label));
    await page.keyboard.press('Escape');
    await expect(details).not.toHaveAttribute('open', '');
    await expect(summary).toBeFocused();
  }
  await nav.locator('summary').filter({ hasText: '회사소개' }).click();
  await page.screenshot({ path: testInfo.outputPath('navigation.png'), animations: 'disabled' });
  await nav.getByRole('link', { name: '회사개요', exact: true }).click();
  await expect(page).toHaveURL(/company-overview\.html$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('회사개요');
});

test('mobile menu closes with Escape, outside clicks and viewport changes', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile-specific menu behavior');
  await page.goto('./');
  const nav = page.getByRole('navigation', { name: '주요 메뉴', exact: true });
  const toggle = page.locator('.menu-toggle');
  await expect(nav).toBeHidden();
  await toggle.click();
  await expect(nav).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(nav).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.mouse.click(8, 650);
  await expect(nav).toBeHidden();
  await toggle.click();
  await page.setViewportSize({ width: 1200, height: 900 });
  await expect(nav).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(nav).toBeHidden();
});

test('confirmed address and map links are correct, and address copy works', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: async (text: string) => { document.documentElement.dataset.copied = text; } } });
  });
  await page.goto('./company-location.html');
  await expect(page.locator('[data-location-address]')).toHaveText(company.address);
  for (const address of await page.locator('[data-company-address]').all()) await expect(address).toHaveText(company.address);
  const mapLinks = page.locator('.location-panel a');
  await expect(mapLinks).toHaveCount(2);
  for (const href of await mapLinks.evaluateAll((links) => links.map((link) => link.getAttribute('href')!))) {
    expect(decodeURIComponent(href)).toContain('충남 천안시 서북구 직산읍 금곡로 74-10');
  }
  await page.getByRole('button', { name: '주소 복사' }).click();
  await expect(page.getByRole('status')).toHaveText('주소를 복사했습니다.');
  await expect(page.locator('html')).toHaveAttribute('data-copied', company.address);
});

test('blocked clipboard access offers a usable manual copy fallback', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: async () => { throw new Error('Permission denied'); } } });
  });
  await page.goto('./company-location.html');
  await page.getByRole('button', { name: '주소 복사' }).click();
  await expect(page.getByRole('status')).toContainText('주소를 선택했습니다.');
  expect(await page.evaluate(() => window.getSelection()?.toString())).toBe(company.address);
});

test('unprovided contacts are marked, and no nonfunctional form or download is shown', async ({ page }) => {
  await page.goto('./support-contact.html');
  await expect(page.locator('main')).toContainText('@@수정필요@@');
  await expect(page.locator('form, a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0);
  await expect(page.locator('main [data-company-address]')).toHaveText(company.address);
  await page.goto('./support-downloads.html');
  await expect(page.locator('.document-row')).toHaveCount(3);
  await expect(page.locator('a[download]')).toHaveCount(0);
  expect(await page.locator('a[target="_blank"]').evaluateAll((links) => links.every((link) => link.getAttribute('rel')?.includes('noopener')))).toBe(true);
});

test('company pages and navigation work without JavaScript', async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: testInfo.project.name === 'mobile' ? { width: 390, height: 844 } : { width: 1440, height: 1000 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/flc-preview/index.html');
  const nav = page.getByRole('navigation', { name: '주요 메뉴', exact: true });
  await expect(nav).toBeVisible();
  await nav.locator('summary').filter({ hasText: '회사소개' }).click();
  await nav.getByRole('link', { name: '오시는길', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('오시는길');
  await expect(page.locator('[data-location-address]')).toHaveText(company.address);
  await context.close();
});

test('320px pages do not overflow and honor reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 700 });
  for (const file of ['index.html', 'company-location.html', 'company-organization.html', 'product-1.html', 'support-notices.html', 'careers-values.html']) {
    await page.goto(`./${file}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), file).toBe(true);
  }
  expect(await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe('auto');
});
