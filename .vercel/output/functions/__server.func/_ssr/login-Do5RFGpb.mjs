import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Logo } from "./Logo-Cxxeu0YG.mjs";
import { D as ShieldCheck, Q as LoaderCircle, _t as EyeOff, ft as Globe, g as Store, gt as Eye, y as Sparkles } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as t, o as useLocale } from "./locale-DkGpSZl2.mjs";
import { t as Route } from "./login-BsNCNRWX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Do5RFGpb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const navigate = useNavigate();
	const searchParams = Route.useSearch();
	const { language } = useLocale();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)("");
	const [redirectUrl, setRedirectUrl] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setRedirectUrl(`${window.location.origin}/auth/callback`);
		if (searchParams.error) setErrorMsg("Google sign-in failed. Please try again.");
	}, [searchParams.error]);
	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setErrorMsg("");
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) {
			setErrorMsg(error.message);
			toast.error(error.message);
			setLoading(false);
			return;
		}
		toast.success("Welcome back!");
		const { data: { user } } = await supabase.auth.getUser();
		if (user) {
			const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
			if ((roleData?.map((r) => r.role) || []).includes("seller")) navigate({ to: "/seller" });
			else navigate({ to: "/" });
		} else navigate({ to: "/" });
		setLoading(false);
	};
	const loginWithGoogle = async () => {
		if (!redirectUrl) return;
		setLoading(true);
		setErrorMsg("");
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: redirectUrl }
		});
		if (error) {
			setErrorMsg(error.message);
			toast.error(error.message);
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[calc(100vh-65px)] w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-[#E11D48] to-[#9F1239] p-12 text-white relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative z-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "inline-flex items-center gap-2 text-2xl font-bold tracking-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-white text-[#E11D48] px-2 py-0.5 rounded-md",
							children: "S"
						}), "Saloree"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-auto space-y-12 relative z-10 max-w-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-4xl font-extrabold tracking-tight leading-tight",
						children: "Start selling globally with Saloree"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-rose-100 text-lg",
						children: "Empower your e-commerce journey with a modern multi-vendor marketplace platform. Built for growth."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-3 bg-white/10 rounded-lg backdrop-blur-sm mt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-6 text-rose-200" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-lg",
									children: "Sell Globally"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-rose-100 text-sm",
									children: "Reach customers worldwide with localized storefronts and payment options."
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-3 bg-white/10 rounded-lg backdrop-blur-sm mt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-6 text-rose-200" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-lg",
									children: "Secure checkout"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-rose-100 text-sm",
									children: "Every transaction is protected by industry-standard encryption and security protocols."
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-3 bg-white/10 rounded-lg backdrop-blur-sm mt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-6 text-rose-200" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-lg",
									children: "Multi-vendor marketplace"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-rose-100 text-sm",
									children: "Manage products, orders, and clients through our advanced multi-tenant seller dashboards."
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-3 bg-white/10 rounded-lg backdrop-blur-sm mt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-6 text-rose-200" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-lg",
									children: "Build your store without coding"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-rose-100 text-sm",
									children: "Fully customize store themes, pages, and menus in minutes with interactive builders."
								})] })]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative z-10 text-xs text-rose-200",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 Saloree Inc. All rights reserved." })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full lg:w-1/2 flex items-center justify-center p-6 bg-slate-50/50 sm:p-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-[440px] space-y-8 bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-6 flex justify-center lg:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { imgClassName: "h-10 w-auto object-contain" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl",
								children: t("auth_login_title", language) || "Welcome back"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-slate-500",
								children: t("sign_in_account", language) || "Sign in to manage your account and store"
							})
						]
					}),
					errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg bg-rose-50 border border-rose-100 p-4 text-sm text-rose-600",
						children: errorMsg
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "email",
									className: "block text-sm font-medium text-slate-700",
									children: t("email_label", language) || "Email address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "email",
									type: "email",
									required: true,
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "you@example.com",
									className: "w-full h-11 px-3.5 rounded-lg border border-slate-200 bg-white text-sm outline-none transition-all focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/10"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "password",
										className: "block text-sm font-medium text-slate-700",
										children: t("password_label", language) || "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/",
										onClick: (e) => {
											e.preventDefault();
											toast.info("Password reset instructions will be sent if this email is registered.");
										},
										className: "text-xs font-semibold text-[#E11D48] hover:underline",
										children: "Forgot password?"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "password",
										type: showPassword ? "text" : "password",
										required: true,
										value: password,
										onChange: (e) => setPassword(e.target.value),
										placeholder: "••••••••",
										className: "w-full h-11 pl-3.5 pr-11 rounded-lg border border-slate-200 bg-white text-sm outline-none transition-all focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/10"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowPassword(!showPassword),
										className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none",
										children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: loading,
								className: "w-full h-11 bg-[#E11D48] text-white font-medium hover:bg-[#BE123C] active:scale-[0.98] transition-transform duration-100 rounded-lg shadow-sm",
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Logging in..." })]
								}) : t("login", language) || "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative my-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full border-t border-slate-100" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative flex justify-center text-xs text-slate-400 uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-white px-3",
								children: "Or continue with"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: loginWithGoogle,
						disabled: loading,
						className: "w-full h-11 flex items-center justify-center gap-3 px-4 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-transform duration-100 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							className: "size-5 shrink-0",
							viewBox: "0 0 24 24",
							fill: "none",
							xmlns: "http://www.w3.org/2000/svg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
									fill: "#4285F4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
									fill: "#34A853"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.22-.66-.35-1.36-.35-2.09z",
									fill: "#FBBC05"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z",
									fill: "#EA4335"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Continue with Google" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-sm text-slate-500",
						children: [
							t("no_account", language) || "Don't have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/register",
								className: "font-semibold text-[#E11D48] hover:underline",
								children: "Create an account"
							})
						]
					})
				]
			})
		})]
	});
}
//#endregion
export { Login as component };
