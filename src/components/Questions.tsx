import { Section } from "./ui/Section";
import { questions } from "../content/site";

export function Questions() {
  return (
    <Section id="questions" titre={questions.titre} teinte>
      {/* <details> natif : lisible sans JavaScript, accessible au clavier et
          annoncé correctement par les lecteurs d'écran. */}
      <div className="space-y-4">
        {questions.liste.map((item) => (
          <details
            key={item.question}
            className="group rounded-grand border border-ligne bg-papier"
          >
            <summary className="flex min-h-cible cursor-pointer list-none items-center justify-between gap-4 px-7 py-5 text-grand font-semibold">
              {item.question}
              <span
                aria-hidden="true"
                className="text-2xl leading-none text-bleu transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="px-7 pb-7 text-gris">{item.reponse}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
