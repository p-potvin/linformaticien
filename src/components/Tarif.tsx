import { Check, Phone } from "lucide-react";
import { Button } from "./ui/Button";
import { Section } from "./ui/Section";
import { coordonnees, lecteursDecran, tarif } from "../content/site";

export function Tarif() {
  return (
    <Section id="tarif" titre={tarif.titre}>
      <div className="grid max-w-4xl items-start gap-10 sm:grid-cols-[auto_1fr]">
        <p className="chiffres flex items-baseline gap-2 text-5xl font-extrabold tracking-titre text-encre">
          {tarif.montant}
          <span className="text-grand font-semibold tracking-normal text-gris">
            {tarif.unite}
          </span>
        </p>

        <div>
          <ul className="space-y-4">
            {tarif.details.map((detail) => (
              <li key={detail} className="flex items-start gap-3">
                <Check
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-bleu"
                  strokeWidth={3}
                />
                {detail}
              </li>
            ))}
          </ul>

          <p className="mt-8 rounded-carte bg-rouge-pale px-6 py-5 font-semibold">
            {tarif.note}
          </p>

          <Button
            href={`tel:${coordonnees.telephoneLien}`}
            taille="grande"
            className="mt-8"
            aria-label={`${lecteursDecran.appeler} ${coordonnees.telephone}`}
          >
            <Phone aria-hidden="true" className="size-6 shrink-0" strokeWidth={2.5} />
            <span className="chiffres">{coordonnees.telephone}</span>
          </Button>
        </div>
      </div>
    </Section>
  );
}
