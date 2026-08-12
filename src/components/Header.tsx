import { Button } from "./ui/Button";
import { coordonnees, entete, marque } from "../content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ligne bg-papier">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a
          href="#haut"
          className="font-titre text-xl font-semibold text-encre no-underline sm:text-2xl"
        >
          {marque.nom}
        </a>

        <nav aria-label="Sections de la page" className="hidden lg:block">
          <ul className="flex items-center gap-8">
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

        <Button href={`tel:${coordonnees.telephoneLien}`}>
          <span aria-hidden="true">☎</span>
          <span className="hidden sm:inline">{entete.bouton} :</span>
          <span className="chiffres">{coordonnees.telephone}</span>
        </Button>
      </div>
    </header>
  );
}
