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
};
