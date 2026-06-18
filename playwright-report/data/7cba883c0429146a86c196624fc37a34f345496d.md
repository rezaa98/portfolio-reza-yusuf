# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> Portfolio Verification Suite >> Verify Localization Switcher
- Location: tests/portfolio.spec.ts:33:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /EN|ID/i })

```

# Page snapshot

```yaml
- main [ref=e7]:
  - log [ref=e8]
  - generic [ref=e11]:
    - generic [ref=e13]:
      - generic [ref=e14]:
        - img "Grafana" [ref=e15]
        - heading "Welcome to Grafana" [level=1] [ref=e17]
      - generic [ref=e21]:
        - generic [ref=e22]:
          - generic [ref=e25]: Email or username
          - textbox "Email or username" [active] [ref=e30]:
            - /placeholder: email or username
        - generic [ref=e31]:
          - generic [ref=e34]: Password
          - generic [ref=e38]:
            - textbox "Password" [ref=e39]:
              - /placeholder: password
            - switch "Show password" [ref=e41] [cursor=pointer]:
              - img [ref=e42]
        - button "Log in" [ref=e44] [cursor=pointer]:
          - generic [ref=e45]: Log in
        - link "Forgot your password?" [ref=e47] [cursor=pointer]:
          - /url: /user/password/send-reset-email
          - generic [ref=e48]: Forgot your password?
    - list [ref=e51]:
      - listitem [ref=e52]:
        - img [ref=e53]
        - link "Documentation" [ref=e55] [cursor=pointer]:
          - /url: https://grafana.com/docs/grafana/latest/?utm_source=grafana_footer
        - text: "|"
      - listitem [ref=e56]:
        - img [ref=e57]
        - link "Support" [ref=e59] [cursor=pointer]:
          - /url: https://grafana.com/products/enterprise/?utm_source=grafana_footer
        - text: "|"
      - listitem [ref=e60]:
        - img [ref=e61]
        - link "Community" [ref=e63] [cursor=pointer]:
          - /url: https://community.grafana.com/?utm_source=grafana_footer
        - text: "|"
      - listitem [ref=e64]:
        - link "Open Source" [ref=e65] [cursor=pointer]:
          - /url: https://grafana.com/oss/grafana?utm_source=grafana_footer
        - text: "|"
      - listitem [ref=e66]:
        - link "Grafana v13.0.1-0 (Homebrew)" [ref=e67] [cursor=pointer]:
          - /url: https://github.com/grafana/grafana/blob/main/CHANGELOG.md
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
  10 |     await expect(page.locator('h1')).toContainText('Reza Yusuf Maulana');
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
> 39 |     await langBtn.click();
     |                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
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