import { Section } from "./ui/Section";
import { contact, coordonnees, lecteursDecran } from "../content/site";

export function Contact() {
  return (
    <Section id="contact" titre={contact.titre} intro={contact.texte}>
      <dl className="grid gap-8 sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-gris">{contact.etiquetteTelephone}</dt>
          <dd className="mt-2">
            <a
              href={`tel:${coordonnees.telephoneLien}`}
              className="chiffres font-titre text-3xl font-semibold sm:text-4xl"
              aria-label={`${lecteursDecran.appeler} ${coordonnees.telephone}`}
            >
              {coordonnees.telephone}
            </a>
          </dd>
        </div>

        <div>
          <dt className="font-semibold text-gris">{contact.etiquetteCourriel}</dt>
          <dd className="mt-2">
            <a href={`mailto:${coordonnees.courriel}`} className="text-grand break-words">
              {coordonnees.courriel}
            </a>
          </dd>
        </div>

        <div>
          <dt className="font-semibold text-gris">{contact.etiquetteHeures}</dt>
          <dd className="mt-2 text-grand">{coordonnees.heures}</dd>
        </div>

        <div>
          <dt className="font-semibold text-gris">{contact.etiquetteZone}</dt>
          <dd className="mt-2 text-grand">{coordonnees.zone}</dd>
        </div>
      </dl>
    </Section>
  );
}
