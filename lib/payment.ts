// Bank-transfer + WhatsApp payment details shown on program enrollment pages.
//
// TODO(client): Replace these PLACEHOLDER values with the real account details
// before this goes live. `whatsappNumber` must be international format with
// digits only — no "+", spaces, or leading 0 (e.g. Nigerian 0803... -> 234803...).
export const paymentDetails = {
  bankName: "First Bank of Nigeria",
  accountName: "Arowele Temitope Ebenezer",
  accountNumber: "3039507449",
  // International format, digits only (from +234 803 816 0726).
  // Same number as the book order flow (see lib/books.ts).
  whatsappNumber: "2348038160726",
};

// The single WhatsApp number used across every enrollment/join flow.
// An env override lets the client change it without a code edit.
export const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? paymentDetails.whatsappNumber;

// Short "where are you now" assessment so Dr. TEA can gauge each applicant's
// level before the call. Shared by the program enrollment and Inner Circle
// forms so the options stay identical everywhere.
export const assessmentLevels = [
  "Just getting started",
  "Some experience, still growing",
  "Experienced and practicing",
  "Already leading or teaching others",
] as const;

export type EnrollAssessment = {
  name: string;
  email: string;
  phone: string;
  level: string;
  goal: string;
};

// A selectable plan (Inner Circle monthly / annual).
export type PaymentPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  blurb?: string;
  badge?: string;
};

// What the assessment page stores (in sessionStorage) and the payment page
// reads back to build the bank amount + WhatsApp confirmation message.
export type EnrollDraft = EnrollAssessment & {
  planId?: string;
  planName?: string;
  amount?: string;
};

// The assessment answers, formatted as WhatsApp message lines so every flow
// hands the client one tidy, self-identifying message.
export function assessmentLines(details: EnrollAssessment): string[] {
  return [
    `• Name: ${details.name}`,
    `• Email: ${details.email}`,
    `• Phone: ${details.phone}`,
    `• Where I am now: ${details.level}`,
    `• Goal / focus: ${details.goal}`,
  ];
}

// Wraps a finished message in a wa.me click-to-chat link.
export function whatsappHref(message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Builds the "I've paid, here's who I am" message for a program enrollment.
// When `details` is present the buyer's assessment answers ride along, so the
// team sees the payment and the person's profile in one message.
export function whatsappEnrollHref(
  programTitle: string,
  amount: string,
  details?: EnrollAssessment
): string {
  const intro = `Hello Dr. TEA team, I have just made payment for the ${programTitle} (${amount}).`;
  const body = details
    ? ["", ...assessmentLines(details), "", "(I've attached my payment proof.)"]
    : ["", "My name: ", "", "(I've attached my payment proof.)"];
  return whatsappHref([intro, ...body].join("\n"));
}
