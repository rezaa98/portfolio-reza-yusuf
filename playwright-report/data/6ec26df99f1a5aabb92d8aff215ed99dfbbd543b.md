# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> Portfolio Verification Suite >> Verify Homepage Load and Welcome Text
- Location: tests/portfolio.spec.ts:5:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h1')
Expected substring: "Reza Yusuf Maulana"
Received string:    "Welcome to Grafana"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('h1')
    14 × locator resolved to <h1 class="css-1gmqqtf">Welcome to Grafana</h1>
       - unexpected value "Welcome to Grafana"

```

```yaml
- heading "Welcome to Grafana" [level=1]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Portfolio Verification Suite', () => {
  4  |   
  5  |   test('Verify Homepage Load and Welcome Text', async ({ page }) => {
  6  |     // Navigate to homepage
  7  |     await page.goto('/');
  8  |     
  9  |     // Verify greeting contains Reza Yusuf Maulana
> 10 |     await expect(page.locator('h1')).toContainText('Reza Yusuf Maulana');
     |                                      ^ Error: expect(locator).toContainText(expected) failed
  11 |     
  12 |     // Verify the subtitle contains QA Engineer
  13 |     await expect(page.locator('text=QA Engineer')).toBeVisible();
  14 |   });
  15 | 
  16 |   test('Verify Web Demo Navigation', async ({ page }) => {
  17 |     // Start at homepage
  18 |     await page.goto('/');
  19 | 
  20 |     // Look for Web Demo link in the navbar
  21 |     const webDemoLink = page.getByRole('link', { name: /Web Demo/i }).first();
  22 |     await expect(webDemoLink).toBeVisible();
  23 | 
  24 |     // Click Web Demo and wait for navigation
  25 |     await webDemoLink.click();
  26 |     await page.waitForURL('**/web-demo');
  27 | 
  28 |     // Verify correct heading on Web Demo page
  29 |     const heading = page.locator('h1', { hasText: 'Automation & CI/CD' });
  30 |     await expect(heading).toBeVisible();
  31 |   });
  32 | 
  33 |   test('Verify Localization Switcher', async ({ page }) => {
  34 |     // Navigate to homepage in English by default (or via cookies)
  35 |     await page.goto('/en');
  36 |     
  37 |     // Switch to Indonesian language using the Navbar button
  38 |     const langBtn = page.getByRole('button', { name: /EN|ID/i });
  39 |     await langBtn.click();
  40 |     
  41 |     // Find the Indonesian language option and click it
  42 |     const idOption = page.locator('text=Indonesia');
  43 |     if (await idOption.isVisible()) {
  44 |       await idOption.click();
  45 |       await page.waitForURL('**/id');
  46 |     }
  47 | 
  48 |     // Verify text changes to Indonesian (e.g., "Tersedia untuk peluang baru" instead of "Available for new opportunities")
  49 |     const badge = page.locator('.inline-flex.items-center.gap-2');
  50 |     await expect(badge).toBeVisible();
  51 |   });
  52 | 
  53 | });
  54 | 
```