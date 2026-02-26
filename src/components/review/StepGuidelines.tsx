import { motion } from "framer-motion";
import { GuidelinesContent } from "./GuidelinesContent";

interface StepGuidelinesProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepGuidelines({ onNext, onBack }: StepGuidelinesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="heading-1">Review Guidelines</h2>
        <p className="mt-2 text-gray-600">
          Before you start, here&apos;s how the content is structured and what
          to look for during your review.
        </p>
      </div>

      <div className="space-y-8">
        <div className="card p-5">
          <GuidelinesContent />
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <button
          onClick={onBack}
          className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-5 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors"
        >
          Start Review
        </button>
      </div>
    </motion.div>
  );
}
