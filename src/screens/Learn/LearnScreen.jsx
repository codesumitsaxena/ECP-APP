import { Zap, Activity, Triangle, Calculator, Hexagon, AlertTriangle, Circle, BookOpen, CheckCircle, Lock, ChevronRight, User } from "lucide-react";

const modules = [
  { id: 1, title: "Electrophysiology of the Heart", desc: "Learn how electrical impulses travel through the heart.", Icon: Zap, color: "#2563EB", bg: "#EFF6FF", status: "done", progress: 100, chapter: "Chapter 1 of 8" },
  { id: 2, title: "ECG Waves", desc: "Understand P wave, QRS complex and T wave.", Icon: Activity, color: "#0891B2", bg: "#ECFEFF", status: "active", progress: 40, chapter: "Chapter 2 of 8" },
  { id: 3, title: "ECG Leads", desc: "Learn limb leads and chest leads.", Icon: Triangle, color: "#94A3B8", bg: "#F8FAFC", status: "locked", progress: 0, chapter: "Chapter 3 of 8" },
  { id: 4, title: "Heart Rate Calculation", desc: "Learn ECG heart rate formulas.", Icon: Calculator, color: "#94A3B8", bg: "#F8FAFC", status: "locked", progress: 0, chapter: "Chapter 4 of 8" },
  { id: 5, title: "Cardiac Vector Theory", desc: "Understand electrical vectors and axis.", Icon: Hexagon, color: "#94A3B8", bg: "#F8FAFC", status: "locked", progress: 0, chapter: "Chapter 5 of 8" },
  { id: 6, title: "Lead Misplacement", desc: "Identify ECG changes caused by incorrect electrode.", Icon: AlertTriangle, color: "#94A3B8", bg: "#F8FAFC", status: "locked", progress: 0, chapter: "Chapter 6 of 8" },
  { id: 7, title: "Chest Leads V1–V6", desc: "Learn correct chest lead placement.", Icon: Circle, color: "#94A3B8", bg: "#F8FAFC", status: "locked", progress: 0, chapter: "Chapter 7 of 8" },
  { id: 8, title: "ECG Interpretation", desc: "Step-by-step ECG reading method.", Icon: BookOpen, color: "#94A3B8", bg: "#F8FAFC", status: "locked", progress: 0, chapter: "Chapter 8 of 8" },
];

export default function LearnScreen({ navigate }) {
  return (
    <div className="min-h-screen bg-[#EEF2F7]">
      <style>{`
        .ls-card { transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1); cursor: pointer; }
        .ls-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important; }
        .ls-card:active { transform: scale(0.98); }
        @keyframes lsFadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .ls-fade { opacity: 0; animation: lsFadeUp 0.45s ease forwards; }
      `}</style>

      {/* Header */}
      <div className="px-4 pt-5 pb-4 bg-[#EEF2F7]">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A]">Learn ECG</h1>
            <p className="text-sm text-[#64748B] font-normal">Study ECG concepts step-by-step</p>
          </div>
          <div className="w-10 h-10 bg-white text-[#2563EB] rounded-full flex items-center justify-center font-semibold text-sm cursor-pointer border-2 border-white shadow-sm">
            <User size={20} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="px-4 pb-16 overflow-y-auto flex-1">

        {/* Continue Learning */}
        <div className="mb-5">
          <p className="text-base font-semibold text-[#0F172A] mb-3">Continue Learning</p>
          <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm ls-fade" style={{ animationDelay: "0.05s" }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[#2563EB] bg-[#EEF2F7] px-2 py-0.5 rounded-full">Chapter 3</span>
              <span className="text-xs text-[#94A3B8]">35 mins left</span>
            </div>
            <h2 className="text-base font-semibold text-[#0F172A] mt-1 mb-3">ECG Leads & Axis Determination</h2>
            <div className="bg-[#E2E8F0] h-1 rounded-full mb-3">
              <div className="bg-[#2563EB] h-full w-1/3 rounded-full" />
            </div>
            <button onClick={() => navigate("lessonDetail")} className="bg-[#2563EB] text-white rounded-xl py-3 text-sm font-semibold w-full">
              Resume Module
            </button>
          </div>
        </div>

        {/* Modules */}
        <p className="text-base font-semibold text-[#0F172A] mb-3">Learning Modules</p>
        <div className="flex flex-col gap-3 mb-0">
          {modules.map((mod, i) => {
            const { Icon } = mod;
            return (
              <div
                key={mod.id}
                className={`ls-card bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm flex items-center gap-3 ls-fade ${mod.status === "locked" ? "opacity-60" : ""}`}
                style={{ animationDelay: `${0.06 * i + 0.1}s` }}
                onClick={() => mod.status !== "locked" && navigate("lessonDetail")}
              >
                <div className="w-10 h-10 rounded-xl bg-[#EEF2F7] flex items-center justify-center shrink-0">
                  <Icon size={20} color={mod.color === "#94A3B8" ? "#2563EB" : mod.color} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0F172A] truncate">{mod.title}</p>
                  <p className="text-xs text-[#64748B] truncate">{mod.desc}</p>
                  {mod.status === "active" && (
                    <div className="mt-2 bg-[#E2E8F0] h-1 rounded-full">
                      <div className="bg-[#2563EB] h-full rounded-full" style={{ width: `${mod.progress}%` }} />
                    </div>
                  )}
                </div>
                <div className="shrink-0 ml-1">
                  {mod.status === "done" && <CheckCircle size={18} className="text-[#10B981]" />}
                  {mod.status === "active" && (
                    <div className="bg-[#EEF2F7] px-2 py-0.5 rounded-full ring-1 ring-[#2563EB]/10">
                      <span className="text-[10px] font-bold text-[#2563EB]">{mod.progress}%</span>
                    </div>
                  )}
                  {mod.status === "locked" && <Lock size={16} className="text-[#94A3B8]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}