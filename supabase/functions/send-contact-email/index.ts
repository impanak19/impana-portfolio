import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RECIPIENT = "impanakrishna7@gmail.com";
const SENDER = "Portfolio Contact <onboarding@resend.dev>";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 120, email: 254, message: 4000 };

type ContactPayload = { name: string; email: string; message: string };

function respond(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function parsePayload(input: unknown): ContactPayload | null {
  if (typeof input !== "object" || input === null) return null;
  const { name, email, message } = input as Record<string, unknown>;
  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") return null;

  const clean = { name: name.trim(), email: email.trim(), message: message.trim() };
  if (!clean.name || clean.name.length > LIMITS.name) return null;
  if (!EMAIL_PATTERN.test(clean.email) || clean.email.length > LIMITS.email) return null;
  if (!clean.message || clean.message.length > LIMITS.message) return null;
  return clean;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });
  if (req.method !== "POST") return respond({ ok: false, error: "Method not allowed." }, 405);

  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

    const payload = parsePayload(await req.json().catch(() => null));
    if (!payload) {
      return respond({ ok: false, error: "Please check the form fields and try again." }, 400);
    }

    const sendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: SENDER,
        to: [RECIPIENT],
        reply_to: payload.email,
        subject: `New portfolio message from ${payload.name.replace(/[\r\n]+/g, " ")}`,
        text: `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`,
      }),
    });

    if (!sendResponse.ok) {
      console.error("Resend rejected the message", sendResponse.status, await sendResponse.text());
      return respond({ ok: false, error: "Your message could not be delivered. Please try again." }, 502);
    }

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { error } = await supabase.from("contact_messages").insert(payload);
    if (error) console.error("Email sent but the message was not saved", error.message);

    return respond({ ok: true }, 200);
  } catch (err) {
    console.error("send-contact-email failed", err);
    return respond({ ok: false, error: "Your message could not be delivered. Please try again." }, 500);
  }
});
