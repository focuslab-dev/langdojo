import { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Language, LanguageId, CategoryId } from "@/types";
import { languages, categories, getCategoryById } from "@/utils/languages";
import { useFavorites } from "@/hooks/useFavorites";
import { usePhraseData } from "@/hooks/usePhraseData";
import { useTTS } from "@/hooks/useTTS";
import { HeroSection } from "@/components/HeroSection";
import { PhraseList } from "@/components/PhraseList";
import { NavigationModal } from "@/components/NavigationModal";
import { LanguageDropdown } from "@/components/LanguageDropdown";

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages[0],
  );
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<CategoryId>("greetings");
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);

  const { isFavorite, toggleFavorite, getFavoritesByLanguage, isLoaded } =
    useFavorites();
  const { speak } = useTTS();

  const selectedCategory = getCategoryById(selectedCategoryId) || categories[1];

  const { phrases: currentPhrases, words: currentWords } = usePhraseData({
    languageId: selectedLanguage.id as LanguageId,
    categoryId: selectedCategoryId,
    getFavoritesByLanguage,
  });

  // Load voices on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Travel Phrases</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>

      {/* Top-right controls */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-md z-20 flex items-center justify-end gap-2 px-4">
        <LanguageDropdown
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
        />
        <button
          onClick={() => setIsNavModalOpen(true)}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-gray-100 hover:bg-white transition-colors"
        >
          <span className="text-lg ml-0.5">{selectedCategory.emoji}</span>
          <span className="text-xs font-medium text-gray-700">
            {selectedCategory.name}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <main className="min-h-screen bg-white max-w-md mx-auto">
        {/* Hero Section */}
        <HeroSection category={selectedCategory} />

        {/* Bottom Sheet / Phrase List */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mt-[25vh] min-h-[75vh] bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-10"
        >
          {/* Drag handle indicator */}
          <div className="sticky top-0 pt-3 pb-2 bg-white rounded-t-3xl">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto" />
          </div>

          {/* Phrase list content */}
          <div className="px-4 pb-24 phrase-list-scrollbar">
            <PhraseList
              phrases={currentPhrases}
              words={currentWords}
              languageId={selectedLanguage.id as LanguageId}
              categoryId={selectedCategoryId}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              onSpeak={speak}
            />
          </div>
        </motion.div>

        {/* Navigation Modal */}
        <NavigationModal
          isOpen={isNavModalOpen}
          onClose={() => setIsNavModalOpen(false)}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
      </main>
    </>
  );
}
