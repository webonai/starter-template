import { ElementConfig } from "@/types/schema";
import { editable } from "@/lib/editable";

type ctaProps = {
  data: {
    container: ElementConfig;
    headline: ElementConfig;
    subtext: ElementConfig;
    button: ElementConfig;
  };
};
export default function CTA({data}: ctaProps) {
  return (
    <section {...editable(data.container, "sections.cta.container", "section", "bg-indigo-600")}>
      <div className="max-w-3xl mx-auto text-center py-20 px-6">
        <h2 {...editable(data.headline.text, "sections.cta.headline", "headline", "text-4xl font-bold text-white mb-6")}>
            {data.headline?.text}
        </h2>
        <p {...editable(data.subtext, "sections.cta.subtext", "subtext", "text-lg text-indigo-200 mb-8")}>
            {data.subtext?.text}
        </p>
        <button {...editable(data.button, "sections.cta.button", "button", "inline-block px-8 py-3 rounded-md font-bold shadow-lg transition-transform hover:scale-105 bg-white text-indigo-600")}>
          {data.button?.text}
        </button>
      </div>
    </section>
  );
}