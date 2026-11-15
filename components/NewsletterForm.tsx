"use client";

import { FormEvent, useState } from "react";
import localFont from "next/font/local";
import { ArrowRight } from "lucide-react";

const garton = localFont({
  src: "../public/fonts/gartonpro-bold.woff2",
  weight: "700",
  style: "normal",
  display: "swap",
});

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      form.reset();
      setStatus("success");
      setMessage("You're subscribed — watch your inbox for a welcome note.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  const submitting = status === "submitting";

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-stretch gap-2" aria-label="Newsletter signup">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          disabled={submitting}
          placeholder="Your email address"
          className="min-h-12 flex-1 border border-black/15 bg-white px-4 font-body text-base text-brand-ink outline-none transition placeholder:text-brand-muted/70 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 disabled:cursor-not-allowed disabled:bg-black/5"
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-12 shrink-0 items-center gap-2 bg-brand-ink px-5 font-body text-sm font-semibold uppercase leading-none text-white transition hover:bg-brand-green hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green disabled:cursor-wait disabled:bg-black/30"
        >
          {submitting ? "Sending" : "Send"}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </form>
      {message ? (
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 text-sm leading-6 ${
            status === "error" ? "text-red-600" : "text-brand-blue"
          }`}
        >
          {message}
        </p>
      ) : null}
      <p className="mt-3 font-body text-[0.72rem] leading-5 text-brand-ink/35">
        Subscribe and get a free copy of{" "}
        <span className="text-brand-ink/45">The World Needs You</span>.
      </p>
    </div>
  );
}
