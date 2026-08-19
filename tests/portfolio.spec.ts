import { test, expect } from '@playwright/test';

test.describe('Portfolio Verification Suite', () => {

  test('Verify Homepage Load and Welcome Text', async ({ page }) => {
    test.info().annotations.push(
      { type: 'category', description: 'UI' },
      { type: 'description', description: 'Ensure the homepage loads correctly and the main H1 welcome text is visible.' },
      { type: 'label', description: 'Positive' },
      { type: 'testData', description: "{ url: '/en', viewport: 'Desktop 1920x1080' }" },
      { type: 'steps', description: JSON.stringify(["Navigate to the English homepage ('/en').", "Wait for the network state to be idle.", "Locate the H1 heading containing the user's name.", "Assert that the heading is visible on the screen."]) },
      { type: 'expectedResult', description: 'The homepage renders successfully with the H1 heading clearly visible.' }
    );
    // Navigate to English homepage explicitly
    await page.goto('/en');

    // Wait for the page to be fully loaded
    await page.waitForLoadState('domcontentloaded');

    // Verify the hero heading contains name
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toContainText('Reza Yusuf Maulana', { timeout: 10000 });

    // Verify the subtitle heading contains QA Engineer
    const subtitle = page.locator('h2').first();
    await expect(subtitle).toContainText('QA Engineer', { timeout: 10000 });
  });

  test('Verify Web Demo Navigation', async ({ page }) => {
    test.info().annotations.push(
      { type: 'category', description: 'UI' },
      { type: 'description', description: 'Verify that users can navigate from the homepage to the Web Demo page using the main navigation link.' },
      { type: 'label', description: 'Positive' },
      { type: 'testData', description: "{ start_url: '/en', target_url: '/en/web-demo' }" },
      { type: 'steps', description: JSON.stringify(["Navigate to the English homepage ('/en').", "Locate the 'QA Demo' link in the navigation menu.", "Click the 'QA Demo' link.", "Wait for the URL to change to include '/web-demo'.", "Verify the H1 heading 'Automation & CI/CD Showcase' is visible."]) },
      { type: 'expectedResult', description: 'User is successfully redirected to the Web Demo page and the correct heading is displayed.' }
    );
    // Start at English homepage
    await page.goto('/en');
    await page.waitForLoadState('domcontentloaded');

    // Look for QA Demo link in the navbar (visible on desktop viewport)
    const webDemoLink = page.getByRole('link', { name: /QA Demo/i }).first();
    await expect(webDemoLink).toBeVisible({ timeout: 10000 });

    // Click QA Demo and wait for navigation
    await webDemoLink.click();
    await page.waitForURL('**/web-demo', { timeout: 15000 });

    // Verify correct heading on Web Demo page
    const heading = page.locator('h1');
    await expect(heading).toContainText('Automation', { timeout: 10000 });
  });

  test('Verify Localization Switcher', async ({ page }) => {
    test.info().annotations.push(
      { type: 'category', description: 'UI' },
      { type: 'description', description: 'Ensure that changing the language from English to Indonesian correctly updates the text content on the page.' },
      { type: 'label', description: 'Positive' },
      { type: 'testData', description: "{ start_url: '/en', target_locale: 'ID' }" },
      { type: 'steps', description: JSON.stringify(["Navigate to the English homepage ('/en').", "Verify initial English text.", "Locate and click the localization dropdown/button.", "Wait for navigation to complete.", "Assert that the text has updated to Indonesian."]) },
      { type: 'expectedResult', description: 'The website successfully changes the locale and translates the target text to Indonesian.' }
    );
    // Navigate to English homepage
    await page.goto('/en');
    await page.waitForLoadState('domcontentloaded');

    // Verify we start in English — check the availability badge
    await expect(page.getByText('Available for new opportunities')).toBeVisible({ timeout: 10000 });

    // Click the language toggle button (it directly switches locale, no dropdown)
    const langBtn = page.getByTitle('Switch Language').first();
    await expect(langBtn).toBeVisible({ timeout: 10000 });
    await langBtn.click();

    // Wait for navigation to Indonesian locale
    await page.waitForURL('**/id', { timeout: 15000 });
    await page.waitForLoadState('domcontentloaded');

    // Verify text changed to Indonesian — use the actual translation from id.json
    await expect(page.getByText('Terbuka untuk peluang baru')).toBeVisible({ timeout: 10000 });
  });

  test('Negative Test: Verify 404 on Invalid Route', async ({ page }) => {
    test.info().annotations.push(
      { type: 'category', description: 'UI' },
      { type: 'description', description: 'Ensure that navigating to a non-existent route correctly renders a 404 error page instead of crashing.' },
      { type: 'label', description: 'Negative' },
      { type: 'testData', description: "{ invalid_url: '/en/this-page-does-not-exist' }" },
      { type: 'steps', description: JSON.stringify(["Attempt to navigate to the non-existent URL.", "Capture the HTTP response status code.", "Assert that the HTTP response status is exactly 404.", "Locate the H2 heading on the page."]) },
      { type: 'expectedResult', description: 'The server returns a 404 HTTP status and the Next.js default 404 page is rendered.' }
    );
    // Navigate to a non-existent URL
    const response = await page.goto('/en/this-page-does-not-exist');
    
    // Verify HTTP status is 404
    expect(response?.status()).toBe(404);
    
    // Verify Next.js default 404 page content
    const heading = page.locator('h2');
    await expect(heading).toContainText('This page could not be found.', { timeout: 10000 });
  });

  test('Edge Test: Verify Mobile Navigation Menu', async ({ page }) => {
    test.info().annotations.push(
      { type: 'category', description: 'UI' },
      { type: 'description', description: 'Verify that the responsive mobile hamburger menu appears and functions correctly on small screens.' },
      { type: 'label', description: 'Edge' },
      { type: 'testData', description: "{ viewport: { width: 375, height: 812 } } // iPhone X" },
      { type: 'steps', description: JSON.stringify(["Set the browser viewport size to mobile dimensions (375x812).", "Navigate to the homepage.", "Locate the hamburger menu button.", "Click the menu button to expand the navigation.", "Verify that the 'About' link becomes visible."]) },
      { type: 'expectedResult', description: 'The mobile menu button is present on small screens, and clicking it successfully reveals the hidden links.' }
    );
    // Set viewport to mobile size (iPhone X)
    await page.setViewportSize({ width: 375, height: 812 });
    
    // Navigate to English homepage
    await page.goto('/en');
    await page.waitForLoadState('domcontentloaded');
    
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
    test.info().annotations.push(
      { type: 'category', description: 'UI' },
      { type: 'description', description: 'Ensure that the page title, meta description, and OpenGraph tags are correctly rendered in the DOM for search engines.' },
      { type: 'label', description: 'Positive' },
      { type: 'testData', description: "{ target_locale: 'en' }" },
      { type: 'steps', description: JSON.stringify(["Navigate to the English homepage.", "Verify the document <title> matches.", "Verify the <meta name='description'> content.", "Verify the <meta property='og:title'> content."]) },
      { type: 'expectedResult', description: 'All critical SEO and OpenGraph metadata tags are present and contain the correct values.' }
    );
    // Navigate to English homepage
    await page.goto('/en');
    await page.waitForLoadState('domcontentloaded');
    
    // Verify Page Title
    await expect(page).toHaveTitle(/RezaCode\.id \| QA Engineer/i);
    
    // Verify Meta Description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Portfolio of Reza Yusuf Maulana/i);
    
    // Verify OpenGraph Title
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /RezaCode\.id \| QA Engineer/i);
  });

});
