import { motion } from 'framer-motion';
import { Grid3X3 } from 'lucide-react';

interface FilterButtonProps {
  onClick: () => void;
}

export const FilterButton = ({ onClick }: FilterButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gray-800 rounded-full shadow-lg flex items-center justify-center z-30"
      aria-label="Open category navigation"
    >
      <Grid3X3 className="w-6 h-6 text-white" />
    </motion.button>
  );
};
