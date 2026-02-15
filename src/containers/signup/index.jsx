import React, { useState, useEffect } from "react";
import { User, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../store/slices/auth/authThunk";
import { actionNotifier } from "../../components/ui/toast";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, lastName, email, password, confirmPassword } = formData;

        if (!firstName || !lastName || !email || !password) {
            actionNotifier.error("Please fill in all fields");
            return;
        }

        if (password.length < 6) {
            actionNotifier.error("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            actionNotifier.error("Passwords do not match");
            return;
        }

        const result = await dispatch(signup({ firstName, lastName, email, password }));
        if (signup.fulfilled.match(result)) {
            navigate("/");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0B1120] overflow-hidden px-4">

            {/* Background Gradient Blobs */}
            <div className="absolute w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
            <div className="absolute w-96 h-96 bg-blue-600/20 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse"></div>

            <div
                className={`backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                <h2 className="text-2xl font-semibold text-white text-center">
                    Protecting You from Intelligent Fraud
                </h2>
                <p className="text-sm text-gray-400 text-center mt-1">
                    Create your secure AI account
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    {/* First Name */}
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-cyan-400" size={18} />
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="w-full bg-[#0F172A] text-white pl-10 pr-4 py-2 rounded-xl border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition duration-300"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-cyan-400" size={18} />
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="w-full bg-[#0F172A] text-white pl-10 pr-4 py-2 rounded-xl border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition duration-300"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-cyan-400" size={18} />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full bg-[#0F172A] text-white pl-10 pr-4 py-2 rounded-xl border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition duration-300"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-cyan-400" size={18} />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full bg-[#0F172A] text-white pl-10 pr-4 py-2 rounded-xl border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition duration-300"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-cyan-400" size={18} />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            className="w-full bg-[#0F172A] text-white pl-10 pr-4 py-2 rounded-xl border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition duration-300"
                        />
                    </div>

                    {/* CTA Button */}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/50 transform hover:scale-105 active:scale-95 transition duration-300"
                    >
                        Create Secure Account
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-slate-400 text-sm">
                        Already have an account?{" "}
                        <Link to="/" className="text-cyan-400 font-semibold hover:text-white transition-colors">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
