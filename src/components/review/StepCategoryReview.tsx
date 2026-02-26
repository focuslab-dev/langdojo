import { useState } from "react";
import { motion } from "framer-motion";
import { Category, LanguageId } from "@/types";
import { getCategoryData } from "@/utils/getPhraseData";
import { ReviewPhraseCard } from "./ReviewPhraseCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/global/Modal";
import { GuidelinesContent } from "@/components/review/GuidelinesContent";

interface StepCategoryReviewProps {
  category: Category;
  languageId: LanguageId;
  comments: Record<string, string>;
  suggestion: string;
  onCommentChange: (phraseId: string, comment: string) => void;
  onSuggestionChange: (suggestion: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepCategoryReview({
  category,
  languageId,
  comments,
  suggestion,
  onCommentChange,
  onSuggestionChange,
  onNext,
  onBack,
}: StepCategoryReviewProps) {
  const [showGuidelines, setShowGuidelines] = useState(false);
  const { phrases, words } = getCategoryData(languageId, category.id);

  return (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {category.emoji} {category.name}
        </h2>
        <p className="mt-1 text-gray-600">
          Tap &quot;Comment&quot; on any phrase to leave feedback.
        </p>
      </div>

      {phrases.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-500">Phrases</h3>
          {phrases.map((phrase) => (
            <ReviewPhraseCard
              key={phrase.id}
              phrase={phrase}
              comment={comments[phrase.id] ?? ""}
              onCommentChange={(c) => onCommentChange(phrase.id, c)}
            />
          ))}
        </div>
      )}

      {words.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-500 mt-12">
            Additional Words
          </h3>
          {words.map((word) => (
            <ReviewPhraseCard
              key={word.id}
              phrase={word}
              comment={comments[word.id] ?? ""}
              onCommentChange={(c) => onCommentChange(word.id, c)}
            />
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Suggest new phrases for {category.name} (if any)
        </label>
        <textarea
          value={suggestion}
          onChange={(e) => onSuggestionChange(e.target.value)}
          placeholder="e.g. 'Where is the nearest ATM?' would be useful to add…"
          rows={3}
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" fullWidth onClick={onNext}>
          Next Category
        </Button>
      </div>

      <button
        onClick={() => setShowGuidelines(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-yellow-500 text-white rounded-full shadow-lg hover:opacity-80 active:scale-95 transition-all"
        aria-label="View Guidelines"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </button>

      <Modal
        open={showGuidelines}
        onClose={() => setShowGuidelines(false)}
        title="Review Guidelines"
      >
        <GuidelinesContent />
      </Modal>
    </motion.div>
  );
}
