import React, { useState, useEffect } from "react";
import { Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/auth/authThunk";
import { actionNotifier } from "../../components/ui/toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            actionNotifier.error("Please fill in all fields");
            return;
        }

        const result = await dispatch(login({ email, password }));
        if (login.fulfilled.match(result)) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B1120] relative overflow-hidden p-4">

            {/* Background Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-900/30 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl" />

            {/* Login Card */}
            <div
                className={`
                    relative w-full max-w-md bg-slate-900/60 backdrop-blur-xl 
                    border border-white/10 rounded-2xl shadow-2xl shadow-black/50
                    transform transition-all duration-700 ease-out
                    ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
                `}
            >
                <div className="p-8">

                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 mb-4 shadow-lg shadow-cyan-500/30 animate-pulse">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-sm text-cyan-400 font-medium tracking-wide uppercase">
                            Protecting You from Intelligent Fraud
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* Email Field */}
                        <div className="group">
                            <label className="block text-sm font-medium text-slate-400 mb-1 group-focus-within:text-cyan-400 transition-colors">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="group">
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-medium text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                                    Password
                                </label>
                                <a href="#" className="text-xs text-cyan-500 hover:text-cyan-300 transition-colors">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button
                            type="submit"
                            className="group w-full flex items-center justify-center py-3.5 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40"
                        >
                            Verify & Login
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-slate-500 text-sm">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                                Sign up securely
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Decorative Bottom Bar */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
            </div>
        </div>
    );
};

export default Login;