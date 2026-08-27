/**
 * Tout le contenu du site, en un seul endroit.
 * Langue : québécois (fr-CA) uniquement. Pas de jargon informatique.
 *
 * Règle d'écriture : si un mot ne se dit pas à la table de cuisine, il ne va pas ici.
 * Interdits : « device », « setup », « cloud », « troubleshooting », « configurer »,
 * « optimiser », « solution », « sécuriser vos données ».
 * Préférés : brancher, montrer, régler, remettre de l'ordre, vos affaires, en jaser.
 */

/* -------------------------------------------------------------------------
 * Coordonnées officielles. Les mêmes valeurs servent à l'affiche imprimée.
 * ---------------------------------------------------------------------- */
export const coordonnees = {
  nom: "Philippe Potvin", // nom affiché
  telephone: "438 827-4585",
  telephoneLien: "+14388274585", // format tel:
  courriel: "philippe.potvin@linformaticien.ca",
  zone: "Sorel-Tracy", // zone desservie
  heures:
    "de 8 h à 20 h en semaine, de 10 h à 16 h la fin de semaine", // plage d'appel
  /**
   * Les mêmes heures, dans le format que Google sait lire (schema.org).
   * Jours : Mo Tu We Th Fr Sa Su. Doit toujours dire la même chose que
   * `heures` ci-dessus — c'est la seule paire du fichier à tenir synchronisée.
   */
  heuresMachine: ["Mo-Fr 08:00-20:00", "Sa-Su 10:00-16:00"],
  site: "linformaticien.ca",
  adresseSite: "https://linformaticien.ca/",
} as const;

export const marque = {
  nom: "L'Informaticien",
  promesse: "Dépannage informatique à domicile",
  tarif: "30 $",
  tarifUnite: "de l'heure",
} as const;

export const entete = {
  liens: [
    { texte: "Ce que je fais", ancre: "#services" },
    { texte: "Tarif", ancre: "#tarif" },
    { texte: "Questions", ancre: "#questions" },
    { texte: "Contactez-moi", ancre: "#contact" },
  ],
  bouton: "Appelez-moi",
} as const;

export const accueil = {
  surtitre: "Dépannage informatique à domicile",
  titre: "On règle ça ensemble, chez vous.",
  texte:
    "Je me déplace chez vous pour réparer vos appareils, les brancher comme il faut, et vous montrer tranquillement comment vous en servir. Je parle en bon français, pas en informatique.",
  etiquettes: [
    `${marque.tarif} ${marque.tarifUnite}`,
    "Sur appel ou sur rendez-vous",
    "Je me déplace chez vous",
  ],
  actionPrincipale: "Appelez-moi",
  actionSecondaire: "Voir ce que je fais",
} as const;

export const services = {
  titre: "Ce que je fais",
  intro:
    "Si ça s'allume, ça se branche ou ça vous donne du trouble, il y a de bonnes chances que je puisse vous aider.",
  liste: [
    {
      titre: "Réparer vos appareils",
      texte:
        "Ordinateurs, ordinateurs portables, Mac, cellulaires, tablettes, télévisions, imprimantes. On regarde ensemble ce qui cloche avant de parler d'argent.",
    },
    {
      titre: "Vous conseiller avant d'acheter",
      texte:
        "Avant de dépenser, on en jase. Je vous dis ce qui fait votre affaire, ce qui est correct pour le prix, et ce qui ne vous servira jamais.",
    },
    {
      titre: "Vous montrer à vous en servir",
      texte:
        "Votre appareil fait bien plus que ce que vous en faites. On y va à votre rythme, aussi souvent qu'il le faut, sans jamais vous faire sentir pressé.",
    },
    {
      titre: "Brancher et mettre de l'ordre",
      texte:
        "Nouvel appareil, imprimante, télévision, internet sans fil : je branche tout, je vérifie que ça marche, et je range les fils.",
    },
    {
      titre: "Démêler vos forfaits",
      texte:
        "Téléphone, internet, câble : on regarde ensemble ce que vous payez et ce que vous recevez vraiment pour cet argent-là.",
    },
    {
      titre: "Remettre de l'ordre dans vos comptes",
      texte:
        "Vos adresses de courriel, vos mots de passe, vos comptes éparpillés. On fait le ménage ensemble, et vous gardez la liste.",
    },
  ],
} as const;

