import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

const GIF_SRC = "/img/word-breakdown2.gif";

interface LongPressHintModalProps {
  onClose: () => void;
  visible: boolean;
}

export const LongPressHintModal = ({
  onClose,
  visible,
}: LongPressHintModalProps) => {
  useEffect(() => {
    const img = new window.Image();
    img.src = GIF_SRC;
  }, []);

  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
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
            <div className="flex items-start justify-between p-5 pb-3">
              <div className="flex-1 min-w-0 pr-3">
                <p className="text-xs font-medium text-pink-500 uppercase tracking-wide mb-1">
                  Pro tip
                </p>
                <h2 className="text-lg font-bold text-gray-900 leading-snug">
                  See word-by-word breakdown
                </h2>
              </div>
              {/* <button
                onClick={onClose}
                className="shrink-0 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button> */}
            </div>

            {/* Image */}
            <div className="px-5 py-2">
              <div className="rounded-xl overflow-hidden border border-gray-100">
                <Image
                  src={GIF_SRC}
                  alt="Long press a card to see word breakdown"
                  width={400}
                  height={260}
                  className="w-full object-cover"
                />
              </div>
            </div>

            {/* Description */}
            <div className="px-5 pt-3 pb-5">
              <p className="text-sm text-gray-500 leading-relaxed">
                Long-press any phrase card to see a detailed breakdown of each
                word, including pronunciation and individual translations.
              </p>
              <button
                onClick={onClose}
                className="mt-4 w-full py-2.5 rounded-xl bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 active:bg-pink-700 transition-colors"
              >
                Got it!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
