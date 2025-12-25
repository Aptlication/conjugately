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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize TTS and load voices
  useEffect(() => {
    console.log('🔊 TTS Diagnostic:', {
      speechSynthesis: typeof window.speechSynthesis,
      available: !!window.speechSynthesis,
    });
    
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn('🔇 TTS: speechSynthesis not available');
      // Still enable TTS for ElevenLabs fallback
      const savedEnabled = localStorage.getItem('ttsEnabled');
      const isEnabled = savedEnabled === null ? true : savedEnabled === 'true';
      setState(prev => ({ ...prev, isSupported: true, isEnabled }));
      return;
    }

    const synth = window.speechSynthesis;
    
    const loadVoices = () => {
      const voices = synth.getVoices();
      console.log('🔊 TTS Voices loaded:', voices.length, 'voices available');
      
      const allFrenchVoices = voices.filter(v => v.lang.startsWith('fr'));
      console.log('🇫🇷 Available French voices:', allFrenchVoices.map(v => `${v.name} (${v.lang})`));
      
      const englishVoices = voices.filter(v => v.lang.startsWith('en-US') || v.lang.startsWith('en-GB') || v.lang.startsWith('en'));
      const englishVoice = 
        englishVoices.find(v => v.name.includes('Natural') || v.name.includes('Neural')) ||
        englishVoices.find(v => v.lang.startsWith('en-US')) ||
        englishVoices.find(v => v.lang.startsWith('en-GB')) ||
        englishVoices[0] || null;
      
      const frenchVoices = voices.filter(v => v.lang === 'fr-FR' || v.lang.startsWith('fr'));
      const frenchVoice = 
        frenchVoices.find(v => v.name.includes('Natural') || v.name.includes('Neural')) ||
        frenchVoices.find(v => v.name.includes('Amélie') || v.name.includes('Thomas') || v.name.includes('Audrey')) ||
        frenchVoices.find(v => v.name.includes('Microsoft') && !v.name.includes('Hortense')) ||
        frenchVoices.find(v => v.lang === 'fr-FR' && !v.name.includes('Google')) ||
        frenchVoices.find(v => v.lang === 'fr-FR') ||
        frenchVoices[0] || null;
      
      console.log('🔊 TTS Selected voices:', { 
        english: englishVoice?.name || 'none', 
        french: frenchVoice?.name || 'none (will use ElevenLabs)' 
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
      
      if (!newEnabled) {
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      }
      
      return { ...prev, isEnabled: newEnabled, isSpeaking: false };
    });
  }, []);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setState(prev => ({ ...prev, isSpeaking: false }));
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

  // Speak French using ElevenLabs API for high-quality pronunciation
  const speakFrenchWithElevenLabs = useCallback(async (text: string) => {
    console.log('🇫🇷 ElevenLabs TTS called:', text.substring(0, 50));
    
    if (!state.isEnabled) {
      console.log('🔇 TTS disabled');
      return;
    }
    
    // Stop any current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    setState(prev => ({ ...prev, isSpeaking: true }));
    
    try {
      const response = await fetch('/api/tts/french', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        throw new Error(`TTS API error: ${response.status}`);
      }
      
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setState(prev => ({ ...prev, isSpeaking: false }));
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };
      
      audio.onerror = () => {
        console.error('🔇 ElevenLabs audio playback error');
        setState(prev => ({ ...prev, isSpeaking: false }));
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };
      
      console.log('🔊 ElevenLabs playing French audio');
      await audio.play();
      
    } catch (error) {
      console.error('🔇 ElevenLabs TTS error:', error);
      setState(prev => ({ ...prev, isSpeaking: false }));
      // Fallback to browser TTS if ElevenLabs fails
      console.log('⚠️ Falling back to browser TTS');
      speak(text, { lang: 'fr', rate: 0.85 });
    }
  }, [state.isEnabled, speak]);

  const speakQuestion = useCallback((text: string) => {
    speak(text, { lang: 'en', rate: 0.9 });
  }, [speak]);

  // Use ElevenLabs for French answers (high-quality native pronunciation)
  const speakAnswer = useCallback((text: string) => {
    speakFrenchWithElevenLabs(text);
  }, [speakFrenchWithElevenLabs]);

  return {
    isSupported: state.isSupported,
    isEnabled: state.isEnabled,
    isSpeaking: state.isSpeaking,
    hasEnglishVoice: !!state.englishVoice,
    hasFrenchVoice: true, // Always true now with ElevenLabs
    toggleEnabled,
    speakQuestion,
    speakAnswer,
    stop,
  };
}
