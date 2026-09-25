# ElevenLabs recording list — se débrouiller (bug log 1.1.18)

**40 answer phrases** authored on 24 September have no audio. Until they are
recorded, answer playback is silent for these questions — nothing errors, it just
does not speak.

## Filename convention (verified against the existing manifest)

`intr_` + first 16 hex characters of `sha256(phrase as UTF-8)` + `.mp3`

The exact target filename is given for every phrase below, so the files can be
generated and dropped straight in.

## Order of operations — this matters

1. Generate the mp3s **first**, in the same voice as the rest of the Intermediate set.
2. Place them alongside the existing `intr_*.mp3` files.
3. **Only then** merge `docs/audio-manifest-fragment.json` into
   `attached_assets/tts-manifest.json`.

Adding the manifest entries before the files exist would turn a silent answer into
a failed request. Per GLOSSARY.md, no manifest entry means no playback and nothing
is ever generated at runtime — silence is the safe state, a broken path is not.

## Phrases


### passé_composé

- **`Me suis-je débrouillé(e) tout(e) seul(e) ?`**  
  _Did I manage on my own?_  
  → `intr_add629b54d1eb543.mp3`
- **`Est-ce que tu t'es bien débrouillé(e) ?`**  
  _Did you (singular) manage well?_  
  → `intr_8726645669ac9e95.mp3`
- **`Il ne s'est pas débrouillé du tout.`**  
  _He did not manage at all._  
  → `intr_451102b985122c84.mp3`
- **`Nous nous sommes bien débrouillés.`**  
  _We managed fine._  
  → `intr_c25e26a57af31672.mp3`
- **`Elle s'est débrouillée toute seule.`**  
  _She managed on her own._  
  → `intr_204db7374ab7f7b9.mp3`
- **`Vous vous êtes très bien débrouillés.`**  
  _You (plural) managed very well._  
  → `intr_b66156440d85908e.mp3`
- **`Ils ne se sont pas débrouillés sans aide.`**  
  _They (masculine) did not manage without help._  
  → `intr_058c2354bb4f22e5.mp3`
- **`Vous êtes-vous bien débrouillé(e) ?`**  
  _Did you (formal) manage alright?_  
  → `intr_3eb62a75f2792adb.mp3`
- **`Se sont-elles débrouillées seules ?`**  
  _Did they (feminine) manage alone?_  
  → `intr_051e9c6fbdacafd3.mp3`
- **`Ne nous sommes-nous pas débrouillés sans problèmes ?`**  
  _Didn't we manage without problems?_  
  → `intr_0a11802315cc187b.mp3`
- **`Je ne me suis pas débrouillé(e) seul(e).`**  
  _I did not manage alone._  
  → `intr_7aa0b5aa515ad69b.mp3`
- **`Elle s'est débrouillée parfaitement.`**  
  _She managed perfectly._  
  → `intr_012f537db3540939.mp3`
- **`Nous nous sommes débrouillés ensemble.`**  
  _We managed together._  
  → `intr_0d45d6238089f60c.mp3`
- **`Ne t'es-tu pas bien débrouillé(e) ?`**  
  _Didn't you (singular) manage well?_  
  → `intr_2e384b4fa962580b.mp3`
- **`Il ne s'est pas débrouillé sans aide.`**  
  _He did not manage without help._  
  → `intr_c55eb2812ada6420.mp3`
- **`Vous vous êtes débrouillés tout seuls.`**  
  _You (plural) managed everything alone._  
  → `intr_60946b940067af20.mp3`
- **`Se sont-ils bien débrouillés ?`**  
  _Did they (masculine) manage well?_  
  → `intr_4d756ffb197873f0.mp3`
- **`Comment est-ce que je me suis débrouillé(e) avec ça ?`**  
  _How did I manage with that?_  
  → `intr_aa9f15ae195d0797.mp3`
- **`Ils ne se sont pas débrouillés seuls.`**  
  _They (masculine) did not manage alone._  
  → `intr_744e79d756322a8c.mp3`
- **`Elles se sont débrouillées sans problèmes.`**  
  _They (feminine) managed without problems._  
  → `intr_2a242f4bc4cbe950.mp3`

### futur_simple

- **`Est-ce que je me débrouillerai tout(e) seul(e) ?`**  
  _Will I manage on my own?_  
  → `intr_b2da53b10e5806ef.mp3`
- **`Est-ce que tu te débrouilleras bien ?`**  
  _Will you (singular) manage well?_  
  → `intr_1fcff9096ef8d9b7.mp3`
- **`Il ne se débrouillera pas du tout.`**  
  _He will not manage at all._  
  → `intr_51503e91afe39cc2.mp3`
- **`Nous nous débrouillerons bien.`**  
  _We will manage fine._  
  → `intr_3cd0d2da7915899e.mp3`
- **`Elle se débrouillera toute seule.`**  
  _She will manage on her own._  
  → `intr_d22840eb8aa75cec.mp3`
- **`Vous vous débrouillerez très bien.`**  
  _You (plural) will manage very well._  
  → `intr_79c1801d6c5bd0cc.mp3`
- **`Ils ne se débrouilleront pas sans aide.`**  
  _They (masculine) will not manage without help._  
  → `intr_cb1c2d6cc3c58128.mp3`
- **`Vous débrouillerez-vous bien ?`**  
  _Will you (formal) manage alright?_  
  → `intr_0fd611dd45611b8f.mp3`
- **`Se débrouilleront-elles seules ?`**  
  _Will they (feminine) manage alone?_  
  → `intr_167735667f235fe3.mp3`
- **`Ne nous débrouillerons-nous pas sans problèmes ?`**  
  _Won't we manage without problems?_  
  → `intr_8c537a300b8f692a.mp3`
- **`Je ne me débrouillerai pas seul(e).`**  
  _I will not manage alone._  
  → `intr_ff030e62d01f2b07.mp3`
- **`Elle se débrouillera parfaitement.`**  
  _She will manage perfectly._  
  → `intr_71f3c8721a923209.mp3`
- **`Nous nous débrouillerons ensemble.`**  
  _We will manage together._  
  → `intr_3fb7700ea6eada23.mp3`
- **`Ne te débrouilleras-tu pas bien ?`**  
  _Won't you (singular) manage well?_  
  → `intr_c9870245283549e4.mp3`
- **`Il ne se débrouillera pas sans aide.`**  
  _He will not manage without help._  
  → `intr_03d9e3dae1a6d499.mp3`
- **`Vous vous débrouillerez tout seuls.`**  
  _You (plural) will manage everything alone._  
  → `intr_8b7fe6751315cded.mp3`
- **`Se débrouilleront-ils bien ?`**  
  _Will they (masculine) manage well?_  
  → `intr_cae4264519c614f2.mp3`
- **`Comment est-ce que je me débrouillerai avec ça ?`**  
  _How will I manage with that?_  
  → `intr_73946d8a1c275c2a.mp3`
- **`Ils ne se débrouilleront pas seuls.`**  
  _They (masculine) will not manage alone._  
  → `intr_91c407d8c2a4f995.mp3`
- **`Elles se débrouilleront sans problèmes.`**  
  _They (feminine) will manage without problems._  
  → `intr_4a5bcb90805b1802.mp3`
