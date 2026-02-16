import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phrase, LanguageId, CategoryId } from '@/types';
import { PhraseCard } from './PhraseCard';

interface PhraseListProps {
  phrases: Phrase[];
  words: Phrase[];
  languageId: LanguageId;
  categoryId: CategoryId;
  isFavorite: (phraseId: string, languageId: LanguageId) => boolean;
  onToggleFavorite: (phrase: Phrase, languageId: LanguageId, categoryId: string) => void;
  onSpeak: (text: string, languageId: string) => void;
}

export const PhraseList = ({
  phrases,
  words,
  languageId,
  categoryId,
  isFavorite,
  onToggleFavorite,
  onSpeak,
}: PhraseListProps) => {
  const [activeTab, setActiveTab] = useState<'phrases' | 'words'>('phrases');

  const items = activeTab === 'phrases' ? phrases : words;
  const showTabs = categoryId !== 'favorites' && words.length > 0;

  if (phrases.length === 0 && words.length === 0) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-gray-400 text-center">
          {categoryId === 'favorites'
            ? 'No favorites yet. Tap the heart icon on any phrase to add it here.'
            : 'No phrases available for this category.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {showTabs && (
        <div className="flex bg-gray-100 rounded-full p-1 mb-1">
          <button
            onClick={() => setActiveTab('phrases')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-full transition-all ${
              activeTab === 'phrases'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-500'
            }`}
          >
            Phrases
          </button>
          <button
            onClick={() => setActiveTab('words')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-full transition-all ${
              activeTab === 'words'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-500'
            }`}
          >
            Words
          </button>
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-400 text-center">
            {categoryId === 'favorites'
              ? 'No favorites yet. Tap the heart icon on any phrase to add it here.'
              : `No ${activeTab} available for this category.`}
          </p>
        </div>
      ) : (
        items.map((phrase, index) => (
          <motion.div
            key={phrase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <PhraseCard
              phrase={phrase}
              languageId={languageId}
              isFavorite={isFavorite(phrase.id, languageId)}
              onToggleFavorite={() => onToggleFavorite(phrase, languageId, categoryId)}
              onSpeak={() => onSpeak(phrase.translation, languageId)}
            />
          </motion.div>
        ))
      )}
    </div>
  );
};
