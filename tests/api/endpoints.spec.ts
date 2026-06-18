import { test, expect } from '@playwright/test';

test.describe('API Collection Endpoints', () => {
  test.describe('GET /api/posts', () => {
    test('Positive: should return 200 OK and an array of posts', async ({ request }) => {
      const response = await request.get('/api/posts');
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);

      const json = await response.json();
      expect(json).toHaveProperty('data');
      expect(Array.isArray(json.data)).toBeTruthy();

      if (json.data.length > 0) {
        const post = json.data[0];
        expect(post).toHaveProperty('_id');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('slug');
      }
    });
  });

  test.describe('POST /api/chat', () => {
    test('Positive: should return 200 OK and stream text for valid messages payload', async ({ request }) => {
      const response = await request.post('/api/chat', {
        data: {
          messages: [
            { role: 'user', content: 'Say "hello playwright"' }
          ]
        }
      });
      
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
      
      // Since it's a stream, we read the text and ensure it's not empty
      const text = await response.text();
      expect(text.length).toBeGreaterThan(0);
    });

    test('Negative: should return 400 Bad Request for missing messages array', async ({ request }) => {
      const response = await request.post('/api/chat', {
        data: {
          // Missing 'messages' field
          query: 'hello'
        }
      });
      
      expect(response.status()).toBe(400);
      const json = await response.json();
      expect(json).toHaveProperty('error');
      expect(json.error).toContain("'messages' array is required");
    });

    test('Negative: should return 400 Bad Request for incorrectly typed messages', async ({ request }) => {
      const response = await request.post('/api/chat', {
        data: {
          // 'messages' is a string instead of an array
          messages: "hello"
        }
      });
      
      expect(response.status()).toBe(400);
    });

    test('Edge Case: should handle exceptionally long text gracefully', async ({ request }) => {
      const longText = 'a'.repeat(10000); // 10,000 characters
      const response = await request.post('/api/chat', {
        data: {
          messages: [
            { role: 'user', content: `Summarize this text: ${longText}` }
          ]
        }
      });
      
      // We expect it to either succeed or return a controlled error (e.g., 500 from AI model payload limits),
      // but it shouldn't completely crash the Next.js server connection.
      expect([200, 400, 500]).toContain(response.status());
    });
  });
});
