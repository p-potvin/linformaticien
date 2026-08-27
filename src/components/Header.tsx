import { Mail, Phone } from "lucide-react";
import { Button } from "./ui/Button";
import { contact, coordonnees, entete, lecteursDecran, marque } from "../content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-contour bg-papier">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-5 py-3 sm:px-8">
        {/* Le mot-symbole fait exactement 9:1. Sous 640 px il n'entre pas à côté
            du numéro : c'est la marque carrée qui sort. Il redescend d'un cran
            à 1024 px, là où le menu apparaît alors que la fenêtre borne encore
            le conteneur — c'est le passage le plus serré de la page.
            <picture> plutôt que deux <img> : un seul fichier descend. */}
        <a
          href="#haut"
          className="flex shrink-0 items-center no-underline focus-visible:outline-offset-4"
          aria-label={marque.nom}
        >
          <picture>
            <source media="(min-width: 640px)" srcSet="/logo-wordmark.png" />
            <img
              src="/logo-mark.png"
              alt=""
              width={96}
              height={96}
              className="h-10 w-10 rounded-carte sm:aspect-[9/1] sm:h-8 sm:w-auto sm:rounded-none lg:h-7 xl:h-11"
            />
          </picture>
        </a>

        <nav aria-label="Sections de la page" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {entete.liens.map((lien) => (
              <li key={lien.ancre}>
                <a
                  href={lien.ancre}
                  className="whitespace-nowrap text-petit font-semibold text-encre decoration-bleu decoration-2 underline-offset-4"
                >
                  {lien.texte}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/* Le libellé « Appelez-moi : » a disparu d'ici : le pictogramme le
              dit, et les 106 px récupérés vont au mot-symbole. Le nom
              accessible, lui, reste complet. */}
          <Button
            href={`tel:${coordonnees.telephoneLien}`}
            taille="compacte"
            aria-label={`${lecteursDecran.appeler} ${coordonnees.telephone}`}
          >
            <Phone aria-hidden="true" className="size-5 shrink-0" strokeWidth={2.5} />
            <span className="chiffres">{coordonnees.telephone}</span>
          </Button>

          {/* Sous 640 px, les deux boutons plus le numéro ne laissent que 6 px
              de marge : le courriel attend. Il reste à portée dans le tarif et
              au bas de la page. */}
          <Button
            href={`mailto:${coordonnees.courriel}`}
            variante="secondaire"
            taille="icone"
            className="hidden sm:inline-flex"
            aria-label={`${lecteursDecran.ecrire} ${coordonnees.courriel}`}
            title={contact.actionCourriel}
          >
            <Mail aria-hidden="true" className="size-5 shrink-0" strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </header>
  );
}
