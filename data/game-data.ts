export interface GameMessage {
  text: string
  choices: string[]
  correctAnswers: number[] // Indices of correct answers
  contactId?: string // ID of the contact sending this message
  points?: number // Points for this message (default: 1)
}

export interface LevelData {
  id: number
  name: string
  timeToAnswer: number
  messages: GameMessage[]
  storyContext?: string // Optional story context for this level
}

export const levelData: LevelData[] = [
  {
    id: 1,
    name: "C'est chill",
    timeToAnswer: 5,
    storyContext:
      "Premier cours de la journée. Tout est calme, mais tes potes commencent déjà à t'envoyer des messages.",
    messages: [
      {
        text: "Tu veux quoi à la cantine ?",
        choices: ["Nuggets mais j'ai pas d'argent", "Rien, j'ai pas faim", "J'sais pas, on verra sur place"],
        correctAnswers: [2], // More discreet answer
        contactId: "thomas",
        points: 1,
      },
      {
        text: "T'as révisé l'exo 3 ?",
        choices: ["J'ai essayé mais j'ai rien compris", "C'était quoi déjà ?", "On en parle après le cours"],
        correctAnswers: [2], // Most discreet
        contactId: "emma",
        points: 1,
      },
      {
        text: "Regarde la tête du prof lol",
        choices: ["Mort de rire, on dirait mon oncle", "Je peux pas regarder maintenant", "Concentre-toi sur le cours"],
        correctAnswers: [2], // Most discreet
        contactId: "lucas",
        points: 2,
      },
      {
        text: "Tu fais quoi après les cours ?",
        choices: [
          "Je dois rentrer direct, mes parents m'attendent",
          "Rien de spécial, pourquoi ?",
          "Je te dis ça à la sortie",
        ],
        correctAnswers: [2], // Most discreet
        contactId: "sarah",
        points: 1,
      },
      {
        text: "T'as compris ce qu'il raconte ?",
        choices: [
          "Absolument rien, c'est du chinois",
          "Un peu mais c'est compliqué",
          "Prends des notes, on révise ensemble après",
        ],
        correctAnswers: [2], // Most discreet
        contactId: "emma",
        points: 2,
      },
    ],
  },
  {
    id: 2,
    name: "Ça chauffe",
    timeToAnswer: 4,
    storyContext:
      "Le prof commence à être plus attentif. Tes amis sont de plus en plus insistants avec leurs messages.",
    messages: [
      {
        text: "Tu viens on sort en scred par la fenêtre ?",
        choices: ["T'es fou, on est au 2ème étage", "Laisse-moi tranquille", "Concentre-toi sur le cours"],
        correctAnswers: [2], // Most discreet
        contactId: "lucas",
        points: 2,
      },
      {
        text: "Envie de dormir sérieux",
        choices: [
          "Moi aussi, j'ai pas dormi de la nuit",
          "Le prof nous regarde, fais gaffe",
          "Bois un café la prochaine fois",
        ],
        correctAnswers: [1], // Most discreet
        contactId: "thomas",
        points: 2,
      },
      {
        text: "Tu me ghost ou quoi ?",
        choices: [
          "Je suis en cours, je peux pas parler",
          "Arrête de m'envoyer des messages",
          "On parle après, là c'est chaud",
        ],
        correctAnswers: [2], // Most discreet
        contactId: "sarah",
        points: 3,
      },
      {
        text: "J'ai oublié mon devoir, je peux copier le tien ?",
        choices: ["Impossible, le prof nous surveille", "Débrouille-toi", "Je te l'envoie en photo à la pause"],
        correctAnswers: [2], // Tricky - seems helpful but actually discreet
        contactId: "emma",
        points: 2,
      },
      {
        text: "Le cours finit à quelle heure déjà ?",
        choices: [
          "Dans 20 min, c'est interminable",
          "Regarde l'horloge au lieu de texter",
          "Concentre-toi, on parlera après",
        ],
        correctAnswers: [2], // Most discreet
        contactId: "thomas",
        points: 2,
      },
      {
        text: "T'as vu la nouvelle sur Insta ?",
        choices: ["Non, montre-moi vite", "Oui c'est ouf, j'y crois pas", "Pas maintenant, le prof nous surveille"],
        correctAnswers: [2], // Most discreet
        contactId: "sarah",
        points: 2,
      },
      {
        text: "J'ai faim, t'as un truc à manger ?",
        choices: ["J'ai des chips dans mon sac", "Attends la pause, c'est dans 10 minutes", "Mange ton stylo"],
        correctAnswers: [1], // Most discreet
        contactId: "lucas",
        points: 2,
      },
    ],
  },
  {
    id: 3,
    name: "Danger : prof à l'affût",
    timeToAnswer: 3,
    storyContext:
      "Le prof est très vigilant et surveille la classe. Tes amis continuent de t'envoyer des messages absurdes.",
    messages: [
      {
        text: "J'ai pété. T'entends ?",
        choices: ["Mdr tout le monde a entendu", "Fais pas attention, reste naturel", "C'était quoi ce bruit ?"],
        correctAnswers: [1], // Most discreet
        contactId: "lucas",
        points: 3,
      },
      {
        text: "C'est qui qui t'envoie des messages ? 😏",
        choices: ["Ma mère qui vérifie si je suis en cours", "Personne, je regarde l'heure", "Arrête de me texter stp"],
        correctAnswers: [2], // Most discreet
        contactId: "emma",
        points: 3,
      },
      {
        text: "Tu préfères mourir ou faire un exposé surprise ?",
        choices: ["Mourir sans hésiter", "Question stupide, concentre-toi", "L'exposé mais avec toi comme partenaire"],
        correctAnswers: [1], // Most discreet
        contactId: "thomas",
        points: 3,
      },
      {
        text: "Le prof nous regarde, range ton tel !!!",
        choices: ["Trop tard, il m'a vu", "C'est bon, j'ai été discret", "C'est toi qui devrait arrêter de texter"],
        correctAnswers: [2], // Clever reversal
        contactId: "sarah",
        points: 4,
      },
      {
        text: "T'as vu la nouvelle coiffure de Léa ?",
        choices: ["Horrible, on dirait un balai", "Pas encore, elle est où ?", "On s'en fiche, concentre-toi"],
        correctAnswers: [2], // Most discreet
        contactId: "emma",
        points: 3,
      },
      {
        text: "J'ai fait tomber ma trousse exprès",
        choices: [
          "Bien joué, ça a distrait le prof",
          "Pourquoi t'as fait ça ?",
          "Arrête tes bêtises, on va se faire griller",
        ],
        correctAnswers: [2], // Most discreet
        contactId: "lucas",
        points: 3,
      },
      {
        text: "Le prof vient vers toi !!!",
        choices: [
          "Merci de l'info, je range mon tel",
          "Arrête de mentir",
          "C'est toi qui va te faire prendre à texter",
        ],
        correctAnswers: [0], // Quick action
        contactId: "groupe",
        points: 5,
      },
      {
        text: "Tu viens à ma soirée samedi ?",
        choices: ["Bien sûr, qui sera là ?", "Je te réponds après le cours", "Ça dépend, y aura de l'alcool ?"],
        correctAnswers: [1], // Most discreet
        contactId: "sarah",
        points: 3,
      },
      {
        text: "Fais semblant d'écrire le cours",
        choices: ["Je prends déjà des notes", "Pourquoi je ferais ça ?", "Arrête de me dire quoi faire"],
        correctAnswers: [0], // Most discreet
        contactId: "thomas",
        points: 3,
      },
      {
        text: "T'as l'air suspect là, fais gaffe",
        choices: ["C'est toi qui es suspect à me fixer", "Merci du conseil", "Je suis parfaitement normal"],
        correctAnswers: [1], // Most discreet
        contactId: "emma",
        points: 4,
      },
    ],
  },
]
