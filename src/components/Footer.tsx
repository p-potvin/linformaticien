import { coordonnees, marque, piedDePage } from "../content/site";

export function Footer() {
  const annee = new Date().getFullYear();

  return (
    <footer className="border-t border-ligne px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-titre text-xl font-semibold">{marque.nom}</p>
        <p className="text-petit text-gris">{piedDePage.mention}</p>
        <p className="text-mention text-gris">
          © {annee} {coordonnees.nom}
        </p>
      </div>
    </footer>
  );
}
