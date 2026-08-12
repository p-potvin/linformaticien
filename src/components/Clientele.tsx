import { Section } from "./ui/Section";
import { clientele } from "../content/site";

export function Clientele() {
  return (
    <Section teinte>
      <div className="rounded-grand border-2 border-bleu-pale bg-papier p-8 sm:p-12">
        <h2 className="text-2xl sm:text-3xl">{clientele.titre}</h2>
        <p className="mt-6 max-w-2xl text-grand text-gris">{clientele.texte}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {clientele.points.map((point) => (
            <li key={point} className="flex items-start gap-3 font-semibold">
              <span aria-hidden="true" className="text-xl leading-none text-vert">
                ✓
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
