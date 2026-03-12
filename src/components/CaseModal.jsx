import { useEffect } from "react";
import MiniECG from "./MiniECG.jsx";

export default function CaseModal({ caseData, onClose, onStart }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-[#0F172A]/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <style>{`
        @keyframes slideUp { from { transform:translateY(100%); } to { transform:translateY(0); } }
      `}</style>

      <div
        className="w-full max-w-sm bg-white rounded-t-3xl pt-2 pb-8 px-5 max-h-[90vh] overflow-y-auto"
        style={{ animation: "slideUp 0.3s cubic-bezier(0.34, 1.1, 0.64, 1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="w-12 h-1.5 bg-[#E2E8F0] rounded-full mx-auto my-3" />

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 mr-4">
            <h3 className="text-lg font-bold text-[#0F172A] leading-tight mb-1">
              {caseData.title}
            </h3>
            <p className="text-xs text-[#64748B] font-medium">{caseData.sub}</p>
          </div>
          <span 
            className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shrink-0"
            style={{ background: caseData.tagBg, color: caseData.tagColor }}
          >
            {caseData.tag}
          </span>
        </div>

        {/* ECG Preview */}
        <div className="bg-[#FFF9F2] rounded-2xl border border-[#E2E8F0] overflow-hidden mb-5">
          <MiniECG />
        </div>

        {/* Description */}
        <div className="bg-[#EEF2F7] rounded-2xl p-4 text-xs leading-relaxed text-[#475569] border border-[#E2E8F0] mb-5">
          {caseData.description}
        </div>

        {/* Findings Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {caseData.findings.map(([k, v]) => (
            <div key={k} className="bg-[#F8FAFC] rounded-2xl p-3 border border-[#E2E8F0]">
              <div className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider mb-1">{k}</div>
              <div className="text-sm font-bold text-[#0F172A]">{v}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 py-3 text-sm font-semibold text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl hover:bg-[#F1F5F9] transition-colors"
          >
            Close
          </button>
          <button 
            onClick={onStart} 
            className="flex-[2] py-3 text-sm font-semibold text-white bg-[#2563EB] rounded-xl shadow-lg shadow-blue-200 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            Start Analysis →
          </button>
        </div>
      </div>
    </div>
  );
}
