const StatusBadge = ({ status }) => {
    const colors = {
        // Risk levels
        High: "bg-red-500/20 text-red-400",
        Medium: "bg-yellow-500/20 text-yellow-400",
        Low: "bg-green-500/20 text-green-400",
        // Case statuses
        Open: "bg-blue-500/20 text-blue-400",
        "Under Investigation": "bg-orange-500/20 text-orange-400",
        Resolved: "bg-green-500/20 text-green-400",
        Pending: "bg-yellow-500/20 text-yellow-400",
        Reviewed: "bg-cyan-500/20 text-cyan-400",
        Flagged: "bg-red-500/20 text-red-400",
    };

    return (
        <span className={`px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap ${colors[status] || "bg-slate-500/20 text-slate-400"}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
