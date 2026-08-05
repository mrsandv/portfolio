import { NextResponse } from "next/server";
import { Resend } from "resend";
import { fetchSettings } from "@/lib/cms-server";
import { logError } from "@/lib/log";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret) {
    logError("turnstile", "TURNSTILE_SECRET_KEY missing");
    return false;
  }
  const body = new URLSearchParams();
  body.append("secret", turnstileSecret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch (error) {
    logError("turnstile", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      logError("contact", "RESEND_API_KEY missing");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const { name, email, message, turnstileToken } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!turnstileToken) {
      return NextResponse.json({ error: "Verification required" }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    const verified = await verifyTurnstile(turnstileToken, ip);
    if (!verified) {
      return NextResponse.json({ error: "Verification failed" }, { status: 403 });
    }

    const settings = await fetchSettings("en");
    const toEmail = settings?.email;
    if (!toEmail) {
      logError("contact", "settings.email missing — cannot deliver message");
      return NextResponse.json({ error: "Contact destination not configured" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      logError("resend", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    logError("contact", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
