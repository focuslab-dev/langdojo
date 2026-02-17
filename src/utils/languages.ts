import { Language, Category } from '@/types';

export const languages: Language[] = [
  {
    id: 'japanese',
    name: 'Japanese',
    flag: '🇯🇵',
    ttsLang: 'ja-JP',
  },
  {
    id: 'mandarin',
    name: 'Mandarin',
    flag: '🇨🇳',
    ttsLang: 'zh-CN',
  },
  {
    id: 'thai',
    name: 'Thai',
    flag: '🇹🇭',
    ttsLang: 'th-TH',
  },
  {
    id: 'korean',
    name: 'Korean',
    flag: '🇰🇷',
    ttsLang: 'ko-KR',
  },
  {
    id: 'french',
    name: 'French',
    flag: '🇫🇷',
    ttsLang: 'fr-FR',
  },
  {
    id: 'spanish',
    name: 'Spanish',
    flag: '🇪🇸',
    ttsLang: 'es-ES',
  },
];

export const categories: Category[] = [
  {
    id: 'favorites',
    name: 'Favorites',
    icon: 'Heart',
    emoji: '❤️',
    color: '#EF4444',
  },
  {
    id: 'basics',
    name: 'Basics',
    icon: 'Hand',
    emoji: '👋',
    color: '#F59E0B',
  },
  {
    id: 'numbers',
    name: 'Numbers',
    icon: 'Hash',
    emoji: '🔢',
    color: '#14B8A6',
  },
  {
    id: 'cafe',
    name: 'Cafe',
    icon: 'Coffee',
    emoji: '☕',
    color: '#8B5CF6',
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: 'UtensilsCrossed',
    emoji: '🍽️',
    color: '#EC4899',
  },
  {
    id: 'supermarket',
    name: 'Supermarket',
    icon: 'ShoppingCart',
    emoji: '🛒',
    color: '#10B981',
  },
  {
    id: 'taxi',
    name: 'Taxi',
    icon: 'Car',
    emoji: '🚕',
    color: '#FCD34D',
  },
  {
    id: 'train',
    name: 'Train',
    icon: 'Train',
    emoji: '🚆',
    color: '#3B82F6',
  },
  {
    id: 'bus',
    name: 'Bus',
    icon: 'Bus',
    emoji: '🚌',
    color: '#6366F1',
  },
  {
    id: 'hotel',
    name: 'Hotel',
    icon: 'Hotel',
    emoji: '🏨',
    color: '#F97316',
  },
];

export const getLanguageById = (id: string): Language | undefined => {
  return languages.find((lang) => lang.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((cat) => cat.id === id);
};
