import { GeneratedQuiz } from "./gemini-quiz";

// French verb conjugation data
const VERB_CONJUGATIONS = {
  être: {
    present: {
      je: "suis", tu: "es", il: "est", elle: "est", 
      nous: "sommes", vous: "êtes", ils: "sont", elles: "sont"
    },
    passé_composé: {
      je: "ai été", tu: "as été", il: "a été", elle: "a été",
      nous: "avons été", vous: "avez été", ils: "ont été", elles: "ont été"
    },
    passé_simple: {
      je: "fus", tu: "fus", il: "fut", elle: "fut",
      nous: "fûmes", vous: "fûtes", ils: "furent", elles: "furent"
    },
    imparfait: {
      je: "étais", tu: "étais", il: "était", elle: "était",
      nous: "étions", vous: "étiez", ils: "étaient", elles: "étaient"
    },
    plus_que_parfait: {
      je: "avais été", tu: "avais été", il: "avait été", elle: "avait été",
      nous: "avions été", vous: "aviez été", ils: "avaient été", elles: "avaient été"
    },
    conditionnel: {
      je: "serais", tu: "serais", il: "serait", elle: "serait",
      nous: "serions", vous: "seriez", ils: "seraient", elles: "seraient"
    },
    futur_simple: {
      je: "serai", tu: "seras", il: "sera", elle: "sera",
      nous: "serons", vous: "serez", ils: "seront", elles: "seront"
    },
    futur_proche: {
      je: "vais être", tu: "vas être", il: "va être", elle: "va être",
      nous: "allons être", vous: "allez être", ils: "vont être", elles: "vont être"
    },
    présent_progressif: {
      je: "suis en train d'être", tu: "es en train d'être", il: "est en train d'être", elle: "est en train d'être",
      nous: "sommes en train d'être", vous: "êtes en train d'être", ils: "sont en train d'être", elles: "sont en train d'être"
    }
  },
  avoir: {
    present: {
      je: "ai", tu: "as", il: "a", elle: "a",
      nous: "avons", vous: "avez", ils: "ont", elles: "ont"
    },
    passé_composé: {
      je: "ai eu", tu: "as eu", il: "a eu", elle: "a eu",
      nous: "avons eu", vous: "avez eu", ils: "ont eu", elles: "ont eu"
    },
    passé_simple: {
      je: "eus", tu: "eus", il: "eut", elle: "eut",
      nous: "eûmes", vous: "eûtes", ils: "eurent", elles: "eurent"
    },
    imparfait: {
      je: "avais", tu: "avais", il: "avait", elle: "avait",
      nous: "avions", vous: "aviez", ils: "avaient", elles: "avaient"
    },
    plus_que_parfait: {
      je: "avais eu", tu: "avais eu", il: "avait eu", elle: "avait eu",
      nous: "avions eu", vous: "aviez eu", ils: "avaient eu", elles: "avaient eu"
    },
    conditionnel: {
      je: "aurais", tu: "aurais", il: "aurait", elle: "aurait",
      nous: "aurions", vous: "auriez", ils: "auraient", elles: "auraient"
    },
    futur_simple: {
      je: "aurai", tu: "auras", il: "aura", elle: "aura",
      nous: "aurons", vous: "aurez", ils: "auront", elles: "auront"
    },
    futur_proche: {
      je: "vais avoir", tu: "vas avoir", il: "va avoir", elle: "va avoir",
      nous: "allons avoir", vous: "allez avoir", ils: "vont avoir", elles: "vont avoir"
    },
    présent_progressif: {
      je: "suis en train d'avoir", tu: "es en train d'avoir", il: "est en train d'avoir", elle: "est en train d'avoir",
      nous: "sommes en train d'avoir", vous: "êtes en train d'avoir", ils: "sont en train d'avoir", elles: "sont en train d'avoir"
    }
  },
  faire: {
    present: {
      je: "fais", tu: "fais", il: "fait", elle: "fait",
      nous: "faisons", vous: "faites", ils: "font", elles: "font"
    },
    passé_composé: {
      je: "ai fait", tu: "as fait", il: "a fait", elle: "a fait",
      nous: "avons fait", vous: "avez fait", ils: "ont fait", elles: "ont fait"
    },
    passé_simple: {
      je: "fis", tu: "fis", il: "fit", elle: "fit",
      nous: "fîmes", vous: "fîtes", ils: "firent", elles: "firent"
    },
    imparfait: {
      je: "faisais", tu: "faisais", il: "faisait", elle: "faisait",
      nous: "faisions", vous: "faisiez", ils: "faisaient", elles: "faisaient"
    },
    plus_que_parfait: {
      je: "avais fait", tu: "avais fait", il: "avait fait", elle: "avait fait",
      nous: "avions fait", vous: "aviez fait", ils: "avaient fait", elles: "avaient fait"
    },
    conditionnel: {
      je: "ferais", tu: "ferais", il: "ferait", elle: "ferait",
      nous: "ferions", vous: "feriez", ils: "feraient", elles: "feraient"
    },
    futur_simple: {
      je: "ferai", tu: "feras", il: "fera", elle: "fera",
      nous: "ferons", vous: "ferez", ils: "feront", elles: "feront"
    },
    futur_proche: {
      je: "vais faire", tu: "vas faire", il: "va faire", elle: "va faire",
      nous: "allons faire", vous: "allez faire", ils: "vont faire", elles: "vont faire"
    },
    présent_progressif: {
      je: "suis en train de faire", tu: "es en train de faire", il: "est en train de faire", elle: "est en train de faire",
      nous: "sommes en train de faire", vous: "êtes en train de faire", ils: "sont en train de faire", elles: "sont en train de faire"
    }
  },
  aller: {
    present: {
      je: "vais", tu: "vas", il: "va", elle: "va",
      nous: "allons", vous: "allez", ils: "vont", elles: "vont"
    },
    passé_composé: {
      je: "suis allé(e)", tu: "es allé(e)", il: "est allé", elle: "est allée",
      nous: "sommes allé(e)s", vous: "êtes allé(e)s", ils: "sont allés", elles: "sont allées"
    },
    passé_simple: {
      je: "allai", tu: "allas", il: "alla", elle: "alla",
      nous: "allâmes", vous: "allâtes", ils: "allèrent", elles: "allèrent"
    },
    imparfait: {
      je: "allais", tu: "allais", il: "allait", elle: "allait",
      nous: "allions", vous: "alliez", ils: "allaient", elles: "allaient"
    },
    plus_que_parfait: {
      je: "étais allé(e)", tu: "étais allé(e)", il: "était allé", elle: "était allée",
      nous: "étions allé(e)s", vous: "étiez allé(e)s", ils: "étaient allés", elles: "étaient allées"
    },
    conditionnel: {
      je: "irais", tu: "irais", il: "irait", elle: "irait",
      nous: "irions", vous: "iriez", ils: "iraient", elles: "iraient"
    },
    futur_simple: {
      je: "irai", tu: "iras", il: "ira", elle: "ira",
      nous: "irons", vous: "irez", ils: "iront", elles: "iront"
    },
    futur_proche: {
      je: "vais aller", tu: "vas aller", il: "va aller", elle: "va aller",
      nous: "allons aller", vous: "allez aller", ils: "vont aller", elles: "vont aller"
    },
    présent_progressif: {
      je: "suis en train d'aller", tu: "es en train d'aller", il: "est en train d'aller", elle: "est en train d'aller",
      nous: "sommes en train d'aller", vous: "êtes en train d'aller", ils: "sont en train d'aller", elles: "sont en train d'aller"
    }
  },
  voir: {
    present: {
      je: "vois", tu: "vois", il: "voit", elle: "voit",
      nous: "voyons", vous: "voyez", ils: "voient", elles: "voient"
    },
    passé_composé: {
      je: "ai vu", tu: "as vu", il: "a vu", elle: "a vu",
      nous: "avons vu", vous: "avez vu", ils: "ont vu", elles: "ont vu"
    },
    passé_simple: {
      je: "vis", tu: "vis", il: "vit", elle: "vit",
      nous: "vîmes", vous: "vîtes", ils: "virent", elles: "virent"
    },
    imparfait: {
      je: "voyais", tu: "voyais", il: "voyait", elle: "voyait",
      nous: "voyions", vous: "voyiez", ils: "voyaient", elles: "voyaient"
    },
    plus_que_parfait: {
      je: "avais vu", tu: "avais vu", il: "avait vu", elle: "avait vu",
      nous: "avions vu", vous: "aviez vu", ils: "avaient vu", elles: "avaient vu"
    },
    conditionnel: {
      je: "verrais", tu: "verrais", il: "verrait", elle: "verrait",
      nous: "verrions", vous: "verriez", ils: "verraient", elles: "verraient"
    },
    futur_simple: {
      je: "verrai", tu: "verras", il: "verra", elle: "verra",
      nous: "verrons", vous: "verrez", ils: "verront", elles: "verront"
    },
    futur_proche: {
      je: "vais voir", tu: "vas voir", il: "va voir", elle: "va voir",
      nous: "allons voir", vous: "allez voir", ils: "vont voir", elles: "vont voir"
    },
    présent_progressif: {
      je: "suis en train de voir", tu: "es en train de voir", il: "est en train de voir", elle: "est en train de voir",
      nous: "sommes en train de voir", vous: "êtes en train de voir", ils: "sont en train de voir", elles: "sont en train de voir"
    }
  },
  dire: {
    present: {
      je: "dis", tu: "dis", il: "dit", elle: "dit",
      nous: "disons", vous: "dites", ils: "disent", elles: "disent"
    },
    passé_composé: {
      je: "ai dit", tu: "as dit", il: "a dit", elle: "a dit",
      nous: "avons dit", vous: "avez dit", ils: "ont dit", elles: "ont dit"
    },
    passé_simple: {
      je: "dis", tu: "dis", il: "dit", elle: "dit",
      nous: "dîmes", vous: "dîtes", ils: "dirent", elles: "dirent"
    },
    imparfait: {
      je: "disais", tu: "disais", il: "disait", elle: "disait",
      nous: "disions", vous: "disiez", ils: "disaient", elles: "disaient"
    },
    plus_que_parfait: {
      je: "avais dit", tu: "avais dit", il: "avait dit", elle: "avait dit",
      nous: "avions dit", vous: "aviez dit", ils: "avaient dit", elles: "avaient dit"
    },
    conditionnel: {
      je: "dirais", tu: "dirais", il: "dirait", elle: "dirait",
      nous: "dirions", vous: "diriez", ils: "diraient", elles: "diraient"
    },
    futur_simple: {
      je: "dirai", tu: "diras", il: "dira", elle: "dira",
      nous: "dirons", vous: "direz", ils: "diront", elles: "diront"
    },
    futur_proche: {
      je: "vais dire", tu: "vas dire", il: "va dire", elle: "va dire",
      nous: "allons dire", vous: "allez dire", ils: "vont dire", elles: "vont dire"
    },
    présent_progressif: {
      je: "suis en train de dire", tu: "es en train de dire", il: "est en train de dire", elle: "est en train de dire",
      nous: "sommes en train de dire", vous: "êtes en train de dire", ils: "sont en train de dire", elles: "sont en train de dire"
    }
  },
  savoir: {
    present: {
      je: "sais", tu: "sais", il: "sait", elle: "sait",
      nous: "savons", vous: "savez", ils: "savent", elles: "savent"
    },
    passé_composé: {
      je: "ai su", tu: "as su", il: "a su", elle: "a su",
      nous: "avons su", vous: "avez su", ils: "ont su", elles: "ont su"
    },
    passé_simple: {
      je: "sus", tu: "sus", il: "sut", elle: "sut",
      nous: "sûmes", vous: "sûtes", ils: "surent", elles: "surent"
    },
    imparfait: {
      je: "savais", tu: "savais", il: "savait", elle: "savait",
      nous: "savions", vous: "saviez", ils: "savaient", elles: "savaient"
    },
    plus_que_parfait: {
      je: "avais su", tu: "avais su", il: "avait su", elle: "avait su",
      nous: "avions su", vous: "aviez su", ils: "avaient su", elles: "avaient su"
    },
    conditionnel: {
      je: "saurais", tu: "saurais", il: "saurait", elle: "saurait",
      nous: "saurions", vous: "sauriez", ils: "sauraient", elles: "sauraient"
    },
    futur_simple: {
      je: "saurai", tu: "sauras", il: "saura", elle: "saura",
      nous: "saurons", vous: "saurez", ils: "sauront", elles: "sauront"
    },
    futur_proche: {
      je: "vais savoir", tu: "vas savoir", il: "va savoir", elle: "va savoir",
      nous: "allons savoir", vous: "allez savoir", ils: "vont savoir", elles: "vont savoir"
    },
    présent_progressif: {
      je: "suis en train de savoir", tu: "es en train de savoir", il: "est en train de savoir", elle: "est en train de savoir",
      nous: "sommes en train de savoir", vous: "êtes en train de savoir", ils: "sont en train de savoir", elles: "sont en train de savoir"
    }
  },
  pouvoir: {
    present: {
      je: "peux", tu: "peux", il: "peut", elle: "peut",
      nous: "pouvons", vous: "pouvez", ils: "peuvent", elles: "peuvent"
    },
    passé_composé: {
      je: "ai pu", tu: "as pu", il: "a pu", elle: "a pu",
      nous: "avons pu", vous: "avez pu", ils: "ont pu", elles: "ont pu"
    },
    passé_simple: {
      je: "pus", tu: "pus", il: "put", elle: "put",
      nous: "pûmes", vous: "pûtes", ils: "purent", elles: "purent"
    },
    imparfait: {
      je: "pouvais", tu: "pouvais", il: "pouvait", elle: "pouvait",
      nous: "pouvions", vous: "pouviez", ils: "pouvaient", elles: "pouvaient"
    },
    plus_que_parfait: {
      je: "avais pu", tu: "avais pu", il: "avait pu", elle: "avait pu",
      nous: "avions pu", vous: "aviez pu", ils: "avaient pu", elles: "avaient pu"
    },
    conditionnel: {
      je: "pourrais", tu: "pourrais", il: "pourrait", elle: "pourrait",
      nous: "pourrions", vous: "pourriez", ils: "pourraient", elles: "pourraient"
    },
    futur_simple: {
      je: "pourrai", tu: "pourras", il: "pourra", elle: "pourra",
      nous: "pourrons", vous: "pourrez", ils: "pourront", elles: "pourront"
    },
    futur_proche: {
      je: "vais pouvoir", tu: "vas pouvoir", il: "va pouvoir", elle: "va pouvoir",
      nous: "allons pouvoir", vous: "allez pouvoir", ils: "vont pouvoir", elles: "vont pouvoir"
    },
    présent_progressif: {
      je: "suis en train de pouvoir", tu: "es en train de pouvoir", il: "est en train de pouvoir", elle: "est en train de pouvoir",
      nous: "sommes en train de pouvoir", vous: "êtes en train de pouvoir", ils: "sont en train de pouvoir", elles: "sont en train de pouvoir"
    }
  },
  vouloir: {
    present: {
      je: "veux", tu: "veux", il: "veut", elle: "veut",
      nous: "voulons", vous: "voulez", ils: "veulent", elles: "veulent"
    },
    passé_composé: {
      je: "ai voulu", tu: "as voulu", il: "a voulu", elle: "a voulu",
      nous: "avons voulu", vous: "avez voulu", ils: "ont voulu", elles: "ont voulu"
    },
    passé_simple: {
      je: "voulus", tu: "voulus", il: "voulut", elle: "voulut",
      nous: "voulûmes", vous: "voulûtes", ils: "voulurent", elles: "voulurent"
    },
    imparfait: {
      je: "voulais", tu: "voulais", il: "voulait", elle: "voulait",
      nous: "voulions", vous: "vouliez", ils: "voulaient", elles: "voulaient"
    },
    plus_que_parfait: {
      je: "avais voulu", tu: "avais voulu", il: "avait voulu", elle: "avait voulu",
      nous: "avions voulu", vous: "aviez voulu", ils: "avaient voulu", elles: "avaient voulu"
    },
    conditionnel: {
      je: "voudrais", tu: "voudrais", il: "voudrait", elle: "voudrait",
      nous: "voudrions", vous: "voudriez", ils: "voudraient", elles: "voudraient"
    },
    futur_simple: {
      je: "voudrai", tu: "voudras", il: "voudra", elle: "voudra",
      nous: "voudrons", vous: "voudrez", ils: "voudront", elles: "voudront"
    },
    futur_proche: {
      je: "vais vouloir", tu: "vas vouloir", il: "va vouloir", elle: "va vouloir",
      nous: "allons vouloir", vous: "allez vouloir", ils: "vont vouloir", elles: "vont vouloir"
    },
    présent_progressif: {
      je: "suis en train de vouloir", tu: "es en train de vouloir", il: "est en train de vouloir", elle: "est en train de vouloir",
      nous: "sommes en train de vouloir", vous: "êtes en train de vouloir", ils: "sont en train de vouloir", elles: "sont en train de vouloir"
    }
  },
  venir: {
    present: {
      je: "viens", tu: "viens", il: "vient", elle: "vient",
      nous: "venons", vous: "venez", ils: "viennent", elles: "viennent"
    },
    passé_composé: {
      je: "suis venu(e)", tu: "es venu(e)", il: "est venu", elle: "est venue",
      nous: "sommes venu(e)s", vous: "êtes venu(e)s", ils: "sont venus", elles: "sont venues"
    },
    passé_simple: {
      je: "vins", tu: "vins", il: "vint", elle: "vint",
      nous: "vînmes", vous: "vîntes", ils: "vinrent", elles: "vinrent"
    },
    imparfait: {
      je: "venais", tu: "venais", il: "venait", elle: "venait",
      nous: "venions", vous: "veniez", ils: "venaient", elles: "venaient"
    },
    plus_que_parfait: {
      je: "étais venu(e)", tu: "étais venu(e)", il: "était venu", elle: "était venue",
      nous: "étions venu(e)s", vous: "étiez venu(e)s", ils: "étaient venus", elles: "étaient venues"
    },
    conditionnel: {
      je: "viendrais", tu: "viendrais", il: "viendrait", elle: "viendrait",
      nous: "viendrions", vous: "viendriez", ils: "viendraient", elles: "viendraient"
    },
    futur_simple: {
      je: "viendrai", tu: "viendras", il: "viendra", elle: "viendra",
      nous: "viendrons", vous: "viendrez", ils: "viendront", elles: "viendront"
    },
    futur_proche: {
      je: "vais venir", tu: "vas venir", il: "va venir", elle: "va venir",
      nous: "allons venir", vous: "allez venir", ils: "vont venir", elles: "vont venir"
    },
    présent_progressif: {
      je: "suis en train de venir", tu: "es en train de venir", il: "est en train de venir", elle: "est en train de venir",
      nous: "sommes en train de venir", vous: "êtes en train de venir", ils: "sont en train de venir", elles: "sont en train de venir"
    }
  }
};

