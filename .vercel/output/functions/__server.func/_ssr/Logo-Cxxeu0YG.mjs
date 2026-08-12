import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { r as useSiteSettings } from "./useSiteSettings-9teR3ZGn.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Logo-Cxxeu0YG.js
var import_jsx_runtime = require_jsx_runtime();
function Logo({ imgClassName = "h-12 w-auto object-contain", linked = true, className = "" }) {
	const { data: settings } = useSiteSettings();
	const img = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: settings?.logo_url || "/assets/logo.png-Bio1P-ll.png",
		alt: "Saloree",
		className: imgClassName,
		loading: "eager",
		decoding: "async",
		draggable: false
	});
	if (!linked) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className,
		children: img
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		"aria-label": "Saloree — home",
		className: `shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm ${className}`,
		children: img
	});
}
//#endregion
export { Logo as t };
