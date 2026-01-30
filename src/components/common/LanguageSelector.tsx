import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

interface LanguageSelectorProps {
    align?: "left" | "right";
}

const LanguageSelector = ({ align = "right" }: LanguageSelectorProps) => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={toggleMenu}
                className="flex items-center gap-1 px-2 py-2 hover:text-primary transition-colors text-slate-600 dark:text-slate-400 dark:hover:text-primary group"
                aria-label="Change language"
                aria-expanded={isOpen}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-primary transition-colors">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <span className="text-sm font-medium uppercase">{language}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`opacity-50 group-hover:opacity-100 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            <div
                className={`absolute top-full mt-2 w-32 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-1 transition-all duration-200 z-50 transform ${
                    align === "right" ? "right-0 origin-top-right" : "left-0 origin-top-left"
                } ${
                    isOpen 
                        ? "opacity-100 visible translate-y-2" 
                        : "opacity-0 invisible translate-y-0"
                }`}
            >
                <button
                    onClick={() => { setLanguage("es"); setIsOpen(false); }}
                    className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                        ${language === "es" 
                            ? "bg-primary/10 text-primary" 
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}
                    `}
                >
                    <span className={`w-1.5 h-1.5 rounded-full bg-primary transition-opacity ${language === "es" ? "opacity-100" : "opacity-0"}`}></span>
                    Español
                </button>
                <button
                    onClick={() => { setLanguage("en"); setIsOpen(false); }}
                    className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                        ${language === "en" 
                            ? "bg-primary/10 text-primary" 
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}
                    `}
                >
                    <span className={`w-1.5 h-1.5 rounded-full bg-primary transition-opacity ${language === "en" ? "opacity-100" : "opacity-0"}`}></span>
                    English
                </button>
            </div>
        </div>
    );
};

export default LanguageSelector;
