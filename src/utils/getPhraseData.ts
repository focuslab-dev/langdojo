import { LanguageId, Phrase, PhraseCategory } from "@/types";
import { FavoriteItem } from "@/hooks/useFavorites";

// Japanese
import japaneseBasics from "@/data/travel-essentials/japanese/basics.json";
import japaneseCafe from "@/data/travel-essentials/japanese/cafe.json";
import japaneseRestaurant from "@/data/travel-essentials/japanese/restaurant.json";
import japaneseSupermarket from "@/data/travel-essentials/japanese/supermarket.json";
import japaneseTaxi from "@/data/travel-essentials/japanese/taxi.json";
import japaneseTrain from "@/data/travel-essentials/japanese/train.json";
import japaneseBus from "@/data/travel-essentials/japanese/bus.json";
import japaneseNumbers from "@/data/travel-essentials/japanese/numbers.json";
import japaneseHotel from "@/data/travel-essentials/japanese/hotel.json";

// Mandarin
import mandarinBasics from "@/data/travel-essentials/mandarin/basics.json";
import mandarinCafe from "@/data/travel-essentials/mandarin/cafe.json";
import mandarinRestaurant from "@/data/travel-essentials/mandarin/restaurant.json";
import mandarinSupermarket from "@/data/travel-essentials/mandarin/supermarket.json";
import mandarinTaxi from "@/data/travel-essentials/mandarin/taxi.json";
import mandarinTrain from "@/data/travel-essentials/mandarin/train.json";
import mandarinBus from "@/data/travel-essentials/mandarin/bus.json";
import mandarinNumbers from "@/data/travel-essentials/mandarin/numbers.json";
import mandarinHotel from "@/data/travel-essentials/mandarin/hotel.json";

// Thai
import thaiBasics from "@/data/travel-essentials/thai/basics.json";
import thaiCafe from "@/data/travel-essentials/thai/cafe.json";
import thaiRestaurant from "@/data/travel-essentials/thai/restaurant.json";
import thaiSupermarket from "@/data/travel-essentials/thai/supermarket.json";
import thaiTaxi from "@/data/travel-essentials/thai/taxi.json";
import thaiTrain from "@/data/travel-essentials/thai/train.json";
import thaiBus from "@/data/travel-essentials/thai/bus.json";
import thaiNumbers from "@/data/travel-essentials/thai/numbers.json";
import thaiHotel from "@/data/travel-essentials/thai/hotel.json";

// Korean
import koreanBasics from "@/data/travel-essentials/korean/basics.json";
import koreanCafe from "@/data/travel-essentials/korean/cafe.json";
import koreanRestaurant from "@/data/travel-essentials/korean/restaurant.json";
import koreanSupermarket from "@/data/travel-essentials/korean/supermarket.json";
import koreanTaxi from "@/data/travel-essentials/korean/taxi.json";
import koreanTrain from "@/data/travel-essentials/korean/train.json";
import koreanBus from "@/data/travel-essentials/korean/bus.json";
import koreanNumbers from "@/data/travel-essentials/korean/numbers.json";
import koreanHotel from "@/data/travel-essentials/korean/hotel.json";

// French
import frenchBasics from "@/data/travel-essentials/french/basics.json";
import frenchCafe from "@/data/travel-essentials/french/cafe.json";
import frenchRestaurant from "@/data/travel-essentials/french/restaurant.json";
import frenchSupermarket from "@/data/travel-essentials/french/supermarket.json";
import frenchTaxi from "@/data/travel-essentials/french/taxi.json";
import frenchTrain from "@/data/travel-essentials/french/train.json";
import frenchBus from "@/data/travel-essentials/french/bus.json";
import frenchNumbers from "@/data/travel-essentials/french/numbers.json";
import frenchHotel from "@/data/travel-essentials/french/hotel.json";

// Spanish
import spanishBasics from "@/data/travel-essentials/spanish/basics.json";
import spanishCafe from "@/data/travel-essentials/spanish/cafe.json";
import spanishRestaurant from "@/data/travel-essentials/spanish/restaurant.json";
import spanishSupermarket from "@/data/travel-essentials/spanish/supermarket.json";
import spanishTaxi from "@/data/travel-essentials/spanish/taxi.json";
import spanishTrain from "@/data/travel-essentials/spanish/train.json";
import spanishBus from "@/data/travel-essentials/spanish/bus.json";
import spanishNumbers from "@/data/travel-essentials/spanish/numbers.json";
import spanishHotel from "@/data/travel-essentials/spanish/hotel.json";

