import { Approche } from "./components/Approche";
import { Clientele } from "./components/Clientele";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Questions } from "./components/Questions";
import { Services } from "./components/Services";
import { Tarif } from "./components/Tarif";

export default function App() {
  return (
    <>
      <a href="#contenu" className="lien-evitement">
        Aller au contenu
      </a>

      <Header />

      <main id="contenu">
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
