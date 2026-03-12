import { ArrowLeft, ChevronRight, Lightbulb } from "lucide-react";

const keyPoints = [
  "QRS represents ventricular depolarization",
  "Normal duration < 120 ms",
  "Large amplitude compared to P wave",
];

export default function LessonContent({ navigate }) {
  return (
    <div className="w-full min-h-screen bg-[#EEF2F7] flex flex-col relative">
      <style>{`
        @keyframes lcFade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .lc-fade { opacity: 0; animation: lcFade 0.4s ease forwards; }
      `}</style>

      {/* Header */}
      <div className="px-4 pt-10 pb-4 bg-white border-b border-[#F1F5F9]">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => navigate("lessonDetail")} 
            className="w-8 h-8 rounded-lg bg-[#EEF2F7] flex items-center justify-center text-[#374151] hover:bg-[#E2E8F0] transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
          </button>
          <h1 className="text-lg font-bold text-[#0F172A]">QRS Complex</h1>
        </div>
        {/* Progress bar */}
        <div className="flex justify-between items-center mb-2 px-1">
          <p className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider">Lesson Progress</p>
          <p className="text-[11px] font-bold text-[#64748B]">3 of 5</p>
        </div>
        <div className="h-1.5 bg-[#EEF2F7] rounded-full overflow-hidden">
          <div className="h-full bg-[#2563EB] rounded-full" style={{ width: "60%" }} />
        </div>
      </div>

      {/* Content - Removed flex-grow */}
      <div className="overflow-y-auto px-4 pt-5 pb-4">

        {/* ECG Waveform Illustration */}
        <div className="lc-fade bg-white rounded-2xl p-6 mb-5 border border-[#E2E8F0] shadow-sm flex items-center justify-center" style={{ animationDelay: "0.05s" }}>
          <svg viewBox="0 0 280 80" className="w-full h-16">
            <line x1="0" y1="50" x2="280" y2="50" stroke="#CBD5E1" strokeWidth="1.5" />
            <path d="M20,50 L55,50 Q65,50 70,38 Q75,26 80,38 Q85,50 100,50" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            <text x="70" y="22" fontSize="8" fill="#94A3B8" textAnchor="middle" fontWeight="600">P WAVE</text>
            <path d="M100,50 L120,50 L125,58 L130,58 L145,8 L155,82 L162,50 L175,50" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="145" y="95" fontSize="8" fill="#2563EB" textAnchor="middle" fontWeight="700">QRS COMPLEX</text>
            <path d="M175,50 L195,50 Q205,50 215,30 Q225,10 235,30 Q245,50 260,50" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            <text x="225" y="8" fontSize="8" fill="#94A3B8" textAnchor="middle" fontWeight="600">T WAVE</text>
          </svg>
        </div>

        {/* Title + Text */}
        <div className="lc-fade mb-5 px-1" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">Ventricular Depolarization</h2>
          <p className="text-[13px] text-[#475569] leading-relaxed mb-4">
            The QRS complex represents <strong className="text-[#0F172A]">ventricular depolarization</strong>. It is the largest waveform on the ECG and indicates the electrical activity that causes the ventricles to contract.
          </p>
          <p className="text-[13px] text-[#475569] leading-relaxed">
            Because the ventricular muscle mass is much larger than the atria, the QRS complex has a significantly higher amplitude than the P wave.
          </p>
        </div>

        {/* QRS Duration card */}
        <div className="lc-fade bg-white rounded-2xl p-4 mb-5 border border-[#E2E8F0] shadow-sm flex items-center gap-4" style={{ animationDelay: "0.15s" }}>
          <div className="w-12 h-12 bg-[#EEF2F7] rounded-xl flex items-center justify-center shrink-0">
            <Activity className="text-[#2563EB]" size={24} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider mb-1">QRS Duration</p>
            <p className="text-lg font-bold text-[#0F172A]">0.08 – 0.12 <span className="text-xs text-[#94A3B8] font-medium">sec</span></p>
          </div>
        </div>

        {/* Key Points */}
        <div className="lc-fade bg-white rounded-2xl p-5 border border-[#E2E8F0] mb-0 shadow-sm" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={16} className="text-[#2563EB]" strokeWidth={2.5} />
            <p className="text-sm font-bold text-[#0F172A]">Key Insights</p>
          </div>
          <div className="space-y-3">
            {keyPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                <p className="text-[12px] text-[#475569] font-medium leading-snug">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Area */}
      <div className="px-4 pb-4 bg-[#EEF2F7] mt-auto flex gap-3">
        <button 
          className="flex-1 py-4 bg-white border border-[#E2E8F0] text-[#64748B] font-bold rounded-2xl text-xs active:scale-95 transition-all"
          onClick={() => navigate("lessonDetail")}
        >
          ← Back
        </button>
        <button 
          className="flex-2 py-4 bg-[#2563EB] text-white font-bold rounded-2xl text-xs shadow-lg shadow-blue-100 active:scale-95 transition-all"
          onClick={() => navigate("interactiveDiagram")}
        >
          Next Lesson →
        </button>
      </div>
    </div>
  );
}