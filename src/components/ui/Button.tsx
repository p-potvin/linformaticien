import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variante = "principale" | "secondaire";
type Taille = "normale" | "grande";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variante?: Variante;
  taille?: Taille;
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-carte font-semibold no-underline transition-colors duration-150";

const variantes: Record<Variante, string> = {
  // Bleu plein / texte blanc : 6,6:1 — largement AA.
  principale: "bg-bleu text-papier hover:bg-bleu-fonce",
  // L'action secondaire garde une bordure épaisse : le contour seul doit être lisible.
  secondaire:
    "bg-papier text-bleu border-2 border-bleu hover:bg-bleu-pale",
};

const tailles: Record<Taille, string> = {
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
