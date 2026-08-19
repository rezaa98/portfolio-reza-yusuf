import { Resend } from "resend";
import { z } from "zod";
import { checkRateLimit, getClientIp, hasTrustedOrigin } from "@/shared/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5_000),
  website: z.string().max(0).optional(),
});

function jsonError(status: number, code: string, message: string, headers?: HeadersInit) {
  return Response.json({ error: { code, message } }, { status, headers });
}

export async function POST(request: Request) {
  if (!hasTrustedOrigin(request)) {
    return jsonError(403, "ORIGIN_NOT_ALLOWED", "The request origin is not allowed.");
  }
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 10_000) {
    return jsonError(413, "PAYLOAD_TOO_LARGE", "The message is too large.");
  }

  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`contact:${ip}`, {
    limit: 5,
    windowMs: 10 * 60 * 1_000,
  });
  if (!rateLimit.allowed) {
    return jsonError(429, "RATE_LIMITED", "Too many messages. Please try again later.", {
      "Retry-After": String(rateLimit.retryAfterSeconds),
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "INVALID_JSON", "The request body must be valid JSON.");
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(400, "INVALID_INPUT", "Please check the submitted contact details.");
  }

  // Honeypot submissions receive a neutral response so bots cannot adapt.
  if (parsed.data.website) {
    return Response.json({ success: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL_TO;
  if (!apiKey || !recipient) {
    return jsonError(
      503,
      "CONTACT_NOT_CONFIGURED",
      "Email delivery is temporarily unavailable. Please use the email link instead.",
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || "Portfolio <onboarding@resend.dev>",
      to: recipient,
      replyTo: parsed.data.email,
      subject: `Portfolio message from ${parsed.data.name}`,
      text: [
        `Name: ${parsed.data.name}`,
        `Email: ${parsed.data.email}`,
        "",
        parsed.data.message,
      ].join("\n"),
    });

    if (error) throw new Error(error.message);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact delivery failed", error);
    return jsonError(502, "DELIVERY_FAILED", "The message could not be delivered. Please try again.");
  }
}
