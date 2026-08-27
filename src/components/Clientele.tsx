import { Check } from "lucide-react";
import { Section } from "./ui/Section";
import { clientele } from "../content/site";

export function Clientele() {
  return (
    <Section teinte>
      {/* La seule bande pleinement bleue de la page. C'est le moment où le fond
          prend la couleur du mot-symbole, et ça suffit à donner un rythme :
          blanc, teinte, blanc, bleu. Cerné de noir comme le logo. */}
      <div className="rounded-grand border-2 border-contour bg-bleu p-8 text-papier sm:p-12">
        <h2 className="text-2xl text-papier sm:text-3xl">{clientele.titre}</h2>
        <p className="mt-6 max-w-3xl text-grand">{clientele.texte}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {clientele.points.map((point) => (
            <li key={point} className="flex items-start gap-3 font-semibold">
              <Check
                aria-hidden="true"
                className="mt-0.5 size-6 shrink-0"
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
