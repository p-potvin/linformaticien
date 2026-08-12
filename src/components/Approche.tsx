import { Card } from "./ui/Card";
import { Section } from "./ui/Section";
import { approche } from "../content/site";

export function Approche() {
  return (
    <Section id="approche" titre={approche.titre} intro={approche.intro}>
      <ol className="grid gap-6 sm:grid-cols-2">
        {approche.etapes.map((etape) => (
          <li key={etape.numero}>
            <Card titre={etape.titre} numero={etape.numero}>
              {etape.texte}
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}
