import { ArrowLeft, CheckCircle, PlayCircle, FileText, ChevronRight } from "lucide-react";

const lessons = [
  { id: 1, title: "Introduction to ECG Waves", desc: "Overview of heart electrical activity", status: "done", type: "read" },
  { id: 2, title: "Understanding the P Wave", desc: "Atrial depolarization and morphology", status: "done", type: "read" },
  { id: 3, title: "QRS Complex Explained", desc: "Ventricular depolarization sequence", status: "active", type: "play" },
  { id: 4, title: "ST Segment and J Point", desc: "Early ventricular repolarization", status: "pending", type: "read" },
  { id: 5, title: "T Wave and Repolarization", desc: "Ventricular repolarization phase", status: "pending", type: "read" },
];

export default function LessonDetail({ navigate }) {
  const completed = lessons.filter((l) => l.status === "done").length;
  const progress = Math.round((completed / lessons.length) * 100);

  return (
    <div className="w-full min-h-screen bg-[#EEF2F7] flex flex-col relative">
      <style>{`
        .ld-card { transition: all 0.18s cubic-bezier(0.34,1.56,0.64,1); cursor: pointer; }
        .ld-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.09) !important; }
        .ld-card:active { transform: scale(0.98); }
        @keyframes ldFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .ld-fade { opacity: 0; animation: ldFadeUp 0.4s ease forwards; }
      `}</style>

      {/* Header */}
      <div className="px-4 pt-10 pb-4 bg-white border-b border-[#F1F5F9]">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => navigate("learn")} 
            className="w-8 h-8 rounded-lg bg-[#EEF2F7] flex items-center justify-center text-[#374151] hover:bg-[#E2E8F0] transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
          </button>
          <h1 className="text-lg font-bold text-[#0F172A]">ECG Waves</h1>
        </div>

        {/* Progress Card */}
        <div className="bg-[#EEF2F7] rounded-2xl p-4 border border-[#E2E8F0]">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider">Your Progress</p>
            <p className="text-[11px] font-bold text-[#2563EB]">{progress}% completed</p>
          </div>
          <div className="h-1.5 bg-white rounded-full mb-2 overflow-hidden">
            <div className="h-full bg-[#2563EB] rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-[10px] text-[#64748B] font-medium">Lessons completed: {completed} of {lessons.length}</p>
        </div>
      </div>

      {/* Lessons List - Removed flex-grow to comply with rule */}
      <div className="overflow-y-auto px-4 pt-4 pb-4">
        <div className="flex flex-col gap-3">
          {lessons.map((lesson, i) => {
            const isActive = lesson.status === "active";
            const isDone = lesson.status === "done";
            return (
              <div
                key={lesson.id}
                className={`ld-card ld-fade bg-white rounded-2xl p-4 shadow-sm border ${isActive ? "border-[#2563EB] bg-[#F8FAFF]" : "border-[#E2E8F0]"} flex items-center gap-3`}
                style={{ animationDelay: `${i * 0.07}s` }}
                onClick={() => (isActive || isDone) && navigate("lessonContent")}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isDone ? "bg-[#EEF2F7]" : isActive ? "bg-[#EEF2F7]" : "bg-[#EEF2F7]"}`}>
                  {isDone && <CheckCircle size={20} className="text-[#10B981]" strokeWidth={2} />}
                  {isActive && <PlayCircle size={20} className="text-[#2563EB]" strokeWidth={2} />}
                  {lesson.status === "pending" && <FileText size={18} className="text-[#94A3B8]" strokeWidth={1.8} />}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold leading-tight ${isActive ? "text-[#2563EB]" : "text-[#0F172A]"}`}>{lesson.title}</p>
                  <p className="text-[11px] text-[#64748B] font-medium mt-1 truncate">{lesson.desc}</p>
                </div>

                {/* Right indicator */}
                {isActive && (
                  <div className="w-5 h-5 rounded-full border-2 border-[#2563EB] border-t-transparent animate-spin shrink-0" />
                )}
                {isDone && <ChevronRight size={16} className="text-[#CBD5E1]" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Button Area - Applied the EEF2F7 bg as requested */}
      <div className="px-4 pb-4 bg-[#EEF2F7] mt-auto">
        <button 
          className="w-full bg-[#2563EB] text-white font-bold py-4 rounded-2xl text-sm shadow-lg shadow-blue-100 active:scale-95 transition-all"
          onClick={() => navigate("lessonContent")}
        >
          Start Lesson
        </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}