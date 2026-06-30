import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { Jt as ArrowDown, L as Pen, N as Plus, Ut as ArrowUp, et as Link2, p as Trash2 } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BaN4TOry.mjs";
import { t as Input } from "./input-FnO9yJXZ.mjs";
import { t as Label } from "./label-CgGkF99L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seller.navigation-BKqf6Yym.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SellerNavigation() {
	const { user } = useAuth();
	const qc = useQueryClient();
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [editingItem, setEditingItem] = (0, import_react.useState)(null);
	const [title, setTitle] = (0, import_react.useState)("");
	const [url, setUrl] = (0, import_react.useState)("");
	const [displayOrder, setDisplayOrder] = (0, import_react.useState)(0);
	const { data: store } = useQuery({
		queryKey: ["my-store", user?.id],
		enabled: !!user,
		queryFn: async () => (await supabase.from("stores").select("*").eq("owner_id", user.id).maybeSingle()).data
	});
	const { data: navItems = [], isLoading } = useQuery({
		queryKey: ["store-nav-items", store?.id],
		enabled: !!store?.id,
		queryFn: async () => {
			const { data, error } = await supabase.from("store_navigation_items").select("*").eq("store_id", store.id).order("display_order", { ascending: true });
			if (error) throw error;
			return data;
		}
	});
	(0, import_react.useEffect)(() => {
		if (store?.id && !isLoading && navItems.length === 0) {
			const seedDefaults = async () => {
				try {
					const defaults = [{
						store_id: store.id,
						title: "Catalog",
						url: "#products",
						display_order: 1
					}];
					const { error } = await supabase.from("store_navigation_items").insert(defaults);
					if (error) throw error;
					qc.invalidateQueries({ queryKey: ["store-nav-items", store.id] });
				} catch (err) {
					console.error("Failed to seed default navigation items:", err);
				}
			};
			seedDefaults();
		}
	}, [
		store?.id,
		navItems,
		isLoading,
		qc
	]);
	const saveMutation = useMutation({
		mutationFn: async () => {
			if (!store?.id) throw new Error("Store not found");
			const payload = {
				store_id: store.id,
				menu_name: "main-menu",
				title,
				url,
				display_order: displayOrder,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			if (editingItem) {
				const { error } = await supabase.from("store_navigation_items").update(payload).eq("id", editingItem.id);
				if (error) throw error;
			} else {
				const { error } = await supabase.from("store_navigation_items").insert({
					...payload,
					created_at: (/* @__PURE__ */ new Date()).toISOString()
				});
				if (error) throw error;
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["store-nav-items", store?.id] });
			toast.success(editingItem ? "Link updated!" : "Link added to menu!");
			handleClose();
		},
		onError: (err) => {
			toast.error("Failed to save navigation link: " + err.message);
		}
	});
	const deleteMutation = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("store_navigation_items").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["store-nav-items", store?.id] });
			toast.success("Navigation link removed.");
		},
		onError: (err) => {
			toast.error("Failed to delete link: " + err.message);
		}
	});
	const moveItem = useMutation({
		mutationFn: async ({ item, direction }) => {
			const currentIndex = navItems.findIndex((n) => n.id === item.id);
			if (direction === "up" && currentIndex === 0) return;
			if (direction === "down" && currentIndex === navItems.length - 1) return;
			const swapWith = navItems[direction === "up" ? currentIndex - 1 : currentIndex + 1];
			const { error: err1 } = await supabase.from("store_navigation_items").update({ display_order: swapWith.display_order }).eq("id", item.id);
			if (err1) throw err1;
			const { error: err2 } = await supabase.from("store_navigation_items").update({ display_order: item.display_order }).eq("id", swapWith.id);
			if (err2) throw err2;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["store-nav-items", store?.id] });
		}
	});
	const handleOpenAdd = () => {
		setEditingItem(null);
		setTitle("");
		setUrl("");
		setDisplayOrder(navItems.length > 0 ? Math.max(...navItems.map((n) => n.display_order)) + 1 : 1);
		setIsModalOpen(true);
	};
	const handleOpenEdit = (item) => {
		setEditingItem(item);
		setTitle(item.title);
		setUrl(item.url);
		setDisplayOrder(item.display_order);
		setIsModalOpen(true);
	};
	const handleClose = () => {
		setIsModalOpen(false);
		setEditingItem(null);
	};
	if (!user || !store) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center py-20 text-muted-foreground",
		children: "Please sign in to manage navigation."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-4xl mx-auto pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center gap-4 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold tracking-tight",
					children: "Navigation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Customize header navigation menus for your storefront catalog and pages."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleOpenAdd,
					className: "h-9 gap-1.5 cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Add menu item"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card border rounded-xl shadow-sm p-6 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-sm text-foreground",
					children: "Main menu"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5 font-medium",
					children: "Links displayed in the header navbar"
				})] }), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center py-10 text-muted-foreground",
					children: "Loading navigation…"
				}) : navItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center py-6 text-sm text-muted-foreground",
					children: "No menu links. Add one above."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border rounded-lg overflow-hidden bg-background divide-y",
					children: navItems.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3 flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									disabled: index === 0,
									onClick: () => moveItem.mutate({
										item,
										direction: "up"
									}),
									className: "text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "w-3.5 h-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									disabled: index === navItems.length - 1,
									onClick: () => moveItem.mutate({
										item,
										direction: "down"
									}),
									className: "text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "w-3.5 h-3.5" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-sm text-foreground",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.url })]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "h-8 w-8 cursor-pointer",
								onClick: () => handleOpenEdit(item),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "w-4 h-4 text-muted-foreground" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "h-8 w-8 text-destructive hover:bg-destructive/10 cursor-pointer",
								onClick: () => {
									if (confirm("Are you sure you want to remove this navigation item?")) deleteMutation.mutate(item.id);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
							})]
						})]
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: isModalOpen,
				onOpenChange: (v) => !v && handleClose(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingItem ? "Edit navigation link" : "Add navigation link" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Create links to storefront pages, hashtag identifiers (e.g. #products), or external websites." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "link_title",
										children: "Link Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "link_title",
										value: title,
										onChange: (e) => setTitle(e.target.value),
										placeholder: "e.g. About Us"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "link_url",
										children: "Destination Link / URL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "link_url",
										value: url,
										onChange: (e) => setUrl(e.target.value),
										placeholder: "e.g. /pages/about, #products, or external domain"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "link_order",
										children: "Display Order"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "link_order",
										type: "number",
										value: displayOrder,
										onChange: (e) => setDisplayOrder(parseInt(e.target.value) || 0)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: handleClose,
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => saveMutation.mutate(),
							disabled: !title.trim() || !url.trim() || saveMutation.isPending,
							children: saveMutation.isPending ? "Saving…" : "Save Link"
						})] })
					]
				})
			})
		]
	});
}
//#endregion
export { SellerNavigation as component };
