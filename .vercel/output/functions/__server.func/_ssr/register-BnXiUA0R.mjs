import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-BnXiUA0R.js
var $$splitComponentImporter = () => import("./register-BWBu1kgY.mjs");
var registerSearchSchema = objectType({ error: stringType().optional() }).passthrough();
var Route = createFileRoute("/register")({
	validateSearch: (search) => registerSearchSchema.parse(search),
	head: () => ({ meta: [{ title: "Register — Saloree" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
