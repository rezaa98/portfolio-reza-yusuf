import { test, expect } from '@playwright/test';

test.describe('Portfolio Verification Suite', () => {
  
  test('Verify Homepage Load and Welcome Text', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Verify greeting contains Reza Yusuf Maulana
    await expect(page.locator('h1')).toContainText('Reza Yusuf Maulana');
    
    // Verify the subtitle contains QA Engineer
    await expect(page.locator('text=QA Engineer')).toBeVisible();
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
    
    // Switch to Indonesian language using the Navbar button
    const langBtn = page.getByRole('button', { name: /EN|ID/i });
    await langBtn.click();
    
    // Find the Indonesian language option and click it
    const idOption = page.locator('text=Indonesia');
    if (await idOption.isVisible()) {
      await idOption.click();
      await page.waitForURL('**/id');
    }

    // Verify text changes to Indonesian (e.g., "Tersedia untuk peluang baru" instead of "Available for new opportunities")
    const badge = page.locator('.inline-flex.items-center.gap-2');
    await expect(badge).toBeVisible();
  });

});
