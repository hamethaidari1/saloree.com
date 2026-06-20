import { useState, useRef, useEffect } from "react";
import { Globe, ChevronRight, X } from "lucide-react";
import {
  useLocale,
  LANGUAGE_META,
  CURRENCY_META,
  COUNTRY_META,
  type CurrencyCode,
  type CountryCode,
} from "@/lib/locale";
import type { LangCode } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { CountryModal } from "./CountryModal";

// ─── Small helpers ────────────────────────────────────────────────────────────

function RadioRow({
  checked,
  onClick,
  children,
}: {
  checked: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-primary/5 ${
        checked ? "font-semibold text-primary" : "text-foreground"
      }`}
    >
      {/* Custom radio */}
      <span
        className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 transition-colors ${
          checked ? "border-primary" : "border-muted-foreground/40"
        }`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-primary" />}
      </span>
      {children}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function LocaleSelector({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const { language, currency, country, setLanguage, setCurrency } = useLocale();

  const [open, setOpen] = useState(false);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const langMeta = LANGUAGE_META[language];
  const curMeta = CURRENCY_META[currency];

  // ── Trigger button ──────────────────────────────────────────────────────────
  const trigger = (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-label="Language & Currency"
      className={`flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
        open ? "bg-accent text-accent-foreground" : ""
      } ${variant === "mobile" ? "w-full justify-between" : ""}`}
    >
      <span className="flex items-center gap-1.5">
        <span className="text-base leading-none">{langMeta.flag}</span>
        <span className="font-bold">{langMeta.code}</span>
        <span className="text-muted-foreground">·</span>
        <span className="font-bold">
          {curMeta.symbol} {currency}
        </span>
      </span>
      {variant === "mobile" && <Globe className="size-4 text-muted-foreground" />}
    </button>
  );

  // ── Dropdown panel ──────────────────────────────────────────────────────────
  const panel = (
    <div
      className={`
        bg-background text-foreground rounded-xl shadow-2xl border border-border w-72 z-[200]
        ${
          variant === "desktop"
            ? "absolute top-full mt-2 left-0"
            : "fixed inset-x-0 bottom-0 rounded-t-2xl rounded-b-none w-full max-w-none z-[300] shadow-2xl"
        }
      `}
    >
      {/* Panel header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-sm font-bold">
          {langMeta.flag} {langMeta.label} · {curMeta.symbol} {currency} ·{" "}
          {COUNTRY_META[country].flag}
        </span>
        <button
          onClick={() => setOpen(false)}
          className="rounded-md p-1 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="max-h-[65vh] overflow-y-auto">
        {/* ── Section 1: Language ───────────────────────────────────── */}
        <div className="px-4 pt-4 pb-2">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t("change_language", language)}
          </p>
          <div className="space-y-0.5">
            {(Object.entries(LANGUAGE_META) as [LangCode, (typeof LANGUAGE_META)[LangCode]][]).map(
              ([code, meta]) => (
                <RadioRow
                  key={code}
                  checked={language === code}
                  onClick={() => {
                    setLanguage(code);
                    if (variant === "mobile") setOpen(false);
                  }}
                >
                  <span className="text-base leading-none">{meta.flag}</span>
                  <span className="flex-1">
                    {meta.label}
                    <span className="ml-1.5 text-xs text-muted-foreground">– {meta.code}</span>
                  </span>
                </RadioRow>
              ),
            )}
          </div>
        </div>

        <div className="mx-4 border-t" />

        {/* ── Section 2: Currency ───────────────────────────────────── */}
        <div className="px-4 pt-3 pb-2">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t("change_currency", language)}
          </p>
          <div className="space-y-0.5">
            {(
              Object.entries(CURRENCY_META) as [
                CurrencyCode,
                (typeof CURRENCY_META)[CurrencyCode],
              ][]
            ).map(([code, meta]) => (
              <RadioRow
                key={code}
                checked={currency === code}
                onClick={() => {
                  setCurrency(code);
                  if (variant === "mobile") setOpen(false);
                }}
              >
                <span className="min-w-[20px] text-center font-bold text-primary">
                  {meta.symbol}
                </span>
                <span className="flex-1">
                  {code}
                  <span className="ml-1.5 text-xs text-muted-foreground">– {meta.name}</span>
                </span>
              </RadioRow>
            ))}
          </div>
        </div>

        <div className="mx-4 border-t" />

        {/* ── Section 3: Region ─────────────────────────────────────── */}
        <div className="px-4 pt-3 pb-4">
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t("country_region", language)}
          </p>
          <p className="mb-2 text-xs text-muted-foreground">{t("shopping_on", language)}</p>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setCountryModalOpen(true);
            }}
            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="text-base">{COUNTRY_META[country].flag}</span>
              {COUNTRY_META[country].label}
            </span>
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div ref={ref} className={`relative ${variant === "mobile" ? "w-full" : ""}`}>
        {trigger}
        {open && (
          <>
            {/* Mobile overlay behind bottom sheet */}
            {variant === "mobile" && (
              <div className="fixed inset-0 z-[200] bg-black/50" onClick={() => setOpen(false)} />
            )}
            {panel}
          </>
        )}
      </div>

      <CountryModal open={countryModalOpen} onClose={() => setCountryModalOpen(false)} />
    </>
  );
}
