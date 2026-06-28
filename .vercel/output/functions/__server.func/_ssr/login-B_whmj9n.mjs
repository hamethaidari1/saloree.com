import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-B_whmj9n.js
var $$splitComponentImporter = () => import("./login-ClCoux1a.mjs");
var loginSearchSchema = objectType({ error: stringType().optional() });
var Route = createFileRoute("/login")({
	validateSearch: (search) => loginSearchSchema.parse(search),
	head: () => ({ meta: [{ title: "Login — Saloree" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
