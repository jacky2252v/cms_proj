"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧", message: "Good day!", button: "Continue" },
  { code: "es", label: "Español", flag: "🇪🇸", message: "¡Buenos días!", button: "Continuar" },
  { code: "fr", label: "Français", flag: "🇫🇷", message: "Bonjour !", button: "Continuer" },
  { code: "de", label: "Deutsch", flag: "🇩🇪", message: "Guten Tag!", button: "Fortsetzen" },
  { code: "it", label: "Italiano", flag: "🇮🇹", message: "Buongiorno!", button: "Continua" },
  { code: "pt", label: "Português", flag: "🇵🇹", message: "Bom dia!", button: "Continuar" },
  { code: "ru", label: "Русский", flag: "🇷🇺", message: "Добрый день!", button: "Продолжить" },
  { code: "zh", label: "中文", flag: "🇨🇳", message: "您好！", button: "继续" },
  { code: "ja", label: "日本語", flag: "🇯🇵", message: "おはようございます！", button: "続ける" },
  { code: "ko", label: "한국어", flag: "🇰🇷", message: "안녕하세요!", button: "계속하다" },
  { code: "ar", label: "العربية", flag: "🇸🇦", message: "صباح الخير!", button: "استمر" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳", message: "नमस्कार!", button: "जारी रखें" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱", message: "Goedendag!", button: "Doorgaan" },
  { code: "sv", label: "Svenska", flag: "🇸🇪", message: "God dag!", button: "Fortsätt" },
  { code: "pl", label: "Polski", flag: "🇵🇱", message: "Dzień dobry!", button: "Kontynuuj" },
];

export default function LanguageSelector() {
  const [inputValue, setInputValue] = useState("English");
  const [selectedLang, setSelectedLang] = useState({
    code: "en",
    label: "English",
    flag: "🇬🇧",
    message: "Hello There!",
    button: "Continue",
  });
  const [isOpen, setIsOpen] = useState(false);

  const filteredLanguages = useMemo(() =>
    languages.filter((lang) => lang.label.toLowerCase().includes(inputValue.toLowerCase())),
    [inputValue]
  );

  const sortedLanguages = useMemo(() => {
    const matched = filteredLanguages.filter(
      (lang) => lang.label.toLowerCase() === inputValue.toLowerCase()
    );
    const others = filteredLanguages.filter(
      (lang) => lang.label.toLowerCase() !== inputValue.toLowerCase()
    );
    return [...matched, ...others];
  }, [filteredLanguages, inputValue]);

  interface Language {
    code: string;
    label: string;
    flag: string;
    message: string;
  button: string;
  }

  const handleLanguageSelect = (lang: Language): void => {
    setSelectedLang(lang);
    setInputValue(lang.label);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6">
      <p className="text-4xl font-bold m-5">Select a Language</p>
      <div className="relative w-64 md:w-80">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-6 py-3 bg-white border border-gray-300 rounded-xl shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-500"
            placeholder="Select a language"
          />
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="absolute right-3 top-3 w-6 h-7 focus:outline-none"
          >
            <ChevronDown
              className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"} duration-300`}
            />
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg overflow-y-auto max-h-60 duration-300 scrollbar-hide"
            >
              {sortedLanguages.map((lang) => (
                <motion.li
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang)}
                  className="flex items-center gap-4 px-6 py-3 cursor-pointer hover:bg-purple-100 transition-all duration-200"
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={`/flags/${lang.code}.png`}
                    alt={lang.label}
                    width={20}
                    height={20}
                  />
                  <span className="text-base text-gray-800">{lang.label}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {selectedLang && (
        <div className="mt-8 text-center">
          <p className="text-3xl font-semibold">{selectedLang.message} 👋</p>
        </div>
      )}

      <div className="mt-8">
        <button className="px-4 py-2 font-bold bg-black border-4 border-black text-white rounded-lg shadow-lg hover:text-black hover:bg-transparent transition-all duration-500">
          {selectedLang.button || "Continue"}
        </button>
      </div>
    </div>
  );
}
