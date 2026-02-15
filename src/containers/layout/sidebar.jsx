import { NavLink } from "react-router-dom";
import { LayoutDashboard, FolderSearch, BarChart3, ShieldCheck } from "lucide-react";

const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/cases", label: "Cases", icon: FolderSearch },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
];

const Sidebar = () => {
    return (
        <div className="h-screen w-64 bg-[#0F172A] border-r border-white/10 p-5 hidden md:flex flex-col sticky top-0">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center">
                    <ShieldCheck size={20} className="text-white" />
                </div>
                <h1 className="text-white text-xl font-bold">VibeGuard</h1>
            </div>

            {/* Navigation */}
            <nav className="space-y-1 flex-1">
                {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`
                        }
                    >
                        <Icon size={18} />
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="text-xs text-slate-600 pt-4 border-t border-white/5">
                © 2026 VibeGuard AI
            </div>
        </div>
    );
};

export default Sidebar;
