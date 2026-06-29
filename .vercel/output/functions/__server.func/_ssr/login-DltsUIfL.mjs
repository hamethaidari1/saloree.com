import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DltsUIfL.js
var $$splitComponentImporter = () => import("./login-BMoJQ9js.mjs");
var loginSearchSchema = objectType({ error: stringType().optional() }).passthrough();
var Route = createFileRoute("/login")({
	validateSearch: (search) => loginSearchSchema.parse(search),
	head: () => ({ meta: [{ title: "Login — Saloree" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
