import { Check } from "lucide-react";
import { Section } from "./ui/Section";
import { clientele } from "../content/site";

export function Clientele() {
  return (
    <Section teinte>
      <div className="rounded-grand border-2 border-bleu-pale bg-papier p-8 sm:p-12">
        <h2 className="text-2xl sm:text-3xl">{clientele.titre}</h2>
        <p className="mt-6 max-w-3xl text-grand text-gris">{clientele.texte}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {clientele.points.map((point) => (
            <li key={point} className="flex items-start gap-3 font-semibold">
              <Check
                aria-hidden="true"
                className="mt-0.5 size-6 shrink-0 text-vert"
                strokeWidth={3}
              />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
