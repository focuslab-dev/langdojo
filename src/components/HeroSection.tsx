import { motion } from "framer-motion";
import { Category } from "@/types";

interface HeroSectionProps {
  category: Category;
}

export const HeroSection = ({
  category,
}: HeroSectionProps) => {
  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-[30vh] flex flex-col"
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
      </div>
    </div>
  );
};
