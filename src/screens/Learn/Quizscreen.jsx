import { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";

const questions = [
  { id: 1, question: "What does the QRS complex represent?", options: ["Atrial depolarization", "Ventricular depolarization", "Ventricular repolarization", "Atrial repolarization"], correct: 1 },
  { id: 2, question: "What is the normal duration of the QRS complex?", options: ["0.04 – 0.06 sec", "0.06 – 0.08 sec", "0.08 – 0.12 sec", "0.12 – 0.20 sec"], correct: 2 },
  { id: 3, question: "Which structure is the natural pacemaker of the heart?", options: ["AV Node", "Bundle of His", "SA Node", "Purkinje Fibers"], correct: 2 },
  { id: 4, question: "The PR interval represents conduction through which structure?", options: ["SA Node only", "Bundle of His only", "AV Node to ventricles", "Purkinje fibers"], correct: 2 },
  { id: 5, question: "Which wave on the ECG represents atrial depolarization?", options: ["T wave", "QRS complex", "U wave", "P wave"], correct: 3 },
];

const LABELS = ["A", "B", "C", "D"];

export default function QuizScreen({ navigate }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  const handleSelect = (idx) => { if (!submitted) setSelected(idx); };

  const handleSubmit = () => {
    if (selected === null) return;
    const isCorrect = selected === q.correct;
    const newAnswers = [...answers, { qid: q.id, selected, correct: q.correct, isCorrect }];
    setAnswers(newAnswers);
    setSubmitted(true);
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent((c) => c + 1);
        setSelected(null);
        setSubmitted(false);
      } else {
        navigate("quizResult", newAnswers);
      }
    }, 900);
  };

  return (
    <div style={{ width: "100%", maxWidth: 312, background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", boxShadow: "0 0 48px rgba(0,0,0,0.1)" }}>
      <style>{`
        .qz-opt { transition: all 0.18s cubic-bezier(0.34,1.56,0.64,1); cursor: pointer; border: none; text-align: left; }
        .qz-opt:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.09); }
        .qz-opt:active { transform: scale(0.98); }
        .qz-submit { background: linear-gradient(135deg, #2563EB, #1D4ED8); border: none; cursor: pointer; transition: all 0.2s ease; }
        .qz-submit:hover { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(37,99,235,0.4); }
        .qz-submit:disabled { opacity: 0.45; transform: none; box-shadow: none; cursor: not-allowed; }
        @keyframes qzSlide { from { opacity: 0; transform: translateX(22px); } to { opacity: 1; transform: translateX(0); } }
        .qz-slide { animation: qzSlide 0.32s ease forwards; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "42px 16px 13px", background: "#fff", borderBottom: "1px solid #F1F5F9" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 15 }}>
          <button onClick={() => navigate("interactiveDiagram")} style={{ width: 30, height: 30, borderRadius: 10, background: "#F1F5F9", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ArrowLeft size={14} color="#374151" strokeWidth={2.5} />
          </button>
          <div>
            <h1 style={{ fontSize: 13.5, fontWeight: 800, color: "#0F172A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Module Quiz</h1>
            <p style={{ fontSize: 9.5, color: "#64748B", fontWeight: 500 }}>Test your understanding</p>
          </div>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <p style={{ fontSize: 9, fontWeight: 700, color: "#64748B", letterSpacing: "0.08em", textTransform: "uppercase" }}>Quiz Progress</p>
          <p style={{ fontSize: 9, fontWeight: 700, color: "#64748B", letterSpacing: "0.08em", textTransform: "uppercase" }}>Question {current + 1} / {questions.length}</p>
        </div>
        <div style={{ height: 5, background: "#E2E8F0", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${((current + (submitted ? 1 : 0)) / questions.length) * 100}%`, background: "linear-gradient(90deg, #2563EB, #0891B2)", borderRadius: 99, transition: "width 0.6s ease" }} />
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 13px 20px" }} key={current}>

        {/* Question card */}
        <div className="qz-slide" style={{ background: "#F8FAFF", borderRadius: 14, padding: "16px", marginBottom: 16, border: "1px solid #E0EAFF" }}>
          <p style={{ fontSize: 9, fontWeight: 700, color: "#2563EB", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Question {current + 1} of {questions.length}</p>
          <h2 style={{ fontSize: 14, fontWeight: 800, color: "#0F172A", lineHeight: 1.4, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{q.question}</h2>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {q.options.map((opt, idx) => {
            const isSelected = selected === idx;
            const isCorrect = idx === q.correct;
            let bg = "#fff", border = "#E2E8F0", labelBg = "#F1F5F9", labelColor = "#374151", textColor = "#0F172A";
            if (submitted) {
              if (isCorrect) { bg = "#F0FDF4"; border = "#86EFAC"; labelBg = "#22C55E"; labelColor = "#fff"; textColor = "#14532D"; }
              else if (isSelected && !isCorrect) { bg = "#FFF1F2"; border = "#FDA4AF"; labelBg = "#F43F5E"; labelColor = "#fff"; textColor = "#881337"; }
            } else if (isSelected) {
              bg = "#EFF6FF"; border = "#2563EB"; labelBg = "#2563EB"; labelColor = "#fff"; textColor = "#1D4ED8";
            }
            return (
              <button key={idx} className="qz-opt" onClick={() => handleSelect(idx)}
                style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 11, padding: "11px 13px", display: "flex", alignItems: "center", gap: 10, boxShadow: isSelected ? "0 3px 13px rgba(37,99,235,0.12)" : "0 1px 5px rgba(0,0,0,0.04)", width: "100%" }}>
                <div style={{ width: 27, height: 27, borderRadius: 8, background: labelBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s ease" }}>
                  {submitted && isCorrect ? <CheckCircle size={14} color="#fff" strokeWidth={2.5} /> :
                    <span style={{ fontSize: 10.5, fontWeight: 800, color: labelColor, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{LABELS[idx]}</span>}
                </div>
                <span style={{ fontSize: 11, fontWeight: isSelected ? 700 : 500, color: textColor, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      <div style={{ padding: "10px 13px 28px", background: "#fff", borderTop: "1px solid #F1F5F9" }}>
        <button className="qz-submit" onClick={handleSubmit} disabled={selected === null || submitted}
          style={{ width: "100%", padding: "12px", borderRadius: 11, color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {submitted ? (current < questions.length - 1 ? "Next Question →" : "See Results →") : "Submit Answer"}
        </button>
      </div>
    </div>
  );
}