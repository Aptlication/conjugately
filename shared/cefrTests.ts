/**
 * CEFR-style tests: content, the single source of truth (1.2.5).
 *
 * Three practice tests in the format of the official A1 / A2 / B1 French exams:
 * four sections of 25 points, pass = 50/100 overall AND at least 5/25 in every
 * section. Approved by Jonathan 25 Oct 2026. Spec: project doc
 * cefr-style-tests-spec.md; plan: cefr-tests-implementation-plan.md.
 *
 *  - A1 unlocks after every Novice Final Level Exam, A2 after Elementary, B1 after
 *    Intermediate B (Intermediate A is a step on the way).
 *  - Pro only. Costs 2 × one Final Level Exam of that level (cefrCoinCost in
 *    shared/coins.ts). Pay once; retakes are free. App only (GLOSSARY exemption 4).
 *  - Content rule: built ONLY from French already taught in that level's and
 *    earlier levels' quizzes, conversations and vocab checks.
 *    scripts/audit-cefr-coverage.ts enforces it; run it after any content change.
 *  - Writing and speaking are marked by AI against the rubric (server/cefrMark.ts).
 *    The `all` / `count` / `need` regexes are the OFFLINE FALLBACK: they run on
 *    lower-cased, accent-stripped text (see normaliseForMarking in cefrScoring.ts).
 *
 * WORDING (legal): "CEFR-style", "modelled on the CEFR descriptors", "in the format
 * of official A1 French exams". Never "certified", "accredited", "official
 * certificate", "endorsed by the Council of Europe" or "DELF".
 */

export type CefrId = "A1" | "A2" | "B1";

export interface CefrQuestion { fr: string; en: string; options: string[]; answer: number }
export interface CefrListeningDoc { id: string; kicker: string; title: string; script: string; questions: CefrQuestion[] }
export interface CefrReadingDoc { id: string; kicker: string; title: string; text: string; questions: CefrQuestion[] }
export type CefrRubricLine =
  | { label: string; points: number; all: string[] }
  | { label: string; points: number; count: string; min: number };
export interface CefrWritingTask {
  id: string; kicker: string; max: number; prompt: string; promptEn: string;
  form?: { pointsPerField: number; fields: { k: string; label: string; ph: string }[] };
  text?: { placeholder: string; minWords: number; lengthPoints: number; rubric: CefrRubricLine[] };
}
export interface CefrSpeakingItem { prompt: string; say?: string; cue: string; doc?: string; minWords?: number; need: string[] }
export interface CefrSpeakingPart { id: string; kicker: string; title: string; intro: string; pointsPerItem: number; items: CefrSpeakingItem[] }
export interface CefrTest {
  id: CefrId; level: "Novice" | "Elementary" | "Intermediate B"; cefr: CefrId; minutes: string; intro: string;
  sections: { fr: string; en: string }[];
  sectionSubtitles: { listening: string; reading: string; writing: string; speaking: string };
  listening: CefrListeningDoc[]; reading: CefrReadingDoc[];
  writing: CefrWritingTask[]; speaking: CefrSpeakingPart[];
  model: { title: string; text: string }; canDo: string[];
}

export const CEFR_SECTION_MAX = 25;
export const CEFR_PASS_TOTAL = 50;
export const CEFR_SECTION_MIN = 5;
export const CEFR_RESULTS_STORAGE_KEY = "conjugately_cefr_results";

export const CEFR_DISCLAIMER = (cefr: CefrId) =>
  `A practice test modelled on the CEFR ${cefr} descriptors. Not an official certificate, and not affiliated with or endorsed by the Council of Europe or France Éducation international.`;

