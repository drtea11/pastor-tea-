"use client";

import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { whatsappEnrollHref, type EnrollDraft } from "@/lib/payment";

// WhatsApp community group for people not ready to pay yet — kept as a quieter
// secondary action so the payment button stays the primary nudge.
const WAITLIST_GROUP_URL = "https://chat.whatsapp.com/F6Q03VkHLOSJFq7IlufJIc?mode=gi_t";

type PaymentConfirmProps = {
  programTitle: string;
  storageKey: string;
  // Where to send the buyer back if their details weren't found.
  assessmentHref: string;
  // Fixed-price programs pass an amount; Inner Circle gets it from the draft.
  amount?: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function PaymentConfirm({
  programTitle,
  storageKey,
  assessmentHref,
  amount,
  bankName,
  accountName,
  accountNumber,
}: PaymentConfirmProps) {
  const [draft, setDraft] = useState<EnrollDraft | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (raw) setDraft(JSON.parse(raw) as EnrollDraft);
    } catch {
      /* ignore malformed storage */
    }
    setLoaded(true);
  }, [storageKey]);

  const displayAmount = draft?.amount ?? amount ?? "";
  const messageTitle = draft?.planName
    ? `${programTitle} — ${draft.planName}`
    : programTitle;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [accountNumber]);

  const handleConfirm = useCallback(() => {
    if (!draft) return;
    const href = whatsappEnrollHref(messageTitle, displayAmount, {
      name: draft.name,
      email: draft.email,
      phone: draft.phone,
      level: draft.level,
      goal: draft.goal,
    });
    setOpening(true);
    window.location.href = href;
  }, [draft, messageTitle, displayAmount]);

  // Avoid a flash before sessionStorage is read.
  if (!loaded) {
    return <div className="mx-auto max-w-xl py-10" aria-hidden="true" />;
  }

  // Reached the payment page without completing the details step.
  if (!draft) {
    return (
      <div className="mx-auto max-w-xl rounded-[1.35rem] border border-black/10 bg-white p-8 text-center shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
        <h2 className="font-heading text-[1.2rem] font-semibold text-brand-ink">
          We need your details first
        </h2>
        <p className="mx-auto mt-3 max-w-sm font-body text-sm leading-6 text-brand-muted">
          Please fill in the quick form so we know who you are before you pay.
        </p>
        <Link
          href={assessmentHref}
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-none border-2 border-brand-blue bg-brand-blue px-7 py-4 font-body text-sm font-semibold uppercase leading-none text-white transition duration-200 hover:bg-white hover:text-brand-blue"
        >
          Go to the form
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-8">
      {/* ── Bank details ── */}
      <article className="rounded-[1.35rem] border border-black/10 bg-white p-7 shadow-[0_4px_32px_rgba(0,0,0,0.06)] lg:p-8">
        <h2 className="font-heading text-[1.2rem] font-semibold text-brand-ink">
          Bank Transfer Details
        </h2>

        <div className="mt-5 rounded-xl bg-brand-soft px-5 py-4">
          <p className="font-body text-[0.68rem] uppercase tracking-[0.16em] text-brand-muted">
            Amount to pay
          </p>
          <p className="mt-1 font-heading text-[2rem] font-semibold leading-none text-brand-ink">
            {displayAmount}
          </p>
        </div>

        <dl className="mt-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <dt className="font-body text-sm text-brand-muted">Bank</dt>
            <dd className="font-body text-sm font-semibold text-brand-ink">{bankName}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="font-body text-sm text-brand-muted">Account name</dt>
            <dd className="text-right font-body text-sm font-semibold text-brand-ink">
              {accountName}
            </dd>
          </div>
          <div>
            <dt className="font-body text-sm text-brand-muted">Account number</dt>
            <div className="mt-1.5 flex items-center justify-between gap-3">
              <dd className="font-heading text-xl font-semibold tracking-[0.06em] text-brand-ink">
                {accountNumber}
              </dd>
              <button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? "Account number copied" : "Copy account number"}
                className="inline-flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-none border-2 border-brand-ink/15 px-3.5 py-2 font-body text-xs font-semibold uppercase tracking-[0.06em] text-brand-ink transition duration-200 hover:border-brand-ink hover:bg-brand-ink hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:ring-offset-2"
              >
                {copied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} strokeWidth={2} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </dl>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={opening}
          className="gsap-hover mt-7 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-none border-2 border-[#25D366] bg-[#25D366] px-7 py-4 font-body text-sm font-semibold uppercase leading-none text-white transition duration-200 hover:bg-[#1ebe5b] hover:border-[#1ebe5b] focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
        >
          <WhatsAppIcon className="size-5" />
          {opening ? "Opening WhatsApp…" : "Confirm Payment"}
        </button>

        {/* Secondary, lower-emphasis nudge for people not ready to pay today. */}
        <div className="mt-6 border-t border-black/10 pt-6 text-center">
          <p className="font-body text-sm leading-6 text-brand-muted">
            Not ready to pay just yet?
          </p>
          <a
            href={WAITLIST_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-none border-2 border-brand-ink/15 px-6 py-3 font-body text-sm font-semibold uppercase leading-none text-brand-ink transition duration-200 hover:border-brand-ink hover:bg-brand-ink hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-ink/30 focus:ring-offset-2"
          >
            <WhatsAppIcon className="size-4" />
            Join the Waitlist
          </a>
        </div>
      </article>

      {/* ── How it works ── */}
      <div className="bg-brand-ink p-7 text-white md:bg-transparent md:p-0">
        <h3 className="font-heading text-[1rem] font-semibold text-white md:text-brand-ink">
          How it works
        </h3>
        <ul className="mt-4 space-y-3">
          {[
            `Transfer exactly ${displayAmount} to the account above.`,
            "Tap Confirm Payment to open WhatsApp with your details ready.",
            "Attach your payment proof and send.",
          ].map((step) => (
            <li key={step} className="flex items-start gap-3">
              <span
                className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-brand-green/80"
                aria-hidden="true"
              />
              <span className="font-body text-sm leading-6 text-white/70 md:text-brand-muted">
                {step}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 font-body text-xs leading-5 text-white/45 md:text-brand-muted/80">
          Your spot is confirmed once we verify your transfer.
        </p>
      </div>
    </div>
  );
}
