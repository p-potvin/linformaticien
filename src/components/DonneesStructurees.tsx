import { accueil, coordonnees, marque, services } from "../content/site";

/**
 * Données structurées JSON-LD (schema.org / LocalBusiness).
 *
 * C'est ce qui permet à Google d'afficher le numéro de téléphone et les heures
 * directement dans les résultats de recherche, sans que personne ait à ouvrir
 * le site. Pour la clientèle visée, c'est probablement le chemin le plus court
 * vers un appel.
 *
 * Tout est lu depuis `src/content/site.ts` : le jour où les vraies coordonnées
 * remplacent les valeurs d'exemple, ce fichier devient exact tout seul. Il n'y
 * a rien à modifier ici, et surtout aucune valeur à recopier.
 */
export function DonneesStructurees() {
  const donnees = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${coordonnees.adresseSite}#entreprise`,
    name: marque.nom,
    description: accueil.texte,
    url: coordonnees.adresseSite,
    telephone: coordonnees.telephoneLien,
    email: coordonnees.courriel,
    priceRange: `${marque.tarif} ${marque.tarifUnite}`,
    currenciesAccepted: "CAD",
    openingHours: coordonnees.heuresMachine,
    areaServed: {
      "@type": "Place",
      name: coordonnees.zone,
    },
    // Le service se rend chez la personne : pas de local à visiter.
    serviceArea: {
      "@type": "Place",
      name: coordonnees.zone,
    },
    makesOffer: services.liste.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.titre,
        description: service.texte,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Le contenu est construit ici, jamais reçu de l'extérieur.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
    />
  );
}
