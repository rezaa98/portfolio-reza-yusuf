import { test, expect } from '@playwright/test';

test.describe('API Collection Endpoints', () => {
  test.describe('GET /api/posts', () => {
    test('Positive: should return 200 OK and an array of posts', async ({ request }) => {
      test.info().annotations.push(
        { type: 'category', description: 'API' },
        { type: 'description', description: 'Verify that the Sanity CMS posts API endpoint successfully returns a valid JSON array of blog posts.' },
        { type: 'label', description: 'Positive' },
        { type: 'testData', description: "{ endpoint: '/api/posts', method: 'GET' }" },
        { type: 'steps', description: JSON.stringify(["Send a GET request to '/api/posts'.", "Assert HTTP status is 200.", "Parse JSON response.", "Verify JSON contains a 'data' array.", "Check that first post has _id, title, slug."]) },
        { type: 'expectedResult', description: 'API responds with 200 OK and a correctly structured posts array.' }
      );
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
      test.info().annotations.push(
        { type: 'category', description: 'API' },
        { type: 'description', description: 'Ensure the Gemini AI Chat API processes a valid message payload and returns a text stream.' },
        { type: 'label', description: 'Positive' },
        { type: 'testData', description: "{ endpoint: '/api/chat', method: 'POST', body: { messages: [...] } }" },
        { type: 'steps', description: JSON.stringify(["Send a POST request to '/api/chat'.", "Assert HTTP status is 200.", "Read streaming text response.", "Assert returned text length > 0."]) },
        { type: 'expectedResult', description: 'API accepts the payload and streams a non-empty text response.' }
      );
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
      test.info().annotations.push(
        { type: 'category', description: 'API' },
        { type: 'description', description: 'Verify that the Chat API validates the request body and rejects payloads without a messages array.' },
        { type: 'label', description: 'Negative' },
        { type: 'testData', description: "{ endpoint: '/api/chat', method: 'POST', body: { query: 'hello' } }" },
        { type: 'steps', description: JSON.stringify(["Send POST request without 'messages' array.", "Assert HTTP status is 400.", "Parse response body.", "Verify error message."]) },
        { type: 'expectedResult', description: 'API rejects malformed request and returns 400.' }
      );
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
      test.info().annotations.push(
        { type: 'category', description: 'API' },
        { type: 'description', description: 'Ensure the Chat API validates the type of the messages field.' },
        { type: 'label', description: 'Negative' },
        { type: 'testData', description: "{ endpoint: '/api/chat', method: 'POST', body: { messages: 'hello' } }" },
        { type: 'steps', description: JSON.stringify(["Send POST request with 'messages' as a string.", "Assert HTTP status is 400."]) },
        { type: 'expectedResult', description: 'API strictly enforces typing and rejects string inputs.' }
      );
      const response = await request.post('/api/chat', {
        data: {
          // 'messages' is a string instead of an array
          messages: "hello"
        }
      });
      
      expect(response.status()).toBe(400);
    });

    test('Edge Case: should handle exceptionally long text gracefully', async ({ request }) => {
      test.info().annotations.push(
        { type: 'category', description: 'API' },
        { type: 'description', description: 'Test the robustness of the Chat API when flooded with an exceptionally long string payload.' },
        { type: 'label', description: 'Edge' },
        { type: 'testData', description: "10,000 characters payload" },
        { type: 'steps', description: JSON.stringify(["Generate 10,000 character string.", "Send POST request.", "Verify server does not crash.", "Assert HTTP status is 200, 400, or 500."]) },
        { type: 'expectedResult', description: 'API processes or rejects the large payload gracefully.' }
      );
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
