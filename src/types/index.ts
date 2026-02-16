export interface Phrase {
  id: string;
  english: string;
  translation: string;
  pronunciation: string;
}

export interface PhraseCategory {
  categoryId: string;
  languageId: string;
  phrases: Phrase[];
  words: Phrase[];
}

export interface Language {
  id: string;
  name: string;
  flag: string;
  ttsLang: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  emoji: string;
  color: string;
}

export type LanguageId = 'japanese' | 'mandarin' | 'thai' | 'korean' | 'french' | 'spanish';
export type CategoryId = 'favorites' | 'greetings' | 'numbers' | 'cafe' | 'restaurant' | 'supermarket' | 'taxi' | 'train' | 'bus' | 'hotel';
