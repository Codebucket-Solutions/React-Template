import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, LogOut, Menu } from "lucide-react";
import { logout } from "../../store/slices/auth/authSlice";

const Navbar = () => {
    const auth = useSelector((state) => state.User?.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="h-16 bg-[#0F172A]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
                <button className="md:hidden text-gray-400 hover:text-white">
                    <Menu size={22} />
                </button>
                <div className="flex items-center gap-2">
                    <ShieldCheck className="text-cyan-400" size={22} />
                    <span className="text-white font-semibold text-lg hidden sm:block">VibeGuard</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-slate-400 text-sm hidden sm:block">
                    {auth?.firstName} {auth?.lastName}
                </span>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm"
                >
                    <LogOut size={18} />
                    <span className="hidden sm:block">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Navbar;
