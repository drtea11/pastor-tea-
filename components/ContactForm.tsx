"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const inquiryTypes = [
  "Purpose Coaching",
  "Programs",
  "Speaking Invitation",
  "Books Or Writing",
  "General Inquiry",
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("The message could not be sent.");
      }

      form.reset();
      // Redirect to thank you page
      router.push("/thank-you");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong while sending your message. Please try again."
      );
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      className="reveal mt-12 grid gap-5 border border-black/10 bg-[#F7F9FB] p-6 lg:p-10"
      aria-label="Contact form"
    >
      <input type="hidden" name="_subject" value="New Dr. TEA Website Inquiry" />

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block font-heading text-[0.75rem] uppercase tracking-[0.16em] text-brand-ink"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            disabled={isSubmitting}
            className="mt-3 min-h-13 w-full border border-black/10 bg-white px-4 py-3 font-body text-base text-black outline-none transition placeholder:text-black/35 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 disabled:cursor-not-allowed disabled:bg-black/5 disabled:text-black/50"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block font-heading text-[0.75rem] uppercase tracking-[0.16em] text-brand-ink"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={isSubmitting}
            className="mt-3 min-h-13 w-full border border-black/10 bg-white px-4 py-3 font-body text-base text-black outline-none transition placeholder:text-black/35 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 disabled:cursor-not-allowed disabled:bg-black/5 disabled:text-black/50"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="inquiry"
          className="block font-heading text-[0.75rem] uppercase tracking-[0.16em] text-brand-ink"
        >
          Inquiry Type
        </label>
        <select
          id="inquiry"
          name="inquiry"
          defaultValue=""
          required
          disabled={isSubmitting}
          className="mt-3 min-h-13 w-full border border-black/10 bg-white px-4 py-3 font-body text-base text-black outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 disabled:cursor-not-allowed disabled:bg-black/5 disabled:text-black/50"
        >
          <option value="" disabled>
            Select one
          </option>
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-heading text-[0.75rem] uppercase tracking-[0.16em] text-brand-ink"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={7}
          required
          disabled={isSubmitting}
          className="mt-3 w-full resize-y border border-black/10 bg-white px-4 py-3 font-body text-base leading-7 text-black outline-none transition placeholder:text-black/35 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 disabled:cursor-not-allowed disabled:bg-black/5 disabled:text-black/50"
          placeholder="Tell us how we can help."
        />
      </div>

      {status === "error" ? (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-base leading-7 text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex w-full items-center justify-center border-2 border-brand-blue bg-brand-blue px-6 py-4 font-body text-base font-semibold uppercase leading-none text-white transition duration-200 hover:bg-white hover:text-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue disabled:cursor-wait disabled:border-black/20 disabled:bg-black/20 disabled:text-black/45 md:w-auto"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
