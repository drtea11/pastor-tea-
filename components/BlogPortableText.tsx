import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import { Quote } from "lucide-react";

import { urlForImage } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/queries";

type PortableImageValue = SanityImage & {
  _key?: string;
};

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 font-heading text-[1.5rem] font-semibold capitalize leading-tight text-brand-ink lg:text-[3rem]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-9 font-heading text-base font-semibold capitalize leading-tight text-brand-ink lg:text-[1.5rem]">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 rounded-[0.76rem] border border-brand-blue/16 bg-sky-50 p-6 font-heading text-lg leading-8 text-brand-ink lg:p-8">
        <Quote className="mb-5 size-7 text-brand-blue" />
        <div>{children}</div>
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mt-6 text-base leading-8 text-brand-muted">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-6 list-disc space-y-3 pl-6 text-base leading-8 text-brand-muted marker:text-brand-blue">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-3 pl-6 text-base leading-8 text-brand-muted marker:font-heading marker:text-brand-blue">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const raw = typeof value?.href === "string" ? value.href : "";
      const SAFE_SCHEMES = /^(https?|mailto):/i;
      const href = SAFE_SCHEMES.test(raw) ? raw : "#";

      return (
        <a
          href={href}
          className="font-semibold text-brand-blue underline underline-offset-4 transition hover:text-brand-green"
          rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
          target={href.startsWith("http") ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as PortableImageValue;

      if (!image?.asset) {
        return null;
      }

      return (
        <figure className="my-10">
          <div className="image-reveal relative aspect-[16/10] overflow-hidden rounded-[0.76rem] bg-[#F4F7FA]">
            <Image
              src={urlForImage(image).width(1400).height(875).fit("crop").url()}
              alt={image.alt || ""}
              fill
              sizes="(min-width: 1024px) 70vw, 95vw"
              className="object-cover"
            />
          </div>
          {image.alt ? (
            <figcaption className="mt-3 text-center text-sm text-black/45">
              {image.alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export function BlogPortableText({ value }: { value?: unknown[] }) {
  if (!value?.length) {
    return null;
  }

  return <PortableText value={value} components={components} />;
}
