import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Head from "next/head";
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
import { Button } from "@/components/ui/Button";

const HERO_SECTION_HEIGHT = 260; // px
const BOTTOM_SHEET_MARGIN_TOP = 45; // px

export default function PhrasesPage() {
  const router = useRouter();

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

  // Apply query params for deep-linking (e.g. /phrases?lang=japanese&cat=basics)
  useEffect(() => {
    if (!router.isReady) return;
    const { lang, cat } = router.query;
    if (lang && typeof lang === "string") {
      const found = getLanguageById(lang);
      if (found) setSelectedLanguage(found);
    }
    if (cat && typeof cat === "string") {
      const found = getCategoryById(cat);
      if (found) setSelectedCategoryId(cat as CategoryId);
    }
  }, [router.isReady, router.query]);

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

  const {
    phrases: currentPhrases,
    words: currentWords,
    favoriteGroups,
  } = usePhraseData({
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

      <main className="min-h-screen bg-background lg:ml-80">
        {/* Mobile Hero - hidden on desktop */}
        <div className="lg:hidden">
          <HeroSection
            category={selectedCategory}
            languageId={selectedLanguage.id as LanguageId}
            categoryId={selectedCategoryId}
            heroSectionHeight={HERO_SECTION_HEIGHT}
          />
        </div>

        {/* Bottom Sheet / Content Area */}
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={
            {
              "--hero-height": `${HERO_SECTION_HEIGHT}px`,
              "--bottom-sheet-margin-top": `${BOTTOM_SHEET_MARGIN_TOP}px`,
            } as React.CSSProperties
          }
          className={clsx(
            "relative z-10 bg-background",
            "mt-[calc(var(--hero-height)-var(--bottom-sheet-margin-top))] min-h-[calc(100vh-var(--hero-height))]",
            "rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)]",
            "lg:mt-0 lg:min-h-screen lg:rounded-none lg:shadow-none",
          )}
        >
          {/* Mobile drag handle */}
          <div className="sticky top-0 pt-3 pb-2 bg-background rounded-t-3xl lg:hidden">
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
                <Button
                  variant="ghost"
                  href={`/download?lang=${selectedLanguage.id}`}
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
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
