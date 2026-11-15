import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter subscribe endpoint.
 *
 * Preferred: forwards to MailerLite using a server-side API key (never exposed
 * to the browser). Set MAILERLITE_API_KEY (and optionally MAILERLITE_GROUP_ID)
 * in your environment to enable it.
 *
 * Fallback: if no MailerLite key is configured, the address is forwarded to a
 * Formspree endpoint so signups are still captured. Override the target with
 * NEWSLETTER_FALLBACK_ENDPOINT.
 */
export async function POST(request: Request) {
  let email = "";
  let name = "";

  try {
    const body = (await request.json()) as { email?: unknown; name?: unknown };
    email = String(body.email ?? "").trim();
    name = String(body.name ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.MAILERLITE_API_KEY;

  try {
    if (apiKey) {
      const groupId = process.env.MAILERLITE_GROUP_ID;
      const payload: Record<string, unknown> = { email };
      if (name) {
        payload.fields = { name };
      }
      if (groupId) {
        payload.groups = [groupId];
      }

      const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        return NextResponse.json(
          { ok: false, error: "Subscription failed. Please try again." },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true });
    }

    // Fallback so signups are captured before MailerLite is configured.
    const fallbackRaw =
      process.env.NEWSLETTER_FALLBACK_ENDPOINT ?? "https://formspree.io/f/mnjyjopo";

    let fallback: URL;
    try {
      fallback = new URL(fallbackRaw);
    } catch {
      return NextResponse.json({ ok: false, error: "Server misconfiguration." }, { status: 500 });
    }
    const ALLOWED_FALLBACK_HOSTS = new Set(["formspree.io", "connect.mailerlite.com"]);
    if (fallback.protocol !== "https:" || !ALLOWED_FALLBACK_HOSTS.has(fallback.hostname)) {
      return NextResponse.json({ ok: false, error: "Server misconfiguration." }, { status: 500 });
    }

    const response = await fetch(fallback.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, name, _subject: "New newsletter signup (Dr. TEA)" }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "Subscription failed. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Subscription failed. Please try again." },
      { status: 502 }
    );
  }
}
