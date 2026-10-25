/**
 * English-friendly sound guides for vocab-check words (1.2.4.3, 25 Oct 2026),
 * keyed by word id (lib/vocabCheck.ts). Shown under the French word on each
 * card; the recorded word (speaker button) is the real model.
 *
 * Scheme: syllables joined by hyphens, the stressed (last full) syllable in
 * CAPITALS. ah · ay (é) · eh (è/ê/ai) · uh (le, eu) · ee · oh · oo (ou) ·
 * ew (u, as in tu) · wah (oi) · ahn (an/en) · ohn (on) · an (in/ain/un) ·
 * zh (j, soft g) · sh (ch) · ny (gn). Silent letters are left out.
 *
 * Every word in the bank must have a guide: add one when you add a word.
 */
export const SOUND_GUIDES: Record<string, string> = {
  "beg-etre-etudiant": "uhn-nay-tew-DYAHN", // un étudiant
  "beg-etre-etudiante": "ewn-nay-tew-DYAHNT", // une étudiante
  "beg-etre-ami": "uhn-nah-MEE", // un ami
  "beg-etre-maison": "lah meh-ZOHN", // la maison
  "beg-etre-cafe": "luh kah-FAY", // le café
  "beg-etre-ou": "OO", // où
  "beg-etre-super": "sew-PEHR", // super
  "beg-etre-malade": "mah-LAHD", // malade
  "beg-etre-hier": "ee-YEHR", // hier
  "beg-etre-en-retard": "ahn ruh-TAHR", // en retard
  "beg-etre-matin": "luh mah-TAN", // le matin
  "beg-etre-grave": "GRAHV", // grave
  "beg-etre-demain": "duh-MAN", // demain
  "beg-etre-parents": "lay pah-RAHN", // les parents
  "beg-etre-la": "LAH", // là
  "beg-etre-aussi": "oh-SEE", // aussi
  "beg-etre-bon": "BOHN", // bon
  "beg-etre-voyage": "luh vwah-YAHZH", // le voyage
  "beg-avoir-chien": "uhn SHYAN", // un chien
  "beg-avoir-soeur": "ewn SUHR", // une sœur
  "beg-avoir-chat": "uhn SHAH", // un chat
  "beg-avoir-lapin": "uhn lah-PAN", // un lapin
  "beg-avoir-famille": "lah fah-MEEY", // la famille
  "beg-avoir-cadeau": "uhn kah-DOH", // un cadeau
  "beg-avoir-anniversaire": "uhn-nah-nee-vehr-SEHR", // un anniversaire
  "beg-avoir-frere": "uhn FREHR", // un frère
  "beg-avoir-velo": "uhn vay-LOH", // un vélo
  "beg-avoir-beau": "BOH", // beau
  "beg-avoir-chance": "lah SHAHNS", // la chance
  "beg-avoir-temps": "luh TAHN", // le temps
  "beg-avoir-travail": "luh trah-VAHY", // le travail
  "beg-avoir-d-accord": "dah-KOHR", // d'accord
  "beg-faire-soir": "luh SWAHR", // le soir
  "beg-faire-gateau": "uhn gah-TOH", // un gâteau
  "beg-faire-devoirs": "lay duh-VWAHR", // les devoirs
  "beg-faire-chaud": "SHOH", // chaud
  "beg-faire-froid": "FRWAH", // froid
  "beg-faire-nuit": "lah NWEE", // la nuit
  "beg-faire-courses": "lay KOORS", // les courses
  "beg-faire-mere": "ewn MEHR", // une mère
  "beg-faire-soupe": "ewn SOOP", // une soupe
  "beg-faire-tres": "TREH", // très
  "beg-faire-bien": "BYAN", // bien
  "beg-faire-samedi": "sahm-DEE", // samedi
  "beg-faire-dimanche": "dee-MAHNSH", // dimanche
  "beg-faire-promenade": "ewn prohm-NAHD", // une promenade
  "beg-faire-sport": "luh SPOHR", // le sport
  "beg-faire-excellent": "ehk-seh-LAHN", // excellent
  "nov-etre-heureux": "uh-RUH", // heureux
  "nov-etre-pret": "PREH", // prêt
  "nov-etre-fatigue": "fah-tee-GAY", // fatigué
  "nov-etre-gentil": "zhahn-TEE", // gentil
  "nov-etre-professeur": "uhn proh-feh-SUHR", // un professeur
  "nov-etre-francais": "frahn-SEH", // français
  "nov-etre-australien": "ohs-trah-LYAN", // australien
  "nov-etre-vacances": "lay vah-KAHNS", // les vacances
  "nov-etre-ici": "ee-SEE", // ici
  "nov-avoir-voiture": "ewn vwah-TEWR", // une voiture
  "nov-avoir-probleme": "uhn proh-BLEHM", // un problème
  "nov-avoir-fete": "ewn FEHT", // une fête
  "nov-avoir-livre": "uhn LEE-vruh", // un livre
  "nov-avoir-cle": "ewn KLAY", // une clé
  "nov-avoir-enfants": "lay-zahn-FAHN", // les enfants
  "nov-avoir-age": "uhn-NAHZH", // un âge
  "nov-avoir-an": "uhn-NAHN", // un an
  "nov-faire-vaisselle": "lah veh-SEHL", // la vaisselle
  "nov-faire-cuisine": "lah kwee-ZEEN", // la cuisine
  "nov-faire-menage": "luh may-NAHZH", // le ménage
  "nov-faire-lessive": "lah leh-SEEV", // la lessive
  "nov-faire-puzzle": "uhn PUHZL", // un puzzle
  "nov-faire-aujourd-hui": "oh-zhoor-DWEE", // aujourd'hui
  "nov-faire-idee": "ewn-nee-DAY", // une idée
  "nov-faire-alors": "ah-LOHR", // alors
  "nov-aller-ecole": "ewn-nay-KOHL", // une école
  "nov-aller-parc": "luh PAHRK", // le parc
  "nov-aller-marche": "luh mahr-SHAY", // le marché
  "nov-aller-magasin": "luh mah-gah-ZAN", // le magasin
  "nov-aller-cinema": "luh see-nay-MAH", // le cinéma
  "nov-aller-musee": "luh mew-ZAY", // le musée
  "nov-aller-boulangerie": "lah boo-lahn-zhuh-REE", // la boulangerie
  "nov-etre-content": "kohn-TAHN", // content
  "nov-etre-ete": "uhn-nay-TAY", // un été
  "nov-avoir-peur": "lah PUHR", // la peur
  "nov-avoir-film": "luh FEELM", // le film
  "nov-avoir-courageux": "koo-rah-ZHUH", // courageux
  "nov-faire-projet": "uhn proh-ZHEH", // un projet
  "nov-faire-erreur": "ewn-neh-RUHR", // une erreur
  "nov-faire-exercice": "uhn-nehg-zehr-SEES", // un exercice
  "nov-faire-chose": "lah SHOHZ", // la chose
  "nov-faire-ville": "lah VEEL", // la ville
  "nov-faire-parfait": "pahr-FEH", // parfait
  "nov-aller-copine": "ewn koh-PEEN", // une copine
  "nov-aller-plage": "lah PLAHZH", // la plage
  "nov-etre-dommage": "doh-MAHZH", // dommage
  "nov-avoir-permis": "luh pehr-MEE", // le permis
  "nov-avoir-mai": "MEH", // mai
  "nov-avoir-petit": "puh-TEE", // petit
  "nov-avoir-sac": "uhn SAHK", // un sac
  "nov-avoir-beaucoup": "boh-KOO", // beaucoup
  "nov-avoir-pain": "luh PAN", // le pain
  "nov-avoir-argent": "lahr-ZHAHN", // l'argent
  "nov-avoir-eau": "LOH", // l'eau
  "nov-avoir-patience": "lah pah-SYAHNS", // la patience
  "nov-avoir-assez": "ah-SAY", // assez
  "nov-avoir-nourriture": "lah noo-ree-TEWR", // la nourriture
  "nov-faire-fils": "uhn FEES", // un fils
  "nov-faire-stage": "uhn STAHZH", // un stage
  "nov-aller-surement": "sewr-MAHN", // sûrement
  "nov-aller-ensemble": "ahn-SAHN-bluh", // ensemble
  "nov-aller-semaine": "lah suh-MEHN", // la semaine
  "nov-aller-prochain": "proh-SHAN", // prochain
  "nov-aller-mois": "luh MWAH", // le mois
  "nov-aller-gymnase": "luh zheem-NAHZ", // le gymnase
  "nov-aller-bibliotheque": "lah bee-blee-yoh-TEHK", // la bibliothèque
  "nov-aller-week-end": "luh wee-KEHND", // le week-end
  "nov-aller-stade": "luh STAHD", // le stade
  "nov-aller-restaurant": "luh rehs-toh-RAHN", // le restaurant
  "nov-aller-vendredi": "vahn-druh-DEE", // vendredi
  "nov-aller-concert": "luh kohn-SEHR", // le concert
  "ele-dire-reponse": "lah ray-POHNS", // la réponse
  "ele-dire-verite": "lah vay-ree-TAY", // la vérité
  "ele-dire-mot": "uhn MOH", // un mot
  "ele-dire-nom": "uhn NOHN", // un nom
  "ele-dire-maintenant": "mant-NAHN", // maintenant
  "ele-dire-souvent": "soo-VAHN", // souvent
  "ele-dire-poli": "poh-LEE", // poli
  "ele-dire-faux": "FOH", // faux
  "ele-voir-oiseau": "uhn-nwah-ZOH", // un oiseau
  "ele-voir-ciel": "luh SYEHL", // le ciel
  "ele-voir-miroir": "uhn mee-RWAHR", // un miroir
  "ele-voir-etoile": "ewn-nay-TWAHL", // une étoile
  "ele-voir-rouge": "ROOZH", // rouge
  "ele-voir-paysage": "uhn pay-ee-ZAHZH", // un paysage
  "ele-voir-avenir": "uhn-nahv-NEER", // un avenir
  "ele-savoir-adresse": "ewn-nah-DREHS", // une adresse
  "ele-savoir-nouvelles": "lay noo-VEHL", // les nouvelles
  "ele-savoir-histoire": "ewn-nees-TWAHR", // une histoire
  "ele-savoir-heure": "LUHR", // l'heure
  "ele-savoir-regle": "ewn REH-gluh", // une règle
  "ele-savoir-mot-de-passe": "uhn moh-duh-PAHS", // un mot de passe
  "ele-savoir-vite": "VEET", // vite
  "ele-savoir-encore": "ahn-KOHR", // encore
  "ele-vouloir-nouveau": "noo-VOH", // nouveau
  "ele-vouloir-morceau": "uhn mohr-SOH", // un morceau
  "ele-vouloir-directeur": "uhn dee-rehk-TUHR", // un directeur
  "ele-vouloir-the": "luh TAY", // le thé
  "ele-vouloir-chocolat": "luh shoh-koh-LAH", // le chocolat
  "ele-venir-bureau": "luh bew-ROH", // le bureau
  "ele-venir-loin": "LWAN", // loin
  "ele-venir-seul": "SUHL", // seul
  "ele-venir-meme": "MEHM", // même
  "ele-venir-direction": "ewn dee-rehk-SYOHN", // une direction
  "ele-pouvoir-mieux": "MYUH", // mieux
  "ele-pouvoir-quand-meme": "kahn MEHM", // quand même
  "ele-besoin-aide": "LEHD", // l'aide
  "ele-besoin-voisin": "uhn vwah-ZAN", // un voisin
  "ele-besoin-marteau": "uhn mahr-TOH", // un marteau
  "ele-dire-jamais": "zhah-MEH", // jamais
  "ele-dire-important": "an-pohr-TAHN", // important
  "ele-dire-pourquoi": "poor-KWAH", // pourquoi
  "ele-dire-quand": "KAHN", // quand
  "ele-voir-resultat": "uhn ray-zewl-TAH", // un résultat
  "ele-voir-exposition": "ewn-nehk-spoh-zee-SYOHN", // une exposition
  "ele-voir-fantome": "uhn fahn-TOHM", // un fantôme
  "ele-voir-message": "uhn meh-SAHZH", // un message
  "ele-voir-match": "uhn MAHTSH", // un match
  "ele-voir-spectacle": "uhn spehk-TAHKL", // un spectacle
  "ele-voir-lunettes": "lay lew-NEHT", // les lunettes
  "ele-voir-panneau": "uhn pah-NOH", // un panneau
  "ele-voir-deja": "day-ZHAH", // déjà
  "ele-voir-piece": "ewn PYEHS", // une pièce
  "ele-savoir-secret": "uhn suh-KREH", // un secret
  "ele-savoir-risque": "uhn REESK", // un risque
  "ele-savoir-annee": "ewn-nah-NAY", // une année
  "ele-savoir-dernier": "dehr-NYAY", // dernier
  "ele-savoir-soudainement": "soo-dehn-MAHN", // soudainement
  "ele-savoir-longtemps": "lohn-TAHN", // longtemps
  "ele-savoir-moment": "uhn moh-MAHN", // un moment
  "ele-savoir-comment": "koh-MAHN", // comment
  "ele-vouloir-tot": "TOH", // tôt
  "ele-vouloir-soleil": "luh soh-LEHY", // le soleil
  "ele-vouloir-toujours": "too-ZHOOR", // toujours
  "ele-venir-pied": "luh PYAY", // le pied
  "ele-venir-train": "luh TRAN", // le train
  "ele-venir-femme": "ewn FAHM", // une femme
  "ele-venir-tard": "TAHR", // tard
  "ele-pouvoir-porte": "lah POHRT", // la porte
  "ele-pouvoir-enfin": "ahn-FAN", // enfin
  "ele-pouvoir-reunion": "ewn ray-ew-NYOHN", // une réunion
  "ele-besoin-medecin": "uhn mayd-SAN", // un médecin
  "ele-besoin-medicament": "uhn may-dee-kah-MAHN", // un médicament
  "ele-besoin-repos": "luh ruh-POH", // le repos
  "ele-dire-bientot": "byan-TOH", // bientôt
  "ele-dire-mensonge": "uhn mahn-SOHNZH", // un mensonge
  "ele-dire-sage": "SAHZH", // sage
  "ele-dire-decision": "ewn day-see-ZYOHN", // une décision
  "ele-voir-difference": "ewn dee-fay-RAHNS", // une différence
  "ele-voir-theatre": "luh tay-AH-truh", // le théâtre
  "ele-voir-consequence": "ewn kohn-say-KAHNS", // une conséquence
  "ele-voir-facile": "fah-SEEL", // facile
  "ele-voir-changement": "uhn shahnzh-MAHN", // un changement
  "ele-voir-grand": "GRAHN", // grand
  "ele-voir-fin": "lah FAN", // la fin
  "ele-voir-jour": "uhn ZHOOR", // un jour
  "ele-voir-grands-parents": "lay grahn-pah-RAHN", // les grands-parents
  "ele-savoir-chemin": "luh shuh-MAN", // le chemin
  "ele-savoir-date": "ewn DAHT", // une date
  "ele-savoir-detail": "uhn day-TAHY", // un détail
  "ele-vouloir-robe": "ewn ROHB", // une robe
  "ele-vouloir-autre": "OH-truh", // autre
  "ele-vouloir-explication": "ewn-nehk-splee-kah-SYOHN", // une explication
  "ele-vouloir-meilleur": "meh-YUHR", // meilleur
  "ele-vouloir-shopping": "luh shoh-PEENG", // le shopping
  "ele-venir-joie": "lah ZHWAH", // la joie
  "ele-venir-diner": "luh dee-NAY", // le dîner
  "ele-pouvoir-fois": "ewn FWAH", // une fois
  "ele-besoin-pere": "uhn PEHR", // un père
  "int-s-interesser-politique": "lah poh-lee-TEEK", // la politique
  "int-s-interesser-musique": "lah mew-ZEEK", // la musique
  "int-s-interesser-art": "LAHR", // l'art
  "int-s-interesser-science": "lah SYAHNS", // la science
  "int-s-interesser-mode": "lah MOHD", // la mode
  "int-s-interesser-photographie": "lah foh-toh-grah-FEE", // la photographie
  "int-s-interesser-mathematiques": "lay mah-tay-mah-TEEK", // les mathématiques
  "int-se-debrouiller-parfaitement": "pahr-feht-MAHN", // parfaitement
  "int-se-debrouiller-anglais": "lahn-GLEH", // l'anglais
  "int-s-ennuyer-peu": "uhn PUH", // un peu
  "int-s-ennuyer-pauvre": "POH-vruh", // pauvre
  "int-s-entrainer-equipe": "ewn-nay-KEEP", // une équipe
  "int-s-entrainer-mercredi": "mehr-kruh-DEE", // mercredi
  "int-s-entrainer-entrainement": "uhn-nahn-trehn-MAHN", // un entraînement
  "int-se-souvenir-premier": "pruh-MYAY", // premier
  "int-se-souvenir-souvenir": "uhn soov-NEER", // un souvenir
  "int-s-adapter-collegue": "uhn koh-LEHG", // un collègue
  "int-se-rejouir-mer": "lah MEHR", // la mer
  "int-mettre-manteau": "uhn mahn-TOH", // un manteau
  "int-mettre-echarpe": "ewn-nay-SHAHRP", // une écharpe
  "int-mettre-pull": "uhn PEWL", // un pull
  "int-mettre-telephone": "luh tay-lay-FOHN", // le téléphone
  "int-mettre-sel": "luh SEHL", // le sel
  "int-mettre-vetements": "lay veht-MAHN", // les vêtements
  "int-trouver-solution": "ewn soh-lew-SYOHN", // une solution
  "int-trouver-difficile": "dee-fee-SEEL", // difficile
  "int-trouver-billet": "uhn bee-YEH", // un billet
  "int-trouver-cahier": "uhn kah-YAY", // un cahier
  "int-trouver-interessant": "an-tay-reh-SAHN", // intéressant
  "int-croire-grand-mere": "ewn grahn-MEHR", // une grand-mère
  "int-croire-rumeur": "ewn rew-MUHR", // une rumeur
  "int-croire-excuse": "ewn-nehk-SKEWZ", // une excuse
  "int-parler-langue": "ewn LAHNG", // une langue
  "int-parler-seulement": "suhl-MAHN", // seulement
  "int-parler-italien": "ee-tah-LYAN", // italien
  "int-parler-espagnol": "ehs-pah-NYOHL", // espagnol
  "int-parler-grand-pere": "uhn grahn-PEHR", // un grand-père
  "int-prendre-bus": "luh BEWS", // le bus
  "int-prendre-metro": "luh may-TROH", // le métro
  "int-prendre-sante": "lah sahn-TAY", // la santé
  "int-prendre-douche": "ewn DOOSH", // une douche
  "int-prendre-parapluie": "uhn pah-rah-PLWEE", // un parapluie
  "int-prendre-escaliers": "lay-zehs-kah-LYAY", // les escaliers
  "int-prendre-sucre": "luh SEW-kruh", // le sucre
  "int-lire-journal": "luh zhoor-NAHL", // le journal
  "int-lire-roman": "uhn roh-MAHN", // un roman
  "int-lire-poesie": "lah poh-ay-ZEE", // la poésie
  "int-lire-etiquette": "ewn-nay-tee-KEHT", // une étiquette
  "int-lire-bande-dessinee": "ewn bahnd day-see-NAY", // une bande dessinée
  "int-ecrire-stylo": "uhn stee-LOH", // un stylo
  "int-ecrire-lettre": "ewn LEH-truh", // une lettre
  "int-ecrire-texto": "uhn tehk-STOH", // un texto
  "int-ecrire-petit-dejeuner": "luh puh-tee day-zhuh-NAY", // le petit déjeuner
  "int-ecrire-rapport": "uhn rah-POHR", // un rapport
  "int-ouvrir-fenetre": "ewn fuh-NEH-truh", // une fenêtre
  "int-ouvrir-hiver": "lee-VEHR", // l'hiver
  "int-ouvrir-dossier": "uhn doh-SYAY", // un dossier
  "int-fermer-examen": "uhn-nehg-zah-MAN", // un examen
  "int-fermer-armoire": "ewn-nahr-MWAHR", // une armoire
  "int-fermer-confiance": "lah kohn-FYAHNS", // la confiance
  "int-fermer-cours": "uhn KOOR", // un cours
  "int-perdre-portefeuille": "uhn pohr-tuh-FUHY", // un portefeuille
  "int-perdre-espoir": "lehs-PWAHR", // l'espoir
  "int-perdre-embouteillage": "uhn-nahn-boo-teh-YAHZH", // un embouteillage
  "int-perdre-foi": "lah FWAH", // la foi
  "int-garder-promesse": "ewn proh-MEHS", // une promesse
  "int-garder-propre": "PROH-pruh", // propre
  "int-garder-chaussure": "ewn shoh-SEWR", // une chaussure
  "int-garder-recu": "uhn ruh-SEW", // un reçu
  "int-garder-animal": "uhn-nah-nee-MAHL", // un animal
  "int-garder-lumiere": "lah lew-MYEHR", // la lumière
  "int-s-interesser-sujet": "uhn sew-ZHEH", // un sujet
  "int-s-interesser-litterature": "lah lee-tay-rah-TEWR", // la littérature
  "int-s-interesser-technologie": "lah tehk-noh-loh-ZHEE", // la technologie
  "int-se-debrouiller-aeroport": "lah-ay-roh-POHR", // l'aéroport
  "int-se-debrouiller-bagages": "lay bah-GAHZH", // les bagages
  "int-s-ennuyer-vie": "lah VEE", // la vie
  "int-s-entrainer-marathon": "luh mah-rah-TOHN", // le marathon
  "int-se-rejouir-nouvelle": "ewn noo-VEHL", // une nouvelle
  "int-mettre-chapeau": "uhn shah-POH", // un chapeau
  "int-mettre-beurre": "luh BUHR", // le beurre
  "int-mettre-vin": "luh VAN", // le vin
  "int-mettre-jouet": "uhn zhoo-EH", // un jouet
  "int-mettre-reveil": "luh ray-VEHY", // le réveil
  "int-mettre-placard": "luh plah-KAHR", // le placard
  "int-trouver-lit": "uhn LEE", // un lit
  "int-trouver-ouvert": "oo-VEHR", // ouvert
  "int-trouver-rapidement": "rah-peed-MAHN", // rapidement
  "int-croire-patron": "luh pah-TROHN", // le patron
  "int-croire-naif": "nah-EEF", // naïf
  "int-croire-conseil": "uhn kohn-SEHY", // un conseil
  "int-parler-proprietaire": "luh proh-pree-yay-TEHR", // le propriétaire
  "int-parler-colocataire": "ewn koh-loh-kah-TEHR", // une colocataire
  "int-parler-soiree": "ewn swah-RAY", // une soirée
  "int-parler-reve": "uhn REHV", // un rêve
  "int-prendre-ascenseur": "uhn-nah-sahn-SUHR", // un ascenseur
  "int-prendre-photo": "ewn foh-TOH", // une photo
  "int-prendre-autoroute": "loh-toh-ROOT", // l'autoroute
  "int-prendre-poisson": "luh pwah-SOHN", // le poisson
  "int-prendre-steak": "uhn STEHK", // un steak
  "int-prendre-delicieux": "day-lee-SYUH", // délicieux
  "int-prendre-pause": "ewn POHZ", // une pause
  "int-lire-auteur": "uhn-noh-TUHR", // un auteur
  "int-lire-chapitre": "uhn shah-PEE-truh", // un chapitre
  "int-lire-annonce": "ewn-nah-NOHNS", // une annonce
  "int-lire-page": "ewn PAHZH", // une page
  "int-lire-article": "uhn-nahr-TEEKL", // un article
  "int-ecrire-cv": "uhn say-VAY", // un CV
  "int-ecrire-formulaire": "uhn fohr-mew-LEHR", // un formulaire
  "int-ecrire-paroles": "lay pah-ROHL", // les paroles
  "int-ecrire-liste": "ewn LEEST", // une liste
  "int-ouvrir-patient": "pah-SYAHN", // patient
  "int-ouvrir-enveloppe": "ewn-nahn-VLOHP", // une enveloppe
  "int-ouvrir-boite": "ewn BWAHT", // une boîte
  "int-fermer-gaz": "luh GAHZ", // le gaz
  "int-fermer-tranquille": "trahn-KEEL", // tranquille
  "int-fermer-lentement": "lahnt-MAHN", // lentement
  "int-fermer-portail": "uhn pohr-TAHY", // un portail
  "int-perdre-victoire": "ewn veek-TWAHR", // une victoire
  "int-perdre-motivation": "lah moh-tee-vah-SYOHN", // la motivation
  "int-perdre-interet": "lan-tay-REH", // l'intérêt
  "int-garder-vieux": "VYUH", // vieux
  "int-garder-dessin": "uhn day-SAN", // un dessin
  "int-garder-mignon": "mee-NYOHN", // mignon
  "int-garder-contact": "luh kohn-TAHKT", // le contact
  "int-garder-chambre": "ewn SHAHN-bruh", // une chambre
  "int-garder-habitude": "ewn-nah-bee-TEWD", // une habitude
  "int-s-interesser-jardinage": "luh zhahr-dee-NAHZH", // le jardinage
  "int-s-interesser-retraite": "lah ruh-TREHT", // la retraite
  "int-s-interesser-peinture": "lah pan-TEWR", // la peinture
  "int-s-interesser-recherche": "lah ruh-SHEHRSH", // la recherche
  "int-se-debrouiller-dejeuner": "luh day-zhuh-NAY", // le déjeuner
  "int-se-debrouiller-sandwich": "uhn sahnd-WEETSH", // un sandwich
  "int-s-ennuyer-long": "LOHN", // long
  "int-s-ennuyer-tablette": "ewn tah-BLEHT", // une tablette
  "int-s-entrainer-camarade": "uhn kah-mah-RAHD", // un camarade
  "int-se-souvenir-a-temps": "ah TAHN", // à temps
  "int-s-adapter-felicitations": "lay fay-lee-see-tah-SYOHN", // les félicitations
  "int-s-adapter-climat": "luh klee-MAH", // le climat
  "int-s-adapter-la-bas": "lah-BAH", // là-bas
  "int-s-adapter-facilement": "fah-seel-MAHN", // facilement
  "int-s-adapter-plante": "ewn PLAHNT", // une plante
  "int-se-rejouir-journee": "ewn zhoor-NAY", // une journée
  "int-mettre-chemise": "ewn shuh-MEEZ", // une chemise
  "int-mettre-pantoufle": "ewn pahn-TOOFL", // une pantoufle
  "int-mettre-lait": "luh LEH", // le lait
  "int-mettre-epice": "ewn-nay-PEES", // une épice
  "int-mettre-plat": "uhn PLAH", // un plat
  "int-mettre-radio": "lah rah-DYOH", // la radio
  "int-trouver-appartement": "uhn-nah-pahr-tuh-MAHN", // un appartement
  "int-trouver-hotel": "uhn-noh-TEHL", // un hôtel
  "int-trouver-rue": "ewn REW", // une rue
  "int-trouver-taxi": "uhn tahk-SEE", // un taxi
  "int-trouver-passeport": "uhn pahs-POHR", // un passeport
  "int-trouver-route": "lah ROOT", // la route
  "int-trouver-utile": "ew-TEEL", // utile
  "int-croire-rarement": "rahr-MAHN", // rarement
  "int-croire-succes": "uhn sewk-SEH", // un succès
  "int-croire-miracle": "uhn mee-RAHKL", // un miracle
  "int-parler-invite": "uhn-nan-vee-TAY", // un invité
  "int-parler-conference": "ewn kohn-fay-RAHNS", // une conférence
  "int-parler-repas": "uhn ruh-PAH", // un repas
  "int-parler-eleve": "uhn-nay-LEHV", // un élève
  "int-parler-ceremonie": "ewn say-ray-moh-NEE", // une cérémonie
  "int-parler-minuit": "mee-NWEE", // minuit
  "int-prendre-raccourci": "uhn rah-koor-SEE", // un raccourci
  "int-prendre-aout": "OOT", // août
  "int-lire-conte": "uhn KOHNT", // un conte
  "int-lire-apres-midi": "uhn-nah-preh-mee-DEE", // un après-midi
  "int-lire-attentivement": "ah-tahn-teev-MAHN", // attentivement
  "int-lire-magazine": "uhn mah-gah-ZEEN", // un magazine
  "int-ecrire-carte-postale": "ewn kahrt pohs-TAHL", // une carte postale
  "int-ecrire-tableau": "uhn tah-BLOH", // un tableau
  "int-ecrire-dissertation": "ewn dee-sehr-tah-SYOHN", // une dissertation
  "int-ecrire-lundi": "lan-DEE", // lundi
  "int-ouvrir-classe": "lah KLAHS", // la classe
  "int-fermer-banque": "lah BAHNK", // la banque
  "int-perdre-prudent": "prew-DAHN", // prudent
  "int-perdre-accident": "uhn-nahk-see-DAHN", // un accident
  "int-garder-allume": "ah-lew-MAY", // allumé
  "int-garder-organise": "ohr-gah-nee-ZAY", // organisé
  "int-garder-fichier": "uhn fee-SHYAY", // un fichier
  // 1.2.5
  "phr-a-la-maison": "ah lah meh-ZOHN", // à la maison
  "phr-ce-soir": "suh SWAHR", // ce soir
  "phr-bon-courage": "bohn koo-RAHZH", // bon courage
  "phr-ce-matin": "suh mah-TAN", // ce matin
  "phr-ce-n-est-pas-grave": "suh neh pah GRAHV", // ce n'est pas grave
  "phr-quelle-chance": "kehl SHAHNS", // quelle chance
  "phr-tres-bien": "treh BYAN", // très bien
  "phr-bon-voyage": "bohn vwah-YAHZH", // bon voyage
  "phr-a-demain": "ah duh-MAN", // à demain
  "phr-en-vacances": "ahn vah-KAHNS", // en vacances
  "phr-quel-age": "keh-LAHZH", // quel âge
  "phr-bonne-idee": "boh-nee-DAY", // bonne idée
  "phr-a-tout-a-l-heure": "ah too-tah LUHR", // à tout à l'heure
  "phr-cet-ete": "seh-tay-TAY", // cet été
  "phr-chacun-son-plaisir": "shah-kan sohn pleh-ZEER", // chacun son plaisir
  "phr-a-la-plage": "ah lah PLAHZH", // à la plage
  "phr-a-ce-soir": "ah suh SWAHR", // à ce soir
  "phr-cette-annee": "seh-tah-NAY", // cette année
  "phr-bonne-route": "bohn ROOT", // bonne route
  "phr-bonnes-vacances": "bohn vah-KAHNS", // bonnes vacances
  "phr-la-semaine-prochaine": "lah suh-mehn proh-SHEHN", // la semaine prochaine
  "phr-demain-soir": "duh-man SWAHR", // demain soir
  "phr-en-voiture": "ahn vwah-TEWR", // en voiture
  "phr-tous-les-matins": "too lay mah-TAN", // tous les matins
  "phr-tous-les-jours": "too lay ZHOOR", // tous les jours
  "phr-chaque-jour": "shahk ZHOOR", // chaque jour
  "phr-ce-week-end": "suh wee-KEHND", // ce week-end
  "phr-d-ici": "dee-SEE", // d'ici
  "phr-pas-encore": "pah ahn-KOHR", // pas encore
  "phr-tout-de-suite": "toot SWEET", // tout de suite
  "phr-autre-chose": "oh-truh SHOHZ", // autre chose
  "phr-a-huit-heures": "ah wee-TUHR", // à huit heures
  "phr-a-samedi": "ah sahm-DEE", // à samedi
  "phr-si-tard": "see TAHR", // si tard
  "phr-merci-quand-meme": "mehr-see kahn MEHM", // merci quand même
  "phr-ah-bon": "ah BOHN", // ah bon
  "phr-hier-soir": "yehr SWAHR", // hier soir
  "phr-chacun-ses-gouts": "shah-kan say GOO", // chacun ses goûts
  "phr-l-annee-derniere": "lah-nay dehr-NYEHR", // l'année dernière
  "phr-a-ce-moment": "ah suh moh-MAHN", // à ce moment
  "phr-tant-pis": "tahn PEE", // tant pis
  "phr-a-pied": "ah PYAY", // à pied
  "phr-en-train": "ahn TRAN", // en train
  "phr-tous-les-deux": "too lay DUH", // tous les deux
  "phr-plus-tot": "plew TOH", // plus tôt
  "phr-tant-mieux": "tahn MYUH", // tant mieux
  "phr-bon-week-end": "bohn wee-KEHND", // bon week-end
  "phr-demain-matin": "duh-man mah-TAN", // demain matin
  "phr-bonne-chance": "bohn SHAHNS", // bonne chance
  "phr-a-noel": "ah noh-EHL", // à Noël
  "phr-plus-tard": "plew TAHR", // plus tard
  "phr-quelle-joie": "kehl ZHWAH", // quelle joie
  "phr-une-autre-fois": "ew-noh-truh FWAH", // une autre fois
  "phr-pas-de-probleme": "pah duh proh-BLEHM", // pas de problème
  "phr-chaque-soir": "shahk SWAHR", // chaque soir
  "phr-chaque-matin": "shahk mah-TAN", // chaque matin
  "phr-en-silencieux": "ahn see-lahn-SYUH", // en silencieux
  "phr-par-terre": "pahr TEHR", // par terre
  "phr-a-chaque-fois": "ah shahk FWAH", // à chaque fois
  "phr-pres-d-ici": "preh dee-SEE", // près d'ici
  "phr-depuis-longtemps": "duh-pwee lohn-TAHN", // depuis longtemps
  "phr-en-classe": "ahn KLAHS", // en classe
  "phr-chez-toi": "shay TWAH", // chez toi
  "phr-en-ligne": "ahn LEENY", // en ligne
  "phr-a-l-ancienne": "ah lahn-SYEHN", // à l'ancienne
  "phr-chaque-semaine": "shahk suh-MEHN", // chaque semaine
  "phr-chaque-lundi": "shahk lan-DEE", // chaque lundi
  "phr-au-tableau": "oh tah-BLOH", // au tableau
  "phr-en-ete": "ahn-nay-TAY", // en été
  "phr-en-hiver": "ahn-nee-VEHR", // en hiver
  "phr-a-neuf-heures": "ah nuh-VUHR", // à neuf heures
  "phr-a-cle": "ah KLAY", // à clé
  "phr-pendant-le-dejeuner": "pahn-dahn luh day-zhuh-NAY", // pendant le déjeuner
  "phr-tout-le-temps": "too luh TAHN", // tout le temps
  "phr-chaque-annee": "shah-kah-NAY", // chaque année
  "phr-a-la-nuit-tombee": "ah lah nwee tohn-BAY", // à la nuit tombée
  "phr-tous-les-mercredis": "too lay mehr-kruh-DEE", // tous les mercredis
  "phr-a-leur-place": "ah luhr PLAHS", // à leur place
  "phr-a-six-heures": "ah see-ZUHR", // à six heures
  "phr-sous-le-lit": "soo luh LEE", // sous le lit
  "phr-cette-fois-la": "seht fwah-LAH", // cette fois-là
  "phr-toute-la-soiree": "toot lah swah-RAY", // toute la soirée
  "phr-apres-l-ecole": "ah-preh lay-KOHL", // après l'école
  "phr-le-mois-dernier": "luh mwah dehr-NYAY", // le mois dernier
  "phr-a-l-heure": "ah LUHR", // à l'heure
  "phr-au-lieu-de": "oh lyuh DUH", // au lieu de
  "phr-en-deux-jours": "ahn duh ZHOOR", // en deux jours
  "phr-la-semaine-derniere": "lah suh-mehn dehr-NYEHR", // la semaine dernière
  "phr-au-moins": "oh MWAN", // au moins
  "phr-trois-a-un": "trwah-zah UHN", // trois à un
  "phr-le-dimanche": "luh dee-MAHNSH", // le dimanche
  "phr-tous-les-soirs": "too lay SWAHR", // tous les soirs
  "phr-le-lundi": "luh lan-DEE", // le lundi
  "int-mettre-assiette": "ewn-nah-SYEHT", // une assiette
  "int-mettre-tiroir": "luh tee-RWAHR", // le tiroir
  "int-mettre-etagere": "ewn-nay-tah-ZHEHR", // une étagère
  "int-mettre-poubelles": "lay poo-BEHL", // les poubelles
  "int-mettre-frigo": "luh free-GOH", // le frigo
  "int-mettre-dehors": "duh-OHR", // dehors
  "int-mettre-fleur": "ewn FLUHR", // une fleur
  "int-mettre-jardin": "uhn zhahr-DAN", // un jardin
  "int-mettre-tradition": "ewn trah-dee-SYOHN", // une tradition
  "int-mettre-joli": "zhoh-LEE", // joli
  "phr-chaque-ete": "shah-kay-TAY", // chaque été
  "phr-chaque-automne": "shah-koh-TOHN", // chaque automne
  "int-trouver-champignon": "uhn shahn-pee-NYOHN", // un champignon
  "int-trouver-foret": "lah foh-REH", // la forêt
  "int-trouver-coquillage": "uhn koh-kee-YAHZH", // un coquillage
  "int-trouver-trefle-a-quatre-feuilles": "uhn treh-fluh ah kah-truh FUHY", // un trèfle à quatre feuilles
  "int-trouver-lecon": "ewn luh-SOHN", // une leçon
  "int-trouver-ennuyeux": "ahn-nwee-YUH", // ennuyeux
  "int-trouver-place": "ewn PLAHS", // une place
  "int-trouver-crabe": "uhn KRAHB", // un crabe
  "int-trouver-rocher": "uhn roh-SHAY", // un rocher
  "int-trouver-amusant": "ah-mew-ZAHN", // amusant
  "int-croire-pere-noel": "luh pehr noh-EHL", // le père Noël
  "int-croire-meteo": "lah may-tay-OH", // la météo
  "int-croire-politiciens": "lay poh-lee-tee-SYAN", // les politiciens
  "int-croire-publicite": "ewn pew-blee-see-TAY", // une publicité
  "int-croire-horoscope": "uhn-noh-rohs-KOHP", // un horoscope
  "int-croire-incroyable": "an-krwah-YAH-bluh", // incroyable
  "int-croire-loup": "uhn LOO", // un loup
  "phr-au-telephone": "oh tay-lay-FOHN", // au téléphone
  "phr-pendant-des-heures": "pahn-dahn day-ZUHR", // pendant des heures
  "phr-au-travail": "oh trah-VAHY", // au travail
  "phr-trop-longtemps": "troh lohn-TAHN", // trop longtemps
  "phr-apres-le-cours": "ah-preh luh KOOR", // après le cours
  "int-parler-adolescent": "uhn-nah-doh-leh-SAHN", // un adolescent
  "int-parler-meilleur-ami": "uhn meh-yuh-rah-MEE", // un meilleur ami
  "int-parler-trop": "TROH", // trop
  "phr-le-samedi": "luh sahm-DEE", // le samedi
  "phr-pendant-les-vacances": "pahn-dahn lay vah-KAHNS", // pendant les vacances
  "int-prendre-gare": "lah GAHR", // la gare
  "int-prendre-note": "ewn NOHT", // une note
  "int-prendre-bateau": "uhn bah-TOH", // un bateau
  "phr-en-secret": "ahn suh-KREH", // en secret
  "int-lire-instructions": "lay-zan-strewk-SYOHN", // les instructions
  "int-lire-menu": "luh muh-NEW", // le menu
  "int-lire-e-mail": "uhn-nee-MEHL", // un e-mail
  "int-lire-informations": "lay-zan-fohr-mah-SYOHN", // les informations
  "int-lire-poeme": "uhn poh-EHM", // un poème
  "int-lire-couverture": "ewn koo-vehr-TEWR", // une couverture
  "phr-a-l-etranger": "ah lay-trahn-ZHAY", // à l'étranger
  "int-ecrire-chanson": "ewn shahn-SOHN", // une chanson
  "int-ecrire-liste-de-courses": "ewn leest duh KOORS", // une liste de courses
  "int-ecrire-carnet": "uhn kahr-NEH", // un carnet
  "int-ecrire-correspondant": "uhn koh-rehs-pohn-DAHN", // un correspondant
  "int-ecrire-moyen": "uhn mwah-YAN", // un moyen
  "int-ecrire-garcon": "uhn gahr-SOHN", // un garçon
  "phr-a-sept-heures": "ah seh-TUHR", // à sept heures
  "phr-le-vendredi": "luh vahn-druh-DEE", // le vendredi
  "int-ouvrir-colis": "uhn koh-LEE", // un colis
  "int-ouvrir-courrier": "luh koo-RYAY", // le courrier
  "int-ouvrir-rideaux": "lay ree-DOH", // les rideaux
  "int-ouvrir-bouteille": "ewn boo-TEHY", // une bouteille
  "int-ouvrir-impatient": "an-pah-SYAHN", // impatient
  "phr-avant-de-partir": "ah-vahn duh pahr-TEER", // avant de partir
  "int-fermer-volets": "lay voh-LEH", // les volets
  "int-fermer-valise": "ewn vah-LEEZ", // une valise
  "int-fermer-tante": "ewn TAHNT", // une tante
  "int-fermer-ancien": "ahn-SYAN", // ancien
  "phr-chaque-hiver": "shahk ee-VEHR", // chaque hiver
  "int-perdre-poids": "luh PWAH", // le poids
  "int-perdre-cartes": "lay KAHRT", // les cartes
  "int-perdre-tennis": "luh teh-NEES", // le tennis
  "int-perdre-foot": "luh FOOT", // le foot
  "int-perdre-presque": "PREHSK", // presque
  "int-perdre-entraineur": "uhn-nahn-treh-NUHR", // un entraîneur
  "phr-le-mercredi": "luh mehr-kruh-DEE", // le mercredi
  "int-garder-bebe": "uhn bay-BAY", // un bébé
  "int-garder-monnaie": "lah moh-NEH", // la monnaie
  "int-garder-amitie": "lah-mee-TYAY", // l'amitié
  "int-garder-vrai": "VREH", // vrai
  "phr-au-mauvais-moment": "oh moh-veh moh-MAHN", // au mauvais moment
  "phr-comme-toujours": "kohm too-ZHOOR", // comme toujours
  "int-mettre-vase": "uhn VAHZ", // un vase
  "int-mettre-four": "luh FOOR", // le four
  "int-mettre-arrivee": "lah-ree-VAY", // l'arrivée
  "int-mettre-salon": "luh sah-LOHN", // le salon
  "int-mettre-appel": "uhn-nah-PEHL", // un appel
  "int-trouver-paillasson": "luh pah-yah-SOHN", // le paillasson
  "int-trouver-grenier": "luh gruh-NYAY", // le grenier
  "int-trouver-addition": "lah-dee-SYOHN", // l'addition
  "int-trouver-retour": "luh ruh-TOOR", // le retour
  "int-trouver-garage": "uhn gah-RAHZH", // un garage
  "int-trouver-aventurier": "uhn-nah-vahn-tew-RYAY", // un aventurier
  "int-croire-journaliste": "uhn zhoor-nah-LEEST", // un journaliste
  "int-croire-temoin": "uhn tay-MWAN", // un témoin
  "int-croire-vendeur": "uhn vahn-DUHR", // un vendeur
  "int-croire-video": "ewn vee-day-OH", // une vidéo
  "int-croire-requin": "uhn ruh-KAN", // un requin
  "phr-en-francais": "ahn frahn-SEH", // en français
  "int-parler-sejour": "uhn say-ZHOOR", // un séjour
  "int-parler-premiere": "ewn pruh-MYEHR", // une première
  "phr-la-mauvaise-route": "lah moh-vehz ROOT", // la mauvaise route
  "int-prendre-jour-de-conge": "uhn zhoor duh kohn-ZHAY", // un jour de congé
  "int-prendre-croissant": "uhn krwah-SAHN", // un croissant
  "int-prendre-gouter": "uhn goo-TAY", // un goûter
  "int-prendre-copain": "uhn koh-PAN", // un copain
  "phr-ce-matin-la": "suh mah-tan-LAH", // ce matin-là
  "phr-l-ete-dernier": "lay-tay dehr-NYAY", // l'été dernier
  "int-lire-contrat": "uhn kohn-TRAH", // un contrat
  "int-lire-meuble": "uhn MUH-bluh", // un meuble
  "phr-la-veille": "lah VEHY", // la veille
  "phr-un-seul-mot": "uhn suhl MOH", // un seul mot
  "int-ecrire-discours": "uhn dees-KOOR", // un discours
  "int-ecrire-redaction": "ewn ray-dahk-SYOHN", // une rédaction
  "int-ouvrir-compte-en-banque": "uhn kohnt ahn BAHNK", // un compte en banque
  "int-ouvrir-clients": "lay klee-YAHN", // les clients
  "int-ouvrir-champagne": "luh shahn-PAHNY", // le champagne
  "int-ouvrir-dessert": "luh deh-SEHR", // le dessert
  "phr-oh-la-la": "oh lah LAH", // oh là là
  "int-fermer-ordinateur-portable": "uhn-nohr-dee-nah-tuhr pohr-TAH-bluh", // un ordinateur portable
  "int-fermer-orage": "uhn-noh-RAHZH", // un orage
  "int-fermer-tente": "ewn TAHNT", // une tente
  "int-fermer-coffre": "luh KOH-fruh", // le coffre
  "int-fermer-mouille": "moo-YAY", // mouillé
  "int-perdre-pari": "uhn pah-REE", // un pari
  "int-perdre-triste": "TREEST", // triste
  "int-perdre-heureusement": "uh-ruhz-MAHN", // heureusement
  "int-perdre-mouvemente": "moov-mahn-TAY", // mouvementé
  "phr-pendant-une-semaine": "pahn-dahn ewn suh-MEHN", // pendant une semaine
  "phr-en-souvenir": "ahn soo-vuh-NEER", // en souvenir
  "phr-pour-plus-tard": "poor plew TAHR", // pour plus tard
  "int-garder-ticket-de-caisse": "uhn tee-keh duh KEHS", // un ticket de caisse
  "int-garder-surprise": "ewn sewr-PREEZ", // une surprise
  "int-garder-epoque": "ewn-nay-POHK", // une époque
  "int-garder-ours-en-peluche": "uhn-noors ahn puh-LEWSH", // un ours en peluche
  "int-garder-adorable": "ah-doh-RAH-bluh", // adorable
  "phr-au-lit": "oh LEE", // au lit
  "phr-a-gauche": "ah GOHSH", // à gauche
  "phr-l-annee-prochaine": "lah-nay proh-SHEHN", // l'année prochaine
  "phr-tout-le-monde": "too luh MOHND", // tout le monde
  "phr-apres-minuit": "ah-preh mee-NWEE", // après minuit
  "phr-le-mois-prochain": "luh mwah proh-SHAN", // le mois prochain
  "phr-en-aout": "ahn-NOOT", // en août
  "phr-cet-apres-midi": "seh-tah-preh-mee-DEE", // cet après-midi
  "phr-lundi-prochain": "lan-dee proh-SHAN", // lundi prochain
  "phr-chaque-nuit": "shahk NWEE", // chaque nuit
  "phr-a-quelle-heure": "ah keh-LUHR", // à quelle heure
  "phr-en-ville": "ahn VEEL", // en ville
  "phr-par-accident": "pah-rahk-see-DAHN", // par accident
  "phr-merci-mille-fois": "mehr-see meel FWAH", // merci mille fois
  "phr-tout-seul": "too SUHL", // tout seul
  "phr-sans-aide": "sahn-ZEHD", // sans aide
  "phr-sans-problemes": "sahn proh-BLEHM", // sans problèmes
  "phr-trois-fois-par-semaine": "trwah fwah pahr suh-MEHN", // trois fois par semaine
  "phr-tres-vite": "treh VEET", // très vite
  "phr-en-voyage": "ahn vwah-YAHZH", // en voyage
  "phr-pourquoi-pas": "poor-kwah PAH", // pourquoi pas
  "phr-c-est-la-vie": "seh lah VEE", // c'est la vie
  "phr-a-cette-epoque": "ah seht ay-POHK", // à cette époque
  "int-sinteresser-lycee": "luh lee-SAY", // le lycée
  "int-sinteresser-football": "luh foot-BOHL", // le football
  "int-se-debrouiller-carte": "ewn KAHRT", // une carte
  "int-se-debrouiller-distributeur-de-billets": "luh dees-tree-bew-tuhr duh bee-YEH", // le distributeur de billets
  "int-se-debrouiller-ordinateur": "uhn-nohr-dee-nah-TUHR", // un ordinateur
  "int-se-debrouiller-pates": "lay PAHT", // les pâtes
  "int-se-debrouiller-riz": "luh REE", // le riz
  "int-se-debrouiller-plus-mal": "plew MAHL", // plus mal
  "phr-a-l-ecole": "ah lay-KOHL", // à l'école
  "int-sennuyer-campagne": "lah kahn-PAHNY", // la campagne
  "int-sennuyer-cousin": "uhn koo-ZAN", // un cousin
  "int-sennuyer-loin-de": "lwan DUH", // loin de
  "phr-tout-l-hiver": "too lee-VEHR", // tout l'hiver
  "phr-deux-fois-par-semaine": "duh fwah pahr suh-MEHN", // deux fois par semaine
  "int-sentrainer-salle-de-sport": "lah sahl duh SPOHR", // la salle de sport
  "int-sentrainer-piscine": "lah pee-SEEN", // la piscine
  "int-sentrainer-college": "luh koh-LEHZH", // le collège
  "int-sentrainer-basket": "luh bahs-KEHT", // le basket
  "int-sentrainer-jardin": "luh zhahr-DAN", // le jardin
  "int-se-souvenir-recette": "ewn ruh-SEHT", // une recette
  "int-se-souvenir-numero-de-telephone": "uhn new-may-roh duh tay-lay-FOHN", // un numéro de téléphone
  "int-se-souvenir-chef": "luh SHEHF", // le chef
  "int-se-souvenir-livre-de-recettes": "uhn lee-vruh duh ruh-SEHT", // un livre de recettes
  "int-se-souvenir-ingredient": "uhn-nan-gray-DYAHN", // un ingrédient
  "int-se-souvenir-quantite": "ewn kahn-tee-TAY", // une quantité
  "phr-pas-du-tout": "pah dew TOO", // pas du tout
  "int-sadapter-bruit": "luh BRWEE", // le bruit
  "int-sadapter-emploi": "uhn-nahn-PLWAH", // un emploi
  "int-sadapter-horaires": "lay-zoh-REHR", // les horaires
  "int-sadapter-chaleur": "lah shah-LUHR", // la chaleur
  "int-sadapter-neige": "lah NEHZH", // la neige
  "phr-toute-l-annee": "toot lah-NAY", // toute l'année
  "int-se-rejouir-beau-temps": "luh boh TAHN", // le beau temps
  "int-se-rejouir-visite": "ewn vee-ZEET", // une visite
  "int-se-rejouir-grandes-vacances": "lay grahnd vah-KAHNS", // les grandes vacances
  "int-se-rejouir-festival": "uhn fehs-tee-VAHL", // un festival
  "int-se-rejouir-autant-que": "oh-tahn KUH", // autant que
  "int-se-rejouir-surtout": "sewr-TOO", // surtout
  "int-se-rejouir-genial": "zhay-NYAHL", // génial
  "int-sinteresser-passion": "ewn pah-SYOHN", // une passion
  "int-sinteresser-universite": "lew-nee-vehr-see-TAY", // l'université
  "int-sinteresser-artiste": "uhn-nahr-TEEST", // un artiste
  "phr-en-bus": "ahn BEWS", // en bus
  "int-se-debrouiller-vol": "uhn VOHL", // un vol
  "int-se-debrouiller-mecanicien": "uhn may-kah-nee-SYAN", // un mécanicien
  "int-se-debrouiller-efficace": "eh-fee-KAHS", // efficace
  "phr-quelque-chose": "kehl-kuh SHOHZ", // quelque chose
  "int-sennuyer-camping": "luh kahn-PEENG", // le camping
  "int-sentrainer-competition": "ewn kohn-pay-tee-SYOHN", // une compétition
  "int-sentrainer-course": "lah KOORS", // la course
  "int-sentrainer-club": "uhn KLUHB", // un club
  "phr-le-premier-jour": "luh pruh-myay ZHOOR", // le premier jour
  "int-sadapter-depart": "uhn day-PAHR", // un départ
  "int-sadapter-situation": "lah see-tew-ah-SYOHN", // la situation
  "phr-pendant-des-semaines": "pahn-dahn day suh-MEHN", // pendant des semaines
  "int-se-rejouir-mariage": "uhn mah-RYAHZH", // un mariage
  "int-se-rejouir-naissance": "ewn neh-SAHNS", // une naissance
  "int-se-rejouir-groupe": "uhn GROOP", // un groupe
  "int-se-rejouir-prefere": "pray-fay-RAY", // préféré
  "int-se-rejouir-jazz": "luh DJAHZ", // le jazz
  "phr-a-la-retraite": "ah lah ruh-TREHT", // à la retraite
};