export const phraseData: Record<LanguageId, Record<string, PhraseCategory>> = {
  japanese: {
    basics: japaneseBasics,
    numbers: japaneseNumbers,
    cafe: japaneseCafe,
    restaurant: japaneseRestaurant,
    supermarket: japaneseSupermarket,
    taxi: japaneseTaxi,
    train: japaneseTrain,
    bus: japaneseBus,
    hotel: japaneseHotel,
  },
  mandarin: {
    basics: mandarinBasics,
    numbers: mandarinNumbers,
    cafe: mandarinCafe,
    restaurant: mandarinRestaurant,
    supermarket: mandarinSupermarket,
    taxi: mandarinTaxi,
    train: mandarinTrain,
    bus: mandarinBus,
    hotel: mandarinHotel,
  },
  thai: {
    basics: thaiBasics,
    numbers: thaiNumbers,
    cafe: thaiCafe,
    restaurant: thaiRestaurant,
    supermarket: thaiSupermarket,
    taxi: thaiTaxi,
    train: thaiTrain,
    bus: thaiBus,
    hotel: thaiHotel,
  },
  korean: {
    basics: koreanBasics,
    numbers: koreanNumbers,
    cafe: koreanCafe,
    restaurant: koreanRestaurant,
    supermarket: koreanSupermarket,
    taxi: koreanTaxi,
    train: koreanTrain,
    bus: koreanBus,
    hotel: koreanHotel,
  },
  french: {
    basics: frenchBasics,
    numbers: frenchNumbers,
    cafe: frenchCafe,
    restaurant: frenchRestaurant,
    supermarket: frenchSupermarket,
    taxi: frenchTaxi,
    train: frenchTrain,
    bus: frenchBus,
    hotel: frenchHotel,
  },
  spanish: {
    basics: spanishBasics,
    numbers: spanishNumbers,
    cafe: spanishCafe,
    restaurant: spanishRestaurant,
    supermarket: spanishSupermarket,
    taxi: spanishTaxi,
    train: spanishTrain,
    bus: spanishBus,
    hotel: spanishHotel,
  },
};

export function getCategoryData(
  languageId: LanguageId,
  categoryId: string,
): { phrases: Phrase[]; words: Phrase[] } {
  const languageData = phraseData[languageId];
  const categoryData = languageData?.[categoryId];

  if (!categoryData) {
    return { phrases: [], words: [] };
  }

  return {
    phrases: categoryData.phrases || [],
    words: categoryData.words || [],
  };
}

/**
 * Builds an ordered list for download/study material:
 * For each phrase: its word breakdowns (skipping duplicates) → the phrase,
 * then any remaining category-level words at the end.
 */
export function getDownloadItems(
  languageId: LanguageId,
  categoryId: string,
): Phrase[] {
  const { phrases, words } = getCategoryData(languageId, categoryId);
  const seenWords = new Set<string>();
  const items: Phrase[] = [];

  for (const phrase of phrases) {
    if (phrase.words) {
      for (const word of phrase.words) {
        if (!seenWords.has(word.text)) {
          seenWords.add(word.text);
          items.push({
            id: `wd-${word.text}`,
            text: word.text,
            translation: word.translation,
            ...(word.pronunciation && { pronunciation: word.pronunciation }),
          });
        }
      }
    }
    items.push(phrase);
  }

  for (const word of words) {
    if (!seenWords.has(word.text)) {
      seenWords.add(word.text);
      items.push(word);
    }
  }

  return items;
}

/**
 * Builds a download list aggregating all categories for a language,
 * with the same word-breakdown-first ordering and deduplication.
 */
export function getDownloadItemsAll(languageId: LanguageId): Phrase[] {
  const languageData = phraseData[languageId];
  if (!languageData) return [];
  return getDownloadItemsForCategories(languageId, Object.keys(languageData));
}

/**
 * Builds a download list aggregating specified categories for a language,
 * with the same word-breakdown-first ordering and deduplication.
 */
export function getDownloadItemsForCategories(
  languageId: LanguageId,
  categoryIds: string[],
): Phrase[] {
  const languageData = phraseData[languageId];
  if (!languageData) return [];

  const seenWords = new Set<string>();
  const seenPhrases = new Set<string>();
  const items: Phrase[] = [];

  for (const catId of categoryIds) {
    const categoryData = languageData[catId];
    if (!categoryData) continue;

    for (const phrase of categoryData.phrases || []) {
      if (phrase.words) {
        for (const word of phrase.words) {
          if (!seenWords.has(word.text)) {
            seenWords.add(word.text);
            items.push({
              id: `wd-${word.text}`,
              text: word.text,
              translation: word.translation,
              ...(word.pronunciation && { pronunciation: word.pronunciation }),
            });
          }
        }
      }
      if (!seenPhrases.has(phrase.id)) {
        seenPhrases.add(phrase.id);
        items.push(phrase);
      }
    }

    for (const word of categoryData.words || []) {
      if (!seenWords.has(word.text)) {
        seenWords.add(word.text);
        items.push(word);
      }
    }
  }

  return items;
}

/**
 * Builds a download list from a set of favorite items, applying the same
 * word-breakdown-first ordering as getDownloadItems.
 */
export function getDownloadItemsForFavorites(
  favorites: FavoriteItem[],
  languageId: LanguageId,
): Phrase[] {
  const langFavorites = favorites.filter((f) => f.languageId === languageId);
  const seenWords = new Set<string>();
  const items: Phrase[] = [];

  for (const fav of langFavorites) {
    const { phrases, words } = getCategoryData(languageId, fav.categoryId);
    const phrase = [...phrases, ...words].find((p) => p.id === fav.phraseId);
    if (!phrase) continue;

    if (phrase.words) {
      for (const word of phrase.words) {
        if (!seenWords.has(word.text)) {
          seenWords.add(word.text);
          items.push({
            id: `wd-${word.text}`,
            text: word.text,
            translation: word.translation,
            ...(word.pronunciation && { pronunciation: word.pronunciation }),
          });
        }
      }
    }
    items.push(phrase);
  }

  return items;
}
