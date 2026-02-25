import { motion } from "framer-motion";
import Link from "next/link";
import { IconDownload } from "@/components/ui/Icons";
import { Category, LanguageId, CategoryId } from "@/types";
import { getLanguageById, packages } from "@/utils/languages";

interface HeroSectionProps {
  category: Category;
  languageId: LanguageId;
  categoryId: CategoryId;
  heroSectionHeight: number;
}

export const HeroSection = ({
  category,
  languageId,
  categoryId,
  heroSectionHeight,
}: HeroSectionProps) => {
  const language = getLanguageById(languageId);
  return (
    <div
      className="fixed top-0 left-0 w-full flex flex-col"
      style={{ backgroundColor: category.color, height: heroSectionHeight }}
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
      </div>
    </div>
  );
};
