import type { ConvTurn } from "./conversations";

// 1.2.3.5 warm-ups (23 Oct 2026): an easier opening played BEFORE each Elementary
// (+1 exchange, ~15 s) and Intermediate (+2 exchanges, ~30 s) conversation. Every
// learner reply is one of that unit's quiz answers. Keyed like CONVERSATIONS.
// Generated from the reviewed warm-up list; edit the list, then regenerate.
export const WARMUPS: Record<string, ConvTurn[]> = {
  "Elementary|Present|dire": [
    {
      "who": "app",
      "fr": "Bonjour ! Dis-tu la vérité maintenant ?",
      "en": "Hello! Are you telling the truth now?",
      "audio": "ELE_dire_pres_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je dis la vérité maintenant.",
      "en": "Yes, I'm telling the truth now.",
      "accept": [
        "Oui, je dis la vérité maintenant.",
        "Je dis la vérité maintenant.",
        "Oui, je dis la vérité."
      ]
    }
  ],
  "Elementary|Present|voir": [
    {
      "who": "app",
      "fr": "Bonjour ! Qu'est-ce que tu vois dans le ciel ?",
      "en": "Hello! What can you see in the sky?",
      "audio": "ELE_voir_pres_w1"
    },
    {
      "who": "you",
      "fr": "Je vois les oiseaux dans le ciel.",
      "en": "I can see the birds in the sky.",
      "accept": [
        "Je vois les oiseaux dans le ciel.",
        "Je vois des oiseaux dans le ciel.",
        "Je vois les oiseaux."
      ]
    }
  ],
  "Elementary|Present|savoir": [
    {
      "who": "app",
      "fr": "Bonjour ! Sais-tu la réponse ?",
      "en": "Hello! Do you know the answer?",
      "audio": "ELE_savoir_pres_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je sais la réponse.",
      "en": "Yes, I know the answer.",
      "accept": [
        "Oui, je sais la réponse.",
        "Je sais la réponse.",
        "Oui, je la sais."
      ]
    }
  ],
  "Elementary|Present|vouloir": [
    {
      "who": "app",
      "fr": "Bonjour ! Voulez-vous voir le directeur ?",
      "en": "Hello! Do you want to see the manager?",
      "audio": "ELE_vouloir_pres_w1"
    },
    {
      "who": "you",
      "fr": "Oui, nous voulons voir le directeur.",
      "en": "Yes, we want to see the manager.",
      "accept": [
        "Oui, nous voulons voir le directeur.",
        "Nous voulons voir le directeur.",
        "Oui, on veut voir le directeur."
      ]
    }
  ],
  "Elementary|Present|venir": [
    {
      "who": "app",
      "fr": "Salut ! Viens-tu du bureau ?",
      "en": "Hi! Are you coming from the office?",
      "audio": "ELE_venir_pres_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je viens du bureau.",
      "en": "Yes, I'm coming from the office.",
      "accept": [
        "Oui, je viens du bureau.",
        "Je viens du bureau."
      ]
    }
  ],
  "Elementary|Present|pouvoir": [
    {
      "who": "app",
      "fr": "Bonjour ! Pouvez-vous commencer ?",
      "en": "Hello! Can you start?",
      "audio": "ELE_pouvoir_pres_w1"
    },
    {
      "who": "you",
      "fr": "Oui, nous pouvons commencer.",
      "en": "Yes, we can start.",
      "accept": [
        "Oui, nous pouvons commencer.",
        "Nous pouvons commencer.",
        "Oui, on peut commencer."
      ]
    }
  ],
  "Elementary|Present|besoin": [
    {
      "who": "app",
      "fr": "Bonjour ! Avez-vous besoin d'eau ?",
      "en": "Hello! Do you need water?",
      "audio": "ELE_avoir-besoin-de_pres_w1"
    },
    {
      "who": "you",
      "fr": "Oui, nous avons besoin d'eau.",
      "en": "Yes, we need water.",
      "accept": [
        "Oui, nous avons besoin d'eau.",
        "Nous avons besoin d'eau.",
        "Oui, on a besoin d'eau."
      ]
    }
  ],
  "Elementary|Past|dire": [
    {
      "who": "app",
      "fr": "Salut ! As-tu dit oui ?",
      "en": "Hi! Did you say yes?",
      "audio": "ELE_dire_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, j'ai dit oui.",
      "en": "Yes, I said yes.",
      "accept": [
        "Oui, j'ai dit oui.",
        "J'ai dit oui."
      ]
    }
  ],
  "Elementary|Past|voir": [
    {
      "who": "app",
      "fr": "Salut ! As-tu vu ce film ?",
      "en": "Hi! Have you seen that film?",
      "audio": "ELE_voir_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, j'ai vu ce film.",
      "en": "Yes, I've seen that film.",
      "accept": [
        "Oui, j'ai vu ce film.",
        "J'ai vu ce film.",
        "Oui, je l'ai vu."
      ]
    }
  ],
  "Elementary|Past|savoir": [
    {
      "who": "app",
      "fr": "Bonjour ! As-tu su la réponse ?",
      "en": "Hello! Did you find out the answer?",
      "audio": "ELE_savoir_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, j'ai su la réponse.",
      "en": "Yes, I found out the answer.",
      "accept": [
        "Oui, j'ai su la réponse.",
        "J'ai su la réponse."
      ]
    }
  ],
  "Elementary|Past|vouloir": [
    {
      "who": "app",
      "fr": "Salut ! As-tu voulu m'appeler ?",
      "en": "Hi! Did you want to call me?",
      "audio": "ELE_vouloir_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, j'ai voulu t'appeler.",
      "en": "Yes, I wanted to call you.",
      "accept": [
        "Oui, j'ai voulu t'appeler.",
        "J'ai voulu t'appeler."
      ]
    }
  ],
  "Elementary|Past|venir": [
    {
      "who": "app",
      "fr": "Bonjour ! Es-tu venu avec ta famille ?",
      "en": "Hello! Did you come with your family?",
      "audio": "ELE_venir_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je suis venu avec ma famille.",
      "en": "Yes, I came with my family.",
      "accept": [
        "Oui, je suis venu avec ma famille.",
        "Je suis venu avec ma famille.",
        "Oui, je suis venue avec ma famille."
      ]
    }
  ],
  "Elementary|Past|pouvoir": [
    {
      "who": "app",
      "fr": "Bonjour ! As-tu pu te reposer ?",
      "en": "Hello! Were you able to get some rest?",
      "audio": "ELE_pouvoir_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, j'ai pu me reposer.",
      "en": "Yes, I was able to get some rest.",
      "accept": [
        "Oui, j'ai pu me reposer.",
        "J'ai pu me reposer."
      ]
    }
  ],
  "Elementary|Past|besoin": [
    {
      "who": "app",
      "fr": "Bonjour ! Avez-vous eu besoin d'eau ?",
      "en": "Hello! Did you need water?",
      "audio": "ELE_avoir-besoin-de_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, nous avons eu besoin d'eau.",
      "en": "Yes, we needed water.",
      "accept": [
        "Oui, nous avons eu besoin d'eau.",
        "Nous avons eu besoin d'eau.",
        "Oui, on a eu besoin d'eau."
      ]
    }
  ],
  "Elementary|Future|dire": [
    {
      "who": "app",
      "fr": "Salut ! Direz-vous bonjour ?",
      "en": "Hi! Will you say hello?",
      "audio": "ELE_dire_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, nous dirons bonjour.",
      "en": "Yes, we will say hello.",
      "accept": [
        "Oui, nous dirons bonjour.",
        "Nous dirons bonjour.",
        "Oui, on dira bonjour."
      ]
    }
  ],
  "Elementary|Future|voir": [
    {
      "who": "app",
      "fr": "Bonjour ! Verrez-vous une pièce de théâtre ?",
      "en": "Hello! Will you see a play?",
      "audio": "ELE_voir_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, nous verrons une pièce de théâtre.",
      "en": "Yes, we will see a play.",
      "accept": [
        "Oui, nous verrons une pièce de théâtre.",
        "Nous verrons une pièce de théâtre.",
        "Oui, on verra une pièce de théâtre."
      ]
    }
  ],
  "Elementary|Future|savoir": [
    {
      "who": "app",
      "fr": "Bonjour ! Sauras-tu le faire ?",
      "en": "Hello! Will you know how to do it?",
      "audio": "ELE_savoir_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je saurai le faire.",
      "en": "Yes, I will know how to do it.",
      "accept": [
        "Oui, je saurai le faire.",
        "Je saurai le faire."
      ]
    }
  ],
  "Elementary|Future|vouloir": [
    {
      "who": "app",
      "fr": "Bonjour ! Voudras-tu partir tôt ?",
      "en": "Hello! Will you want to leave early?",
      "audio": "ELE_vouloir_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je voudrai partir tôt.",
      "en": "Yes, I will want to leave early.",
      "accept": [
        "Oui, je voudrai partir tôt.",
        "Je voudrai partir tôt."
      ]
    }
  ],
  "Elementary|Future|venir": [
    {
      "who": "app",
      "fr": "Salut ! Viendrez-vous pour le dîner ?",
      "en": "Hi! Will you come for dinner?",
      "audio": "ELE_venir_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, nous viendrons pour le dîner.",
      "en": "Yes, we will come for dinner.",
      "accept": [
        "Oui, nous viendrons pour le dîner.",
        "Nous viendrons pour le dîner.",
        "Oui, on viendra pour le dîner."
      ]
    }
  ],
  "Elementary|Future|pouvoir": [
    {
      "who": "app",
      "fr": "Salut ! Pourras-tu m'appeler ?",
      "en": "Hi! Will you be able to call me?",
      "audio": "ELE_pouvoir_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je pourrai t'appeler.",
      "en": "Yes, I will be able to call you.",
      "accept": [
        "Oui, je pourrai t'appeler.",
        "Je pourrai t'appeler."
      ]
    }
  ],
  "Elementary|Future|besoin": [
    {
      "who": "app",
      "fr": "Bonjour ! Auras-tu besoin d'un livre ?",
      "en": "Hello! Will you need a book?",
      "audio": "ELE_avoir-besoin-de_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, j'aurai besoin d'un livre.",
      "en": "Yes, I will need a book.",
      "accept": [
        "Oui, j'aurai besoin d'un livre.",
        "J'aurai besoin d'un livre."
      ]
    }
  ],
  "Intermediate|Present|s'intéresser": [
    {
      "who": "app",
      "fr": "Bonjour ! Ta sœur s'intéresse-t-elle à la science ?",
      "en": "Hello! Is your sister interested in science?",
      "audio": "INT_s-interesser_pres_w1"
    },
    {
      "who": "you",
      "fr": "Oui, elle s'intéresse à la science.",
      "en": "Yes, she's interested in science.",
      "accept": [
        "Oui, elle s'intéresse à la science.",
        "Elle s'intéresse à la science."
      ]
    },
    {
      "who": "app",
      "fr": "Ah bon ? Et moi, je m'intéresse à quoi ?",
      "en": "Really? And me, what am I interested in?",
      "audio": "INT_s-interesser_pres_w3"
    },
    {
      "who": "you",
      "fr": "Tu t'intéresses à la musique.",
      "en": "You're interested in music.",
      "accept": [
        "Tu t'intéresses à la musique.",
        "Tu t'intéresses à la musique !"
      ]
    }
  ],
  "Intermediate|Present|se débrouiller": [
    {
      "who": "app",
      "fr": "Salut ! Ton ami et toi, vous vous débrouillez comment ?",
      "en": "Hi! How are you and your friend managing?",
      "audio": "INT_se-debrouiller_pres_w1"
    },
    {
      "who": "you",
      "fr": "Nous nous débrouillons ensemble.",
      "en": "We manage together.",
      "accept": [
        "Nous nous débrouillons ensemble.",
        "On se débrouille ensemble."
      ]
    },
    {
      "who": "app",
      "fr": "Ah bon ? Et ton fils, se débrouille-t-il sans aide ?",
      "en": "Really? And your son, does he manage without help?",
      "audio": "INT_se-debrouiller_pres_w3"
    },
    {
      "who": "you",
      "fr": "Non, il ne se débrouille pas sans aide.",
      "en": "No, he doesn't manage without help.",
      "accept": [
        "Non, il ne se débrouille pas sans aide.",
        "Il ne se débrouille pas sans aide.",
        "Non, il ne se débrouille pas tout seul."
      ]
    }
  ],
  "Intermediate|Present|s'ennuyer": [
    {
      "who": "app",
      "fr": "Salut ! Ton ami et toi, vous ennuyez-vous ?",
      "en": "Hi! Are you and your friend bored?",
      "audio": "INT_s-ennuyer_pres_w1"
    },
    {
      "who": "you",
      "fr": "Non, nous ne nous ennuyons pas.",
      "en": "No, we're not bored.",
      "accept": [
        "Non, nous ne nous ennuyons pas.",
        "Nous ne nous ennuyons pas.",
        "Non, on ne s'ennuie pas."
      ]
    },
    {
      "who": "app",
      "fr": "Ah bon ? Et ta sœur, s'ennuie-t-elle ?",
      "en": "Really? And your sister, is she bored?",
      "audio": "INT_s-ennuyer_pres_w3"
    },
    {
      "who": "you",
      "fr": "Oui, elle s'ennuie.",
      "en": "Yes, she's bored.",
      "accept": [
        "Oui, elle s'ennuie.",
        "Elle s'ennuie.",
        "Oui, elle s'ennuie un peu."
      ]
    }
  ],
  "Intermediate|Present|s'entraîner": [
    {
      "who": "app",
      "fr": "Salut ! Ton frère et toi, vous entraînez-vous ?",
      "en": "Hi! Do you and your brother train?",
      "audio": "INT_s-entrainer_pres_w1"
    },
    {
      "who": "you",
      "fr": "Oui, nous nous entraînons.",
      "en": "Yes, we train.",
      "accept": [
        "Oui, nous nous entraînons.",
        "Nous nous entraînons.",
        "Oui, on s'entraîne."
      ]
    },
    {
      "who": "app",
      "fr": "Ah bon ? Et tes amis, s'entraînent-ils aussi ?",
      "en": "Really? And your friends, do they train too?",
      "audio": "INT_s-entrainer_pres_w3"
    },
    {
      "who": "you",
      "fr": "Non, ils ne s'entraînent pas.",
      "en": "No, they don't train.",
      "accept": [
        "Non, ils ne s'entraînent pas.",
        "Ils ne s'entraînent pas."
      ]
    }
  ],
  "Intermediate|Present|se souvenir": [
    {
      "who": "app",
      "fr": "Bonjour ! Ta sœur et toi, vous souvenez-vous de moi ?",
      "en": "Hello! Do you and your sister remember me?",
      "audio": "INT_se-souvenir_pres_w1"
    },
    {
      "who": "you",
      "fr": "Oui, nous nous souvenons.",
      "en": "Yes, we remember.",
      "accept": [
        "Oui, nous nous souvenons.",
        "Oui, nous nous souvenons de toi.",
        "Oui, on se souvient de toi."
      ]
    },
    {
      "who": "app",
      "fr": "Super ! Et ton frère, se souvient-il de moi ?",
      "en": "Great! And your brother, does he remember me?",
      "audio": "INT_se-souvenir_pres_w3"
    },
    {
      "who": "you",
      "fr": "Non, il ne se souvient pas.",
      "en": "No, he doesn't remember.",
      "accept": [
        "Non, il ne se souvient pas.",
        "Il ne se souvient pas.",
        "Non, il ne se souvient pas de toi."
      ]
    }
  ],
  "Intermediate|Present|s'adapter": [
    {
      "who": "app",
      "fr": "Salut ! Ta famille et toi, vous adaptez-vous ici ?",
      "en": "Hi! Are you and your family adapting here?",
      "audio": "INT_s-adapter_pres_w1"
    },
    {
      "who": "you",
      "fr": "Oui, nous nous adaptons.",
      "en": "Yes, we're adapting.",
      "accept": [
        "Oui, nous nous adaptons.",
        "Nous nous adaptons.",
        "Oui, on s'adapte."
      ]
    },
    {
      "who": "app",
      "fr": "Super ! Et ton chat, s'adapte-t-il ?",
      "en": "Great! And your cat, is he adapting?",
      "audio": "INT_s-adapter_pres_w3"
    },
    {
      "who": "you",
      "fr": "Non, il ne s'adapte pas.",
      "en": "No, he isn't adapting.",
      "accept": [
        "Non, il ne s'adapte pas.",
        "Il ne s'adapte pas."
      ]
    }
  ],
  "Intermediate|Present|se réjouir": [
    {
      "who": "app",
      "fr": "Bonjour ! Ta sœur et toi, vous réjouissez-vous de la fête ?",
      "en": "Hello! Are you and your sister looking forward to the party?",
      "audio": "INT_se-rejouir_pres_w1"
    },
    {
      "who": "you",
      "fr": "Oui, nous nous réjouissons.",
      "en": "Yes, we're looking forward to it.",
      "accept": [
        "Oui, nous nous réjouissons.",
        "Nous nous réjouissons.",
        "Oui, on se réjouit."
      ]
    },
    {
      "who": "app",
      "fr": "Super ! Et ton frère, se réjouit-il aussi ?",
      "en": "Great! And your brother, is he looking forward to it too?",
      "audio": "INT_se-rejouir_pres_w3"
    },
    {
      "who": "you",
      "fr": "Non, il ne se réjouit pas.",
      "en": "No, he isn't looking forward to it.",
      "accept": [
        "Non, il ne se réjouit pas.",
        "Il ne se réjouit pas."
      ]
    }
  ],
  "Intermediate|Present|mettre": [
    {
      "who": "app",
      "fr": "Salut ! Où est-ce que tu mets tes clés ?",
      "en": "Hi! Where do you put your keys?",
      "audio": "INT_mettre_pres_w1"
    },
    {
      "who": "you",
      "fr": "Je mets mes clés sur la table.",
      "en": "I put my keys on the table.",
      "accept": [
        "Je mets mes clés sur la table.",
        "Je les mets sur la table."
      ]
    },
    {
      "who": "app",
      "fr": "Ah bon ? Et ton téléphone, le mets-tu en silencieux ?",
      "en": "Really? And your phone, do you put it on silent?",
      "audio": "INT_mettre_pres_w3"
    },
    {
      "who": "you",
      "fr": "Oui, je mets toujours mon téléphone en silencieux.",
      "en": "Yes, I always put my phone on silent.",
      "accept": [
        "Oui, je mets toujours mon téléphone en silencieux.",
        "Je mets toujours mon téléphone en silencieux.",
        "Oui, je le mets toujours en silencieux."
      ]
    }
  ],
  "Intermediate|Present|trouver": [
    {
      "who": "app",
      "fr": "Bonjour ! Trouves-tu facile de parler français ?",
      "en": "Hello! Do you find it easy to speak French?",
      "audio": "INT_trouver_pres_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je trouve ça facile de parler français.",
      "en": "Yes, I find it easy to speak French.",
      "accept": [
        "Oui, je trouve ça facile de parler français.",
        "Je trouve ça facile de parler français.",
        "Oui, je trouve ça facile."
      ]
    },
    {
      "who": "app",
      "fr": "Super ! Et trouves-tu souvent de l'argent par terre ?",
      "en": "Great! And do you often find money on the ground?",
      "audio": "INT_trouver_pres_w3"
    },
    {
      "who": "you",
      "fr": "Non, je trouve rarement de l'argent par terre.",
      "en": "No, I rarely find money on the ground.",
      "accept": [
        "Non, je trouve rarement de l'argent par terre.",
        "Je trouve rarement de l'argent par terre.",
        "Non, j'en trouve rarement par terre."
      ]
    }
  ],
  "Intermediate|Present|croire": [
    {
      "who": "app",
      "fr": "Salut ! Crois-tu en tes amis ?",
      "en": "Hi! Do you believe in your friends?",
      "audio": "INT_croire_pres_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je crois en mes amis.",
      "en": "Yes, I believe in my friends.",
      "accept": [
        "Oui, je crois en mes amis.",
        "Je crois en mes amis.",
        "Oui, je crois en eux."
      ]
    },
    {
      "who": "app",
      "fr": "C'est bien ! Et crois-tu tout ce que je dis ?",
      "en": "That's good! And do you believe everything I say?",
      "audio": "INT_croire_pres_w3"
    },
    {
      "who": "you",
      "fr": "Oui, je crois tout ce que tu dis.",
      "en": "Yes, I believe everything you say.",
      "accept": [
        "Oui, je crois tout ce que tu dis.",
        "Je crois tout ce que tu dis."
      ]
    }
  ],
  "Intermediate|Present|parler": [
    {
      "who": "app",
      "fr": "Bonjour ! Parles-tu souvent avec ta sœur ?",
      "en": "Hello! Do you often talk with your sister?",
      "audio": "INT_parler_pres_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je parle souvent avec ma sœur.",
      "en": "Yes, I often talk with my sister.",
      "accept": [
        "Oui, je parle souvent avec ma sœur.",
        "Je parle souvent avec ma sœur.",
        "Oui, je parle souvent à ma sœur."
      ]
    },
    {
      "who": "app",
      "fr": "Et au cinéma, parlez-vous pendant le film ?",
      "en": "And at the cinema, do you (both) talk during the film?",
      "audio": "INT_parler_pres_w3"
    },
    {
      "who": "you",
      "fr": "Non, nous parlons rarement pendant le film.",
      "en": "No, we rarely talk during the film.",
      "accept": [
        "Non, nous parlons rarement pendant le film.",
        "Nous parlons rarement pendant le film.",
        "Non, on parle rarement pendant le film."
      ]
    }
  ],
  "Intermediate|Present|prendre": [
    {
      "who": "app",
      "fr": "Salut ! Prends-tu une douche le matin ?",
      "en": "Hi! Do you take a shower in the morning?",
      "audio": "INT_prendre_pres_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je prends une douche tous les matins.",
      "en": "Yes, I take a shower every morning.",
      "accept": [
        "Oui, je prends une douche tous les matins.",
        "Je prends une douche tous les matins.",
        "Oui, je prends une douche chaque matin."
      ]
    },
    {
      "who": "app",
      "fr": "Et ta femme et toi, prenez-vous la voiture aujourd'hui ?",
      "en": "And are you and your wife taking the car today?",
      "audio": "INT_prendre_pres_w3"
    },
    {
      "who": "you",
      "fr": "Non, nous ne prenons pas la voiture aujourd'hui.",
      "en": "No, we're not taking the car today.",
      "accept": [
        "Non, nous ne prenons pas la voiture aujourd'hui.",
        "Nous ne prenons pas la voiture aujourd'hui.",
        "Non, on ne prend pas la voiture aujourd'hui."
      ]
    }
  ],
  "Intermediate|Present|lire": [
    {
      "who": "app",
      "fr": "Bonjour ! Lis-tu des romans d'horreur ?",
      "en": "Hello! Do you read horror novels?",
      "audio": "INT_lire_pres_w1"
    },
    {
      "who": "you",
      "fr": "Non, je ne lis pas de romans d'horreur.",
      "en": "No, I don't read horror novels.",
      "accept": [
        "Non, je ne lis pas de romans d'horreur.",
        "Je ne lis pas de romans d'horreur.",
        "Non, je n'en lis pas."
      ]
    },
    {
      "who": "app",
      "fr": "Ah bon ? Tes amis et toi, lisez-vous le même livre ?",
      "en": "Really? And do you and your friends read the same book?",
      "audio": "INT_lire_pres_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous lisons le même livre.",
      "en": "Yes, we read the same book.",
      "accept": [
        "Oui, nous lisons le même livre.",
        "Nous lisons le même livre.",
        "Oui, on lit le même livre."
      ]
    }
  ],
  "Intermediate|Present|écrire": [
    {
      "who": "app",
      "fr": "Salut ! Écris-tu avant le petit déjeuner ?",
      "en": "Hi! Do you write before breakfast?",
      "audio": "INT_ecrire_pres_w1"
    },
    {
      "who": "you",
      "fr": "Non, je n'écris rien avant le petit déjeuner.",
      "en": "No, I don't write anything before breakfast.",
      "accept": [
        "Non, je n'écris rien avant le petit déjeuner.",
        "Je n'écris rien avant le petit déjeuner.",
        "Non, je n'écris pas avant le petit déjeuner."
      ]
    },
    {
      "who": "app",
      "fr": "Et à l'école, écrivez-vous des dissertations ?",
      "en": "And at school, do you (all) write essays?",
      "audio": "INT_ecrire_pres_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous écrivons des dissertations pour la classe.",
      "en": "Yes, we write essays for class.",
      "accept": [
        "Oui, nous écrivons des dissertations pour la classe.",
        "Nous écrivons des dissertations pour la classe.",
        "Oui, nous écrivons des dissertations."
      ]
    }
  ],
  "Intermediate|Present|ouvrir": [
    {
      "who": "app",
      "fr": "Bonjour ! Ouvres-tu tes cadeaux le jour de ton anniversaire ?",
      "en": "Hello! Do you open your presents on your birthday?",
      "audio": "INT_ouvrir_pres_w1"
    },
    {
      "who": "you",
      "fr": "Oui, j'ouvre les cadeaux le jour de mon anniversaire.",
      "en": "Yes, I open the presents on my birthday.",
      "accept": [
        "Oui, j'ouvre les cadeaux le jour de mon anniversaire.",
        "J'ouvre les cadeaux le jour de mon anniversaire.",
        "Oui, j'ouvre mes cadeaux le jour de mon anniversaire."
      ]
    },
    {
      "who": "app",
      "fr": "Et au travail, ouvrez-vous le magasin à neuf heures ?",
      "en": "And at work, do you (all) open the shop at nine o'clock?",
      "audio": "INT_ouvrir_pres_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous ouvrons le magasin à neuf heures.",
      "en": "Yes, we open the shop at nine o'clock.",
      "accept": [
        "Oui, nous ouvrons le magasin à neuf heures.",
        "Nous ouvrons le magasin à neuf heures.",
        "Oui, on ouvre le magasin à neuf heures."
      ]
    }
  ],
  "Intermediate|Present|fermer": [
    {
      "who": "app",
      "fr": "Salut ! Fermes-tu le dossier avant de sauvegarder ?",
      "en": "Hi! Do you close the file before saving?",
      "audio": "INT_fermer_pres_w1"
    },
    {
      "who": "you",
      "fr": "Non, je ne ferme pas le dossier avant de sauvegarder.",
      "en": "No, I don't close the file before saving.",
      "accept": [
        "Non, je ne ferme pas le dossier avant de sauvegarder.",
        "Je ne ferme pas le dossier avant de sauvegarder.",
        "Non, je ne le ferme pas avant de sauvegarder."
      ]
    },
    {
      "who": "app",
      "fr": "Et au travail, fermez-vous le magasin à 21 heures ?",
      "en": "And at work, do you (all) close the shop at 9 p.m.?",
      "audio": "INT_fermer_pres_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous fermons le magasin à 21 heures.",
      "en": "Yes, we close the shop at 9 p.m.",
      "accept": [
        "Oui, nous fermons le magasin à 21 heures.",
        "Nous fermons le magasin à 21 heures.",
        "Oui, nous fermons le magasin à vingt et une heures."
      ]
    }
  ],
  "Intermediate|Present|perdre": [
    {
      "who": "app",
      "fr": "Salut ! Perds-tu parfois ton chemin ?",
      "en": "Hi! Do you sometimes lose your way?",
      "audio": "INT_perdre_pres_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je perds mon chemin parfois.",
      "en": "Yes, I lose my way sometimes.",
      "accept": [
        "Oui, je perds mon chemin parfois.",
        "Je perds mon chemin parfois.",
        "Oui, je perds parfois mon chemin."
      ]
    },
    {
      "who": "app",
      "fr": "Ah bon ? Mais ne perds-tu pas espoir ?",
      "en": "Really? But you don't lose hope?",
      "audio": "INT_perdre_pres_w3"
    },
    {
      "who": "you",
      "fr": "Non, je ne perds pas espoir.",
      "en": "No, I don't lose hope.",
      "accept": [
        "Non, je ne perds pas espoir.",
        "Je ne perds pas espoir.",
        "Non, je ne perds pas l'espoir."
      ]
    }
  ],
  "Intermediate|Present|garder": [
    {
      "who": "app",
      "fr": "Bonjour ! Gardes-tu tes reçus ?",
      "en": "Hello! Do you keep your receipts?",
      "audio": "INT_garder_pres_w1"
    },
    {
      "who": "you",
      "fr": "Non, je ne garde aucun reçu.",
      "en": "No, I don't keep any receipts.",
      "accept": [
        "Non, je ne garde aucun reçu.",
        "Je ne garde aucun reçu.",
        "Non, je ne garde pas mes reçus."
      ]
    },
    {
      "who": "app",
      "fr": "Ah bon ? Et au travail, gardez-vous votre espace propre ?",
      "en": "Really? And at work, do you (all) keep your space clean?",
      "audio": "INT_garder_pres_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous gardons notre espace de travail propre.",
      "en": "Yes, we keep our workspace clean.",
      "accept": [
        "Oui, nous gardons notre espace de travail propre.",
        "Nous gardons notre espace de travail propre.",
        "Oui, nous gardons notre espace propre."
      ]
    }
  ],
  "Intermediate|Past|s'intéresser": [
    {
      "who": "app",
      "fr": "Salut ! Devine : mon frère s'est intéressé à un nouveau sujet.",
      "en": "Hi! Guess what: my brother got interested in a new subject.",
      "audio": "INT_s-interesser_pc_w1"
    },
    {
      "who": "you",
      "fr": "Est-ce qu'il s'est intéressé à la politique ?",
      "en": "Did he get interested in politics?",
      "accept": [
        "Est-ce qu'il s'est intéressé à la politique ?",
        "Il s'est intéressé à la politique ?",
        "Il s'est intéressé à la politique."
      ]
    },
    {
      "who": "app",
      "fr": "Oui, bravo ! Et ma sœur, elle s'est intéressée à quoi ?",
      "en": "Yes, well done! And my sister, what did she get interested in?",
      "audio": "INT_s-interesser_pc_w3"
    },
    {
      "who": "you",
      "fr": "Est-ce qu'elle s'est intéressée à la science ?",
      "en": "Did she get interested in science?",
      "accept": [
        "Est-ce qu'elle s'est intéressée à la science ?",
        "Elle s'est intéressée à la science ?",
        "Elle s'est intéressée à la science."
      ]
    }
  ],
  "Intermediate|Past|se débrouiller": [
    {
      "who": "app",
      "fr": "Salut ! Ton frère et toi, vous êtes-vous bien débrouillés ?",
      "en": "Hi! Did you and your brother manage well?",
      "audio": "INT_se-debrouiller_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, nous nous sommes bien débrouillés.",
      "en": "Yes, we managed fine.",
      "accept": [
        "Oui, nous nous sommes bien débrouillés.",
        "Nous nous sommes bien débrouillés.",
        "Oui, on s'est bien débrouillés."
      ]
    },
    {
      "who": "app",
      "fr": "Super ! Et ta sœur, s'est-elle débrouillée toute seule ?",
      "en": "Great! And your sister, did she manage on her own?",
      "audio": "INT_se-debrouiller_pc_w3"
    },
    {
      "who": "you",
      "fr": "Oui, elle s'est débrouillée toute seule.",
      "en": "Yes, she managed on her own.",
      "accept": [
        "Oui, elle s'est débrouillée toute seule.",
        "Elle s'est débrouillée toute seule.",
        "Oui, elle s'est débrouillée seule."
      ]
    }
  ],
  "Intermediate|Past|s'ennuyer": [
    {
      "who": "app",
      "fr": "Salut ! Tes amis se sont-ils ennuyés hier soir ?",
      "en": "Hi! Did your friends get bored last night?",
      "audio": "INT_s-ennuyer_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, ils se sont ennuyés.",
      "en": "Yes, they got bored.",
      "accept": [
        "Oui, ils se sont ennuyés.",
        "Ils se sont ennuyés.",
        "Oui, ils se sont ennuyés hier soir."
      ]
    },
    {
      "who": "app",
      "fr": "Ah bon ? Et ton frère, s'est-il ennuyé aussi ?",
      "en": "Really? And your brother, did he get bored too?",
      "audio": "INT_s-ennuyer_pc_w3"
    },
    {
      "who": "you",
      "fr": "Non, il ne s'est pas ennuyé.",
      "en": "No, he didn't get bored.",
      "accept": [
        "Non, il ne s'est pas ennuyé.",
        "Il ne s'est pas ennuyé."
      ]
    }
  ],
  "Intermediate|Past|s'entraîner": [
    {
      "who": "app",
      "fr": "Salut ! Tes amis se sont-ils entraînés ce matin ?",
      "en": "Hi! Did your friends train this morning?",
      "audio": "INT_s-entrainer_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, ils se sont entraînés.",
      "en": "Yes, they trained.",
      "accept": [
        "Oui, ils se sont entraînés.",
        "Ils se sont entraînés.",
        "Oui, ils se sont entraînés ce matin."
      ]
    },
    {
      "who": "app",
      "fr": "Super ! Et ton frère, s'est-il entraîné aussi ?",
      "en": "Great! And your brother, did he train too?",
      "audio": "INT_s-entrainer_pc_w3"
    },
    {
      "who": "you",
      "fr": "Non, il ne s'est pas entraîné.",
      "en": "No, he didn't train.",
      "accept": [
        "Non, il ne s'est pas entraîné.",
        "Il ne s'est pas entraîné."
      ]
    }
  ],
  "Intermediate|Past|se souvenir": [
    {
      "who": "app",
      "fr": "Bonjour ! Ta mère s'est-elle souvenue de la fête ?",
      "en": "Hello! Did your mother remember the party?",
      "audio": "INT_se-souvenir_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, elle s'est souvenue.",
      "en": "Yes, she remembered.",
      "accept": [
        "Oui, elle s'est souvenue.",
        "Elle s'est souvenue.",
        "Oui, elle s'en est souvenue."
      ]
    },
    {
      "who": "app",
      "fr": "Super ! Et tes amis, se sont-ils souvenus aussi ?",
      "en": "Great! And your friends, did they remember too?",
      "audio": "INT_se-souvenir_pc_w3"
    },
    {
      "who": "you",
      "fr": "Non, ils ne se sont pas souvenus.",
      "en": "No, they didn't remember.",
      "accept": [
        "Non, ils ne se sont pas souvenus.",
        "Ils ne se sont pas souvenus.",
        "Non, ils ne s'en sont pas souvenus."
      ]
    }
  ],
  "Intermediate|Past|s'adapter": [
    {
      "who": "app",
      "fr": "Salut ! Tes enfants se sont-ils adaptés à l'école ?",
      "en": "Hi! Have your children adapted to school?",
      "audio": "INT_s-adapter_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, ils se sont adaptés.",
      "en": "Yes, they've adapted.",
      "accept": [
        "Oui, ils se sont adaptés.",
        "Ils se sont adaptés.",
        "Oui, ils se sont adaptés à l'école."
      ]
    },
    {
      "who": "app",
      "fr": "Super ! Et ton chat, s'est-il adapté ?",
      "en": "Great! And your cat, has he adapted?",
      "audio": "INT_s-adapter_pc_w3"
    },
    {
      "who": "you",
      "fr": "Non, il ne s'est pas adapté.",
      "en": "No, he hasn't adapted.",
      "accept": [
        "Non, il ne s'est pas adapté.",
        "Il ne s'est pas adapté."
      ]
    }
  ],
  "Intermediate|Past|se réjouir": [
    {
      "who": "app",
      "fr": "Bonjour ! Ta sœur s'est-elle réjouie de son cadeau ?",
      "en": "Hello! Was your sister delighted with her present?",
      "audio": "INT_se-rejouir_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, elle s'est réjouie.",
      "en": "Yes, she was delighted.",
      "accept": [
        "Oui, elle s'est réjouie.",
        "Elle s'est réjouie.",
        "Oui, elle s'en est réjouie."
      ]
    },
    {
      "who": "app",
      "fr": "Ah bon ? Et ton frère, s'est-il réjoui aussi ?",
      "en": "Really? And your brother, was he delighted too?",
      "audio": "INT_se-rejouir_pc_w3"
    },
    {
      "who": "you",
      "fr": "Non, il ne s'est pas réjoui.",
      "en": "No, he wasn't delighted.",
      "accept": [
        "Non, il ne s'est pas réjoui.",
        "Il ne s'est pas réjoui."
      ]
    }
  ],
  "Intermediate|Past|mettre": [
    {
      "who": "app",
      "fr": "Salut ! Ton frère et toi, où avez-vous mis vos manteaux ?",
      "en": "Hi! You and your brother, where did you put your coats?",
      "audio": "INT_mettre_pc_w1"
    },
    {
      "who": "you",
      "fr": "Nous avons mis nos manteaux dans le couloir.",
      "en": "We put our coats in the hallway.",
      "accept": [
        "Nous avons mis nos manteaux dans le couloir.",
        "Nous les avons mis dans le couloir.",
        "On a mis nos manteaux dans le couloir."
      ]
    },
    {
      "who": "app",
      "fr": "D'accord. Et ton fils, a-t-il mis une écharpe ?",
      "en": "OK. And your son, did he put on a scarf?",
      "audio": "INT_mettre_pc_w3"
    },
    {
      "who": "you",
      "fr": "Oui, il a mis une écharpe pour sortir.",
      "en": "Yes, he put on a scarf to go out.",
      "accept": [
        "Oui, il a mis une écharpe pour sortir.",
        "Il a mis une écharpe pour sortir.",
        "Oui, il a mis une écharpe."
      ]
    }
  ],
  "Intermediate|Past|trouver": [
    {
      "who": "app",
      "fr": "Salut ! As-tu trouvé un bon restaurant hier soir ?",
      "en": "Hi! Did you find a good restaurant last night?",
      "audio": "INT_trouver_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, j'ai trouvé un excellent restaurant hier soir.",
      "en": "Yes, I found an excellent restaurant last night.",
      "accept": [
        "Oui, j'ai trouvé un excellent restaurant hier soir.",
        "J'ai trouvé un excellent restaurant hier soir.",
        "Oui, j'ai trouvé un excellent restaurant."
      ]
    },
    {
      "who": "app",
      "fr": "Super ! Ton ami et toi, avez-vous trouvé une idée ?",
      "en": "Great! Did you and your friend find an idea?",
      "audio": "INT_trouver_pc_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous avons trouvé une idée originale.",
      "en": "Yes, we found an original idea.",
      "accept": [
        "Oui, nous avons trouvé une idée originale.",
        "Nous avons trouvé une idée originale.",
        "Oui, on a trouvé une idée originale."
      ]
    }
  ],
  "Intermediate|Past|croire": [
    {
      "who": "app",
      "fr": "Salut ! Ton équipe et toi, avez-vous cru en ce projet ?",
      "en": "Hi! Did you and your team believe in this project?",
      "audio": "INT_croire_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, nous avons cru en ce projet.",
      "en": "Yes, we believed in this project.",
      "accept": [
        "Oui, nous avons cru en ce projet.",
        "Nous avons cru en ce projet.",
        "Oui, on a cru en ce projet."
      ]
    },
    {
      "who": "app",
      "fr": "Super ! Et toi, as-tu cru en tes amis ?",
      "en": "Great! And you, did you believe in your friends?",
      "audio": "INT_croire_pc_w3"
    },
    {
      "who": "you",
      "fr": "Oui, j'ai cru en mes amis cette fois-là.",
      "en": "Yes, I believed in my friends that time.",
      "accept": [
        "Oui, j'ai cru en mes amis cette fois-là.",
        "J'ai cru en mes amis cette fois-là.",
        "Oui, j'ai cru en mes amis.",
        "Oui, j'ai cru en eux."
      ]
    }
  ],
  "Intermediate|Past|parler": [
    {
      "who": "app",
      "fr": "Bonjour ! As-tu parlé avec ta sœur ce matin ?",
      "en": "Hello! Did you talk with your sister this morning?",
      "audio": "INT_parler_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, j'ai parlé avec ma sœur ce matin.",
      "en": "Yes, I talked with my sister this morning.",
      "accept": [
        "Oui, j'ai parlé avec ma sœur ce matin.",
        "J'ai parlé avec ma sœur ce matin.",
        "Oui, j'ai parlé à ma sœur ce matin."
      ]
    },
    {
      "who": "app",
      "fr": "Et au travail, avez-vous parlé avec le directeur ?",
      "en": "And at work, did you (all) talk with the director?",
      "audio": "INT_parler_pc_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous avons parlé avec le directeur hier.",
      "en": "Yes, we talked with the director yesterday.",
      "accept": [
        "Oui, nous avons parlé avec le directeur hier.",
        "Nous avons parlé avec le directeur hier.",
        "Oui, nous avons parlé avec le directeur."
      ]
    }
  ],
  "Intermediate|Past|prendre": [
    {
      "who": "app",
      "fr": "Salut ! As-tu pris du sucre dans ton café ?",
      "en": "Hi! Did you take sugar in your coffee?",
      "audio": "INT_prendre_pc_w1"
    },
    {
      "who": "you",
      "fr": "Non, je n'ai pas pris de sucre dans mon café.",
      "en": "No, I didn't take sugar in my coffee.",
      "accept": [
        "Non, je n'ai pas pris de sucre dans mon café.",
        "Je n'ai pas pris de sucre dans mon café.",
        "Non, je n'ai pas pris de sucre."
      ]
    },
    {
      "who": "app",
      "fr": "Et ton ami et toi, avez-vous pris l'ascenseur ?",
      "en": "And did you and your friend take the lift?",
      "audio": "INT_prendre_pc_w3"
    },
    {
      "who": "you",
      "fr": "Non, nous avons pris les escaliers au lieu de l'ascenseur.",
      "en": "No, we took the stairs instead of the lift.",
      "accept": [
        "Non, nous avons pris les escaliers au lieu de l'ascenseur.",
        "Nous avons pris les escaliers au lieu de l'ascenseur.",
        "Non, nous avons pris les escaliers."
      ]
    }
  ],
  "Intermediate|Past|lire": [
    {
      "who": "app",
      "fr": "Bonjour ! As-tu lu la biographie ?",
      "en": "Hello! Did you read the biography?",
      "audio": "INT_lire_pc_w1"
    },
    {
      "who": "you",
      "fr": "Non, je n'ai pas lu la biographie.",
      "en": "No, I didn't read the biography.",
      "accept": [
        "Non, je n'ai pas lu la biographie.",
        "Je n'ai pas lu la biographie.",
        "Non, je ne l'ai pas lue."
      ]
    },
    {
      "who": "app",
      "fr": "Et ton ami et toi, avez-vous lu le même article ?",
      "en": "And did you and your friend read the same article?",
      "audio": "INT_lire_pc_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous avons lu le même article hier.",
      "en": "Yes, we read the same article yesterday.",
      "accept": [
        "Oui, nous avons lu le même article hier.",
        "Nous avons lu le même article hier.",
        "Oui, nous avons lu le même article."
      ]
    }
  ],
  "Intermediate|Past|écrire": [
    {
      "who": "app",
      "fr": "Salut ! As-tu écrit ton nom sur le formulaire ?",
      "en": "Hi! Did you write your name on the form?",
      "audio": "INT_ecrire_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, j'ai écrit mon nom sur le formulaire.",
      "en": "Yes, I wrote my name on the form.",
      "accept": [
        "Oui, j'ai écrit mon nom sur le formulaire.",
        "J'ai écrit mon nom sur le formulaire.",
        "Oui, je l'ai écrit sur le formulaire."
      ]
    },
    {
      "who": "app",
      "fr": "Et à l'école, avez-vous écrit en français ?",
      "en": "And at school, did you (all) write in French?",
      "audio": "INT_ecrire_pc_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous avons écrit en français.",
      "en": "Yes, we wrote in French.",
      "accept": [
        "Oui, nous avons écrit en français.",
        "Nous avons écrit en français.",
        "Oui, on a écrit en français."
      ]
    }
  ],
  "Intermediate|Past|ouvrir": [
    {
      "who": "app",
      "fr": "Bonjour ! As-tu ouvert les fenêtres la nuit ?",
      "en": "Hello! Did you open the windows at night?",
      "audio": "INT_ouvrir_pc_w1"
    },
    {
      "who": "you",
      "fr": "Non, je n'ai pas ouvert les fenêtres la nuit.",
      "en": "No, I didn't open the windows at night.",
      "accept": [
        "Non, je n'ai pas ouvert les fenêtres la nuit.",
        "Je n'ai pas ouvert les fenêtres la nuit.",
        "Non, je ne les ai pas ouvertes la nuit."
      ]
    },
    {
      "who": "app",
      "fr": "Et au travail, avez-vous ouvert le magasin à neuf heures ?",
      "en": "And at work, did you (all) open the shop at nine o'clock?",
      "audio": "INT_ouvrir_pc_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous avons ouvert le magasin à neuf heures.",
      "en": "Yes, we opened the shop at nine o'clock.",
      "accept": [
        "Oui, nous avons ouvert le magasin à neuf heures.",
        "Nous avons ouvert le magasin à neuf heures.",
        "Oui, on a ouvert le magasin à neuf heures."
      ]
    }
  ],
  "Intermediate|Past|fermer": [
    {
      "who": "app",
      "fr": "Salut ! As-tu fermé le dossier avant de sauvegarder ?",
      "en": "Hi! Did you close the file before saving?",
      "audio": "INT_fermer_pc_w1"
    },
    {
      "who": "you",
      "fr": "Non, je n'ai pas fermé le dossier avant de sauvegarder.",
      "en": "No, I didn't close the file before saving.",
      "accept": [
        "Non, je n'ai pas fermé le dossier avant de sauvegarder.",
        "Je n'ai pas fermé le dossier avant de sauvegarder.",
        "Non, je ne l'ai pas fermé avant de sauvegarder."
      ]
    },
    {
      "who": "app",
      "fr": "Bien ! Ta famille et toi, avez-vous fermé la porte ?",
      "en": "Good! Did you and your family close the door?",
      "audio": "INT_fermer_pc_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous avons fermé la porte avant de partir.",
      "en": "Yes, we closed the door before leaving.",
      "accept": [
        "Oui, nous avons fermé la porte avant de partir.",
        "Nous avons fermé la porte avant de partir.",
        "Oui, nous avons fermé la porte."
      ]
    }
  ],
  "Intermediate|Past|perdre": [
    {
      "who": "app",
      "fr": "Salut ! As-tu perdu tes lunettes hier ?",
      "en": "Hi! Did you lose your glasses yesterday?",
      "audio": "INT_perdre_pc_w1"
    },
    {
      "who": "you",
      "fr": "Oui, j'ai perdu mes lunettes hier.",
      "en": "Yes, I lost my glasses yesterday.",
      "accept": [
        "Oui, j'ai perdu mes lunettes hier.",
        "J'ai perdu mes lunettes hier.",
        "Oui, je les ai perdues hier."
      ]
    },
    {
      "who": "app",
      "fr": "Oh non ! Et as-tu perdu ton chemin hier soir ?",
      "en": "Oh no! And did you lose your way last night?",
      "audio": "INT_perdre_pc_w3"
    },
    {
      "who": "you",
      "fr": "Oui, j'ai perdu mon chemin hier soir.",
      "en": "Yes, I lost my way last night.",
      "accept": [
        "Oui, j'ai perdu mon chemin hier soir.",
        "J'ai perdu mon chemin hier soir.",
        "Oui, j'ai perdu mon chemin."
      ]
    }
  ],
  "Intermediate|Past|garder": [
    {
      "who": "app",
      "fr": "Bonjour ! As-tu gardé tes reçus ?",
      "en": "Hello! Did you keep your receipts?",
      "audio": "INT_garder_pc_w1"
    },
    {
      "who": "you",
      "fr": "Non, je n'ai gardé aucun reçu.",
      "en": "No, I didn't keep any receipts.",
      "accept": [
        "Non, je n'ai gardé aucun reçu.",
        "Je n'ai gardé aucun reçu.",
        "Non, je n'ai pas gardé mes reçus."
      ]
    },
    {
      "who": "app",
      "fr": "Et ta famille et toi, avez-vous gardé vos promesses ?",
      "en": "And did you and your family keep your promises?",
      "audio": "INT_garder_pc_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous avons gardé nos promesses.",
      "en": "Yes, we kept our promises.",
      "accept": [
        "Oui, nous avons gardé nos promesses.",
        "Nous avons gardé nos promesses.",
        "Oui, on a gardé nos promesses."
      ]
    }
  ],
  "Intermediate|Future|s'intéresser": [
    {
      "who": "app",
      "fr": "Bonjour ! Ton frère s'intéressera-t-il au cinéma ?",
      "en": "Hello! Will your brother take an interest in cinema?",
      "audio": "INT_s-interesser_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, il s'intéressera au cinéma.",
      "en": "Yes, he'll take an interest in cinema.",
      "accept": [
        "Oui, il s'intéressera au cinéma.",
        "Il s'intéressera au cinéma."
      ]
    },
    {
      "who": "app",
      "fr": "Ah bon ? Et toi, t'intéresseras-tu aux sports ?",
      "en": "Really? And you, will you take an interest in sports?",
      "audio": "INT_s-interesser_fut_w3"
    },
    {
      "who": "you",
      "fr": "Oui, je m'intéresserai aux sports.",
      "en": "Yes, I'll take an interest in sports.",
      "accept": [
        "Oui, je m'intéresserai aux sports.",
        "Je m'intéresserai aux sports.",
        "Oui, je m'intéresserai au sport."
      ]
    }
  ],
  "Intermediate|Future|se débrouiller": [
    {
      "who": "app",
      "fr": "Salut ! Ta sœur se débrouillera-t-elle toute seule ce soir ?",
      "en": "Hi! Will your sister manage on her own tonight?",
      "audio": "INT_se-debrouiller_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, elle se débrouillera toute seule.",
      "en": "Yes, she'll manage on her own.",
      "accept": [
        "Oui, elle se débrouillera toute seule.",
        "Elle se débrouillera toute seule.",
        "Oui, elle se débrouillera seule."
      ]
    },
    {
      "who": "app",
      "fr": "Super ! Et ton frère et toi, vous débrouillerez-vous ?",
      "en": "Great! And will you and your brother manage?",
      "audio": "INT_se-debrouiller_fut_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous nous débrouillerons bien.",
      "en": "Yes, we'll manage fine.",
      "accept": [
        "Oui, nous nous débrouillerons bien.",
        "Nous nous débrouillerons bien.",
        "Oui, on se débrouillera bien."
      ]
    }
  ],
  "Intermediate|Future|s'ennuyer": [
    {
      "who": "app",
      "fr": "Salut ! Ta sœur s'ennuiera-t-elle à la fête ce soir ?",
      "en": "Hi! Will your sister be bored at the party tonight?",
      "audio": "INT_s-ennuyer_fut_w1"
    },
    {
      "who": "you",
      "fr": "Non, elle ne s'ennuiera pas.",
      "en": "No, she won't be bored.",
      "accept": [
        "Non, elle ne s'ennuiera pas.",
        "Elle ne s'ennuiera pas."
      ]
    },
    {
      "who": "app",
      "fr": "Super ! Et tes parents, s'ennuieront-ils ?",
      "en": "Great! And your parents, will they be bored?",
      "audio": "INT_s-ennuyer_fut_w3"
    },
    {
      "who": "you",
      "fr": "Oui, ils s'ennuieront.",
      "en": "Yes, they'll be bored.",
      "accept": [
        "Oui, ils s'ennuieront.",
        "Ils s'ennuieront.",
        "Oui, ils s'ennuieront un peu."
      ]
    }
  ],
  "Intermediate|Future|s'entraîner": [
    {
      "who": "app",
      "fr": "Salut ! Ton ami et toi, vous entraînerez-vous samedi ?",
      "en": "Hi! Will you and your friend train on Saturday?",
      "audio": "INT_s-entrainer_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, nous nous entraînerons.",
      "en": "Yes, we'll train.",
      "accept": [
        "Oui, nous nous entraînerons.",
        "Nous nous entraînerons.",
        "Oui, on s'entraînera."
      ]
    },
    {
      "who": "app",
      "fr": "Super ! Et ta sœur, s'entraînera-t-elle aussi ?",
      "en": "Great! And your sister, will she train too?",
      "audio": "INT_s-entrainer_fut_w3"
    },
    {
      "who": "you",
      "fr": "Non, elle ne s'entraînera pas.",
      "en": "No, she won't train.",
      "accept": [
        "Non, elle ne s'entraînera pas.",
        "Elle ne s'entraînera pas."
      ]
    }
  ],
  "Intermediate|Future|se souvenir": [
    {
      "who": "app",
      "fr": "Bonjour ! Ta sœur se souviendra-t-elle de mon anniversaire ?",
      "en": "Hello! Will your sister remember my birthday?",
      "audio": "INT_se-souvenir_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, elle se souviendra.",
      "en": "Yes, she'll remember.",
      "accept": [
        "Oui, elle se souviendra.",
        "Elle se souviendra.",
        "Oui, elle s'en souviendra."
      ]
    },
    {
      "who": "app",
      "fr": "Super ! Et ton frère, se souviendra-t-il aussi ?",
      "en": "Great! And your brother, will he remember too?",
      "audio": "INT_se-souvenir_fut_w3"
    },
    {
      "who": "you",
      "fr": "Non, il ne se souviendra pas.",
      "en": "No, he won't remember.",
      "accept": [
        "Non, il ne se souviendra pas.",
        "Il ne se souviendra pas.",
        "Non, il ne s'en souviendra pas."
      ]
    }
  ],
  "Intermediate|Future|s'adapter": [
    {
      "who": "app",
      "fr": "Salut ! Ta famille et toi, vous adapterez-vous à la ville ?",
      "en": "Hi! Will you and your family adapt to the city?",
      "audio": "INT_s-adapter_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, nous nous adapterons.",
      "en": "Yes, we'll adapt.",
      "accept": [
        "Oui, nous nous adapterons.",
        "Nous nous adapterons.",
        "Oui, on s'adaptera."
      ]
    },
    {
      "who": "app",
      "fr": "Super ! Et ton chien, s'adaptera-t-il aussi ?",
      "en": "Great! And your dog, will he adapt too?",
      "audio": "INT_s-adapter_fut_w3"
    },
    {
      "who": "you",
      "fr": "Non, il ne s'adaptera pas.",
      "en": "No, he won't adapt.",
      "accept": [
        "Non, il ne s'adaptera pas.",
        "Il ne s'adaptera pas."
      ]
    }
  ],
  "Intermediate|Future|se réjouir": [
    {
      "who": "app",
      "fr": "Bonjour ! Ton frère et toi, vous réjouirez-vous de la fête ?",
      "en": "Hello! Will you and your brother be glad about the party?",
      "audio": "INT_se-rejouir_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, nous nous réjouirons.",
      "en": "Yes, we'll be glad.",
      "accept": [
        "Oui, nous nous réjouirons.",
        "Nous nous réjouirons.",
        "Oui, on se réjouira."
      ]
    },
    {
      "who": "app",
      "fr": "Super ! Mon fils sera là aussi. Tes parents se réjouiront-ils ?",
      "en": "Great! My son will be there too. Will your parents be glad?",
      "audio": "INT_se-rejouir_fut_w3"
    },
    {
      "who": "you",
      "fr": "Oui, ils se réjouiront.",
      "en": "Yes, they'll be glad.",
      "accept": [
        "Oui, ils se réjouiront.",
        "Ils se réjouiront.",
        "Oui, ils se réjouiront beaucoup."
      ]
    }
  ],
  "Intermediate|Future|mettre": [
    {
      "who": "app",
      "fr": "Salut ! Mettras-tu des épices dans ce plat ?",
      "en": "Hi! Will you put spices in this dish?",
      "audio": "INT_mettre_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je mettrai toujours des épices dans ce plat.",
      "en": "Yes, I'll always put spices in this dish.",
      "accept": [
        "Oui, je mettrai toujours des épices dans ce plat.",
        "Je mettrai toujours des épices dans ce plat.",
        "Oui, je mettrai des épices dans ce plat."
      ]
    },
    {
      "who": "app",
      "fr": "Ah bon ? Et ton fils, mettra-t-il ses chaussures ?",
      "en": "Really? And your son, will he put his shoes on?",
      "audio": "INT_mettre_fut_w3"
    },
    {
      "who": "you",
      "fr": "Oui, il mettra ses chaussures avant de sortir.",
      "en": "Yes, he'll put his shoes on before going out.",
      "accept": [
        "Oui, il mettra ses chaussures avant de sortir.",
        "Il mettra ses chaussures avant de sortir.",
        "Oui, il mettra ses chaussures."
      ]
    }
  ],
  "Intermediate|Future|trouver": [
    {
      "who": "app",
      "fr": "Salut ! Ta sœur trouvera-t-elle un taxi demain matin ?",
      "en": "Hi! Will your sister find a taxi tomorrow morning?",
      "audio": "INT_trouver_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, elle trouvera un taxi demain matin.",
      "en": "Yes, she'll find a taxi tomorrow morning.",
      "accept": [
        "Oui, elle trouvera un taxi demain matin.",
        "Elle trouvera un taxi demain matin.",
        "Oui, elle trouvera un taxi."
      ]
    },
    {
      "who": "app",
      "fr": "Super ! Ton ami et toi, trouverez-vous la rue ?",
      "en": "Great! Will you and your friend find the street?",
      "audio": "INT_trouver_fut_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous trouverons cette rue facilement.",
      "en": "Yes, we'll find this street easily.",
      "accept": [
        "Oui, nous trouverons cette rue facilement.",
        "Nous trouverons cette rue facilement.",
        "Oui, nous trouverons la rue facilement."
      ]
    }
  ],
  "Intermediate|Future|croire": [
    {
      "who": "app",
      "fr": "Salut ! Croiras-tu tout ce que je dis ?",
      "en": "Hi! Will you believe everything I say?",
      "audio": "INT_croire_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je croirai tout ce que tu dis.",
      "en": "Yes, I'll believe everything you say.",
      "accept": [
        "Oui, je croirai tout ce que tu dis.",
        "Je croirai tout ce que tu dis.",
        "Oui, je croirai tout ce que tu diras."
      ]
    },
    {
      "who": "app",
      "fr": "Et ta famille et toi, croirez-vous en l'avenir ?",
      "en": "And will you and your family believe in the future?",
      "audio": "INT_croire_fut_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous croirons en l'avenir.",
      "en": "Yes, we'll believe in the future.",
      "accept": [
        "Oui, nous croirons en l'avenir.",
        "Nous croirons en l'avenir.",
        "Oui, on croira en l'avenir."
      ]
    }
  ],
  "Intermediate|Future|parler": [
    {
      "who": "app",
      "fr": "Bonjour ! Parleras-tu avec tes voisins demain ?",
      "en": "Hello! Will you talk with your neighbours tomorrow?",
      "audio": "INT_parler_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je parlerai avec mes voisins demain.",
      "en": "Yes, I'll talk with my neighbours tomorrow.",
      "accept": [
        "Oui, je parlerai avec mes voisins demain.",
        "Je parlerai avec mes voisins demain.",
        "Oui, je parlerai à mes voisins demain."
      ]
    },
    {
      "who": "app",
      "fr": "Et au travail, parlerez-vous français à la réunion ?",
      "en": "And at work, will you (all) speak French at the meeting?",
      "audio": "INT_parler_fut_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous parlerons français à la réunion demain.",
      "en": "Yes, we'll speak French at the meeting tomorrow.",
      "accept": [
        "Oui, nous parlerons français à la réunion demain.",
        "Nous parlerons français à la réunion demain.",
        "Oui, nous parlerons français à la réunion."
      ]
    }
  ],
  "Intermediate|Future|prendre": [
    {
      "who": "app",
      "fr": "Salut ! Prendras-tu le bus pour aller au travail ?",
      "en": "Hi! Will you take the bus to go to work?",
      "audio": "INT_prendre_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je prendrai le bus pour aller au travail.",
      "en": "Yes, I'll take the bus to go to work.",
      "accept": [
        "Oui, je prendrai le bus pour aller au travail.",
        "Je prendrai le bus pour aller au travail.",
        "Oui, je prendrai le bus."
      ]
    },
    {
      "who": "app",
      "fr": "Et à midi, prendrez-vous une longue pause ?",
      "en": "And at midday, will you (all) take a long break?",
      "audio": "INT_prendre_fut_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous prendrons une longue pause après le déjeuner.",
      "en": "Yes, we'll take a long break after lunch.",
      "accept": [
        "Oui, nous prendrons une longue pause après le déjeuner.",
        "Nous prendrons une longue pause après le déjeuner.",
        "Oui, nous prendrons une longue pause."
      ]
    }
  ],
  "Intermediate|Future|lire": [
    {
      "who": "app",
      "fr": "Bonjour ! Liras-tu ce livre le mois prochain ?",
      "en": "Hello! Will you read this book next month?",
      "audio": "INT_lire_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je lirai ce livre le mois prochain.",
      "en": "Yes, I'll read this book next month.",
      "accept": [
        "Oui, je lirai ce livre le mois prochain.",
        "Je lirai ce livre le mois prochain.",
        "Oui, je le lirai le mois prochain."
      ]
    },
    {
      "who": "app",
      "fr": "Et liras-tu des romans d'horreur ?",
      "en": "And will you read horror novels?",
      "audio": "INT_lire_fut_w3"
    },
    {
      "who": "you",
      "fr": "Non, je ne lirai pas de romans d'horreur.",
      "en": "No, I won't read horror novels.",
      "accept": [
        "Non, je ne lirai pas de romans d'horreur.",
        "Je ne lirai pas de romans d'horreur.",
        "Non, je n'en lirai pas."
      ]
    }
  ],
  "Intermediate|Future|écrire": [
    {
      "who": "app",
      "fr": "Salut ! Écriras-tu ton nom sur le formulaire ?",
      "en": "Hi! Will you write your name on the form?",
      "audio": "INT_ecrire_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, j'écrirai mon nom sur le formulaire.",
      "en": "Yes, I'll write my name on the form.",
      "accept": [
        "Oui, j'écrirai mon nom sur le formulaire.",
        "J'écrirai mon nom sur le formulaire.",
        "Oui, je l'écrirai sur le formulaire."
      ]
    },
    {
      "who": "app",
      "fr": "Et à l'école, écrirez-vous en français ?",
      "en": "And at school, will you (all) write in French?",
      "audio": "INT_ecrire_fut_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous écrirons en français.",
      "en": "Yes, we'll write in French.",
      "accept": [
        "Oui, nous écrirons en français.",
        "Nous écrirons en français.",
        "Oui, on écrira en français."
      ]
    }
  ],
  "Intermediate|Future|ouvrir": [
    {
      "who": "app",
      "fr": "Salut ! Ouvriras-tu tes cadeaux le jour de ton anniversaire ?",
      "en": "Hi! Will you open your presents on your birthday?",
      "audio": "INT_ouvrir_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, j'ouvrirai les cadeaux le jour de mon anniversaire.",
      "en": "Yes, I'll open the presents on my birthday.",
      "accept": [
        "Oui, j'ouvrirai les cadeaux le jour de mon anniversaire.",
        "J'ouvrirai les cadeaux le jour de mon anniversaire.",
        "Oui, j'ouvrirai mes cadeaux le jour de mon anniversaire."
      ]
    },
    {
      "who": "app",
      "fr": "Et ouvriras-tu les fenêtres la nuit ?",
      "en": "And will you open the windows at night?",
      "audio": "INT_ouvrir_fut_w3"
    },
    {
      "who": "you",
      "fr": "Non, je n'ouvrirai pas les fenêtres la nuit.",
      "en": "No, I won't open the windows at night.",
      "accept": [
        "Non, je n'ouvrirai pas les fenêtres la nuit.",
        "Je n'ouvrirai pas les fenêtres la nuit.",
        "Non, je ne les ouvrirai pas la nuit."
      ]
    }
  ],
  "Intermediate|Future|fermer": [
    {
      "who": "app",
      "fr": "Salut ! Fermeras-tu le dossier avant de sauvegarder ?",
      "en": "Hi! Will you close the file before saving?",
      "audio": "INT_fermer_fut_w1"
    },
    {
      "who": "you",
      "fr": "Non, je ne fermerai pas le dossier avant de sauvegarder.",
      "en": "No, I won't close the file before saving.",
      "accept": [
        "Non, je ne fermerai pas le dossier avant de sauvegarder.",
        "Je ne fermerai pas le dossier avant de sauvegarder.",
        "Non, je ne le fermerai pas avant de sauvegarder."
      ]
    },
    {
      "who": "app",
      "fr": "Et au travail, fermerez-vous la porte avant de partir ?",
      "en": "And at work, will you (all) close the door before leaving?",
      "audio": "INT_fermer_fut_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous fermerons la porte avant de partir.",
      "en": "Yes, we'll close the door before leaving.",
      "accept": [
        "Oui, nous fermerons la porte avant de partir.",
        "Nous fermerons la porte avant de partir.",
        "Oui, nous fermerons la porte."
      ]
    }
  ],
  "Intermediate|Future|perdre": [
    {
      "who": "app",
      "fr": "Salut ! Perdras-tu ton chemin en ville ?",
      "en": "Hi! Will you lose your way in town?",
      "audio": "INT_perdre_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je perdrai mon chemin.",
      "en": "Yes, I'll lose my way.",
      "accept": [
        "Oui, je perdrai mon chemin.",
        "Je perdrai mon chemin.",
        "Oui, je perdrai mon chemin en ville."
      ]
    },
    {
      "who": "app",
      "fr": "Ah bon ? Mais ne perdras-tu pas espoir ?",
      "en": "Really? But you won't lose hope?",
      "audio": "INT_perdre_fut_w3"
    },
    {
      "who": "you",
      "fr": "Non, je ne perdrai pas espoir.",
      "en": "No, I won't lose hope.",
      "accept": [
        "Non, je ne perdrai pas espoir.",
        "Je ne perdrai pas espoir.",
        "Non, je ne perdrai pas l'espoir."
      ]
    }
  ],
  "Intermediate|Future|garder": [
    {
      "who": "app",
      "fr": "Bonjour ! Garderas-tu toutes tes notes ?",
      "en": "Hello! Will you keep all your notes?",
      "audio": "INT_garder_fut_w1"
    },
    {
      "who": "you",
      "fr": "Oui, je garderai toutes mes notes.",
      "en": "Yes, I'll keep all my notes.",
      "accept": [
        "Oui, je garderai toutes mes notes.",
        "Je garderai toutes mes notes.",
        "Oui, je les garderai toutes."
      ]
    },
    {
      "who": "app",
      "fr": "Et ta famille et toi, garderez-vous vos promesses ?",
      "en": "And will you and your family keep your promises?",
      "audio": "INT_garder_fut_w3"
    },
    {
      "who": "you",
      "fr": "Oui, nous garderons nos promesses.",
      "en": "Yes, we'll keep our promises.",
      "accept": [
        "Oui, nous garderons nos promesses.",
        "Nous garderons nos promesses.",
        "Oui, on gardera nos promesses."
      ]
    }
  ]
};
