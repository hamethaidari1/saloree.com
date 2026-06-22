import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as Save, E as Shield, ht as Code, rt as Globe } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-FnO9yJXZ.mjs";
import { t as Label } from "./label-CgGkF99L.mjs";
import { n as Textarea, t as Switch } from "./textarea-DEuTITL8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seller.preferences-8KKhDWkP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SellerPreferences() {
	const { user } = useAuth();
	useQueryClient();
	const [metaTitle, setMetaTitle] = (0, import_react.useState)("");
	const [metaDescription, setMetaDescription] = (0, import_react.useState)("");
	const [googleAnalyticsId, setGoogleAnalyticsId] = (0, import_react.useState)("");
	const [facebookPixelId, setFacebookPixelId] = (0, import_react.useState)("");
	const [passwordProtection, setPasswordProtection] = (0, import_react.useState)(false);
	const [storefrontPassword, setStorefrontPassword] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const { data: store } = useQuery({
		queryKey: ["my-store", user?.id],
		enabled: !!user,
		queryFn: async () => (await supabase.from("stores").select("*").eq("owner_id", user.id).maybeSingle()).data
	});
	(0, import_react.useEffect)(() => {
		if (store) {
			setMetaTitle(store.store_name || store.name || "");
			setMetaDescription(store.description || "");
		}
	}, [store]);
	const handleSave = async (e) => {
		e.preventDefault();
		setSaving(true);
		try {
			const { error } = await supabase.from("stores").update({
				description: metaDescription,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", store.id);
			if (error) throw error;
			toast.success("Preferences saved successfully! ⚙️");
		} catch (err) {
			toast.error("Failed to save preferences.");
		} finally {
			setSaving(false);
		}
	};
	if (!user || !store) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center py-20 text-muted-foreground",
		children: "Please sign in to manage preferences."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-4xl mx-auto pb-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-2xl font-bold tracking-tight",
			children: "Preferences"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground mt-1",
			children: "Configure search engine metadata, storefront tracking scripts, and password restriction."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSave,
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border rounded-xl p-6 shadow-sm space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 border-b pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-5 h-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-sm",
								children: "Search engine listing"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-normal",
							children: "Configure how your online storefront appears on search results (Google, Bing, Yahoo)."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "meta_title",
									children: "Homepage title"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "meta_title",
									value: metaTitle,
									onChange: (e) => setMetaTitle(e.target.value),
									placeholder: "e.g. My Premium Storefront"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "meta_desc",
									children: "Homepage meta description"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "meta_desc",
									value: metaDescription,
									onChange: (e) => setMetaDescription(e.target.value),
									placeholder: "Write a brief summary of what your store sells for search listings...",
									rows: 4
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border rounded-xl p-6 shadow-sm space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { className: "w-5 h-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Social & tracking scripts"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "ga_id",
								children: "Google Analytics Tracking ID"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "ga_id",
								value: googleAnalyticsId,
								onChange: (e) => setGoogleAnalyticsId(e.target.value),
								placeholder: "e.g. G-XXXXXXX"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "fb_id",
								children: "Facebook Pixel ID"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "fb_id",
								value: facebookPixelId,
								onChange: (e) => setFacebookPixelId(e.target.value),
								placeholder: "e.g. 1234567890"
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border rounded-xl p-6 shadow-sm space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 border-b pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-5 h-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-sm",
								children: "Storefront password protection"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-sm font-semibold",
								children: "Enable storefront password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: "Restrict storefront visitors with a passkey"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: passwordProtection,
								onCheckedChange: setPasswordProtection
							})]
						}),
						passwordProtection && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 pt-2 max-w-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "store_pass",
								children: "Visitor password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "store_pass",
								type: "password",
								value: storefrontPassword,
								onChange: (e) => setStorefrontPassword(e.target.value),
								placeholder: "e.g. secret123"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: saving,
						className: "h-9 gap-1.5 cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), saving ? "Saving…" : "Save preferences"]
					})
				})
			]
		})]
	});
}
//#endregion
export { SellerPreferences as component };
