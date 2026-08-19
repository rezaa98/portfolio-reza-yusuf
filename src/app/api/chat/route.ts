import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { RAG_CONTEXT } from '@/data/rag-context';
import { z } from 'zod';
import { checkRateLimit, getClientIp, hasTrustedOrigin } from '@/shared/lib/rate-limit';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const textPartSchema = z.object({
  type: z.literal('text'),
  text: z.string().trim().min(1).max(4_000),
}).passthrough();

const messageSchema = z.object({
  id: z.string().max(200).optional(),
  role: z.enum(['user', 'assistant']),
  content: z.string().trim().min(1).max(4_000).optional(),
  parts: z.array(textPartSchema).min(1).max(10).optional(),
}).refine((message) => message.content || message.parts, {
  message: 'A message must contain text content.',
});

const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
});

function jsonError(status: number, code: string, message: string, headers?: HeadersInit) {
  return Response.json({ error: { code, message } }, { status, headers });
}

export async function POST(req: Request) {
  try {
    if (!hasTrustedOrigin(req)) {
      return jsonError(403, 'ORIGIN_NOT_ALLOWED', 'The request origin is not allowed.');
    }
    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > 50_000) {
      return jsonError(413, 'PAYLOAD_TOO_LARGE', 'The chat request is too large.');
    }

    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(`chat:${ip}`, { limit: 12, windowMs: 60_000 });
    if (!rateLimit.allowed) {
      return jsonError(429, 'RATE_LIMITED', 'Too many chat requests. Please try again shortly.', {
        'Retry-After': String(rateLimit.retryAfterSeconds),
      });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return jsonError(400, 'INVALID_JSON', 'The request body must be valid JSON.');
    }

    if (JSON.stringify(body).length > 50_000) {
      return jsonError(413, 'PAYLOAD_TOO_LARGE', 'The chat request is too large.');
    }

    const parsed = chatRequestSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(400, 'INVALID_INPUT', 'The chat messages are invalid.');
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return jsonError(503, 'CHAT_NOT_CONFIGURED', 'The AI QA Agent is temporarily unavailable.');
    }

    const { messages } = parsed.data;

    // Initialize custom Google provider
    const customGoogle = createGoogleGenerativeAI({
      apiKey,
    });

    // Normalize messages to ensure they use 'parts' (required by convertToModelMessages in AI SDK)
    const normalizedMessages: Array<Omit<UIMessage, 'id'>> = messages.map((msg) => ({
      role: msg.role,
      parts: msg.parts ?? [{ type: 'text' as const, text: msg.content || '' }],
    }));

    // Sanitize messages to merge consecutive messages with the same role.
    // This prevents API errors (like 400 Bad Request) when a request fails and the user sends another message.
    const sanitizedMessages: Array<Omit<UIMessage, 'id'>> = [];
    for (const msg of normalizedMessages) {
      if (sanitizedMessages.length > 0 && sanitizedMessages[sanitizedMessages.length - 1].role === msg.role) {
        const prev = sanitizedMessages[sanitizedMessages.length - 1];
        if (prev.parts && msg.parts) {
          prev.parts = [...prev.parts, ...msg.parts];
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
      maxOutputTokens: 1_500,
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
    return jsonError(502, 'CHAT_PROVIDER_ERROR', 'The AI QA Agent is temporarily unavailable.');
  }
}
