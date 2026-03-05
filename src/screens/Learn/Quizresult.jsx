import { CheckCircle, XCircle, RotateCcw, ChevronRight, Star } from "lucide-react";

export default function QuizResult({ navigate, answers = [] }) {
  const total = 5;
  const correct = answers.filter((a) => a.isCorrect).length;
  const score = answers.length > 0 ? correct : 4; // fallback demo
  const pct = Math.round((score / total) * 100);

  const demoAnswers = [
    { qid: 1, isCorrect: true },
    { qid: 2, isCorrect: true },
    { qid: 3, isCorrect: true },
    { qid: 4, isCorrect: false },
    { qid: 5, isCorrect: true },
  ];
  const displayAnswers = answers.length === total ? answers : demoAnswers;

  const getMessage = () => {
    if (pct === 100) return { title: "Perfect Score! 🎉", sub: "Outstanding! You've mastered ECG Waves.", color: "#22C55E" };
    if (pct >= 80) return { title: `${score} / ${total} Correct`, sub: "Great job! You understand ECG Waves well.", color: "#2563EB" };
    if (pct >= 60) return { title: `${score} / ${total} Correct`, sub: "Good effort! Review a few concepts.", color: "#F59E0B" };
    return { title: `${score} / ${total} Correct`, sub: "Keep studying — you're making progress.", color: "#F43F5E" };
  };
  const msg = getMessage();

  const ringCircumference = 2 * Math.PI * 48;
  const ringOffset = ringCircumference - (pct / 100) * ringCircumference;

  return (
    <div style={{ width: "100%", maxWidth: 390, background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", boxShadow: "0 0 60px rgba(0,0,0,0.1)" }}>
      <style>{`
        .qr-cont-btn { background: linear-gradient(135deg, #2563EB, #1D4ED8); border: none; cursor: pointer; transition: all 0.2s ease; }
        .qr-cont-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(37,99,235,0.42); }
        .qr-retry-btn { background: #fff; border: 2px solid #2563EB; cursor: pointer; transition: all 0.2s ease; }
        .qr-retry-btn:hover { background: #EFF6FF; transform: translateY(-1px); }
        @keyframes qrFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .qr-fade { opacity: 0; animation: qrFadeUp 0.4s ease forwards; }
        @keyframes ringFill { from { stroke-dashoffset: 301.59; } to { stroke-dashoffset: ${ringOffset}; } }
        .ring-anim { stroke-dasharray: ${ringCircumference}; stroke-dashoffset: ${ringCircumference}; animation: ringFill 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards; }
        @keyframes countUp { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }
        .count-anim { animation: countUp 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.5s both; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "52px 20px 16px", borderBottom: "1px solid #F1F5F9" }}>
        <h1 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Quiz Result</h1>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 28px" }}>

        {/* Score Card */}
        <div className="qr-fade" style={{ animationDelay: "0.05s", background: "#fff", borderRadius: 20, padding: "28px 20px", marginBottom: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid #F1F5F9", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          {/* SVG Ring */}
          <div style={{ position: "relative", width: 120, height: 120, marginBottom: 16 }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="48" fill="none" stroke="#F1F5F9" strokeWidth="10" />
              <circle cx="60" cy="60" r="48" fill="none" stroke={msg.color} strokeWidth="10" strokeLinecap="round" className="ring-anim" transform="rotate(-90 60 60)" />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span className="count-anim" style={{ fontSize: 28, fontWeight: 900, color: msg.color, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1 }}>{pct}%</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: "#94A3B8", marginTop: 2 }}>score</span>
            </div>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: msg.color, marginBottom: 6, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{msg.title}</h2>
          <p style={{ fontSize: 13, color: "#64748B", fontWeight: 500, maxWidth: 260, lineHeight: 1.6 }}>{msg.sub}</p>

          {/* Stars */}
          <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={18} fill={s <= Math.round(score / total * 5) ? "#FBBF24" : "none"} color={s <= Math.round(score / total * 5) ? "#FBBF24" : "#E2E8F0"} strokeWidth={1.5} />
            ))}
          </div>
        </div>

        {/* Performance Breakdown */}
        <div className="qr-fade" style={{ animationDelay: "0.12s", background: "#fff", borderRadius: 18, padding: "18px 20px", marginBottom: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F1F5F9" }}>
          <p style={{ fontSize: 14, fontWeight: 800, color: "#0F172A", marginBottom: 14, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Performance Breakdown</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {displayAnswers.map((a, i) => (
              <div key={a.qid} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: i < displayAnswers.length - 1 ? "1px solid #F8FAFC" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: a.isCorrect ? "#F0FDF4" : "#FFF1F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {a.isCorrect ? <CheckCircle size={16} color="#22C55E" strokeWidth={2.5} /> : <XCircle size={16} color="#F43F5E" strokeWidth={2.5} />}
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Q{a.qid}</p>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: a.isCorrect ? "#22C55E" : "#F43F5E" }}>
                  {a.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Review */}
        {score < total && (
          <div className="qr-fade" style={{ animationDelay: "0.2s", background: "#F0F9FF", borderRadius: 16, padding: "16px", border: "1px solid #BAE6FD", marginBottom: 4 }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#0891B2", marginBottom: 5, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Suggested Review</p>
            <p style={{ fontSize: 13, color: "#0C4A6E", lineHeight: 1.6, fontWeight: 400 }}>You may want to review the <strong>ST Segment</strong> lesson again to strengthen your understanding.</p>
            <button onClick={() => navigate("lessonContent")} style={{ marginTop: 10, background: "none", border: "none", color: "#0891B2", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Go to lesson <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div style={{ padding: "12px 16px 36px", background: "#fff", borderTop: "1px solid #F1F5F9", display: "flex", flexDirection: "column", gap: 10 }}>
        <button className="qr-cont-btn" onClick={() => navigate("learn")} style={{ width: "100%", padding: "15px", borderRadius: 14, color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Continue Learning
        </button>
        <button className="qr-retry-btn" onClick={() => navigate("quiz")} style={{ width: "100%", padding: "14px", borderRadius: 14, fontSize: 15, fontWeight: 700, color: "#2563EB", fontFamily: "'Plus Jakarta Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <RotateCcw size={16} color="#2563EB" strokeWidth={2.5} />
          Retry Quiz
        </button>
      </div>
    </div>
  );
}