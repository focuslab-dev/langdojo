import { useState } from "react";
import { motion } from "framer-motion";
import { Phrase, LanguageId, CategoryId } from "@/types";
import { PhraseCard } from "./PhraseCard";
import { FavoriteGroup } from "@/hooks/usePhraseData";

interface PhraseListProps {
  phrases: Phrase[];
  words: Phrase[];
  languageId: LanguageId;
  categoryId: CategoryId;
  speakingText: string | null;
  favoriteGroups?: FavoriteGroup[];
  isFavorite: (phraseId: string, languageId: LanguageId) => boolean;
  onToggleFavorite: (
    phrase: Phrase,
    languageId: LanguageId,
    categoryId: string,
  ) => void;
  onSpeak: (text: string, languageId: string) => void;
}

export const PhraseList = ({
  phrases,
  words,
  languageId,
  categoryId,
  speakingText,
  favoriteGroups,
  isFavorite,
  onToggleFavorite,
  onSpeak,
}: PhraseListProps) => {
  const [activeTab, setActiveTab] = useState<"phrases" | "words">("phrases");

  const items = activeTab === "phrases" ? phrases : words;
  const showTabs = categoryId !== "favorites" && words.length > 0;

  if (phrases.length === 0 && words.length === 0) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-gray-400 text-center">
          {categoryId === "favorites"
            ? "No favorites yet. Tap the heart icon on any phrase to add it here."
            : "No phrases available for this category."}
        </p>
      </div>
    );
  }

  // Grouped rendering for favorites
  if (categoryId === "favorites" && favoriteGroups && favoriteGroups.length > 0) {
    let globalIndex = 0;
    return (
      <div className="space-y-6">
        {favoriteGroups.map((group) => (
          <div key={group.categoryId}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{group.emoji}</span>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                {group.categoryName}
              </h3>
            </div>
            <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
              {group.phrases.map((phrase) => {
                const index = globalIndex++;
                return (
                  <motion.div
                    key={`${phrase.id}-${group.categoryId}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <PhraseCard
                      phrase={phrase}
                      languageId={languageId}
                      isFavorite={isFavorite(phrase.id, languageId)}
                      isSpeaking={speakingText === phrase.translation}
                      onToggleFavorite={() =>
                        onToggleFavorite(phrase, languageId, group.categoryId)
                      }
                      onSpeak={() => onSpeak(phrase.translation, languageId)}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {showTabs && (
        <div className="flex bg-gray-100 rounded-full p-1 mb-1 lg:col-span-2">
          <button
            onClick={() => setActiveTab("phrases")}
            className={`flex-1 py-1.5 text-sm font-medium rounded-full transition-all ${
              activeTab === "phrases"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-500"
            }`}
          >
            Phrases
          </button>
          <button
            onClick={() => setActiveTab("words")}
            className={`flex-1 py-1.5 text-sm font-medium rounded-full transition-all ${
              activeTab === "words"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-500"
            }`}
          >
            Words
          </button>
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex items-center justify-center h-48 lg:col-span-2">
          <p className="text-gray-400 text-center">
            {categoryId === "favorites"
              ? "No favorites yet. Tap the heart icon on any phrase to add it here."
              : `No ${activeTab} available for this category.`}
          </p>
        </div>
      ) : (
        items.map((phrase, index) => (
          <motion.div
            key={`${phrase.id}-${categoryId}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <PhraseCard
              phrase={phrase}
              languageId={languageId}
              isFavorite={isFavorite(phrase.id, languageId)}
              isSpeaking={speakingText === phrase.translation}
              onToggleFavorite={() =>
                onToggleFavorite(phrase, languageId, categoryId)
              }
              onSpeak={() => onSpeak(phrase.translation, languageId)}
            />
          </motion.div>
        ))
      )}
    </div>
  );
};
