"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { ProgramBenefit } from "@/lib/programs";

export function ProgramFeaturesList({ features }: { features: ProgramBenefit[] }) {
  const [expanded, setExpanded] = useState(false);
  const MOBILE_LIMIT = 4;

  return (
    <>
      {/* Desktop — show all */}
      <div className="features-list hidden gap-x-12 gap-y-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="feature-item flex items-start gap-4">
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border-2 border-brand-green text-brand-green">
              <Check size={15} strokeWidth={3} />
            </span>
            <p className="font-body text-[0.95rem] leading-6 text-brand-ink">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile — show 4, expand on tap */}
      <div className="sm:hidden">
        <div className="grid gap-y-5">
          {(expanded ? features : features.slice(0, MOBILE_LIMIT)).map((feature) => (
            <div key={feature.title} className="flex items-start gap-4">
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border-2 border-brand-green text-brand-green">
                <Check size={15} strokeWidth={3} />
              </span>
              <p className="font-body text-[0.95rem] leading-6 text-brand-ink">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-6 w-full cursor-pointer bg-brand-green py-3 font-heading text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-brand-ink transition hover:bg-brand-ink hover:text-white"
        >
          {expanded ? "View Less" : "View All"}
        </button>
      </div>
    </>
  );
}
