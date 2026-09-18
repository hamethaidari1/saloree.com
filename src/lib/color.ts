/**
 * Small hex/HSL color math used to derive brand-color variants (hover state,
 * large muted surfaces) from a single admin-configured brand color, instead
 * of hardcoding extra hex values anywhere.
 */

export function isValidHexColor(value: string | null | undefined): value is string {
  if (!value) return false;
  return /^#[0-9a-fA-F]{6}$/.test(value.trim());
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const clean = hex.replace("#", "").trim();
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  return { h, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  const sN = s / 100;
  const lN = l / 100;
  const c = (1 - Math.abs(2 * lN - 1)) * sN;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lN - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Returns a variant of `hex` with lightness/saturation shifted by the given
 * percentage-point deltas (negative = darker/more muted), clamped to a valid
 * HSL range. Falls back to the original hex if it isn't a valid #rrggbb value.
 */
export function adjustColor(
  hex: string,
  { lightness = 0, saturation = 0 }: { lightness?: number; saturation?: number },
): string {
  if (!isValidHexColor(hex)) return hex;
  const hsl = hexToHsl(hex);
  const newL = Math.max(0, Math.min(100, hsl.l + lightness));
  const newS = Math.max(0, Math.min(100, hsl.s + saturation));
  return hslToHex(hsl.h, newS, newL);
}
