import { motion } from 'framer-motion';
import { IconGrid } from '@/components/ui/Icons';

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
      <IconGrid className="w-6 h-6 text-white" />
    </motion.button>
  );
};
