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
    <div className="min-h-screen bg-[#EEF2F7]">
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes toastIn { 0% { opacity:0; transform:translateY(20px) scale(0.95); } 100% { opacity:1; transform:translateY(0) scale(1); } }
        .section-block { animation: fadeUp 0.45s ease both; }
      `}</style>

      <div className="px-4 pt-5 pb-0">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-5 section-block" style={{ animationDelay: "0ms" }}>
          <div>
            <p className="text-sm text-[#64748B] font-normal">Welcome back,</p>
            <h1 className="text-2xl font-bold text-[#0F172A]">{USER.name}</h1>
          </div>
          <div
            onClick={() => setActiveTab("settings")}
            className="w-10 h-10 bg-white text-[#2563EB] rounded-full flex items-center justify-center font-semibold text-sm cursor-pointer border-2 border-white shadow-sm"
          >
            {USER.initials}
          </div>
        </div>

        {/* ── Training Completion Card ── */}
        <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm mb-5 flex items-center justify-between section-block" style={{ animationDelay: "60ms" }}>
          <div>
            <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">TRAINING COMPLETION</p>
            <h2 className="text-4xl font-bold text-[#0F172A] leading-tight mb-1">{USER.progress}%</h2>
            <div className="text-xs text-[#10B981] font-medium flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              +{USER.weeklyGain}% this week
            </div>
          </div>
          <CircularProgress value={USER.progress} />
        </div>

        {/* ── Continue Learning ── */}
        <div className="mb-5 section-block" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-[#0F172A]">Continue Learning</h2>
            <button
              onClick={() => setActiveTab("learn")}
              className="text-sm text-[#2563EB] font-medium"
            >
              See all
            </button>
          </div>
          <ModuleCard
            mod={CURRENT_MODULE}
            onResume={() => {
              onResumeModule();
              showToast("Resuming Module…");
            }}
          />
        </div>

        {/* ── Quick Training ── */}
        <div className="mb-5 section-block" style={{ animationDelay: "140ms" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-[#0F172A]">Quick Training</h2>
            <button
              onClick={() => setActiveTab("train")}
              className="text-sm text-[#2563EB] font-medium"
            >
              See all
            </button>
          </div>
          <div className="flex gap-3">
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
        <div className="mb-5 section-block" style={{ animationDelay: "170ms" }}>
          <StatRow stats={USER.stats} />
        </div>

        {/* ── Case of the Day ── */}
        <div className="mb-0 section-block" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-[#0F172A]">Case of the Day</h2>
            <button
              onClick={() => setActiveTab("cases")}
              className="text-sm text-[#2563EB] font-medium"
            >
              All cases
            </button>
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
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#0F172A]/90 backdrop-blur-md text-white px-5 py-2 rounded-full text-xs font-semibold z-[100] whitespace-nowrap shadow-lg" style={{ animation: "toastIn 0.3s ease" }}>
          {toast}
        </div>
      )}
    </div>
  );
}