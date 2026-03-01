import { useState, useEffect, useCallback, useRef } from 'react';
import { isCloudTTSEnabled } from '@shared/config';

interface TTSManifest {
  version: string;
  voiceId: string;
  generatedAt: string;
  phrases: Record<string, string>;
}

let manifestCache: TTSManifest | null = null;
let manifestLoading: Promise<TTSManifest | null> | null = null;
let sharedAudioElement: HTMLAudioElement | null = null;
let audioUnlocked = false;

function unlockAudio() {
  if (audioUnlocked) return;
  // Use a SEPARATE throwaway element so the shared audio element is never polluted
  const tmp = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=');
  tmp.volume = 0;
  tmp.play().then(() => {
    audioUnlocked = true;
    console.log('🔊 Audio unlocked');
  }).catch(() => {});
}

// Normalize text for manifest lookup - handles apostrophe variants, quotes, whitespace
function normalizeText(text: string): string {
  return text
    .trim()
    .replace(/[\u2018\u2019\u0060\u00B4]/g, "'")  // Smart quotes to straight apostrophe
    .replace(/[\u201C\u201D]/g, '"')              // Smart double quotes
    .replace(/\s+/g, ' ');                         // Collapse whitespace
}

// Preload manifest immediately
function preloadManifest(): Promise<TTSManifest | null> {
  if (manifestCache) return Promise.resolve(manifestCache);
  if (manifestLoading) return manifestLoading;
  
  manifestLoading = fetch('/attached_assets/tts-manifest.json')
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      manifestCache = data;
      return data;
    })
    .catch(() => null);
  
  return manifestLoading;
}

// Start preloading on module load
if (typeof window !== 'undefined') {
  preloadManifest();
}

interface TTSOptions {
  lang?: 'en' | 'fr';
  rate?: number;
  pitch?: number;
}

interface TTSState {
  isSupported: boolean;
  isEnabled: boolean;
  isSpeaking: boolean;
  englishVoice: SpeechSynthesisVoice | null;
  frenchVoice: SpeechSynthesisVoice | null;
}

function getFreshAudioElement(): HTMLAudioElement {
  // Tear down previous element to eliminate any stale event listeners
  if (sharedAudioElement) {
    sharedAudioElement.pause();
    sharedAudioElement.removeAttribute('src');
    if (sharedAudioElement.parentNode) {
      sharedAudioElement.parentNode.removeChild(sharedAudioElement);
    }
  }
  const el = document.createElement('audio');
  el.setAttribute('playsinline', '');
  el.preload = 'auto';
  document.body.appendChild(el);
  sharedAudioElement = el;
  return el;
}

function getOrCreateAudioElement(): HTMLAudioElement {
  if (!sharedAudioElement) {
    sharedAudioElement = document.createElement('audio');
    sharedAudioElement.setAttribute('playsinline', '');
    sharedAudioElement.preload = 'auto';
    document.body.appendChild(sharedAudioElement);
    console.log('🔊 Static TTS: Audio element created');
  }
  return sharedAudioElement;
}

