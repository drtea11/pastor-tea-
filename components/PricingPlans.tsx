"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { Button } from "./Button";
import type { ProgramPricing } from "@/lib/programs";

type BillingPeriod = "monthly" | "annual";

export function PricingPlans({ pricing, dark }: { pricing: ProgramPricing; dark?: boolean }) {
  const [billing, setBilling] = useState<BillingPeriod>("annual");
  const monthlyLabel = pricing.monthlyLabel ?? "Monthly";
  const annualLabel = pricing.annualLabel ?? "Annual";

  // Single-price mode: one plan, no toggle. Toggle mode: monthly/annual switch.
  const singleMode = Boolean(pricing.single);
  const plan = singleMode
    ? pricing.single
    : billing === "monthly"
      ? pricing.monthly
      : pricing.annual;

  if (!plan) return null;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="reveal mx-auto max-w-2xl text-center">
        <h2 className={`font-heading font-medium capitalize leading-tight ${dark ? "text-white" : "text-brand-ink"}`}>
          {pricing.heading}
        </h2>
        <p className={`mt-5 ${dark ? "text-white/55" : "text-brand-muted"}`}>{pricing.description}</p>
      </div>

      {/* Billing toggle — hidden in single-price mode */}
      {singleMode ? null : (
      <div className="mt-9 flex items-center justify-center">
        <div
          role="tablist"
          aria-label="Billing period"
          className={`relative inline-flex items-center gap-1 p-1 ${dark ? "border border-white/15 bg-white/8" : "border border-black/10 bg-white"}`}
        >
          <button
            type="button"
            role="tab"
            aria-selected={billing === "monthly"}
            onClick={() => setBilling("monthly")}
            className={`relative z-10 min-h-10 px-6 font-body text-sm font-semibold transition duration-200 ${
              billing === "monthly"
                ? "bg-brand-green text-brand-ink"
                : dark ? "text-white/50 hover:text-white" : "text-brand-muted hover:text-brand-ink"
            }`}
          >
            {monthlyLabel}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={billing === "annual"}
            onClick={() => setBilling("annual")}
            className={`relative z-10 inline-flex min-h-10 items-center gap-2 px-6 font-body text-sm font-semibold transition duration-200 ${
              billing === "annual"
                ? "bg-brand-green text-brand-ink"
                : dark ? "text-white/50 hover:text-white" : "text-brand-muted hover:text-brand-ink"
            }`}
          >
            {annualLabel}
            {pricing.savingLabel ? (
              <span
                className={`px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.08em] ${
                  billing === "annual"
                    ? "bg-brand-green/25 text-brand-ink"
                    : "bg-brand-green/16 text-brand-green"
                }`}
              >
                {pricing.savingLabel}
              </span>
            ) : null}
          </button>
        </div>
      </div>
      )}

      {/* Plan card */}
      <div className="mt-10 flex justify-center">
        <article
          key={plan.id}
          className="reveal-card relative w-full max-w-md overflow-hidden rounded-[1.35rem] border border-white/10 bg-brand-ink p-7 shadow-sm lg:p-9"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-brand-green" aria-hidden="true" />

          <div className="flex items-start justify-between gap-4">
            <h3 className="font-heading text-[1.35rem] font-semibold leading-tight text-white">
              {plan.name}
            </h3>
            {plan.badge ? (
              <span className="shrink-0 bg-brand-green px-3 py-1 font-heading text-[0.65rem] uppercase tracking-[0.12em] text-black">
                {plan.badge}
              </span>
            ) : null}
          </div>

          <div className="mt-6 flex items-end gap-1">
            <span className="font-heading text-[3rem] font-semibold leading-none text-white">
              {plan.price}
            </span>
            <span className="mb-1 font-body text-base text-white/45">{plan.period}</span>
          </div>

          <p className="mt-5 text-white/50">{plan.description}</p>

          <Button href={plan.ctaHref} variant="primary" className="mt-7">
            {plan.ctaLabel}
          </Button>

          <ul className="mt-8 grid gap-4 border-t border-white/10 pt-8">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span
                  className="mt-0.5 grid size-5 shrink-0 place-items-center bg-brand-green/20 text-brand-green"
                  aria-hidden="true"
                >
                  <Check size={13} strokeWidth={3} />
                </span>
                <span className="font-body text-[0.95rem] leading-6 text-white/60">{feature}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
