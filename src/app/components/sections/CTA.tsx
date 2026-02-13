'use client';

import { editable } from "@/lib/editable";
import { ctaProps } from "./types";

export default function CTA({data}: ctaProps) {
  if (!data) return null;

  return (
    <section data-section="cta" {...editable(data.container, "sections.cta.container", "section", "bg-primary text-primary-foreground py-24")}>
      <div {...editable(data.innerWrapper, "sections.cta.innerWrapper", "container", "container mx-auto px-4 text-center")}>
        <div className="mx-auto max-w-2xl">
          <h2 {...editable(data.headline, "sections.cta.headline", "headline", "text-3xl font-bold tracking-tight sm:text-4xl mb-6")}>
              {data.headline?.text}
          </h2>
          <p {...editable(data.subtext, "sections.cta.subtext", "subtext", "text-lg leading-8 opacity-90 mb-10")}>
              {data.subtext?.text}
          </p>
          <div className="flex items-center justify-center gap-x-6">
            <button {...editable(data.button, "sections.cta.button", "button", "rounded-lg bg-background text-primary px-6 py-3 text-sm font-semibold shadow-sm hover:bg-background/90 transition-colors")}>
              {data.button?.text}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}