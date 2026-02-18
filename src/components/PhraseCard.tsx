import { motion } from "framer-motion";
import { Volume2, Heart } from "lucide-react";
import { Phrase, LanguageId } from "@/types";

interface PhraseCardProps {
  phrase: Phrase;
  languageId: LanguageId;
  isFavorite: boolean;
  isSpeaking: boolean;
  onToggleFavorite: () => void;
  onSpeak: () => void;
}

export const PhraseCard = ({
  phrase,
  isFavorite,
  isSpeaking,
  onToggleFavorite,
  onSpeak,
}: PhraseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        // y: isSpeaking ? -10 : 0,
        scale: isSpeaking ? 1.02 : 1,
      }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ scale: { duration: 0 } }}
      onClick={onSpeak}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer active:bg-gray-50 lg:hover:shadow-md lg:hover:-translate-y-0.5 lg:hover:border-gray-200 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* English (small, secondary) */}
          <p className="text-sm text-pink-600">{phrase.english}</p>
          {/* <p className="text-sm text-[#13aa98]">{phrase.english}</p> */}

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
            onClick={(e) => {
              e.stopPropagation();
              onSpeak();
            }}
            className={`p-2 rounded-full transition-colors ${isSpeaking ? "bg-blue-50" : "bg-gray-50 hover:bg-gray-100"}`}
            aria-label="Play pronunciation"
          >
            <motion.div
              animate={isSpeaking ? { scale: [1, 1.25, 1] } : { scale: 1 }}
              transition={
                isSpeaking
                  ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
                  : {}
              }
            >
              <Volume2
                className={`w-5 h-5 transition-colors ${isSpeaking ? "text-blue-500" : "text-gray-600"}`}
              />
            </motion.div>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
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
