import { Button } from "./ui/Button";
import { coordonnees, entete, lecteursDecran, marque } from "../content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ligne bg-papier">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        {/* La marque carrée plutôt que le mot-symbole : l'en-tête doit tenir sur
            une seule ligne partout, y compris à 320 px avec le numéro complet
            et, à partir de 1024 px, avec le menu. Le mot-symbole fait neuf fois
            plus large que haut ; il ne rentre dans aucun de ces deux cas. Il est
            au pied de page, où il a la place de respirer. */}
        <a
          href="#haut"
          className="flex shrink-0 items-center no-underline focus-visible:outline-offset-4"
          aria-label={marque.nom}
        >
          <img
            src="/logo-mark.png"
            alt=""
            width={96}
            height={96}
            className="h-10 w-10 rounded-carte sm:h-12 sm:w-12"
          />
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

        <Button
          href={`tel:${coordonnees.telephoneLien}`}
          aria-label={`${lecteursDecran.appeler} ${coordonnees.telephone}`}
        >
          <span aria-hidden="true">☎</span>
          <span className="hidden sm:inline">{entete.bouton} :</span>
          <span className="chiffres">{coordonnees.telephone}</span>
        </Button>
      </div>
    </header>
  );
}
