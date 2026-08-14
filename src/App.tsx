import { Approche } from "./components/Approche";
import { Clientele } from "./components/Clientele";
import { Contact } from "./components/Contact";
import { DonneesStructurees } from "./components/DonneesStructurees";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Questions } from "./components/Questions";
import { Services } from "./components/Services";
import { Tarif } from "./components/Tarif";

export default function App() {
  return (
    <>
      <DonneesStructurees />

      <a href="#contenu" className="lien-evitement">
        Aller au contenu
      </a>

      <Header />

      {/* tabIndex={-1} : sans lui, le lien d'évitement fait défiler la page mais
          le focus du clavier reste dans l'en-tête, et la tabulation suivante
          ramène l'utilisateur au menu. Le lien ne servirait alors à rien. */}
      <main id="contenu" tabIndex={-1}>
        <Hero />
        <Services />
        <Approche />
        <Clientele />
        <Tarif />
        <Questions />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
