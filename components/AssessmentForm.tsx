"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import {
  assessmentLevels,
  type EnrollDraft,
  type PaymentPlan,
} from "@/lib/payment";

type AssessmentFormProps = {
  programTitle: string;
  // Where the answers are stashed so the payment page can read them back.
  storageKey: string;
  // Where to go after submitting (the payment page).
  payHref: string;
  // Plan-select mode (Inner Circle). Omit for fixed-price programs.
  plans?: PaymentPlan[];
  defaultPlanId?: string;
};

const labelClass =
  "block font-heading text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-brand-ink";
const fieldClass =
  "mt-2.5 w-full border border-black/10 bg-white px-4 py-3 font-body text-base text-brand-ink outline-none transition placeholder:text-black/35 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10";

export function AssessmentForm({
  programTitle,
  storageKey,
  payHref,
  plans,
  defaultPlanId,
}: AssessmentFormProps) {
  const router = useRouter();
  const hasPlans = Boolean(plans && plans.length > 0);
  const [planId, setPlanId] = useState(defaultPlanId ?? plans?.[0]?.id ?? "");
  const [submitting, setSubmitting] = useState(false);

  const selectedPlan = plans?.find((plan) => plan.id === planId) ?? plans?.[0];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const draft: EnrollDraft = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      level: String(data.get("level") ?? "").trim(),
      goal: String(data.get("goal") ?? "").trim(),
    };
    if (selectedPlan) {
      draft.planId = selectedPlan.id;
      draft.planName = selectedPlan.name;
      draft.amount = `${selectedPlan.price}${selectedPlan.period}`;
    }

    setSubmitting(true);

    // Add the address to the email list. Never block enrollment on this — if the
    // list is down the buyer should still reach the payment step.
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: draft.email, name: draft.name }),
      });
    } catch {
      /* ignore — proceed to payment regardless */
    }

    try {
      sessionStorage.setItem(storageKey, JSON.stringify(draft));
    } catch {
      /* ignore — payment page falls back to a friendly notice */
    }

    router.push(payHref);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-8">
      {/* ── Plan selection (Inner Circle only) ── */}
      {hasPlans ? (
        <fieldset className="rounded-[1.35rem] border border-black/10 bg-white p-7 shadow-[0_4px_32px_rgba(0,0,0,0.06)] lg:p-8">
          <legend className="font-heading text-[1.2rem] font-semibold text-brand-ink">
            Choose Your Plan
          </legend>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {plans!.map((plan) => {
              const isActive = plan.id === planId;
              return (
                <label
                  key={plan.id}
                  className={`relative flex cursor-pointer flex-col gap-1 rounded-xl border-2 bg-white p-5 transition ${
                    isActive
                      ? "border-brand-blue ring-4 ring-brand-blue/10"
                      : "border-black/10 hover:border-black/25"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={plan.id}
                    checked={isActive}
                    onChange={() => setPlanId(plan.id)}
                    className="sr-only"
                  />
                  {plan.badge ? (
                    <span className="absolute right-4 top-4 rounded-full bg-brand-green px-2.5 py-1 font-body text-[0.7rem] font-semibold leading-none text-brand-ink">
                      {plan.badge}
                    </span>
                  ) : null}
                  <span className="flex items-baseline gap-1">
                    <span className="font-heading text-[1.6rem] font-bold leading-none text-brand-ink">
                      {plan.price}
                    </span>
                    <span className="font-body text-sm text-brand-muted">{plan.period}</span>
                  </span>
                  <span className="font-heading text-[0.95rem] font-semibold text-brand-ink">
                    {plan.name}
                  </span>
                  {plan.blurb ? (
                    <span className="font-body text-sm leading-6 text-brand-muted">
                      {plan.blurb}
                    </span>
                  ) : null}
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      {/* ── Your details ── */}
      <article className="rounded-[1.35rem] border border-black/10 bg-white p-7 shadow-[0_4px_32px_rgba(0,0,0,0.06)] lg:p-8">
        <h2 className="font-heading text-[1.2rem] font-semibold text-brand-ink">Your Details</h2>
        <p className="mt-2 font-body text-sm leading-6 text-brand-muted">
          So Dr. TEA can prepare for you and meet you where you are.
        </p>

        <div className="mt-6 space-y-5">
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
              className={`min-h-13 ${fieldClass}`}
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
              className={`min-h-13 ${fieldClass}`}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              className={`min-h-13 ${fieldClass}`}
              placeholder="So the team can reach you"
            />
          </div>

          <div>
            <label htmlFor="level" className={labelClass}>
              Which Best Describes You Right Now?
            </label>
            <select
              id="level"
              name="level"
              required
              defaultValue=""
              className={`min-h-13 cursor-pointer appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-11 ${fieldClass}`}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230D0D0D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
              }}
            >
              <option value="" disabled>
                Select one
              </option>
              {assessmentLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="goal" className={labelClass}>
              Your Main Goal Or Challenge
            </label>
            <textarea
              id="goal"
              name="goal"
              required
              rows={3}
              className={`resize-y ${fieldClass}`}
              placeholder={`What do you most want from ${programTitle}?`}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="gsap-hover mt-7 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-none border-2 border-brand-blue bg-brand-blue px-7 py-4 font-body text-sm font-semibold uppercase leading-none text-white transition duration-200 hover:bg-white hover:text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? "Saving…" : "Continue to Payment"}
        </button>
        <p className="mt-4 font-body text-xs leading-5 text-brand-muted">
          Next you&apos;ll see the bank transfer details and confirm your payment on WhatsApp.
        </p>
      </article>
    </form>
  );
}
