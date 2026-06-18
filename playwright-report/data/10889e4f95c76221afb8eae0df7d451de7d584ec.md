# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/endpoints.spec.ts >> API Collection Endpoints >> POST /api/chat >> Positive: should return 200 OK and stream text for valid messages payload
- Location: tests/api/endpoints.spec.ts:24:9

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('API Collection Endpoints', () => {
  4  |   test.describe('GET /api/posts', () => {
  5  |     test('Positive: should return 200 OK and an array of posts', async ({ request }) => {
  6  |       const response = await request.get('/api/posts');
  7  |       expect(response.ok()).toBeTruthy();
  8  |       expect(response.status()).toBe(200);
  9  | 
  10 |       const json = await response.json();
  11 |       expect(json).toHaveProperty('data');
  12 |       expect(Array.isArray(json.data)).toBeTruthy();
  13 | 
  14 |       if (json.data.length > 0) {
  15 |         const post = json.data[0];
  16 |         expect(post).toHaveProperty('_id');
  17 |         expect(post).toHaveProperty('title');
  18 |         expect(post).toHaveProperty('slug');
  19 |       }
  20 |     });
  21 |   });
  22 | 
  23 |   test.describe('POST /api/chat', () => {
  24 |     test('Positive: should return 200 OK and stream text for valid messages payload', async ({ request }) => {
  25 |       const response = await request.post('/api/chat', {
  26 |         data: {
  27 |           messages: [
  28 |             { role: 'user', content: 'Say "hello playwright"' }
  29 |           ]
  30 |         }
  31 |       });
  32 |       
  33 |       expect(response.ok()).toBeTruthy();
  34 |       expect(response.status()).toBe(200);
  35 |       
  36 |       // Since it's a stream, we read the text and ensure it's not empty
  37 |       const text = await response.text();
> 38 |       expect(text.length).toBeGreaterThan(0);
     |                           ^ Error: expect(received).toBeGreaterThan(expected)
  39 |     });
  40 | 
  41 |     test('Negative: should return 400 Bad Request for missing messages array', async ({ request }) => {
  42 |       const response = await request.post('/api/chat', {
  43 |         data: {
  44 |           // Missing 'messages' field
  45 |           query: 'hello'
  46 |         }
  47 |       });
  48 |       
  49 |       expect(response.status()).toBe(400);
  50 |       const json = await response.json();
  51 |       expect(json).toHaveProperty('error');
  52 |       expect(json.error).toContain("'messages' array is required");
  53 |     });
  54 | 
  55 |     test('Negative: should return 400 Bad Request for incorrectly typed messages', async ({ request }) => {
  56 |       const response = await request.post('/api/chat', {
  57 |         data: {
  58 |           // 'messages' is a string instead of an array
  59 |           messages: "hello"
  60 |         }
  61 |       });
  62 |       
  63 |       expect(response.status()).toBe(400);
  64 |     });
  65 | 
  66 |     test('Edge Case: should handle exceptionally long text gracefully', async ({ request }) => {
  67 |       const longText = 'a'.repeat(10000); // 10,000 characters
  68 |       const response = await request.post('/api/chat', {
  69 |         data: {
  70 |           messages: [
  71 |             { role: 'user', content: `Summarize this text: ${longText}` }
  72 |           ]
  73 |         }
  74 |       });
  75 |       
  76 |       // We expect it to either succeed or return a controlled error (e.g., 500 from AI model payload limits),
  77 |       // but it shouldn't completely crash the Next.js server connection.
  78 |       expect([200, 400, 500]).toContain(response.status());
  79 |     });
  80 |   });
  81 | });
  82 | 
```