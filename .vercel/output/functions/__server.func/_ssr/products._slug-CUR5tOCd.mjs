import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._slug-CUR5tOCd.js
var $$splitComponentImporter = () => import("./products._slug-BSPNGMeQ.mjs");
var Route = createFileRoute("/products/$slug")({
	head: ({ params }) => ({ meta: [{ title: `Product — Saloree` }, {
		name: "description",
		content: `Buy ${params.slug} on Saloree.`
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
