/**
 * Final Conversations: four spoken options (1.3.16, decided 26 Oct 2026).
 *
 * Every learner reply gets three wrong answers beside the right one, the way
 * Masters Mic works in quizzes: whatever is heard is snapped to the nearest of
 * the four and marked right or wrong.
 *
 * Keyed by "Level|TimeFrame|verb" then by the reply's model answer (`fr`), so the
 * generated dialogue files (conversations.ts etc.) are never edited by hand and
 * warm-ups added in front don't shift anything.
 *
 * Rules (checked by scripts/test-conversation-options.ts):
 *  - exactly three wrong answers per reply, each different from the right one;
 *  - only the verb is wrong (person, tense or auxiliary); the rest stays as is;
 *  - no wrong answer sounds like the right one or like another option
 *    (shared/soundAlike.ts) — the mic must be able to tell them apart, so a
 *    look-alike that sounds the same would be a wasted option;
 *  - near-merges avoided too: no -rai / -rais pairs (serai/serais).
 *
 * All levels, Beginner to Intermediate B, warm-ups included (465 replies).
 * Drafted 26 Oct 2026 and independently reviewed for French; a reply with no
 * entry falls back to the old free-speech judging.
 */
export const CONVERSATION_OPTIONS: Record<string, Record<string, string[]>> = {
  // ------------------------------------------------------------ Beginner ---
  "Beginner|Present|être": {
    "Oui, je suis étudiant.": ["Oui, je est étudiant.", "Oui, je sommes étudiant.", "Oui, je serai étudiant."],
    "Il est à la maison.": ["Il sont à la maison.", "Il sera à la maison.", "Il a été à la maison."],
  },
  "Beginner|Past|être": {
    "Oui, j'ai été malade.": ["Oui, je suis été malade.", "Oui, je serai malade.", "Oui, j'avons été malade."],
    "Oui, nous avons été en retard.": ["Oui, nous sommes été en retard.", "Oui, nous serons en retard.", "Oui, nous avez été en retard."],
  },
  "Beginner|Future|être": {
    "Oui, je serai à Paris.": ["Oui, j'ai été à Paris.", "Oui, je sera à Paris.", "Oui, je seront à Paris."],
    "Non, ils seront à Lyon.": ["Non, ils ont été à Lyon.", "Non, ils sera à Lyon.", "Non, ils serez à Lyon."],
  },
  "Beginner|Present|avoir": {
    "Oui, j'ai un chien.": ["Oui, je suis un chien.", "Oui, j'aurai un chien.", "Oui, j'avons un chien."],
    "Non, elle a un lapin.": ["Non, elle est un lapin.", "Non, elle aura un lapin.", "Non, elle ont un lapin."],
  },
  "Beginner|Past|avoir": {
    "Oui, j'ai eu un beau cadeau.": ["Oui, je suis eu un beau cadeau.", "Oui, j'aurai un beau cadeau.", "Oui, j'ai un beau cadeau."],
    "Oui, il a eu un vélo.": ["Oui, il est eu un vélo.", "Oui, il aura un vélo.", "Oui, il ont eu un vélo."],
  },
  "Beginner|Future|avoir": {
    "Oui, j'aurai le temps.": ["Oui, j'ai eu le temps.", "Oui, je serai le temps.", "Oui, j'aura le temps."],
    "Non, il aura du travail.": ["Non, il a eu du travail.", "Non, il sera du travail.", "Non, il auront du travail."],
  },
  "Beginner|Present|faire": {
    "Je fais un gâteau.": ["Je ferai un gâteau.", "J'ai fait un gâteau.", "Je font un gâteau."],
    "Ils font leurs devoirs.": ["Ils ont fait leurs devoirs.", "Ils feront leurs devoirs.", "Ils faites leurs devoirs."],
  },
  "Beginner|Past|faire": {
    "J'ai fait les courses.": ["Je suis fait les courses.", "Je ferai les courses.", "Je fais les courses."],
    "Elle a fait une soupe.": ["Elle est fait une soupe.", "Elle fera une soupe.", "Elle ont fait une soupe."],
  },
  "Beginner|Future|faire": {
    "Je ferai une promenade.": ["J'ai fait une promenade.", "Je fera une promenade.", "Je ferons une promenade."],
    "Oui, nous ferons du sport.": ["Oui, nous avons fait du sport.", "Oui, nous ferez du sport.", "Oui, nous faisons du sport."],
  },
  // ------------------------------------------------------------ Novice ---
  "Novice|Present|être": {
    "Non, nous sommes australiens.": ["Non, nous êtes australiens.", "Non, nous serons australiens.", "Non, nous sont australiens."],
    "Oui, nous sommes en vacances.": ["Oui, nous êtes en vacances.", "Oui, nous serons en vacances.", "Oui, nous étions en vacances."],
  },
  "Novice|Past|être": {
    "Oui, j'ai été à Rome.": ["Oui, je suis été à Rome.", "Oui, je serai à Rome.", "Oui, j'avons été à Rome."],
    "Oui, nous avons été très contents.": ["Oui, nous sommes été très contents.", "Oui, nous avez été très contents.", "Oui, nous serons très contents."],
  },
  "Novice|Future|être": {
    "Oui, nous serons là.": ["Oui, nous serez là.", "Oui, nous avons été là.", "Oui, nous étions là."],
    "Non, elle sera fatiguée.": ["Non, elle serons fatiguée.", "Non, elle a été fatiguée.", "Non, elle était fatiguée."],
  },
  "Novice|Present|avoir": {
    "Oui, nous avons deux enfants.": ["Oui, nous avez deux enfants.", "Oui, nous aurons deux enfants.", "Oui, nous ont deux enfants."],
    "Ils ont cinq et huit ans.": ["Ils avaient cinq et huit ans.", "Ils auront cinq et huit ans.", "Ils avez cinq et huit ans."],
  },
  "Novice|Past|avoir": {
    "Oui, j'ai eu très peur.": ["Oui, je suis eu très peur.", "Oui, j'aurai très peur.", "Oui, j'ai très peur."],
    "Non, ils n'ont pas eu peur.": ["Non, ils ne sont pas eu peur.", "Non, ils n'auront pas peur.", "Non, ils n'avez pas eu peur."],
  },
  "Novice|Future|avoir": {
    "Oui, j'aurai mon permis en mai.": ["Oui, je serai mon permis en mai.", "Oui, j'avais mon permis en mai.", "Oui, j'aurons mon permis en mai."],
    "Oui, elle aura une petite voiture.": ["Oui, elle auront une petite voiture.", "Oui, elle a eu une petite voiture.", "Oui, elle sera une petite voiture."],
  },
  "Novice|Present|faire": {
    "Non, il fait froid.": ["Non, il fera froid.", "Non, il font froid.", "Non, il faisons froid."],
    "Nous faisons un puzzle.": ["Nous faites un puzzle.", "Nous ferons un puzzle.", "Nous font un puzzle."],
  },
  "Novice|Past|faire": {
    "Oui, nous avons fait bon voyage.": ["Oui, nous sommes fait bon voyage.", "Oui, nous ferons bon voyage.", "Oui, nous avez fait bon voyage."],
    "Nous avons fait le tour de la ville.": ["Nous sommes fait le tour de la ville.", "Nous ferons le tour de la ville.", "Nous faisons le tour de la ville."],
  },
  "Novice|Future|faire": {
    "Nous ferons un voyage en Espagne.": ["Nous avons fait un voyage en Espagne.", "Nous ferez un voyage en Espagne.", "Nous font un voyage en Espagne."],
    "Non, il fera un stage.": ["Non, il a fait un stage.", "Non, il ferons un stage.", "Non, il font un stage."],
  },
  "Novice|Present|aller": {
    "Je vais à la boulangerie.": ["Je vont à la boulangerie.", "Je suis allé à la boulangerie.", "J'irai à la boulangerie."],
    "Non, ils vont au parc.": ["Non, ils allons au parc.", "Non, ils allez au parc.", "Non, ils va au parc."],
  },
  "Novice|Past|aller": {
    "Oui, je suis allé au cinéma.": ["Oui, j'ai allé au cinéma.", "Oui, je vais au cinéma.", "Oui, j'irai au cinéma."],
    "Non, elle est allée à la plage.": ["Non, elle a allé à la plage.", "Non, elle ira à la plage.", "Non, elle va à la plage."],
  },
  "Novice|Future|aller": {
    "Oui, j'irai à la plage.": ["Oui, je suis allé à la plage.", "Oui, j'allais à la plage.", "Oui, je vont à la plage."],
    "Non, nous irons à vélo.": ["Non, nous irez à vélo.", "Non, nous sommes allés à vélo.", "Non, nous vont à vélo."],
  },
  // ------------------------------------------------------------ Elementary ---
  "Elementary|Present|dire": {
    "Oui, je dis la vérité maintenant.": ["Oui, je disons la vérité maintenant.", "Oui, je dirai la vérité maintenant.", "Oui, j'ai dit la vérité maintenant."],
    "On dit merci.": ["On disent merci.", "On a dit merci.", "On disons merci."],
    "Oui, je dis bonjour tous les matins.": ["Oui, je disons bonjour tous les matins.", "Oui, je dirai bonjour tous les matins.", "Oui, j'ai dit bonjour tous les matins."],
  },
  "Elementary|Past|dire": {
    "Oui, j'ai dit oui.": ["Oui, je suis dit oui.", "Oui, je dirai oui.", "Oui, je dis oui."],
    "Je lui ai dit bonjour.": ["Je lui suis dit bonjour.", "Je lui dirai bonjour.", "Je lui avons dit bonjour."],
    "Elle n'a rien dit.": ["Elle n'est rien dit.", "Elle n'ont rien dit.", "Elle ne dira rien."],
  },
  "Elementary|Future|dire": {
    "Oui, nous dirons bonjour.": ["Oui, nous direz bonjour.", "Oui, nous avons dit bonjour.", "Oui, nous disent bonjour."],
    "Oui, je lui dirai la vérité.": ["Oui, je lui dirons la vérité.", "Oui, je lui ai dit la vérité.", "Oui, je lui disais la vérité."],
    "Il ne dira rien.": ["Il ne diront rien.", "Il n'a rien dit.", "Il ne disait rien."],
  },
  "Elementary|Present|voir": {
    "Je vois les oiseaux dans le ciel.": ["Je voyons les oiseaux dans le ciel.", "Je verrai les oiseaux dans le ciel.", "J'ai vu les oiseaux dans le ciel."],
    "Oui, je la vois.": ["Oui, je la voyons.", "Oui, je la verrai.", "Oui, je l'ai vue."],
    "Non, nous ne voyons pas la Seine.": ["Non, nous ne voyez pas la Seine.", "Non, nous ne verrons pas la Seine.", "Non, nous ne voient pas la Seine."],
  },
  "Elementary|Past|voir": {
    "Oui, j'ai vu ce film.": ["Oui, je suis vu ce film.", "Oui, je verrai ce film.", "Oui, je vois ce film."],
    "Oui, j'ai vu le match.": ["Oui, je suis vu le match.", "Oui, je verrai le match.", "Oui, je voyais le match."],
    "Non, ils ont vu un film.": ["Non, ils avons vu un film.", "Non, ils verront un film.", "Non, ils voient un film."],
  },
  "Elementary|Future|voir": {
    "Oui, nous verrons une pièce de théâtre.": ["Oui, nous verrez une pièce de théâtre.", "Oui, nous avons vu une pièce de théâtre.", "Oui, nous voient une pièce de théâtre."],
    "Oui, je les verrai dimanche.": ["Oui, je les verrons dimanche.", "Oui, je les ai vus dimanche.", "Oui, je les voyais dimanche."],
    "Non, elle verra ses amis.": ["Non, elle verront ses amis.", "Non, elle a vu ses amis.", "Non, elle voyait ses amis."],
  },
  "Elementary|Present|savoir": {
    "Oui, je sais la réponse.": ["Oui, je savons la réponse.", "Oui, je saurai la réponse.", "Oui, j'ai su la réponse."],
    "Oui, je sais nager.": ["Oui, je savons nager.", "Oui, je saurai nager.", "Oui, j'ai su nager."],
    "Non, ils ne savent pas encore.": ["Non, ils ne sait pas encore.", "Non, ils ne savez pas encore.", "Non, ils ne sauront pas encore."],
  },
  "Elementary|Past|savoir": {
    "Oui, j'ai su la réponse.": ["Oui, je suis su la réponse.", "Oui, je saurai la réponse.", "Oui, je savons la réponse."],
    "Je l'ai su ce matin.": ["Je l'avons su ce matin.", "Je le saurai ce matin.", "Je le sais ce matin."],
    "Oui, il l'a su hier.": ["Oui, il l'ont su hier.", "Oui, il le saura hier.", "Oui, il le sait hier."],
  },
  "Elementary|Future|savoir": {
    "Oui, je saurai le faire.": ["Oui, je saurons le faire.", "Oui, j'ai su le faire.", "Oui, je savais le faire."],
    "Oui, je saurai demain matin.": ["Oui, je saurons demain matin.", "Oui, j'ai su demain matin.", "Oui, je savais demain matin."],
    "Ils le sauront vendredi.": ["Ils le saurez vendredi.", "Ils l'ont su vendredi.", "Ils le saura vendredi."],
  },
  "Elementary|Present|vouloir": {
    "Oui, nous voulons voir le directeur.": ["Oui, nous voulez voir le directeur.", "Oui, nous voudrons voir le directeur.", "Oui, nous veulent voir le directeur."],
    "Oui, je veux un café.": ["Oui, je voulons un café.", "Oui, j'ai voulu un café.", "Oui, je veulent un café."],
    "Non, il veut un chocolat chaud.": ["Non, il voulons un chocolat chaud.", "Non, il a voulu un chocolat chaud.", "Non, il veulent un chocolat chaud."],
  },
  "Elementary|Past|vouloir": {
    "Oui, j'ai voulu t'appeler.": ["Oui, je suis voulu t'appeler.", "Oui, j'avons voulu t'appeler.", "Oui, je voulons t'appeler."],
    "J'ai voulu voir le coucher du soleil.": ["Je suis voulu voir le coucher du soleil.", "J'avons voulu voir le coucher du soleil.", "Je voulons voir le coucher du soleil."],
    "Non, ils ont voulu rester.": ["Non, ils sont voulu rester.", "Non, ils voudront rester.", "Non, ils avons voulu rester."],
  },
  "Elementary|Future|vouloir": {
    "Oui, je voudrai partir tôt.": ["Oui, j'ai voulu partir tôt.", "Oui, je voudrons partir tôt.", "Oui, je veulent partir tôt."],
    "Je voudrai voir les musées.": ["J'ai voulu voir les musées.", "Je voudrons voir les musées.", "Je veulent voir les musées."],
    "Oui, elle voudra faire du shopping.": ["Oui, elle voudront faire du shopping.", "Oui, elle a voulu faire du shopping.", "Oui, elle veulent faire du shopping."],
  },
  "Elementary|Present|venir": {
    "Oui, je viens du bureau.": ["Oui, je viennent du bureau.", "Oui, je venons du bureau.", "Oui, je viendrai du bureau."],
    "Oui, je viens avec mon frère.": ["Oui, je viennent avec mon frère.", "Oui, je venons avec mon frère.", "Oui, je suis venu avec mon frère."],
    "Oui, ils viennent à huit heures.": ["Oui, ils vient à huit heures.", "Oui, ils venons à huit heures.", "Oui, ils sont venus à huit heures."],
  },
  "Elementary|Past|venir": {
    "Oui, je suis venu avec ma famille.": ["Oui, j'ai venu avec ma famille.", "Oui, je viendrai avec ma famille.", "Oui, je sont venu avec ma famille."],
    "Non, je suis venu en voiture.": ["Non, j'ai venu en voiture.", "Non, je viendrai en voiture.", "Non, je sommes venu en voiture."],
    "Oui, elle est venue avec moi.": ["Oui, elle a venu avec moi.", "Oui, elle viendra avec moi.", "Oui, elle sont venue avec moi."],
  },
  "Elementary|Future|venir": {
    "Oui, nous viendrons pour le dîner.": ["Oui, nous viendra pour le dîner.", "Oui, nous sommes venus pour le dîner.", "Oui, nous viennent pour le dîner."],
    "Oui, je viendrai le 24.": ["Oui, je viendront le 24.", "Oui, je suis venu le 24.", "Oui, je viennent le 24."],
    "Oui, ils viendront aussi.": ["Oui, ils viendra aussi.", "Oui, ils sont venus aussi.", "Oui, ils vient aussi."],
  },
  "Elementary|Present|pouvoir": {
    "Oui, nous pouvons commencer.": ["Oui, nous peuvent commencer.", "Oui, nous peux commencer.", "Oui, nous avons pu commencer."],
    "Oui, je peux t'aider.": ["Oui, je peuvent t'aider.", "Oui, j'ai pu t'aider.", "Oui, je pouvons t'aider."],
    "Non, ils ne peuvent pas venir aujourd'hui.": ["Non, ils ne peut pas venir aujourd'hui.", "Non, ils ne pouvez pas venir aujourd'hui.", "Non, ils ne pouvons pas venir aujourd'hui."],
  },
  "Elementary|Past|pouvoir": {
    "Oui, j'ai pu me reposer.": ["Oui, je suis pu me reposer.", "Oui, je pourrai me reposer.", "Oui, je peux me reposer."],
    "Oui, j'ai pu finir.": ["Oui, je suis pu finir.", "Oui, je pourrai finir.", "Oui, je peux finir."],
    "Non, elle n'a pas pu venir.": ["Non, elle n'est pas pu venir.", "Non, elle ne pourra pas venir.", "Non, elle n'ont pas pu venir."],
  },
  "Elementary|Future|pouvoir": {
    "Oui, je pourrai t'appeler.": ["Oui, j'ai pu t'appeler.", "Oui, je pourrons t'appeler.", "Oui, je peuvent t'appeler."],
    "Oui, je pourrai venir.": ["Oui, j'ai pu venir.", "Oui, je pourrons venir.", "Oui, je peuvent venir."],
    "Non, nous ne pourrons pas rester.": ["Non, nous ne pourra pas rester.", "Non, nous n'avons pas pu rester.", "Non, nous ne peuvent pas rester."],
  },
  "Elementary|Present|besoin": {
    "Oui, nous avons besoin d'eau.": ["Oui, nous sommes besoin d'eau.", "Oui, nous ont besoin d'eau.", "Oui, nous aurons besoin d'eau."],
    "Oui, j'ai besoin d'aide.": ["Oui, je suis besoin d'aide.", "Oui, j'aurai besoin d'aide.", "Oui, j'ai eu besoin d'aide."],
    "Il a besoin d'un marteau.": ["Il ont besoin d'un marteau.", "Il aura besoin d'un marteau.", "Il a eu besoin d'un marteau."],
  },
  "Elementary|Past|besoin": {
    "Oui, nous avons eu besoin d'eau.": ["Oui, nous sommes eu besoin d'eau.", "Oui, nous aurons besoin d'eau.", "Oui, nous avez eu besoin d'eau."],
    "Oui, j'ai eu besoin d'un médecin.": ["Oui, je suis eu besoin d'un médecin.", "Oui, j'aurai besoin d'un médecin.", "Oui, j'avons eu besoin d'un médecin."],
    "Non, ils n'en ont pas eu besoin.": ["Non, ils n'en sont pas eu besoin.", "Non, ils n'en auront pas besoin.", "Non, ils n'en avons pas eu besoin."],
  },
  "Elementary|Future|besoin": {
    "Oui, j'aurai besoin d'un livre.": ["Oui, j'ai eu besoin d'un livre.", "Oui, je serai besoin d'un livre.", "Oui, je suis besoin d'un livre."],
    "Oui, j'en aurai besoin le matin.": ["Oui, j'en ai eu besoin le matin.", "Oui, j'en serai besoin le matin.", "Oui, j'en suis besoin le matin."],
    "Non, il aura besoin du vélo.": ["Non, il a eu besoin du vélo.", "Non, il auront besoin du vélo.", "Non, il sera besoin du vélo."],
  },
  // ------------------------------------------------------------ Intermediate ---
  "Intermediate|Present|s'intéresser": {
    "Oui, elle s'intéresse à la science.": ["Oui, elle s'intéressera à la science.", "Oui, elle s'est intéressée à la science.", "Oui, elle s'intéressez à la science."],
    "Tu t'intéresses à la musique.": ["Tu t'intéresseras à la musique.", "Tu t'es intéressé à la musique.", "Tu t'intéressons à la musique."],
    "Oui, je m'intéresse beaucoup à l'histoire.": ["Oui, je m'intéresserai beaucoup à l'histoire.", "Oui, je me suis intéressé beaucoup à l'histoire.", "Oui, je m'intéressons beaucoup à l'histoire."],
    "Il s'intéresse à la musique.": ["Il s'intéressera à la musique.", "Il s'est intéressé à la musique.", "Il s'intéressez à la musique."],
  },
  "Intermediate|Past|s'intéresser": {
    "Est-ce qu'il s'est intéressé à la politique ?": ["Est-ce qu'il s'intéressera à la politique ?", "Est-ce qu'il se sont intéressé à la politique ?", "Est-ce qu'il se suis intéressé à la politique ?"],
    "Est-ce qu'elle s'est intéressée à la science ?": ["Est-ce qu'elle s'intéressera à la science ?", "Est-ce qu'elle se sont intéressée à la science ?", "Est-ce qu'elle se suis intéressée à la science ?"],
    "Je me suis intéressé au français en voyage.": ["Je s'est intéressé au français en voyage.", "Je m'intéresserai au français en voyage.", "Je me sont intéressé au français en voyage."],
    "Non, ils se sont intéressés à l'espagnol.": ["Non, ils s'est intéressés à l'espagnol.", "Non, ils s'intéresseront à l'espagnol.", "Non, ils se sommes intéressés à l'espagnol."],
  },
  "Intermediate|Future|s'intéresser": {
    "Oui, il s'intéressera au cinéma.": ["Oui, il s'intéresseront au cinéma.", "Oui, il s'est intéressé au cinéma.", "Oui, il s'intéressez au cinéma."],
    "Oui, je m'intéresserai aux sports.": ["Oui, je me suis intéressé aux sports.", "Oui, je m'intéresseront aux sports.", "Oui, je m'intéressons aux sports."],
    "Oui, je m'intéresserai au jardinage.": ["Oui, je me suis intéressé au jardinage.", "Oui, je m'intéresseront au jardinage.", "Oui, je m'intéressons au jardinage."],
    "Elle s'intéressera à la peinture.": ["Elle s'intéresseront à la peinture.", "Elle s'est intéressée à la peinture.", "Elle s'intéressez à la peinture."],
  },
  "Intermediate|Present|se débrouiller": {
    "Nous nous débrouillons ensemble.": ["Nous nous débrouillez ensemble.", "Nous nous débrouillerons ensemble.", "Nous nous sommes débrouillés ensemble."],
    "Non, il ne se débrouille pas sans aide.": ["Non, il ne se débrouillera pas sans aide.", "Non, il ne s'est pas débrouillé sans aide.", "Non, il ne se débrouillez pas sans aide."],
    "Oui, je me débrouille assez bien.": ["Oui, je me débrouillerai assez bien.", "Oui, je me suis débrouillé assez bien.", "Oui, je me débrouillons assez bien."],
    "Oui, elle se débrouille très bien.": ["Oui, elle se débrouillera très bien.", "Oui, elle s'est débrouillée très bien.", "Oui, elle se débrouillez très bien."],
  },
  "Intermediate|Past|se débrouiller": {
    "Oui, nous nous sommes bien débrouillés.": ["Oui, nous nous avons bien débrouillés.", "Oui, nous nous êtes bien débrouillés.", "Oui, nous nous sont bien débrouillés."],
    "Oui, elle s'est débrouillée toute seule.": ["Oui, elle se débrouillera toute seule.", "Oui, elle se sont débrouillée toute seule.", "Oui, elle se suis débrouillée toute seule."],
    "Oui, je me suis débrouillé tout seul.": ["Oui, je s'est débrouillé tout seul.", "Oui, je me débrouillerai tout seul.", "Oui, je me sont débrouillé tout seul."],
    "Oui, ils se sont débrouillés.": ["Oui, ils s'est débrouillés.", "Oui, ils se débrouilleront.", "Oui, ils se sommes débrouillés."],
  },
  "Intermediate|Future|se débrouiller": {
    "Oui, elle se débrouillera toute seule.": ["Oui, elle se débrouilleront toute seule.", "Oui, elle s'est débrouillée toute seule.", "Oui, elle se débrouillez toute seule."],
    "Oui, nous nous débrouillerons bien.": ["Oui, nous nous débrouillera bien.", "Oui, nous nous débrouillerez bien.", "Oui, nous nous débrouillent bien."],
    "Oui, je me débrouillerai.": ["Oui, je me suis débrouillé.", "Oui, je me débrouilleront.", "Oui, je me débrouillons."],
    "Oui, ils se débrouilleront avec des sandwichs.": ["Oui, ils se débrouillera avec des sandwichs.", "Oui, ils se sont débrouillés avec des sandwichs.", "Oui, ils se débrouillez avec des sandwichs."],
  },
  "Intermediate|Present|s'ennuyer": {
    "Non, nous ne nous ennuyons pas.": ["Non, nous ne nous ennuyez pas.", "Non, nous ne nous ennuierons pas.", "Non, nous ne nous sommes pas ennuyés."],
    "Oui, elle s'ennuie.": ["Oui, elle s'ennuiera.", "Oui, elle s'est ennuyée.", "Oui, elle s'ennuyons."],
    "Non, je ne m'ennuie jamais.": ["Non, je ne m'ennuierai jamais.", "Non, je ne m'ennuyez jamais.", "Non, je ne m'ennuyons jamais."],
    "Oui, il s'ennuie un peu.": ["Oui, il s'ennuiera un peu.", "Oui, il s'ennuyons un peu.", "Oui, il s'est ennuyé un peu."],
  },
  "Intermediate|Past|s'ennuyer": {
    "Oui, ils se sont ennuyés.": ["Oui, ils s'est ennuyés.", "Oui, ils s'ennuieront.", "Oui, ils se sommes ennuyés."],
    "Non, il ne s'est pas ennuyé.": ["Non, il ne se sont pas ennuyé.", "Non, il ne s'ennuiera pas.", "Non, il ne se suis pas ennuyé."],
    "Non, je ne me suis pas ennuyé.": ["Non, je ne m'ai pas ennuyé.", "Non, je ne me sommes pas ennuyé.", "Non, je ne m'ennuierai pas."],
    "Oui, elle s'est ennuyée un peu.": ["Oui, elle se sont ennuyée un peu.", "Oui, elle s'ennuiera un peu.", "Oui, elle se suis ennuyée un peu."],
  },
  "Intermediate|Future|s'ennuyer": {
    "Non, elle ne s'ennuiera pas.": ["Non, elle ne s'ennuyez pas.", "Non, elle ne s'est pas ennuyée.", "Non, elle ne s'ennuieront pas."],
    "Oui, ils s'ennuieront.": ["Oui, ils s'ennuiera.", "Oui, ils s'ennuierez.", "Oui, ils se sont ennuyés."],
    "Non, je ne m'ennuierai pas avec un bon livre.": ["Non, je ne m'ennuierons pas avec un bon livre.", "Non, je ne me suis pas ennuyé avec un bon livre.", "Non, je ne m'ennuient pas avec un bon livre."],
    "Non, il ne s'ennuiera pas avec sa tablette.": ["Non, il ne s'ennuieront pas avec sa tablette.", "Non, il ne s'est pas ennuyé avec sa tablette.", "Non, il ne s'ennuyait pas avec sa tablette."],
  },
  "Intermediate|Present|s'entraîner": {
    "Oui, nous nous entraînons.": ["Oui, nous nous entraînez.", "Oui, nous nous entraînerons.", "Oui, nous nous sommes entraînés."],
    "Non, ils ne s'entraînent pas.": ["Non, ils ne s'entraînons pas.", "Non, ils ne s'entraîneront pas.", "Non, ils ne se sont pas entraînés."],
    "Oui, je m'entraîne trois fois par semaine.": ["Oui, je m'entraînons trois fois par semaine.", "Oui, je m'entraînerai trois fois par semaine.", "Oui, je m'entraînez trois fois par semaine."],
    "Non, elle s'entraîne le mercredi.": ["Non, elle s'entraînez le mercredi.", "Non, elle s'entraînons le mercredi.", "Non, elle s'est entraînée le mercredi."],
  },
  "Intermediate|Past|s'entraîner": {
    "Oui, ils se sont entraînés.": ["Oui, ils s'est entraînés.", "Oui, ils s'entraîneront.", "Oui, ils se sommes entraînés."],
    "Non, il ne s'est pas entraîné.": ["Non, il ne se sont pas entraîné.", "Non, il ne s'entraînera pas.", "Non, il ne se suis pas entraîné."],
    "Oui, je me suis entraîné tous les jours.": ["Oui, je m'ai entraîné tous les jours.", "Oui, je me sommes entraîné tous les jours.", "Oui, je m'entraînerai tous les jours."],
    "Oui, nous nous sommes entraînés ensemble.": ["Oui, nous nous êtes entraînés ensemble.", "Oui, nous nous entraînerons ensemble.", "Oui, nous nous avons entraînés ensemble."],
  },
  "Intermediate|Future|s'entraîner": {
    "Oui, nous nous entraînerons.": ["Oui, nous nous sommes entraînés.", "Oui, nous nous entraînerez.", "Oui, nous nous entraînera."],
    "Non, elle ne s'entraînera pas.": ["Non, elle ne s'entraîneront pas.", "Non, elle ne s'est pas entraînée.", "Non, elle ne s'entraînait pas."],
    "Oui, je m'entraînerai tous les soirs.": ["Oui, je m'entraînerons tous les soirs.", "Oui, je me suis entraîné tous les soirs.", "Oui, je m'entraînent tous les soirs."],
    "Oui, ils s'entraîneront avec moi.": ["Oui, ils s'entraînera avec moi.", "Oui, ils se sont entraînés avec moi.", "Oui, ils s'entraînons avec moi."],
  },
  "Intermediate|Present|se souvenir": {
    "Oui, nous nous souvenons.": ["Oui, nous nous souvenez.", "Oui, nous nous souviendrons.", "Oui, nous nous sommes souvenus."],
    "Non, il ne se souvient pas.": ["Non, il ne se souviennent pas.", "Non, il ne se souviendra pas.", "Non, il ne s'est pas souvenu."],
    "Oui, je m'en souviens très bien.": ["Oui, je m'en souvenons très bien.", "Oui, je m'en souviendrai très bien.", "Oui, je m'en suis souvenu très bien."],
    "Oui, elle s'en souvient.": ["Oui, elle s'en souviennent.", "Oui, elle s'en souviendra.", "Oui, elle s'en souvenons."],
  },
  "Intermediate|Past|se souvenir": {
    "Oui, elle s'est souvenue.": ["Oui, elle se sont souvenue.", "Oui, elle se souviendra.", "Oui, elle se suis souvenue."],
    "Non, ils ne se sont pas souvenus.": ["Non, ils ne s'est pas souvenus.", "Non, ils ne se souviendront pas.", "Non, ils ne se sommes pas souvenus."],
    "Oui, je m'en suis souvenu à temps.": ["Oui, je m'en ai souvenu à temps.", "Oui, je m'en souviendrai à temps.", "Oui, je m'en sommes souvenu à temps."],
    "Non, il ne s'en est pas souvenu.": ["Non, il ne s'en sont pas souvenu.", "Non, il ne s'en souviendra pas.", "Non, il ne s'en a pas souvenu."],
  },
  "Intermediate|Future|se souvenir": {
    "Oui, elle se souviendra.": ["Oui, elle se souviendront.", "Oui, elle s'est souvenue.", "Oui, elle se souvenait."],
    "Non, il ne se souviendra pas.": ["Non, il ne se souviendront pas.", "Non, il ne s'est pas souvenu.", "Non, il ne se souvenait pas."],
    "Oui, je m'en souviendrai toujours.": ["Oui, je m'en souviendrons toujours.", "Oui, je m'en suis souvenu toujours.", "Oui, je m'en souviennent toujours."],
    "Oui, ils s'en souviendront aussi.": ["Oui, ils s'en souviendra aussi.", "Oui, ils s'en sont souvenus aussi.", "Oui, ils s'en souvenons aussi."],
  },
  "Intermediate|Present|s'adapter": {
    "Oui, nous nous adaptons.": ["Oui, nous nous adaptez.", "Oui, nous nous adapterons.", "Oui, nous nous adapte."],
    "Non, il ne s'adapte pas.": ["Non, il ne s'adaptons pas.", "Non, il ne s'adaptera pas.", "Non, il ne s'adaptez pas."],
    "Oui, je m'adapte bien.": ["Oui, je m'adaptons bien.", "Oui, je m'adapterai bien.", "Oui, je m'adaptez bien."],
    "Oui, ils s'adaptent très vite.": ["Oui, ils s'adaptons très vite.", "Oui, ils s'adapteront très vite.", "Oui, ils s'adaptez très vite."],
  },
  "Intermediate|Past|s'adapter": {
    "Oui, ils se sont adaptés.": ["Oui, ils s'est adaptés.", "Oui, ils s'adapteront.", "Oui, ils se sommes adaptés."],
    "Non, il ne s'est pas adapté.": ["Non, il ne se sont pas adapté.", "Non, il ne s'adaptera pas.", "Non, il ne s'adaptons pas."],
    "Oui, je me suis vite adapté.": ["Oui, je m'ai vite adapté.", "Oui, je me sommes vite adapté.", "Oui, je me serai vite adapté."],
    "Oui, elle s'est adaptée sans problème.": ["Oui, elle se sont adaptée sans problème.", "Oui, elle s'adaptera sans problème.", "Oui, elle se suis adaptée sans problème."],
  },
  "Intermediate|Future|s'adapter": {
    "Oui, nous nous adapterons.": ["Oui, nous nous adaptera.", "Oui, nous nous adapterez.", "Oui, nous nous sommes adaptés."],
    "Non, il ne s'adaptera pas.": ["Non, il ne s'adapteront pas.", "Non, il ne s'est pas adapté.", "Non, il ne s'adaptons pas."],
    "Oui, je m'adapterai facilement.": ["Oui, je m'adapterons facilement.", "Oui, je me suis adapté facilement.", "Oui, je s'adaptera facilement."],
    "Non, elles ne s'adapteront pas.": ["Non, elles ne s'adaptera pas.", "Non, elles ne se sont pas adaptées.", "Non, elles ne s'adaptons pas."],
  },
  "Intermediate|Present|se réjouir": {
    "Oui, nous nous réjouissons.": ["Oui, nous nous réjouissez.", "Oui, nous nous sommes réjouis.", "Oui, nous nous réjouit."],
    "Non, il ne se réjouit pas.": ["Non, il ne se réjouissent pas.", "Non, il ne se réjouira pas.", "Non, il ne se réjouissons pas."],
    "Oui, je me réjouis beaucoup.": ["Oui, je me réjouissons beaucoup.", "Oui, je me réjouirai beaucoup.", "Oui, je me réjouissez beaucoup."],
    "Oui, ils se réjouissent de voir la mer.": ["Oui, ils se réjouit de voir la mer.", "Oui, ils se sont réjouis de voir la mer.", "Oui, ils se réjouissons de voir la mer."],
  },
  "Intermediate|Past|se réjouir": {
    "Oui, elle s'est réjouie.": ["Oui, elle se sont réjouie.", "Oui, elle se réjouira.", "Oui, elle s'a réjouie."],
    "Non, il ne s'est pas réjoui.": ["Non, il ne se sont pas réjoui.", "Non, il ne se réjouira pas.", "Non, il ne s'a pas réjoui."],
    "Oui, je me suis beaucoup réjoui.": ["Oui, je m'ai beaucoup réjoui.", "Oui, je me sommes beaucoup réjoui.", "Oui, je me serai beaucoup réjoui."],
    "Oui, ils se sont réjouis avec nous.": ["Oui, ils s'est réjouis avec nous.", "Oui, ils se réjouiront avec nous.", "Oui, ils se sommes réjouis avec nous."],
  },
  "Intermediate|Future|se réjouir": {
    "Oui, nous nous réjouirons.": ["Oui, nous nous réjouira.", "Oui, nous nous réjouirez.", "Oui, nous nous sommes réjouis."],
    "Oui, ils se réjouiront.": ["Oui, ils se réjouissons.", "Oui, ils se sont réjouis.", "Oui, ils se réjouira."],
    "Oui, je me réjouirai de le revoir.": ["Oui, je me réjouissons de le revoir.", "Oui, je me suis réjoui de le revoir.", "Oui, je me réjouirons de le revoir."],
    "Oui, elle se réjouira beaucoup.": ["Oui, elle se réjouirez beaucoup.", "Oui, elle se réjouissait beaucoup.", "Oui, elle se réjouiront beaucoup."],
  },
  "Intermediate|Present|mettre": {
    "Je mets mes clés sur la table.": ["Je mettez mes clés sur la table.", "Je mettrons mes clés sur la table.", "Je mettons mes clés sur la table."],
    "Oui, je mets toujours mon téléphone en silencieux.": ["Oui, je mettais toujours mon téléphone en silencieux.", "Oui, je mettons toujours mon téléphone en silencieux.", "Oui, je mettrai toujours mon téléphone en silencieux."],
    "Oui, je mets mon manteau bleu.": ["Oui, je mettons mon manteau bleu.", "Oui, je mettez mon manteau bleu.", "Oui, je suis mis mon manteau bleu."],
    "Il met un pull et une écharpe.": ["Il mettez un pull et une écharpe.", "Il mettons un pull et une écharpe.", "Il mettait un pull et une écharpe."],
  },
  "Intermediate|Past|mettre": {
    "Nous avons mis nos manteaux dans le couloir.": ["Nous sommes mis nos manteaux dans le couloir.", "Nous mettrons nos manteaux dans le couloir.", "Nous avez mis nos manteaux dans le couloir."],
    "Oui, il a mis une écharpe pour sortir.": ["Oui, il est mis une écharpe pour sortir.", "Oui, il mettra une écharpe pour sortir.", "Oui, il ont mis une écharpe pour sortir."],
    "J'ai mis les clés sur la table.": ["Je suis mis les clés sur la table.", "Je mettrai les clés sur la table.", "Je mets les clés sur la table."],
    "Elle l'a mis dans le placard.": ["Elle le mettra dans le placard.", "Elle l'est mis dans le placard.", "Elle l'ont mis dans le placard."],
  },
  "Intermediate|Future|mettre": {
    "Oui, je mettrai toujours des épices dans ce plat.": ["Oui, je mettrons toujours des épices dans ce plat.", "Oui, je mettais toujours des épices dans ce plat.", "Oui, je mettez toujours des épices dans ce plat."],
    "Oui, il mettra ses chaussures avant de sortir.": ["Oui, il a mis ses chaussures avant de sortir.", "Oui, il mettrons ses chaussures avant de sortir.", "Oui, il mettait ses chaussures avant de sortir."],
    "Oui, je mettrai la table.": ["Oui, je mettons la table.", "Oui, je mettez la table.", "Oui, je mettais la table."],
    "Il mettra six assiettes.": ["Il a mis six assiettes.", "Il mettons six assiettes.", "Il mettait six assiettes."],
  },
  "Intermediate|Present|trouver": {
    "Oui, je trouve ça facile de parler français.": ["Oui, je trouvez ça facile de parler français.", "Oui, je trouvons ça facile de parler français.", "Oui, je trouverai ça facile de parler français."],
    "Non, je trouve rarement de l'argent par terre.": ["Non, je trouvons rarement de l'argent par terre.", "Non, je trouvez rarement de l'argent par terre.", "Non, je trouverai rarement de l'argent par terre."],
    "Oui, je le trouve très intéressant.": ["Oui, je le trouvons très intéressant.", "Oui, je le trouvez très intéressant.", "Oui, je le trouverai très intéressant."],
    "Elle le trouve un peu long.": ["Elle le trouvons un peu long.", "Elle le trouvez un peu long.", "Elle le trouvera un peu long."],
  },
  "Intermediate|Past|trouver": {
    "Oui, j'ai trouvé un excellent restaurant hier soir.": ["Oui, je suis trouvé un excellent restaurant hier soir.", "Oui, je trouverai un excellent restaurant hier soir.", "Oui, je trouve un excellent restaurant hier soir."],
    "Oui, nous avons trouvé une idée originale.": ["Oui, nous sommes trouvé une idée originale.", "Oui, nous trouverons une idée originale.", "Oui, nous avez trouvé une idée originale."],
    "Oui, j'ai trouvé mon portefeuille sous le lit.": ["Oui, je suis trouvé mon portefeuille sous le lit.", "Oui, je trouverai mon portefeuille sous le lit.", "Oui, je trouve mon portefeuille sous le lit."],
    "Non, elle ne les a pas trouvées.": ["Non, elle ne les est pas trouvées.", "Non, elle ne les trouvera pas.", "Non, elle ne les ont pas trouvées."],
  },
  "Intermediate|Future|trouver": {
    "Oui, elle trouvera un taxi demain matin.": ["Oui, elle a trouvé un taxi demain matin.", "Oui, elle trouvons un taxi demain matin.", "Oui, elle trouveront un taxi demain matin."],
    "Oui, nous trouverons cette rue facilement.": ["Oui, nous avons trouvé cette rue facilement.", "Oui, nous trouvera cette rue facilement.", "Oui, nous trouvez cette rue facilement."],
    "Oui, je trouverai un petit appartement.": ["Oui, je trouvons un petit appartement.", "Oui, je trouvais un petit appartement.", "Oui, je suis trouvé un petit appartement."],
    "Oui, ils trouveront du travail facilement.": ["Oui, ils sont trouvé du travail facilement.", "Oui, ils trouverez du travail facilement.", "Oui, ils trouvaient du travail facilement."],
  },
  "Intermediate|Present|croire": {
    "Oui, je crois en mes amis.": ["Oui, je croyons en mes amis.", "Oui, je croirai en mes amis.", "Oui, j'ai cru en mes amis."],
    "Oui, je crois tout ce que tu dis.": ["Oui, je croyez tout ce que tu dis.", "Oui, je croirai tout ce que tu dis.", "Oui, je croyons tout ce que tu dis."],
    "Non, je ne crois pas aux fantômes.": ["Non, je ne croyons pas aux fantômes.", "Non, je ne croyez pas aux fantômes.", "Non, je ne croirai pas aux fantômes."],
    "Oui, elle y croit un peu.": ["Oui, elle y croyons un peu.", "Oui, elle y croira un peu.", "Oui, elle y a cru un peu."],
  },
  "Intermediate|Past|croire": {
    "Oui, nous avons cru en ce projet.": ["Oui, nous sommes cru en ce projet.", "Oui, nous croirons en ce projet.", "Oui, nous avez cru en ce projet."],
    "Oui, j'ai cru en mes amis cette fois-là.": ["Oui, je suis cru en mes amis cette fois-là.", "Oui, je croirai en mes amis cette fois-là.", "Oui, je crois en mes amis cette fois-là."],
    "Non, je n'ai pas cru son histoire.": ["Non, je ne suis pas cru son histoire.", "Non, je ne croirai pas son histoire.", "Non, je n'avons pas cru son histoire."],
    "Oui, il l'a crue tout de suite.": ["Oui, il la croira tout de suite.", "Oui, il l'ont crue tout de suite.", "Oui, il la croit tout de suite."],
  },
  "Intermediate|Future|croire": {
    "Oui, je croirai tout ce que tu dis.": ["Oui, je croirons tout ce que tu dis.", "Oui, j'ai cru tout ce que tu dis.", "Oui, je croyais tout ce que tu dis."],
    "Oui, nous croirons en l'avenir.": ["Oui, nous avons cru en l'avenir.", "Oui, nous croira en l'avenir.", "Oui, nous croyez en l'avenir."],
    "Oui, ils me croiront.": ["Oui, ils m'ont cru.", "Oui, ils me croirez.", "Oui, ils me croyaient."],
    "Non, il ne me croira jamais.": ["Non, il ne me croirons jamais.", "Non, il ne me croyait jamais.", "Non, il ne me croirez jamais."],
  },
  "Intermediate|Present|parler": {
    "Oui, je parle souvent avec ma sœur.": ["Oui, je parlons souvent avec ma sœur.", "Oui, je parlerai souvent avec ma sœur.", "Oui, je parlez souvent avec ma sœur."],
    "Non, nous parlons rarement pendant le film.": ["Non, nous parlez rarement pendant le film.", "Non, nous parlerons rarement pendant le film.", "Non, nous parlerez rarement pendant le film."],
    "Je parle anglais et un peu français.": ["Je parlons anglais et un peu français.", "Je parlerai anglais et un peu français.", "J'ai parlé anglais et un peu français."],
    "Non, ils parlent seulement français.": ["Non, ils ont parlé seulement français.", "Non, ils parleront seulement français.", "Non, ils parlez seulement français."],
  },
  "Intermediate|Past|parler": {
    "Oui, j'ai parlé avec ma sœur ce matin.": ["Oui, je suis parlé avec ma sœur ce matin.", "Oui, je parlerai avec ma sœur ce matin.", "Oui, je parle avec ma sœur ce matin."],
    "Oui, nous avons parlé avec le directeur hier.": ["Oui, nous sommes parlé avec le directeur hier.", "Oui, nous parlerons avec le directeur hier.", "Oui, nous avez parlé avec le directeur hier."],
    "Oui, je lui ai parlé ce matin.": ["Oui, je lui suis parlé ce matin.", "Oui, je lui parlerai ce matin.", "Oui, je lui avons parlé ce matin."],
    "Non, elle ne lui a pas encore parlé.": ["Non, elle ne lui est pas encore parlé.", "Non, elle ne lui ont pas encore parlé.", "Non, elle ne lui parlera pas encore."],
  },
  "Intermediate|Future|parler": {
    "Oui, je parlerai avec mes voisins demain.": ["Oui, j'ai parlé avec mes voisins demain.", "Oui, je parlerons avec mes voisins demain.", "Oui, je parlais avec mes voisins demain."],
    "Oui, nous parlerons français à la réunion demain.": ["Oui, nous avons parlé français à la réunion demain.", "Oui, nous parlerez français à la réunion demain.", "Oui, nous parlait français à la réunion demain."],
    "Oui, je lui parlerai demain matin.": ["Oui, je lui ai parlé demain matin.", "Oui, je lui parlerons demain matin.", "Oui, je lui parlais demain matin."],
    "Oui, nous lui parlerons ensemble.": ["Oui, nous lui avons parlé ensemble.", "Oui, nous lui parlerez ensemble.", "Oui, nous lui parlait ensemble."],
  },
  "Intermediate|Present|prendre": {
    "Oui, je prends une douche tous les matins.": ["Oui, je prenons une douche tous les matins.", "Oui, je prendrai une douche tous les matins.", "Oui, j'ai pris une douche tous les matins."],
    "Non, nous ne prenons pas la voiture aujourd'hui.": ["Non, nous ne prenez pas la voiture aujourd'hui.", "Non, nous ne prendront pas la voiture aujourd'hui.", "Non, nous ne prennent pas la voiture aujourd'hui."],
    "Non, je prends le métro.": ["Non, je prenons le métro.", "Non, je prenez le métro.", "Non, je prennent le métro."],
    "Non, elle prend son vélo.": ["Non, elle prennent son vélo.", "Non, elle prenons son vélo.", "Non, elle prenez son vélo."],
  },
  "Intermediate|Past|prendre": {
    "Non, je n'ai pas pris de sucre dans mon café.": ["Non, je ne suis pas pris de sucre dans mon café.", "Non, je ne prendrai pas de sucre dans mon café.", "Non, je n'avons pas pris de sucre dans mon café."],
    "Non, nous avons pris les escaliers au lieu de l'ascenseur.": ["Non, nous sommes pris les escaliers au lieu de l'ascenseur.", "Non, nous prendrons les escaliers au lieu de l'ascenseur.", "Non, nous avez pris les escaliers au lieu de l'ascenseur."],
    "J'ai pris le poisson.": ["Je suis pris le poisson.", "Je prendrai le poisson.", "Je prends le poisson."],
    "Il a pris un steak frites.": ["Il est pris un steak frites.", "Il prendra un steak frites.", "Il ont pris un steak frites."],
  },
  "Intermediate|Future|prendre": {
    "Oui, je prendrai le bus pour aller au travail.": ["Oui, je prendrons le bus pour aller au travail.", "Oui, j'ai pris le bus pour aller au travail.", "Oui, je prenais le bus pour aller au travail."],
    "Oui, nous prendrons une longue pause après le déjeuner.": ["Oui, nous prendrez une longue pause après le déjeuner.", "Oui, nous avons pris une longue pause après le déjeuner.", "Oui, nous prendra une longue pause après le déjeuner."],
    "Oui, je prendrai deux semaines en août.": ["Oui, je prendrons deux semaines en août.", "Oui, j'ai pris deux semaines en août.", "Oui, je prenais deux semaines en août."],
    "Non, elle ne prendra pas de vacances cette année.": ["Non, elle ne prendrons pas de vacances cette année.", "Non, elle ne prendrez pas de vacances cette année.", "Non, elle n'a pas pris de vacances cette année."],
  },
  "Intermediate|Present|lire": {
    "Non, je ne lis pas de romans d'horreur.": ["Non, je ne lisons pas de romans d'horreur.", "Non, je ne lirai pas de romans d'horreur.", "Non, je ne lisez pas de romans d'horreur."],
    "Oui, nous lisons le même livre.": ["Oui, nous lisez le même livre.", "Oui, nous lirons le même livre.", "Oui, nous avons lu le même livre."],
    "Oui, je lis le journal en ligne.": ["Oui, je lisons le journal en ligne.", "Oui, je lirai le journal en ligne.", "Oui, je lisez le journal en ligne."],
    "Oui, il lit le journal papier.": ["Oui, il lisent le journal papier.", "Oui, il lira le journal papier.", "Oui, il lisons le journal papier."],
  },
  "Intermediate|Past|lire": {
    "Non, je n'ai pas lu la biographie.": ["Non, je ne suis pas lu la biographie.", "Non, je ne lirai pas la biographie.", "Non, je ne lis pas la biographie."],
    "Oui, nous avons lu le même article hier.": ["Oui, nous sommes lu le même article hier.", "Oui, nous lirons le même article hier.", "Oui, nous avez lu le même article hier."],
    "Oui, je l'ai lu en deux jours.": ["Oui, je l'avons lu en deux jours.", "Oui, je le lirai en deux jours.", "Oui, je le lis en deux jours."],
    "Non, elle ne l'a pas encore lu.": ["Non, elle ne l'est pas encore lu.", "Non, elle ne l'ont pas encore lu.", "Non, elle ne l'avons pas encore lu."],
  },
  "Intermediate|Future|lire": {
    "Oui, je lirai ce livre le mois prochain.": ["Oui, je lirons ce livre le mois prochain.", "Oui, j'ai lu ce livre le mois prochain.", "Oui, je lisais ce livre le mois prochain."],
    "Non, je ne lirai pas de romans d'horreur.": ["Non, je ne lirons pas de romans d'horreur.", "Non, je n'ai pas lu de romans d'horreur.", "Non, je ne lisais pas de romans d'horreur."],
    "Oui, je leur lirai une histoire.": ["Oui, je leur lirons une histoire.", "Oui, je leur ai lu une histoire.", "Oui, je leur lisais une histoire."],
    "Oui, il leur lira un conte.": ["Oui, il leur liront un conte.", "Oui, il leur a lu un conte.", "Oui, il leur lisait un conte."],
  },
  "Intermediate|Present|écrire": {
    "Non, je n'écris rien avant le petit déjeuner.": ["Non, je n'écrivons rien avant le petit déjeuner.", "Non, je n'écrirai rien avant le petit déjeuner.", "Non, je n'écrivez rien avant le petit déjeuner."],
    "Oui, nous écrivons des dissertations pour la classe.": ["Oui, nous écrivez des dissertations pour la classe.", "Oui, nous écrirons des dissertations pour la classe.", "Oui, nous écrira des dissertations pour la classe."],
    "Oui, j'écris à ma famille chaque semaine.": ["Oui, j'écrirai à ma famille chaque semaine.", "Oui, j'écrivais à ma famille chaque semaine.", "Oui, j'écrivons à ma famille chaque semaine."],
    "Non, il n'écrit jamais.": ["Non, il n'écrivent jamais.", "Non, il n'écrivez jamais.", "Non, il n'écrivons jamais."],
  },
  "Intermediate|Past|écrire": {
    "Oui, j'ai écrit mon nom sur le formulaire.": ["Oui, je suis écrit mon nom sur le formulaire.", "Oui, j'écrirai mon nom sur le formulaire.", "Oui, j'écrivais mon nom sur le formulaire."],
    "Oui, nous avons écrit en français.": ["Oui, nous sommes écrit en français.", "Oui, nous écrirons en français.", "Oui, nous avez écrit en français."],
    "Oui, j'ai écrit ma lettre hier soir.": ["Oui, je suis écrit ma lettre hier soir.", "Oui, j'écrirai ma lettre hier soir.", "Oui, j'écrivez ma lettre hier soir."],
    "Oui, elle l'a écrit aussi.": ["Oui, elle l'est écrit aussi.", "Oui, elle l'écrira aussi.", "Oui, elle l'ont écrit aussi."],
  },
  "Intermediate|Future|écrire": {
    "Oui, j'écrirai mon nom sur le formulaire.": ["Oui, j'ai écrit mon nom sur le formulaire.", "Oui, j'écrivais mon nom sur le formulaire.", "Oui, j'écrirons mon nom sur le formulaire."],
    "Oui, nous écrirons en français.": ["Oui, nous avons écrit en français.", "Oui, nous écrirez en français.", "Oui, nous écrivions en français."],
    "Oui, je t'écrirai tous les jours.": ["Oui, je t'écrirons tous les jours.", "Oui, je t'ai écrit tous les jours.", "Oui, je t'écrivais tous les jours."],
    "Oui, ils t'écriront une carte postale.": ["Oui, ils t'ont écrit une carte postale.", "Oui, ils t'écrivaient une carte postale.", "Oui, ils t'écrira une carte postale."],
  },
  "Intermediate|Present|ouvrir": {
    "Oui, j'ouvre les cadeaux le jour de mon anniversaire.": ["Oui, j'ouvrons les cadeaux le jour de mon anniversaire.", "Oui, j'ai ouvert les cadeaux le jour de mon anniversaire.", "Oui, j'ouvrais les cadeaux le jour de mon anniversaire."],
    "Oui, nous ouvrons le magasin à neuf heures.": ["Oui, nous ouvrez le magasin à neuf heures.", "Oui, nous ouvrirons le magasin à neuf heures.", "Oui, nous avons ouvert le magasin à neuf heures."],
    "Oui, j'ouvre la fenêtre.": ["Oui, j'ouvrons la fenêtre.", "Oui, j'ouvrais la fenêtre.", "Oui, j'ouvrez la fenêtre."],
    "Oui, il ouvre la porte.": ["Oui, il ouvrons la porte.", "Oui, il ouvrez la porte.", "Oui, il est ouvert la porte."],
  },
  "Intermediate|Past|ouvrir": {
    "Non, je n'ai pas ouvert les fenêtres la nuit.": ["Non, je ne suis pas ouvert les fenêtres la nuit.", "Non, je n'ouvrirai pas les fenêtres la nuit.", "Non, je n'ouvre pas les fenêtres la nuit."],
    "Oui, nous avons ouvert le magasin à neuf heures.": ["Oui, nous sommes ouvert le magasin à neuf heures.", "Oui, nous ouvrirons le magasin à neuf heures.", "Oui, nous avez ouvert le magasin à neuf heures."],
    "Oui, j'ai ouvert tous mes cadeaux.": ["Oui, je suis ouvert tous mes cadeaux.", "Oui, j'ouvrirai tous mes cadeaux.", "Oui, j'ouvre tous mes cadeaux."],
    "Non, elle ne les a pas encore ouverts.": ["Non, elle ne les est pas encore ouverts.", "Non, elle ne les ont pas encore ouverts.", "Non, elle ne les avons pas encore ouverts."],
  },
  "Intermediate|Future|ouvrir": {
    "Oui, j'ouvrirai les cadeaux le jour de mon anniversaire.": ["Oui, j'ai ouvert les cadeaux le jour de mon anniversaire.", "Oui, j'ouvrais les cadeaux le jour de mon anniversaire.", "Oui, j'ouvrirons les cadeaux le jour de mon anniversaire."],
    "Non, je n'ouvrirai pas les fenêtres la nuit.": ["Non, je n'ai pas ouvert les fenêtres la nuit.", "Non, je n'ouvrais pas les fenêtres la nuit.", "Non, je n'ouvrirons pas les fenêtres la nuit."],
    "Non, je n'ouvrirai pas dimanche.": ["Non, je n'ai pas ouvert dimanche.", "Non, je n'ouvrais pas dimanche.", "Non, je n'ouvrirons pas dimanche."],
    "Oui, elle ouvrira le matin.": ["Oui, elle a ouvert le matin.", "Oui, elle ouvrait le matin.", "Oui, elle ouvriront le matin."],
  },
  "Intermediate|Present|fermer": {
    "Non, je ne ferme pas le dossier avant de sauvegarder.": ["Non, je ne fermons pas le dossier avant de sauvegarder.", "Non, je ne fermerai pas le dossier avant de sauvegarder.", "Non, je ne fermez pas le dossier avant de sauvegarder."],
    "Oui, nous fermons le magasin à 21 heures.": ["Oui, nous fermez le magasin à 21 heures.", "Oui, nous fermerons le magasin à 21 heures.", "Oui, nous fermera le magasin à 21 heures."],
    "Oui, je ferme toujours la porte à clé.": ["Oui, je fermons toujours la porte à clé.", "Oui, je fermerai toujours la porte à clé.", "Oui, je fermais toujours la porte à clé."],
    "Non, ils ne la ferment jamais.": ["Non, ils ne la fermons jamais.", "Non, ils ne la fermez jamais.", "Non, ils ne la fermait jamais."],
  },
  "Intermediate|Past|fermer": {
    "Non, je n'ai pas fermé le dossier avant de sauvegarder.": ["Non, je ne suis pas fermé le dossier avant de sauvegarder.", "Non, je ne fermerai pas le dossier avant de sauvegarder.", "Non, je ne ferme pas le dossier avant de sauvegarder."],
    "Oui, nous avons fermé la porte avant de partir.": ["Oui, nous sommes fermé la porte avant de partir.", "Oui, nous fermerons la porte avant de partir.", "Oui, nous avez fermé la porte avant de partir."],
    "Oui, j'ai fermé le gaz.": ["Oui, je suis fermé le gaz.", "Oui, je fermerai le gaz.", "Oui, je ferme le gaz."],
    "Oui, il les a toutes fermées.": ["Oui, il les est toutes fermées.", "Oui, il les ont toutes fermées.", "Oui, il les fermera toutes."],
  },
  "Intermediate|Future|fermer": {
    "Non, je ne fermerai pas le dossier avant de sauvegarder.": ["Non, je n'ai pas fermé le dossier avant de sauvegarder.", "Non, je ne fermais pas le dossier avant de sauvegarder.", "Non, je ne fermerons pas le dossier avant de sauvegarder."],
    "Oui, nous fermerons la porte avant de partir.": ["Oui, nous avons fermé la porte avant de partir.", "Oui, nous fermerez la porte avant de partir.", "Oui, nous fermera la porte avant de partir."],
    "Je fermerai le bureau à dix-huit heures.": ["J'ai fermé le bureau à dix-huit heures.", "Je fermais le bureau à dix-huit heures.", "Je fermerons le bureau à dix-huit heures."],
    "Elle fermera à dix-sept heures.": ["Elle a fermé à dix-sept heures.", "Elle fermait à dix-sept heures.", "Elle fermeront à dix-sept heures."],
  },
  "Intermediate|Present|perdre": {
    "Oui, je perds mon chemin parfois.": ["Oui, je perdons mon chemin parfois.", "Oui, je perdrai mon chemin parfois.", "Oui, je perdez mon chemin parfois."],
    "Non, je ne perds pas espoir.": ["Non, je ne perdrai pas espoir.", "Non, je ne perdons pas espoir.", "Non, je ne perdez pas espoir."],
    "Oui, je perds mes clés tout le temps.": ["Oui, je perdons mes clés tout le temps.", "Oui, je perdrai mes clés tout le temps.", "Oui, je perdez mes clés tout le temps."],
    "Oui, il perd ses lunettes chaque jour.": ["Oui, il perdons ses lunettes chaque jour.", "Oui, il perdra ses lunettes chaque jour.", "Oui, il perdez ses lunettes chaque jour."],
  },
  "Intermediate|Past|perdre": {
    "Oui, j'ai perdu mes lunettes hier.": ["Oui, je suis perdu mes lunettes hier.", "Oui, je perdrai mes lunettes hier.", "Oui, je perds mes lunettes hier."],
    "Oui, j'ai perdu mon chemin hier soir.": ["Oui, je suis perdu mon chemin hier soir.", "Oui, je perdrai mon chemin hier soir.", "Oui, je perdons mon chemin hier soir."],
    "Oui, nous avons perdu trois à un.": ["Oui, nous sommes perdu trois à un.", "Oui, nous avez perdu trois à un.", "Oui, nous perdrons trois à un."],
    "Non, elle n'a pas perdu.": ["Non, elle n'est pas perdu.", "Non, elle ne perdra pas.", "Non, elle n'ont pas perdu."],
  },
  "Intermediate|Future|perdre": {
    "Oui, je perdrai mon chemin.": ["Oui, je perdrons mon chemin.", "Oui, j'ai perdu mon chemin.", "Oui, je perdais mon chemin."],
    "Non, je ne perdrai pas espoir.": ["Non, je ne perdrons pas espoir.", "Non, je ne perdez pas espoir.", "Non, je ne perdais pas espoir."],
    "Non, je ne le perdrai pas.": ["Non, je ne le perdrons pas.", "Non, je ne le perdais pas.", "Non, je ne le perdez pas."],
    "Non, elle ne perdra rien.": ["Non, elle ne perdrons rien.", "Non, elle ne perdez rien.", "Non, elle ne perdait rien."],
  },
  "Intermediate|Present|garder": {
    "Non, je ne garde aucun reçu.": ["Non, je ne gardons aucun reçu.", "Non, je ne garderai aucun reçu.", "Non, je ne gardez aucun reçu."],
    "Oui, nous gardons notre espace de travail propre.": ["Oui, nous gardez notre espace de travail propre.", "Oui, nous garderons notre espace de travail propre.", "Oui, nous avons gardé notre espace de travail propre."],
    "Oui, je les garde tous les mercredis.": ["Oui, je les gardons tous les mercredis.", "Oui, je les garderai tous les mercredis.", "Oui, je les gardez tous les mercredis."],
    "Oui, elle les garde avec moi.": ["Oui, elle les gardons avec moi.", "Oui, elle les gardera avec moi.", "Oui, elle les gardez avec moi."],
  },
  "Intermediate|Past|garder": {
    "Non, je n'ai gardé aucun reçu.": ["Non, je ne suis gardé aucun reçu.", "Non, je ne garderai aucun reçu.", "Non, je ne gardons aucun reçu."],
    "Oui, nous avons gardé nos promesses.": ["Oui, nous sommes gardé nos promesses.", "Oui, nous avez gardé nos promesses.", "Oui, nous garderons nos promesses."],
    "Oui, j'ai gardé toutes mes photos.": ["Oui, je suis gardé toutes mes photos.", "Oui, je garderai toutes mes photos.", "Oui, je gardons toutes mes photos."],
    "Oui, elle les a tous gardés.": ["Oui, elle les est tous gardés.", "Oui, elle les ont tous gardés.", "Oui, elle les gardera tous."],
  },
  "Intermediate|Future|garder": {
    "Oui, je garderai toutes mes notes.": ["Oui, je garderons toutes mes notes.", "Oui, je suis gardé toutes mes notes.", "Oui, je gardions toutes mes notes."],
    "Oui, nous garderons nos promesses.": ["Oui, nous garderez nos promesses.", "Oui, nous garderai nos promesses.", "Oui, nous gardions nos promesses."],
    "Oui, je garderai ton chat.": ["Oui, je garderons ton chat.", "Oui, je gardiez ton chat.", "Oui, j'ai gardé ton chat."],
    "Oui, elle gardera tes plantes.": ["Oui, elle garderons tes plantes.", "Oui, elle a gardé tes plantes.", "Oui, elle gardait tes plantes."],
  },
  "Intermediate|Imperfect|mettre": {
    "Je mettais un chapeau le dimanche.": ["Je mettons un chapeau le dimanche.", "Je mettrai un chapeau le dimanche.", "Je mettiez un chapeau le dimanche."],
    "Elles mettaient une écharpe en hiver.": ["Elles mettions une écharpe en hiver.", "Elles mettront une écharpe en hiver.", "Elles mettiez une écharpe en hiver."],
    "Oui, je mettais la table avec mon frère.": ["Oui, je mettions la table avec mon frère.", "Oui, je mettrai la table avec mon frère.", "Oui, je mets la table avec mon frère."],
    "Oui, elle mettait des fleurs du jardin.": ["Oui, elle mettions des fleurs du jardin.", "Oui, elle mettra des fleurs du jardin.", "Oui, elle met des fleurs du jardin."],
  },
  "Intermediate|Imperfect|trouver": {
    "Nous trouvions les leçons faciles.": ["Nous trouvez les leçons faciles.", "Nous trouverons les leçons faciles.", "Nous trouvaient les leçons faciles."],
    "Elles trouvaient les films ennuyeux.": ["Elles trouvions les films ennuyeux.", "Elles trouviez les films ennuyeux.", "Elles trouveront les films ennuyeux."],
    "Je trouvais des coquillages avec ma sœur.": ["Je trouvions des coquillages avec ma sœur.", "Je trouverai des coquillages avec ma sœur.", "Je trouve des coquillages avec ma sœur."],
    "Oui, nous trouvions des petits crabes sous les rochers.": ["Oui, nous trouviez des petits crabes sous les rochers.", "Oui, nous trouverons des petits crabes sous les rochers.", "Oui, nous trouvaient des petits crabes sous les rochers."],
  },
  "Intermediate|Imperfect|croire": {
    "Je croyais au père Noël.": ["Je croyions au père Noël.", "Je croirai au père Noël.", "Je crois au père Noël."],
    "Je ne croyais pas aux miracles.": ["Je ne croyions pas aux miracles.", "Je ne croirai pas aux miracles.", "Je ne crois pas aux miracles."],
    "Oui, et je croyais toutes ses histoires.": ["Oui, et je croyions toutes ses histoires.", "Oui, et je croirai toutes ses histoires.", "Oui, et je crois toutes ses histoires."],
    "Oui, je croyais qu'il y avait un loup.": ["Oui, je croyions qu'il y avait un loup.", "Oui, je croirai qu'il y avait un loup.", "Oui, je croirons qu'il y avait un loup."],
  },
  "Intermediate|Imperfect|parler": {
    "Je parlais français à la maison.": ["Je parlions français à la maison.", "Je parlerai français à la maison.", "Je parle français à la maison."],
    "Elles parlaient anglais au travail.": ["Elles parlions anglais au travail.", "Elles parliez anglais au travail.", "Elles parleront anglais au travail."],
    "Oui, je lui parlais tous les soirs au téléphone.": ["Oui, je lui parlions tous les soirs au téléphone.", "Oui, je lui parlerai tous les soirs au téléphone.", "Oui, je lui parle tous les soirs au téléphone."],
    "Oui, ils disaient que je parlais trop longtemps.": ["Oui, ils disaient que je parlions trop longtemps.", "Oui, ils disaient que je parliez trop longtemps.", "Oui, ils disaient que je parlerai trop longtemps."],
  },
  "Intermediate|Imperfect|prendre": {
    "Je prenais le bus pour aller au travail.": ["Je prenions le bus pour aller au travail.", "Je prendrai le bus pour aller au travail.", "Je prends le bus pour aller au travail."],
    "Elle prenait un café à la gare tous les matins.": ["Elle prenions un café à la gare tous les matins.", "Elle prendra un café à la gare tous les matins.", "Elle prend un café à la gare tous les matins."],
    "Nous prenions le bateau à Marseille.": ["Nous preniez le bateau à Marseille.", "Nous prendrons le bateau à Marseille.", "Nous prenaient le bateau à Marseille."],
    "Oui, je prenais beaucoup de photos de la mer.": ["Oui, je prenions beaucoup de photos de la mer.", "Oui, je prendrai beaucoup de photos de la mer.", "Oui, je prends beaucoup de photos de la mer."],
  },
  "Intermediate|Imperfect|lire": {
    "Je lisais le journal tous les matins.": ["Je lisions le journal tous les matins.", "Je lirai le journal tous les matins.", "Je lis le journal tous les matins."],
    "Elle lisait beaucoup de romans.": ["Elle lisions beaucoup de romans.", "Elle lira beaucoup de romans.", "Elle lit beaucoup de romans."],
    "Je lisais des bandes dessinées dans mon lit.": ["Je lisions des bandes dessinées dans mon lit.", "Je lirai des bandes dessinées dans mon lit.", "Je lisiez des bandes dessinées dans mon lit."],
    "Non, je lisais en secret sous la couverture.": ["Non, je lisions en secret sous la couverture.", "Non, je lirai en secret sous la couverture.", "Non, je lis en secret sous la couverture."],
  },
  "Intermediate|Imperfect|écrire": {
    "J'écrivais à Marie chaque semaine.": ["J'écrivions à Marie chaque semaine.", "J'écrirai à Marie chaque semaine.", "J'écris à Marie chaque semaine."],
    "Elle écrivait beaucoup d'e-mails.": ["Elle écrivions beaucoup d'e-mails.", "Elle écrira beaucoup d'e-mails.", "Elle écrit beaucoup d'e-mails."],
    "Oui, j'écrivais à un garçon en Angleterre.": ["Oui, j'écrivions à un garçon en Angleterre.", "Oui, j'écrirai à un garçon en Angleterre.", "Oui, j'écris à un garçon en Angleterre."],
    "Je lui écrivais en anglais, c'était difficile.": ["Je lui écrivions en anglais, c'était difficile.", "Je lui écrirai en anglais, c'était difficile.", "Je lui écris en anglais, c'était difficile."],
  },
  "Intermediate|Imperfect|ouvrir": {
    "J'ouvrais le magasin à huit heures.": ["J'ouvrions le magasin à huit heures.", "J'ouvrirai le magasin à huit heures.", "J'ouvre le magasin à huit heures."],
    "Elles ouvraient les rideaux à sept heures.": ["Elles ouvrions les rideaux à sept heures.", "Elles ouvriez les rideaux à sept heures.", "Elles ouvriront les rideaux à sept heures."],
    "Oui, j'ouvrais les cadeaux avant le petit-déjeuner.": ["Oui, j'ouvrions les cadeaux avant le petit-déjeuner.", "Oui, j'ouvrirai les cadeaux avant le petit-déjeuner.", "Oui, j'ouvre les cadeaux avant le petit-déjeuner."],
    "Non, ils ouvraient leurs cadeaux après le repas.": ["Non, ils ouvrions leurs cadeaux après le repas.", "Non, ils ouvriez leurs cadeaux après le repas.", "Non, ils ouvriront leurs cadeaux après le repas."],
  },
  "Intermediate|Imperfect|fermer": {
    "Elle fermait les volets tous les soirs.": ["Elle fermions les volets tous les soirs.", "Elle fermera les volets tous les soirs.", "Elle ferme les volets tous les soirs."],
    "Elles fermaient les fenêtres en hiver.": ["Elles fermions les fenêtres en hiver.", "Elles fermiez les fenêtres en hiver.", "Elles fermeront les fenêtres en hiver."],
    "Oui, je fermais le bureau à sept heures du soir.": ["Oui, je fermions le bureau à sept heures du soir.", "Oui, je fermiez le bureau à sept heures du soir.", "Oui, je fermerai le bureau à sept heures du soir."],
    "Oui, et je fermais toujours la porte à clé.": ["Oui, et je fermions toujours la porte à clé.", "Oui, et je fermiez toujours la porte à clé.", "Oui, et je fermerai toujours la porte à clé."],
  },
  "Intermediate|Imperfect|perdre": {
    "Je perdais mes clés tout le temps.": ["Je perdions mes clés tout le temps.", "Je perdiez mes clés tout le temps.", "Je perdrai mes clés tout le temps."],
    "Elle perdait tous les matchs.": ["Elle perdions tous les matchs.", "Elle perdiez tous les matchs.", "Elle perdra tous les matchs."],
    "Oui, mais nous perdions presque tous les samedis.": ["Oui, mais nous perdait presque tous les samedis.", "Oui, mais nous perdiez presque tous les samedis.", "Oui, mais nous perdrons presque tous les samedis."],
    "Non, il ne perdait jamais patience avec nous.": ["Non, il ne perdions jamais patience avec nous.", "Non, il ne perdiez jamais patience avec nous.", "Non, il ne perdra jamais patience avec nous."],
  },
  "Intermediate|Imperfect|garder": {
    "Elle gardait le chien des voisins l'été.": ["Elle gardions le chien des voisins l'été.", "Elle gardiez le chien des voisins l'été.", "Elle gardera le chien des voisins l'été."],
    "Il gardait les enfants quand le téléphone a sonné.": ["Il gardions les enfants quand le téléphone a sonné.", "Il gardiez les enfants quand le téléphone a sonné.", "Il gardera les enfants quand le téléphone a sonné."],
    "Oui, elle gardait tous mes secrets.": ["Oui, elle gardions tous mes secrets.", "Oui, elle gardiez tous mes secrets.", "Oui, elle gardera tous mes secrets."],
    "Oui, je gardais ses secrets pour moi.": ["Oui, je gardions ses secrets pour moi.", "Oui, je gardiez ses secrets pour moi.", "Oui, je garderai ses secrets pour moi."],
  },
  "Intermediate|Pluperfect|mettre": {
    "Elle avait mis les assiettes sur la table.": ["Elle avions mis les assiettes sur la table.", "Elle aviez mis les assiettes sur la table.", "Elle aura mis les assiettes sur la table."],
    "Elles avaient mis les livres sur l'étagère.": ["Elles avions mis les livres sur l'étagère.", "Elles aviez mis les livres sur l'étagère.", "Elles auront mis les livres sur l'étagère."],
    "Oui, j'avais déjà mis mon manteau.": ["Oui, j'étais déjà mis mon manteau.", "Oui, j'aurai déjà mis mon manteau.", "Oui, je mets déjà mon manteau."],
    "Non, je n'avais pas encore mis mes chaussures.": ["Non, je n'étais pas encore mis mes chaussures.", "Non, je n'aurai pas encore mis mes chaussures.", "Non, je ne mets pas encore mes chaussures."],
  },
  "Intermediate|Pluperfect|trouver": {
    "Elles avaient trouvé un travail à Lyon.": ["Elles avions trouvé un travail à Lyon.", "Elles aviez trouvé un travail à Lyon.", "Elles auront trouvé un travail à Lyon."],
    "Nous avions trouvé la réponse dans le livre.": ["Nous avez trouvé la réponse dans le livre.", "Nous aurons trouvé la réponse dans le livre.", "Nous étions trouvé la réponse dans le livre."],
    "Oui, il avait trouvé le chat dans son garage.": ["Oui, il avions trouvé le chat dans son garage.", "Oui, il aviez trouvé le chat dans son garage.", "Oui, il aura trouvé le chat dans son garage."],
    "Oui, il avait trouvé un vieux sandwich.": ["Oui, il avions trouvé un vieux sandwich.", "Oui, il aviez trouvé un vieux sandwich.", "Oui, il aura trouvé un vieux sandwich."],
  },
  "Intermediate|Pluperfect|croire": {
    "Elle avait cru la rumeur.": ["Elle avions cru la rumeur.", "Elle aviez cru la rumeur.", "Elle aura cru la rumeur."],
    "Je n'avais pas cru les enfants.": ["Je n'étais pas cru les enfants.", "Je n'aurai pas cru les enfants.", "Je ne crois pas les enfants."],
    "Non, je n'avais pas cru son histoire.": ["Non, je n'étais pas cru son histoire.", "Non, je n'aurai pas cru son histoire.", "Non, je ne crois pas son histoire."],
    "Oui, elle avait cru Paul tout de suite.": ["Oui, elle avions cru Paul tout de suite.", "Oui, elle aviez cru Paul tout de suite.", "Oui, elle aura cru Paul tout de suite."],
  },
  "Intermediate|Pluperfect|parler": {
    "J'avais parlé au directeur.": ["J'étais parlé au directeur.", "J'aurai parlé au directeur.", "Je parle au directeur."],
    "Elle avait parlé du projet.": ["Elle avions parlé du projet.", "Elle aviez parlé du projet.", "Elle aura parlé du projet."],
    "Oui, j'avais parlé français avec mon professeur.": ["Oui, j'étais parlé français avec mon professeur.", "Oui, j'aurai parlé français avec mon professeur.", "Oui, je parle français avec mon professeur."],
    "Non, je n'avais jamais parlé avec des Français.": ["Non, je n'étais jamais parlé avec des Français.", "Non, je n'aurai jamais parlé avec des Français.", "Non, je ne parle jamais avec des Français."],
  },
  "Intermediate|Pluperfect|prendre": {
    "Il n'avait pas pris le train pour Paris.": ["Il n'avions pas pris le train pour Paris.", "Il n'aviez pas pris le train pour Paris.", "Il n'aura pas pris le train pour Paris."],
    "Elles avaient pris les clés.": ["Elles avions pris les clés.", "Elles aviez pris les clés.", "Elles auront pris les clés."],
    "Oui, j'avais pris un café et un croissant.": ["Oui, j'étais pris un café et un croissant.", "Oui, j'aurai pris un café et un croissant.", "Oui, je prends un café et un croissant."],
    "Non, elle n'avait pas pris son goûter.": ["Non, elle n'avions pas pris son goûter.", "Non, elle n'aviez pas pris son goûter.", "Non, elle n'aura pas pris son goûter."],
  },
  "Intermediate|Pluperfect|lire": {
    "Elle avait lu les instructions.": ["Elle avions lu les instructions.", "Elle aviez lu les instructions.", "Elle aura lu les instructions."],
    "J'avais lu le journal.": ["J'étais lu le journal.", "J'aurai lu le journal.", "Je lis le journal."],
    "Oui, j'avais lu le livre l'été dernier.": ["Oui, j'étais lu le livre l'été dernier.", "Oui, j'aurai lu le livre l'été dernier.", "Oui, je lis le livre l'été dernier."],
    "Non, ils n'avaient pas lu le livre.": ["Non, ils n'avions pas lu le livre.", "Non, ils n'aviez pas lu le livre.", "Non, ils n'auront pas lu le livre."],
  },
  "Intermediate|Pluperfect|écrire": {
    "J'avais écrit une lettre à Marie.": ["J'étais écrit une lettre à Marie.", "J'aurai écrit une lettre à Marie.", "J'écris une lettre à Marie."],
    "Elles avaient écrit une carte postale.": ["Elles avions écrit une carte postale.", "Elles aviez écrit une carte postale.", "Elles auront écrit une carte postale."],
    "Oui, j'avais écrit ma rédaction la veille.": ["Oui, j'étais écrit ma rédaction la veille.", "Oui, j'aurai écrit ma rédaction la veille.", "Oui, j'écris ma rédaction la veille."],
    "Non, il n'avait pas écrit un seul mot.": ["Non, il n'avions pas écrit un seul mot.", "Non, il n'aviez pas écrit un seul mot.", "Non, il n'aura pas écrit un seul mot."],
  },
  "Intermediate|Pluperfect|ouvrir": {
    "Nous avions ouvert le magasin.": ["Nous avez ouvert le magasin.", "Nous aurons ouvert le magasin.", "Nous étions ouvert le magasin."],
    "Il avait ouvert le colis.": ["Il avions ouvert le colis.", "Il aviez ouvert le colis.", "Il aura ouvert le colis."],
    "Oui, j'avais ouvert toutes les fenêtres.": ["Oui, j'étais ouvert toutes les fenêtres.", "Oui, j'aurai ouvert toutes les fenêtres.", "Oui, j'ouvre toutes les fenêtres."],
    "Non, il n'avait pas encore ouvert la bouteille.": ["Non, il n'avions pas encore ouvert la bouteille.", "Non, il n'aviez pas encore ouvert la bouteille.", "Non, il n'aura pas encore ouvert la bouteille."],
  },
  "Intermediate|Pluperfect|fermer": {
    "J'avais fermé la porte à clé.": ["J'étais fermé la porte à clé.", "J'aurai fermé la porte à clé.", "Je ferme la porte à clé."],
    "Elles avaient fermé les volets.": ["Elles avions fermé les volets.", "Elles aviez fermé les volets.", "Elles auront fermé les volets."],
    "Oui, j'avais déjà fermé la tente.": ["Oui, j'étais déjà fermé la tente.", "Oui, j'aurai déjà fermé la tente.", "Oui, je ferme déjà la tente."],
    "Non, ils n'avaient pas fermé le coffre.": ["Non, ils n'avions pas fermé le coffre.", "Non, ils n'aviez pas fermé le coffre.", "Non, ils n'auront pas fermé le coffre."],
  },
  "Intermediate|Pluperfect|perdre": {
    "Elles avaient perdu le pari.": ["Elles avions perdu le pari.", "Elles aviez perdu le pari.", "Elles auront perdu le pari."],
    "Ils avaient perdu l'adresse.": ["Ils avions perdu l'adresse.", "Ils aviez perdu l'adresse.", "Ils auront perdu l'adresse."],
    "Oui, j'avais perdu mon passeport dans le taxi.": ["Oui, j'étais perdu mon passeport dans le taxi.", "Oui, j'aurai perdu mon passeport dans le taxi.", "Oui, je perds mon passeport dans le taxi."],
    "Non, il n'avait rien perdu, heureusement.": ["Non, il n'avions rien perdu, heureusement.", "Non, il n'aviez rien perdu, heureusement.", "Non, il n'aura rien perdu, heureusement."],
  },
  "Intermediate|Pluperfect|garder": {
    "J'avais gardé le reçu.": ["J'étais gardé le reçu.", "J'aurai gardé le reçu.", "Je garde le reçu."],
    "Il avait gardé le secret.": ["Il avions gardé le secret.", "Il aviez gardé le secret.", "Il aura gardé le secret."],
    "Oui, elle avait gardé tous mes dessins.": ["Oui, elle avions gardé tous mes dessins.", "Oui, elle aviez gardé tous mes dessins.", "Oui, elle aura gardé tous mes dessins."],
    "Oui, j'avais gardé mon vieil ours en peluche.": ["Oui, j'étais gardé mon vieil ours en peluche.", "Oui, j'aurai gardé mon vieil ours en peluche.", "Oui, je garde mon vieil ours en peluche."],
  },
  "Intermediate|Imperfect|s'intéresser": {
    "Je m'intéressais à la politique.": ["Je m'intéresse à la politique.", "Je m'intéresserai à la politique.", "Je m'intéressions à la politique."],
    "Il ne s'intéressait pas à la politique.": ["Il ne s'intéresse pas à la politique.", "Il ne s'intéressera pas à la politique.", "Il ne s'intéressions pas à la politique."],
    "Oui, ils s'intéressaient beaucoup au football.": ["Oui, ils s'intéressent beaucoup au football.", "Oui, ils s'intéresseront beaucoup au football.", "Oui, ils s'intéressions beaucoup au football."],
    "Non, je m'intéressais seulement au tennis.": ["Non, je m'intéresse seulement au tennis.", "Non, je m'intéresserai seulement au tennis.", "Non, je m'intéressions seulement au tennis."],
  },
  "Intermediate|Imperfect|se débrouiller": {
    "Je me débrouillais en anglais.": ["Je me débrouille en anglais.", "Je me débrouillerai en anglais.", "Je me débrouillions en anglais."],
    "Elle se débrouillait sans voiture.": ["Elle se débrouille sans voiture.", "Elle se débrouillera sans voiture.", "Elle se débrouillions sans voiture."],
    "Oui, je me débrouillais avec des pâtes et du riz.": ["Oui, je me débrouille avec des pâtes et du riz.", "Oui, je me débrouillerai avec des pâtes et du riz.", "Oui, je me débrouillions avec des pâtes et du riz."],
    "Non, ils se débrouillaient encore plus mal que moi.": ["Non, ils se débrouillent encore plus mal que moi.", "Non, ils se débrouilleront encore plus mal que moi.", "Non, ils se débrouillions encore plus mal que moi."],
  },
  "Intermediate|Imperfect|s'ennuyer": {
    "Je m'ennuyais à l'école.": ["Je m'ennuie à l'école.", "Je m'ennuierai à l'école.", "Je m'ennuyions à l'école."],
    "Elle s'ennuyait le dimanche.": ["Elle s'ennuie le dimanche.", "Elle s'ennuiera le dimanche.", "Elle s'ennuyions le dimanche."],
    "Non, je ne m'ennuyais jamais à la campagne.": ["Non, je ne m'ennuie jamais à la campagne.", "Non, je ne m'ennuierai jamais à la campagne.", "Non, je ne m'ennuyions jamais à la campagne."],
    "Oui, il s'ennuyait sans ses amis.": ["Oui, il s'ennuie sans ses amis.", "Oui, il s'ennuiera sans ses amis.", "Oui, il s'ennuyions sans ses amis."],
  },
  "Intermediate|Imperfect|s'entraîner": {
    "Je m'entraînais tous les matins.": ["Je m'entraîne tous les matins.", "Je m'entraînerai tous les matins.", "Je m'entraînions tous les matins."],
    "Elle s'entraînait à la salle de sport.": ["Elle s'entraîne à la salle de sport.", "Elle s'entraînera à la salle de sport.", "Elle s'entraînions à la salle de sport."],
    "Oui, je m'entraînais avec eux deux fois par semaine.": ["Oui, je m'entraîne avec eux deux fois par semaine.", "Oui, je m'entraînerai avec eux deux fois par semaine.", "Oui, je m'entraînions avec eux deux fois par semaine."],
    "Oui, il s'entraînait avec moi dans le jardin.": ["Oui, il s'entraîne avec moi dans le jardin.", "Oui, il s'entraînera avec moi dans le jardin.", "Oui, il s'entraînions avec moi dans le jardin."],
  },
  "Intermediate|Imperfect|se souvenir": {
    "Je me souvenais de l'anniversaire de tout le monde.": ["Je me souviens de l'anniversaire de tout le monde.", "Je me souviendrai de l'anniversaire de tout le monde.", "Je me souvenions de l'anniversaire de tout le monde."],
    "Il ne se souvenait pas de l'anniversaire de tout le monde.": ["Il ne se souvient pas de l'anniversaire de tout le monde.", "Il ne se souviendra pas de l'anniversaire de tout le monde.", "Il ne se souvenions pas de l'anniversaire de tout le monde."],
    "Oui, elle se souvenait de toutes les recettes.": ["Oui, elle se souvient de toutes les recettes.", "Oui, elle se souviendra de toutes les recettes.", "Oui, elle se souvenions de toutes les recettes."],
    "Non, je ne me souvenais jamais des quantités.": ["Non, je ne me souviens jamais des quantités.", "Non, je ne me souviendrai jamais des quantités.", "Non, je ne me souvenions jamais des quantités."],
  },
  "Intermediate|Imperfect|s'adapter": {
    "Je m'adaptais facilement aux changements.": ["Je m'adapte facilement aux changements.", "Je m'adapterai facilement aux changements.", "Je m'adaptions facilement aux changements."],
    "Ils s'adaptaient à chaque nouvelle ville.": ["Ils s'adaptent à chaque nouvelle ville.", "Ils s'adapteront à chaque nouvelle ville.", "Ils s'adaptions à chaque nouvelle ville."],
    "Non, je ne m'adaptais pas du tout au froid.": ["Non, je ne m'adapte pas du tout au froid.", "Non, je ne m'adapterai pas du tout au froid.", "Non, je ne m'adaptions pas du tout au froid."],
    "Oui, il s'adaptait vite, il adorait la neige.": ["Oui, il s'adapte vite, il adorait la neige.", "Oui, il s'adaptera vite, il adorait la neige.", "Oui, il s'adaptions vite, il adorait la neige."],
  },
  "Intermediate|Imperfect|se réjouir": {
    "Je me réjouissais de la neige.": ["Je me réjouis de la neige.", "Je me réjouirai de la neige.", "Je me réjouissions de la neige."],
    "Ils se réjouissaient des week-ends.": ["Ils se réjouissent des week-ends.", "Ils se réjouiront des week-ends.", "Ils se réjouissions des week-ends."],
    "Oui, et je me réjouissais de ce week-end toute l'année.": ["Oui, et je me réjouis de ce week-end toute l'année.", "Oui, et je me réjouirai de ce week-end toute l'année.", "Oui, et je me réjouissions de ce week-end toute l'année."],
    "Oui, ils se réjouissaient surtout des concerts du soir.": ["Oui, ils se réjouissent surtout des concerts du soir.", "Oui, ils se réjouiront surtout des concerts du soir.", "Oui, ils se réjouissions surtout des concerts du soir."],
  },
  "Intermediate|Pluperfect|s'intéresser": {
    "Il s'était intéressé à l'art.": ["Il s'avait intéressé à l'art.", "Il se sera intéressé à l'art.", "Il s'intéresse à l'art."],
    "Elle s'était intéressée à l'histoire.": ["Elle s'avait intéressée à l'histoire.", "Elle se sera intéressée à l'histoire.", "Elle s'intéresse à l'histoire."],
    "Oui, je m'étais déjà intéressé à la photo au lycée.": ["Oui, je m'avais déjà intéressé à la photo au lycée.", "Oui, je me serai déjà intéressé à la photo au lycée.", "Oui, je m'intéresse déjà à la photo au lycée."],
    "Non, il ne s'était jamais intéressé à la photo.": ["Non, il ne s'avait jamais intéressé à la photo.", "Non, il ne se sera jamais intéressé à la photo.", "Non, il ne s'intéresse jamais à la photo."],
  },
  "Intermediate|Pluperfect|se débrouiller": {
    "Elle s'était débrouillée à l'aéroport.": ["Elle s'avait débrouillée à l'aéroport.", "Elle se sera débrouillée à l'aéroport.", "Elle se débrouille à l'aéroport."],
    "Il s'était débrouillé avec très peu d'argent.": ["Il s'avait débrouillé avec très peu d'argent.", "Il se sera débrouillé avec très peu d'argent.", "Il se débrouille avec très peu d'argent."],
    "Oui, je m'étais déjà débrouillé tout seul.": ["Oui, je m'avais déjà débrouillé tout seul.", "Oui, je me serai déjà débrouillé tout seul.", "Oui, je me débrouille déjà tout seul."],
    "Non, elle s'était débrouillée pour rentrer en bus.": ["Non, elle s'avait débrouillée pour rentrer en bus.", "Non, elle se sera débrouillée pour rentrer en bus.", "Non, elle se débrouille pour rentrer en bus."],
  },
  "Intermediate|Pluperfect|s'ennuyer": {
    "Il ne s'était pas ennuyé à la réunion.": ["Il ne s'avait pas ennuyé à la réunion.", "Il ne se sera pas ennuyé à la réunion.", "Il ne s'ennuie pas à la réunion."],
    "Il s'était ennuyé au musée.": ["Il s'avait ennuyé au musée.", "Il se sera ennuyé au musée.", "Il s'ennuie au musée."],
    "Oui, je m'étais beaucoup ennuyé avant leur arrivée.": ["Oui, je m'avais beaucoup ennuyé avant leur arrivée.", "Oui, je me serai beaucoup ennuyé avant leur arrivée.", "Oui, je m'ennuie beaucoup avant leur arrivée."],
    "Non, il ne s'était pas ennuyé, il avait nagé.": ["Non, il ne s'avait pas ennuyé, il avait nagé.", "Non, il ne se sera pas ennuyé, il avait nagé.", "Non, il ne s'ennuie pas, il avait nagé."],
  },
  "Intermediate|Pluperfect|s'entraîner": {
    "Elle s'était entraînée avec l'équipe.": ["Elle s'avait entraînée avec l'équipe.", "Elle se sera entraînée avec l'équipe.", "Elle s'entraîne avec l'équipe."],
    "Il s'était entraîné à la salle de sport.": ["Il s'avait entraîné à la salle de sport.", "Il se sera entraîné à la salle de sport.", "Il s'entraîne à la salle de sport."],
    "Oui, je m'étais entraîné trois fois par semaine.": ["Oui, je m'avais entraîné trois fois par semaine.", "Oui, je me serai entraîné trois fois par semaine.", "Oui, je m'entraîne trois fois par semaine."],
    "Non, il ne s'était pas entraîné, il était malade.": ["Non, il ne s'avait pas entraîné, il était malade.", "Non, il ne se sera pas entraîné, il était malade.", "Non, il ne s'entraîne pas, il était malade."],
  },
  "Intermediate|Pluperfect|se souvenir": {
    "Il ne s'était pas souvenu de l'adresse.": ["Il ne s'avait pas souvenu de l'adresse.", "Il ne se sera pas souvenu de l'adresse.", "Il ne se souvient pas de l'adresse."],
    "Ils s'étaient souvenus de la date.": ["Ils s'avaient souvenus de la date.", "Ils se seront souvenus de la date.", "Ils se souviennent de la date."],
    "Oui, je m'étais souvenu de son anniversaire le matin.": ["Oui, je m'avais souvenu de son anniversaire le matin.", "Oui, je me serai souvenu de son anniversaire le matin.", "Oui, je me souviens de son anniversaire le matin."],
    "Non, il ne s'en était pas souvenu du tout.": ["Non, il ne s'en avait pas souvenu du tout.", "Non, il ne s'en sera pas souvenu du tout.", "Non, il ne s'en souvient pas du tout."],
  },
  "Intermediate|Pluperfect|s'adapter": {
    "Il s'était adapté à la vie à Paris.": ["Il s'avait adapté à la vie à Paris.", "Il se sera adapté à la vie à Paris.", "Il s'adapte à la vie à Paris."],
    "Ils s'étaient adaptés à la nouvelle équipe.": ["Ils s'avaient adaptés à la nouvelle équipe.", "Ils se seront adaptés à la nouvelle équipe.", "Ils s'adaptent à la nouvelle équipe."],
    "Non, je ne m'étais pas encore adapté au froid.": ["Non, je ne m'avais pas encore adapté au froid.", "Non, je ne me serai pas encore adapté au froid.", "Non, je ne m'adapte pas encore au froid."],
    "Oui, ils s'étaient adaptés très vite à l'école.": ["Oui, ils s'avaient adaptés très vite à l'école.", "Oui, ils se seront adaptés très vite à l'école.", "Oui, ils s'adaptent très vite à l'école."],
  },
  "Intermediate|Pluperfect|se réjouir": {
    "Il s'était réjoui du résultat.": ["Il s'avait réjoui du résultat.", "Il se sera réjoui du résultat.", "Il se réjouit du résultat."],
    "Ils s'étaient réjouis du beau temps.": ["Ils s'avaient réjouis du beau temps.", "Ils se seront réjouis du beau temps.", "Ils se réjouissent du beau temps."],
    "Oui, je m'étais réjoui pendant des semaines.": ["Oui, je m'avais réjoui pendant des semaines.", "Oui, je me serai réjoui pendant des semaines.", "Oui, je me réjouis pendant des semaines."],
    "Non, elle ne s'était pas réjouie, elle préfère le jazz.": ["Non, elle ne s'avait pas réjouie, elle préfère le jazz.", "Non, elle ne se sera pas réjouie, elle préfère le jazz.", "Non, elle ne se réjouit pas, elle préfère le jazz."],
  },
};

/** The three wrong answers for a reply, or undefined if that level isn't converted yet. */
export function wrongOptions(convKey: string, modelAnswer: string): string[] | undefined {
  return CONVERSATION_OPTIONS[convKey.normalize("NFC")]?.[modelAnswer.normalize("NFC")];
}