// Question templates with contexts
const QUESTION_CONTEXTS = {
  être: [
    { en: "I am happy.", fr_context: "heureux/heureuse", pronoun: "je" },
    { en: "You are tired.", fr_context: "fatigué(e)", pronoun: "tu" },
    { en: "He is a student.", fr_context: "étudiant", pronoun: "il" },
    { en: "She is a teacher.", fr_context: "professeure", pronoun: "elle" },
    { en: "We are friends.", fr_context: "amis", pronoun: "nous" },
    { en: "You (plural) are ready.", fr_context: "prêts", pronoun: "vous" },
    { en: "They are busy.", fr_context: "occupés", pronoun: "ils" },
    { en: "I am not here.", fr_context: "ici", negative: true, pronoun: "je" },
    { en: "She is not sick.", fr_context: "malade", negative: true, pronoun: "elle" },
    { en: "We are not late.", fr_context: "en retard", negative: true, pronoun: "nous" }
  ],
  avoir: [
    { en: "I have a car.", fr_context: "une voiture", pronoun: "je" },
    { en: "You have time.", fr_context: "du temps", pronoun: "tu" },
    { en: "He has money.", fr_context: "de l'argent", pronoun: "il" },
    { en: "She has a dog.", fr_context: "un chien", pronoun: "elle" },
    { en: "We have homework.", fr_context: "des devoirs", pronoun: "nous" },
    { en: "You (plural) have luck.", fr_context: "de la chance", pronoun: "vous" },
    { en: "They have problems.", fr_context: "des problèmes", pronoun: "ils" },
    { en: "I don't have anything.", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She has no choice.", fr_context: "pas le choix", negative: true, pronoun: "elle" },
    { en: "We don't have time.", fr_context: "pas le temps", negative: true, pronoun: "nous" }
  ],
  faire: [
    { en: "I do homework.", fr_context: "mes devoirs", pronoun: "je" },
    { en: "You make dinner.", fr_context: "le dîner", pronoun: "tu" },
    { en: "He does exercise.", fr_context: "du sport", pronoun: "il" },
    { en: "She makes a cake.", fr_context: "un gâteau", pronoun: "elle" },
    { en: "We do shopping.", fr_context: "les courses", pronoun: "nous" },
    { en: "You (plural) make music.", fr_context: "de la musique", pronoun: "vous" },
    { en: "They do work.", fr_context: "du travail", pronoun: "ils" },
    { en: "I don't do anything.", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She doesn't make mistakes.", fr_context: "pas d'erreurs", negative: true, pronoun: "elle" },
    { en: "We don't do that.", fr_context: "pas ça", negative: true, pronoun: "nous" }
  ],
  voir: [
    { en: "I see the problem.", fr_context: "le problème", pronoun: "je" },
    { en: "You see the movie.", fr_context: "le film", pronoun: "tu" },
    { en: "He sees his friend.", fr_context: "son ami", pronoun: "il" },
    { en: "She sees the cat.", fr_context: "le chat", pronoun: "elle" },
    { en: "We see the truth.", fr_context: "la vérité", pronoun: "nous" },
    { en: "You (plural) see the light.", fr_context: "la lumière", pronoun: "vous" },
    { en: "They see the ocean.", fr_context: "l'océan", pronoun: "ils" },
    { en: "I don't see anything.", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She doesn't see well.", fr_context: "bien", negative: true, pronoun: "elle" },
    { en: "We don't see him.", fr_context: "le", negative: true, pronoun: "nous" }
  ],
  dire: [
    { en: "I say hello.", fr_context: "bonjour", pronoun: "je" },
    { en: "You say the truth.", fr_context: "la vérité", pronoun: "tu" },
    { en: "He says yes.", fr_context: "oui", pronoun: "il" },
    { en: "She says no.", fr_context: "non", pronoun: "elle" },
    { en: "We say goodbye.", fr_context: "au revoir", pronoun: "nous" },
    { en: "You (plural) say thanks.", fr_context: "merci", pronoun: "vous" },
    { en: "They say nothing.", fr_context: "rien", pronoun: "ils" },
    { en: "I don't say anything.", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She doesn't say that.", fr_context: "pas ça", negative: true, pronoun: "elle" },
    { en: "We don't say bad words.", fr_context: "pas de gros mots", negative: true, pronoun: "nous" }
  ],
  savoir: [
    { en: "I know the answer.", fr_context: "la réponse", pronoun: "je" },
    { en: "You know French.", fr_context: "le français", pronoun: "tu" },
    { en: "He knows the way.", fr_context: "le chemin", pronoun: "il" },
    { en: "She knows the secret.", fr_context: "le secret", pronoun: "elle" },
    { en: "We know the truth.", fr_context: "la vérité", pronoun: "nous" },
    { en: "You (plural) know music.", fr_context: "la musique", pronoun: "vous" },
    { en: "They know everything.", fr_context: "tout", pronoun: "ils" },
    { en: "I don't know anything.", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She doesn't know him.", fr_context: "le", negative: true, pronoun: "elle" },
    { en: "We don't know where.", fr_context: "pas où", negative: true, pronoun: "nous" }
  ],
  pouvoir: [
    { en: "I can swim.", fr_context: "nager", pronoun: "je" },
    { en: "You can dance.", fr_context: "danser", pronoun: "tu" },
    { en: "He can run.", fr_context: "courir", pronoun: "il" },
    { en: "She can sing.", fr_context: "chanter", pronoun: "elle" },
    { en: "We can help.", fr_context: "aider", pronoun: "nous" },
    { en: "You (plural) can come.", fr_context: "venir", pronoun: "vous" },
    { en: "They can work.", fr_context: "travailler", pronoun: "ils" },
    { en: "I can't sleep.", fr_context: "pas dormir", negative: true, pronoun: "je" },
    { en: "She can't come.", fr_context: "pas venir", negative: true, pronoun: "elle" },
    { en: "We can't wait.", fr_context: "pas attendre", negative: true, pronoun: "nous" }
  ],
  vouloir: [
    { en: "I want coffee.", fr_context: "du café", pronoun: "je" },
    { en: "You want to go.", fr_context: "partir", pronoun: "tu" },
    { en: "He wants money.", fr_context: "de l'argent", pronoun: "il" },
    { en: "She wants to learn.", fr_context: "apprendre", pronoun: "elle" },
    { en: "We want peace.", fr_context: "la paix", pronoun: "nous" },
    { en: "You (plural) want to eat.", fr_context: "manger", pronoun: "vous" },
    { en: "They want freedom.", fr_context: "la liberté", pronoun: "ils" },
    { en: "I don't want anything.", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She doesn't want to go.", fr_context: "pas partir", negative: true, pronoun: "elle" },
    { en: "We don't want problems.", fr_context: "pas de problèmes", negative: true, pronoun: "nous" }
  ],
  venir: [
    { en: "I come home.", fr_context: "à la maison", pronoun: "je" },
    { en: "You come early.", fr_context: "tôt", pronoun: "tu" },
    { en: "He comes here.", fr_context: "ici", pronoun: "il" },
    { en: "She comes tomorrow.", fr_context: "demain", pronoun: "elle" },
    { en: "We come together.", fr_context: "ensemble", pronoun: "nous" },
    { en: "You (plural) come often.", fr_context: "souvent", pronoun: "vous" },
    { en: "They come late.", fr_context: "en retard", pronoun: "ils" },
    { en: "I don't come often.", fr_context: "pas souvent", negative: true, pronoun: "je" },
    { en: "She doesn't come today.", fr_context: "pas aujourd'hui", negative: true, pronoun: "elle" },
    { en: "We don't come here.", fr_context: "pas ici", negative: true, pronoun: "nous" }
  ]
};

// Generate wrong answers maintaining proper pronoun-verb agreement
function generateDistractors(correctForm: string, verb: string, tense: string, pronoun: string): string[] {
  const distractors: string[] = [];
  const verbData = VERB_CONJUGATIONS[verb as keyof typeof VERB_CONJUGATIONS];
  
  if (!verbData) return ["incorrect1", "incorrect2", "incorrect3"];
  
  // Wrong tenses for same pronoun (maintains proper pronoun agreement)
  Object.entries(verbData).forEach(([t, conjugations]) => {
    if (t !== tense) {
      const wrongForm = (conjugations as any)[pronoun];
      if (wrongForm && wrongForm !== correctForm) {
        distractors.push(wrongForm);
      }
    }
  });
  
  // If we need more distractors, add slightly modified forms of the correct form
  if (distractors.length < 3) {
    // Add common conjugation mistakes for the same pronoun
    const currentTense = verbData[tense as keyof typeof verbData] as any;
    if (currentTense) {
      // For 'je', add common mistakes like using 'tu' form but keeping 'je'
      if (pronoun === 'je') {
        const tuForm = currentTense['tu'];
        if (tuForm && tuForm !== correctForm) {
          distractors.push(tuForm);
        }
      }
      // For other pronouns, add slight variations
      Object.entries(currentTense).forEach(([p, form]) => {
        if (p !== pronoun && form !== correctForm && distractors.length < 3) {
          // Only add if it creates a plausible mistake
          if (!distractors.includes(form as string)) {
            distractors.push(form as string);
          }
        }
      });
    }
  }
  
  // Ensure we have exactly 3 distractors
  while (distractors.length < 3) {
    distractors.push(`${correctForm.replace(/[aeiou]$/, 'x')}`); // Simple modification
  }
  
  // Shuffle and take first 3
  return distractors.sort(() => Math.random() - 0.5).slice(0, 3);
}

// Helper function to apply French contractions
function applyContractions(pronoun: string, conjugation: string): string {
  const pronounCap = pronoun.charAt(0).toUpperCase() + pronoun.slice(1);
  
  // Handle contractions for je + vowel sounds
  if (pronoun === 'je' && /^[aeiouâêîôû]/.test(conjugation)) {
    return `J'${conjugation}`;
  }
  
  return `${pronounCap} ${conjugation}`;
}

// Helper function to apply contractions for negative forms
function applyNegativeContractions(pronoun: string, conjugation: string): string {
  const pronounCap = pronoun.charAt(0).toUpperCase() + pronoun.slice(1);
  
  // Handle contractions for ne + vowel sounds (ne + est = n'est)
  if (/^[aeiouâêîôû]/.test(conjugation)) {
    return `${pronounCap} n'${conjugation}`;
  }
  
  return `${pronounCap} ne ${conjugation}`;
}

// Comprehensive function to build negative French sentences for all tenses
function buildNegativeFrench(pronoun: string, conjugation: string, context: string, tense: string, verb: string): string {
  const pronounCap = pronoun.charAt(0).toUpperCase() + pronoun.slice(1);
  
  // Handle compound tenses (passé_composé, plus_que_parfait) where negation surrounds auxiliary
  if (tense === 'passé_composé' || tense === 'plus_que_parfait') {
    const parts = conjugation.split(' ');
    if (parts.length >= 2) {
      const auxiliary = parts[0]; // être/avoir
      const participle = parts.slice(1).join(' '); // past participle
      
      // Apply contraction to auxiliary
      let negatedAux;
      if (/^[aeiouâêîôû]/.test(auxiliary)) {
        negatedAux = `n'${auxiliary} pas`;
      } else {
        negatedAux = `ne ${auxiliary} pas`;
      }
      
      if (context === 'rien') {
        // Special case: "rien" replaces "pas" in compound tenses
        negatedAux = negatedAux.replace(' pas', '');
        return `${pronounCap} ${negatedAux} ${context} ${participle}`;
      } else if (context && (context === 'pas' || context.startsWith('pas '))) {
        // If context already contains "pas", don't duplicate
        negatedAux = negatedAux.replace(' pas', '');
        return `${pronounCap} ${negatedAux} ${context} ${participle}`;
      } else {
        return `${pronounCap} ${negatedAux} ${participle}${context ? ` ${context}` : ''}`;
      }
    }
  }
  
  // Handle futur_proche where negation surrounds aller (Je ne vais pas dire)
  if (tense === 'futur_proche') {
    const parts = conjugation.split(' ');
    if (parts.length >= 2) {
      const allerForm = parts[0]; // vais/vas/va/etc.
      const infinitive = parts.slice(1).join(' '); // infinitive verb
      
      // Apply contraction to aller form
      let negatedAller;
      if (/^[aeiouâêîôû]/.test(allerForm)) {
        negatedAller = `n'${allerForm} pas`;
      } else {
        negatedAller = `ne ${allerForm} pas`;
      }
      
      if (context === 'rien') {
        // Special case: "rien" replaces "pas"
        negatedAller = negatedAller.replace(' pas', '');
        return `${pronounCap} ${negatedAller} ${infinitive} ${context}`;
      } else if (context && (context === 'pas' || context.startsWith('pas '))) {
        // If context already contains "pas", don't duplicate
        negatedAller = negatedAller.replace(' pas', '');
        return `${pronounCap} ${negatedAller} ${infinitive} ${context}`;
      } else {
        return `${pronounCap} ${negatedAller} ${infinitive}${context ? ` ${context}` : ''}`;
      }
    }
  }
  
  // Handle présent_progressif where negation surrounds être (Je ne suis pas en train de dire)
  if (tense === 'présent_progressif') {
    const parts = conjugation.split(' ');
    if (parts.length >= 4) { // "suis en train de faire"
      const etreForm = parts[0]; // suis/es/est/etc.
      const enTrainDePart = parts.slice(1).join(' '); // "en train de + infinitive"
      
      // Apply contraction to être form
      let negatedEtre;
      if (/^[aeiouâêîôû]/.test(etreForm)) {
        negatedEtre = `n'${etreForm} pas`;
      } else {
        negatedEtre = `ne ${etreForm} pas`;
      }
      
      if (context === 'rien') {
        // Special case: "rien" replaces "pas"
        negatedEtre = negatedEtre.replace(' pas', '');
        return `${pronounCap} ${negatedEtre} ${enTrainDePart} ${context}`;
      } else if (context && (context === 'pas' || context.startsWith('pas '))) {
        // If context already contains "pas", don't duplicate
        negatedEtre = negatedEtre.replace(' pas', '');
        return `${pronounCap} ${negatedEtre} ${enTrainDePart} ${context}`;
      } else {
        return `${pronounCap} ${negatedEtre} ${enTrainDePart}${context ? ` ${context}` : ''}`;
      }
    }
  }
  
  // Handle simple tenses (présent, imparfait, futur_simple, conditionnel, passé_simple)
  if (context === 'rien') {
    // Special case: "rien" replaces "pas"
    if (/^[aeiouâêîôû]/.test(conjugation)) {
      return `${pronounCap} n'${conjugation} ${context}`;
    } else {
      return `${pronounCap} ne ${conjugation} ${context}`;
    }
  } else if (context && (context === 'pas' || context.startsWith('pas '))) {
    // If context already contains "pas", don't add another "pas"
    if (/^[aeiouâêîôû]/.test(conjugation)) {
      return `${pronounCap} n'${conjugation} ${context}`;
    } else {
      return `${pronounCap} ne ${conjugation} ${context}`;
    }
  } else {
    // Standard negation: ne + verb + pas + context
    if (/^[aeiouâêîôû]/.test(conjugation)) {
      return `${pronounCap} n'${conjugation} pas${context ? ` ${context}` : ''}`;
    } else {
      return `${pronounCap} ne ${conjugation} pas${context ? ` ${context}` : ''}`;
    }
  }
}

// Helper function to get English conjugation for Beginner mode
function getEnglishConjugation(pronoun: string, verb: string, tense: string): string {
  const englishPronouns = {
    'je': 'I', 'tu': 'You (informal)', 'il': 'He', 'elle': 'She',
    'nous': 'We', 'vous': 'You (formal/plural)', 'ils': 'They (masculine)', 'elles': 'They (feminine)'
  };
  
  const englishVerbs = {
    'être': { present: 'am', passé_simple: 'was', futur_simple: 'will be' },
    'avoir': { present: 'have', passé_simple: 'had', futur_simple: 'will have' },
    'faire': { present: 'do/make', passé_simple: 'did/made', futur_simple: 'will do/make' },
    'dire': { present: 'say', passé_simple: 'said', futur_simple: 'will say' },
    'aller': { present: 'go', passé_simple: 'went', futur_simple: 'will go' },
    'voir': { present: 'see', passé_simple: 'saw', futur_simple: 'will see' },
    'savoir': { present: 'know', passé_simple: 'knew', futur_simple: 'will know' },
    'pouvoir': { present: 'can', passé_simple: 'could', futur_simple: 'will be able to' },
    'vouloir': { present: 'want', passé_simple: 'wanted', futur_simple: 'will want' },
    'venir': { present: 'come', passé_simple: 'came', futur_simple: 'will come' }
  };
  
  const englishPronoun = englishPronouns[pronoun as keyof typeof englishPronouns] || pronoun;
  const verbData = englishVerbs[verb as keyof typeof englishVerbs];
  
  if (!verbData) return `${englishPronoun} ${verb}`;
  
  // Special handling for "être" with different pronouns
  if (verb === 'être') {
    if (tense === 'present') {
      if (pronoun === 'je') return 'I am';
      if (pronoun === 'tu' || pronoun === 'vous') return `${englishPronoun} are`;
      return `${englishPronoun} is`;
    }
    if (tense === 'passé_simple') {
      if (pronoun === 'je' || pronoun === 'il' || pronoun === 'elle') return `${englishPronoun} was`;
      return `${englishPronoun} were`;
    }
  }
  
  // Special handling for "avoir" with different pronouns  
  if (verb === 'avoir') {
    if (tense === 'present') {
      if (pronoun === 'il' || pronoun === 'elle') return `${englishPronoun} has`;
      return `${englishPronoun} have`;
    }
  }
  
  // Special handling for present tense third-person singular (adds 's')
  if (tense === 'present') {
    const baseVerb = verbData[tense as keyof typeof verbData] || verbData.present;
    if (pronoun === 'il' || pronoun === 'elle') {
      // Add 's' for third person singular in present tense
      if (verb === 'dire') return `${englishPronoun} says`;
      if (verb === 'faire') return `${englishPronoun} does/makes`;
      if (verb === 'aller') return `${englishPronoun} goes`;
      if (verb === 'voir') return `${englishPronoun} sees`;
      if (verb === 'savoir') return `${englishPronoun} knows`;
      if (verb === 'pouvoir') return `${englishPronoun} can`;
      if (verb === 'vouloir') return `${englishPronoun} wants`;
      if (verb === 'venir') return `${englishPronoun} comes`;
    }
  }
  
  const englishVerb = verbData[tense as keyof typeof verbData] || verbData.present;
  return `${englishPronoun} ${englishVerb}`;
}

export function generateInternalQuiz(verb: string, tense: string, difficulty?: string): GeneratedQuiz {
  console.log(`🔧 Generating internal quiz for ${verb} - ${tense}`);
  
  // Normalize tense names - map frontend tense names to backend tense keys
  const normalizedTense = tense.toLowerCase()
    .replace('présent progressif', 'présent_progressif')
    .replace('présent', 'present')
    .replace('passé composé', 'passé_composé')
    .replace('passé simple', 'passé_simple')
    .replace('plus-que-parfait', 'plus_que_parfait')
    .replace('imparfait', 'imparfait')
    .replace('conditionnel', 'conditionnel')
    .replace('futur simple', 'futur_simple')
    .replace('futur proche', 'futur_proche')
    .replace(/\s+/g, '_');
  
  console.log(`🔧 Tense normalization: "${tense}" → "${normalizedTense}"`);
  
  const verbData = VERB_CONJUGATIONS[verb as keyof typeof VERB_CONJUGATIONS];
  const contexts = QUESTION_CONTEXTS[verb as keyof typeof QUESTION_CONTEXTS] || [];
  
  console.log(`🔧 Available verbs: ${Object.keys(VERB_CONJUGATIONS)}`);
  console.log(`🔧 Available tenses for ${verb}: ${verbData ? Object.keys(verbData) : 'none'}`);
  
  if (!verbData || !contexts.length) {
    throw new Error(`No internal data available for ${verb} - ${tense}`);
  }
  
  const tenseData = verbData[normalizedTense as keyof typeof verbData] as any;
  if (!tenseData) {
    console.log(`🔧 Tense lookup failed: "${normalizedTense}" not found in ${JSON.stringify(Object.keys(verbData))}`);
    throw new Error(`Tense ${normalizedTense} not available for ${verb}`);
  }
  
  const questions = [];
  const pronouns = ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles'];
  
  // Handle Beginner mode - simple subject + verb only
  if (difficulty === 'Beginner') {
    console.log('🔧 Generating Beginner mode quiz (simple subject + verb)');
    
    for (let i = 0; i < 20; i++) {
      const pronoun = pronouns[i % pronouns.length];
      const pronounCap = pronoun.charAt(0).toUpperCase() + pronoun.slice(1);
      const conjugation = tenseData[pronoun];
      
      if (!conjugation) continue;
      
      // Simple question: just "I am" -> "Je suis"
      const englishConjugation = getEnglishConjugation(pronoun, verb, normalizedTense);
      
      // Create wrong answer options with other pronouns
      const wrongAnswers = pronouns
        .filter(p => p !== pronoun)
        .slice(0, 3)
        .map(wrongPronoun => {
          const wrongConjugation = tenseData[wrongPronoun];
          const wrongPronounCap = wrongPronoun.charAt(0).toUpperCase() + wrongPronoun.slice(1);
          return `${wrongPronounCap} ${wrongConjugation}`;
        });
      
      const correctAnswer = `${pronounCap} ${conjugation}`;
      
      // Shuffle answers
      const allAnswers = [correctAnswer, ...wrongAnswers];
      const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
      
      questions.push({
        question: englishConjugation, // No full stop for Beginner mode
        hint: `Think about the correct conjugation of "${verb}" for "${pronoun}"`,
        answerOptions: shuffledAnswers.map(answer => ({
          text: answer,
          isCorrect: answer === correctAnswer,
          rationale: answer === correctAnswer 
            ? `Correct! "${pronoun}" takes the conjugation "${conjugation}"`
            : `Incorrect. The correct answer is "${correctAnswer}"`
        }))
      });
    }
    
    return { questions };
  }
  
  // Generate 20 questions by cycling through contexts and pronouns
  for (let i = 0; i < 20; i++) {
    const context = contexts[i % contexts.length];
    
    // Use specified pronoun from context, or cycle through pronouns
    const pronoun = (context as any).pronoun || pronouns[i % pronouns.length];
    const correctForm = tenseData[pronoun];
    
    if (!correctForm) continue;
    
    // Build correct answer with proper French contractions
    let correctAnswer;
    
    if (context.negative) {
      // Handle negation properly for ALL tenses
      correctAnswer = buildNegativeFrench(pronoun, correctForm, context.fr_context, normalizedTense, verb);
    } else {
      correctAnswer = applyContractions(pronoun, correctForm);
      if (context.fr_context) {
        correctAnswer += ` ${context.fr_context}`;
      }
    }
    
    // Generate distractors with proper French grammar
    const wrongAnswers = [];
    
    // Generate distractors using correct pronoun but wrong conjugations
    const distractors = generateDistractors(correctForm, verb, normalizedTense, pronoun);
    distractors.slice(0, 3).forEach(form => {
      let wrong;
      
      if (context.negative) {
        // Use the same comprehensive negation logic for distractors
        wrong = buildNegativeFrench(pronoun, form, context.fr_context, normalizedTense, verb);
      } else {
        // Apply contractions to wrong answers too for consistency
        wrong = applyContractions(pronoun, form);
        if (context.fr_context) {
          wrong += ` ${context.fr_context}`;
        }
      }
      wrongAnswers.push(wrong);
    });
    
    // Ensure we have exactly 4 options
    while (wrongAnswers.length < 3) {
      wrongAnswers.push(`${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} [incorrect]`);
    }
    
    const allAnswers = [
      { text: correctAnswer, rationale: `Correct conjugation of ${verb} for ${pronoun} in ${tense}.`, isCorrect: true },
      { text: wrongAnswers[0], rationale: `Incorrect conjugation for ${pronoun}.`, isCorrect: false },
      { text: wrongAnswers[1], rationale: `Wrong tense or wrong pronoun conjugation.`, isCorrect: false },
      { text: wrongAnswers[2], rationale: `This uses an incorrect form of ${verb}.`, isCorrect: false }
    ];
    
    // Shuffle answers
    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
    
    // Convert English to proper tense based on French tense
    let englishQuestion = context.en;
    
    if (normalizedTense === 'passé_composé') {
      // Passé composé = completed action ("I ate" / "I have eaten")
      englishQuestion = englishQuestion
        .replace(/I have/g, 'I had')
        .replace(/You have/g, 'You had') 
        .replace(/He has/g, 'He had')
        .replace(/She has/g, 'She had')
        .replace(/We have/g, 'We had')
        .replace(/You \(plural\) have/g, 'You (plural) had')
        .replace(/They have/g, 'They had')
        .replace(/I am/g, 'I was')
        .replace(/You are/g, 'You were')
        .replace(/He is/g, 'He was')
        .replace(/She is/g, 'She was')
        .replace(/We are/g, 'We were')
        .replace(/You \(plural\) are/g, 'You (plural) were')
        .replace(/They are/g, 'They were')
        .replace(/I do/g, 'I did')
        .replace(/You do/g, 'You did')
        .replace(/He does/g, 'He did')
        .replace(/She does/g, 'She did')
        .replace(/We do/g, 'We did')
        .replace(/You \(plural\) do/g, 'You (plural) did')
        .replace(/They do/g, 'They did')
        .replace(/I make/g, 'I made')
        .replace(/You make/g, 'You made')
        .replace(/He makes/g, 'He made')
        .replace(/She makes/g, 'She made')
        .replace(/We make/g, 'We made')
        .replace(/You \(plural\) make/g, 'You (plural) made')
        .replace(/They make/g, 'They made')
        .replace(/I go/g, 'I went')
        .replace(/You go/g, 'You went')
        .replace(/He goes/g, 'He went')
        .replace(/She goes/g, 'She went')
        .replace(/We go/g, 'We went')
        .replace(/You \(plural\) go/g, 'You (plural) went')
        .replace(/They go/g, 'They went')
        .replace(/I see/g, 'I saw')
        .replace(/You see/g, 'You saw')
        .replace(/He sees/g, 'He saw')
        .replace(/She sees/g, 'She saw')
        .replace(/We see/g, 'We saw')
        .replace(/You \(plural\) see/g, 'You (plural) saw')
        .replace(/They see/g, 'They saw')
        .replace(/I say/g, 'I said')
        .replace(/You say/g, 'You said')
        .replace(/He says/g, 'He said')
        .replace(/She says/g, 'She said')
        .replace(/We say/g, 'We said')
        .replace(/You \(plural\) say/g, 'You (plural) said')
        .replace(/They say/g, 'They said')
        .replace(/I know/g, 'I knew')
        .replace(/You know/g, 'You knew')
        .replace(/He knows/g, 'He knew')
        .replace(/She knows/g, 'She knew')
        .replace(/We know/g, 'We knew')
        .replace(/You \(plural\) know/g, 'You (plural) knew')
        .replace(/They know/g, 'They knew')
        .replace(/I can/g, 'I could')
        .replace(/You can/g, 'You could')
        .replace(/He can/g, 'He could')
        .replace(/She can/g, 'She could')
        .replace(/We can/g, 'We could')
        .replace(/You \(plural\) can/g, 'You (plural) could')
        .replace(/They can/g, 'They could')
        .replace(/I want/g, 'I wanted')
        .replace(/You want/g, 'You wanted')
        .replace(/He wants/g, 'He wanted')
        .replace(/She wants/g, 'She wanted')
        .replace(/We want/g, 'We wanted')
        .replace(/You \(plural\) want/g, 'You (plural) wanted')
        .replace(/They want/g, 'They wanted')
        .replace(/I come/g, 'I came')
        .replace(/You come/g, 'You came')
        .replace(/He comes/g, 'He came')
        .replace(/She comes/g, 'She came')
        .replace(/We come/g, 'We came')
        .replace(/You \(plural\) come/g, 'You (plural) came')
        .replace(/They come/g, 'They came')
        // Handle negative forms for passé composé
        .replace(/I don't have/g, 'I didn\'t have')
        .replace(/You don't have/g, 'You didn\'t have')
        .replace(/He doesn't have/g, 'He didn\'t have')
        .replace(/She doesn't have/g, 'She didn\'t have')
        .replace(/We don't have/g, 'We didn\'t have')
        .replace(/You \(plural\) don't have/g, 'You (plural) didn\'t have')
        .replace(/They don't have/g, 'They didn\'t have')
        .replace(/I don't/g, 'I didn\'t')
        .replace(/You don't/g, 'You didn\'t')
        .replace(/He doesn't/g, 'He didn\'t')
        .replace(/She doesn't/g, 'She didn\'t')
        .replace(/We don't/g, 'We didn\'t')
        .replace(/You \(plural\) don't/g, 'You (plural) didn\'t')
        .replace(/They don't/g, 'They didn\'t')
        .replace(/can't/g, 'couldn\'t');
    } else if (normalizedTense === 'imparfait') {
      // Imparfait = ongoing/habitual past action ("I used to eat" / "I was eating")
      englishQuestion = englishQuestion
        .replace(/I have/g, 'I used to have')
        .replace(/You have/g, 'You used to have')
        .replace(/He has/g, 'He used to have')
        .replace(/She has/g, 'She used to have')
        .replace(/We have/g, 'We used to have')
        .replace(/You \(plural\) have/g, 'You (plural) used to have')
        .replace(/They have/g, 'They used to have')
        .replace(/I am/g, 'I was')
        .replace(/You are/g, 'You were')
        .replace(/He is/g, 'He was')
        .replace(/She is/g, 'She was')
        .replace(/We are/g, 'We were')
        .replace(/You \(plural\) are/g, 'You (plural) were')
        .replace(/They are/g, 'They were')
        .replace(/I do/g, 'I used to do')
        .replace(/You do/g, 'You used to do')
        .replace(/He does/g, 'He used to do')
        .replace(/She does/g, 'She used to do')
        .replace(/We do/g, 'We used to do')
        .replace(/You \(plural\) do/g, 'You (plural) used to do')
        .replace(/They do/g, 'They used to do')
        .replace(/I make/g, 'I used to make')
        .replace(/You make/g, 'You used to make')
        .replace(/He makes/g, 'He used to make')
        .replace(/She makes/g, 'She used to make')
        .replace(/We make/g, 'We used to make')
        .replace(/You \(plural\) make/g, 'You (plural) used to make')
        .replace(/They make/g, 'They used to make')
        .replace(/I go/g, 'I used to go')
        .replace(/You go/g, 'You used to go')
        .replace(/He goes/g, 'He used to go')
        .replace(/She goes/g, 'She used to go')
        .replace(/We go/g, 'We used to go')
        .replace(/You \(plural\) go/g, 'You (plural) used to go')
        .replace(/They go/g, 'They used to go')
        .replace(/I see/g, 'I used to see')
        .replace(/You see/g, 'You used to see')
        .replace(/He sees/g, 'He used to see')
        .replace(/She sees/g, 'She used to see')
        .replace(/We see/g, 'We used to see')
        .replace(/You \(plural\) see/g, 'You (plural) used to see')
        .replace(/They see/g, 'They used to see')
        .replace(/I say/g, 'I used to say')
        .replace(/You say/g, 'You used to say')
        .replace(/He says/g, 'He used to say')
        .replace(/She says/g, 'She used to say')
        .replace(/We say/g, 'We used to say')
        .replace(/You \(plural\) say/g, 'You (plural) used to say')
        .replace(/They say/g, 'They used to say')
        .replace(/I know/g, 'I used to know')
        .replace(/You know/g, 'You used to know')
        .replace(/He knows/g, 'He used to know')
        .replace(/She knows/g, 'She used to know')
        .replace(/We know/g, 'We used to know')
        .replace(/You \(plural\) know/g, 'You (plural) used to know')
        .replace(/They know/g, 'They used to know')
        .replace(/I can/g, 'I could')
        .replace(/You can/g, 'You could')
        .replace(/He can/g, 'He could')
        .replace(/She can/g, 'She could')
        .replace(/We can/g, 'We could')
        .replace(/You \(plural\) can/g, 'You (plural) could')
        .replace(/They can/g, 'They could')
        .replace(/I want/g, 'I used to want')
        .replace(/You want/g, 'You used to want')
        .replace(/He wants/g, 'He used to want')
        .replace(/She wants/g, 'She used to want')
        .replace(/We want/g, 'We used to want')
        .replace(/You \(plural\) want/g, 'You (plural) used to want')
        .replace(/They want/g, 'They used to want')
        .replace(/I come/g, 'I used to come')
        .replace(/You come/g, 'You used to come')
        .replace(/He comes/g, 'He used to come')
        .replace(/She comes/g, 'She used to come')
        .replace(/We come/g, 'We used to come')
        .replace(/You \(plural\) come/g, 'You (plural) used to come')
        .replace(/They come/g, 'They used to come')
        // Handle negative forms for imparfait
        .replace(/I don't have/g, 'I didn\'t use to have')
        .replace(/You don't have/g, 'You didn\'t use to have')
        .replace(/He doesn't have/g, 'He didn\'t use to have')
        .replace(/She doesn't have/g, 'She didn\'t use to have')
        .replace(/We don't have/g, 'We didn\'t use to have')
        .replace(/You \(plural\) don't have/g, 'You (plural) didn\'t use to have')
        .replace(/They don't have/g, 'They didn\'t use to have')
        .replace(/I don't/g, 'I didn\'t use to')
        .replace(/You don't/g, 'You didn\'t use to')
        .replace(/He doesn't/g, 'He didn\'t use to')
        .replace(/She doesn't/g, 'She didn\'t use to')
        .replace(/We don't/g, 'We didn\'t use to')
        .replace(/You \(plural\) don't/g, 'You (plural) didn\'t use to')
        .replace(/They don't/g, 'They didn\'t use to')
        .replace(/can't/g, 'couldn\'t');
    } else if (normalizedTense === 'plus_que_parfait') {
      // Plus-que-parfait = past perfect ("I had eaten")
      englishQuestion = englishQuestion
        .replace(/I have/g, 'I had had')
        .replace(/You have/g, 'You had had')
        .replace(/He has/g, 'He had had')
        .replace(/She has/g, 'She had had')
        .replace(/We have/g, 'We had had')
        .replace(/You \(plural\) have/g, 'You (plural) had had')
        .replace(/They have/g, 'They had had')
        .replace(/I am/g, 'I had been')
        .replace(/You are/g, 'You had been')
        .replace(/He is/g, 'He had been')
        .replace(/She is/g, 'She had been')
        .replace(/We are/g, 'We had been')
        .replace(/You \(plural\) are/g, 'You (plural) had been')
        .replace(/They are/g, 'They had been')
        .replace(/I do/g, 'I had done')
        .replace(/You do/g, 'You had done')
        .replace(/He does/g, 'He had done')
        .replace(/She does/g, 'She had done')
        .replace(/We do/g, 'We had done')
        .replace(/You \(plural\) do/g, 'You (plural) had done')
        .replace(/They do/g, 'They had done')
        .replace(/I make/g, 'I had made')
        .replace(/You make/g, 'You had made')
        .replace(/He makes/g, 'He had made')
        .replace(/She makes/g, 'She had made')
        .replace(/We make/g, 'We had made')
        .replace(/You \(plural\) make/g, 'You (plural) had made')
        .replace(/They make/g, 'They had made')
        .replace(/I go/g, 'I had gone')
        .replace(/You go/g, 'You had gone')
        .replace(/He goes/g, 'He had gone')
        .replace(/She goes/g, 'She had gone')
        .replace(/We go/g, 'We had gone')
        .replace(/You \(plural\) go/g, 'You (plural) had gone')
        .replace(/They go/g, 'They had gone')
        .replace(/I see/g, 'I had seen')
        .replace(/You see/g, 'You had seen')
        .replace(/He sees/g, 'He had seen')
        .replace(/She sees/g, 'She had seen')
        .replace(/We see/g, 'We had seen')
        .replace(/You \(plural\) see/g, 'You (plural) had seen')
        .replace(/They see/g, 'They had seen')
        .replace(/I say/g, 'I had said')
        .replace(/You say/g, 'You had said')
        .replace(/He says/g, 'He had said')
        .replace(/She says/g, 'She had said')
        .replace(/We say/g, 'We had said')
        .replace(/You \(plural\) say/g, 'You (plural) had said')
        .replace(/They say/g, 'They had said')
        .replace(/I know/g, 'I had known')
        .replace(/You know/g, 'You had known')
        .replace(/He knows/g, 'He had known')
        .replace(/She knows/g, 'She had known')
        .replace(/We know/g, 'We had known')
        .replace(/You \(plural\) know/g, 'You (plural) had known')
        .replace(/They know/g, 'They had known')
        .replace(/I can/g, 'I had been able to')
        .replace(/You can/g, 'You had been able to')
        .replace(/He can/g, 'He had been able to')
        .replace(/She can/g, 'She had been able to')
        .replace(/We can/g, 'We had been able to')
        .replace(/You \(plural\) can/g, 'You (plural) had been able to')
        .replace(/They can/g, 'They had been able to')
        .replace(/I want/g, 'I had wanted')
        .replace(/You want/g, 'You had wanted')
        .replace(/He wants/g, 'He had wanted')
        .replace(/She wants/g, 'She had wanted')
        .replace(/We want/g, 'We had wanted')
        .replace(/You \(plural\) want/g, 'You (plural) had wanted')
        .replace(/They want/g, 'They had wanted')
        .replace(/I come/g, 'I had come')
        .replace(/You come/g, 'You had come')
        .replace(/He comes/g, 'He had come')
        .replace(/She comes/g, 'She had come')
        .replace(/We come/g, 'We had come')
        .replace(/You \(plural\) come/g, 'You (plural) had come')
        .replace(/They come/g, 'They had come')
        // Handle negative forms for plus-que-parfait
        .replace(/I don't have/g, 'I hadn\'t had')
        .replace(/You don't have/g, 'You hadn\'t had')
        .replace(/He doesn't have/g, 'He hadn\'t had')
        .replace(/She doesn't have/g, 'She hadn\'t had')
        .replace(/We don't have/g, 'We hadn\'t had')
        .replace(/You \(plural\) don't have/g, 'You (plural) hadn\'t had')
        .replace(/They don't have/g, 'They hadn\'t had')
        .replace(/I don't/g, 'I hadn\'t')
        .replace(/You don't/g, 'You hadn\'t')
        .replace(/He doesn't/g, 'He hadn\'t')
        .replace(/She doesn't/g, 'She hadn\'t')
        .replace(/We don't/g, 'We hadn\'t')
        .replace(/You \(plural\) don't/g, 'You (plural) hadn\'t')
        .replace(/They don't/g, 'They hadn\'t')
        .replace(/can't/g, 'couldn\'t have');
    } else if (normalizedTense === 'passé_simple') {
      // Passé simple = literary/formal past tense ("He spoke", "She went") - same as passé composé in English
      englishQuestion = englishQuestion
        .replace(/I have/g, 'I had')
        .replace(/You have/g, 'You had')
        .replace(/He has/g, 'He had')
        .replace(/She has/g, 'She had')
        .replace(/We have/g, 'We had')
        .replace(/You \(plural\) have/g, 'You (plural) had')
        .replace(/They have/g, 'They had')
        .replace(/I am/g, 'I was')
        .replace(/You are/g, 'You were')
        .replace(/He is/g, 'He was')
        .replace(/She is/g, 'She was')
        .replace(/We are/g, 'We were')
        .replace(/You \(plural\) are/g, 'You (plural) were')
        .replace(/They are/g, 'They were')
        .replace(/I do/g, 'I did')
        .replace(/You do/g, 'You did')
        .replace(/He does/g, 'He did')
        .replace(/She does/g, 'She did')
        .replace(/We do/g, 'We did')
        .replace(/You \(plural\) do/g, 'You (plural) did')
        .replace(/They do/g, 'They did')
        .replace(/I make/g, 'I made')
        .replace(/You make/g, 'You made')
        .replace(/He makes/g, 'He made')
        .replace(/She makes/g, 'She made')
        .replace(/We make/g, 'We made')
        .replace(/You \(plural\) make/g, 'You (plural) made')
        .replace(/They make/g, 'They made')
        .replace(/I go/g, 'I went')
        .replace(/You go/g, 'You went')
        .replace(/He goes/g, 'He went')
        .replace(/She goes/g, 'She went')
        .replace(/We go/g, 'We went')
        .replace(/You \(plural\) go/g, 'You (plural) went')
        .replace(/They go/g, 'They went')
        .replace(/I see/g, 'I saw')
        .replace(/You see/g, 'You saw')
        .replace(/He sees/g, 'He saw')
        .replace(/She sees/g, 'She saw')
        .replace(/We see/g, 'We saw')
        .replace(/You \(plural\) see/g, 'You (plural) saw')
        .replace(/They see/g, 'They saw')
        .replace(/I say/g, 'I said')
        .replace(/You say/g, 'You said')
        .replace(/He says/g, 'He said')
        .replace(/She says/g, 'She said')
        .replace(/We say/g, 'We said')
        .replace(/You \(plural\) say/g, 'You (plural) said')
        .replace(/They say/g, 'They said')
        .replace(/I know/g, 'I knew')
        .replace(/You know/g, 'You knew')
        .replace(/He knows/g, 'He knew')
        .replace(/She knows/g, 'She knew')
        .replace(/We know/g, 'We knew')
        .replace(/You \(plural\) know/g, 'You (plural) knew')
        .replace(/They know/g, 'They knew')
        .replace(/I can/g, 'I could')
        .replace(/You can/g, 'You could')
        .replace(/He can/g, 'He could')
        .replace(/She can/g, 'She could')
        .replace(/We can/g, 'We could')
        .replace(/You \(plural\) can/g, 'You (plural) could')
        .replace(/They can/g, 'They could')
        .replace(/I want/g, 'I wanted')
        .replace(/You want/g, 'You wanted')
        .replace(/He wants/g, 'He wanted')
        .replace(/She wants/g, 'She wanted')
        .replace(/We want/g, 'We wanted')
        .replace(/You \(plural\) want/g, 'You (plural) wanted')
        .replace(/They want/g, 'They wanted')
        .replace(/I come/g, 'I came')
        .replace(/You come/g, 'You came')
        .replace(/He comes/g, 'He came')
        .replace(/She comes/g, 'She came')
        .replace(/We come/g, 'We came')
        .replace(/You \(plural\) come/g, 'You (plural) came')
        .replace(/They come/g, 'They came')
        // Handle negative forms for passé simple
        .replace(/I don't have/g, 'I didn\'t have')
        .replace(/You don't have/g, 'You didn\'t have')
        .replace(/He doesn't have/g, 'He didn\'t have')
        .replace(/She doesn't have/g, 'She didn\'t have')
        .replace(/We don't have/g, 'We didn\'t have')
        .replace(/You \(plural\) don't have/g, 'You (plural) didn\'t have')
        .replace(/They don't have/g, 'They didn\'t have')
        .replace(/I don't/g, 'I didn\'t')
        .replace(/You don't/g, 'You didn\'t')
        .replace(/He doesn't/g, 'He didn\'t')
        .replace(/She doesn't/g, 'She didn\'t')
        .replace(/We don't/g, 'We didn\'t')
        .replace(/You \(plural\) don't/g, 'You (plural) didn\'t')
        .replace(/They don't/g, 'They didn\'t')
        .replace(/can't/g, 'couldn\'t');
    } else if (normalizedTense === 'conditionnel') {
      // Conditional = "would" expressions ("I would be", "He would have", etc.)
      englishQuestion = englishQuestion
        .replace(/I have/g, 'I would have')
        .replace(/You have/g, 'You would have')
        .replace(/He has/g, 'He would have')
        .replace(/She has/g, 'She would have')
        .replace(/We have/g, 'We would have')
        .replace(/You \(plural\) have/g, 'You (plural) would have')
        .replace(/They have/g, 'They would have')
        .replace(/I am/g, 'I would be')
        .replace(/You are/g, 'You would be')
        .replace(/He is/g, 'He would be')
        .replace(/She is/g, 'She would be')
        .replace(/We are/g, 'We would be')
        .replace(/You \(plural\) are/g, 'You (plural) would be')
        .replace(/They are/g, 'They would be')
        .replace(/I do/g, 'I would do')
        .replace(/You do/g, 'You would do')
        .replace(/He does/g, 'He would do')
        .replace(/She does/g, 'She would do')
        .replace(/We do/g, 'We would do')
        .replace(/You \(plural\) do/g, 'You (plural) would do')
        .replace(/They do/g, 'They would do')
        .replace(/I make/g, 'I would make')
        .replace(/You make/g, 'You would make')
        .replace(/He makes/g, 'He would make')
        .replace(/She makes/g, 'She would make')
        .replace(/We make/g, 'We would make')
        .replace(/You \(plural\) make/g, 'You (plural) would make')
        .replace(/They make/g, 'They would make')
        .replace(/I go/g, 'I would go')
        .replace(/You go/g, 'You would go')
        .replace(/He goes/g, 'He would go')
        .replace(/She goes/g, 'She would go')
        .replace(/We go/g, 'We would go')
        .replace(/You \(plural\) go/g, 'You (plural) would go')
        .replace(/They go/g, 'They would go')
        .replace(/I see/g, 'I would see')
        .replace(/You see/g, 'You would see')
        .replace(/He sees/g, 'He would see')
        .replace(/She sees/g, 'She would see')
        .replace(/We see/g, 'We would see')
        .replace(/You \(plural\) see/g, 'You (plural) would see')
        .replace(/They see/g, 'They would see')
        .replace(/I say/g, 'I would say')
        .replace(/You say/g, 'You would say')
        .replace(/He says/g, 'He would say')
        .replace(/She says/g, 'She would say')
        .replace(/We say/g, 'We would say')
        .replace(/You \(plural\) say/g, 'You (plural) would say')
        .replace(/They say/g, 'They would say')
        .replace(/I know/g, 'I would know')
        .replace(/You know/g, 'You would know')
        .replace(/He knows/g, 'He would know')
        .replace(/She knows/g, 'She would know')
        .replace(/We know/g, 'We would know')
        .replace(/You \(plural\) know/g, 'You (plural) would know')
        .replace(/They know/g, 'They would know')
        .replace(/I can/g, 'I could')
        .replace(/You can/g, 'You could')
        .replace(/He can/g, 'He could')
        .replace(/She can/g, 'She could')
        .replace(/We can/g, 'We could')
        .replace(/You \(plural\) can/g, 'You (plural) could')
        .replace(/They can/g, 'They could')
        .replace(/I want/g, 'I would want')
        .replace(/You want/g, 'You would want')
        .replace(/He wants/g, 'He would want')
        .replace(/She wants/g, 'She would want')
        .replace(/We want/g, 'We would want')
        .replace(/You \(plural\) want/g, 'You (plural) would want')
        .replace(/They want/g, 'They would want')
        .replace(/I come/g, 'I would come')
        .replace(/You come/g, 'You would come')
        .replace(/He comes/g, 'He would come')
        .replace(/She comes/g, 'She would come')
        .replace(/We come/g, 'We would come')
        .replace(/You \(plural\) come/g, 'You (plural) would come')
        .replace(/They come/g, 'They would come')
        // Handle negative forms for conditional
        .replace(/I don't have/g, 'I wouldn\'t have')
        .replace(/You don't have/g, 'You wouldn\'t have')
        .replace(/He doesn't have/g, 'He wouldn\'t have')
        .replace(/She doesn't have/g, 'She wouldn\'t have')
        .replace(/We don't have/g, 'We wouldn\'t have')
        .replace(/You \(plural\) don't have/g, 'You (plural) wouldn\'t have')
        .replace(/They don't have/g, 'They wouldn\'t have')
        .replace(/I don't/g, 'I wouldn\'t')
        .replace(/You don't/g, 'You wouldn\'t')
        .replace(/He doesn't/g, 'He wouldn\'t')
        .replace(/She doesn't/g, 'She wouldn\'t')
        .replace(/We don't/g, 'We wouldn\'t')
        .replace(/You \(plural\) don't/g, 'You (plural) wouldn\'t')
        .replace(/They don't/g, 'They wouldn\'t')
        .replace(/can't/g, 'couldn\'t');
    } else if (normalizedTense === 'futur_simple') {
      // Futur simple = "will" expressions ("I will be", "He will have", etc.)
      englishQuestion = englishQuestion
        .replace(/I have/g, 'I will have')
        .replace(/You have/g, 'You will have')
        .replace(/He has/g, 'He will have')
        .replace(/She has/g, 'She will have')
        .replace(/We have/g, 'We will have')
        .replace(/You \(plural\) have/g, 'You (plural) will have')
        .replace(/They have/g, 'They will have')
        .replace(/I am/g, 'I will be')
        .replace(/You are/g, 'You will be')
        .replace(/He is/g, 'He will be')
        .replace(/She is/g, 'She will be')
        .replace(/We are/g, 'We will be')
        .replace(/You \(plural\) are/g, 'You (plural) will be')
        .replace(/They are/g, 'They will be')
        .replace(/I do/g, 'I will do')
        .replace(/You do/g, 'You will do')
        .replace(/He does/g, 'He will do')
        .replace(/She does/g, 'She will do')
        .replace(/We do/g, 'We will do')
        .replace(/You \(plural\) do/g, 'You (plural) will do')
        .replace(/They do/g, 'They will do')
        .replace(/I make/g, 'I will make')
        .replace(/You make/g, 'You will make')
        .replace(/He makes/g, 'He will make')
        .replace(/She makes/g, 'She will make')
        .replace(/We make/g, 'We will make')
        .replace(/You \(plural\) make/g, 'You (plural) will make')
        .replace(/They make/g, 'They will make')
        .replace(/I go/g, 'I will go')
        .replace(/You go/g, 'You will go')
        .replace(/He goes/g, 'He will go')
        .replace(/She goes/g, 'She will go')
        .replace(/We go/g, 'We will go')
        .replace(/You \(plural\) go/g, 'You (plural) will go')
        .replace(/They go/g, 'They will go')
        .replace(/I see/g, 'I will see')
        .replace(/You see/g, 'You will see')
        .replace(/He sees/g, 'He will see')
        .replace(/She sees/g, 'She will see')
        .replace(/We see/g, 'We will see')
        .replace(/You \(plural\) see/g, 'You (plural) will see')
        .replace(/They see/g, 'They will see')
        .replace(/I say/g, 'I will say')
        .replace(/You say/g, 'You will say')
        .replace(/He says/g, 'He will say')
        .replace(/She says/g, 'She will say')
        .replace(/We say/g, 'We will say')
        .replace(/You \(plural\) say/g, 'You (plural) will say')
        .replace(/They say/g, 'They will say')
        .replace(/I know/g, 'I will know')
        .replace(/You know/g, 'You will know')
        .replace(/He knows/g, 'He will know')
        .replace(/She knows/g, 'She will know')
        .replace(/We know/g, 'We will know')
        .replace(/You \(plural\) know/g, 'You (plural) will know')
        .replace(/They know/g, 'They will know')
        .replace(/I can/g, 'I will be able to')
        .replace(/You can/g, 'You will be able to')
        .replace(/He can/g, 'He will be able to')
        .replace(/She can/g, 'She will be able to')
        .replace(/We can/g, 'We will be able to')
        .replace(/You \(plural\) can/g, 'You (plural) will be able to')
        .replace(/They can/g, 'They will be able to')
        .replace(/I want/g, 'I will want')
        .replace(/You want/g, 'You will want')
        .replace(/He wants/g, 'He will want')
        .replace(/She wants/g, 'She will want')
        .replace(/We want/g, 'We will want')
        .replace(/You \(plural\) want/g, 'You (plural) will want')
        .replace(/They want/g, 'They will want')
        .replace(/I come/g, 'I will come')
        .replace(/You come/g, 'You will come')
        .replace(/He comes/g, 'He will come')
        .replace(/She comes/g, 'She will come')
        .replace(/We come/g, 'We will come')
        .replace(/You \(plural\) come/g, 'You (plural) will come')
        .replace(/They come/g, 'They will come')
        // Handle negative forms for future
        .replace(/I don't have/g, 'I won\'t have')
        .replace(/You don't have/g, 'You won\'t have')
        .replace(/He doesn't have/g, 'He won\'t have')
        .replace(/She doesn't have/g, 'She won\'t have')
        .replace(/We don't have/g, 'We won\'t have')
        .replace(/You \(plural\) don't have/g, 'You (plural) won\'t have')
        .replace(/They don't have/g, 'They won\'t have')
        .replace(/I don't/g, 'I won\'t')
        .replace(/You don't/g, 'You won\'t')
        .replace(/He doesn't/g, 'He won\'t')
        .replace(/She doesn't/g, 'She won\'t')
        .replace(/We don't/g, 'We won\'t')
        .replace(/You \(plural\) don't/g, 'You (plural) won\'t')
        .replace(/They don't/g, 'They won\'t')
        .replace(/can't/g, 'won\'t be able to');
    } else if (normalizedTense === 'futur_proche') {
      // Futur proche = "going to" expressions ("I am going to be", "He is going to have", etc.)
      englishQuestion = englishQuestion
        .replace(/I have/g, 'I am going to have')
        .replace(/You have/g, 'You are going to have')
        .replace(/He has/g, 'He is going to have')
        .replace(/She has/g, 'She is going to have')
        .replace(/We have/g, 'We are going to have')
        .replace(/You \(plural\) have/g, 'You (plural) are going to have')
        .replace(/They have/g, 'They are going to have')
        .replace(/I am/g, 'I am going to be')
        .replace(/You are/g, 'You are going to be')
        .replace(/He is/g, 'He is going to be')
        .replace(/She is/g, 'She is going to be')
        .replace(/We are/g, 'We are going to be')
        .replace(/You \(plural\) are/g, 'You (plural) are going to be')
        .replace(/They are/g, 'They are going to be')
        .replace(/I do/g, 'I am going to do')
        .replace(/You do/g, 'You are going to do')
        .replace(/He does/g, 'He is going to do')
        .replace(/She does/g, 'She is going to do')
        .replace(/We do/g, 'We are going to do')
        .replace(/You \(plural\) do/g, 'You (plural) are going to do')
        .replace(/They do/g, 'They are going to do')
        .replace(/I make/g, 'I am going to make')
        .replace(/You make/g, 'You are going to make')
        .replace(/He makes/g, 'He is going to make')
        .replace(/She makes/g, 'She is going to make')
        .replace(/We make/g, 'We are going to make')
        .replace(/You \(plural\) make/g, 'You (plural) are going to make')
        .replace(/They make/g, 'They are going to make')
        .replace(/I go/g, 'I am going to go')
        .replace(/You go/g, 'You are going to go')
        .replace(/He goes/g, 'He is going to go')
        .replace(/She goes/g, 'She is going to go')
        .replace(/We go/g, 'We are going to go')
        .replace(/You \(plural\) go/g, 'You (plural) are going to go')
        .replace(/They go/g, 'They are going to go')
        .replace(/I see/g, 'I am going to see')
        .replace(/You see/g, 'You are going to see')
        .replace(/He sees/g, 'He is going to see')
        .replace(/She sees/g, 'She is going to see')
        .replace(/We see/g, 'We are going to see')
        .replace(/You \(plural\) see/g, 'You (plural) are going to see')
        .replace(/They see/g, 'They are going to see')
        .replace(/I say/g, 'I am going to say')
        .replace(/You say/g, 'You are going to say')
        .replace(/He says/g, 'He is going to say')
        .replace(/She says/g, 'She is going to say')
        .replace(/We say/g, 'We are going to say')
        .replace(/You \(plural\) say/g, 'You (plural) are going to say')
        .replace(/They say/g, 'They are going to say')
        .replace(/I know/g, 'I am going to know')
        .replace(/You know/g, 'You are going to know')
        .replace(/He knows/g, 'He is going to know')
        .replace(/She knows/g, 'She is going to know')
        .replace(/We know/g, 'We are going to know')
        .replace(/You \(plural\) know/g, 'You (plural) are going to know')
        .replace(/They know/g, 'They are going to know')
        .replace(/I can/g, 'I am going to be able to')
        .replace(/You can/g, 'You are going to be able to')
        .replace(/He can/g, 'He is going to be able to')
        .replace(/She can/g, 'She is going to be able to')
        .replace(/We can/g, 'We are going to be able to')
        .replace(/You \(plural\) can/g, 'You (plural) are going to be able to')
        .replace(/They can/g, 'They are going to be able to')
        .replace(/I want/g, 'I am going to want')
        .replace(/You want/g, 'You are going to want')
        .replace(/He wants/g, 'He is going to want')
        .replace(/She wants/g, 'She is going to want')
        .replace(/We want/g, 'We are going to want')
        .replace(/You \(plural\) want/g, 'You (plural) are going to want')
        .replace(/They want/g, 'They are going to want')
        .replace(/I come/g, 'I am going to come')
        .replace(/You come/g, 'You are going to come')
        .replace(/He comes/g, 'He is going to come')
        .replace(/She comes/g, 'She is going to come')
        .replace(/We come/g, 'We are going to come')
        .replace(/You \(plural\) come/g, 'You (plural) are going to come')
        .replace(/They come/g, 'They are going to come')
        // Handle negative forms for futur proche
        .replace(/I don't have/g, 'I am not going to have')
        .replace(/You don't have/g, 'You are not going to have')
        .replace(/He doesn't have/g, 'He is not going to have')
        .replace(/She doesn't have/g, 'She is not going to have')
        .replace(/We don't have/g, 'We are not going to have')
        .replace(/You \(plural\) don't have/g, 'You (plural) are not going to have')
        .replace(/They don't have/g, 'They are not going to have')
        .replace(/I don't/g, 'I am not going to')
        .replace(/You don't/g, 'You are not going to')
        .replace(/He doesn't/g, 'He is not going to')
        .replace(/She doesn't/g, 'She is not going to')
        .replace(/We don't/g, 'We are not going to')
        .replace(/You \(plural\) don't/g, 'You (plural) are not going to')
        .replace(/They don't/g, 'They are not going to')
        .replace(/can't/g, 'are not going to be able to');
    } else if (normalizedTense === 'présent_progressif') {
      // Présent progressif = "am/is/are + -ing" expressions
      englishQuestion = englishQuestion
        .replace(/I have/g, 'I am having')
        .replace(/You have/g, 'You are having')
        .replace(/He has/g, 'He is having')
        .replace(/She has/g, 'She is having')
        .replace(/We have/g, 'We are having')
        .replace(/You \(plural\) have/g, 'You (plural) are having')
        .replace(/They have/g, 'They are having')
        .replace(/I am/g, 'I am being')
        .replace(/You are/g, 'You are being')
        .replace(/He is/g, 'He is being')
        .replace(/She is/g, 'She is being')
        .replace(/We are/g, 'We are being')
        .replace(/You \(plural\) are/g, 'You (plural) are being')
        .replace(/They are/g, 'They are being')
        .replace(/I do/g, 'I am doing')
        .replace(/You do/g, 'You are doing')
        .replace(/He does/g, 'He is doing')
        .replace(/She does/g, 'She is doing')
        .replace(/We do/g, 'We are doing')
        .replace(/You \(plural\) do/g, 'You (plural) are doing')
        .replace(/They do/g, 'They are doing')
        .replace(/I make/g, 'I am making')
        .replace(/You make/g, 'You are making')
        .replace(/He makes/g, 'He is making')
        .replace(/She makes/g, 'She is making')
        .replace(/We make/g, 'We are making')
        .replace(/You \(plural\) make/g, 'You (plural) are making')
        .replace(/They make/g, 'They are making')
        .replace(/I go/g, 'I am going')
        .replace(/You go/g, 'You are going')
        .replace(/He goes/g, 'He is going')
        .replace(/She goes/g, 'She is going')
        .replace(/We go/g, 'We are going')
        .replace(/You \(plural\) go/g, 'You (plural) are going')
        .replace(/They go/g, 'They are going')
        .replace(/I see/g, 'I am seeing')
        .replace(/You see/g, 'You are seeing')
        .replace(/He sees/g, 'He is seeing')
        .replace(/She sees/g, 'She is seeing')
        .replace(/We see/g, 'We are seeing')
        .replace(/You \(plural\) see/g, 'You (plural) are seeing')
        .replace(/They see/g, 'They are seeing')
        .replace(/I say/g, 'I am saying')
        .replace(/You say/g, 'You are saying')
        .replace(/He says/g, 'He is saying')
        .replace(/She says/g, 'She is saying')
        .replace(/We say/g, 'We are saying')
        .replace(/You \(plural\) say/g, 'You (plural) are saying')
        .replace(/They say/g, 'They are saying')
        .replace(/I know/g, 'I am knowing')
        .replace(/You know/g, 'You are knowing')
        .replace(/He knows/g, 'He is knowing')
        .replace(/She knows/g, 'She is knowing')
        .replace(/We know/g, 'We are knowing')
        .replace(/You \(plural\) know/g, 'You (plural) are knowing')
        .replace(/They know/g, 'They are knowing')
        .replace(/I can/g, 'I am being able to')
        .replace(/You can/g, 'You are being able to')
        .replace(/He can/g, 'He is being able to')
        .replace(/She can/g, 'She is being able to')
        .replace(/We can/g, 'We are being able to')
        .replace(/You \(plural\) can/g, 'You (plural) are being able to')
        .replace(/They can/g, 'They are being able to')
        .replace(/I want/g, 'I am wanting')
        .replace(/You want/g, 'You are wanting')
        .replace(/He wants/g, 'He is wanting')
        .replace(/She wants/g, 'She is wanting')
        .replace(/We want/g, 'We are wanting')
        .replace(/You \(plural\) want/g, 'You (plural) are wanting')
        .replace(/They want/g, 'They are wanting')
        .replace(/I come/g, 'I am coming')
        .replace(/You come/g, 'You are coming')
        .replace(/He comes/g, 'He is coming')
        .replace(/She comes/g, 'She is coming')
        .replace(/We come/g, 'We are coming')
        .replace(/You \(plural\) come/g, 'You (plural) are coming')
        .replace(/They come/g, 'They are coming')
        // Handle negative forms for présent progressif
        .replace(/I don't have/g, 'I am not having')
        .replace(/You don't have/g, 'You are not having')
        .replace(/He doesn't have/g, 'He is not having')
        .replace(/She doesn't have/g, 'She is not having')
        .replace(/We don't have/g, 'We are not having')
        .replace(/You \(plural\) don't have/g, 'You (plural) are not having')
        .replace(/They don't have/g, 'They are not having')
        .replace(/I don't/g, 'I am not')
        .replace(/You don't/g, 'You are not')
        .replace(/He doesn't/g, 'He is not')
        .replace(/She doesn't/g, 'She is not')
        .replace(/We don't/g, 'We are not')
        .replace(/You \(plural\) don't/g, 'You (plural) are not')
        .replace(/They don't/g, 'They are not')
        .replace(/can't/g, 'are not being able to');
    }

    // Ensure proper punctuation for English sentences
    if (!englishQuestion.endsWith('.') && !englishQuestion.endsWith('!') && !englishQuestion.endsWith('?')) {
      englishQuestion += '.';
    }

    questions.push({
      question: englishQuestion,
      hint: `Conjugate ${verb} for ${pronoun} in ${tense}`,
      answerOptions: shuffledAnswers
    });
  }
  
  return { questions };
}