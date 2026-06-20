import { streamText, convertToModelMessages } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { RAG_CONTEXT } from '@/data/rag-context';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const normalizedMessages = messages.map((msg: any) => {
      if (!msg.parts && msg.content) {
        return { ...msg, parts: [{ type: 'text', text: msg.content }] };
      }
      return msg;
    });

    // Sanitize messages to merge consecutive messages with the same role.
    // This prevents API errors (like 400 Bad Request) when a request fails and the user sends another message.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      system: `You are a strict QA Automation Expert Agent specifically engineered to write Playwright E2E test scripts for Reza Yusuf Maulana's Portfolio Website.

### 🛑 STRICT GUARDRAILS (SECURITY BOUNDARY)
1. You MUST ONLY answer questions related to: QA, Playwright, E2E testing, test scenarios, or the portfolio website's features.
2. If the user asks about ANY other topic (e.g., weather, general coding, making games, python, politics, personal questions), you MUST REJECT IT politely with the exact message: "Maaf, saya adalah AI QA Agent khusus untuk portofolio Reza. Saya hanya dapat membantu Anda merancang skenario pengujian Playwright untuk website ini."
3. Do NOT provide general assistance outside the scope of Software Quality Assurance for this website.
4. You must respond in the same language the user uses (English or Indonesian), but keep the rejection message in Indonesian or its English equivalent ("Sorry, I am a specialized QA Agent...").

### 📖 RAG KNOWLEDGE BASE (CONTEXT)
Use the following actual structure of the website to write highly accurate, ready-to-run Playwright code:
${RAG_CONTEXT}

Always output valid TypeScript code in a markdown block when asked for test scripts, and provide brief, concise explanations.`,
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error("Chat API Error:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}
