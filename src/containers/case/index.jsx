import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/card";
import StatusBadge from "../../components/status-badge";
import { fetchCases, updateCaseStatus } from "../../store/slices/cases/casesThunk";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const statusOptions = ["Open", "Under Investigation", "Resolved"];

const CasesContainer = () => {
    const dispatch = useDispatch();
    const { cases, pagination, isLoading } = useSelector((state) => state.Cases);

    const [filterRisk, setFilterRisk] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        loadCases();
    }, [filterRisk, filterStatus, currentPage]);

    const loadCases = () => {
        const params = { page: currentPage, limit: 10 };
        if (filterRisk) params.riskLevel = filterRisk;
        if (filterStatus) params.status = filterStatus;
        if (search.trim()) params.search = search.trim();
        dispatch(fetchCases(params));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        loadCases();
    };

    const handleStatusChange = (id, status) => {
        dispatch(updateCaseStatus({ id, status }));
    };

    return (
        <div>
            <h2 className="text-2xl text-white font-semibold mb-6">Cases</h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-4">
                <form onSubmit={handleSearch} className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search cases..."
                        className="w-full bg-[#0F172A] text-slate-300 border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-sm focus:border-cyan-400 outline-none"
                    />
                </form>
                <select
                    value={filterRisk}
                    onChange={(e) => { setFilterRisk(e.target.value); setCurrentPage(1); }}
                    className="bg-[#0F172A] text-slate-300 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:border-cyan-400 outline-none"
                >
                    <option value="">All Risk Levels</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <select
                    value={filterStatus}
                    onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                    className="bg-[#0F172A] text-slate-300 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:border-cyan-400 outline-none"
                >
                    <option value="">All Statuses</option>
                    {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/10 text-slate-400">
                                <th className="py-3 px-3">ID</th>
                                <th className="py-3 px-3">Text</th>
                                <th className="py-3 px-3">Category</th>
                                <th className="py-3 px-3">Score</th>
                                <th className="py-3 px-3">Risk</th>
                                <th className="py-3 px-3">Status</th>
                                <th className="py-3 px-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-slate-500">Loading...</td>
                                </tr>
                            ) : cases.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-slate-500">No cases found</td>
                                </tr>
                            ) : (
                                cases.map((c) => (
                                    <tr key={c._id} className="border-b border-white/5 text-slate-300 hover:bg-white/5 transition">
                                        <td className="py-3 px-3 text-slate-500 font-mono text-xs">{c._id?.slice(0, 8)}</td>
                                        <td className="py-3 px-3 max-w-xs truncate">{c.inputText}</td>
                                        <td className="py-3 px-3 text-cyan-400 text-xs">{c.fraudCategory}</td>
                                        <td className="py-3 px-3 font-semibold">{c.confidenceScore}%</td>
                                        <td className="py-3 px-3"><StatusBadge status={c.riskLevel} /></td>
                                        <td className="py-3 px-3"><StatusBadge status={c.status} /></td>
                                        <td className="py-3 px-3">
                                            <select
                                                value={c.status}
                                                onChange={(e) => handleStatusChange(c._id, e.target.value)}
                                                className="bg-[#0F172A] text-slate-300 border border-gray-700 rounded-lg px-2 py-1 text-xs focus:border-cyan-400 outline-none"
                                            >
                                                {statusOptions.map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                        <p className="text-xs text-slate-500">
                            Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalCount} total)
                        </p>
                        <div className="flex gap-2">
                            <button
                                disabled={currentPage <= 1}
                                onClick={() => setCurrentPage((p) => p - 1)}
                                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                disabled={currentPage >= pagination.totalPages}
                                onClick={() => setCurrentPage((p) => p + 1)}
                                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default CasesContainer;
