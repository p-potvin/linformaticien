import { Card } from "./ui/Card";
import { Section } from "./ui/Section";
import { services } from "../content/site";

export function Services() {
  return (
    <Section id="services" titre={services.titre} intro={services.intro} teinte>
      <ul className="grid gap-6 sm:grid-cols-2">
        {services.liste.map((service) => (
          <li key={service.titre}>
            <Card titre={service.titre}>{service.texte}</Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
