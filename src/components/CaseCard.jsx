import MiniECG from "./MiniECG.jsx";

export default function CaseCard({ caseData, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-start">
        <div>
          <div className="text-sm font-bold text-[#0F172A] leading-tight">{caseData.title}</div>
          <div className="text-[10px] text-[#94A3B8] mt-1 font-medium">{caseData.sub}</div>
        </div>
        <span 
          className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ml-2"
          style={{ background: caseData.tagBg, color: caseData.tagColor }}
        >
          {caseData.tag}
        </span>
      </div>

      {/* ECG Component */}
      <div className="bg-[#FFF9F2] border-y border-[#E2E8F0]/50">
        <MiniECG />
      </div>

      {/* Footer */}
      <div className="px-4 py-3 flex justify-between items-center bg-[#F8FAFC]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: caseData.tagColor }} />
          <span className="text-[11px] font-bold text-[#64748B]">Angle: {caseData.angle}</span>
        </div>
        <div className="flex items-center gap-1 text-[#2563EB] text-[11px] font-bold">
          Analyze Case
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
