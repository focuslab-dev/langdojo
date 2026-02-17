import { useMemo } from "react";
import { LanguageId, CategoryId, Phrase, PhraseCategory } from "@/types";

// Japanese
import japaneseBasics from "@/data/japanese/basics.json";
import japaneseCafe from "@/data/japanese/cafe.json";
import japaneseRestaurant from "@/data/japanese/restaurant.json";
import japaneseSupermarket from "@/data/japanese/supermarket.json";
import japaneseTaxi from "@/data/japanese/taxi.json";
import japaneseTrain from "@/data/japanese/train.json";
import japaneseBus from "@/data/japanese/bus.json";
import japaneseNumbers from "@/data/japanese/numbers.json";
import japaneseHotel from "@/data/japanese/hotel.json";

// Mandarin
import mandarinBasics from "@/data/mandarin/basics.json";
import mandarinCafe from "@/data/mandarin/cafe.json";
import mandarinRestaurant from "@/data/mandarin/restaurant.json";
import mandarinSupermarket from "@/data/mandarin/supermarket.json";
import mandarinTaxi from "@/data/mandarin/taxi.json";
import mandarinTrain from "@/data/mandarin/train.json";
import mandarinBus from "@/data/mandarin/bus.json";
import mandarinNumbers from "@/data/mandarin/numbers.json";
import mandarinHotel from "@/data/mandarin/hotel.json";

// Thai
import thaiBasics from "@/data/thai/basics.json";
import thaiCafe from "@/data/thai/cafe.json";
import thaiRestaurant from "@/data/thai/restaurant.json";
import thaiSupermarket from "@/data/thai/supermarket.json";
import thaiTaxi from "@/data/thai/taxi.json";
import thaiTrain from "@/data/thai/train.json";
import thaiBus from "@/data/thai/bus.json";
import thaiNumbers from "@/data/thai/numbers.json";
import thaiHotel from "@/data/thai/hotel.json";

// Korean
import koreanBasics from "@/data/korean/basics.json";
import koreanCafe from "@/data/korean/cafe.json";
import koreanRestaurant from "@/data/korean/restaurant.json";
import koreanSupermarket from "@/data/korean/supermarket.json";
import koreanTaxi from "@/data/korean/taxi.json";
import koreanTrain from "@/data/korean/train.json";
import koreanBus from "@/data/korean/bus.json";
import koreanNumbers from "@/data/korean/numbers.json";
import koreanHotel from "@/data/korean/hotel.json";

// French
import frenchBasics from "@/data/french/basics.json";
import frenchCafe from "@/data/french/cafe.json";
import frenchRestaurant from "@/data/french/restaurant.json";
import frenchSupermarket from "@/data/french/supermarket.json";
import frenchTaxi from "@/data/french/taxi.json";
import frenchTrain from "@/data/french/train.json";
import frenchBus from "@/data/french/bus.json";
import frenchNumbers from "@/data/french/numbers.json";
import frenchHotel from "@/data/french/hotel.json";

// Spanish
import spanishBasics from "@/data/spanish/basics.json";
import spanishCafe from "@/data/spanish/cafe.json";
import spanishRestaurant from "@/data/spanish/restaurant.json";
import spanishSupermarket from "@/data/spanish/supermarket.json";
import spanishTaxi from "@/data/spanish/taxi.json";
import spanishTrain from "@/data/spanish/train.json";
import spanishBus from "@/data/spanish/bus.json";
import spanishNumbers from "@/data/spanish/numbers.json";
import spanishHotel from "@/data/spanish/hotel.json";

const phraseData: Record<LanguageId, Record<string, PhraseCategory>> = {
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

interface FavoriteItem {
  phrase: Phrase;
  languageId: LanguageId;
  categoryId: string;
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
      return favorites.map((f) => f.phrase);
    }

    const languageData = phraseData[languageId];
    const categoryData = languageData?.[categoryId];

    if (!categoryData) {
      return [] as Phrase[];
    }

    return categoryData.phrases || [];
  }, [languageId, categoryId, getFavoritesByLanguage]);

  const words = useMemo(() => {
    if (categoryId === "favorites") {
      return [] as Phrase[];
    }

    const languageData = phraseData[languageId];
    const categoryData = languageData?.[categoryId];

    return categoryData?.words || [];
  }, [languageId, categoryId]);

  return { phrases, words };
};
