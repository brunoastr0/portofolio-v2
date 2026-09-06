import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Language = "en" | "pt";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguage] = useState<Language>(initialLanguage ?? "en");

  useEffect(() => {
    if (initialLanguage) {
      setLanguage(initialLanguage);
      return;
    }

    const savedLanguage = window.localStorage.getItem("portfolio-language");
    if (savedLanguage === "en" || savedLanguage === "pt") {
      setLanguage(savedLanguage);
    }
  }, [initialLanguage]);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-CV" : "en";
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
