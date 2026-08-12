import { t as supabase } from "./client-DfK1yIpk.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./esm-B50dUWcE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/paypal-CrNhMwQ0.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function getPayPalConfig() {
	const env = (process.env.PAYPAL_ENV || "sandbox").trim();
	const baseUrl = env.toLowerCase() === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
	const rawClientId = process.env.PAYPAL_CLIENT_ID;
	const rawClientSecret = process.env.PAYPAL_CLIENT_SECRET;
	const clientId = rawClientId ? rawClientId.trim() : "";
	const clientSecret = rawClientSecret ? rawClientSecret.trim() : "";
	const loggedClientId = clientId ? clientId.substring(0, 8) : "none";
	console.log(`[PayPal Config] Env: ${env}, Base URL: ${baseUrl}, Client ID (first 8): ${loggedClientId}, Secret exists: ${!!clientSecret}`);
	return {
		env,
		baseUrl,
		clientId,
		clientSecret
	};
}
async function getPayPalAccessToken() {
	const { baseUrl, clientId, clientSecret } = getPayPalConfig();
	if (!clientId || !clientSecret) throw new Error("PayPal credentials are invalid or Live/Sandbox environment is mismatched.");
	const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
	const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
		method: "POST",
		headers: {
			Authorization: `Basic ${auth}`,
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: "grant_type=client_credentials"
	});
	if (!response.ok) {
		const errorText = await response.text();
		console.error("PayPal token error:", errorText);
		throw new Error("PayPal credentials are invalid or Live/Sandbox environment is mismatched.");
	}
	return (await response.json()).access_token;
}
var createPayPalOrderFn_createServerFn_handler = createServerRpc({
	id: "93d93bcddfba7ded05067975e56629954d67d0beb27d6ad4b47c602672161122",
	name: "createPayPalOrderFn",
	filename: "src/lib/paypal.ts"
}, (opts) => createPayPalOrderFn.__executeServer(opts));
var createPayPalOrderFn = createServerFn({ method: "POST" }).validator((items) => items).handler(createPayPalOrderFn_createServerFn_handler, async ({ data: items }) => {
	let serverTotal = 0;
	for (const item of items) {
		const { data: product, error } = await supabase.from("products").select("price").eq("id", item.productId).single();
		if (error || !product) throw new Error(`Product not found: ${item.productId}`);
		serverTotal += Number(product.price) * item.quantity;
	}
	if (serverTotal <= 0) throw new Error("Invalid total amount");
	const { baseUrl } = getPayPalConfig();
	const accessToken = await getPayPalAccessToken();
	const response = await fetch(`${baseUrl}/v2/checkout/orders`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			intent: "CAPTURE",
			purchase_units: [{ amount: {
				currency_code: "USD",
				value: serverTotal.toFixed(2)
			} }]
		})
	});
	if (!response.ok) {
		const errorText = await response.text();
		console.error("PayPal create order error:", errorText);
		throw new Error("Failed to create PayPal order");
	}
	return {
		orderId: (await response.json()).id,
		verifiedTotal: serverTotal
	};
});
var capturePayPalOrderFn_createServerFn_handler = createServerRpc({
	id: "8af5cc17fae8dddbba97ed82cee2a80a4bf96d233f75dbed5f28554f6c6acf95",
	name: "capturePayPalOrderFn",
	filename: "src/lib/paypal.ts"
}, (opts) => capturePayPalOrderFn.__executeServer(opts));
var capturePayPalOrderFn = createServerFn({ method: "POST" }).validator((orderId) => orderId).handler(capturePayPalOrderFn_createServerFn_handler, async ({ data: orderId }) => {
	const { data: existingOrder } = await supabase.from("orders").select("id").eq("paypal_order_id", orderId).limit(1).single();
	if (existingOrder) throw new Error("Order already captured");
	const { baseUrl } = getPayPalConfig();
	const accessToken = await getPayPalAccessToken();
	const response = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}/capture`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json"
		}
	});
	if (!response.ok) {
		const errorText = await response.text();
		console.error("PayPal capture error:", errorText);
		throw new Error("Failed to capture PayPal order");
	}
	const captureData = await response.json();
	const captureId = captureData.purchase_units?.[0]?.payments?.captures?.[0]?.id;
	return {
		success: captureData.status === "COMPLETED",
		captureId,
		details: captureData
	};
});
//#endregion
export { capturePayPalOrderFn_createServerFn_handler, createPayPalOrderFn_createServerFn_handler };