export const approche = {
  titre: "Comment ça marche",
  intro:
    "Mon but, ce n'est pas que vous m'appeliez chaque semaine. C'est que vous ayez de moins en moins besoin de moi.",
  etapes: [
    {
      numero: "1",
      titre: "Vous m'appelez",
      texte: `Vous me racontez ce qui se passe, dans vos mots. Pas besoin de connaître les termes. Je vous dis tout de suite si je peux aider et combien de temps ça devrait prendre.`,
    },
    {
      numero: "2",
      titre: "Je me déplace chez vous",
      texte:
        "Sur appel ou sur rendez-vous, selon ce qui vous adonne. On travaille sur vos appareils, dans votre salon, avec votre internet. C'est là que les problèmes se règlent pour de vrai.",
    },
    {
      numero: "3",
      titre: "On écrit des notes ensemble",
      texte:
        "Pendant que je travaille, on note les étapes importantes sur papier, dans vos mots à vous. Vous gardez ces notes-là.",
    },
    {
      numero: "4",
      titre: "Vous vous débrouillez tout seul",
      texte:
        "Je vous laisse un petit guide, étape par étape, pour les choses que vous voulez refaire. Et si vous bloquez, vous me rappelez.",
    },
  ],
} as const;

export const clientele = {
  titre: "Pour qui",
  texte:
    "Je travaille surtout avec des personnes qui n'ont pas grandi avec ces machines-là et qui trouvent que le monde va vite. Résidences pour aînés, CHSLD, immeubles à condos : je me déplace aussi pour rencontrer plusieurs personnes dans la même bâtisse.",
  points: [
    "Aucune question n'est trop simple",
    "Je ne vous ferai jamais sentir dépassé",
    "Je prends le temps qu'il faut",
  ],
} as const;

export const tarif = {
  titre: "Tarif",
  montant: marque.tarif,
  unite: marque.tarifUnite,
  details: [
    "Le temps est calculé au cas par cas. On s'entend toujours avant de commencer.",
    `Sur appel ou sur rendez-vous, ${coordonnees.heures}.`,
    `Zone desservie : ${coordonnees.zone}.`,
  ],
  note: "Vous n'avez pas à apporter votre appareil nulle part. C'est moi qui viens.",
  // Deuxième porte d'entrée : tout le monde n'aime pas téléphoner à un inconnu.
  actionCourriel: "Écrivez-moi",
} as const;

export const questions = {
  titre: "Les questions qu'on me pose",
  liste: [
    {
      question: "Est-ce que je peux vous appeler n'importe quand ?",
      reponse: `Appelez-moi quand ça vous adonne, ${coordonnees.heures}. Si je ne réponds pas, laissez-moi un message avec votre nom et votre numéro, et je vous rappelle.`,
    },
    {
      question: "Est-ce que je dois apporter mon appareil quelque part ?",
      reponse:
        "Non. Je me déplace chez vous. Vos affaires restent chez vous et on travaille dessus ensemble.",
    },
    {
      question: "Je ne comprends rien là-dedans. Est-ce que c'est grave ?",
      reponse:
        "Pas du tout, c'est exactement pour ça que j'existe. Vous n'avez pas à connaître un seul mot de vocabulaire pour m'appeler.",
    },
    {
      question: "Combien de temps ça va prendre ?",
      reponse:
        "Ça dépend de ce qui se passe. Je regarde d'abord, je vous dis ce que j'en pense, et vous décidez si on continue.",
    },
    {
      question: "Est-ce que vous touchez à mes mots de passe ?",
      reponse:
        "Seulement si vous me le demandez, et toujours devant vous. Vous gardez tout par écrit, et rien ne part avec moi.",
    },
    {
      question: "Et si vous ne réussissez pas à réparer mon affaire ?",
      reponse:
        "Ça arrive : parfois l'appareil est rendu au bout de sa vie. Je vous le dis franchement et je vous conseille sur la suite, sans essayer de vous vendre quoi que ce soit.",
    },
  ],
} as const;

export const contact = {
  titre: "Contactez-moi",
  texte:
    "Le plus simple, c'est le téléphone. Si vous préférez écrire, mon courriel est juste en dessous — je réponds dans la journée.",
  actionCourriel: "Écrivez-moi",
  etiquetteTelephone: "Téléphone",
  etiquetteCourriel: "Courriel",
  etiquetteZone: "Je me déplace dans",
  etiquetteHeures: "Vous pouvez appeler",
} as const;

/**
 * Textes qui ne s'affichent pas à l'écran, mais que les lecteurs d'écran lisent.
 * Sur les petits écrans, les boutons de téléphone n'affichent que le numéro :
 * sans ce texte, la personne entend une suite de chiffres sans savoir que le
 * lien appelle quelqu'un.
 */
export const lecteursDecran = {
  appeler: "Appelez-moi au",
  ecrire: "Écrivez-moi à",
} as const;

export const piedDePage = {
  // Le mot-symbole est juste à côté au pied de page : répéter le nom en
  // toutes lettres ferait doublon. Seule la promesse reste.
  mention: marque.promesse,
} as const;
