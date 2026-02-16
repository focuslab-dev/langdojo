import { useState, useEffect, useCallback } from 'react';
import { Phrase, LanguageId } from '@/types';

interface FavoriteItem {
  phrase: Phrase;
  languageId: LanguageId;
  categoryId: string;
}

const STORAGE_KEY = 'travel-phrases-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const addFavorite = useCallback((phrase: Phrase, languageId: LanguageId, categoryId: string) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (fav) => fav.phrase.id === phrase.id && fav.languageId === languageId
      );
      if (exists) return prev;
      return [...prev, { phrase, languageId, categoryId }];
    });
  }, []);

  const removeFavorite = useCallback((phraseId: string, languageId: LanguageId) => {
    setFavorites((prev) =>
      prev.filter(
        (fav) => !(fav.phrase.id === phraseId && fav.languageId === languageId)
      )
    );
  }, []);

  const isFavorite = useCallback(
    (phraseId: string, languageId: LanguageId): boolean => {
      return favorites.some(
        (fav) => fav.phrase.id === phraseId && fav.languageId === languageId
      );
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (phrase: Phrase, languageId: LanguageId, categoryId: string) => {
      if (isFavorite(phrase.id, languageId)) {
        removeFavorite(phrase.id, languageId);
      } else {
        addFavorite(phrase, languageId, categoryId);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  const getFavoritesByLanguage = useCallback(
    (languageId: LanguageId): FavoriteItem[] => {
      return favorites.filter((fav) => fav.languageId === languageId);
    },
    [favorites]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    getFavoritesByLanguage,
    isLoaded,
  };
};
