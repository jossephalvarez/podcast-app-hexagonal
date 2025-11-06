import { test, expect, Page } from '@playwright/test';

test.describe('App navigation flow', () => {
  async function clearStorage(page: Page) {
    await page.goto('/');
    await page.evaluate(() => {
      indexedDB.deleteDatabase('keyval-store');
      localStorage.clear();
      sessionStorage.clear();
    });
  }

  async function waitForCards(page: Page, timeout = 30000) {
    const cards = page.locator('.podcast-card');
    await expect(cards.first()).toBeVisible({ timeout });
    return cards;
  }

  async function goToFirstPodcast(page: Page) {
    const cards = await waitForCards(page, 15000);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      cards.first().click(),
    ]);
  }

  test('Home page loads and shows podcasts', async ({ page }) => {
    await clearStorage(page);
    await page.goto('/', { waitUntil: 'networkidle' });
    await waitForCards(page);
  });

  test('User can navigate from Home to Podcast Detail', async ({ page }) => {
    await clearStorage(page);
    await page.goto('/', { waitUntil: 'networkidle' });
    await goToFirstPodcast(page);
    await expect(page.locator('.episodes')).toBeVisible({ timeout: 80000 });
  });

  test('User can open an Episode Detail', async ({ page }) => {
    await clearStorage(page);
    await page.goto('/', { waitUntil: 'networkidle' });
    await goToFirstPodcast(page);
    const episodeLink = page.locator('.episodes table tbody tr td a').first();
    await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }), episodeLink.click()]);
    await expect(page.locator('.episode-detail h2')).toBeVisible({ timeout: 80000 });
  });
});
