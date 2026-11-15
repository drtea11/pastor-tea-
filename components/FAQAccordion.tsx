"use client";

import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQ[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-list grid divide-y divide-black/8">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="faq-item py-5 lg:py-6">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full cursor-pointer items-start gap-4 text-left sm:gap-8"
            >
              <span className="w-8 shrink-0 pt-0.5 font-heading text-base font-medium leading-none text-black/35 sm:w-12">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-heading text-base font-medium leading-snug text-brand-ink lg:text-[1.2rem]">
                {item.question}
              </span>
              <span className="relative mt-1 grid size-6 shrink-0 place-items-center text-brand-ink sm:size-7">
                <span className="absolute h-px w-4 bg-current sm:w-5" />
                <span
                  className={`absolute h-4 w-px bg-current transition-all duration-300 sm:h-5 ${
                    isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="pb-1 pl-12 pt-4 font-body text-base leading-7 text-brand-muted sm:pl-20">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
