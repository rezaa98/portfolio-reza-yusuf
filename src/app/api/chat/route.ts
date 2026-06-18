import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid request format. 'messages' array is required." }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Initialize custom Google provider to support either GOOGLE_GENERATIVE_AI_API_KEY or GEMINI_API_KEY
    const customGoogle = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY,
    });

    const result = streamText({
      model: customGoogle('gemini-2.5-flash'),
      system: `You are a Senior QA Automation Expert specialized in Playwright. 
Your sole purpose is to generate Playwright E2E test scripts in TypeScript for a web application. 
If the user asks for anything else not related to Playwright testing (like weather, general coding, or unrelated tasks), politely decline and state your purpose. 
Always output valid TypeScript code in a markdown block, and provide brief, concise explanations.`,
      messages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}

