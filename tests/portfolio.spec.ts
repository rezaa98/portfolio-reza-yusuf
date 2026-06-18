import { test, expect } from '@playwright/test';

test.describe('Portfolio Verification Suite', () => {
  
  test('Verify Homepage Load and Welcome Text', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Verify greeting contains Reza Yusuf Maulana
    await expect(page.locator('h1').first()).toContainText('Reza Yusuf Maulana');
    
    // Verify the subtitle contains QA Engineer
    await expect(page.locator('h2').first()).toContainText('QA Engineer');
  });

  test('Verify Web Demo Navigation', async ({ page }) => {
    // Start at homepage
    await page.goto('/');

    // Look for Web Demo link in the navbar
    const webDemoLink = page.getByRole('link', { name: /Web Demo/i }).first();
    await expect(webDemoLink).toBeVisible();

    // Click Web Demo and wait for navigation
    await webDemoLink.click();
    await page.waitForURL('**/web-demo');

    // Verify correct heading on Web Demo page
    const heading = page.locator('h1', { hasText: 'Automation & CI/CD' });
    await expect(heading).toBeVisible();
  });

  test('Verify Localization Switcher', async ({ page }) => {
    // Navigate to homepage in English by default (or via cookies)
    await page.goto('/en');
    
    // Switch to Indonesian language using the Navbar button (using title to avoid matching other buttons)
    const langBtn = page.getByTitle('Switch Language').first();
    await langBtn.click();
    
    // Find the Indonesian language option and click it
    const idOption = page.locator('text=Indonesia').first();
    if (await idOption.isVisible()) {
      await idOption.click();
      await page.waitForURL('**/id');
    }

    // Verify text changes to Indonesian
    const badge = page.locator('text=Tersedia untuk peluang baru').first();
    await expect(badge).toBeVisible();
  });

});
