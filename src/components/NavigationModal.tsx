import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Category, CategoryId } from '@/types';
import { categories } from '@/utils/languages';

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategoryId: CategoryId;
  onSelectCategory: (categoryId: CategoryId) => void;
}

export const NavigationModal = ({
  isOpen,
  onClose,
  selectedCategoryId,
  onSelectCategory,
}: NavigationModalProps) => {
  const handleSelectCategory = (category: Category) => {
    onSelectCategory(category.id as CategoryId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-4 bg-white rounded-3xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
            </div>

            {/* Category Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category, index) => {
                  const isSelected = selectedCategoryId === category.id;

                  return (
                    <button
                      key={category.id}
                      onClick={() => handleSelectCategory(category)}
                      className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all ${
                        isSelected
                          ? 'ring-2 ring-offset-2'
                          : 'hover:bg-gray-50'
                      }`}
                      style={{
                        backgroundColor: isSelected ? `${category.color}20` : undefined,
                        '--tw-ring-color': isSelected ? category.color : undefined,
                      } as React.CSSProperties}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mb-2 text-2xl"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        {category.emoji}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {category.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
