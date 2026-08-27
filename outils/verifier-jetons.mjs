/**
 * Vérifie que les jetons de couleur disent partout la même chose, et que
 * chacun tient le plancher de contraste du projet.
 *
 * Trois copies doivent concorder : `src/styles/theme.css` (Tailwind),
 * `design-system/tokens.css` (CSS pur) et les étiquettes affichées dans
 * `design-system/couleurs.html`. Cette troisième copie a déjà dérivé deux fois
 * sans que personne le voie — une pastille montrait la bonne couleur pendant
 * que le texte à côté annonçait l'ancienne.
 *
 * Vérifie aussi que `public/og-image.png` — la seule image du projet où du
 * texte est gravé — dit encore la même chose que `site.ts`. Une image ne se met
 * pas à jour toute seule, et un mauvais numéro de téléphone sur un partage
 * Facebook ne se voit d'aucune façon depuis le dépôt.
 *
 * Usage : npm run verifier
 */
import { readFileSync } from "node:fs";

const lireJetons = (f, prefixe) =>
  Object.fromEntries(
    [...readFileSync(f, "utf8").matchAll(
      new RegExp(`--${prefixe}([a-z-]+):[ 	]*(#[0-9a-fA-F]{6})`, "g"),
    )].map((m) => [m[1], m[2].toLowerCase()]),
  );

const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const theme = lireJetons("src/styles/theme.css", "color-");
const portables = lireJetons("design-system/tokens.css", "");
const html = readFileSync("design-system/couleurs.html", "utf8");

let fautes = 0;
const faute = (m) => {
  console.error("  ÉCHEC  " + m);
  fautes++;
};
// Un écart sous la cible est signalé, pas bloqué : c'est une décision de
// design, pas une erreur. Seul le plancher dur arrête la construction.
const remarque = (m) => console.log("  à l'œil  " + m);

const PLANCHER = 3; // en dessous, c'est illisible : on bloque
const CIBLE = 4.5; // au-dessus, c'est confortable : on vise, sans bloquer
// Ce qu'on lit longtemps. Ceux-là doivent tenir la cible, pas seulement le
// plancher — le public a 65 ans et plus.
const CORPS = new Set(["encre", "gris"]);

console.log("1. theme.css et tokens.css");
for (const nom of new Set([...Object.keys(theme), ...Object.keys(portables)])) {
  if (theme[nom] !== portables[nom])
    faute(`${nom} : theme.css=${theme[nom]} tokens.css=${portables[nom]}`);
}
console.log(`   ${Object.keys(theme).length} jetons comparés`);

console.log("2. étiquettes de design-system/couleurs.html");
const blocs = [
  ...html.matchAll(
    /background:[ ]*(#[0-9a-fA-F]{6})[^]*?<div class="nom">([a-z-]+)<\/div>[^]*?<div class="hex">(#[0-9a-fA-F]{6})<\/div>/g,
  ),
];
for (const [, pastille, nom, etiquette] of blocs) {
  const reel = theme[nom];
  if (!reel) faute(`la fiche montre « ${nom} », qui n'existe pas dans theme.css`);
  else if (pastille.toLowerCase() !== reel) faute(`pastille de ${nom} : ${pastille} au lieu de ${reel}`);
  else if (etiquette.toLowerCase() !== reel) faute(`étiquette de ${nom} : ${etiquette} au lieu de ${reel}`);
}
console.log(`   ${blocs.length} pastilles comparées`);

console.log(`3. contraste — plancher dur ${PLANCHER}:1, cible ${CIBLE}:1 pour le corps de texte`);
const juger = (nom, description, r) => {
  const seuil = CORPS.has(nom) ? CIBLE : PLANCHER;
  if (r < PLANCHER) faute(`${description} : ${r.toFixed(2)}:1 — sous le plancher`);
  else if (r < seuil) faute(`${description} : ${r.toFixed(2)}:1 — corps de texte sous la cible`);
  else if (r < CIBLE) remarque(`${description} : ${r.toFixed(2)}:1`);
};

const fonds = { blanc: theme.papier, teinte: theme.teinte };
for (const nom of ["encre", "bleu", "bleu-fonce", "bleu-nuit", "rouge", "vert", "gris"]) {
  for (const [nomFond, fond] of Object.entries(fonds)) {
    juger(nom, `${nom} sur ${nomFond}`, ratio(theme[nom], fond));
  }
}
// Textes posés sur un aplat plutôt que sur le fond de la page.
const surAplats = [
  ["blanc sur bleu", theme.papier, theme.bleu],
  ["blanc sur bleu-fonce", theme.papier, theme["bleu-fonce"]],
  ["bleu sur bleu-pale", theme.bleu, theme["bleu-pale"]],
  ["encre sur rouge-pale", theme.encre, theme["rouge-pale"]],
  ["blanc sur contour", theme.papier, theme.contour],
];
for (const [description, a, b] of surAplats) juger("aplat", description, ratio(a, b));

console.log("4. l'image de partage dit-elle encore la vérité ?");
{
  const site = readFileSync("src/content/site.ts", "utf8");
  const valeur = (cle) => site.match(new RegExp(`${cle}:[ ]*"([^"]+)"`))?.[1];
  const grave = JSON.parse(readFileSync("outils/og-image.source.json", "utf8"));
  const actuel = {
    promesse: valeur("promesse"),
    zone: valeur("zone"),
    telephone: valeur("telephone"),
  };
  for (const [cle, v] of Object.entries(actuel)) {
    if (v !== grave[cle])
      faute(
        `og-image.png montre encore « ${grave[cle]} » alors que site.ts dit ` +
          `« ${v} ». L'image est gravée, elle ne se met pas à jour toute seule — ` +
          `la refaire (voir design-system/logo.html).`,
      );
  }
  console.log("   3 valeurs comparées");
}

if (fautes) {
  console.error(`\n${fautes} problème(s). Rien n'est publié tant que ce n'est pas réglé.`);
  process.exit(1);
}
console.log("\nTout concorde.");
