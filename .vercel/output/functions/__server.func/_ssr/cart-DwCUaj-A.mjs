import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-DwCUaj-A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CartContext = (0, import_react.createContext)(null);
var KEY = "saloree.cart.v1";
function normalizeCartItem(item) {
	const product_id = "product_id" in item ? item.product_id : item.productId;
	const store_id = "store_id" in item ? item.store_id : item.storeId;
	if (!product_id || !store_id || !item.title) return null;
	return {
		product_id,
		slug: "slug" in item && item.slug ? item.slug : product_id,
		store_id,
		store_name: "store_name" in item && item.store_name ? item.store_name : "Unknown store",
		title: item.title,
		price: Number(item.price ?? 0),
		featured_image: "featured_image" in item ? item.featured_image ?? null : item.image ?? null,
		quantity: Math.max(1, Number(item.quantity ?? 1))
	};
}
function CartProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") {
			setReady(true);
			return;
		}
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) setItems(JSON.parse(raw).map(normalizeCartItem).filter((item) => item !== null));
		} catch {}
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (ready) localStorage.setItem(KEY, JSON.stringify(items));
	}, [items, ready]);
	const add = (item, qty = 1) => {
		setItems((prev) => {
			if (prev.find((p) => p.product_id === item.product_id)) return prev.map((p) => p.product_id === item.product_id ? {
				...p,
				quantity: p.quantity + Math.max(1, qty)
			} : p);
			return [...prev, {
				...item,
				quantity: qty
			}];
		});
	};
	const remove = (productId) => setItems((prev) => prev.filter((p) => p.product_id !== productId));
	const setQty = (productId, qty) => setItems((prev) => prev.map((p) => p.product_id === productId ? {
		...p,
		quantity: Math.max(1, qty)
	} : p));
	const clear = () => setItems([]);
	const count = items.reduce((s, i) => s + i.quantity, 0);
	const total = items.reduce((s, i) => s + i.quantity * i.price, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value: {
			items,
			add,
			remove,
			setQty,
			clear,
			count,
			total
		},
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be inside CartProvider");
	return ctx;
}
//#endregion
export { useCart as n, CartProvider as t };
