import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { Language, LanguageId, CategoryId } from "@/types";
import {
  languages,
  categories,
  getCategoryById,
  getLanguageById,
} from "@/utils/languages";
import { useFavorites } from "@/hooks/useFavorites";
import { usePhraseData } from "@/hooks/usePhraseData";
import { useTTS } from "@/hooks/useTTS";
import { HeroSection } from "@/components/HeroSection";
import { PhraseList } from "@/components/PhraseList";
import { NavigationModal } from "@/components/NavigationModal";
import { LanguageDropdown } from "@/components/LanguageDropdown";

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return languages[0];
    const saved = localStorage.getItem("selectedLanguageId");
    return (saved && getLanguageById(saved)) || languages[0];
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId>(
    () => {
      if (typeof window === "undefined") return "basics";
      return (
        (localStorage.getItem("selectedCategoryId") as CategoryId) || "basics"
      );
    },
  );
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("selectedLanguageId", selectedLanguage.id);
  }, [selectedLanguage]);

  useEffect(() => {
    localStorage.setItem("selectedCategoryId", selectedCategoryId);
  }, [selectedCategoryId]);

  const { isFavorite, toggleFavorite, getFavoritesByLanguage, isLoaded } =
    useFavorites();
  const { speak, speakingText } = useTTS();

  const selectedCategory = getCategoryById(selectedCategoryId) || categories[1];

  const { phrases: currentPhrases, words: currentWords, favoriteGroups } = usePhraseData({
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

      {/* Mobile top controls - hidden on desktop */}
      <div className="fixed top-4 right-0 z-20 flex items-center justify-end gap-2 px-4 lg:hidden">
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

      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-80 z-30 transition-colors duration-300"
        style={{ backgroundColor: selectedCategory.color }}
      >
        <div className="flex flex-col h-full p-6 overflow-y-auto">
          {/* Language selector */}
          <div className="mb-8">
            <LanguageDropdown
              selectedLanguage={selectedLanguage}
              onSelectLanguage={setSelectedLanguage}
            />
          </div>

          {/* Category emoji */}
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              key={selectedCategory.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="text-8xl"
            >
              {selectedCategory.emoji}
            </motion.div>
          </div>

          {/* Category navigation */}
          <nav className="mt-6">
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id as CategoryId)}
                    className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                      isSelected
                        ? "bg-white/30 shadow-sm"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <span className="text-xl mb-1">{cat.emoji}</span>
                    <span
                      className={`text-xs font-medium ${
                        isSelected ? "text-white" : "text-white/70"
                      }`}
                    >
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </aside>

      <main className="min-h-screen bg-white lg:ml-80">
        {/* Mobile Hero - hidden on desktop */}
        <div className="lg:hidden">
          <HeroSection category={selectedCategory} languageId={selectedLanguage.id as LanguageId} categoryId={selectedCategoryId} />
        </div>

        {/* Bottom Sheet / Content Area */}
        <motion.div
          // initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mt-[25vh] lg:mt-0 min-h-[75vh] lg:min-h-screen bg-white rounded-t-3xl lg:rounded-none shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:shadow-none z-10"
        >
          {/* Mobile drag handle */}
          <div className="sticky top-0 pt-3 pb-2 bg-white rounded-t-3xl lg:hidden">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto" />
          </div>

          {/* Desktop content container */}
          <div className="lg:max-w-4xl lg:mx-auto">
            {/* Desktop header */}
            <div className="hidden lg:block px-8 pt-8 pb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedCategory.emoji}</span>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      {selectedCategory.name}
                    </h1>
                    <p className="text-sm text-gray-400">
                      {selectedLanguage.flag} {selectedLanguage.name}
                    </p>
                  </div>
                </div>
                {selectedCategoryId !== "favorites" && (
                  <Link
                    href={`/download?lang=${selectedLanguage.id}&cat=${selectedCategoryId}`}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Link>
                )}
              </div>
            </div>

            {/* Phrase list content */}
            <div className="px-4 lg:px-8 pb-24 lg:pb-8 phrase-list-scrollbar">
              <PhraseList
                phrases={currentPhrases}
                words={currentWords}
                languageId={selectedLanguage.id as LanguageId}
                categoryId={selectedCategoryId}
                speakingText={speakingText}
                favoriteGroups={favoriteGroups}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                onSpeak={speak}
              />
            </div>
          </div>
        </motion.div>

        {/* Navigation Modal - mobile only */}
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
