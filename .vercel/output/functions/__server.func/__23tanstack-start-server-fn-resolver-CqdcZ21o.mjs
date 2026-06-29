//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CqdcZ21o.js
var manifest = {
	"8af5cc17fae8dddbba97ed82cee2a80a4bf96d233f75dbed5f28554f6c6acf95": {
		functionName: "capturePayPalOrderFn_createServerFn_handler",
		importer: () => import("./_ssr/paypal-CrNhMwQ0.mjs")
	},
	"93d93bcddfba7ded05067975e56629954d67d0beb27d6ad4b47c602672161122": {
		functionName: "createPayPalOrderFn_createServerFn_handler",
		importer: () => import("./_ssr/paypal-CrNhMwQ0.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
