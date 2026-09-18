import {
  Laptop,
  Shirt,
  Sofa,
  Sparkles,
  Dumbbell,
  BookOpen,
  Gamepad2,
  Car,
  Tag,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps a real category slug/name (from the `categories` table) to a
 * representative Lucide icon. Purely presentational — falls back to a
 * generic tag icon for any category we don't have a specific glyph for,
 * so new real categories never break the UI.
 */
export function getCategoryIcon(slugOrName: string | null | undefined): LucideIcon {
  const key = (slugOrName || "").toLowerCase();

  if (key.includes("electronic") || key.includes("tech")) return Laptop;
  if (key.includes("fashion") || key.includes("cloth") || key.includes("apparel")) return Shirt;
  if (key.includes("home") || key.includes("kitchen") || key.includes("living")) return Sofa;
  if (key.includes("beauty") || key.includes("health")) return Sparkles;
  if (key.includes("sport") || key.includes("outdoor") || key.includes("fitness")) return Dumbbell;
  if (key.includes("book") || key.includes("stationery")) return BookOpen;
  if (key.includes("toy") || key.includes("game")) return Gamepad2;
  if (key.includes("auto") || key.includes("car")) return Car;

  return Tag;
}
