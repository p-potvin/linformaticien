import { Mail, Phone } from "lucide-react";
import { Button } from "./ui/Button";
import { contact, coordonnees, entete, lecteursDecran, marque } from "../content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-contour bg-papier">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-5 py-3 sm:px-8">
        {/* Le mot-symbole est partout, même sur un téléphone. Il fait exactement
            9:1, donc sa largeur découle de sa hauteur : 180 px à 320 px de
            large, 288 px à partir de 640 px, 360 px à partir de 1280 px quand
            le menu apparaît. Le pire cas reste 320 px, avec 36 px de marge. */}
        <a
          href="#haut"
          className="flex shrink-0 items-center no-underline focus-visible:outline-offset-4"
          aria-label={marque.nom}
        >
          <img
            src="/logo-wordmark.png"
            alt=""
            width={900}
            height={100}
            className="aspect-[9/1] h-5 w-auto sm:h-8 xl:h-10"
          />
        </a>

        {/* Le menu passe à 24 px, donc à 486 px de large : il ne tient pas à
            1024 px sans écraser le mot-symbole. Il n'apparaît qu'à 1280 px, là
            où le conteneur atteint sa pleine largeur. */}
        <nav aria-label="Sections de la page" className="hidden xl:block">
          <ul className="flex items-center gap-3">
            {entete.liens.map((lien) => (
              <li key={lien.ancre}>
                <a
                  href={lien.ancre}
                  className="whitespace-nowrap rounded-carte px-2 py-1 text-xl font-bold text-bleu no-underline transition-colors duration-100 hover:text-rouge hover:underline hover:decoration-2 hover:underline-offset-4"
                >
                  {lien.texte}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/* Sous 640 px, le pictogramme seul : c'est ce qui laisse la place au
              mot-symbole. Le numéro n'est pas perdu pour autant — il est écrit
              en gros dans le bouton de l'accueil, juste dessous. Le nom
              accessible, lui, le dit toujours en entier. */}
          <Button
            href={`tel:${coordonnees.telephoneLien}`}
            taille="compacte"
            className="w-cible px-0 sm:w-auto sm:px-4"
            aria-label={`${lecteursDecran.appeler} ${coordonnees.telephone}`}
          >
            <Phone aria-hidden="true" className="size-5 shrink-0" strokeWidth={2.5} />
            <span className="chiffres hidden sm:inline">{coordonnees.telephone}</span>
          </Button>

          {/* Le courriel attend 640 px : à 320 px, deux boutons plus le
              mot-symbole ne rentrent pas. Il reste à portée dans le tarif et au
              bas de la page. */}
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
