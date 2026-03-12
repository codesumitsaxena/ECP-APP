import { ArrowLeft, ChevronRight, Lightbulb } from "lucide-react";

const keyPoints = [
  "QRS represents ventricular depolarization",
  "Normal duration < 120 ms",
  "Large amplitude compared to P wave",
];

export default function LessonContent({ navigate }) {
  return (
    <div style={{ width: "100%", maxWidth: 312, background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", boxShadow: "0 0 48px rgba(0,0,0,0.1)" }}>
      <style>{`
        .lc-prev-btn { background: #F1F5F9; border: none; cursor: pointer; transition: all 0.18s ease; }
        .lc-prev-btn:hover { background: #E2E8F0; transform: translateY(-1px); }
        .lc-next-btn { background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); border: none; cursor: pointer; transition: all 0.2s ease; }
        .lc-next-btn:hover { box-shadow: 0 10px 28px rgba(37,99,235,0.4); transform: translateY(-1px); }
        @keyframes lcFade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .lc-fade { opacity: 0; animation: lcFade 0.4s ease forwards; }
        .lc-pulse-dot { animation: pulseDot 1.6s ease-in-out infinite; }
        @keyframes pulseDot { 0%,100% { opacity: 0.4; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1.05); } }
      `}</style>

      {/* Header */}
      <div style={{ padding: "42px 16px 13px", background: "#fff", borderBottom: "1px solid #F1F5F9" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 15 }}>
          <button onClick={() => navigate("lessonDetail")} style={{ width: 30, height: 30, borderRadius: 10, background: "#F1F5F9", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ArrowLeft size={14} color="#374151" strokeWidth={2.5} />
          </button>
          <h1 style={{ fontSize: 13.5, fontWeight: 800, color: "#0F172A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>QRS Complex Explained</h1>
        </div>
        {/* Progress bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#0F172A" }}>Lesson Progress</p>
          <p style={{ fontSize: 10, fontWeight: 600, color: "#64748B" }}>Lesson 3 of 5</p>
        </div>
        <div style={{ height: 5, background: "#E2E8F0", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: "60%", background: "linear-gradient(90deg, #2563EB, #0891B2)", borderRadius: 99 }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 13px 20px" }}>

        {/* ECG Waveform Illustration */}
        <div className="lc-fade" style={{ animationDelay: "0.05s", background: "#F8FAFF", borderRadius: 14, padding: "16px 13px", marginBottom: 16, border: "1px solid #E0EAFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg viewBox="0 0 280 80" style={{ width: "100%", height: 64 }}>
            <line x1="0" y1="50" x2="280" y2="50" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* P wave */}
            <path d="M20,50 L55,50 Q65,50 70,38 Q75,26 80,38 Q85,50 100,50" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            <text x="70" y="22" fontSize="8" fill="#94A3B8" textAnchor="middle" fontWeight="600">P WAVE</text>
            <line x1="70" y1="25" x2="70" y2="38" stroke="#94A3B8" strokeWidth="0.8" strokeDasharray="2,2" />
            {/* QRS */}
            <path d="M100,50 L120,50 L125,58 L130,58 L145,8 L155,82 L162,50 L175,50" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="145" y="95" fontSize="8" fill="#2563EB" textAnchor="middle" fontWeight="700">QRS COMPLEX</text>
            <line x1="120" y1="65" x2="162" y2="65" stroke="#2563EB" strokeWidth="0.8" strokeDasharray="2,2" />
            {/* T wave */}
            <path d="M175,50 L195,50 Q205,50 215,30 Q225,10 235,30 Q245,50 260,50" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            <text x="225" y="8" fontSize="8" fill="#94A3B8" textAnchor="middle" fontWeight="600">T WAVE</text>
            <line x1="225" y1="10" x2="225" y2="30" stroke="#94A3B8" strokeWidth="0.8" strokeDasharray="2,2" />
          </svg>
        </div>

        {/* Title + Text */}
        <div className="lc-fade" style={{ animationDelay: "0.1s", marginBottom: 13 }}>
          <h2 style={{ fontSize: 17.5, fontWeight: 800, color: "#0F172A", marginBottom: 10, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>QRS Complex</h2>
          <p style={{ fontSize: 11.5, color: "#475569", lineHeight: 1.75, fontWeight: 400, marginBottom: 10 }}>
            The QRS complex represents <strong style={{ color: "#0F172A" }}>ventricular depolarization</strong>. It is the largest waveform on the ECG and indicates the electrical activity that causes the ventricles to contract.
          </p>
          <p style={{ fontSize: 11.5, color: "#475569", lineHeight: 1.75, fontWeight: 400 }}>
            Because the ventricular muscle mass is much larger than the atria, the QRS complex has a significantly higher amplitude than the P wave.
          </p>
        </div>

        {/* QRS Duration card */}
        <div className="lc-fade" style={{ animationDelay: "0.15s", background: "#F8FAFF", borderRadius: 13, padding: "14px", marginBottom: 13, border: "1px solid #E0EAFF", display: "flex", alignItems: "center", gap: 13 }}>
          <div style={{ background: "#EFF6FF", borderRadius: 10, padding: "8px", flexShrink: 0 }}>
            <svg viewBox="0 0 60 60" width="42" height="42">
              <line x1="5" y1="35" x2="55" y2="35" stroke="#BFDBFE" strokeWidth="2" />
              <path d="M8,35 L20,35 L23,42 L25,42 L32,5 L38,58 L41,35 L52,35" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="20" y1="45" x2="41" y2="45" stroke="#2563EB" strokeWidth="1.2" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
              <text x="30" y="54" fontSize="6" fill="#2563EB" textAnchor="middle" fontWeight="700">QRS Duration</text>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 10.5, fontWeight: 700, color: "#1D4ED8", marginBottom: 2 }}>QRS Duration</p>
            <p style={{ fontSize: 17.5, fontWeight: 800, color: "#0F172A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>0.08 – 0.12<span style={{ fontSize: 10.5, fontWeight: 600, color: "#64748B" }}> sec</span></p>
            <p style={{ fontSize: 9, color: "#64748B", fontWeight: 500 }}>Normal range in adults</p>
          </div>
        </div>

        {/* Key Points */}
        <div className="lc-fade" style={{ animationDelay: "0.2s", background: "#F0F9FF", borderRadius: 13, padding: "14px", border: "1px solid #BAE6FD" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 11 }}>
            <Lightbulb size={13} color="#0891B2" strokeWidth={2} />
            <p style={{ fontSize: 10.5, fontWeight: 800, color: "#0891B2", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Key Points</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {keyPoints.map((point, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <div style={{ width: 5.5, height: 5.5, borderRadius: "50%", background: "#0891B2", marginTop: 4, flexShrink: 0 }} />
                <p style={{ fontSize: 10.5, color: "#0C4A6E", fontWeight: 600, lineHeight: 1.5 }}>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{ padding: "10px 13px 28px", background: "#fff", borderTop: "1px solid #F1F5F9", display: "flex", gap: 8 }}>
        <button className="lc-prev-btn" onClick={() => navigate("lessonDetail")} style={{ flex: 1, padding: "11px", borderRadius: 11, fontSize: 11, fontWeight: 700, color: "#374151", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          ← Previous
        </button>
        <button className="lc-next-btn" onClick={() => navigate("interactiveDiagram")} style={{ flex: 2, padding: "11px", borderRadius: 11, color: "#fff", fontSize: 11, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Next Lesson →
        </button>
      </div>
    </div>
  );
}