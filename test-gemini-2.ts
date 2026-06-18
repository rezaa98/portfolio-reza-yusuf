import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const customGoogle = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function run(modelName: string) {
  try {
    const result = streamText({
      model: customGoogle(modelName),
      messages: [{ role: 'user', content: 'hello' }],
    });
    
    let text = "";
    for await (const chunk of result.textStream) {
      text += chunk;
    }
    console.log(`Model ${modelName} worked! Response:`, text.substring(0, 30));
    return true;
  } catch (error: any) {
    console.error(`Model ${modelName} failed:`, error.message);
    return false;
  }
}

async function main() {
  const models = ['gemini-1.5-flash-latest', 'gemini-1.5-pro-latest', 'gemini-1.5-pro', 'gemini-pro', 'models/gemini-1.5-flash'];
  for (const m of models) {
    if (await run(m)) break;
  }
}
main();
