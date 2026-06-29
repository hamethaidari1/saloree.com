import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seller.theme-customizer-B5ADyolk.js
var $$splitComponentImporter = () => import("./seller.theme-customizer-Xa-difO9.mjs");
var Route = createFileRoute("/seller/theme-customizer")({
	validateSearch: (search) => {
		return { id: search.id };
	},
	head: () => ({ meta: [{ title: "Theme Customizer — Saloree Seller" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
