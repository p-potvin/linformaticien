import { ArrowDown, Phone } from "lucide-react";
import { Button } from "./ui/Button";
import { accueil, coordonnees, lecteursDecran } from "../content/site";

export function Hero() {
  return (
    <section id="haut" className="px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
      <div className="mx-auto max-w-site">
        <p className="text-grand font-bold uppercase tracking-wide text-rouge">
          {accueil.surtitre}
        </p>

        <h1 className="mt-5 max-w-4xl text-4xl sm:text-5xl">{accueil.titre}</h1>

        <p className="mt-7 max-w-2xl text-grand leading-lecture text-gris">
          {accueil.texte}
        </p>

        <ul className="mt-9 flex flex-wrap gap-3">
          {accueil.etiquettes.map((etiquette) => (
            <li
              key={etiquette}
              className="rounded-carte bg-bleu-pale px-5 py-2.5 font-semibold text-bleu-fonce"
            >
              {etiquette}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            href={`tel:${coordonnees.telephoneLien}`}
            taille="grande"
            aria-label={`${lecteursDecran.appeler} ${coordonnees.telephone}`}
          >
            <Phone aria-hidden="true" className="size-6 shrink-0" strokeWidth={2.5} />
            <span>{accueil.actionPrincipale} :</span>
            <span className="chiffres">{coordonnees.telephone}</span>
          </Button>
          <Button href="#services" variante="secondaire" taille="grande">
            <ArrowDown aria-hidden="true" className="size-5 shrink-0" strokeWidth={2.5} />
            {accueil.actionSecondaire}
          </Button>
        </div>
      </div>
    </section>
  );
}