export const CEFR_TESTS: Record<CefrId, CefrTest> = {
  "A1": {
    "id": "A1",
    "level": "Novice",
    "cefr": "A1",
    "minutes": "About 25 minutes",
    "intro": "Four short sections in the format of official A1 French exams: listen, read, write and speak. Everything in it comes from your Novice quizzes, conversations and vocabulary.",
    "sections": [
      {
        "fr": "Compréhension de l'oral",
        "en": "Listening · 4 recordings · 10 questions"
      },
      {
        "fr": "Compréhension des écrits",
        "en": "Reading · 4 documents · 10 questions"
      },
      {
        "fr": "Production écrite",
        "en": "Writing · a form and a postcard"
      },
      {
        "fr": "Production orale",
        "en": "Speaking · interview, questions, role-play"
      }
    ],
    "sectionSubtitles": {
      "listening": "Listening · each recording plays twice · 25 pts",
      "reading": "Reading · 4 short documents · 25 pts",
      "writing": "Writing · 2 tasks · 25 pts",
      "speaking": "Speaking · Masters Mic · 3 parts · 25 pts"
    },
    "listening": [
      {
        "id": "L1",
        "kicker": "DOCUMENT 1 · VOICEMAIL",
        "title": "A message from Julie",
        "script": "Bonjour, c'est Julie ! Samedi, nous avons une fête à la maison pour mon anniversaire. La fête sera à huit heures. Paul et Marc seront là. Tu feras un gâteau ? Bonne journée, et à samedi !",
        "questions": [
          {
            "fr": "La fête est pour…",
            "en": "The party is for…",
            "options": [
              "l'anniversaire de Julie",
              "les vacances de Julie",
              "le travail de Julie"
            ],
            "answer": 0
          },
          {
            "fr": "La fête sera à quelle heure ?",
            "en": "What time will the party be?",
            "options": [
              "À cinq heures",
              "À huit heures",
              "À deux heures"
            ],
            "answer": 1
          },
          {
            "fr": "Qu'est-ce que tu feras pour la fête ?",
            "en": "What will you make for the party?",
            "options": [
              "La cuisine",
              "Le ménage",
              "Un gâteau"
            ],
            "answer": 2
          }
        ]
      },
      {
        "id": "L2",
        "kicker": "DOCUMENT 2 · WEATHER ON THE RADIO",
        "title": "The weather",
        "script": "Bonjour ! Aujourd'hui, il fait froid à Paris. Demain, il fera beau et chaud à Lyon. Et ce week-end, il fera beau à Nice. Bonne journée !",
        "questions": [
          {
            "fr": "Aujourd'hui, à Paris, il fait…",
            "en": "Today in Paris it is…",
            "options": [
              "froid",
              "chaud",
              "beau"
            ],
            "answer": 0
          },
          {
            "fr": "Demain, à Lyon, il fera…",
            "en": "Tomorrow in Lyon it will be…",
            "options": [
              "froid",
              "beau et chaud",
              "très froid"
            ],
            "answer": 1
          },
          {
            "fr": "Ce week-end, il fera beau à…",
            "en": "This weekend it will be fine in…",
            "options": [
              "Paris",
              "Lyon",
              "Nice"
            ],
            "answer": 2
          }
        ]
      },
      {
        "id": "L3",
        "kicker": "DOCUMENT 3 · THREE SHORT CONVERSATIONS",
        "title": "From your Novice conversations",
        "script": "Un. Où est-ce que tu vas ? Je vais à la boulangerie. ... Deux. Tu as eu peur pendant le film ? Oui, j'ai eu très peur. ... Trois. Qu'est-ce que vous ferez cet été ? Nous ferons un voyage en Espagne.",
        "questions": [
          {
            "fr": "Un : il va…",
            "en": "Conversation 1: he is going…",
            "options": [
              "à la boulangerie",
              "au parc",
              "à la plage"
            ],
            "answer": 0
          },
          {
            "fr": "Deux : pendant le film, il a eu…",
            "en": "Conversation 2: during the film he had…",
            "options": [
              "un problème",
              "très peur",
              "froid"
            ],
            "answer": 1
          },
          {
            "fr": "Trois : cet été, ils feront un voyage…",
            "en": "Conversation 3: this summer they'll travel…",
            "options": [
              "en Italie",
              "en France",
              "en Espagne"
            ],
            "answer": 2
          }
        ]
      },
      {
        "id": "L4",
        "kicker": "DOCUMENT 4 · VOICEMAIL",
        "title": "A message from the teacher",
        "script": "Bonjour Paul, c'est ton professeur. Tu n'as pas fait tes devoirs hier. Tu feras tes devoirs ce soir ? À demain !",
        "questions": [
          {
            "fr": "Hier, Paul n'a pas fait…",
            "en": "Yesterday Paul didn't do…",
            "options": [
              "la vaisselle",
              "ses devoirs",
              "les courses"
            ],
            "answer": 1
          }
        ]
      }
    ],
    "reading": [
      {
        "id": "R1",
        "kicker": "DOCUMENT 1 · TEXT MESSAGE",
        "title": "From Paul",
        "text": "Bonjour ! Je suis malade aujourd'hui. Je ne vais pas à l'école. Ce soir, je serai à la maison. Tu as mon livre ? Tu seras chez moi ce soir ?\nPaul",
        "questions": [
          {
            "fr": "Aujourd'hui, Paul est…",
            "en": "Today Paul is…",
            "options": [
              "en vacances",
              "malade",
              "à l'école"
            ],
            "answer": 1
          },
          {
            "fr": "Ce soir, Paul sera…",
            "en": "Tonight Paul will be…",
            "options": [
              "à l'école",
              "au cinéma",
              "à la maison"
            ],
            "answer": 2
          },
          {
            "fr": "C'est le livre de…",
            "en": "The book belongs to…",
            "options": [
              "Paul",
              "Julie",
              "Marc"
            ],
            "answer": 0
          }
        ]
      },
      {
        "id": "R2",
        "kicker": "DOCUMENT 2 · POSTER",
        "title": "In town",
        "text": "FÊTE DE LA VILLE\nAu parc · samedi · de 14 h à 20 h\nConcert, sport et gâteaux !\nBienvenue à tous !",
        "questions": [
          {
            "fr": "La fête est où ?",
            "en": "Where is the event?",
            "options": [
              "Au stade",
              "Au parc",
              "À l'école"
            ],
            "answer": 1
          },
          {
            "fr": "La fête est…",
            "en": "The event is on…",
            "options": [
              "vendredi",
              "samedi",
              "dimanche"
            ],
            "answer": 1
          },
          {
            "fr": "À la fête, il y a…",
            "en": "At the event there is…",
            "options": [
              "un concert",
              "un film",
              "un puzzle"
            ],
            "answer": 0
          }
        ]
      },
      {
        "id": "R3",
        "kicker": "DOCUMENT 3 · EMAIL",
        "title": "Your host family",
        "text": "Bonjour Sam,\nBienvenue en France ! Nous sommes la famille Martin. Nous avons deux enfants : Julie a cinq ans et Paul a huit ans. Nous avons aussi un chien et un chat. Le samedi, nous allons au marché et le dimanche, nous faisons du vélo.\nÀ samedi !\nClaire",
        "questions": [
          {
            "fr": "Les Martin ont…",
            "en": "The Martins have…",
            "options": [
              "un enfant",
              "deux enfants",
              "trois enfants"
            ],
            "answer": 1
          },
          {
            "fr": "Paul a…",
            "en": "Paul is…",
            "options": [
              "cinq ans",
              "huit ans",
              "deux ans"
            ],
            "answer": 1
          },
          {
            "fr": "Le dimanche, la famille…",
            "en": "On Sundays the family…",
            "options": [
              "va au marché",
              "fait du vélo",
              "va à la plage"
            ],
            "answer": 1
          }
        ]
      },
      {
        "id": "R4",
        "kicker": "DOCUMENT 4 · NOTE ON THE FRIDGE",
        "title": "Who does what?",
        "text": "Paul : tu feras la vaisselle ce soir.\nJulie : tu feras les courses demain.\nMoi, je ferai la cuisine.\nVotre mère",
        "questions": [
          {
            "fr": "Ce soir, Paul fera…",
            "en": "Tonight Paul will do…",
            "options": [
              "la vaisselle",
              "les courses",
              "la cuisine"
            ],
            "answer": 0
          }
        ]
      }
    ],
    "writing": [
      {
        "id": "T1",
        "kicker": "TASK 1 · FORM · 10 PTS",
        "max": 10,
        "prompt": "You're joining a French cooking class. Complete each line about yourself.",
        "promptEn": "",
        "form": {
          "pointsPerField": 2,
          "fields": [
            {
              "k": "nom",
              "label": "Je suis… (your name)",
              "ph": "ex. Sam Martin"
            },
            {
              "k": "nat",
              "label": "Je suis… (your nationality)",
              "ph": "ex. australien / australienne"
            },
            {
              "k": "age",
              "label": "J'ai… ans",
              "ph": "ex. 34"
            },
            {
              "k": "ville",
              "label": "La ville : …",
              "ph": "ex. Brisbane"
            },
            {
              "k": "we",
              "label": "Le week-end, je fais…",
              "ph": "ex. du sport / la cuisine"
            }
          ]
        }
      },
      {
        "id": "T2",
        "kicker": "TASK 2 · POSTCARD · 15 PTS",
        "max": 15,
        "prompt": "You're on holiday. Write a postcard to a French friend: where you are, who you're with, what you did yesterday and what you'll do tomorrow.",
        "promptEn": "At least 40 words. Use the French from your Novice course.",
        "text": {
          "placeholder": "Bonjour … !",
          "minWords": 40,
          "lengthPoints": 3,
          "rubric": [
            {
              "label": "Says where they are (présent: je suis / il fait / j'ai…)",
              "points": 3,
              "all": [
                "\\b(je suis|nous sommes|on est|il fait|j'ai|nous avons)\\b"
              ]
            },
            {
              "label": "Says what they did yesterday (passé composé)",
              "points": 3,
              "all": [
                "\\b(j'ai|nous avons|on a) (ete|eu|fait)\\b|\\b(je suis|nous sommes|on est) alle"
              ]
            },
            {
              "label": "Says what they will do tomorrow (futur proche or futur simple)",
              "points": 3,
              "all": [
                "\\b(vais|vas|va|allons|allez|vont) [a-z]+(er|ir|re)\\b|\\b(irai|iras|ira|irons|irez|iront|ferai|feras|fera|ferons|ferez|feront|serai|seras|sera|serons|serez|seront|aurai|auras|aura|aurons|aurez|auront)\\b"
              ]
            },
            {
              "label": "Names a place and uses a greeting or sign-off",
              "points": 3,
              "all": [
                "\\b(a|en|au) [a-z]",
                "\\b(salut|bonjour|cher|chere|bonnes vacances|bonne journee|a demain|a samedi)\\b"
              ]
            }
          ]
        }
      }
    ],
    "speaking": [
      {
        "id": "P1",
        "kicker": "PART 1 · ENTRETIEN DIRIGÉ · 9 PTS",
        "title": "Guided interview",
        "intro": "Answer about yourself in a full sentence.",
        "pointsPerItem": 3,
        "items": [
          {
            "prompt": "Vous êtes français ?",
            "cue": "Say whether you're French, and give your nationality.",
            "need": [
              "\\b(je suis|nous sommes|on est)\\b"
            ]
          },
          {
            "prompt": "Vous avez des enfants ?",
            "cue": "Say whether you have children.",
            "need": [
              "\\b(j'ai|je n'ai pas|je n'ai|nous avons|on a)\\b"
            ]
          },
          {
            "prompt": "Qu'est-ce que vous faites le week-end ?",
            "cue": "Say what you do at the weekend.",
            "need": [
              "\\b(je fais|je vais|nous faisons|nous allons|on fait|on va)\\b"
            ]
          }
        ]
      },
      {
        "id": "P2",
        "kicker": "PART 2 · ÉCHANGE D'INFORMATIONS · 6 PTS",
        "title": "Exchanging information",
        "intro": "Ask the examiner a question using the word on the card.",
        "pointsPerItem": 2,
        "items": [
          {
            "prompt": "« âge ? »",
            "say": "âge",
            "cue": "Ask how old they are.",
            "need": [
              "age",
              "\\b(as|avez)\\b|as-tu|avez-vous"
            ]
          },
          {
            "prompt": "« vacances ? »",
            "say": "vacances",
            "cue": "Ask where they're going on holiday.",
            "need": [
              "vacances",
              "\\b(vas|allez|iras|irez)\\b|vas-tu|allez-vous"
            ]
          },
          {
            "prompt": "« week-end ? »",
            "say": "week-end",
            "cue": "Ask what they do at the weekend.",
            "need": [
              "week-?end",
              "\\b(fais|faites)\\b|fais-tu|faites-vous"
            ]
          }
        ]
      },
      {
        "id": "P3",
        "kicker": "PART 3 · DIALOGUE SIMULÉ · 10 PTS",
        "title": "Role-play",
        "intro": "You meet a neighbour on holiday in France. Reply using the English cue.",
        "pointsPerItem": 2,
        "items": [
          {
            "prompt": "Bonjour ! Vous êtes ici en vacances ?",
            "cue": "Yes, you're on holiday.",
            "need": [
              "\\b(je suis|nous sommes|on est) en vacances\\b"
            ]
          },
          {
            "prompt": "Vous avez fait bon voyage ?",
            "cue": "Yes, you had a good trip.",
            "need": [
              "\\b(j'ai|nous avons|on a) fait bon voyage\\b"
            ]
          },
          {
            "prompt": "Et ce matin, qu'est-ce que vous avez fait ?",
            "cue": "Say you went to the market.",
            "need": [
              "\\b(je suis|nous sommes|on est) alle",
              "marche"
            ]
          },
          {
            "prompt": "Vous serez à la fête ce soir ?",
            "cue": "Yes, you'll be there.",
            "need": [
              "\\b(je serai|nous serons|on sera)\\b"
            ]
          },
          {
            "prompt": "Et demain, qu'est-ce que vous ferez ?",
            "cue": "Say you'll go to the beach.",
            "need": [
              "\\b(j'irai|nous irons|on ira|je vais aller|nous allons aller)\\b",
              "plage"
            ]
          }
        ]
      }
    ],
    "model": {
      "title": "A model postcard",
      "text": "Bonjour Paul ! Je suis en vacances en Italie avec mes amis. Il fait beau et chaud. Hier, nous sommes allés à la plage et j'ai fait du vélo. Demain, nous irons au musée et le soir, nous ferons la fête au restaurant. Nous sommes très contents. Bonne journée ! Sam"
    },
    "canDo": [
      "I can understand short, slow messages and announcements about everyday things.",
      "I can understand short, simple notes, posters and messages.",
      "I can fill in a form and write a short message about myself and my plans.",
      "I can answer and ask simple questions and manage a simple exchange."
    ]
  },
  "A2": {
    "id": "A2",
    "level": "Elementary",
    "cefr": "A2",
    "minutes": "About 35 minutes",
    "intro": "Four sections in the format of official A2 French exams, built only from French you've already practised in Elementary and Novice: dire, voir, savoir, vouloir, venir, pouvoir and avoir besoin.",
    "sections": [
      {
        "fr": "Compréhension de l'oral",
        "en": "Listening · 4 recordings · 10 questions"
      },
      {
        "fr": "Compréhension des écrits",
        "en": "Reading · 4 documents · 10 questions"
      },
      {
        "fr": "Production écrite",
        "en": "Writing · a reply and a blog post"
      },
      {
        "fr": "Production orale",
        "en": "Speaking · interview, monologue, role-play"
      }
    ],
    "sectionSubtitles": {
      "listening": "Listening · each recording plays twice · 25 pts",
      "reading": "Reading · 4 everyday documents · 25 pts",
      "writing": "Writing · 2 texts of 60 words · 25 pts",
      "speaking": "Speaking · Masters Mic · 3 parts · 25 pts"
    },
    "listening": [
      {
        "id": "L1",
        "kicker": "DOCUMENT 1 · VOICEMAIL",
        "title": "A message from Marc",
        "script": "Salut, c'est Marc ! Tu viens à la fête samedi ? Mes amis viennent à huit heures. Tu peux venir avec ton frère. Nous avons besoin d'eau et de pain. Tu pourras m'appeler ? À samedi !",
        "questions": [
          {
            "fr": "La fête est quel jour ?",
            "en": "Which day is the party?",
            "options": [
              "Samedi",
              "Dimanche",
              "Vendredi"
            ],
            "answer": 0
          },
          {
            "fr": "Les amis de Marc viennent à quelle heure ?",
            "en": "What time are Marc's friends coming?",
            "options": [
              "À deux heures",
              "À huit heures",
              "À cinq heures"
            ],
            "answer": 1
          },
          {
            "fr": "Marc a besoin…",
            "en": "Marc needs…",
            "options": [
              "d'un livre",
              "d'eau et de pain",
              "d'un café"
            ],
            "answer": 1
          }
        ]
      },
      {
        "id": "L2",
        "kicker": "DOCUMENT 2 · THREE SHORT CONVERSATIONS",
        "title": "Friends talking",
        "script": "Un. Tu as vu le match hier soir ? ... Oui, j'ai vu le match. ... Et tes amis, ils ont vu le match aussi ? ... Non, ils ont vu un film. ... Deux. Tu sais nager ? ... Oui, je sais nager. ... Et tes enfants, ils savent nager ? ... Non, ils ne savent pas encore. ... Trois. Tu veux un café ? ... Oui, je veux un café. ... Et ton ami, il veut un thé ? ... Non, il veut un chocolat chaud.",
        "questions": [
          {
            "fr": "Un : les amis ont vu…",
            "en": "Conversation 1: the friends saw…",
            "options": [
              "le match",
              "un film",
              "la tour Eiffel"
            ],
            "answer": 1
          },
          {
            "fr": "Deux : les enfants…",
            "en": "Conversation 2: the children…",
            "options": [
              "savent nager",
              "ne savent pas encore nager",
              "ne veulent pas nager"
            ],
            "answer": 1
          },
          {
            "fr": "Trois : l'ami veut…",
            "en": "Conversation 3: the friend wants…",
            "options": [
              "un café",
              "un thé",
              "un chocolat chaud"
            ],
            "answer": 2
          }
        ]
      },
      {
        "id": "L3",
        "kicker": "DOCUMENT 3 · CONVERSATION",
        "title": "Making plans",
        "script": "Tu pourras venir demain ? ... Oui, je pourrai venir. ... Et vous, vous pourrez rester dîner ? ... Non, nous ne pourrons pas rester. ... Une autre fois, alors ! Et tu viendras me voir à Noël ? ... Oui, je viendrai le 24. ... Et tes enfants, ils viendront aussi ? ... Oui, ils viendront aussi.",
        "questions": [
          {
            "fr": "Demain, la personne…",
            "en": "Tomorrow, the person…",
            "options": [
              "pourra venir",
              "ne pourra pas venir",
              "viendra avec ses enfants"
            ],
            "answer": 0
          },
          {
            "fr": "Vous pourrez rester dîner ?",
            "en": "\"Will you be able to stay for dinner?\" What was the reply?",
            "options": [
              "Oui, nous pourrons rester",
              "Non, nous ne pourrons pas rester",
              "Nous ne savons pas encore"
            ],
            "answer": 1
          },
          {
            "fr": "À Noël, la personne viendra…",
            "en": "At Christmas, the person will come…",
            "options": [
              "le 24",
              "le 25",
              "le 8"
            ],
            "answer": 0
          }
        ]
      },
      {
        "id": "L4",
        "kicker": "DOCUMENT 4 · CONVERSATION",
        "title": "This weekend",
        "script": "Tu verras tes grands-parents ce week-end ? ... Oui, je les verrai dimanche. ... Et ta sœur, elle les verra aussi ? ... Non, elle verra ses amis.",
        "questions": [
          {
            "fr": "Ce week-end, la sœur verra…",
            "en": "This weekend the sister will see…",
            "options": [
              "ses grands-parents",
              "ses amis",
              "un film"
            ],
            "answer": 1
          }
        ]
      }
    ],
    "reading": [
      {
        "id": "R1",
        "kicker": "DOCUMENT 1 · TEXT MESSAGE",
        "title": "From Julie",
        "text": "Salut ! Je ne peux pas venir à la fête samedi : j'ai besoin de repos. Je suis très fatiguée. Je viendrai dimanche avec mon frère. Tu pourras m'appeler ce soir ?\nJulie",
        "questions": [
          {
            "fr": "Pourquoi Julie ne vient-elle pas samedi ?",
            "en": "Why isn't Julie coming on Saturday?",
            "options": [
              "Elle a besoin de repos",
              "Elle a besoin d'un médecin",
              "Elle veut voir un film"
            ],
            "answer": 0
          },
          {
            "fr": "Julie viendra…",
            "en": "Julie will come…",
            "options": [
              "samedi",
              "dimanche",
              "ce soir"
            ],
            "answer": 1
          },
          {
            "fr": "Julie viendra avec…",
            "en": "Julie will come with…",
            "options": [
              "sa mère",
              "ses amis",
              "son frère"
            ],
            "answer": 2
          }
        ]
      },
      {
        "id": "R2",
        "kicker": "DOCUMENT 2 · EMAIL",
        "title": "A party for Sophie",
        "text": "Bonjour à tous !\nSamedi, nous ferons une fête pour l'anniversaire de Sophie. Vous pourrez venir à huit heures ? Nous avons besoin d'aide : Paul fera le gâteau et Marc fera les courses. Ne dites rien à Sophie !\nClaire",
        "questions": [
          {
            "fr": "La fête est pour…",
            "en": "The party is for…",
            "options": [
              "l'anniversaire de Sophie",
              "les vacances de Paul",
              "le travail de Marc"
            ],
            "answer": 0
          },
          {
            "fr": "Paul fera…",
            "en": "Paul will make / do…",
            "options": [
              "le gâteau",
              "les courses",
              "la cuisine"
            ],
            "answer": 0
          },
          {
            "fr": "Vous pourrez venir à quelle heure ?",
            "en": "What time can you come?",
            "options": [
              "À deux heures",
              "À huit heures",
              "À cinq heures"
            ],
            "answer": 1
          }
        ]
      },
      {
        "id": "R3",
        "kicker": "DOCUMENT 3 · NOTICE",
        "title": "At the library door",
        "text": "BIBLIOTHÈQUE\nLe lundi, vous ne pouvez pas venir.\nVous pouvez venir du mardi au samedi, de 9 h à 18 h.\nVous avez besoin d'un livre ? Nous pouvons vous aider !",
        "questions": [
          {
            "fr": "Vous pouvez venir à la bibliothèque…",
            "en": "You can come to the library…",
            "options": [
              "le lundi",
              "le mardi",
              "le dimanche"
            ],
            "answer": 1
          },
          {
            "fr": "Le samedi, vous pouvez venir à…",
            "en": "On Saturday you can come at…",
            "options": [
              "8 h",
              "10 h",
              "19 h"
            ],
            "answer": 1
          }
        ]
      },
      {
        "id": "R4",
        "kicker": "DOCUMENT 4 · POSTCARD",
        "title": "Hello from Paris",
        "text": "Bonjour de Paris !\nHier, nous avons vu la tour Eiffel et nous sommes allés au musée. Ma copine a voulu faire du shopping. Demain, nous verrons une pièce de théâtre. Je dirai bonjour à tes parents !\nPaul",
        "questions": [
          {
            "fr": "Hier, Paul et sa copine…",
            "en": "Yesterday Paul and his girlfriend…",
            "options": [
              "ont vu la tour Eiffel",
              "ont vu une pièce de théâtre",
              "sont allés à la plage"
            ],
            "answer": 0
          },
          {
            "fr": "Demain, ils…",
            "en": "Tomorrow they will…",
            "options": [
              "verront une pièce de théâtre",
              "feront du shopping",
              "iront à la plage"
            ],
            "answer": 0
          }
        ]
      }
    ],
    "writing": [
      {
        "id": "T1",
        "kicker": "TASK 1 · REPLY TO AN INVITATION · 12 PTS",
        "max": 12,
        "prompt": "Message de Lucas : « Salut ! Tu viens à ma fête samedi ? Tu peux venir avec ta sœur ! »",
        "promptEn": "You can't go. Reply to Lucas in at least 60 words: thank him, say why you can't come, and say when you will be able to see him.",
        "text": {
          "placeholder": "Salut Lucas, …",
          "minWords": 60,
          "lengthPoints": 3,
          "rubric": [
            {
              "label": "Thanks the friend (merci)",
              "points": 2,
              "all": [
                "\\bmerci\\b"
              ]
            },
            {
              "label": "Says they can't come (ne … pas with pouvoir)",
              "points": 3,
              "all": [
                "\\bne (peux|pouvons|pourrai|pourrons) pas\\b"
              ]
            },
            {
              "label": "Gives a reason (besoin, malade, fatigué(e), travail…)",
              "points": 2,
              "all": [
                "\\b(besoin|malade|fatigue|fatiguee|travail|parce que|parce qu'|car)\\b"
              ]
            },
            {
              "label": "Suggests another time (future or vouloir)",
              "points": 2,
              "all": [
                "\\b[a-z]+(rai|ras|rons|rez|ront)\\b|\\b(je vais|nous allons|je veux|je voudrais|tu veux)\\b"
              ]
            }
          ]
        }
      },
      {
        "id": "T2",
        "kicker": "TASK 2 · BLOG POST · 13 PTS",
        "max": 13,
        "prompt": "Qu'est-ce que vous avez fait le week-end dernier ? Qu'est-ce que vous avez vu ? C'était comment ?",
        "promptEn": "On your blog, write at least 60 words about last weekend: where you went, who you were with, what you saw and what you thought of it.",
        "text": {
          "placeholder": "Samedi, …",
          "minWords": 60,
          "lengthPoints": 3,
          "rubric": [
            {
              "label": "Says where they went (passé composé with être)",
              "points": 3,
              "all": [
                "\\b(suis|es|est|sommes|etes|sont) (alle|venu|parti|arrive|reste|entre|sorti|revenu)"
              ]
            },
            {
              "label": "Says what they saw or did (passé composé with avoir)",
              "points": 3,
              "all": [
                "\\b(ai|as|a|avons|avez|ont) (vu|fait|dit|eu|su|voulu|pu|mange|visite|aime|adore|ecoute)\\b"
              ]
            },
            {
              "label": "Gives an opinion of the outing",
              "points": 2,
              "all": [
                "(c'etait|c'est|j'ai aime|j'ai adore|super|genial|interessant|magnifique|nul)"
              ]
            },
            {
              "label": "Says who they went with (avec)",
              "points": 2,
              "all": [
                "\\bavec\\b"
              ]
            }
          ]
        }
      }
    ],
    "speaking": [
      {
        "id": "P1",
        "kicker": "PART 1 · ENTRETIEN DIRIGÉ · 6 PTS",
        "title": "Guided interview",
        "intro": "Answer about yourself in a full sentence.",
        "pointsPerItem": 2,
        "items": [
          {
            "prompt": "Qu'est-ce que vous voulez faire ce week-end ?",
            "cue": "Say what you want to do this weekend.",
            "need": [
              "\\b(je veux|je voudrais|je vais|je ferai|j'irai|je pourrai|je viendrai|je voudrai)\\b"
            ]
          },
          {
            "prompt": "Vous venez d'où ?",
            "cue": "Say where you come from.",
            "need": [
              "\\b(je viens|nous venons) (de |d'|du |des )"
            ]
          },
          {
            "prompt": "Vous savez nager ?",
            "cue": "Say whether you can swim.",
            "need": [
              "\\b(je sais|je ne sais pas)\\b"
            ]
          }
        ]
      },
      {
        "id": "P2",
        "kicker": "PART 2 · MONOLOGUE SUIVI · 9 PTS",
        "title": "Talk for a minute",
        "intro": "Speak on your own for about a minute. Aim for at least 30 words.",
        "pointsPerItem": 9,
        "items": [
          {
            "prompt": "Qu'est-ce que vous avez fait le week-end dernier ? Qu'est-ce que vous avez vu ?",
            "cue": "Talk about last weekend: what you did and saw.",
            "minWords": 30,
            "need": [
              "\\b(j'ai|nous avons|on a) (vu|fait|dit|eu|voulu|pu)\\b",
              "\\b(je suis|nous sommes|on est) (alle|venu|parti|reste|sorti)",
              "\\b(samedi|dimanche|week-?end)\\b"
            ]
          }
        ]
      },
      {
        "id": "P3",
        "kicker": "PART 3 · EXERCICE EN INTERACTION · 10 PTS",
        "title": "Role-play",
        "intro": "Your friend calls to make plans. Reply using the English cue.",
        "pointsPerItem": 2,
        "items": [
          {
            "prompt": "Tu viens à la fête samedi ?",
            "cue": "Say you can't come on Saturday, but you can on Sunday.",
            "need": [
              "peux pas",
              "dimanche"
            ]
          },
          {
            "prompt": "Dommage ! Tu veux voir un film dimanche, alors ?",
            "cue": "Say yes, you want to see a film.",
            "need": [
              "\\b(je veux|je voudrais) voir\\b",
              "film"
            ]
          },
          {
            "prompt": "Tu sais à quelle heure est le film ?",
            "cue": "Say you don't know, but you'll know tomorrow.",
            "need": [
              "sais pas",
              "\\b(saurai|vais savoir)\\b"
            ]
          },
          {
            "prompt": "Tu viendras en voiture ?",
            "cue": "Say no, you'll come by train.",
            "need": [
              "\\b(viendrai|vais venir)\\b",
              "\\btrain\\b"
            ]
          },
          {
            "prompt": "Super ! Ta sœur viendra aussi ?",
            "cue": "Say yes, she'll come too.",
            "need": [
              "\\b(elle viendra|elle va venir|elle vient)\\b"
            ]
          }
        ]
      }
    ],
    "model": {
      "title": "A model blog post",
      "text": "Samedi, je suis allé à Paris avec ma copine. Nous y sommes allés en train. Nous avons vu la tour Eiffel et le musée. Ma copine a voulu faire du shopping, alors nous avons fait du shopping ! Le soir, nous avons vu une pièce de théâtre. C'était super ! Dimanche, nous avons fait une promenade au parc avec des amis. Nous irons encore à Paris l'année prochaine. C'est une belle ville !"
    },
    "canDo": [
      "I can understand the main point of short, clear messages and announcements.",
      "I can find specific information in everyday texts like ads, emails and notices.",
      "I can write short notes and messages about everyday matters and past events.",
      "I can describe my background and past activities and handle short social exchanges."
    ]
  },
  "B1": {
    "id": "B1",
    "level": "Intermediate B",
    "cefr": "B1",
    "minutes": "About 45 minutes",
    "intro": "Four sections in the format of official B1 French exams, built only from the French you met across Intermediate A and B, imparfait and pluperfect included: longer recordings, an article, an opinion post and a spoken point of view.",
    "sections": [
      {
        "fr": "Compréhension de l'oral",
        "en": "Listening · 3 recordings · 10 questions"
      },
      {
        "fr": "Compréhension des écrits",
        "en": "Reading · choosing a club + an article"
      },
      {
        "fr": "Production écrite",
        "en": "Writing · an opinion post of 160 words"
      },
      {
        "fr": "Production orale",
        "en": "Speaking · interview, role-play, your point of view"
      }
    ],
    "sectionSubtitles": {
      "listening": "Listening · each recording plays twice · 25 pts",
      "reading": "Reading · 2 documents · 25 pts",
      "writing": "Writing · 1 opinion text · 25 pts",
      "speaking": "Speaking · Masters Mic · 3 parts · 25 pts"
    },
    "listening": [
      {
        "id": "L1",
        "kicker": "DOCUMENT 1 · INTERVIEW",
        "title": "A new life in France",
        "script": "Tu t'es adapté à la vie en France ? ... Oui, je me suis vite adapté. Le premier mois, je me suis un peu ennuyé. Mais je m'étais intéressé au français avant de venir, et maintenant, je me débrouille assez bien. ... Et ta famille, elle s'est adaptée aussi ? ... Oui, elle s'est adaptée sans problème. ... Et l'année prochaine ? ... Je trouverai un petit appartement à Paris. ... Bonne chance !",
        "questions": [
          {
            "fr": "Le premier mois, il…",
            "en": "In the first month, he…",
            "options": [
              "s'est entraîné tous les jours",
              "s'est un peu ennuyé",
              "a perdu son passeport"
            ],
            "answer": 1
          },
          {
            "fr": "Avant de venir, il…",
            "en": "Before coming, he…",
            "options": [
              "s'était entraîné pour le marathon",
              "s'était intéressé au français",
              "avait perdu son passeport"
            ],
            "answer": 1
          },
          {
            "fr": "Sa famille…",
            "en": "His family…",
            "options": [
              "s'ennuie beaucoup",
              "ne s'est pas adaptée",
              "s'est adaptée sans problème"
            ],
            "answer": 2
          },
          {
            "fr": "L'année prochaine, il…",
            "en": "Next year, he…",
            "options": [
              "prendra des vacances en août",
              "trouvera un petit appartement à Paris",
              "parlera au directeur"
            ],
            "answer": 1
          }
        ]
      },
      {
        "id": "L2",
        "kicker": "DOCUMENT 2 · SHOP MESSAGE",
        "title": "This week at the shop",
        "script": "Bonjour à tous ! Avant, j'ouvrais le magasin à huit heures. Maintenant, nous ouvrons à neuf heures et nous fermons à 21 heures. Dimanche, je n'ouvrirai pas. Mais la boulangerie, elle ouvrira le matin. Ce soir, je fermerai le bureau à dix-huit heures. La banque, elle, fermera à dix-sept heures. Et vous fermerez la porte avant de partir. Merci !",
        "questions": [
          {
            "fr": "Le magasin ouvre à…",
            "en": "The shop opens at…",
            "options": [
              "9 h",
              "17 h",
              "21 h"
            ],
            "answer": 0
          },
          {
            "fr": "Dimanche…",
            "en": "On Sunday…",
            "options": [
              "le magasin ouvrira le matin",
              "le magasin n'ouvrira pas",
              "la banque ouvrira"
            ],
            "answer": 1
          },
          {
            "fr": "Avant, le magasin ouvrait à…",
            "en": "Before, the shop used to open at…",
            "options": [
              "8 h",
              "9 h",
              "17 h"
            ],
            "answer": 0
          }
        ]
      },
      {
        "id": "L3",
        "kicker": "DOCUMENT 3 · CONVERSATION",
        "title": "Paper or online?",
        "script": "Léo, tu lis le journal le matin ? ... Oui, je lis le journal en ligne. ... Et ton père, il lit le journal ? ... Oui, il lit le journal papier. Avant, il lisait le journal tous les matins au café. À l'ancienne ! ... Et toi, tu as lu le dernier roman de Zola ? ... Oui, je l'ai lu en deux jours. Je le trouve très intéressant. Ma copine, elle le trouve un peu long. ... Chacun son avis !",
        "questions": [
          {
            "fr": "Léo lit le journal…",
            "en": "Léo reads the newspaper…",
            "options": [
              "en ligne",
              "papier",
              "le soir"
            ],
            "answer": 0
          },
          {
            "fr": "Le père de Léo lit…",
            "en": "Léo's father reads…",
            "options": [
              "le journal en ligne",
              "le journal papier",
              "des romans d'horreur"
            ],
            "answer": 1
          },
          {
            "fr": "Léo a lu le roman…",
            "en": "Léo read the novel…",
            "options": [
              "en deux semaines",
              "pendant les vacances",
              "en deux jours"
            ],
            "answer": 2
          }
        ]
      }
    ],
    "reading": [
      {
        "id": "R1",
        "kicker": "DOCUMENT 1 · CHOOSE THE RIGHT CLUB",
        "title": "Vous voulez faire du sport le samedi, avec une équipe.",
        "text": "A · CLUB MARATHON\nOn s'entraîne tous les matins, à six heures.\n\nB · L'ÉQUIPE DU SAMEDI\nUne équipe de sport. Elle s'entraîne le samedi matin au parc. Pour tous !\n\nC · CLUB DE PEINTURE\nLe samedi, à la bibliothèque. On s'intéresse à la peinture.\n\nD · CLUB DE JARDINAGE\nLe mercredi soir. Pour les grands-parents et les petits-enfants.",
        "questions": [
          {
            "fr": "Quel club s'entraîne tous les matins ?",
            "en": "Which club trains every morning?",
            "options": [
              "Club A",
              "Club B",
              "Club C",
              "Club D"
            ],
            "answer": 0
          },
          {
            "fr": "Quel club est pour les grands-parents et les petits-enfants ?",
            "en": "Which club is for grandparents and grandchildren?",
            "options": [
              "Club A",
              "Club B",
              "Club C",
              "Club D"
            ],
            "answer": 3
          },
          {
            "fr": "Dans quel club s'intéresse-t-on à la peinture ?",
            "en": "In which club are people interested in painting?",
            "options": [
              "Club A",
              "Club B",
              "Club C",
              "Club D"
            ],
            "answer": 2
          },
          {
            "fr": "Quel club est pour vous ?",
            "en": "Which club is right for you?",
            "options": [
              "Club A",
              "Club B",
              "Club C",
              "Club D"
            ],
            "answer": 1
          }
        ]
      },
      {
        "id": "R2",
        "kicker": "DOCUMENT 2 · MAGAZINE ARTICLE",
        "title": "Le travail à la maison : une bonne idée ?",
        "text": "Aujourd'hui, beaucoup de Français font leur travail à la maison deux ou trois jours par semaine. Ils sont contents : ils ne prennent plus le métro, et ils se débrouillent bien tout seuls.\n\nMais ce n'est pas toujours facile. Souvent, on s'ennuie un peu sans ses collègues. « Je parle avec mes collègues en ligne, mais ce n'est pas la même chose », dit Julien, 41 ans. Avant, il prenait le métro tous les jours pour aller au travail. Pour s'adapter, on prend une pause au café à midi avec des amis.\n\nMais seul à la maison, Julien s'était beaucoup ennuyé. Alors il a trouvé une solution : le lundi et le jeudi, il prend le train et il parle avec son équipe au bureau. Le mardi, le mercredi et le vendredi, il est à la maison.",
        "questions": [
          {
            "fr": "Avant sa solution, Julien…",
            "en": "Before his solution, Julien…",
            "options": [
              "s'était beaucoup ennuyé tout seul",
              "s'était adapté sans problème",
              "avait perdu son travail"
            ],
            "answer": 0
          },
          {
            "fr": "Pourquoi sont-ils contents ?",
            "en": "Why are they happy?",
            "options": [
              "Ils ont plus d'argent.",
              "Ils ne prennent plus le métro.",
              "Ils ont plus de vacances."
            ],
            "answer": 1
          },
          {
            "fr": "Sans ses collègues, on…",
            "en": "Without your colleagues, you…",
            "options": [
              "se réjouit",
              "perd son travail",
              "s'ennuie un peu"
            ],
            "answer": 2
          },
          {
            "fr": "Avant, Julien…",
            "en": "Before, Julien…",
            "options": [
              "s'entraînait tous les matins",
              "prenait le métro tous les jours",
              "écrivait des e-mails le soir"
            ],
            "answer": 1
          },
          {
            "fr": "Pour s'adapter, on…",
            "en": "To adapt, people…",
            "options": [
              "ferme le bureau",
              "prend une pause au café avec des amis",
              "prend des vacances"
            ],
            "answer": 1
          },
          {
            "fr": "Julien va au bureau…",
            "en": "Julien goes to the office…",
            "options": [
              "tous les jours",
              "le lundi et le jeudi",
              "jamais"
            ],
            "answer": 1
          }
        ]
      }
    ],
    "writing": [
      {
        "id": "T1",
        "kicker": "OPINION POST · 25 PTS",
        "max": 25,
        "prompt": "« Livre papier ou livre en ligne : qu'est-ce que vous trouvez mieux ? »",
        "promptEn": "A French forum asks this question. Give your opinion in at least 160 words, with examples from your own life (what you read, when and where), what you used to do (imparfait), something you had already done before (pluperfect), and what you will do in future. Talk about both paper and online reading.",
        "text": {
          "placeholder": "À mon avis, …",
          "minWords": 160,
          "lengthPoints": 3,
          "rubric": [
            {
              "label": "States an opinion (je crois que / je trouve que / à mon avis)",
              "points": 3,
              "all": [
                "\\b(je crois que|je crois qu'|je trouve que|je trouve qu'|a mon avis|je pense que|je pense qu')"
              ]
            },
            {
              "label": "Uses the passé composé for a past experience",
              "points": 3,
              "all": [
                "\\b(j'ai|nous avons|on a) (lu|ecrit|pris|trouve|mis|perdu|garde|parle|ouvert|ferme|cru)\\b|\\b(je me suis|je ne me suis|nous nous sommes) [a-z]+"
              ]
            },
            {
              "label": "Uses the pluperfect for something done earlier",
              "points": 3,
              "all": [
                "\\b(j'avais|tu avais|il avait|elle avait|on avait|nous avions|vous aviez|ils avaient|elles avaient) (deja )?[a-z]+|\\b(je m'etais|tu t'etais|il s'etait|elle s'etait|on s'etait|nous nous etions|vous vous etiez|ils s'etaient|elles s'etaient) [a-z]+"
              ]
            },
            {
              "label": "Uses a reflexive verb",
              "points": 3,
              "all": [
                "\\b(je me|je m'|tu te|tu t'|il se|elle se|on se|on s'|nous nous|vous vous|ils se|elles se)\\b"
              ]
            },
            {
              "label": "Says what they will do (futur simple or futur proche)",
              "points": 3,
              "all": [
                "\\b[a-z]+(rai|ras|rons|rez|ront)\\b|\\b(je vais|nous allons|on va) [a-z]+(er|ir|re)\\b"
              ]
            },
            {
              "label": "Uses the imparfait for a habit or background",
              "points": 3,
              "all": [
                "\\b(je|tu|il|elle|on|nous|vous|ils|elles) (m'|t'|s'|nous |vous )?[a-z]+(ais|ait|ions|iez|aient)\\b"
              ]
            },
            {
              "label": "Links ideas (mais, alors, aussi, quand: at least three)",
              "points": 2,
              "count": "\\b(mais|alors|aussi|quand)\\b",
              "min": 3
            },
            {
              "label": "Discusses both paper and online reading",
              "points": 2,
              "all": [
                "papier",
                "(en ligne|tablette)"
              ]
            }
          ]
        }
      }
    ],
    "speaking": [
      {
        "id": "P1",
        "kicker": "PART 1 · ENTRETIEN DIRIGÉ · 6 PTS",
        "title": "Guided interview",
        "intro": "Talk about yourself in a few sentences.",
        "pointsPerItem": 2,
        "items": [
          {
            "prompt": "Tu t'intéresses à l'histoire ?",
            "cue": "Say whether you're interested in history, and what interests you.",
            "need": [
              "\\b(je m'interesse|je ne m'interesse)"
            ]
          },
          {
            "prompt": "Quand tu étais enfant, tu t'intéressais à quoi ?",
            "cue": "Say what you used to be interested in as a child.",
            "need": [
              "\\b(je m'interessais|je ne m'interessais|j'aimais|je lisais|je faisais)"
            ]
          },
          {
            "prompt": "Tu te souviens de ton premier jour d'école ?",
            "cue": "Say whether you remember your first day at school.",
            "need": [
              "\\b(je me souviens|je m'en souviens|je ne m'en souviens|je ne me souviens)"
            ]
          }
        ]
      },
      {
        "id": "P2",
        "kicker": "PART 2 · EXERCICE EN INTERACTION · 9 PTS",
        "title": "Role-play",
        "intro": "At the lost-property office of a train station. Reply using the English cue.",
        "pointsPerItem": 3,
        "items": [
          {
            "prompt": "Bonjour, je peux vous aider ?",
            "cue": "Say you lost your bag on the train this morning.",
            "need": [
              "\\bperdu\\b",
              "\\bsac\\b",
              "\\b(train|ce matin)\\b"
            ]
          },
          {
            "prompt": "Il est comment, votre sac ?",
            "cue": "Say it's blue, and that you had put your keys and your glasses in it.",
            "need": [
              "\\bbleu\\b",
              "\\b(j'avais|avais) mis\\b"
            ]
          },
          {
            "prompt": "Nous ne l'avons pas trouvé. Vous pouvez revenir demain ?",
            "cue": "Say you'll manage, and you'll come back tomorrow morning.",
            "need": [
              "debrouill",
              "\\bdemain\\b"
            ]
          }
        ]
      },
      {
        "id": "P3",
        "kicker": "PART 3 · EXPRESSION D'UN POINT DE VUE · 10 PTS",
        "title": "Give your point of view",
        "intro": "Read the short text, then give and defend your opinion for about a minute. Aim for at least 40 words.",
        "pointsPerItem": 10,
        "items": [
          {
            "prompt": "Tu trouves que c'est une bonne idée ? Pourquoi ?",
            "cue": "Give your opinion, with reasons and an example.",
            "doc": "LE DIMANCHE, SANS VOITURE ?\nDans une ville française, on ne peut pas aller en ville en voiture le dimanche. Les enfants font du vélo, les parents font une promenade et on prend un café ensemble. Mais un propriétaire de magasin n'est pas content : il perd de l'argent.",
            "minWords": 40,
            "need": [
              "\\b(je crois que|je crois qu'|je trouve que|je trouve qu'|a mon avis|je pense que|je pense qu')",
              "\\b(mais|alors|aussi|quand)\\b",
              "\\b(voiture|velo|ville|dimanche|magasin|promenade)"
            ]
          }
        ]
      }
    ],
    "model": {
      "title": "A model opinion post",
      "text": "À mon avis, le livre papier et le livre en ligne sont tous les deux bons, mais pas pour les mêmes choses. Je prends le métro tous les jours pour aller au travail, alors je lis souvent sur ma tablette. C'est facile : j'ai beaucoup de livres sur ma tablette ! Avant ma tablette, j'avais déjà lu tous les vieux livres de mon père. L'année dernière, j'ai lu dix romans en ligne pendant mes voyages, et je ne me suis jamais ennuyé. Mais je trouve que le livre papier est plus beau. Quand j'étais petit, je lisais beaucoup de romans papier. Mon père lit toujours le journal papier le matin, à l'ancienne, et moi aussi, le dimanche, je lis un livre papier avec un café. Quand je lis un roman papier, je m'en souviens mieux. Et quand mes petits-enfants viennent chez moi, je leur lis une histoire dans un vieux livre : ils se réjouissent beaucoup ! Alors, je crois que les deux sont bons : la tablette pour les voyages, et le papier pour la maison. L'année prochaine, je lirai encore des romans en ligne, mais je garderai toujours mes vieux livres papier. Chacun son avis !"
    },
    "canDo": [
      "I can understand the main points of clear speech on familiar topics.",
      "I can understand texts about everyday and work topics and find what I need.",
      "I can write a connected text giving my opinion with reasons and examples.",
      "I can handle most everyday situations and give and explain my opinion."
    ]
  }
};

export const CEFR_IDS: CefrId[] = ["A1", "A2", "B1"];

/** The CEFR-style test that follows a level, if any. */
export function cefrTestForLevel(level: string): CefrTest | undefined {
  return CEFR_IDS.map((id) => CEFR_TESTS[id]).find((t) => t.level === level);
}
