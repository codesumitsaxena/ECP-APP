import { useState } from "react";
import { Activity, Mail, Lock as LockIcon, Loader2, ArrowRight } from "lucide-react";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("medical@student.edu");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email) { setError("Please enter your email."); return; }
    if (!password) { setError("Please enter your password."); return; }
    setLoading(true); setError("");
    setTimeout(() => { setLoading(false); onLogin(); }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#EEF2F7] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-[#7C3AED]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-[340px] bg-white rounded-[32px] p-8 shadow-2xl shadow-blue-900/10 border border-white relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-[#2563EB] rounded-3xl flex items-center justify-center shadow-xl shadow-blue-200 mb-4 transform hover:scale-105 transition-transform duration-300">
            <Activity size={36} className="text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">ECG Expert</h1>
          <p className="text-xs text-[#64748B] font-medium mt-1">Medical Training & Simulation</p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest ml-1 mb-2 block">Email Address</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] group-focus-within:text-[#2563EB] transition-colors">
                <Mail size={18} strokeWidth={2.5} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 px-11 py-3.5 rounded-2xl text-sm font-medium outline-none transition-all placeholder:text-[#94A3B8]"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest ml-1 mb-2 block">Password</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] group-focus-within:text-[#2563EB] transition-colors">
                <LockIcon size={18} strokeWidth={2.5} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 px-11 py-3.5 rounded-2xl text-sm font-medium outline-none transition-all placeholder:text-[#94A3B8]"
              />
            </div>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-rose-600 text-[11px] font-bold animate-in fade-in zoom-in-95 duration-200">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 bg-[#2563EB] text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:opacity-95 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group mt-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Enter Training
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-[#94A3B8] font-medium leading-relaxed mt-10">
          Professional Tool for Educational Use<br />
          Licensed to Dr. T. Rajini Samuel
        </p>
      </div>
    </div>
  );
}