import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_SECRET =
  process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const body = new URLSearchParams();
  body.append("secret", TURNSTILE_SECRET);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch (error) {
    console.error("Turnstile verify error:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, message, turnstileToken } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Verification required" },
        { status: 400 }
      );
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    const verified = await verifyTurnstile(turnstileToken, ip);
    if (!verified) {
      return NextResponse.json(
        { error: "Verification failed" },
        { status: 403 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["hello@mrsan.dev"],
      replyTo: email,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Internal error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
