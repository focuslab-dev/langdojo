import { useCallback, useRef, useState } from 'react';
import { getLanguageById } from '@/utils/languages';

export const useTTS = () => {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  const speak = useCallback((text: string, languageId: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    setSpeakingText(null);

    const language = getLanguageById(languageId);
    if (!language) {
      console.warn(`Language not found: ${languageId}`);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language.ttsLang;
    utterance.rate = 0.8;
    utterance.pitch = 1;

    // Try to find a voice for the language
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang.startsWith(language.ttsLang.split('-')[0]));
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => setSpeakingText(text);
    utterance.onend = () => setSpeakingText(null);
    utterance.onerror = () => setSpeakingText(null);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeakingText(null);
    }
  }, []);

  return { speak, stop, speakingText };
};
