import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const customGoogle = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function run() {
  try {
    const result = streamText({
      model: customGoogle('gemini-1.5-flash'),
      messages: [{ role: 'user', content: 'hello' }],
    });
    
    for await (const chunk of result.textStream) {
      process.stdout.write(chunk);
    }
    console.log('\nDone.');
  } catch (error) {
    console.error("Error:", error);
  }
}
run();
