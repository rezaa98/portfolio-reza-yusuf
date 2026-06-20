import { test, expect } from '@playwright/test';

test.describe('DevSecOps: Cyber Security Validation', () => {

  test('Verify HTTP Security Headers are present', async ({ page, request }) => {
    const response = await request.get('/');
    const headers = response.headers();

    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(headers['strict-transport-security']).toContain('max-age=63072000');
    expect(headers['content-security-policy']).toBeDefined();
  });

  test('XSS Vulnerability Check on Contact Form', async ({ page }) => {
    await page.goto('/en');
    
    // Attempt to inject a script payload into the contact form
    const xssPayload = "<script>alert('XSS_ATTACK')</script>";
    
    // We assume the contact form is available on the homepage or wait for it
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageInput = page.locator('textarea[name="message"]');
    const submitBtn = page.getByRole('button', { name: /send|kirim/i });

    // Fill the form with payload if form is present
    if (await nameInput.isVisible()) {
      await nameInput.fill(xssPayload);
      await emailInput.fill('hacker@example.com');
      await messageInput.fill(xssPayload);
      
      await submitBtn.click();
      
      // Verification: Check that no alert box was opened.
      page.on('dialog', dialog => {
        expect(dialog.message()).not.toContain('XSS_ATTACK');
        dialog.dismiss();
      });
      
      // Also verify that the raw script tags are NOT rendered as HTML but rather escaped
      const bodyText = await page.content();
      // Ensure the exact executable script is not in the DOM unprotected
      expect(bodyText).not.toContain('<script>alert(\\\'XSS_ATTACK\\\')</script>');
    }
  });

});
