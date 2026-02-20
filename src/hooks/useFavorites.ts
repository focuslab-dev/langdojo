import { useState, useEffect, useCallback } from 'react';
import { Phrase, LanguageId } from '@/types';

export interface FavoriteItem {
  phraseId: string;
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
        const parsed = JSON.parse(stored);
        // Migrate old format that stored full phrase objects
        const migrated = parsed.map((item: FavoriteItem & { phrase?: Phrase }) => {
          if (item.phrase) {
            return { phraseId: item.phrase.id, languageId: item.languageId, categoryId: item.categoryId };
          }
          return item;
        });
        setFavorites(migrated);
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
        (fav) => fav.phraseId === phrase.id && fav.languageId === languageId
      );
      if (exists) return prev;
      return [...prev, { phraseId: phrase.id, languageId, categoryId }];
    });
  }, []);

  const removeFavorite = useCallback((phraseId: string, languageId: LanguageId) => {
    setFavorites((prev) =>
      prev.filter(
        (fav) => !(fav.phraseId === phraseId && fav.languageId === languageId)
      )
    );
  }, []);

  const isFavorite = useCallback(
    (phraseId: string, languageId: LanguageId): boolean => {
      return favorites.some(
        (fav) => fav.phraseId === phraseId && fav.languageId === languageId
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
