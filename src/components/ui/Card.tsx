import type { ReactNode } from "react";

interface CardProps {
  titre: string;
  children: ReactNode;
  /** Petit repère chiffré affiché avant le titre (étapes numérotées). */
  numero?: string;
}

export function Card({ titre, children, numero }: CardProps) {
  return (
    <div className="rounded-grand border border-ligne bg-papier p-7 shadow-carte sm:p-8">
      {numero && (
        <span
          aria-hidden="true"
          className="chiffres mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-bleu-pale text-xl font-semibold text-bleu"
        >
          {numero}
        </span>
      )}
      <h3 className="text-xl sm:text-2xl">{titre}</h3>
      <p className="mt-4 text-gris">{children}</p>
    </div>
  );
}
