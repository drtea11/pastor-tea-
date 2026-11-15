import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  // Omit href (or pass disabled) to render an inert, non-navigating button.
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "dark";
  className?: string;
  disabled?: boolean;
};

const baseClasses =
  "gsap-hover inline-flex min-h-12 w-full max-w-full items-center justify-center rounded-none font-body text-sm font-semibold uppercase leading-none text-center transition duration-200 focus:outline-none focus:ring-2 focus:ring-brand-green/40 focus:ring-offset-2 sm:w-fit";

const variants = {
  primary:
    "border-2 border-brand-green bg-brand-green text-black hover:bg-brand-green/80 hover:border-brand-green/80",
  secondary:
    "border-2 border-brand-ink bg-brand-ink text-white hover:bg-brand-ink/85 hover:border-brand-ink/85",
  light:
    "border-2 border-white/60 bg-white/10 text-white backdrop-blur hover:bg-white hover:border-white hover:text-brand-ink",
  dark: "border-2 border-brand-ink bg-brand-ink text-white hover:bg-brand-ink/85 hover:border-brand-ink/85"
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  disabled = false
}: ButtonProps) {
  const inert = disabled || !href;

  if (inert) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className={`${baseClasses} ${variants[variant]} ${className} !px-7 !py-4 cursor-not-allowed opacity-60`}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseClasses} ${variants[variant]} ${className} !px-7 !py-4`}
    >
      {children}
    </Link>
  );
}
