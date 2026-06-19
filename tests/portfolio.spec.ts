import { test, expect } from '@playwright/test';

test.describe('Portfolio Verification Suite', () => {

  test('Verify Homepage Load and Welcome Text', async ({ page }) => {
    // Navigate to English homepage explicitly
    await page.goto('/en');

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Verify the hero heading contains name
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toContainText('Reza Yusuf Maulana', { timeout: 10000 });

    // Verify the subtitle heading contains QA Engineer
    const subtitle = page.locator('h2').first();
    await expect(subtitle).toContainText('QA Engineer', { timeout: 10000 });
  });

  test('Verify Web Demo Navigation', async ({ page }) => {
    // Start at English homepage
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    // Look for Web Demo link in the navbar (visible on desktop viewport)
    const webDemoLink = page.getByRole('link', { name: /Web Demo/i }).first();
    await expect(webDemoLink).toBeVisible({ timeout: 10000 });

    // Click Web Demo and wait for navigation
    await webDemoLink.click();
    await page.waitForURL('**/web-demo', { timeout: 15000 });

    // Verify correct heading on Web Demo page
    const heading = page.locator('h1');
    await expect(heading).toContainText('Automation', { timeout: 10000 });
  });

  test('Verify Localization Switcher', async ({ page }) => {
    // Navigate to English homepage
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    // Verify we start in English — check the availability badge
    await expect(page.getByText('Available for new opportunities')).toBeVisible({ timeout: 10000 });

    // Click the language toggle button (it directly switches locale, no dropdown)
    const langBtn = page.getByTitle('Switch Language').first();
    await expect(langBtn).toBeVisible({ timeout: 10000 });
    await langBtn.click();

    // Wait for navigation to Indonesian locale
    await page.waitForURL('**/id', { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    // Verify text changed to Indonesian — use the actual translation from id.json
    await expect(page.getByText('Terbuka untuk peluang baru')).toBeVisible({ timeout: 10000 });
  });

  test('Negative Test: Verify 404 on Invalid Route', async ({ page }) => {
    // Navigate to a non-existent URL
    const response = await page.goto('/en/this-page-does-not-exist');
    
    // Verify HTTP status is 404
    expect(response?.status()).toBe(404);
    
    // Verify Next.js default 404 page content
    const heading = page.locator('h2');
    await expect(heading).toContainText('This page could not be found.', { timeout: 10000 });
  });

  test('Edge Test: Verify Mobile Navigation Menu', async ({ page }) => {
    // Set viewport to mobile size (iPhone X)
    await page.setViewportSize({ width: 375, height: 812 });
    
    // Navigate to English homepage
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Find the hamburger menu button
    const navBtn = page.locator('header button.md\\:hidden');
    await expect(navBtn).toBeVisible({ timeout: 10000 });
    
    // Click to open menu
    await navBtn.click();
    
    // Verify that a menu link (e.g., "About") becomes visible
    const aboutLink = page.getByRole('link', { name: /About/i }).last();
    await expect(aboutLink).toBeVisible({ timeout: 10000 });
  });

  test('Verify SEO and Meta Tags', async ({ page }) => {
    // Navigate to English homepage
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Verify Page Title
    await expect(page).toHaveTitle(/RezaCode\.cloud \| QA Engineer/i);
    
    // Verify Meta Description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Portfolio of Reza Yusuf Maulana/i);
    
    // Verify OpenGraph Title
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /RezaCode\.cloud \| QA Engineer/i);
  });

});
