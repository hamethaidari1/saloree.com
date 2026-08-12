import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Logo } from "./Logo-Cxxeu0YG.mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.login-F2IZ0AVm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLogin() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		setLoading(false);
		if (error) {
			console.error("[AdminLogin] Supabase sign-in error:", error);
			return toast.error(error.message);
		}
		toast.success("Welcome to Saloree Control Panel!");
		navigate({ to: "/saloree-control/content" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-md px-4 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border bg-card p-8 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { imgClassName: "h-14 w-auto object-contain" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold",
						children: "Control Panel Login"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-sm text-muted-foreground",
						children: "Sign in to manage Saloree website content."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "email",
								className: "font-semibold text-muted-foreground",
								children: "Email Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "email",
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "h-10 rounded-md border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring",
								placeholder: "admin@saloree.com"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "pass",
								className: "font-semibold text-muted-foreground",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "pass",
								type: "password",
								required: true,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "h-10 rounded-md border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring",
								placeholder: "••••••••"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "mt-2 w-full",
							disabled: loading,
							children: loading ? "Signing in…" : "Sign In"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { AdminLogin as component };
