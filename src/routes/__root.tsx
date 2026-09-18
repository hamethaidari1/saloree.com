import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AuthProvider } from "@/lib/auth";
import { AuthGuard } from "@/components/AuthGuard";
import { CartProvider } from "@/lib/cart";
import { LocaleProvider } from "@/lib/locale";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page doesn't exist or has moved.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Back to Saloree
        </Link>
        <p className="mt-6 text-xs text-muted-foreground">
          Need help?{" "}
          <a
            href="mailto:info@saloree.com"
            className="font-semibold underline hover:text-foreground"
          >
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Go home
          </a>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          If the problem persists, please contact our support team at{" "}
          <a
            href="mailto:info@saloree.com"
            className="font-semibold underline hover:text-foreground"
          >
            info@saloree.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Saloree — Build. Sell. Grow." },
      {
        name: "description",
        content:
          "Saloree is a modern multi-vendor marketplace where anyone can open a store and start selling online.",
      },
      { name: "author", content: "Saloree" },
      { property: "og:title", content: "Saloree — Build. Sell. Grow." },
      {
        property: "og:description",
        content: "Modern multi-vendor marketplace. Open your store in minutes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/src/assets/logo.png.png" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:image", content: "/src/assets/logo.png.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@600;700&display=swap",
      },
      // Favicon — browsers pick the most appropriate size automatically
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/src/assets/logo.png.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/src/assets/logo.png.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { useSiteSettings } from "@/hooks/useSiteSettings";
import { adjustColor, isValidHexColor } from "@/lib/color";

function SiteThemeIntegrator() {
  const { data: settings } = useSiteSettings();

  useEffect(() => {
    if (settings) {
      if (settings.primary_color) {
        document.documentElement.style.setProperty("--primary", settings.primary_color);
        document.documentElement.style.setProperty("--ring", settings.primary_color);
        const color = settings.primary_color.trim();
        if (color.startsWith("#") && color.length === 7) {
          document.documentElement.style.setProperty("--primary-soft", `${color}1a`);
        } else {
          document.documentElement.style.setProperty("--primary-soft", `${color}1a`);
        }
      } else {
        document.documentElement.style.removeProperty("--primary");
        document.documentElement.style.removeProperty("--ring");
        document.documentElement.style.removeProperty("--primary-soft");
      }

      if (settings.button_color) {
        document.documentElement.style.setProperty("--button", settings.button_color);
      } else {
        document.documentElement.style.removeProperty("--button");
      }

      // Drive every "brand red" surface in the marketplace UI (buttons,
      // header/hero/footer surfaces, badges) from this single stored color
      // instead of a hardcoded hex, per site_settings.primary_color /
      // button_color. Large surfaces get a darker, more muted derivative so
      // white text keeps strong contrast — never the bright color at that
      // scale.
      const brandSource = isValidHexColor(settings.primary_color)
        ? settings.primary_color
        : isValidHexColor(settings.button_color)
          ? settings.button_color
          : null;

      if (brandSource) {
        const root = document.documentElement.style;
        root.setProperty("--color-brand", brandSource);
        root.setProperty(
          "--color-brand-dark",
          adjustColor(brandSource, { lightness: -12, saturation: -8 }),
        );
        root.setProperty(
          "--color-brand-surface",
          adjustColor(brandSource, { lightness: -20, saturation: -25 }),
        );
        root.setProperty(
          "--color-brand-surface-2",
          adjustColor(brandSource, { lightness: -27, saturation: -30 }),
        );
      } else {
        const root = document.documentElement.style;
        root.removeProperty("--color-brand");
        root.removeProperty("--color-brand-dark");
        root.removeProperty("--color-brand-surface");
        root.removeProperty("--color-brand-surface-2");
      }
    }
  }, [settings]);

  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <AuthProvider>
          <AuthGuard>
            <CartProvider>
              <SiteThemeIntegrator />
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                  <Outlet />
                </main>
                <Footer />
              </div>
              <Toaster richColors position="top-right" />
            </CartProvider>
          </AuthGuard>
        </AuthProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
}
