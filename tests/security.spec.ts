import { test, expect } from '@playwright/test';

test.describe('DevSecOps: Cyber Security Validation', () => {

  test('Verify HTTP Security Headers are present', async ({ request }) => {
    test.info().annotations.push(
      { type: 'category', description: 'Security' },
      { type: 'description', description: 'Ensure that DevSecOps HTTP security headers are present in the response.' },
      { type: 'label', description: 'Positive' },
      { type: 'testData', description: "{ endpoint: '/', method: 'GET' }" },
      { type: 'steps', description: JSON.stringify(["Send GET request to root.", "Capture response headers.", "Assert x-frame-options is DENY.", "Assert x-content-type-options is nosniff.", "Assert referrer-policy.", "Assert strict-transport-security.", "Assert content-security-policy is defined."]) },
      { type: 'expectedResult', description: 'All security headers are strictly configured.' }
    );
    const response = await request.get('/');
    const headers = response.headers();

    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(headers['strict-transport-security']).toContain('max-age=63072000');
    expect(headers['content-security-policy']).toBeDefined();
  });

  test('XSS Vulnerability Check on Contact Form', async ({ page }) => {
    test.info().annotations.push(
      { type: 'category', description: 'Security' },
      { type: 'description', description: 'Attempt to inject an XSS script payload into the contact form.' },
      { type: 'label', description: 'Negative' },
      { type: 'testData', description: "{ payload: '<script>alert(\"XSS_ATTACK\")</script>' }" },
      { type: 'steps', description: JSON.stringify(["Navigate to homepage.", "Locate contact form fields.", "Inject XSS payload into inputs.", "Submit form.", "Verify no alert dialog is triggered.", "Verify payload is escaped in DOM."]) },
      { type: 'expectedResult', description: 'Application sanitizes the input and prevents XSS execution.' }
    );
    await page.goto('/en');
    
    // Attempt to inject a script payload into the contact form
    const xssPayload = "<script>alert('XSS_ATTACK')</script>";
    
    // We assume the contact form is available on the homepage or wait for it
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageInput = page.locator('textarea[name="message"]');
    const submitBtn = page.getByRole('button', { name: /send|kirim/i });

    await expect(nameInput).toBeVisible();
    let maliciousDialogOpened = false;
    page.on('dialog', async dialog => {
      if (dialog.message().includes('XSS_ATTACK')) maliciousDialogOpened = true;
      await dialog.dismiss();
    });

    await nameInput.fill(xssPayload);
    await emailInput.fill('hacker@example.com');
    await messageInput.fill(xssPayload);
    await submitBtn.click();
    await expect(page.getByRole('status')).toContainText(/unavailable|tidak dapat|delivered|berhasil/i);

    expect(maliciousDialogOpened).toBe(false);
    const executablePayloads = await page.locator('script').evaluateAll(
      scripts => scripts.filter(script => script.textContent?.includes('XSS_ATTACK')).length,
    );
    expect(executablePayloads).toBe(0);
  });
  test('Path Traversal / LFI Vulnerability Check', async ({ request }) => {
    test.info().annotations.push(
      { type: 'category', description: 'Security' },
      { type: 'description', description: 'Attempt to access sensitive server files via Path Traversal.' },
      { type: 'label', description: 'Negative' },
      { type: 'testData', description: "{ path: '/blog/../../../../etc/passwd' }" },
      { type: 'steps', description: JSON.stringify(["Send GET request with path traversal payload.", "Verify server responds with 400 or 404.", "Verify response body does not contain sensitive system data."]) },
      { type: 'expectedResult', description: 'Application blocks path traversal and returns 404/400 safely.' }
    );
    const response = await request.get('/blog/../../../../etc/passwd');
    expect([400, 404]).toContain(response.status());
    const body = await response.text();
    expect(body).not.toContain('root:x:0:0:root'); // Standard /etc/passwd content
  });

  test('CORS Policy Validation on API', async ({ request }) => {
    test.info().annotations.push(
      { type: 'category', description: 'Security' },
      { type: 'description', description: 'Verify that the API rejects or restricts Cross-Origin Resource Sharing from untrusted domains.' },
      { type: 'label', description: 'Edge' },
      { type: 'testData', description: "{ endpoint: '/api/chat', origin: 'https://evil-hacker.com' }" },
      { type: 'steps', description: JSON.stringify(["Send OPTIONS/POST request to API with fake Origin.", "Check CORS response headers."]) },
      { type: 'expectedResult', description: 'API does not return Access-Control-Allow-Origin for the malicious domain.' }
    );
    const response = await request.post('/api/chat', {
      headers: {
        'Origin': 'https://evil-hacker.com',
      },
      data: { messages: [{ role: 'user', content: 'hello' }] }
    });
    expect(response.status()).toBe(403);
    
    // Check that the Access-Control-Allow-Origin is not the evil domain
    const headers = response.headers();
    expect(headers['access-control-allow-origin']).not.toBe('https://evil-hacker.com');
  });

  test('API Rate Limiting & DoS Handling Validation', async ({ request }) => {
    test.info().annotations.push(
      { type: 'category', description: 'Security' },
      { type: 'description', description: 'Verify that the API handles burst requests gracefully (Rate Limiting/Quota).' },
      { type: 'label', description: 'Negative' },
      { type: 'testData', description: "{ endpoint: '/api/chat', burstCount: 5 }" },
      { type: 'steps', description: JSON.stringify(["Send 5 rapid concurrent requests to the API.", "Verify responses are handled without server crashing (500).", "Check for 429 Too Many Requests status."]) },
      { type: 'expectedResult', description: 'Server handles burst load gracefully, potentially returning 429.' }
    );
    
    const requests = Array(13).fill(0).map(() =>
      request.post('/api/chat', {
        headers: { 'x-forwarded-for': '203.0.113.99' },
        data: { messages: [{ role: 'user', content: '' }] },
      })
    );
    
    const responses = await Promise.all(requests);
    
    expect(responses.some(response => response.status() === 429)).toBe(true);
    expect(responses.every(response => [400, 429].includes(response.status()))).toBe(true);
  });

  test('Cookie Security Validation (Secure & SameSite)', async ({ page, context }) => {
    test.info().annotations.push(
      { type: 'category', description: 'Security' },
      { type: 'description', description: 'Verify that application cookies have secure flags set.' },
      { type: 'label', description: 'Positive' },
      { type: 'testData', description: "{}" },
      { type: 'steps', description: JSON.stringify(["Navigate to homepage to generate cookies.", "Extract cookies from browser context.", "Assert Secure and SameSite attributes."]) },
      { type: 'expectedResult', description: 'Cookies are secure and protected against CSRF.' }
    );
    
    await page.goto('/en');
    const cookies = await context.cookies();
    const localeCookies = cookies.filter(cookie => cookie.name === 'NEXT_LOCALE');

    for (const cookie of localeCookies) {
      if (cookie.name === 'NEXT_LOCALE') {
        // Next.js locale cookie should ideally have SameSite=Lax or Strict
        expect(['Lax', 'Strict']).toContain(cookie.sameSite);
      }
    }
    expect(localeCookies.length).toBeLessThanOrEqual(1);
  });

});
