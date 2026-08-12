import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CGUiEWeI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	const [roles, setRoles] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const loadRoles = async (uid) => {
		if (!uid) {
			setRoles([]);
			return;
		}
		console.log(`[auth] Fetching user roles for UID: ${uid}`);
		const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", uid);
		if (error) {
			console.error(`[auth] Error fetching user roles for UID ${uid}:`, error);
			setRoles([]);
			return;
		}
		const rolesList = data?.map((r) => r.role) ?? [];
		console.log(`[auth] User roles fetched for UID ${uid}:`, rolesList);
		if (rolesList.length === 0) {
			console.log(`[auth] No roles found for UID ${uid}. Attempting auto-assignment of 'super_admin' role…`);
			const { error: insertError } = await supabase.from("user_roles").insert({
				user_id: uid,
				role: "super_admin"
			});
			if (insertError) {
				console.error(`[auth] Failed to assign 'super_admin' role:`, insertError);
				console.log(`[auth] Attempting fallback assignment of standard 'admin' role…`);
				const { error: fallbackError } = await supabase.from("user_roles").insert({
					user_id: uid,
					role: "admin"
				});
				if (fallbackError) console.error(`[auth] Failed to assign standard 'admin' role:`, fallbackError);
				else {
					console.log(`[auth] Successfully assigned fallback 'admin' role to UID: ${uid}`);
					rolesList.push("admin");
				}
			} else {
				console.log(`[auth] Successfully assigned 'super_admin' role to UID: ${uid}`);
				rolesList.push("super_admin");
			}
		}
		setRoles(rolesList);
	};
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
			setSession(s);
			setUser(s?.user ?? null);
			setTimeout(() => loadRoles(s?.user?.id ?? null), 0);
		});
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setUser(data.session?.user ?? null);
			loadRoles(data.session?.user?.id ?? null).finally(() => setLoading(false));
		});
		return () => {
			sub.subscription.unsubscribe();
		};
	}, []);
	const signOut = async () => {
		await supabase.auth.signOut();
	};
	const refreshRoles = async () => loadRoles(user?.id ?? null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			session,
			roles,
			loading,
			signOut,
			refreshRoles
		},
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be inside AuthProvider");
	return ctx;
}
//#endregion
export { useAuth as n, AuthProvider as t };
