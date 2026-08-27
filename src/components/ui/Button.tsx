import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variante = "principale" | "secondaire";
type Taille = "compacte" | "normale" | "grande";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variante?: Variante;
  taille?: Taille;
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-carte font-semibold no-underline transition-colors duration-150";

const variantes: Record<Variante, string> = {
  // Aplat du bleu du logo, texte blanc : 4,96:1. C'est le plus grand aplat de
  // couleur de la page, donc c'est lui qui donne le ton — d'où le bleu du logo
  // ici plutôt que la version foncée. Le survol descend au bleu foncé.
  principale: "bg-bleu text-papier hover:bg-bleu-fonce",
  // L'action secondaire garde une bordure épaisse : le contour seul doit être lisible.
  secondaire: "bg-papier text-bleu-fonce border-2 border-bleu hover:bg-bleu-pale",
};

const tailles: Record<Taille, string> = {
  // « compacte » ne veut pas dire petite à toucher : la hauteur reste au
  // plancher de 48 px, seule la largeur maigrit. C'est la taille de l'en-tête,
  // où chaque pixel horizontal se dispute avec le mot-symbole.
  compacte: "min-h-cible px-4 text-base",
  normale: "min-h-cible px-6 text-base",
  grande: "min-h-cible-lg px-8 text-grand",
};

export function Button({
  variante = "principale",
  taille = "normale",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={`${base} ${variantes[variante]} ${tailles[taille]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
