
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
          borderRadius: "28px 28px 0 0",
          padding: "0 0 36px",
          width: "100%",
          maxWidth: 430,
          margin: "0 auto",
          animation: "slideUp 0.35s cubic-bezier(0.34,1.1,0.64,1)",
          maxHeight: "88vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div style={{ padding: "14px 0 0", display: "flex", justifyContent: "center" }}>
          <div style={{ width: 40, height: 4, background: "#E2E8F0", borderRadius: 99 }}/>
        </div>

        {/* Header */}
        <div style={{ padding: "16px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1, marginRight: 12 }}>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: "#0F172A", margin: "0 0 4px" }}>
              {caseData.title}
            </h3>
            <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>{caseData.sub}</p>
          </div>
          <span style={{
            background: caseData.tagBg, color: caseData.tagColor,
            fontSize: 10, fontWeight: 800, padding: "5px 11px",
            borderRadius: 20, letterSpacing: 0.5, flexShrink: 0,
          }}>{caseData.tag}</span>
        </div>

        {/* ECG */}
        <div style={{ margin: "16px 22px 0" }}>
          <MiniECG />
        </div>

        {/* Description */}
        <div style={{ margin: "16px 22px 0" }}>
          <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, margin: 0,
            background: "#F8FAFC", borderRadius: 14, padding: "12px 14px",
            border: "1.5px solid #E2E8F0" }}>
            {caseData.description}
          </p>
        </div>

        {/* Findings Grid */}
        <div style={{ margin: "14px 22px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {caseData.findings.map(([k, v]) => (
            <div key={k} style={{
              background: "#F8FAFC", borderRadius: 14, padding: "12px 14px",
              border: "1.5px solid #E2E8F0",
            }}>
              <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600, letterSpacing: 0.5, marginBottom: 3 }}>{k.toUpperCase()}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{v}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ margin: "20px 22px 0", display: "flex", gap: 12 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "14px", borderRadius: 14,
            border: "1.5px solid #E2E8F0", background: "#F8FAFC",
            color: "#475569", fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}>
            Close
          </button>
          <button onClick={onStart} style={{
            flex: 2, padding: "14px", borderRadius: 14, border: "none",
            background: "linear-gradient(135deg,#3B82F6,#2563EB)",
            color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
            boxShadow: "0 4px 14px rgba(59,130,246,0.3)",
          }}>
            Start Analysis →
          </button>
        </div>
      </div>
    </div>
  );
}
