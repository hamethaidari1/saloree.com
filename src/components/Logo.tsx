import { Link } from "@tanstack/react-router";
import logoSrc from "@/assets/logo.png.png";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface LogoProps {
  /**
   * Tailwind classes applied directly to the <img>.
   * Pass responsive height + w-auto + object-contain here.
   * Defaults to desktop-header size (h-12).
   */
  imgClassName?: string;
  /** Wrap in a <Link to="/"> (default: true) */
  linked?: boolean;
  /** Extra classes on the outer link/span wrapper */
  className?: string;
}

export function Logo({
  imgClassName = "h-12 w-auto object-contain",
  linked = true,
  className = "",
}: LogoProps) {
  const { data: settings } = useSiteSettings();
  const logo = settings?.logo_url || logoSrc;

  const img = (
    <img
      src={logo}
      alt="Saloree"
      className={imgClassName}
      /* Prevent layout shift: let the browser reserve space before decode */
      loading="eager"
      decoding="async"
      draggable={false}
    />
  );

  if (!linked) return <span className={className}>{img}</span>;

  return (
    <Link
      to="/"
      aria-label="Saloree — home"
      className={`shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm ${className}`}
    >
      {img}
    </Link>
  );
}
