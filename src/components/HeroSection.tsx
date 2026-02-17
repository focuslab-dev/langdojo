import { motion } from "framer-motion";
import Link from "next/link";
import { Download } from "lucide-react";
import { Category, LanguageId, CategoryId } from "@/types";

interface HeroSectionProps {
  category: Category;
  languageId: LanguageId;
  categoryId: CategoryId;
}

export const HeroSection = ({
  category,
  languageId,
  categoryId,
}: HeroSectionProps) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-[30vh] flex flex-col"
      style={{ backgroundColor: category.color }}
    >
      {/* Centered emoji */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          key={category.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="text-7xl"
        >
          {category.emoji}
        </motion.div>
        {categoryId !== "favorites" && (
          <Link
            href={`/download?lang=${languageId}&cat=${categoryId}`}
            className="mt-3 flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </Link>
        )}
      </div>
    </div>
  );
};
