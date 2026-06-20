import { streamText, convertToModelMessages } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid request format. 'messages' array is required." }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Initialize custom Google provider
    const customGoogle = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY,
    });

    // Normalize messages to ensure they use 'parts' (required by convertToModelMessages in AI SDK)
    const normalizedMessages = messages.map((msg: any) => {
      if (!msg.parts && msg.content) {
        return { ...msg, parts: [{ type: 'text', text: msg.content }] };
      }
      return msg;
    });

    // Sanitize messages to merge consecutive messages with the same role.
    // This prevents API errors (like 400 Bad Request) when a request fails and the user sends another message.
    const sanitizedMessages: any[] = [];
    for (const msg of normalizedMessages) {
      if (sanitizedMessages.length > 0 && sanitizedMessages[sanitizedMessages.length - 1].role === msg.role) {
        const prev = sanitizedMessages[sanitizedMessages.length - 1];
        if (prev.parts && msg.parts) {
          prev.parts = [...prev.parts, ...msg.parts];
        } else if (prev.content && msg.content) {
          prev.content = prev.content + "\n" + msg.content;
        }
      } else {
        sanitizedMessages.push({ ...msg });
      }
    }

    // AI SDK v6: useChat sends UIMessages (with `parts` array).
    // streamText expects ModelMessages, so we must convert.
    const modelMessages = await convertToModelMessages(sanitizedMessages);

    const result = streamText({
      model: customGoogle(process.env.GEMINI_MODEL || 'gemini-2.5-flash'),
      system: `You are a Senior QA Automation Expert specialized in Playwright. 
Your sole purpose is to generate Playwright E2E test scripts in TypeScript for a web application. 
If the user asks for anything else not related to Playwright testing (like weather, general coding, or unrelated tasks), politely decline and state your purpose. 
Always output valid TypeScript code in a markdown block, and provide brief, concise explanations.`,
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}
