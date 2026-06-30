import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketplace-CD6-JTj6.js
var $$splitComponentImporter = () => import("./marketplace-irVXzQnL.mjs");
var searchSchema = objectType({
	q: stringType().optional(),
	cat: stringType().optional()
});
var Route = createFileRoute("/marketplace")({
	validateSearch: (s) => searchSchema.parse(s),
	head: () => ({ meta: [{ title: "Marketplace — Saloree" }, {
		name: "description",
		content: "Browse thousands of products from sellers across the Saloree marketplace."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
