"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function BlogNewsletterBar() {
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
    <div className="mx-auto w-full max-w-xl">
      <form
        onSubmit={handleSubmit}
        aria-label="Subscribe to the newsletter"
        className="flex items-center gap-2 rounded-full border border-black/10 bg-white p-1.5 shadow-soft transition focus-within:border-brand-blue/60 focus-within:ring-4 focus-within:ring-brand-blue/10 sm:gap-3 sm:p-2"
      >
        <label htmlFor="blog-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="blog-newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          disabled={submitting}
          placeholder="Enter your email address"
          className="min-w-0 flex-1 bg-transparent px-4 font-body text-base text-brand-ink outline-none placeholder:text-brand-muted disabled:cursor-not-allowed sm:px-5"
        />
        <button
          type="submit"
          disabled={submitting}
          className="shrink-0 cursor-pointer rounded-full bg-brand-blue px-6 py-3 font-body text-sm font-semibold leading-none text-white transition-colors duration-200 hover:bg-[#0277af] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:cursor-wait disabled:bg-brand-blue/60 sm:px-7"
        >
          {submitting ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {message ? (
        <p
          role="status"
          aria-live="polite"
          className={`mt-4 text-sm leading-6 ${
            status === "error" ? "text-red-600" : "text-brand-blue"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
