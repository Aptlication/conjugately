#!/usr/bin/env python3
"""
French Verb Master - Beginner Level Content
Created: January 12, 2025
For French grammar verification and error correction via Claude/Perplexity
"""

# ORIGINAL VERSION - FOR GRAMMAR CORRECTION
beginner_content_original = {
    "level_info": {
        "name": "Beginner",
        "level_number": 1,
        "verbs": ["être", "avoir", "faire"],
        "tenses": ["Présent", "Passé Composé", "Futur Simple"],
        "time_frame_mapping": {
            "Present": "Présent",
            "Past": "Passé Composé", 
            "Future": "Futur Simple"
        },
        "course_structure": {
            "units": [
                {"name": "Unit 1: être (to be)", "verb": "être", "questions": 20},
                {"name": "Unit 2: avoir (to have)", "verb": "avoir", "questions": 20},
                {"name": "Unit 3: faire (to do/make)", "verb": "faire", "questions": 20}
            ],
            "final_exam": {
                "questions": 30,
                "questions_per_verb": 10,
                "pass_threshold": 27,
                "pass_percentage": "90%"
            }
        }
    },
    
    "verb_conjugations": {
        "être": {
            "présent": {
                "je": "suis",
                "tu": "es", 
                "il": "est",
                "elle": "est",
                "nous": "sommes",
                "vous": "êtes",
                "ils": "sont",
                "elles": "sont"
            },
            "passé_composé": {
                "je": "ai été",
                "tu": "as été",
                "il": "a été", 
                "elle": "a été",
                "nous": "avons été",
                "vous": "avez été",
                "ils": "ont été",
                "elles": "ont été"
            },
            "futur_simple": {
                "je": "serai",
                "tu": "seras",
                "il": "sera",
                "elle": "sera", 
                "nous": "serons",
                "vous": "serez",
                "ils": "seront",
                "elles": "seront"
            }
        },
        
        "avoir": {
            "présent": {
                "je": "ai",
                "tu": "as",
                "il": "a",
                "elle": "a",
                "nous": "avons", 
                "vous": "avez",
                "ils": "ont",
                "elles": "ont"
            },
            "passé_composé": {
                "je": "ai eu",
                "tu": "as eu",
                "il": "a eu",
                "elle": "a eu",
                "nous": "avons eu",
                "vous": "avez eu",
                "ils": "ont eu",
                "elles": "ont eu"
            },
            "futur_simple": {
                "je": "aurai",
                "tu": "auras",
                "il": "aura",
                "elle": "aura",
                "nous": "aurons",
                "vous": "aurez", 
                "ils": "auront",
                "elles": "auront"
            }
        },
        
        "faire": {
            "présent": {
                "je": "fais",
                "tu": "fais",
                "il": "fait",
                "elle": "fait",
                "nous": "faisons",
                "vous": "faites",
                "ils": "font",
                "elles": "font"
            },
            "passé_composé": {
                "je": "ai fait",
                "tu": "as fait",
                "il": "a fait",
                "elle": "a fait",
                "nous": "avons fait",
                "vous": "avez fait",
                "ils": "ont fait", 
                "elles": "ont fait"
            },
            "futur_simple": {
                "je": "ferai",
                "tu": "feras",
                "il": "fera",
                "elle": "fera",
                "nous": "ferons",
                "vous": "ferez",
                "ils": "feront",
                "elles": "feront"
            }
        }
    },
    
    "context_sentences": {
        "être": [
            {"english": "I am happy.", "french": "Je suis heureux/heureuse.", "context": "heureux/heureuse", "pronoun": "je"},
            {"english": "You are tired.", "french": "Tu es fatigué(e).", "context": "fatigué(e)", "pronoun": "tu"},
            {"english": "He is a student.", "french": "Il est étudiant.", "context": "étudiant", "pronoun": "il"},
            {"english": "She is a teacher.", "french": "Elle est professeure.", "context": "professeure", "pronoun": "elle"},
            {"english": "We are friends.", "french": "Nous sommes amis.", "context": "amis", "pronoun": "nous"},
            {"english": "You (plural) are ready.", "french": "Vous êtes prêts.", "context": "prêts", "pronoun": "vous"},
            {"english": "They are busy.", "french": "Ils sont occupés.", "context": "occupés", "pronoun": "ils"},
            {"english": "I am not here.", "french": "Je ne suis pas ici.", "context": "ici", "pronoun": "je", "negative": True},
            {"english": "She is not sick.", "french": "Elle n'est pas malade.", "context": "malade", "pronoun": "elle", "negative": True},
            {"english": "We are not late.", "french": "Nous ne sommes pas en retard.", "context": "en retard", "pronoun": "nous", "negative": True}
        ],
        
        "avoir": [
            {"english": "I have a car.", "french": "J'ai une voiture.", "context": "une voiture", "pronoun": "je"},
            {"english": "You have time.", "french": "Tu as du temps.", "context": "du temps", "pronoun": "tu"},
            {"english": "He has money.", "french": "Il a de l'argent.", "context": "de l'argent", "pronoun": "il"},
            {"english": "She has a dog.", "french": "Elle a un chien.", "context": "un chien", "pronoun": "elle"},
            {"english": "We have homework.", "french": "Nous avons des devoirs.", "context": "des devoirs", "pronoun": "nous"},
            {"english": "You (plural) have luck.", "french": "Vous avez de la chance.", "context": "de la chance", "pronoun": "vous"},
            {"english": "They have problems.", "french": "Ils ont des problèmes.", "context": "des problèmes", "pronoun": "ils"},
            {"english": "I don't have anything.", "french": "Je n'ai rien.", "context": "rien", "pronoun": "je", "negative": True},
            {"english": "She has a choice.", "french": "Elle a le choix.", "context": "le choix", "pronoun": "elle"},
            {"english": "We have time.", "french": "Nous avons le temps.", "context": "le temps", "pronoun": "nous"}
        ],
        
        "faire": [
            {"english": "I do homework.", "french": "Je fais mes devoirs.", "context": "mes devoirs", "pronoun": "je"},
            {"english": "You make dinner.", "french": "Tu fais le dîner.", "context": "le dîner", "pronoun": "tu"},
            {"english": "He does exercise.", "french": "Il fait du sport.", "context": "du sport", "pronoun": "il"},
            {"english": "She makes a cake.", "french": "Elle fait un gâteau.", "context": "un gâteau", "pronoun": "elle"},
            {"english": "We do shopping.", "french": "Nous faisons les courses.", "context": "les courses", "pronoun": "nous"},
            {"english": "You (plural) make music.", "french": "Vous faites de la musique.", "context": "de la musique", "pronoun": "vous"},
            {"english": "They do work.", "french": "Ils font du travail.", "context": "du travail", "pronoun": "ils"},
            {"english": "I don't do anything.", "french": "Je ne fais rien.", "context": "rien", "pronoun": "je", "negative": True},
            {"english": "She doesn't make mistakes.", "french": "Elle ne fait pas d'erreurs.", "context": "pas d'erreurs", "pronoun": "elle", "negative": True},
            {"english": "We don't do that.", "french": "Nous ne faisons pas ça.", "context": "pas ça", "pronoun": "nous", "negative": True}
        ]
    },
    
    "sample_quiz_questions": [
        {
            "question": "I am happy.",
            "verb": "être",
            "tense": "présent", 
            "hint": "Use the present tense form of être for je",
            "answer_options": [
                {
                    "text": "Je suis heureux.",
                    "rationale": "This uses the correct present tense conjugation of être for je.",
                    "is_correct": True
                },
                {
                    "text": "Je es heureux.",
                    "rationale": "The conjugation 'es' is for tu, not je.",
                    "is_correct": False
                },
                {
                    "text": "Je est heureux.",
                    "rationale": "The conjugation 'est' is for il/elle, not je.",
                    "is_correct": False
                },
                {
                    "text": "J'étais heureux.",
                    "rationale": "This uses the imperfect tense, not present tense.", 
                    "is_correct": False
                }
            ]
        },
        {
            "question": "You are tired.",
            "verb": "être",
            "tense": "présent",
            "hint": "Use the present tense form of être for tu",
            "answer_options": [
                {
                    "text": "Tu es fatigué.",
                    "rationale": "This is the correct present tense conjugation of être for tu.",
                    "is_correct": True
                },
                {
                    "text": "Tu suis fatigué.",
                    "rationale": "The conjugation 'suis' is for je, not tu.",
                    "is_correct": False
                },
                {
                    "text": "Tu êtes fatigué.",
                    "rationale": "The conjugation 'êtes' is for vous, not tu.",
                    "is_correct": False
                },
                {
                    "text": "Tu sera fatigué.",
                    "rationale": "This uses the future tense, not present tense.",
                    "is_correct": False
                }
            ]
        },
        {
            "question": "She is not here.",
            "verb": "être",
            "tense": "présent",
            "hint": "Use the negative form with ne...pas around être",
            "answer_options": [
                {
                    "text": "Elle n'est pas ici.",
                    "rationale": "This correctly places ne...pas around the conjugated verb.",
                    "is_correct": True
                },
                {
                    "text": "Elle ne pas est ici.",
                    "rationale": "The negation is incorrectly placed before the verb.",
                    "is_correct": False
                },
                {
                    "text": "Elle est ne pas ici.",
                    "rationale": "The negation should wrap around the verb, not come after.",
                    "is_correct": False
                },
                {
                    "text": "Elle n'était pas ici.",
                    "rationale": "This uses the imperfect tense instead of present tense.",
                    "is_correct": False
                }
            ]
        }
    ],
    
    "grammar_rules": {
        "negation_patterns": {
            "présent": {
                "pattern": "ne + verb + pas",
                "examples": [
                    "Je ne suis pas → Je ne suis pas heureux",
                    "Tu n'es pas → Tu n'es pas fatigué",
                    "Il n'est pas → Il n'est pas ici"
                ]
            },
            "passé_composé": {
                "pattern": "ne + auxiliary + pas + past_participle", 
                "examples": [
                    "Je n'ai pas été → Je n'ai pas été malade",
                    "Tu n'as pas eu → Tu n'as pas eu le temps",
                    "Elle n'a pas fait → Elle n'a pas fait ses devoirs"
                ]
            },
            "futur_simple": {
                "pattern": "ne + verb + pas",
                "examples": [
                    "Je ne serai pas → Je ne serai pas là",
                    "Tu n'auras pas → Tu n'auras pas le temps", 
                    "Il ne fera pas → Il ne fera pas ça"
                ]
            }
        },
        
        "gender_agreement": {
            "masculine_forms": ["heureux", "fatigué", "occupé", "prêt"],
            "feminine_forms": ["heureuse", "fatiguée", "occupée", "prête"],
            "note": "Agreement with subject in être constructions"
        },
        
        "pronunciation_notes": {
            "être": "Silent final 'e' in most forms",
            "avoir": "Liaison with vowel sounds (j'ai, ils ont)",
            "faire": "'ai' sound in je fais, tu fais, nous faisons"
        }
    },
    
    "verification_checklist": {
        "conjugation_errors": [
            "Correct subject-verb agreement for all pronouns",
            "Proper auxiliary verb usage in Passé Composé (avoir vs être)",
            "Accurate future tense stem changes (ser-, aur-, fer-)"
        ],
        "negation_errors": [
            "Correct placement of ne...pas around conjugated verb",
            "Proper contraction with apostrophe (ne → n' before vowel)", 
            "No double negation (pas pas errors)"
        ],
        "gender_number_agreement": [
            "Adjective agreement with subject gender",
            "Plural forms correctly applied",
            "Feminine forms properly used"
        ],
        "spelling_accents": [
            "Correct accent marks on verb forms (être, êtes, été)",
            "Proper apostrophe usage (j'ai, n'est, etc.)",
            "Accurate spelling of irregular forms"
        ],
        "context_appropriateness": [
            "English sentences appropriate for beginner level",
            "French translations match difficulty level", 
            "Vocabulary suitable for beginners"
        ]
    }
}

# CORRECTED VERSION - TO BE FILLED AFTER CLAUDE/PERPLEXITY REVIEW
beginner_content_corrected = {
    # This will be populated with the corrected version
    # after Claude/Perplexity grammar verification
    "status": "awaiting_corrections",
    "corrections_applied": [],
    "verified_by": None,
    "verification_date": None
}

if __name__ == "__main__":
    print("French Verb Master - Beginner Level Content")
    print(f"Total verbs: {len(beginner_content_original['level_info']['verbs'])}")
    print(f"Total tenses: {len(beginner_content_original['level_info']['tenses'])}")
    print(f"Total context sentences: {sum(len(sentences) for sentences in beginner_content_original['context_sentences'].values())}")
    print(f"Sample quiz questions: {len(beginner_content_original['sample_quiz_questions'])}")
    print("\nReady for grammar verification via Claude/Perplexity!")