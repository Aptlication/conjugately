import { useState, useEffect, useCallback } from 'react';
import { isCloudTTSEnabled } from '@shared/config';

interface TTSManifest {
  version: string;
  voiceId: string;
  generatedAt: string;
  phrases: Record<string, string>;
  novice_phrases?: Record<string, string>;
  elementary_phrases?: Record<string, string>;
}

let manifestCache: TTSManifest | null = null;
let manifestLoading: Promise<TTSManifest | null> | null = null;
let sharedAudioElement: HTMLAudioElement | null = null;
let audioUnlocked = false;

function unlockAudio() {
  if (audioUnlocked) return;
  const tmp = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=');
  tmp.volume = 0;
  tmp.play().then(() => {
    audioUnlocked = true;
    console.log('🔊 Audio unlocked');
  }).catch(() => {});
}

function normalizeText(text: string): string {
  return text
    .trim()
    .replace(/[\u2018\u2019\u0060\u00B4]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s+/g, ' ');
}

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

if (typeof window !== 'undefined') {
  preloadManifest();
}

function getFreshAudioElement(): HTMLAudioElement {
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
  }
  return sharedAudioElement;
}

export function useTTS() {
  const [isEnabled, setIsEnabled] = useState(() => {
    const saved = localStorage.getItem('ttsEnabled');
    return saved === null ? true : saved === 'true';
  });
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (isCloudTTSEnabled()) {
      getOrCreateAudioElement();
      const handleFirstClick = () => {
        unlockAudio();
        document.removeEventListener('click', handleFirstClick);
      };
      document.addEventListener('click', handleFirstClick);
      return () => document.removeEventListener('click', handleFirstClick);
    }
  }, []);

  const toggleEnabled = useCallback(() => {
    setIsEnabled(prev => {
      const newVal = !prev;
      localStorage.setItem('ttsEnabled', String(newVal));
      if (!newVal && sharedAudioElement) {
        sharedAudioElement.pause();
      }
      return newVal;
    });
  }, []);

  const stop = useCallback(() => {
    if (sharedAudioElement) {
      sharedAudioElement.pause();
    }
    setIsSpeaking(false);
  }, []);

  const speakAnswer = useCallback(async (text: string, difficulty?: string) => {
    if (!isEnabled || !isCloudTTSEnabled()) return;

    const manifest = await preloadManifest();
    if (!manifest) return;

    const phraseMap = (difficulty === 'Novice' && manifest.novice_phrases)
      ? manifest.novice_phrases
      : (difficulty === 'Elementary' && manifest.elementary_phrases)
        ? manifest.elementary_phrases
        : manifest.phrases;

    const normalizedText = normalizeText(text);
    let audioFile = phraseMap[text] || phraseMap[normalizedText];
    if (!audioFile) {
      const matchingKey = Object.keys(phraseMap).find(key => normalizeText(key) === normalizedText);
      if (matchingKey) audioFile = phraseMap[matchingKey];
    }
    if (!audioFile) {
      let fallback = manifest.phrases[text] || manifest.phrases[normalizedText];
      if (!fallback) {
        const matchingKey = Object.keys(manifest.phrases).find(key => normalizeText(key) === normalizedText);
        if (matchingKey) fallback = manifest.phrases[matchingKey];
      }
      audioFile = fallback;
    }
    if (!audioFile) return;

    const audio = getFreshAudioElement();
    audio.src = `/attached_assets/audio/${audioFile}`;

    setIsSpeaking(true);

    audio.addEventListener('ended', () => setIsSpeaking(false), { once: true });
    audio.addEventListener('error', () => setIsSpeaking(false), { once: true });
    audio.play().catch(() => setIsSpeaking(false));
  }, [isEnabled]);

  return {
    isEnabled,
    isSpeaking,
    toggleEnabled,
    speakAnswer,
    stop,
  };
}
