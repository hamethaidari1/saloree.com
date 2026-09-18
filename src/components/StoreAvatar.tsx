import { useState, useEffect } from "react";

interface StoreAvatarProps {
  name: string;
  logoUrl?: string | null;
  className?: string;
  textClassName?: string;
}

/**
 * Renders a store's real uploaded logo, or a clean circular initials avatar
 * on an --ink background when no logo exists or the image fails to load.
 *
 * Deliberately avoids Radix Avatar's async loading-status detection (which can
 * leave an empty grey circle during SSR/hydration or on a broken URL) by using
 * a plain <img> with a synchronous onError fallback.
 */
export function StoreAvatar({
  name,
  logoUrl,
  className = "",
  textClassName = "",
}: StoreAvatarProps) {
  const [failed, setFailed] = useState(false);

  // Reset failure state if the URL changes (e.g. list re-fetches).
  useEffect(() => {
    setFailed(false);
  }, [logoUrl]);

  const initials =
    (name || "S")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("") || "S";

  const showImage = !!logoUrl && !failed;

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-brand-surface)] ${className}`}
    >
      {showImage ? (
        <img
          src={logoUrl as string}
          alt={`${name} logo`}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className={`font-heading font-bold text-white ${textClassName}`}>{initials}</span>
      )}
    </span>
  );
}
