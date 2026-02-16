import { motion } from "framer-motion";
import { Volume2, Heart } from "lucide-react";
import { Phrase, LanguageId } from "@/types";

interface PhraseCardProps {
  phrase: Phrase;
  languageId: LanguageId;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSpeak: () => void;
}

export const PhraseCard = ({
  phrase,
  isFavorite,
  onToggleFavorite,
  onSpeak,
}: PhraseCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* English (small, secondary) */}
          <p className="text-sm text-gray-400">{phrase.english}</p>

          {/* Translation (large, primary) */}
          <p className="mt-2 text-lg font-semibold text-gray-800 leading-tight">
            {phrase.translation}
          </p>

          {/* Pronunciation (medium) */}
          <p className="mt-1 text-base text-gray-500">{phrase.pronunciation}</p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onSpeak}
            className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
            aria-label="Play pronunciation"
          >
            <Volume2 className="w-5 h-5 text-gray-600" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onToggleFavorite}
            className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
