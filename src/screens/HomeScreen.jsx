// ─── HomeScreen ───────────────────────────────────────────────────────────────

import { useState } from "react";
import CircularProgress from "../components/CircularProgress.jsx";
import ModuleCard from "../components/ModuleCard.jsx";
import QuickToolCard from "../components/QuickToolCard.jsx";
import CaseCard from "../components/CaseCard.jsx";
import CaseModal from "../components/CaseModal.jsx";
import StatRow from "../components/StatRow.jsx";
import { USER, CURRENT_MODULE, QUICK_TOOLS, CLINICAL_CASES } from "../data/appData.js";

export default function HomeScreen({ setActiveTab, onResumeModule }) {
  const [selectedCase, setSelectedCase] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes toastIn { 0% { opacity:0; transform:translateY(20px) scale(0.95); } 100% { opacity:1; transform:translateY(0) scale(1); } }
        .section-block { animation: fadeUp 0.45s ease both; }
      `}</style>

      <div style={{ padding: "16px 14px 0" }}>

        {/* ── Header ── */}
        <div className="section-block" style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", marginBottom: 18, animationDelay: "0ms",
        }}>
          <div>
            <div style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>Welcome back,</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", letterSpacing: -0.4 }}>
              {USER.name}
            </div>
          </div>
          <div
            onClick={() => setActiveTab("settings")}
            style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "linear-gradient(135deg,#BFDBFE,#93C5FD)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 900, color: "#1D4ED8",
              border: "2px solid #fff",
              boxShadow: "0 2px 8px rgba(59,130,246,0.2)",
              cursor: "pointer", letterSpacing: 0.5,
            }}
          >
            {USER.initials}
          </div>
        </div>

        {/* ── Training Completion Card ── */}
        <div className="section-block" style={{
          background: "#fff", borderRadius: 20, padding: "18px 20px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          boxShadow: "0 3px 16px rgba(59,130,246,0.09)", marginBottom: 22,
          border: "1.5px solid #E8F0FE", animationDelay: "60ms",
          background: "linear-gradient(135deg,#fff 60%,#EFF6FF 100%)",
        }}>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#94A3B8", letterSpacing: 1, marginBottom: 3 }}>
              TRAINING COMPLETION
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#0F172A", lineHeight: 1, marginBottom: 5 }}>
              {USER.progress}%
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#22C55E", display: "flex", alignItems: "center", gap: 3 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              +{USER.weeklyGain}% this week
            </div>
          </div>
          <CircularProgress value={USER.progress} />
        </div>

        {/* ── Continue Learning ── */}
        <div className="section-block" style={{ marginBottom: 20, animationDelay: "100ms" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 11 }}>
            <h2 style={{ fontSize: 15, fontWeight: 900, color: "#0F172A", margin: 0 }}>Continue Learning</h2>
            <span
              onClick={() => setActiveTab("learn")}
              style={{ fontSize: 11, color: "#3B82F6", fontWeight: 700, cursor: "pointer" }}
            >
              See all →
            </span>
          </div>
          <ModuleCard
            mod={CURRENT_MODULE}
            onResume={() => {
              onResumeModule();
              showToast("Resuming Module 3…");
            }}
          />
        </div>

        {/* ── Quick Training ── */}
        <div className="section-block" style={{ marginBottom: 20, animationDelay: "140ms" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 11 }}>
            <h2 style={{ fontSize: 15, fontWeight: 900, color: "#0F172A", margin: 0 }}>Quick Training</h2>
            <span
              onClick={() => setActiveTab("train")}
              style={{ fontSize: 11, color: "#3B82F6", fontWeight: 700, cursor: "pointer" }}
            >
              See all →
            </span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {QUICK_TOOLS.map((tool) => (
              <QuickToolCard
                key={tool.id}
                tool={tool}
                onClick={() => {
                  setActiveTab("train");
                  showToast(`Opening ${tool.title}…`);
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="section-block" style={{ marginBottom: 22, animationDelay: "170ms" }}>
          <StatRow stats={USER.stats} />
        </div>

        {/* ── Case of the Day ── */}
        <div className="section-block" style={{ marginBottom: 16, animationDelay: "200ms" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 11 }}>
            <h2 style={{ fontSize: 15, fontWeight: 900, color: "#0F172A", margin: 0 }}>Case of the Day</h2>
            <span
              onClick={() => setActiveTab("cases")}
              style={{ fontSize: 11, color: "#3B82F6", fontWeight: 700, cursor: "pointer" }}
            >
              All cases →
            </span>
          </div>
          <CaseCard
            caseData={CLINICAL_CASES[1]}
            onClick={() => setSelectedCase(CLINICAL_CASES[1])}
          />
        </div>

      </div>

      {/* Case Modal */}
      {selectedCase && (
        <CaseModal
          caseData={selectedCase}
          onClose={() => setSelectedCase(null)}
          onStart={() => {
            setSelectedCase(null);
            setActiveTab("cases");
            showToast("Opening case analysis…");
          }}
        />
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 80, left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(15,23,42,0.9)",
          backdropFilter: "blur(12px)",
          color: "#fff", padding: "8px 18px",
          borderRadius: 22, fontSize: 11, fontWeight: 600,
          zIndex: 400, whiteSpace: "nowrap",
          animation: "toastIn 0.3s ease",
          boxShadow: "0 3px 16px rgba(0,0,0,0.2)",
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}