import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconVolume, IconHeart } from "@/components/ui/Icons";
import clsx from "clsx";
import { Phrase, LanguageId } from "@/types";
import { WordBreakdownModal } from "./WordBreakdownModal";

interface PhraseCardProps {
  phrase: Phrase;
  languageId: LanguageId;
  isFavorite: boolean;
  isSpeaking: boolean;
  onToggleFavorite: () => void;
  onSpeak: () => void;
}

const LONG_PRESS_DURATION = 500;

export const PhraseCard = ({
  phrase,
  languageId,
  isFavorite,
  isSpeaking,
  onToggleFavorite,
  onSpeak,
}: PhraseCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = useRef(false);

  const startPress = useCallback(() => {
    didLongPress.current = false;
    timerRef.current = setTimeout(() => {
      didLongPress.current = true;
      setShowModal(true);
    }, LONG_PRESS_DURATION);
  }, []);

  const cancelPress = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleClick = useCallback(() => {
    if (!didLongPress.current) {
      onSpeak();
    }
  }, [onSpeak]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          scale: isSpeaking ? 1.02 : 1,
        }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ scale: { duration: 0 } }}
        onClick={handleClick}
        onMouseDown={startPress}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        onTouchStart={startPress}
        onTouchEnd={cancelPress}
        onTouchMove={cancelPress}
        onContextMenu={(e) => e.preventDefault()}
        className={clsx(
          "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer transition-all select-none",
          "active:bg-gray-50",
          "lg:hover:shadow-md lg:hover:-translate-y-0.5 lg:hover:border-gray-200",
          isSpeaking && "shadow-xl lg:hover:shadow-xl",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-pink-600">{phrase.translation}</p>

            <p className="mt-2 text-lg font-semibold text-gray-800 leading-tight">
              {phrase.text}
            </p>

            {phrase.pronunciation && (
              <p className="mt-1 text-base text-gray-500">{phrase.pronunciation}</p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <motion.div className="p-2">
              <motion.div
                animate={isSpeaking ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                transition={
                  isSpeaking
                    ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
                    : {}
                }
              >
                <IconVolume
                  className={`w-5 h-5 transition-colors ${isSpeaking ? "text-blue-500" : "text-gray-400"}`}
                />
              </motion.div>
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="p-2 rounded-full bg-gray-50 hover:bg-backgroundDim transition-colors"
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <IconHeart
                className={`w-5 h-5 transition-colors ${
                  isFavorite ? "text-red-500" : "text-gray-400"
                }`}
              />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <WordBreakdownModal
            phrase={phrase}
            languageId={languageId}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
