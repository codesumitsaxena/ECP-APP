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
    <div style={{ width: "100%", maxWidth: 312, background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", boxShadow: "0 0 48px rgba(0,0,0,0.1)" }}>
      <style>{`
        .ld-card { transition: all 0.18s cubic-bezier(0.34,1.56,0.64,1); cursor: pointer; }
        .ld-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.09) !important; }
        .ld-card:active { transform: scale(0.98); }
        .ld-btn { background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); border: none; cursor: pointer; transition: all 0.2s ease; }
        .ld-btn:hover { box-shadow: 0 10px 28px rgba(37,99,235,0.4); transform: translateY(-1px); }
        @keyframes ldFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .ld-fade { opacity: 0; animation: ldFadeUp 0.4s ease forwards; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "42px 16px 14px", background: "#fff", borderBottom: "1px solid #F1F5F9" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 13 }}>
          <button onClick={() => navigate("learn")} style={{ width: 30, height: 30, borderRadius: 10, background: "#F1F5F9", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.15s" }}>
            <ArrowLeft size={14} color="#374151" strokeWidth={2.5} />
          </button>
          <h1 style={{ fontSize: 14.5, fontWeight: 800, color: "#0F172A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>ECG Waves</h1>
        </div>

        {/* Progress Card */}
        <div style={{ background: "#F8FAFF", borderRadius: 13, padding: "13px 15px", border: "1px solid #E0EAFF" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <p style={{ fontSize: 10.5, fontWeight: 700, color: "#0F172A" }}>Your Progress</p>
            <p style={{ fontSize: 10.5, fontWeight: 800, color: "#2563EB" }}>{progress}% completed</p>
          </div>
          <div style={{ height: 5.5, background: "#DBEAFE", borderRadius: 99, overflow: "hidden", marginBottom: 6 }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #2563EB, #0891B2)", borderRadius: 99, transition: "width 1.2s ease" }} />
          </div>
          <p style={{ fontSize: 9.5, color: "#64748B", fontWeight: 500 }}>Lessons completed: {completed} of {lessons.length}</p>
        </div>
      </div>

      {/* Lessons List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {lessons.map((lesson, i) => {
            const isActive = lesson.status === "active";
            const isDone = lesson.status === "done";
            return (
              <div
                key={lesson.id}
                className={`ld-card ld-fade`}
                style={{
                  animationDelay: `${i * 0.07}s`,
                  background: isActive ? "#F0F7FF" : "#fff",
                  borderRadius: 13,
                  padding: "12px 13px",
                  boxShadow: isActive ? "0 3px 13px rgba(37,99,235,0.1)" : "0 1px 5px rgba(0,0,0,0.05)",
                  border: isActive ? "1.5px solid #BFDBFE" : "1px solid #F1F5F9",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
                onClick={() => isActive ? navigate("lessonContent") : isDone ? navigate("lessonContent") : null}
              >
                {/* Icon */}
                <div style={{
                  width: 35, height: 35, borderRadius: 10,
                  background: isDone ? "#F0FDF4" : isActive ? "#EFF6FF" : "#F8FAFC",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  {isDone && <CheckCircle size={18} color="#22C55E" strokeWidth={2} />}
                  {isActive && <PlayCircle size={18} color="#2563EB" strokeWidth={2} />}
                  {lesson.status === "pending" && <FileText size={16} color="#94A3B8" strokeWidth={1.8} />}
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 10.5, fontWeight: 700, color: isActive ? "#1D4ED8" : isDone ? "#0F172A" : "#64748B", marginBottom: 2, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{lesson.title}</p>
                  <p style={{ fontSize: 9, color: "#94A3B8", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lesson.desc}</p>
                </div>

                {/* Right indicator */}
                {isActive && (
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: "2px solid #2563EB", borderTopColor: "transparent", animation: "spin 1s linear infinite", flexShrink: 0 }} />
                )}
                {isDone && <ChevronRight size={13} color="#CBD5E1" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Button */}
      <div style={{ padding: "10px 13px 28px", background: "#fff", borderTop: "1px solid #F1F5F9" }}>
        <button className="ld-btn" onClick={() => navigate("lessonContent")} style={{ width: "100%", padding: "12px", borderRadius: 11, color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Start Lesson
        </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}