import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { t } from "./i18n";
import type { LangCode, TranslationKey } from "./i18n";

export type CurrencyCode = "USD" | "TRY" | "AFN" | "EUR";
export type CountryCode = "US" | "TR" | "AF" | "DE" | "FR" | "IR" | "PK" | "IN" | "AE";

export interface LocaleState {
  language: LangCode;
  currency: CurrencyCode;
  country: CountryCode;
}

interface LocaleContextValue extends LocaleState {
  setLanguage: (lang: LangCode) => void;
  setCurrency: (cur: CurrencyCode) => void;
  setCountry: (country: CountryCode) => void;
  setLocale: (locale: Partial<LocaleState>) => void;
  isRTL: boolean;
  formatPrice: (priceUSD: number) => string;
  translateCategory: (nameOrSlug: string) => string;
}

export const LANGUAGE_META: Record<
  LangCode,
  { label: string; nativeLabel: string; flag: string; code: string }
> = {
  en: { label: "English", nativeLabel: "English", flag: "🇺🇸", code: "EN" },
  tr: { label: "Turkish", nativeLabel: "Türkçe", flag: "🇹🇷", code: "TR" },
  da: { label: "Dari", nativeLabel: "دری", flag: "🇦🇫", code: "DA" },
  fa: { label: "Persian", nativeLabel: "فارسی", flag: "🇮🇷", code: "FA" },
  ar: { label: "Arabic", nativeLabel: "العربية", flag: "🇸🇦", code: "AR" },
  de: { label: "German", nativeLabel: "Deutsch", flag: "🇩🇪", code: "DE" },
  fr: { label: "French", nativeLabel: "Français", flag: "🇫🇷", code: "FR" },
  ur: { label: "Urdu", nativeLabel: "اردو", flag: "🇵🇰", code: "UR" },
};

export const CURRENCY_META: Record<CurrencyCode, { symbol: string; name: string }> = {
  USD: { symbol: "$", name: "US Dollar" },
  TRY: { symbol: "₺", name: "Turkish Lira" },
  AFN: { symbol: "؋", name: "Afghan Afghani" },
  EUR: { symbol: "€", name: "Euro" },
};

export const COUNTRY_META: Record<CountryCode, { label: string; flag: string }> = {
  US: { label: "United States", flag: "🇺🇸" },
  TR: { label: "Turkey", flag: "🇹🇷" },
  AF: { label: "Afghanistan", flag: "🇦🇫" },
  DE: { label: "Germany", flag: "🇩🇪" },
  FR: { label: "France", flag: "🇫🇷" },
  IR: { label: "Iran", flag: "🇮🇷" },
  PK: { label: "Pakistan", flag: "🇵🇰" },
  IN: { label: "India", flag: "🇮🇳" },
  AE: { label: "UAE", flag: "🇦🇪" },
};

const RTL_LANGS: LangCode[] = ["ar", "fa", "da", "ur"];

export const CURRENCY_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  TRY: 32,
  AFN: 70,
  EUR: 0.92,
};

const KEY_LANG = "saloree_language";
const KEY_CURR = "saloree_currency";
const KEY_COUN = "saloree_country";

const DEFAULT_LOCALE: LocaleState = {
  language: "en",
  currency: "USD",
  country: "US",
};

export const COUNTRY_SUGGESTION: Record<
  CountryCode,
  { language: LangCode; currency: CurrencyCode }
> = {
  US: { language: "en", currency: "USD" },
  TR: { language: "tr", currency: "TRY" },
  AF: { language: "da", currency: "AFN" },
  DE: { language: "de", currency: "EUR" },
  FR: { language: "fr", currency: "EUR" },
  IR: { language: "fa", currency: "AFN" },
  PK: { language: "ur", currency: "USD" },
  IN: { language: "en", currency: "USD" },
  AE: { language: "ar", currency: "USD" },
};

function detectDefault(): LocaleState {
  if (typeof navigator === "undefined") {
    return DEFAULT_LOCALE;
  }

  const navLang = navigator.language?.split("-")[0]?.toLowerCase() ?? "en";

  const langMap: Record<string, LangCode> = {
    en: "en",
    tr: "tr",
    da: "da",
    fa: "fa",
    ar: "ar",
    de: "de",
    fr: "fr",
    ur: "ur",
  };

  const language = langMap[navLang] ?? "en";
  const countrySuggestion =
    Object.values(COUNTRY_SUGGESTION).find((item) => item.language === language) ??
    COUNTRY_SUGGESTION.US;

  const countryMap: Record<LangCode, CountryCode> = {
    en: "US",
    tr: "TR",
    da: "AF",
    fa: "IR",
    ar: "AE",
    de: "DE",
    fr: "FR",
    ur: "PK",
  };

  return {
    language,
    currency: countrySuggestion.currency,
    country: countryMap[language] ?? "US",
  };
}

