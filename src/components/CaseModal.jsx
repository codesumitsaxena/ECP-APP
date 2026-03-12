
import { useEffect } from "react";
import MiniECG from "./MiniECG.jsx";

export default function CaseModal({ caseData, onClose, onStart }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "flex-end",
        zIndex: 300,
        animation: "fadeIn 0.2s ease",
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes slideUp { from { transform:translateY(100%); } to { transform:translateY(0); } }
      `}</style>

      <div
        style={{
          background: "#fff",
          borderRadius: "22px 22px 0 0",
          padding: "0 0 28px",
          width: "100%",
          maxWidth: 344,
          margin: "0 auto",
          animation: "slideUp 0.35s cubic-bezier(0.34,1.1,0.64,1)",
          maxHeight: "88vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div style={{ padding: "11px 0 0", display: "flex", justifyContent: "center" }}>
          <div style={{ width: 32, height: 3, background: "#E2E8F0", borderRadius: 99 }}/>
        </div>

        {/* Header */}
        <div style={{ padding: "13px 18px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1, marginRight: 10 }}>
            <h3 style={{ fontSize: 16, fontWeight: 900, color: "#0F172A", margin: "0 0 3px" }}>
              {caseData.title}
            </h3>
            <p style={{ fontSize: 10.5, color: "#64748B", margin: 0 }}>{caseData.sub}</p>
          </div>
          <span style={{
            background: caseData.tagBg, color: caseData.tagColor,
            fontSize: 8.5, fontWeight: 800, padding: "4px 9px",
            borderRadius: 16, letterSpacing: 0.5, flexShrink: 0,
          }}>{caseData.tag}</span>
        </div>

        {/* ECG */}
        <div style={{ margin: "13px 18px 0" }}>
          <MiniECG />
        </div>

        {/* Description */}
        <div style={{ margin: "13px 18px 0" }}>
          <p style={{ fontSize: 10.5, color: "#475569", lineHeight: 1.6, margin: 0,
            background: "#F8FAFC", borderRadius: 11, padding: "10px 11px",
            border: "1.5px solid #E2E8F0" }}>
            {caseData.description}
          </p>
        </div>

        {/* Findings Grid */}
        <div style={{ margin: "11px 18px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {caseData.findings.map(([k, v]) => (
            <div key={k} style={{
              background: "#F8FAFC", borderRadius: 11, padding: "10px 11px",
              border: "1.5px solid #E2E8F0",
            }}>
              <div style={{ fontSize: 8.5, color: "#94A3B8", fontWeight: 600, letterSpacing: 0.5, marginBottom: 2 }}>{k.toUpperCase()}</div>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: "#0F172A" }}>{v}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ margin: "16px 18px 0", display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "11px", borderRadius: 11,
            border: "1.5px solid #E2E8F0", background: "#F8FAFC",
            color: "#475569", fontSize: 11.5, fontWeight: 700, cursor: "pointer",
          }}>
            Close
          </button>
          <button onClick={onStart} style={{
            flex: 2, padding: "11px", borderRadius: 11, border: "none",
            background: "linear-gradient(135deg,#3B82F6,#2563EB)",
            color: "#fff", fontSize: 11.5, fontWeight: 700, cursor: "pointer",
            boxShadow: "0 3px 11px rgba(59,130,246,0.3)",
          }}>
            Start Analysis →
          </button>
        </div>
      </div>
    </div>
  );
}
