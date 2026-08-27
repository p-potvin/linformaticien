import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  titre?: string;
  intro?: string;
  /** Fond légèrement bleuté pour alterner les sections à l'écran. Ignoré à l'impression. */
  teinte?: boolean;
  children: ReactNode;
}

export function Section({ id, titre, intro, teinte = false, children }: SectionProps) {
  return (
    <section
      id={id}
      /* scroll-mt : l'en-tête est collant, sinon l'ancre atterrit sous lui. */
      className={`scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24 ${teinte ? "bg-teinte" : "bg-papier"}`}
    >
      <div className="mx-auto max-w-site">
        {titre && (
          <h2 className="text-3xl sm:text-4xl">
            {titre}
            <span aria-hidden="true" className="mt-4 flex w-28 gap-1.5">
              <span className="h-1.5 flex-1 rounded-full bg-bleu" />
              <span className="h-1.5 w-6 rounded-full bg-rouge" />
            </span>
          </h2>
        )}
        {intro && (
          <p className="mt-6 max-w-2xl text-grand text-gris">{intro}</p>
        )}
        <div className={titre || intro ? "mt-12" : ""}>{children}</div>
      </div>
    </section>
  );
}
