import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories._slug-Y_0wSGoi.js
var $$splitComponentImporter = () => import("./categories._slug-U5hX3UP4.mjs");
var Route = createFileRoute("/categories/$slug")({
	head: ({ params }) => ({ meta: [{ title: `${params.slug} — Saloree` }, {
		name: "description",
		content: `Shop ${params.slug} on Saloree.`
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
