import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-RCPXrsbb.js
var $$splitComponentImporter = () => import("./register-rdCF7lgN.mjs");
var registerSearchSchema = objectType({ error: stringType().optional() });
var Route = createFileRoute("/register")({
	validateSearch: (search) => registerSearchSchema.parse(search),
	head: () => ({ meta: [{ title: "Register — Saloree" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
