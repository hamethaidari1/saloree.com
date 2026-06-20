import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CountryModal({ open, onClose }: Props) {
  const { language, currency, country, setLocale } = useLocale();

  const [draft, setDraft] = useState({ language, currency, country });

  // Sync draft when modal re-opens
  const handleOpenChange = (o: boolean) => {
    if (o) setDraft({ language, currency, country });
    else onClose();
  };

  const handleSave = () => {
    setLocale(draft);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full max-w-sm rounded-2xl p-0 overflow-hidden">
        {/* Gradient header */}
        <div className="bg-gradient-to-br from-primary to-primary/80 px-6 py-5 text-primary-foreground">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-primary-foreground">
              {t("change_country", language)}
            </DialogTitle>
          </DialogHeader>
          <p className="mt-1 text-xs text-primary-foreground/80">{t("shopping_on", language)}</p>
        </div>

        {/* Form body */}
        <div className="space-y-4 px-6 py-5">
          {/* Country */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("country_region", language)}
            </label>
            <select
              value={draft.country}
              onChange={(e) => setDraft((d) => ({ ...d, country: e.target.value as CountryCode }))}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {(
                Object.entries(COUNTRY_META) as [CountryCode, (typeof COUNTRY_META)[CountryCode]][]
              ).map(([code, meta]) => (
                <option key={code} value={code}>
                  {meta.flag} {meta.label}
                </option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("language", language)}
            </label>
            <select
              value={draft.language}
              onChange={(e) => setDraft((d) => ({ ...d, language: e.target.value as LangCode }))}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {(
                Object.entries(LANGUAGE_META) as [LangCode, (typeof LANGUAGE_META)[LangCode]][]
              ).map(([code, meta]) => (
                <option key={code} value={code}>
                  {meta.flag} {meta.label} ({meta.code})
                </option>
              ))}
            </select>
          </div>

          {/* Currency */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("currency", language)}
            </label>
            <select
              value={draft.currency}
              onChange={(e) =>
                setDraft((d) => ({ ...d, currency: e.target.value as CurrencyCode }))
              }
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {(
                Object.entries(CURRENCY_META) as [
                  CurrencyCode,
                  (typeof CURRENCY_META)[CurrencyCode],
                ][]
              ).map(([code, meta]) => (
                <option key={code} value={code}>
                  {meta.symbol} {code} – {meta.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <DialogFooter className="flex gap-2 px-6 pb-5 pt-0">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            {t("close", language)}
          </Button>
          <Button className="flex-1" onClick={handleSave}>
            {t("save", language)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
