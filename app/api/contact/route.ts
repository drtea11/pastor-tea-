import { NextResponse } from "next/server";

const FORMSPREE_ENDPOINT =
  process.env.FORMSPREE_CONTACT_ENDPOINT ?? "https://formspree.io/f/mnjyjopo";

export async function POST(request: Request) {
  let body: FormData | null = null;

  try {
    body = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.get("name") ?? "").trim();
  const email = String(body.get("email") ?? "").trim();
  const message = String(body.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "All fields are required." }, { status: 400 });
  }

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }

  try {
    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("message", message);
    const inquiry = body.get("inquiry");
    if (inquiry) form.append("inquiry", String(inquiry));
    form.append("_subject", "New Dr. TEA Website Inquiry");

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: form,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "Message could not be sent. Please try again." },
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
