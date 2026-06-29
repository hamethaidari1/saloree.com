import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Q as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./auth.callback-g_-EIyxK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.callback-DDY3JLx4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthCallback() {
	const navigate = useNavigate();
	const searchParams = Route.useSearch();
	const [errorMsg, setErrorMsg] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let active = true;
		async function handleCallback() {
			if (typeof window === "undefined") return;
			try {
				console.log("[AuthCallback] URL:", window.location.href);
				const urlParams = new URLSearchParams(window.location.search);
				const hashParams = new URLSearchParams(window.location.hash.substring(1));
				const error = urlParams.get("error") || hashParams.get("error") || searchParams.error;
				const errorDescription = urlParams.get("error_description") || hashParams.get("error_description") || searchParams.error_description;
				if (error || errorDescription) {
					const fullMsg = errorDescription || error || "Google authentication failed";
					console.error("Supabase OAuth callback redirect error details:", fullMsg);
					throw new Error(fullMsg);
				}
				if (urlParams.get("code") || hashParams.get("code") || searchParams.code) {
					console.log("[AuthCallback] Code found in URL, exchanging for session...");
					const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(window.location.href);
					if (exchangeError) {
						console.error("Supabase OAuth code exchange error:", exchangeError);
						throw exchangeError;
					}
				}
				const { data: { session }, error: sessionError } = await supabase.auth.getSession();
				if (sessionError) throw sessionError;
				if (session?.user) {
					if (!active) return;
					console.log("[AuthCallback] Session established for user ID:", session.user.id);
					const { data: roleData, error: roleError } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id);
					if (roleError) console.error("Error fetching roles during callback:", roleError);
					if ((roleData?.map((r) => r.role) || []).includes("seller")) {
						toast.success("Successfully logged in as Seller!");
						navigate({ to: "/seller" });
					} else {
						toast.success("Welcome back!");
						navigate({ to: "/" });
					}
				} else {
					console.warn("[AuthCallback] No active session or code found in URL.");
					navigate({ to: "/" });
				}
			} catch (err) {
				console.error("OAuth callback full error message:", err?.message || err);
				if (active) {
					setErrorMsg("Google sign-in failed. Please try again.");
					toast.error("Google sign-in failed. Please try again.");
					navigate({
						to: "/login",
						search: { error: "Google sign-in failed. Please try again." }
					});
				}
			}
		}
		handleCallback();
		return () => {
			active = false;
		};
	}, [navigate, searchParams]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[60vh] flex-col items-center justify-center p-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto size-10 animate-spin text-[#E11D48]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold text-slate-800",
					children: "Completing sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-500",
					children: errorMsg || "Please wait while we finalize your secure session..."
				})
			]
		})
	});
}
//#endregion
export { AuthCallback as component };
