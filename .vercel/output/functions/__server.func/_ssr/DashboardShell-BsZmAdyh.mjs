import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { f as Outlet, g as Link, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Logo } from "./Logo-Cxxeu0YG.mjs";
import { It as ChevronDown, Pt as ChevronRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DashboardShell-BsZmAdyh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CollapsibleSection({ label, items, pathname, defaultOpen }) {
	const [isOpen, setIsOpen] = (0, import_react.useState)(defaultOpen || pathname.includes("/seller/themes") || pathname.includes("/seller/pages") || pathname.includes("/seller/navigation") || pathname.includes("/seller/preferences"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setIsOpen(!isOpen),
			className: "rounded-md px-3 py-2 hover:bg-accent flex items-center justify-between text-left text-foreground font-medium cursor-pointer",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })]
		}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pl-4 pr-1 py-1 flex flex-col gap-1 border-l ml-3 border-border",
			children: items.map((item) => {
				const active = pathname === item.to || pathname.startsWith(item.to);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					className: `rounded-md px-3 py-1.5 hover:bg-accent text-xs ${active ? "bg-primary-soft font-semibold text-primary" : "text-muted-foreground hover:text-foreground"}`,
					children: item.label
				}, item.to);
			})
		})]
	});
}
function DashboardShell({ title, nav, children }) {
	const { pathname } = useLocation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-4 text-2xl font-bold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[220px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "rounded-lg border bg-card p-3 lg:sticky lg:top-24 lg:self-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 flex items-center justify-center border-b pb-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { imgClassName: "h-[60px] w-auto object-contain" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "grid gap-1 text-sm",
					children: nav.map((n) => {
						if (n.items) {
							const hasActiveChild = n.items.some((item) => pathname.startsWith(item.to));
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleSection, {
								label: n.label,
								items: n.items,
								pathname,
								defaultOpen: hasActiveChild
							}, n.label);
						}
						const active = pathname === n.to || n.to !== nav[0].to && n.to && pathname.startsWith(n.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: n.to || "",
							className: `rounded-md px-3 py-2 hover:bg-accent flex items-center justify-between text-foreground ${active ? "bg-primary-soft font-semibold text-primary" : ""}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.label })
						}, n.to);
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "min-w-0",
				children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
//#endregion
export { DashboardShell as t };
