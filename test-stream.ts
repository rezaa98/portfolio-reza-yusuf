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
  
  if (typeof result.toUIMessageStreamResponse === 'function') {
    console.log("Has toUIMessageStreamResponse!");
  } else if (typeof result.toTextStreamResponse === 'function') {
    console.log("Has toTextStreamResponse!");
  } else if (typeof result.toDataStreamResponse === 'function') {
    console.log("Has toDataStreamResponse!");
  }
}
run();
