import { useState, useEffect, useCallback, useRef } from 'react';

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

export function useTTS() {
  const [state, setState] = useState<TTSState>({
    isSupported: false,
    isEnabled: false,
    isSpeaking: false,
    englishVoice: null,
    frenchVoice: null,
  });
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize TTS and load voices
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return;
    }

    const synth = window.speechSynthesis;
    
    const loadVoices = () => {
      const voices = synth.getVoices();
      
      // Find best English voice (prefer US/UK)
      const englishVoice = voices.find(v => 
        v.lang.startsWith('en-US') || v.lang.startsWith('en-GB')
      ) || voices.find(v => v.lang.startsWith('en')) || null;
      
      // Find best French voice (prefer France)
      const frenchVoice = voices.find(v => 
        v.lang === 'fr-FR'
      ) || voices.find(v => v.lang.startsWith('fr')) || null;
      
      // Load enabled state from localStorage - default to ON if not set
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

    // Voices might load asynchronously
    if (synth.getVoices().length > 0) {
      loadVoices();
    }
    synth.addEventListener('voiceschanged', loadVoices);
    
    return () => {
      synth.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  // Toggle TTS enabled/disabled
  const toggleEnabled = useCallback(() => {
    setState(prev => {
      const newEnabled = !prev.isEnabled;
      localStorage.setItem('ttsEnabled', String(newEnabled));
      
      // Cancel any ongoing speech when disabling
      if (!newEnabled && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      return { ...prev, isEnabled: newEnabled, isSpeaking: false };
    });
  }, []);

  // Stop current speech
  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setState(prev => ({ ...prev, isSpeaking: false }));
    }
  }, []);

  // Speak text in specified language
  const speak = useCallback((text: string, options: TTSOptions = {}) => {
    if (!state.isSupported || !state.isEnabled) return;
    if (!window.speechSynthesis) return;

    const synth = window.speechSynthesis;
    
    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    // Set voice based on language
    const lang = options.lang || 'en';
    if (lang === 'fr' && state.frenchVoice) {
      utterance.voice = state.frenchVoice;
      utterance.lang = 'fr-FR';
    } else if (lang === 'en' && state.englishVoice) {
      utterance.voice = state.englishVoice;
      utterance.lang = 'en-US';
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
    
    synth.speak(utterance);
  }, [state.isSupported, state.isEnabled, state.englishVoice, state.frenchVoice]);

  // Speak English question
  const speakQuestion = useCallback((text: string) => {
    speak(text, { lang: 'en', rate: 0.9 });
  }, [speak]);

  // Speak French answer
  const speakAnswer = useCallback((text: string) => {
    speak(text, { lang: 'fr', rate: 0.85 });
  }, [speak]);

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