export function useTTS() {
  const [state, setState] = useState<TTSState>({
    isSupported: false,
    isEnabled: false,
    isSpeaking: false,
    englishVoice: null,
    frenchVoice: null,
  });
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    console.log('🔊 TTS Diagnostic:', {
      speechSynthesis: typeof window.speechSynthesis,
      available: !!window.speechSynthesis,
    });
    
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn('🔇 TTS: speechSynthesis not available');
      return;
    }

    // Ensure audio element exists for static TTS and unlock autoplay on first click
    if (isCloudTTSEnabled()) {
      getOrCreateAudioElement();
      const handleFirstClick = () => {
        unlockAudio();
        document.removeEventListener('click', handleFirstClick);
      };
      document.addEventListener('click', handleFirstClick);
    }

    const synth = window.speechSynthesis;
    
    const loadVoices = () => {
      const voices = synth.getVoices();
      console.log('🔊 TTS Voices loaded:', voices.length, 'voices available');
      
      const englishVoice = voices.find(v => 
        v.lang.startsWith('en-US') || v.lang.startsWith('en-GB')
      ) || voices.find(v => v.lang.startsWith('en')) || null;
      
      const frenchVoice = voices.find(v => 
        v.lang === 'fr-FR'
      ) || voices.find(v => v.lang.startsWith('fr')) || null;
      
      console.log('🔊 TTS Selected voices:', { 
        english: englishVoice?.name || 'none', 
        french: frenchVoice?.name || 'none' 
      });
      
      const savedEnabled = localStorage.getItem('ttsEnabled');
      const isEnabled = savedEnabled === null ? true : savedEnabled === 'true';
      
      setState({
        isSupported: true,
        isEnabled: isEnabled,
        isSpeaking: false,
        englishVoice,
        frenchVoice,
      });
    };

    if (synth.getVoices().length > 0) {
      loadVoices();
    }
    synth.addEventListener('voiceschanged', loadVoices);
    
    return () => {
      synth.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  const toggleEnabled = useCallback(() => {
    setState(prev => {
      const newEnabled = !prev.isEnabled;
      localStorage.setItem('ttsEnabled', String(newEnabled));
      
      if (!newEnabled && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      return { ...prev, isEnabled: newEnabled, isSpeaking: false };
    });
  }, []);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setState(prev => ({ ...prev, isSpeaking: false }));
    }
  }, []);

  const speak = useCallback((text: string, options: TTSOptions = {}) => {
    console.log('🔊 TTS speak called:', { text: text.substring(0, 50), isSupported: state.isSupported, isEnabled: state.isEnabled });
    if (!state.isSupported || !state.isEnabled) {
      console.log('🔇 TTS blocked: supported=', state.isSupported, 'enabled=', state.isEnabled);
      return;
    }
    if (!window.speechSynthesis) {
      console.log('🔇 TTS: No speechSynthesis API');
      return;
    }

    const synth = window.speechSynthesis;
    
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    const lang = options.lang || 'en';
    if (lang === 'fr' && state.frenchVoice) {
      utterance.voice = state.frenchVoice;
      utterance.lang = 'fr-FR';
      console.log('🇫🇷 TTS using French voice:', state.frenchVoice.name, state.frenchVoice.lang);
    } else if (lang === 'en' && state.englishVoice) {
      utterance.voice = state.englishVoice;
      utterance.lang = 'en-US';
      console.log('🇺🇸 TTS using English voice:', state.englishVoice.name);
    } else {
      console.warn('⚠️ TTS: No matching voice found for', lang, '- using default');
    }
    
    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1;
    
    utterance.onstart = () => {
      setState(prev => ({ ...prev, isSpeaking: true }));
    };
    
    utterance.onend = () => {
      setState(prev => ({ ...prev, isSpeaking: false }));
    };
    
    utterance.onerror = () => {
      setState(prev => ({ ...prev, isSpeaking: false }));
    };
    
    console.log('🔊 TTS speaking:', text.substring(0, 50));
    synth.speak(utterance);
  }, [state.isSupported, state.isEnabled, state.englishVoice, state.frenchVoice]);

  const speakStaticQuestion = useCallback(async (verb: string, tense: string, questionNum: number): Promise<boolean> => {
    console.log('🔈 speakStaticQuestion:', { verb, tense, questionNum, isEnabled: state.isEnabled, cloudTTS: isCloudTTSEnabled() });
    if (!state.isEnabled) return false;
    if (!isCloudTTSEnabled()) return false;

    const tenseMap: Record<string, string> = {
      'Présent': 'present',
      'Passé Composé': 'passe_compose',
      'Futur Simple': 'futur_simple'
    };

    const tensePath = tenseMap[tense] || tense.toLowerCase().replace(/\s+/g, '_');
    const audioPath = `/attached_assets/audio/quizzes/beginner/${encodeURIComponent(verb)}/${tensePath}/questions/Q${questionNum}.mp3`;

    const response = await fetch(audioPath, { method: 'HEAD' });
    console.log('🔈 Audio path:', audioPath, '| status:', response.status);
    if (!response.ok) return false;

    // Fresh element each time — zero stale listeners possible
    const audio = getFreshAudioElement();
    audio.src = audioPath;

    setState(prev => ({ ...prev, isSpeaking: true }));

    return new Promise<boolean>((resolve) => {
      audio.addEventListener('ended', () => {
        setState(prev => ({ ...prev, isSpeaking: false }));
        resolve(true);
      }, { once: true });

      audio.addEventListener('error', (e) => {
        console.warn('🔇 Audio element error:', e);
        setState(prev => ({ ...prev, isSpeaking: false }));
        resolve(false);
      }, { once: true });

      audio.play().catch(err => {
        console.warn('🔇 audio.play() rejected:', err);
        setState(prev => ({ ...prev, isSpeaking: false }));
        resolve(false);
      });
    });
  }, [state.isEnabled]);

  const speakQuestion = useCallback((text: string, verb?: string, tense?: string, questionNum?: number) => {
    console.log('🎯 speakQuestion:', `verb="${verb}", tense="${tense}", qNum=${questionNum}, text="${text.substring(0,25)}"`);
    // If context is provided, try static audio first
    if (verb && tense && questionNum) {
      console.log('🎯 HAS CONTEXT - trying static audio');
      speakStaticQuestion(verb, tense, questionNum).then(success => {
        console.log('🎯 Static result:', success ? 'SUCCESS' : 'FAILED - fallback to browser');
        if (!success) {
          speak(text, { lang: 'en', rate: 0.9 });
        }
      });
    } else {
      console.log('🎯 NO CONTEXT - browser TTS only');
      speak(text, { lang: 'en', rate: 0.9 });
    }
  }, [speak, speakStaticQuestion]);

  const speakStaticFrench = useCallback(async (text: string): Promise<boolean> => {
    if (!state.isEnabled) return false;
    if (!isCloudTTSEnabled()) return false;

    const manifest = await preloadManifest();
    if (!manifest) return false;

    const normalizedText = normalizeText(text);
    let audioFile = manifest.phrases[text] || manifest.phrases[normalizedText];
    if (!audioFile) {
      const matchingKey = Object.keys(manifest.phrases).find(key => normalizeText(key) === normalizedText);
      if (matchingKey) audioFile = manifest.phrases[matchingKey];
    }
    if (!audioFile) return false;

    // Fresh element each time — zero stale listeners possible
    const audio = getFreshAudioElement();
    audio.src = `/attached_assets/audio/${audioFile}`;

    setState(prev => ({ ...prev, isSpeaking: true }));

    return new Promise<boolean>((resolve) => {
      audio.addEventListener('ended', () => {
        setState(prev => ({ ...prev, isSpeaking: false }));
        resolve(true);
      }, { once: true });

      audio.addEventListener('error', (e) => {
        console.warn('🔇 French audio element error:', e);
        setState(prev => ({ ...prev, isSpeaking: false }));
        resolve(false);
      }, { once: true });

      audio.play().catch(err => {
        console.warn('🔇 French audio.play() rejected:', err);
        setState(prev => ({ ...prev, isSpeaking: false }));
        resolve(false);
      });
    });
  }, [state.isEnabled]);

  const speakAnswer = useCallback(async (text: string) => {
    const staticSuccess = await speakStaticFrench(text);
    
    if (!staticSuccess) {
      speak(text, { lang: 'fr', rate: 0.85 });
    }
  }, [speakStaticFrench, speak]);

  return {
    isSupported: state.isSupported,
    isEnabled: state.isEnabled,
    isSpeaking: state.isSpeaking,
    hasEnglishVoice: !!state.englishVoice,
    hasFrenchVoice: !!state.frenchVoice,
    toggleEnabled,
    speakQuestion,
    speakAnswer,
    stop,
  };
}
