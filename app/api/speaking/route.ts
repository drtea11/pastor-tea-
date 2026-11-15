import { NextResponse } from "next/server";

const FORMSPREE_ENDPOINT =
  process.env.FORMSPREE_SPEAKING_ENDPOINT ??
  process.env.FORMSPREE_CONTACT_ENDPOINT ??
  "https://formspree.io/f/mnjyjopo";

export async function POST(request: Request) {
  let body: FormData | null = null;

  try {
    body = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.get("name") ?? "").trim();
  const email = String(body.get("email") ?? "").trim();
  const eventName = String(body.get("eventName") ?? "").trim();

  if (!name || !email || !eventName) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and event name are required." },
      { status: 400 }
    );
  }

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }

  const fields = [
    "name",
    "email",
    "phone",
    "organization",
    "eventName",
    "eventFormat",
    "eventDate",
    "country",
    "state",
    "location",
    "audienceSize",
    "message",
  ] as const;

  try {
    const form = new FormData();
    form.append("Request Type", "Speaking Engagement");
    for (const field of fields) {
      const value = body.get(field);
      if (value) form.append(field, String(value));
    }
    form.append("_subject", `New Speaking Request: ${eventName}`);

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: form,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "Request could not be sent. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 502 }
    );
  }
}
