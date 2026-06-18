import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const customGoogle = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function run() {
  const result = streamText({
    model: customGoogle('gemini-2.5-flash'),
    messages: [{ role: 'user', content: 'hello' }],
  });
  
  const response = result.toUIMessageStreamResponse();
  console.log("Headers:", response.headers);
  const reader = response.body?.getReader();
  if (reader) {
    const { value, done } = await reader.read();
    console.log("Chunk:", new TextDecoder().decode(value));
  }
}
run();
