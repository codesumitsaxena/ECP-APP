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
    <div style={{ width: "100%", maxWidth: 312, background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", boxShadow: "0 0 48px rgba(0,0,0,0.1)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .ls-card { transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1); cursor: pointer; }
        .ls-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important; }
        .ls-card:active { transform: scale(0.98); }
        .ls-resume-btn { background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); transition: all 0.2s ease; border: none; cursor: pointer; }
        .ls-resume-btn:hover { box-shadow: 0 10px 28px rgba(37,99,235,0.4); transform: translateY(-1px); }
        @keyframes lsFadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .ls-fade { opacity: 0; animation: lsFadeUp 0.45s ease forwards; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "42px 16px 16px", background: "linear-gradient(160deg, #EFF6FF 0%, #fff 80%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: 21, fontWeight: 800, color: "#0F172A", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.2 }}>Learn ECG</h1>
            <p style={{ fontSize: 10.5, color: "#64748B", marginTop: 2, fontWeight: 500 }}>Study ECG concepts step-by-step</p>
          </div>
          <div style={{ width: 35, height: 35, borderRadius: "50%", background: "linear-gradient(135deg, #BFDBFE, #3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid #DBEAFE" }}>
            <User size={16} color="#1D4ED8" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Scrollable Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 32px" }}>

        {/* Continue Learning */}
        <div style={{ marginBottom: 20, marginTop: 4 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 10, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Continue Learning</p>
          <div className="ls-fade" style={{ animationDelay: "0.05s", background: "#fff", borderRadius: 14, padding: "14px 16px", boxShadow: "0 1.5px 12px rgba(0,0,0,0.07)", border: "1px solid #E2E8F0" }}>
            <p style={{ fontSize: 9, fontWeight: 600, color: "#64748B", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>Chapter 3 of 8</p>
            <h2 style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", marginBottom: 13, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>ECG Leads &amp; Axis Determination</h2>
            <button className="ls-resume-btn" onClick={() => navigate("lessonDetail")} style={{ width: "100%", padding: "11px", borderRadius: 10, color: "#fff", fontSize: 11.5, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.02em" }}>
              Resume Module
            </button>
          </div>
        </div>

        {/* Modules */}
        <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 10, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Learning Modules</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {modules.map((mod, i) => {
            const { Icon } = mod;
            return (
              <div
                key={mod.id}
                className={`ls-card ls-fade`}
                style={{ animationDelay: `${0.06 * i + 0.1}s`, background: "#fff", borderRadius: 13, padding: "11px 13px", boxShadow: "0 1px 6px rgba(0,0,0,0.05)", border: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: 10, opacity: mod.status === "locked" ? 0.75 : 1 }}
                onClick={() => mod.status !== "locked" && navigate("lessonDetail")}
              >
                <div style={{ width: 35, height: 35, borderRadius: 10, background: mod.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={16} color={mod.color} strokeWidth={2} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#0F172A", marginBottom: 2, fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{mod.title}</p>
                  <p style={{ fontSize: 9, color: "#64748B", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{mod.desc}</p>
                  {mod.status === "active" && (
                    <div style={{ marginTop: 6, height: 4, background: "#E2E8F0", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${mod.progress}%`, background: "linear-gradient(90deg, #2563EB, #0891B2)", borderRadius: 99, transition: "width 1s ease" }} />
                    </div>
                  )}
                </div>
                <div style={{ flexShrink: 0 }}>
                  {mod.status === "done" && <CheckCircle size={16} color="#22C55E" strokeWidth={2} />}
                  {mod.status === "active" && (
                    <div style={{ background: "#EFF6FF", borderRadius: 16, padding: "2px 7px" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, color: "#2563EB" }}>{mod.progress}%</span>
                    </div>
                  )}
                  {mod.status === "locked" && <Lock size={13} color="#CBD5E1" strokeWidth={2} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}