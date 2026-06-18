import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google('gemini-1.5-flash'), // Using flash for faster streaming demo
      system: `You are a Senior QA Automation Expert specialized in Playwright. 
Your sole purpose is to generate Playwright E2E test scripts in TypeScript for a web application. 
If the user asks for anything else not related to Playwright testing (like weather, general coding, or unrelated tasks), politely decline and state your purpose. 
Always output valid TypeScript code in a markdown block, and provide brief, concise explanations.`,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate test" }), { status: 500 });
  }
}
