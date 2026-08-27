import { Phone } from "lucide-react";
import { Button } from "./ui/Button";
import { coordonnees, entete, lecteursDecran, marque } from "../content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ligne bg-papier">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-5 py-3 sm:px-8">
        {/* Le mot-symbole fait exactement 9:1. En dessous de 640 px il ne reste
            pas assez de largeur à côté du numéro : c'est la marque carrée qui
            sort. À 640 px il fait 288 px, et il passe à 396 px à partir de
            1280 px, là où le conteneur atteint enfin sa pleine largeur.
            Mesuré au pire cas — 1024 px, quand le menu apparaît alors que la
            fenêtre borne encore le conteneur — il reste 72 px de marge.
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
              className="h-10 w-10 rounded-carte sm:aspect-[9/1] sm:h-8 sm:w-auto sm:rounded-none xl:h-11"
            />
          </picture>
        </a>

        <nav aria-label="Sections de la page" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {entete.liens.map((lien) => (
              <li key={lien.ancre}>
                <a
                  href={lien.ancre}
                  className="whitespace-nowrap text-petit font-semibold"
                >
                  {lien.texte}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Le libellé « Appelez-moi : » a disparu d'ici : le pictogramme le dit,
            et les 106 px récupérés vont au mot-symbole. Le nom accessible, lui,
            reste complet. */}
        <Button
          href={`tel:${coordonnees.telephoneLien}`}
          taille="compacte"
          aria-label={`${lecteursDecran.appeler} ${coordonnees.telephone}`}
        >
          <Phone aria-hidden="true" className="size-5 shrink-0" strokeWidth={2.5} />
          <span className="chiffres">{coordonnees.telephone}</span>
        </Button>
      </div>
    </header>
  );
}
