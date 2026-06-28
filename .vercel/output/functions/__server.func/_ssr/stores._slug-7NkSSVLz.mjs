import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stores._slug-7NkSSVLz.js
var $$splitComponentImporter = () => import("./stores._slug-DspXra6T.mjs");
var Route = createFileRoute("/stores/$slug")({
	validateSearch: (search) => ({ page: search.page }),
	head: ({ params }) => ({ meta: [{ title: `${params.slug} — Saloree Store` }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
