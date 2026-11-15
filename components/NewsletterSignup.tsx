import { NewsletterForm } from "./NewsletterForm";

export function NewsletterSignup() {
  return (
    <div className="reveal mx-auto max-w-5xl border-b border-brand-line bg-white pb-10 text-center">
      <h2 className="font-heading text-[1.5rem] font-medium capitalize leading-tight tracking-normal text-brand-ink lg:text-[3rem]">
        Sign Up For My Emails
      </h2>
      <p className="mx-auto mt-8 max-w-[34rem] text-sm leading-6 text-brand-muted lg:text-base lg:leading-7">
        Weekly wisdom on purpose, clarity, and growth straight to your inbox.
      </p>
      <div className="mx-auto mt-8 max-w-[24rem]">
        <NewsletterForm />
      </div>
    </div>
  );
}
