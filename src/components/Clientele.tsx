import { Check } from "lucide-react";
import { Section } from "./ui/Section";
import { clientele } from "../content/site";

export function Clientele() {
  return (
    <Section teinte>
      {/* La seule bande pleinement bleue de la page. Le bleu foncé plutôt que
          celui du logo : même teinte à un degré près, mais le texte blanc y
          tient 8:1 au lieu de 5:1, et ça se voit tout de suite. Le bleu du logo
          reste là où il est posé sur du blanc — boutons, liens, pictogrammes. */}
      <div className="rounded-grand border-2 border-contour bg-bleu-fonce p-8 text-papier sm:p-12">
        <h2 className="text-2xl text-papier sm:text-3xl">{clientele.titre}</h2>
        <p className="mt-6 max-w-3xl text-grand font-medium">{clientele.texte}</p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {clientele.points.map((point) => (
            <li key={point} className="flex items-center gap-3 text-grand font-bold">
              {/* Pastille ronde blanche : le crochet seul se perdait sur
                  l'aplat. */}
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-papier text-bleu-fonce"
              >
                <Check className="size-6" strokeWidth={3.5} />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
