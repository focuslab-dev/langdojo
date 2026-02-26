import { motion } from "framer-motion";
import { languages } from "@/utils/languages";
import { LanguageId } from "@/types";

interface StepLanguageSelectProps {
  onSelect: (languageId: LanguageId) => void;
}

export function StepLanguageSelect({ onSelect }: StepLanguageSelectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Which language would you like to review?
        </h2>
        <p className="mt-2 text-gray-600">
          Select a language to review its phrases category by category.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => onSelect(lang.id as LanguageId)}
            className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 hover:border-gray-200 transition-all"
          >
            <span className="text-3xl">{lang.flag}</span>
            <span className="text-sm font-medium text-gray-800">
              {lang.name}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
