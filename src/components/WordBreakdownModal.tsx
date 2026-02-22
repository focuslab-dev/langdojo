import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2 } from "lucide-react";
import { Phrase, LanguageId } from "@/types";
import { useTTS } from "@/hooks/useTTS";

interface WordBreakdownModalProps {
  phrase: Phrase;
  languageId: LanguageId;
  onClose: () => void;
}

export const WordBreakdownModal = ({
  phrase,
  languageId,
  onClose,
}: WordBreakdownModalProps) => {
  const { speak, speakingText } = useTTS();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-start justify-between p-5 pb-4 border-b border-gray-100">
            <div className="flex-1 min-w-0 pr-3">
              <p className="text-xs font-medium text-pink-500 uppercase tracking-wide mb-1">
                {phrase.translation}
              </p>
              <p className="text-xl font-bold text-gray-900 leading-snug">
                {phrase.text}
              </p>
              {phrase.pronunciation && (
                <p className="text-sm text-gray-400 mt-0.5">
                  {phrase.pronunciation}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="shrink-0 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Word breakdown */}
          {phrase.words && phrase.words.length > 0 ? (
            <div className="p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Word breakdown
              </p>
              <div className="flex flex-col gap-2">
                {phrase.words.map((w, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 bg-gray-50 rounded-xl px-4 py-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-gray-800">
                        {w.text}
                      </p>
                      {w.pronunciation && (
                        <p className="text-xs text-gray-400">{w.pronunciation}</p>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 text-right flex-1">
                      {w.translation}
                    </p>
                    <button
                      onClick={() => speak(w.text, languageId)}
                      className="shrink-0 p-1.5 rounded-full hover:bg-gray-200 transition-colors"
                      aria-label={`Speak ${w.text}`}
                    >
                      <motion.div
                        animate={
                          speakingText === w.text
                            ? { scale: [1, 1.25, 1] }
                            : { scale: 1 }
                        }
                        transition={
                          speakingText === w.text
                            ? {
                                duration: 0.6,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }
                            : {}
                        }
                      >
                        <Volume2
                          className={`w-4 h-4 transition-colors ${
                            speakingText === w.text
                              ? "text-blue-500"
                              : "text-gray-400"
                          }`}
                        />
                      </motion.div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-5 text-center text-sm text-gray-400">
              No word breakdown available.
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
