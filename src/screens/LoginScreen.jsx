// ─── LoginScreen ──────────────────────────────────────────────────────────────

import { useState } from "react";
import ECGBackground from "../components/ECGBackground.jsx";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("medical@student.edu");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusField, setFocusField] = useState(null);

  const handleLogin = () => {
    if (!email) { setError("Please enter your email."); return; }
    if (!password) { setError("Please enter your password."); return; }
    setLoading(true); setError("");
    setTimeout(() => { setLoading(false); onLogin(); }, 1400);
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "13px 16px",
    borderRadius: 14,
    border: `1.8px solid ${focusField === field ? "#3B82F6" : "#E2E8F0"}`,
    background: focusField === field ? "#F0F6FF" : "#F8FAFC",
    fontSize: 14, color: "#0F172A", outline: "none",
    boxSizing: "border-box",
    transition: "border 0.2s, background 0.2s",
    fontFamily: "'DM Sans', sans-serif",
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg,#EEF2F8 0%,#E8F0FE 50%,#F0F4FF 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      position: "relative", overflow: "hidden",
      padding: "20px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes cardIn { from { opacity:0; transform:translateY(32px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes logoSpin { 0%,100% { transform:rotate(-3deg) scale(1); } 50% { transform:rotate(3deg) scale(1.04); } }
        @keyframes pulse { 0%,100% { box-shadow:0 4px 20px rgba(59,130,246,0.3); } 50% { box-shadow:0 4px 32px rgba(59,130,246,0.55); } }
        .login-btn:hover { transform:translateY(-1px) !important; }
        .login-btn:active { transform:scale(0.97) !important; }
      `}</style>

      <ECGBackground />

      {/* Blobs */}
      <div style={{ position:"absolute", top:"-80px", right:"-80px", width:260, height:260, borderRadius:"50%", background:"rgba(59,130,246,0.07)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"-60px", left:"-60px", width:200, height:200, borderRadius:"50%", background:"rgba(37,99,235,0.06)", pointerEvents:"none" }}/>

      <div style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: 28, padding: "40px 32px 32px",
        width: "100%", maxWidth: 360,
        boxShadow: "0 20px 60px rgba(59,130,246,0.13), 0 4px 16px rgba(0,0,0,0.05)",
        border: "1.5px solid rgba(255,255,255,0.8)",
        position: "relative", zIndex: 1,
        animation: "cardIn 0.55s cubic-bezier(0.34,1.1,0.64,1) forwards",
      }}>

        {/* App Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{
            width: 70, height: 70, borderRadius: 22,
            background: "linear-gradient(135deg,#3B82F6,#1D4ED8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 6px 24px rgba(59,130,246,0.4)",
            animation: "pulse 3s ease-in-out infinite",
          }}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <polyline
                points="2,17 6,17 8,9 10,25 12,11 14,22 16,17 19,17 21,9 23,25 25,11 27,22 29,17 32,17"
                stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none"
              />
            </svg>
          </div>
        </div>

        <h1 style={{ textAlign: "center", fontSize: 24, fontWeight: 900, color: "#0F172A", margin: "0 0 4px", letterSpacing: 1.2 }}>
          TTOOLECG
        </h1>
        <p style={{ textAlign: "center", fontSize: 13, color: "#64748B", margin: "0 0 32px", fontWeight: 500 }}>
          ECG Training &amp; Vector Theory
        </p>

        {/* Email */}
        <label style={{ fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: 0.8, display: "block", marginBottom: 7 }}>
          EMAIL
        </label>
        <input
          type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="medical@student.edu"
          style={inputStyle("email")}
          onFocus={() => setFocusField("email")}
          onBlur={() => setFocusField(null)}
        />

        {/* Password */}
        <label style={{ fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: 0.8, display: "block", margin: "18px 0 7px" }}>
          PASSWORD
        </label>
        <input
          type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={inputStyle("password")}
          onFocus={() => setFocusField("password")}
          onBlur={() => setFocusField(null)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        {/* Remember */}
        <div style={{ display: "flex", alignItems: "center", gap: 9, margin: "14px 0 22px" }}>
          <div
            onClick={() => setRemember(!remember)}
            style={{
              width: 18, height: 18, borderRadius: 6, border: `2px solid ${remember ? "#3B82F6" : "#CBD5E1"}`,
              background: remember ? "#3B82F6" : "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s", flexShrink: 0,
            }}
          >
            {remember && (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span style={{ fontSize: 13, color: "#475569", cursor: "pointer" }} onClick={() => setRemember(!remember)}>
            Remember me
          </span>
        </div>

        {error && (
          <div style={{
            background: "#FEF2F2", border: "1.5px solid #FECACA",
            borderRadius: 10, padding: "10px 14px",
            color: "#DC2626", fontSize: 13, fontWeight: 600, marginBottom: 14,
          }}>
            {error}
          </div>
        )}

        {/* Login Button */}
        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%", padding: "15px",
            borderRadius: 16, border: "none",
            background: loading
              ? "linear-gradient(135deg,#93C5FD,#60A5FA)"
              : "linear-gradient(135deg,#3B82F6,#1D4ED8)",
            color: "#fff", fontSize: 15, fontWeight: 800,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 18px rgba(59,130,246,0.38)",
            transition: "all 0.2s",
            letterSpacing: 0.4,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          {loading ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
                style={{ animation: "spin 0.8s linear infinite" }}>
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
              Entering...
            </>
          ) : "Enter Application"}
        </button>

        <p style={{ textAlign: "center", fontSize: 11, color: "#94A3B8", marginTop: 22, lineHeight: 1.7 }}>
          For educational use only.<br />
          Not for clinical diagnosis.
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}