function isValidLanguage(value: string | null): value is LangCode {
  return !!value && value in LANGUAGE_META;
}

function isValidCurrency(value: string | null): value is CurrencyCode {
  return !!value && value in CURRENCY_META;
}

function isValidCountry(value: string | null): value is CountryCode {
  return !!value && value in COUNTRY_META;
}

function loadFromStorage(): LocaleState {
  const defaults = detectDefault();

  if (typeof window === "undefined") {
    return defaults;
  }

  try {
    const storedLanguage = localStorage.getItem(KEY_LANG);
    const storedCurrency = localStorage.getItem(KEY_CURR);
    const storedCountry = localStorage.getItem(KEY_COUN);

    return {
      language: isValidLanguage(storedLanguage) ? storedLanguage : defaults.language,
      currency: isValidCurrency(storedCurrency) ? storedCurrency : defaults.currency,
      country: isValidCountry(storedCountry) ? storedCountry : defaults.country,
    };
  } catch {
    return defaults;
  }
}

function saveToStorage(locale: Partial<LocaleState>) {
  if (typeof window === "undefined") return;

  try {
    if (locale.language) localStorage.setItem(KEY_LANG, locale.language);
    if (locale.currency) localStorage.setItem(KEY_CURR, locale.currency);
    if (locale.country) localStorage.setItem(KEY_COUN, locale.country);
  } catch {
    // Ignore storage errors.
  }
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleState>(() => loadFromStorage());

  useEffect(() => {
    if (typeof document === "undefined") return;

    const isRTL = RTL_LANGS.includes(locale.language);
    document.documentElement.setAttribute("lang", locale.language);
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  }, [locale.language]);

  const setLanguage = useCallback((language: LangCode) => {
    saveToStorage({ language });
    setLocaleState((prev) => ({ ...prev, language }));
  }, []);

  const setCurrency = useCallback((currency: CurrencyCode) => {
    saveToStorage({ currency });
    setLocaleState((prev) => ({ ...prev, currency }));
  }, []);

  const setCountry = useCallback((country: CountryCode) => {
    const suggestion = COUNTRY_SUGGESTION[country];

    if (suggestion) {
      const next = {
        country,
        language: suggestion.language,
        currency: suggestion.currency,
      };

      saveToStorage(next);
      setLocaleState(next);
      return;
    }

    saveToStorage({ country });
    setLocaleState((prev) => ({ ...prev, country }));
  }, []);

  const setLocale = useCallback((patch: Partial<LocaleState>) => {
    setLocaleState((prev) => {
      const next: LocaleState = { ...prev, ...patch };

      if (patch.country) {
        const suggestion = COUNTRY_SUGGESTION[patch.country];
        if (suggestion) {
          next.language = suggestion.language;
          next.currency = suggestion.currency;
        }
      }

      saveToStorage(next);
      return next;
    });
  }, []);

  const formatPrice = useCallback(
    (priceUSD: number) => {
      const rate = CURRENCY_RATES[locale.currency] ?? 1;
      const converted = priceUSD * rate;
      const symbol = CURRENCY_META[locale.currency]?.symbol ?? "$";

      return `${symbol}${converted.toFixed(2)}`;
    },
    [locale.currency],
  );

  const translateCategory = useCallback(
    (nameOrSlug: string) => {
      const slug = nameOrSlug.toLowerCase().replace(/[^a-z0-9]/g, "");
      let key: TranslationKey | null = null;

      if (slug.includes("automotive")) key = "cat_automotive";
      else if (slug.includes("beauty") || slug.includes("health")) key = "cat_beauty";
      else if (slug.includes("book") || slug.includes("stationery")) key = "cat_books";
      else if (slug.includes("electronics")) key = "cat_electronics";
      else if (slug.includes("fashion") || slug.includes("clothing") || slug.includes("shirt")) {
        key = "cat_fashion";
      } else if (slug.includes("home") || slug.includes("kitchen") || slug.includes("sofa")) {
        key = "cat_home";
      } else if (slug.includes("sport") || slug.includes("outdoor") || slug.includes("dumbbell")) {
        key = "cat_sports";
      } else if (slug.includes("toy") || slug.includes("game") || slug.includes("gamepad")) {
        key = "cat_toys";
      }

      return key ? t(key, locale.language) : nameOrSlug;
    },
    [locale.language],
  );

  const isRTL = RTL_LANGS.includes(locale.language);

  return (
    <LocaleContext.Provider
      value={{
        ...locale,
        setLanguage,
        setCurrency,
        setCountry,
        setLocale,
        isRTL,
        formatPrice,
        translateCategory,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);

  if (!ctx) {
    throw new Error("useLocale must be used inside <LocaleProvider>");
  }

  return ctx;
}