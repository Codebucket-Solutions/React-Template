import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Card from "../../components/card";
import { ShieldCheck, AlertTriangle, FileSearch, CheckCircle } from "lucide-react";
import { fetchAnalytics } from "../../store/slices/analytics/analyticsThunk";

const RISK_COLORS = { High: "#ef4444", Medium: "#eab308", Low: "#22c55e" };

const AnalyticsContainer = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state) => state.Analytics);

    useEffect(() => {
        dispatch(fetchAnalytics());
    }, [dispatch]);

    if (isLoading || !data) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-500">
                Loading analytics...
            </div>
        );
    }

    const {
        totalCases = 0,
        casesByRiskLevel = [],
        casesByFraudCategory = [],
        openCases = 0,
        resolvedCases = 0,
        underInvestigation = 0,
        highRiskTrend = [],
    } = data;

    // Get high risk count
    const highRisk = casesByRiskLevel.find((r) => r._id === "High")?.count || 0;

    const stats = [
        { label: "Total Cases", value: totalCases, icon: FileSearch, color: "text-cyan-400" },
        { label: "High Risk", value: highRisk, icon: AlertTriangle, color: "text-red-400" },
        { label: "Resolved", value: resolvedCases, icon: CheckCircle, color: "text-green-400" },
        { label: "Open", value: openCases, icon: ShieldCheck, color: "text-yellow-400" },
    ];

    // Transform data for charts
    const riskChartData = casesByRiskLevel.map((r) => ({
        name: r._id,
        value: r.count,
        fill: RISK_COLORS[r._id] || "#64748b",
    }));

    const categoryChartData = casesByFraudCategory.map((c) => ({
        name: c._id,
        cases: c.count,
    }));

    const trendChartData = highRiskTrend.map((t) => ({
        date: t._id,
        cases: t.count,
    }));

    return (
        <div>
            <h2 className="text-2xl text-white font-semibold mb-6">Analytics</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((s, i) => (
                    <Card key={i}>
                        <div className="flex items-center gap-3">
                            <s.icon size={22} className={s.color} />
                            <div>
                                <p className="text-slate-400 text-xs">{s.label}</p>
                                <p className="text-white text-2xl font-bold">{s.value}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* High Risk Trend */}
                {trendChartData.length > 0 && (
                    <Card>
                        <h3 className="text-white font-semibold mb-4">High Risk Cases (Last 7 Days)</h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={trendChartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={12} />
                                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
                                <Line type="monotone" dataKey="cases" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444", r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                )}

                {/* Risk Pie */}
                {riskChartData.length > 0 && (
                    <Card>
                        <h3 className="text-white font-semibold mb-4">Risk Distribution</h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={riskChartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {riskChartData.map((entry, i) => (
                                        <Cell key={i} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                )}

                {/* Category Bar */}
                {categoryChartData.length > 0 && (
                    <Card className="lg:col-span-2">
                        <h3 className="text-white font-semibold mb-4">Cases by Fraud Category</h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={categoryChartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={12} />
                                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
                                <Bar dataKey="cases" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default AnalyticsContainer;
