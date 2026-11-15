"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Country, State } from "country-state-city";

const allCountries = Country.getAllCountries();

const eventFormats = [
  "Keynote",
  "Workshop / Training",
  "Panel Discussion",
  "Sermon / Ministry",
  "Conference",
  "Virtual / Online",
  "Other",
];

type FormStatus = "idle" | "submitting" | "error";

const labelClass =
  "block font-heading text-[0.75rem] uppercase tracking-[0.16em] text-brand-ink";
const fieldClass =
  "mt-3 min-h-13 w-full border border-black/10 bg-white px-4 py-3 font-body text-base text-black outline-none transition placeholder:text-black/35 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 disabled:cursor-not-allowed disabled:bg-black/5 disabled:text-black/50";

export function SpeakingBookingForm() {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [countryIso, setCountryIso] = useState("");

  const countryName =
    allCountries.find((item) => item.isoCode === countryIso)?.name ?? "";
  const statesForCountry = countryIso ? State.getStatesOfCountry(countryIso) : [];
  const hasStateList = statesForCountry.length > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/speaking", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("The request could not be sent.");
      }

      form.reset();
      router.push("/thank-you");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong while sending your request. Please try again."
      );
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      className="reveal mt-12 grid gap-5 border border-black/10 bg-[#F7F9FB] p-6 lg:p-10"
      aria-label="Speaking engagement booking form"
    >
      <input type="hidden" name="_subject" value="New Speaking Engagement Request" />

      {/* Contact details */}
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            disabled={isSubmitting}
            className={fieldClass}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={isSubmitting}
            className={fieldClass}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            disabled={isSubmitting}
            className={fieldClass}
            placeholder="+234 ..."
          />
        </div>

        <div>
          <label htmlFor="organization" className={labelClass}>
            Organization / Church / Company
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            disabled={isSubmitting}
            className={fieldClass}
            placeholder="Who is hosting the event?"
          />
        </div>
      </div>

      {/* Event details */}
      <div>
        <label htmlFor="eventName" className={labelClass}>
          Event Name
        </label>
        <input
          id="eventName"
          name="eventName"
          type="text"
          required
          disabled={isSubmitting}
          className={fieldClass}
          placeholder="e.g. Annual Leadership Summit 2026"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="eventFormat" className={labelClass}>
            Event Format
          </label>
          <select
            id="eventFormat"
            name="eventFormat"
            defaultValue=""
            required
            disabled={isSubmitting}
            className={fieldClass}
          >
            <option value="" disabled>
              Select one
            </option>
            {eventFormats.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="eventDate" className={labelClass}>
            Event Date
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            disabled={isSubmitting}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="country" className={labelClass}>
            Country
          </label>
          <input type="hidden" name="country" value={countryName} />
          <select
            id="country"
            value={countryIso}
            onChange={(event) => setCountryIso(event.target.value)}
            required
            disabled={isSubmitting}
            className={fieldClass}
          >
            <option value="" disabled>
              Select a country
            </option>
            {allCountries.map((item) => (
              <option key={item.isoCode} value={item.isoCode}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="state" className={labelClass}>
            State / Province / Region
          </label>
          {hasStateList ? (
            <select
              id="state"
              name="state"
              key={countryIso}
              defaultValue=""
              disabled={isSubmitting}
              className={fieldClass}
            >
              <option value="" disabled>
                Select a state
              </option>
              {statesForCountry.map((stateItem) => (
                <option key={stateItem.isoCode} value={stateItem.name}>
                  {stateItem.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              id="state"
              name="state"
              type="text"
              disabled={isSubmitting || !countryIso}
              className={fieldClass}
              placeholder={
                countryIso ? "Enter state / region" : "Select a country first"
              }
            />
          )}
        </div>

        <div>
          <label htmlFor="location" className={labelClass}>
            City / Venue
          </label>
          <input
            id="location"
            name="location"
            type="text"
            disabled={isSubmitting}
            className={fieldClass}
            placeholder="City &amp; venue, or “Virtual”"
          />
        </div>

        <div>
          <label htmlFor="audienceSize" className={labelClass}>
            Expected Audience Size
          </label>
          <input
            id="audienceSize"
            name="audienceSize"
            type="text"
            inputMode="numeric"
            disabled={isSubmitting}
            className={fieldClass}
            placeholder="e.g. 250"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Event Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={7}
          disabled={isSubmitting}
          className="mt-3 w-full resize-y border border-black/10 bg-white px-4 py-3 font-body text-base leading-7 text-black outline-none transition placeholder:text-black/35 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 disabled:cursor-not-allowed disabled:bg-black/5 disabled:text-black/50"
          placeholder="Tell us about the theme, audience, agenda, and what you'd like Dr. TEA to speak on."
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
        {isSubmitting ? "Sending..." : "Submit Speaking Request"}
      </button>
    </form>
  );
}
