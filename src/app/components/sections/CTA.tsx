'use client';

import { editable } from "@/lib/editable";
import { ctaProps } from "./types";

export default function CTA({data}: ctaProps) {
  return (
    <section data-section="cta" {...editable(data.container, "sections.cta.container", "section")}>
      <div className="max-w-3xl mx-auto text-center py-20 px-6">
        <h2 {...editable(data.headline.text, "sections.cta.headline", "headline", "text-4xl font-bold mb-6")}>
            {data.headline?.text}
        </h2>
        <p {...editable(data.subtext, "sections.cta.subtext", "subtext", "text-lg mb-8 opacity-90")}>
            {data.subtext?.text}
        </p>
        <button {...editable(data.button, "sections.cta.button", "button", "inline-block px-8 py-3 rounded-md font-bold shadow-lg transition-transform hover:scale-105")}>
          {data.button?.text}
        </button>
      </div>
    </section>
  );
}