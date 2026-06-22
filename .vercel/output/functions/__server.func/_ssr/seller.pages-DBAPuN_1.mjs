import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { N as Plus, p as Trash2, rt as Globe, st as Eye, v as SquarePen } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BaN4TOry.mjs";
import { t as Input } from "./input-FnO9yJXZ.mjs";
import { t as Label } from "./label-CgGkF99L.mjs";
import { n as Textarea, t as Switch } from "./textarea-DEuTITL8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seller.pages-DBAPuN_1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SellerPages() {
	const { user } = useAuth();
	const qc = useQueryClient();
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [editingPage, setEditingPage] = (0, import_react.useState)(null);
	const [title, setTitle] = (0, import_react.useState)("");
	const [slug, setSlug] = (0, import_react.useState)("");
	const [content, setContent] = (0, import_react.useState)("");
	const [isPublished, setIsPublished] = (0, import_react.useState)(true);
	const { data: store } = useQuery({
		queryKey: ["my-store", user?.id],
		enabled: !!user,
		queryFn: async () => (await supabase.from("stores").select("*").eq("owner_id", user.id).maybeSingle()).data
	});
	const { data: pages = [], isLoading } = useQuery({
		queryKey: ["store-pages", store?.id],
		enabled: !!store?.id,
		queryFn: async () => {
			const { data, error } = await supabase.from("store_pages").select("*").eq("store_id", store.id).order("created_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
	const saveMutation = useMutation({
		mutationFn: async () => {
			if (!store?.id) throw new Error("Store not found");
			const payload = {
				store_id: store.id,
				title,
				slug: slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
				content,
				is_published: isPublished,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			if (editingPage) {
				const { error } = await supabase.from("store_pages").update(payload).eq("id", editingPage.id);
				if (error) throw error;
			} else {
				const { error } = await supabase.from("store_pages").insert({
					...payload,
					created_at: (/* @__PURE__ */ new Date()).toISOString()
				});
				if (error) throw error;
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["store-pages", store?.id] });
			toast.success(editingPage ? "Page updated! 📝" : "Page created! 📄");
			handleClose();
		},
		onError: (err) => {
			toast.error("Failed to save page: " + err.message);
		}
	});
	const deleteMutation = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("store_pages").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["store-pages", store?.id] });
			toast.success("Page deleted.");
		},
		onError: (err) => {
			toast.error("Failed to delete page: " + err.message);
		}
	});
	const handleOpenAdd = () => {
		setEditingPage(null);
		setTitle("");
		setSlug("");
		setContent("");
		setIsPublished(true);
		setIsModalOpen(true);
	};
	const handleOpenEdit = (page) => {
		setEditingPage(page);
		setTitle(page.title);
		setSlug(page.slug);
		setContent(page.content || "");
		setIsPublished(page.is_published);
		setIsModalOpen(true);
	};
	const handleClose = () => {
		setIsModalOpen(false);
		setEditingPage(null);
	};
	const handleTitleChange = (val) => {
		setTitle(val);
		if (!editingPage) setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
	};
	if (!user || !store) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center py-20 text-muted-foreground",
		children: "Please sign in to manage pages."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-5xl mx-auto pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center gap-4 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold tracking-tight",
					children: "Pages"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Create, edit, and manage custom pages (e.g. About, Contact, FAQ) for your store."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleOpenAdd,
					className: "h-9 gap-1.5 cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Add page"]
				})]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center py-10 text-muted-foreground",
				children: "Loading pages…"
			}) : pages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-dashed p-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-5xl mb-4",
						children: "📄"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-semibold mb-1",
						children: "Add pages to your store"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-sm max-w-md mx-auto mb-4",
						children: "Custom pages give your customers more details about your brand, sizing charts, returns policies, or contact details."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleOpenAdd,
						size: "sm",
						className: "cursor-pointer",
						children: "Create page"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-card border rounded-xl overflow-hidden shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y",
					children: pages.map((page) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 flex items-center justify-between gap-4 hover:bg-muted/10 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-sm truncate text-foreground",
									children: page.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${page.is_published ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`,
									children: page.is_published ? "Visible" : "Hidden"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "truncate",
									children: [
										"/stores/",
										store.slug,
										"/pages/",
										page.slug
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "h-8 w-8 cursor-pointer",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `/stores/${store.slug}?page=${page.slug}`,
										target: "_blank",
										rel: "noreferrer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-4 h-4 text-muted-foreground" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "h-8 w-8 cursor-pointer",
									onClick: () => handleOpenEdit(page),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "w-4 h-4 text-muted-foreground" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "h-8 w-8 text-destructive hover:bg-destructive/10 cursor-pointer",
									onClick: () => {
										if (confirm("Are you sure you want to delete this page?")) deleteMutation.mutate(page.id);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
								})
							]
						})]
					}, page.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: isModalOpen,
				onOpenChange: (v) => !v && handleClose(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-xl max-h-[85vh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingPage ? "Edit page" : "Add page" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Write content for your custom page. Slugs are used to generate custom page URLs." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "title",
										children: "Title"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "title",
										value: title,
										onChange: (e) => handleTitleChange(e.target.value),
										placeholder: "e.g. About Our Brand"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "slug",
										children: "URL Slug"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "slug",
										value: slug,
										onChange: (e) => setSlug(e.target.value),
										placeholder: "about-our-brand"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "content",
										children: "Content (HTML / Plain Text)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "content",
										value: content,
										onChange: (e) => setContent(e.target.value),
										placeholder: "Write your page details here...",
										rows: 8
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-sm font-semibold",
										children: "Visibility"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Make this page active on your storefront"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: isPublished,
										onCheckedChange: setIsPublished
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
							disabled: !title.trim() || !slug.trim() || saveMutation.isPending,
							children: saveMutation.isPending ? "Saving…" : "Save Page"
						})] })
					]
				})
			})
		]
	});
}
//#endregion
export { SellerPages as component };
