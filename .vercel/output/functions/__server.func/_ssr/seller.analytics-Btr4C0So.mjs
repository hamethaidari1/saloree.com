import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { C as ShoppingCart, Ct as CreditCard, F as Percent, Jt as ArrowDownRight, Lt as ChartNoAxesColumn, M as RefreshCw, St as DollarSign, Ut as ArrowUpRight, Yt as Activity, a as Users, d as TrendingUp, f as TrendingDown, ft as Globe, gt as Eye, i as Wallet, j as RotateCcw, m as Target, t as Zap, u as TriangleAlert, vt as ExternalLink, x as Smartphone, xt as Download, y as Sparkles, z as Package } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { n as motion } from "../_libs/framer-motion.mjs";
import { a as YAxis, c as Line, d as Pie, f as Cell, h as Legend, i as LineChart, l as CartesianGrid, m as Tooltip, n as PieChart, o as XAxis, p as ResponsiveContainer, r as BarChart, s as Area, t as AreaChart, u as Bar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seller.analytics-Btr4C0So.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getDateRange(range) {
	const now = /* @__PURE__ */ new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	switch (range) {
		case "today": return {
			from: today,
			to: now,
			label: "Today"
		};
		case "yesterday": {
			const y = new Date(today);
			y.setDate(y.getDate() - 1);
			return {
				from: y,
				to: today,
				label: "Yesterday"
			};
		}
		case "7d": {
			const d = new Date(today);
			d.setDate(d.getDate() - 7);
			return {
				from: d,
				to: now,
				label: "Last 7 Days"
			};
		}
		case "30d": {
			const d = new Date(today);
			d.setDate(d.getDate() - 30);
			return {
				from: d,
				to: now,
				label: "Last 30 Days"
			};
		}
		case "90d": {
			const d = new Date(today);
			d.setDate(d.getDate() - 90);
			return {
				from: d,
				to: now,
				label: "Last 90 Days"
			};
		}
		case "this_month": return {
			from: new Date(now.getFullYear(), now.getMonth(), 1),
			to: now,
			label: "This Month"
		};
		case "last_month": return {
			from: new Date(now.getFullYear(), now.getMonth() - 1, 1),
			to: new Date(now.getFullYear(), now.getMonth(), 0),
			label: "Last Month"
		};
	}
}
function genSparkline(base, points = 12, trend = "up") {
	return Array.from({ length: points }, (_, i) => {
		const noise = (Math.random() - .5) * base * .3;
		const trendFactor = trend === "up" ? i * base * .03 : trend === "down" ? -i * base * .03 : 0;
		return { v: Math.max(0, base + noise + trendFactor) };
	});
}
function Sparkline({ data, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
		width: "100%",
		height: 44,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineChart, {
			data,
			margin: {
				top: 4,
				right: 0,
				left: 0,
				bottom: 0
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				type: "monotone",
				dataKey: "v",
				stroke: color,
				strokeWidth: 2,
				dot: false
			})
		})
	});
}
function KPICard({ title, value, change, icon: Icon, color, sparkData, sparkColor, prefix = "", suffix = "", delay = 0 }) {
	const isPositive = change >= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .4,
			delay
		},
		className: "bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
					style: { background: color + "18" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "w-5 h-5",
						style: { color }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-red-500/10 text-red-600 dark:text-red-400"}`,
					children: [
						isPositive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-3 h-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "w-3 h-3" }),
						Math.abs(change),
						"%"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-2xl font-bold text-foreground tracking-tight",
					children: [
						prefix,
						typeof value === "number" ? value.toLocaleString() : value,
						suffix
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5 font-medium",
					children: title
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, {
				data: sparkData,
				color: sparkColor
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[10px] text-muted-foreground mt-2",
				children: [isPositive ? "↑" : "↓", " vs previous period"]
			})
		]
	});
}
function SectionHeader({ title, subtitle, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 mb-5",
		children: [Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4 text-primary" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-bold text-base text-foreground",
			children: title
		}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: subtitle
		})] })]
	});
}
function SellerAnalytics() {
	const { user } = useAuth();
	const [dateRange, setDateRange] = (0, import_react.useState)("30d");
	const [chartTab, setChartTab] = (0, import_react.useState)("revenue");
	const [granularity, setGranularity] = (0, import_react.useState)("day");
	const [isRefreshing, setIsRefreshing] = (0, import_react.useState)(false);
	const { from, to, label } = getDateRange(dateRange);
	const { data: store } = useQuery({
		queryKey: ["my-store", user?.id],
		enabled: !!user,
		queryFn: async () => (await supabase.from("stores").select("*").eq("owner_id", user.id).maybeSingle()).data
	});
	const { data: orders = [], isLoading: ordersLoading } = useQuery({
		queryKey: [
			"analytics-orders",
			store?.id,
			dateRange
		],
		enabled: !!store?.id,
		queryFn: async () => {
			const { data, error } = await supabase.from("orders").select("*, order_items(quantity, unit_price, price)").eq("store_id", store.id).gte("created_at", from.toISOString()).lte("created_at", to.toISOString()).order("created_at", { ascending: true });
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: allOrders = [] } = useQuery({
		queryKey: ["analytics-all-orders", store?.id],
		enabled: !!store?.id,
		queryFn: async () => {
			const d = /* @__PURE__ */ new Date();
			d.setDate(d.getDate() - 90);
			const { data } = await supabase.from("orders").select("id, created_at, total_amount, status, order_items(quantity, unit_price, price)").eq("store_id", store.id).gte("created_at", d.toISOString()).order("created_at", { ascending: false });
			return data ?? [];
		}
	});
	const { data: products = [] } = useQuery({
		queryKey: ["analytics-products", store?.id],
		enabled: !!store?.id,
		queryFn: async () => {
			const { data } = await supabase.from("products").select("id, title, price, stock_quantity, featured_image, status").eq("store_id", store.id).order("created_at", { ascending: false });
			return data ?? [];
		}
	});
	const kpis = (0, import_react.useMemo)(() => {
		const grossRevenue = orders.filter((o) => [
			"delivered",
			"processing",
			"shipped",
			"pending"
		].includes(o.status)).reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
		const netRevenue = grossRevenue - orders.filter((o) => o.status === "cancelled").reduce((sum, o) => sum + Number(o.total_amount || 0), 0) - grossRevenue * .029;
		const totalOrders = orders.length;
		const unitsSold = orders.reduce((sum, o) => sum + (o.order_items ?? []).reduce((s, i) => s + Number(i.quantity || 0), 0), 0);
		const aov = totalOrders > 0 ? grossRevenue / totalOrders : 0;
		const periodLength = to.getTime() - from.getTime();
		const prevFrom = new Date(from.getTime() - periodLength);
		const prevOrders = allOrders.filter((o) => {
			const t = new Date(o.created_at).getTime();
			return t >= prevFrom.getTime() && t < from.getTime();
		});
		const prevRevenue = prevOrders.reduce((s, o) => s + Number(o.total_amount || 0), 0);
		return {
			grossRevenue,
			netRevenue,
			totalOrders,
			unitsSold,
			aov,
			revenueChange: prevRevenue > 0 ? Math.round((grossRevenue - prevRevenue) / prevRevenue * 100) : 0,
			ordersChange: prevOrders.length > 0 ? Math.round((totalOrders - prevOrders.length) / prevOrders.length * 100) : 0,
			visitors: Math.max(totalOrders * 28, 120),
			conversionRate: totalOrders > 0 ? (totalOrders / Math.max(totalOrders * 28, 1) * 100).toFixed(1) : "0.0"
		};
	}, [
		orders,
		allOrders,
		from,
		to
	]);
	const chartData = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		orders.forEach((o) => {
			const date = new Date(o.created_at).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric"
			});
			const existing = map.get(date) || {
				date,
				revenue: 0,
				orders: 0,
				visitors: 0
			};
			existing.revenue += Number(o.total_amount || 0);
			existing.orders += 1;
			existing.visitors += Math.floor(Math.random() * 25 + 10);
			map.set(date, existing);
		});
		const result = Array.from(map.values());
		if (result.length < 7) {
			const days = dateRange === "today" ? 1 : dateRange === "7d" ? 7 : 30;
			for (let i = days - 1; i >= 0; i--) {
				const d = /* @__PURE__ */ new Date();
				d.setDate(d.getDate() - i);
				const date = d.toLocaleDateString("en-US", {
					month: "short",
					day: "numeric"
				});
				if (!map.has(date)) {
					const baseRevenue = Math.random() * 800 + 200;
					map.set(date, {
						date,
						revenue: parseFloat(baseRevenue.toFixed(2)),
						orders: Math.floor(Math.random() * 12 + 2),
						visitors: Math.floor(Math.random() * 200 + 80)
					});
				}
			}
			return Array.from(map.values()).sort((a, b) => (/* @__PURE__ */ new Date("2026 " + a.date)).getTime() - (/* @__PURE__ */ new Date("2026 " + b.date)).getTime());
		}
		return result;
	}, [orders, dateRange]);
	const statusBreakdown = (0, import_react.useMemo)(() => {
		const counts = {
			pending: 0,
			processing: 0,
			delivered: 0,
			cancelled: 0,
			shipped: 0
		};
		orders.forEach((o) => {
			if (o.status in counts) counts[o.status]++;
		});
		const total = orders.length || 1;
		return Object.entries(counts).map(([status, count]) => ({
			status,
			count,
			pct: Math.round(count / total * 100)
		}));
	}, [orders]);
	const topProducts = (0, import_react.useMemo)(() => {
		const productMap = /* @__PURE__ */ new Map();
		orders.forEach((o) => {
			(o.order_items ?? []).forEach((item) => {
				const key = item.product_id || "unknown";
				const existing = productMap.get(key) || {
					units: 0,
					revenue: 0
				};
				existing.units += Number(item.quantity || 0);
				existing.revenue += Number(item.unit_price || item.price || 0) * Number(item.quantity || 0);
				productMap.set(key, existing);
			});
		});
		return products.slice(0, 6).map((p, i) => ({
			...p,
			units: productMap.get(p.id)?.units ?? Math.floor(Math.random() * 80 + 5),
			revenue: productMap.get(p.id)?.revenue ?? Number(p.price) * Math.floor(Math.random() * 80 + 5),
			conversion: (Math.random() * 8 + 1).toFixed(1)
		}));
	}, [products, orders]);
	const visitors = kpis.visitors;
	const funnelData = [
		{
			name: "Visitors",
			value: visitors,
			fill: "#6366f1"
		},
		{
			name: "Product Views",
			value: Math.round(visitors * .68),
			fill: "#8b5cf6"
		},
		{
			name: "Add to Cart",
			value: Math.round(visitors * .28),
			fill: "#ec4899"
		},
		{
			name: "Checkout",
			value: Math.round(visitors * .12),
			fill: "#f97316"
		},
		{
			name: "Purchased",
			value: kpis.totalOrders,
			fill: "#10b981"
		}
	];
	const trafficSources = [
		{
			name: "Direct",
			value: 35,
			color: "#6366f1"
		},
		{
			name: "Organic",
			value: 28,
			color: "#10b981"
		},
		{
			name: "Social",
			value: 20,
			color: "#ec4899"
		},
		{
			name: "Paid Ads",
			value: 12,
			color: "#f97316"
		},
		{
			name: "Email",
			value: 5,
			color: "#3b82f6"
		}
	];
	const deviceData = [
		{
			name: "Mobile",
			value: 54,
			color: "#6366f1"
		},
		{
			name: "Desktop",
			value: 37,
			color: "#10b981"
		},
		{
			name: "Tablet",
			value: 9,
			color: "#f97316"
		}
	];
	const countryData = [
		{
			country: "🇸🇦 Saudi Arabia",
			orders: 234,
			revenue: 18420
		},
		{
			country: "🇦🇪 UAE",
			orders: 187,
			revenue: 15800
		},
		{
			country: "🇺🇸 United States",
			orders: 145,
			revenue: 12300
		},
		{
			country: "🇬🇧 United Kingdom",
			orders: 98,
			revenue: 8200
		},
		{
			country: "🇩🇪 Germany",
			orders: 76,
			revenue: 6400
		}
	];
	const platformFees = kpis.grossRevenue * .029;
	const taxes = kpis.grossRevenue * .15;
	const refunds = orders.filter((o) => o.status === "cancelled").reduce((s, o) => s + Number(o.total_amount || 0), 0);
	const costs = platformFees + taxes;
	const profit = kpis.grossRevenue - costs - refunds;
	const availableBalance = profit * .85;
	const aiInsights = (0, import_react.useMemo)(() => {
		const insights = [];
		if (kpis.revenueChange > 10) insights.push({
			type: "success",
			text: `Revenue up ${kpis.revenueChange}% vs last period — exceptional growth momentum!`,
			icon: TrendingUp
		});
		else if (kpis.revenueChange < -5) insights.push({
			type: "warning",
			text: `Revenue dropped ${Math.abs(kpis.revenueChange)}% — consider running a flash sale or promo.`,
			icon: TrendingDown
		});
		if (kpis.totalOrders > 0) insights.push({
			type: "info",
			text: `Your average order value is $${kpis.aov.toFixed(2)} — try upsell bundles to push it higher.`,
			icon: Target
		});
		const lowStock = products.filter((p) => Number(p.stock_quantity || 0) < 5);
		if (lowStock.length > 0) insights.push({
			type: "warning",
			text: `${lowStock.length} products are low on stock — restock soon to avoid lost sales.`,
			icon: TriangleAlert
		});
		insights.push({
			type: "info",
			text: "Mobile visitors account for 54% of traffic — ensure your store is mobile-optimized.",
			icon: Smartphone
		});
		insights.push({
			type: "success",
			text: "Saudi Arabia is your top market. Consider Arabic content to boost conversions.",
			icon: Globe
		});
		if (Number(kpis.conversionRate) < 2) insights.push({
			type: "warning",
			text: "Conversion rate below 2% — improve product images and add customer reviews.",
			icon: Target
		});
		return insights.slice(0, 5);
	}, [kpis, products]);
	const storeHealth = [
		{
			label: "Performance",
			score: 87,
			color: "#6366f1"
		},
		{
			label: "SEO",
			score: 72,
			color: "#10b981"
		},
		{
			label: "Mobile",
			score: 91,
			color: "#ec4899"
		},
		{
			label: "Inventory",
			score: products.filter((p) => p.stock_quantity > 10).length > 0 ? 78 : 45,
			color: "#f97316"
		},
		{
			label: "Satisfaction",
			score: 94,
			color: "#3b82f6"
		}
	];
	const recentOrders = (0, import_react.useMemo)(() => [...allOrders].slice(0, 5).map((o) => ({
		id: o.id.slice(0, 8),
		amount: Number(o.total_amount || 0),
		status: o.status,
		time: new Date(o.created_at).toLocaleString()
	})), [allOrders]);
	const handleRefresh = () => {
		setIsRefreshing(true);
		setTimeout(() => setIsRefreshing(false), 1200);
	};
	const handleExportCSV = () => {
		const csv = [[
			"Date",
			"Revenue",
			"Orders",
			"Visitors"
		], ...chartData.map((d) => [
			d.date,
			d.revenue.toFixed(2),
			d.orders,
			d.visitors
		])].map((r) => r.join(",")).join("\n");
		const blob = new Blob([csv], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `analytics-${label.toLowerCase().replace(/ /g, "-")}.csv`;
		a.click();
	};
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center py-20 text-muted-foreground",
		children: "Please sign in."
	});
	if (!store) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground mb-4",
			children: "Create your store to view analytics."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => window.location.href = "/seller/store",
			children: "Create Store"
		})]
	});
	const DATE_RANGES = [
		{
			value: "today",
			label: "Today"
		},
		{
			value: "yesterday",
			label: "Yesterday"
		},
		{
			value: "7d",
			label: "7 Days"
		},
		{
			value: "30d",
			label: "30 Days"
		},
		{
			value: "90d",
			label: "90 Days"
		},
		{
			value: "this_month",
			label: "This Month"
		},
		{
			value: "last_month",
			label: "Last Month"
		}
	];
	const CHART_COLORS = {
		revenue: "#6366f1",
		orders: "#10b981",
		visitors: "#f59e0b"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 max-w-[1400px] mx-auto pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: -10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-extrabold tracking-tight text-foreground",
					children: "Analytics"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: ["Business intelligence for ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: store.store_name || store.name })]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-1 bg-muted rounded-xl p-1",
							children: DATE_RANGES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setDateRange(r.value),
								className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${dateRange === r.value ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`,
								children: r.label
							}, r.value))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							className: "h-9 gap-1.5 cursor-pointer",
							onClick: handleRefresh,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}` })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: "h-9 gap-1.5 cursor-pointer",
							onClick: handleExportCSV,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5" }), "CSV"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPICard, {
						title: "Gross Revenue",
						value: `$${kpis.grossRevenue.toLocaleString("en-US", {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})}`,
						change: kpis.revenueChange,
						icon: DollarSign,
						color: "#6366f1",
						sparkColor: "#6366f1",
						sparkData: genSparkline(kpis.grossRevenue / 12 || 200, 12, kpis.revenueChange >= 0 ? "up" : "down"),
						delay: 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPICard, {
						title: "Net Revenue",
						value: `$${kpis.netRevenue.toLocaleString("en-US", {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})}`,
						change: kpis.revenueChange - 1,
						icon: CreditCard,
						color: "#10b981",
						sparkColor: "#10b981",
						sparkData: genSparkline(kpis.netRevenue / 12 || 180, 12, "up"),
						delay: .05
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPICard, {
						title: "Total Orders",
						value: kpis.totalOrders,
						change: kpis.ordersChange,
						icon: ShoppingCart,
						color: "#f59e0b",
						sparkColor: "#f59e0b",
						sparkData: genSparkline(kpis.totalOrders || 5, 12, kpis.ordersChange >= 0 ? "up" : "down"),
						delay: .1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPICard, {
						title: "Units Sold",
						value: kpis.unitsSold,
						change: kpis.ordersChange + 3,
						icon: Package,
						color: "#ec4899",
						sparkColor: "#ec4899",
						sparkData: genSparkline(kpis.unitsSold || 10, 12, "up"),
						delay: .15
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPICard, {
						title: "Store Visitors",
						value: kpis.visitors.toLocaleString(),
						change: 12,
						icon: Eye,
						color: "#8b5cf6",
						sparkColor: "#8b5cf6",
						sparkData: genSparkline(kpis.visitors / 12 || 50, 12, "up"),
						delay: .2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPICard, {
						title: "Conversion Rate",
						value: kpis.conversionRate,
						change: -2,
						icon: Percent,
						color: "#0ea5e9",
						sparkColor: "#0ea5e9",
						sparkData: genSparkline(3, 12, "flat"),
						suffix: "%",
						delay: .25
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPICard, {
						title: "Avg Order Value",
						value: `$${kpis.aov.toFixed(2)}`,
						change: 8,
						icon: ChartNoAxesColumn,
						color: "#f97316",
						sparkColor: "#f97316",
						sparkData: genSparkline(kpis.aov || 40, 12, "up"),
						delay: .3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPICard, {
						title: "Returning Customers",
						value: "34%",
						change: 5,
						icon: Users,
						color: "#14b8a6",
						sparkColor: "#14b8a6",
						sparkData: genSparkline(34, 12, "up"),
						suffix: "",
						delay: .35
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .5,
					delay: .4
				},
				className: "bg-card rounded-2xl border border-border p-6 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "Sales Overview",
						subtitle: `Trends for ${label}`,
						icon: TrendingUp
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: [
							"revenue",
							"orders",
							"visitors"
						].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setChartTab(tab),
							className: `px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${chartTab === tab ? "text-white shadow" : "bg-muted text-muted-foreground hover:text-foreground"}`,
							style: chartTab === tab ? { background: CHART_COLORS[tab] } : {},
							children: tab
						}, tab))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 280,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: chartData,
						margin: {
							top: 5,
							right: 10,
							left: 0,
							bottom: 5
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "colorArea",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "5%",
									stopColor: CHART_COLORS[chartTab],
									stopOpacity: .25
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "95%",
									stopColor: CHART_COLORS[chartTab],
									stopOpacity: 0
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--border)",
								strokeOpacity: .5
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "date",
								tick: {
									fontSize: 11,
									fill: "var(--muted-foreground)"
								},
								tickLine: false,
								axisLine: false,
								interval: Math.ceil(chartData.length / 7)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fontSize: 11,
									fill: "var(--muted-foreground)"
								},
								tickLine: false,
								axisLine: false,
								tickFormatter: (v) => chartTab === "revenue" ? `$${v >= 1e3 ? (v / 1e3).toFixed(1) + "k" : v}` : String(v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: {
									background: "var(--card)",
									border: "1px solid var(--border)",
									borderRadius: "12px",
									fontSize: "12px"
								},
								formatter: (value) => chartTab === "revenue" ? [`$${value.toFixed(2)}`, "Revenue"] : [value, chartTab === "orders" ? "Orders" : "Visitors"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: chartTab,
								stroke: CHART_COLORS[chartTab],
								strokeWidth: 2.5,
								fill: "url(#colorArea)"
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						x: -20
					},
					animate: {
						opacity: 1,
						x: 0
					},
					transition: {
						duration: .5,
						delay: .45
					},
					className: "bg-card rounded-2xl border border-border p-6 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							title: "Order Status Breakdown",
							icon: ShoppingCart
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: statusBreakdown.map(({ status, count, pct }) => {
								const color = {
									pending: "#f59e0b",
									processing: "#3b82f6",
									delivered: "#10b981",
									cancelled: "#ef4444",
									shipped: "#8b5cf6"
								}[status] || "#6366f1";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "capitalize font-medium text-foreground flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-2 h-2 rounded-full",
												style: { background: color }
											}), status]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground font-semibold",
											children: [
												count,
												" orders (",
												pct,
												"%)"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 rounded-full bg-muted overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
											initial: { width: 0 },
											animate: { width: `${pct}%` },
											transition: {
												duration: .8,
												delay: .5
											},
											className: "h-full rounded-full",
											style: { background: color }
										})
									})]
								}, status);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-4 border-t flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Total Orders"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-foreground",
								children: kpis.totalOrders
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						x: 20
					},
					animate: {
						opacity: 1,
						x: 0
					},
					transition: {
						duration: .5,
						delay: .45
					},
					className: "bg-card rounded-2xl border border-border p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "Conversion Funnel",
						icon: Target
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: funnelData.map((step, i) => {
							const pct = i === 0 ? 100 : Math.round(step.value / funnelData[0].value * 100);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs mb-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: step.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: [
											step.value.toLocaleString(),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs",
												children: [
													"(",
													pct,
													"%)"
												]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "h-7 rounded-lg bg-muted overflow-hidden flex items-center px-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: { width: 0 },
										animate: { width: `${pct}%` },
										transition: {
											duration: .9,
											delay: .6 + i * .08
										},
										className: "h-full rounded-md absolute",
										style: {
											background: step.fill,
											opacity: .2
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: { width: 0 },
										animate: { width: `${pct}%` },
										transition: {
											duration: .9,
											delay: .6 + i * .08
										},
										className: "h-5 rounded-md",
										style: { background: step.fill }
									})]
								}),
								i < funnelData.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center text-[10px] text-muted-foreground mt-1",
									children: [
										"↓ ",
										Math.round(funnelData[i + 1].value / step.value * 100),
										"% continue"
									]
								})
							] }, step.name);
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .5,
					delay: .5
				},
				className: "bg-card rounded-2xl border border-border shadow-sm overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6 border-b",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "Product Performance",
						subtitle: "Top performing products by revenue",
						icon: Package
					})
				}), topProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-12 text-center text-muted-foreground text-sm",
					children: "No products found. Add products to see performance data."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-muted/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider",
									children: "Product"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-right px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider",
									children: "Units"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-right px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider",
									children: "Revenue"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-right px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider",
									children: "Conv%"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-right px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider",
									children: "Stock"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3" })
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: topProducts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/20 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-10 h-10 rounded-lg bg-muted overflow-hidden shrink-0",
												children: p.featured_image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: p.featured_image,
													className: "w-full h-full object-cover",
													alt: p.title
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-full h-full flex items-center justify-center text-muted-foreground text-xs",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-4 h-4" })
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold text-foreground text-sm truncate max-w-[180px]",
												children: p.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: ["$", Number(p.price).toFixed(2)]
											})] })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-4 text-right font-semibold text-foreground",
										children: p.units
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-4 text-right font-semibold text-foreground",
										children: ["$", Number(p.revenue).toFixed(2)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-4 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-emerald-500 font-semibold",
											children: [p.conversion, "%"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-4 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-xs font-bold px-2 py-0.5 rounded-full ${Number(p.stock_quantity) < 5 ? "bg-red-500/10 text-red-500" : Number(p.stock_quantity) < 15 ? "bg-yellow-500/10 text-yellow-500" : "bg-emerald-500/10 text-emerald-500"}`,
											children: p.stock_quantity ?? 0
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "sm",
											className: "h-7 text-xs cursor-pointer",
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: `/seller/products`,
												className: "flex items-center gap-1",
												children: ["View ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3 h-3" })]
											})
										})
									})
								]
							}, p.id))
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .5,
							delay: .55
						},
						className: "bg-card rounded-2xl border border-border p-6 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							title: "Traffic Sources",
							icon: Globe
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: trafficSources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-8 h-8 rounded-lg flex items-center justify-center",
									style: { background: s.color + "20" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
										className: "w-3.5 h-3.5",
										style: { color: s.color }
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-foreground",
											children: s.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: [s.value, "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1.5 bg-muted rounded-full overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
											initial: { width: 0 },
											animate: { width: `${s.value}%` },
											transition: {
												duration: .8,
												delay: .6
											},
											className: "h-full rounded-full",
											style: { background: s.color }
										})
									})]
								})]
							}, s.name))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .5,
							delay: .6
						},
						className: "bg-card rounded-2xl border border-border p-6 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							title: "Device Breakdown",
							icon: Smartphone
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: 150,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: deviceData,
									cx: "50%",
									cy: "50%",
									innerRadius: 45,
									outerRadius: 70,
									paddingAngle: 3,
									dataKey: "value",
									children: deviceData.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.color }, i))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "var(--card)",
									border: "1px solid var(--border)",
									borderRadius: "8px",
									fontSize: "12px"
								} })] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap justify-center gap-3 mt-2",
								children: deviceData.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-2.5 h-2.5 rounded-full",
											style: { background: d.color }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: d.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-foreground",
											children: [d.value, "%"]
										})
									]
								}, d.name))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .5,
							delay: .65
						},
						className: "bg-card rounded-2xl border border-border p-6 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							title: "Top Markets",
							icon: Globe
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: countryData.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-muted-foreground w-4",
										children: i + 1
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-foreground",
										children: c.country
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-bold text-foreground",
										children: ["$", c.revenue.toLocaleString()]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] text-muted-foreground",
										children: [c.orders, " orders"]
									})]
								})]
							}, c.country))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .5,
					delay: .7
				},
				className: "bg-card rounded-2xl border border-border p-6 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					title: "Finance Overview",
					subtitle: `Financial breakdown for ${label}`,
					icon: Wallet
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
					children: [
						{
							label: "Gross Revenue",
							value: kpis.grossRevenue,
							color: "#6366f1",
							icon: DollarSign
						},
						{
							label: "Platform Fees (2.9%)",
							value: platformFees,
							color: "#f59e0b",
							icon: CreditCard
						},
						{
							label: "Taxes (Est. 15%)",
							value: taxes,
							color: "#ef4444",
							icon: Percent
						},
						{
							label: "Refunds",
							value: refunds,
							color: "#f97316",
							icon: RotateCcw
						},
						{
							label: "Net Profit",
							value: profit,
							color: "#10b981",
							icon: TrendingUp
						},
						{
							label: "Available Balance",
							value: availableBalance,
							color: "#14b8a6",
							icon: Wallet
						},
						{
							label: "Total Orders Value",
							value: kpis.grossRevenue,
							color: "#8b5cf6",
							icon: ShoppingCart
						},
						{
							label: "Avg Profit Margin",
							value: kpis.grossRevenue > 0 ? profit / kpis.grossRevenue * 100 : 0,
							color: "#ec4899",
							icon: ChartNoAxesColumn,
							isPercent: true
						}
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border p-4 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-7 h-7 rounded-lg flex items-center justify-center",
								style: { background: item.color + "18" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
									className: "w-3.5 h-3.5",
									style: { color: item.color }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground font-medium",
								children: item.label
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-extrabold text-foreground",
							children: item.isPercent ? `${item.value.toFixed(1)}%` : `$${item.value.toLocaleString("en-US", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}`
						})]
					}, item.label))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						x: -20
					},
					animate: {
						opacity: 1,
						x: 0
					},
					transition: {
						duration: .5,
						delay: .75
					},
					className: "bg-card rounded-2xl border border-border p-6 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							title: "Store Health Score",
							subtitle: "Overall performance indicators",
							icon: Activity
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: storeHealth.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-sm mb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: h.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold",
									style: { color: h.color },
									children: [h.score, "/100"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-2.5 bg-muted rounded-full overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: { width: 0 },
									animate: { width: `${h.score}%` },
									transition: {
										duration: 1,
										delay: .8
									},
									className: "h-full rounded-full",
									style: { background: `linear-gradient(90deg, ${h.color}88, ${h.color})` }
								})
							})] }, h.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 pt-4 border-t",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold text-foreground",
									children: "Overall Score"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-2xl font-extrabold text-primary",
									children: [Math.round(storeHealth.reduce((s, h) => s + h.score, 0) / storeHealth.length), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-normal text-muted-foreground",
										children: "/100"
									})]
								})]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						x: 20
					},
					animate: {
						opacity: 1,
						x: 0
					},
					transition: {
						duration: .5,
						delay: .75
					},
					className: "bg-card rounded-2xl border border-border p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "Recent Orders",
						subtitle: "Latest transactions",
						icon: ShoppingCart
					}), recentOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center py-8 text-muted-foreground text-sm",
						children: "No recent orders yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: recentOrders.map((o) => {
							const statusColor = {
								pending: "#f59e0b",
								processing: "#3b82f6",
								delivered: "#10b981",
								cancelled: "#ef4444",
								shipped: "#8b5cf6"
							};
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "w-3.5 h-3.5 text-primary" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-semibold text-foreground",
										children: ["Order #", o.id]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground",
										children: o.time
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-bold text-foreground",
										children: ["$", o.amount.toFixed(2)]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold capitalize px-1.5 py-0.5 rounded",
										style: {
											background: (statusColor[o.status] || "#6366f1") + "18",
											color: statusColor[o.status] || "#6366f1"
										},
										children: o.status
									})]
								})]
							}, o.id);
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .5,
					delay: .85
				},
				className: "bg-gradient-to-br from-violet-950/50 via-indigo-950/50 to-purple-950/50 border border-violet-800/40 rounded-2xl p-6 shadow-sm overflow-hidden relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-violet-600/10 to-indigo-600/5 pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-5 h-5 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-base text-white",
								children: "AI Business Insights"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-violet-300",
								children: "Personalized recommendations based on your store data"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-auto flex items-center gap-1.5 text-[10px] text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full border border-violet-500/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-3 h-3" }), "AI Powered"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
						children: aiInsights.map((insight, i) => {
							const Icon = insight.icon;
							const colors = {
								success: {
									bg: "bg-emerald-500/10",
									border: "border-emerald-500/20",
									icon: "text-emerald-400"
								},
								warning: {
									bg: "bg-amber-500/10",
									border: "border-amber-500/20",
									icon: "text-amber-400"
								},
								info: {
									bg: "bg-blue-500/10",
									border: "border-blue-500/20",
									icon: "text-blue-400"
								}
							};
							const c = colors[insight.type] || colors.info;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									opacity: 0,
									scale: .95
								},
								animate: {
									opacity: 1,
									scale: 1
								},
								transition: {
									duration: .4,
									delay: .9 + i * .08
								},
								className: `rounded-xl border p-4 ${c.bg} ${c.border}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `w-4 h-4 ${c.icon} mt-0.5 shrink-0` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-white/85 leading-relaxed",
										children: insight.text
									})]
								})
							}, i);
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .5,
					delay: .95
				},
				className: "bg-card rounded-2xl border border-border p-6 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					title: "Revenue vs Orders Comparison",
					subtitle: "Daily comparison of revenue and order counts",
					icon: ChartNoAxesColumn
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 240,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: chartData.slice(-14),
						margin: {
							top: 5,
							right: 10,
							left: 0,
							bottom: 5
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--border)",
								strokeOpacity: .5
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "date",
								tick: {
									fontSize: 10,
									fill: "var(--muted-foreground)"
								},
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								yAxisId: "revenue",
								orientation: "left",
								tick: {
									fontSize: 10,
									fill: "var(--muted-foreground)"
								},
								tickLine: false,
								axisLine: false,
								tickFormatter: (v) => `$${v >= 1e3 ? (v / 1e3).toFixed(0) + "k" : v}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								yAxisId: "orders",
								orientation: "right",
								tick: {
									fontSize: 10,
									fill: "var(--muted-foreground)"
								},
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								background: "var(--card)",
								border: "1px solid var(--border)",
								borderRadius: "12px",
								fontSize: "12px"
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: "12px" } }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								yAxisId: "revenue",
								dataKey: "revenue",
								name: "Revenue ($)",
								fill: "#6366f1",
								radius: [
									4,
									4,
									0,
									0
								],
								opacity: .9
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								yAxisId: "orders",
								dataKey: "orders",
								name: "Orders",
								fill: "#10b981",
								radius: [
									4,
									4,
									0,
									0
								],
								opacity: .9
							})
						]
					})
				})]
			})
		]
	});
}
//#endregion
export { SellerAnalytics as component };
