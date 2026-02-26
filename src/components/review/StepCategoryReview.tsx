import { motion } from "framer-motion";
import { Category, LanguageId, Phrase } from "@/types";
import { getCategoryData } from "@/utils/getPhraseData";
import { ReviewPhraseCard } from "./ReviewPhraseCard";
import { Button } from "@/components/ui/Button";

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
  const { phrases, words } = getCategoryData(languageId, category.id);
  const allPhrases: Phrase[] = [...phrases, ...words];

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

      <div className="space-y-3">
        {allPhrases.map((phrase) => (
          <ReviewPhraseCard
            key={phrase.id}
            phrase={phrase}
            comment={comments[phrase.id] ?? ""}
            onCommentChange={(c) => onCommentChange(phrase.id, c)}
          />
        ))}
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Suggest new phrases for {category.name}
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
    </motion.div>
  );
}
