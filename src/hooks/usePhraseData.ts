import { useMemo } from "react";
import { LanguageId, CategoryId, Phrase } from "@/types";
import { getCategoryData } from "@/utils/getPhraseData";
import { getCategoryById } from "@/utils/languages";
import { FavoriteItem } from "@/hooks/useFavorites";

export interface FavoriteGroup {
  categoryId: string;
  categoryName: string;
  emoji: string;
  phrases: Phrase[];
}

interface UsePhraseDataOptions {
  languageId: LanguageId;
  categoryId: CategoryId;
  getFavoritesByLanguage: (languageId: LanguageId) => FavoriteItem[];
}

export const usePhraseData = ({
  languageId,
  categoryId,
  getFavoritesByLanguage,
}: UsePhraseDataOptions) => {
  const phrases = useMemo(() => {
    if (categoryId === "favorites") {
      const favorites = getFavoritesByLanguage(languageId);
      return favorites.flatMap((f) => {
        const { phrases: catPhrases, words: catWords } = getCategoryData(languageId, f.categoryId);
        return [...catPhrases, ...catWords].filter((p) => p.id === f.phraseId);
      });
    }

    return getCategoryData(languageId, categoryId).phrases;
  }, [languageId, categoryId, getFavoritesByLanguage]);

  const words = useMemo(() => {
    if (categoryId === "favorites") {
      return [] as Phrase[];
    }

    return getCategoryData(languageId, categoryId).words;
  }, [languageId, categoryId]);

  const favoriteGroups = useMemo((): FavoriteGroup[] => {
    if (categoryId !== "favorites") return [];

    const favorites = getFavoritesByLanguage(languageId);
    const groupMap = new Map<string, Phrase[]>();

    for (const fav of favorites) {
      const { phrases: catPhrases, words: catWords } = getCategoryData(languageId, fav.categoryId);
      const phrase = [...catPhrases, ...catWords].find((p) => p.id === fav.phraseId);
      if (!phrase) continue;

      const list = groupMap.get(fav.categoryId);
      if (list) {
        list.push(phrase);
      } else {
        groupMap.set(fav.categoryId, [phrase]);
      }
    }

    return Array.from(groupMap.entries()).map(([catId, catPhrases]) => {
      const cat = getCategoryById(catId);
      return {
        categoryId: catId,
        categoryName: cat?.name ?? catId,
        emoji: cat?.emoji ?? "",
        phrases: catPhrases,
      };
    });
  }, [languageId, categoryId, getFavoritesByLanguage]);

  return { phrases, words, favoriteGroups };
};
