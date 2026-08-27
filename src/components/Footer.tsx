import { coordonnees, marque, piedDePage } from "../content/site";

export function Footer() {
  const annee = new Date().getFullYear();

  return (
    <footer className="border-t border-ligne px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-site flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <a
          href="#haut"
          className="shrink-0 no-underline focus-visible:outline-offset-4"
          aria-label={marque.nom}
        >
          <img
            src="/logo-wordmark.png"
            alt=""
            width={900}
            height={100}
            className="h-7 w-auto"
          />
        </a>
        <p className="text-petit text-gris">{piedDePage.mention}</p>
        <p className="text-mention text-gris">
          © {annee} {coordonnees.nom}
        </p>
      </div>
    </footer>
  );
}
