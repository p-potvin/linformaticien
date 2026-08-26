import { Button } from "./ui/Button";
import { Section } from "./ui/Section";
import { coordonnees, lecteursDecran, tarif } from "../content/site";

export function Tarif() {
  return (
    <Section id="tarif" titre={tarif.titre}>
      <div className="grid items-start gap-10 sm:grid-cols-[auto_1fr]">
        <p className="chiffres flex items-baseline gap-2 font-titre text-5xl font-semibold text-encre">
          {tarif.montant}
          <span className="font-texte text-grand font-semibold text-gris">
            {tarif.unite}
          </span>
        </p>

        <div>
          <ul className="space-y-4">
            {tarif.details.map((detail) => (
              <li key={detail} className="flex items-start gap-3">
                <span aria-hidden="true" className="text-xl leading-none text-rouge">
                  •
                </span>
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
            <span aria-hidden="true">☎</span>
            <span className="chiffres">{coordonnees.telephone}</span>
          </Button>
        </div>
      </div>
    </Section>
  );
}
