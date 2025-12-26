import { useState, useEffect, useCallback, useRef } from 'react';
import { isCloudTTSEnabled } from '@shared/config';

interface TTSManifest {
  version: string;
  voiceId: string;
  generatedAt: string;
  phrases: Record<string, string>;
}

let manifestCache: TTSManifest | null = null;
let sharedAudioElement: HTMLAudioElement | null = null;

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

function getOrCreateAudioElement(): HTMLAudioElement {
  if (!sharedAudioElement) {
    sharedAudioElement = document.createElement('audio');
    sharedAudioElement.style.display = 'none';
    sharedAudioElement.setAttribute('playsInline', '');
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

    // Ensure audio element exists for static TTS
    if (isCloudTTSEnabled()) {
      getOrCreateAudioElement();
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

  const speakQuestion = useCallback((text: string) => {
    speak(text, { lang: 'en', rate: 0.9 });
  }, [speak]);

  const speakStaticFrench = useCallback(async (text: string): Promise<boolean> => {
    if (!state.isEnabled) return false;
    
    if (!isCloudTTSEnabled()) {
      console.log('🔇 TTS: Static TTS disabled by feature flag');
      return false;
    }
    
    const audio = getOrCreateAudioElement();

    if (!manifestCache) {
      try {
        console.log('📂 TTS: Loading manifest...');
        const response = await fetch('/attached_assets/tts-manifest.json');
        if (response.ok) {
          manifestCache = await response.json();
          console.log('📂 TTS: Manifest loaded with', Object.keys(manifestCache!.phrases).length, 'phrases');
        }
      } catch (e) {
        console.warn('⚠️ TTS: Could not load manifest');
        return false;
      }
    }
    
    if (!manifestCache) return false;
    
    const audioFile = manifestCache.phrases[text];
    
    if (!audioFile) {
      console.log('📂 TTS: No static audio for:', text.substring(0, 40));
      return false;
    }
    
    try {
      console.log('📂 TTS: Playing static audio:', audioFile);
      
      audio.src = `/attached_assets/audio/${audioFile}`;
      
      setState(prev => ({ ...prev, isSpeaking: true }));
      
      await new Promise<void>((resolve, reject) => {
        audio.onended = () => {
          setState(prev => ({ ...prev, isSpeaking: false }));
          resolve();
        };
        audio.onerror = () => {
          setState(prev => ({ ...prev, isSpeaking: false }));
          reject(new Error('Audio playback failed'));
        };
        audio.play().catch((err) => {
          setState(prev => ({ ...prev, isSpeaking: false }));
          reject(err);
        });
      });
      
      console.log('✅ TTS: Static audio played successfully');
      return true;
    } catch (error) {
      console.warn('⚠️ TTS: Static audio failed, falling back to browser:', error);
      return false;
    }
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
