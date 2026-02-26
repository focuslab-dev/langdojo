import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface StepFinalFormProps {
  overallFeedback: string;
  contributorName: string;
  contributorLink: string;
  email: string;
  onFieldChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepFinalForm({
  overallFeedback,
  contributorName,
  contributorLink,
  email,
  onFieldChange,
  onNext,
  onBack,
}: StepFinalFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Almost done!
        </h2>
        <p className="mt-2 text-gray-600">
          Add any overall feedback and let us know who you are so we can credit you.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Overall feedback
          </label>
          <textarea
            value={overallFeedback}
            onChange={(e) => onFieldChange("overallFeedback", e.target.value)}
            placeholder="Any general thoughts on the phrase quality, missing topics, etc."
            rows={4}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your name <span className="text-gray-400">(for credit)</span>
          </label>
          <input
            type="text"
            value={contributorName}
            onChange={(e) => onFieldChange("contributorName", e.target.value)}
            placeholder="e.g. Tanaka Yuki"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link <span className="text-gray-400">(Twitter, website — optional)</span>
          </label>
          <input
            type="text"
            value={contributorLink}
            onChange={(e) => onFieldChange("contributorLink", e.target.value)}
            placeholder="e.g. https://twitter.com/yourhandle"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onFieldChange("email", e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" fullWidth onClick={onNext}>
          Preview Review
        </Button>
      </div>
    </motion.div>
  );
}
