// ─── LearnScreen ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { MODULES } from "../data/appData.js";

const statusColors = {
  completed: { bg: "#DCFCE7", color: "#16A34A", label: "✓ Done" },
  active:    { bg: "#EFF6FF", color: "#3B82F6", label: "In Progress" },
  locked:    { bg: "#F1F5F9", color: "#94A3B8", label: "Locked" },
};

export default function LearnScreen() {
  const [expanded, setExpanded] = useState(3);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: "52px 18px 0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div style={{ animation: "fadeUp 0.4s ease" }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", margin: "0 0 4px" }}>Learn</h1>
        <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 24px" }}>8 ECG Theory Divisions</p>

        {/* Progress Overview */}
        <div style={{
          background: "linear-gradient(135deg,#3B82F6,#1D4ED8)",
          borderRadius: 22, padding: "20px 22px", marginBottom: 24,
          color: "#fff",
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.8, marginBottom: 6 }}>OVERALL PROGRESS</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 32, fontWeight: 900 }}>25%</span>
            <span style={{ fontSize: 13, opacity: 0.8 }}>2 of 8 modules done</span>
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,0.25)", borderRadius: 99 }}>
            <div style={{ width: "25%", height: "100%", background: "#fff", borderRadius: 99 }}/>
          </div>
        </div>

        {/* Module List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {MODULES.map((mod, i) => {
            const st = statusColors[mod.status];
            const isExpanded = expanded === mod.number;
            return (
              <div
                key={mod.id}
                onClick={() => mod.status !== "locked" && setExpanded(isExpanded ? null : mod.number)}
                style={{
                  background: "#fff", borderRadius: 20, padding: "18px 18px",
                  border: `1.5px solid ${mod.status === "active" ? "#BFDBFE" : "#E2E8F0"}`,
                  cursor: mod.status === "locked" ? "default" : "pointer",
                  boxShadow: mod.status === "active" ? "0 4px 16px rgba(59,130,246,0.1)" : "none",
                  opacity: mod.status === "locked" ? 0.6 : 1,
                  transition: "all 0.2s",
                  animation: `fadeUp 0.4s ease ${i * 50}ms both`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 12,
                      background: mod.status === "active" ? "#EFF6FF" : mod.status === "completed" ? "#DCFCE7" : "#F1F5F9",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, fontWeight: 900,
                      color: mod.status === "active" ? "#3B82F6" : mod.status === "completed" ? "#16A34A" : "#94A3B8",
                      flexShrink: 0,
                    }}>
                      {mod.status === "completed" ? "✓" : mod.number}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A", lineHeight: 1.3 }}>{mod.title}</div>
                      <div style={{ marginTop: 4 }}>
                        <span style={{
                          background: st.bg, color: st.color,
                          fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 20,
                        }}>{st.label}</span>
                      </div>
                    </div>
                  </div>
                  {mod.status !== "locked" && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="#94A3B8" strokeWidth="2.5"
                      style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}>
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  )}
                </div>

                {/* Progress bar */}
                {mod.status !== "locked" && (
                  <div style={{ marginTop: 12, height: 4, background: "#EFF6FF", borderRadius: 99 }}>
                    <div style={{ width: `${mod.progress}%`, height: "100%", background: "#3B82F6", borderRadius: 99 }}/>
                  </div>
                )}

                {/* Expanded content */}
                {isExpanded && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1.5px solid #EFF6FF" }}>
                    <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 12px", lineHeight: 1.6 }}>
                      Study the fundamentals of {mod.title.toLowerCase()} using the Cardiac Vector Theory by Dr. T. Rajini Samuel.
                    </p>
                    <button style={{
                      width: "100%", padding: "12px", borderRadius: 12, border: "none",
                      background: mod.status === "completed" ? "#F8FAFC" : "linear-gradient(135deg,#3B82F6,#2563EB)",
                      color: mod.status === "completed" ? "#475569" : "#fff",
                      fontSize: 13, fontWeight: 700, cursor: "pointer",
                      border: mod.status === "completed" ? "1.5px solid #E2E8F0" : "none",
                    }}
                      onClick={(e) => { e.stopPropagation(); alert(`Opening Module ${mod.number}: ${mod.title}`); }}>
                      {mod.status === "completed" ? "Review Module" : "Continue Learning"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}