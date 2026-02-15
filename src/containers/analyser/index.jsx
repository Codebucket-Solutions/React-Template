import React, { useState } from "react";
import Card from "../../components/card";
import { ShieldAlert, AlertTriangle, CheckCircle, FileText, ArrowRight } from "lucide-react";

const dummyResult = {
    fraudCategory: "UPI Fraud / Phishing",
    riskLevel: "High",
    confidenceScore: 95,
    reasoning: "This message uses impersonation tactics and creates urgency to extract sensitive financial information. Legitimate banks never ask for UPI PIN or OTP via calls/messages.",
    suggestedReply: "I will verify this directly with my bank. I am reporting this number to the cyber crime helpline.",
    firDraft: "I received a fraudulent message/call from an individual impersonating a bank official, demanding my UPI PIN and OTP under threat of account suspension.",
    actionSteps: [
        "Do not share any OTP, PIN, or password",
        "Block the phone number immediately",
        "Report on cybercrime.gov.in",
        "Inform your bank's customer care"
    ],
    estimatedFinancialImpact: "Potential loss of entire bank balance",
};

const riskColors = {
    High: "text-red-400 bg-red-500/10 border-red-500/30",
    Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
    Low: "text-green-400 bg-green-500/10 border-green-500/30",
};

const PublicAnalyzer = () => {
    const [text, setText] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = () => {
        if (!text.trim() || text.trim().length < 10) return;
        setLoading(true);
        // Simulate API delay with dummy data
        setTimeout(() => {
            setResult(dummyResult);
            setLoading(false);
        }, 1500);
    };

    return (
        <div>
            <h2 className="text-2xl text-white font-semibold mb-6">AI Fraud Text Analyzer</h2>

            <Card>
                <textarea
                    rows={5}
                    className="w-full bg-[#0F172A] text-white p-4 rounded-xl border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition resize-none"
                    placeholder="Paste suspicious message here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    onClick={handleAnalyze}
                    disabled={loading || text.trim().length < 10}
                    className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold transform hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {loading ? "Analyzing..." : "Analyze Text"}
                </button>
            </Card>

            {result && (
                <div className="mt-6 space-y-4 animate-[fadeIn_0.5s_ease-out]">
                    {/* Risk Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card className={`border ${riskColors[result.riskLevel]}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <ShieldAlert size={18} />
                                <span className="text-sm text-slate-400">Risk Level</span>
                            </div>
                            <p className="text-xl font-bold">{result.riskLevel}</p>
                        </Card>
                        <Card>
                            <div className="flex items-center gap-2 mb-1">
                                <AlertTriangle size={18} className="text-yellow-400" />
                                <span className="text-sm text-slate-400">Confidence</span>
                            </div>
                            <p className="text-xl font-bold text-white">{result.confidenceScore}%</p>
                        </Card>
                        <Card>
                            <div className="flex items-center gap-2 mb-1">
                                <FileText size={18} className="text-cyan-400" />
                                <span className="text-sm text-slate-400">Category</span>
                            </div>
                            <p className="text-lg font-bold text-white">{result.fraudCategory}</p>
                        </Card>
                    </div>

                    {/* Reasoning */}
                    <Card>
                        <h3 className="text-white font-semibold mb-2">Analysis</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">{result.reasoning}</p>
                    </Card>

                    {/* Action Steps */}
                    <Card>
                        <h3 className="text-white font-semibold mb-3">Recommended Actions</h3>
                        <ul className="space-y-2">
                            {result.actionSteps.map((step, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                    <ArrowRight size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Suggested Reply & FIR */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <h3 className="text-white font-semibold mb-2">Suggested Reply</h3>
                            <p className="text-slate-300 text-sm">{result.suggestedReply}</p>
                        </Card>
                        <Card>
                            <h3 className="text-white font-semibold mb-2">FIR Draft</h3>
                            <p className="text-slate-300 text-sm">{result.firDraft}</p>
                        </Card>
                    </div>

                    {/* Financial Impact */}
                    <Card className="border border-red-500/20">
                        <div className="flex items-center gap-2">
                            <AlertTriangle size={18} className="text-red-400" />
                            <span className="text-sm text-slate-400">Estimated Financial Impact</span>
                        </div>
                        <p className="text-red-400 font-semibold mt-1">{result.estimatedFinancialImpact}</p>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default PublicAnalyzer;
