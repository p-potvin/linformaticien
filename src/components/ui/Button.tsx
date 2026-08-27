import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variante = "principale" | "secondaire";
type Taille = "icone" | "compacte" | "normale" | "grande";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variante?: Variante;
  taille?: Taille;
  children: ReactNode;
}

/* Le cerne noir vient du mot-symbole : le logo est un aplat bleu cerné de noir.
   Le reprendre sur les boutons est ce qui accorde le plus vite la page au
   dessin, et ça ne coûte qu'une bordure. */
const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-carte " +
  "border-2 border-contour font-bold no-underline transition-colors duration-150";

const variantes: Record<Variante, string> = {
  principale: "bg-bleu text-papier hover:bg-bleu-fonce",
  secondaire: "bg-papier text-encre hover:bg-bleu-pale",
};

const tailles: Record<Taille, string> = {
  // Carré, pour un pictogramme seul. La cible reste à 48 px.
  icone: "size-cible",
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
