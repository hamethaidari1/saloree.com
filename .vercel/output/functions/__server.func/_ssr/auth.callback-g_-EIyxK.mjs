import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.callback-g_-EIyxK.js
var $$splitComponentImporter = () => import("./auth.callback-DDY3JLx4.mjs");
var callbackSearchSchema = objectType({
	code: stringType().optional(),
	error: stringType().optional(),
	error_code: stringType().optional(),
	error_description: stringType().optional()
}).passthrough();
var Route = createFileRoute("/auth/callback")({
	validateSearch: (search) => callbackSearchSchema.parse(search),
	head: () => ({ meta: [{ title: "Authenticating — Saloree" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
