import { AtSign, Clock, MapPin, Phone } from "lucide-react";
import { Section } from "./ui/Section";
import { contact, coordonnees, lecteursDecran } from "../content/site";

/* Un pictogramme par ligne : à cet âge-là, on repère une icône avant de lire
   une étiquette. Ils sont décoratifs — l'étiquette écrite reste, et c'est elle
   que les lecteurs d'écran annoncent.

   Le pictogramme vit DANS le <dt>, et chaque groupe est un <div> qui ne
   contient que le <dt> et le <dd>. C'est la seule forme que la spécification
   des listes de définitions autorise : glisser un <span> ou un <div>
   supplémentaire entre les deux casse la liste pour les lecteurs d'écran. */
const lignes = [
  { picto: Phone, etiquette: contact.etiquetteTelephone },
  { picto: AtSign, etiquette: contact.etiquetteCourriel },
  { picto: Clock, etiquette: contact.etiquetteHeures },
  { picto: MapPin, etiquette: contact.etiquetteZone },
] as const;

export function Contact() {
  const valeurs = [
    <a
      href={`tel:${coordonnees.telephoneLien}`}
      /* Le rouge du logo sur l'élément le plus important de la page. C'est le
         seul endroit où il porte autre chose qu'un filet ou une puce, et ça
         suffit à le sortir du bleu ambiant. */
      className="chiffres text-rouge text-3xl font-extrabold tracking-titre decoration-2 underline-offset-4 sm:text-4xl"
      aria-label={`${lecteursDecran.appeler} ${coordonnees.telephone}`}
    >
      {coordonnees.telephone}
    </a>,
    <a href={`mailto:${coordonnees.courriel}`} className="text-grand break-words">
      {coordonnees.courriel}
    </a>,
    <span className="text-grand">{coordonnees.heures}</span>,
    <span className="text-grand">{coordonnees.zone}</span>,
  ];

  return (
    <Section id="contact" titre={contact.titre} intro={contact.texte}>
      <dl className="grid max-w-4xl gap-8 sm:grid-cols-2">
        {lignes.map(({ picto: Picto, etiquette }, i) => (
          <div key={etiquette}>
            <dt className="flex items-center gap-3 font-semibold text-gris">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-bleu-pale text-bleu">
                <Picto aria-hidden="true" className="size-5" strokeWidth={2.5} />
              </span>
              {etiquette}
            </dt>
            <dd className="mt-3">{valeurs[i]}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
