import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Language } from "@/types";
import { languages } from "@/utils/languages";

interface LanguageDropdownProps {
  selectedLanguage: Language;
  onSelectLanguage: (language: Language) => void;
}

export const LanguageDropdown = ({
  selectedLanguage,
  onSelectLanguage,
}: LanguageDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (language: Language) => {
    onSelectLanguage(language);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-gray-100 hover:bg-white transition-colors"
      >
        <span className="text-lg ml-0.5">{selectedLanguage.flag}</span>
        <span className="text-xs font-medium text-gray-700">
          {selectedLanguage.name}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 bg-white rounded-2xl lg:rounded-xl shadow-lg border border-gray-100 overflow-hidden min-w-[160px] lg:min-w-[140px] z-50"
          >
            {languages.map((language) => (
              <button
                key={language.id}
                onClick={() => handleSelect(language)}
                className={`w-full flex items-center gap-3 lg:gap-2 px-4 lg:px-3 py-3 lg:py-2 hover:bg-gray-50 transition-colors ${
                  selectedLanguage.id === language.id ? "bg-accent/10" : ""
                }`}
              >
                <span className="text-xl lg:text-base">{language.flag}</span>
                <span className="text-sm lg:text-xs font-medium text-gray-700">
                  {language.name}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
