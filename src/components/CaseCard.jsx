import MiniECG from "./MiniECG.jsx";

export default function CaseCard({ caseData, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        borderRadius: 18,
        overflow: "hidden",
        border: "1.5px solid #E2E8F0",
        boxShadow: "0 1.5px 12px rgba(239,68,68,0.07)",
        cursor: "pointer",
        transition: "transform 0.18s, box-shadow 0.18s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 6px 22px rgba(239,68,68,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "0 1.5px 12px rgba(239,68,68,0.07)";
      }}
    >
      {/* Header */}
      <div style={{ padding: "14px 14px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0F172A" }}>{caseData.title}</div>
          <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 2 }}>{caseData.sub}</div>
        </div>
        <span style={{
          background: caseData.tagBg,
          color: caseData.tagColor,
          fontSize: 9, fontWeight: 800,
          padding: "4px 9px", borderRadius: 16, letterSpacing: 0.5,
          whiteSpace: "nowrap", marginLeft: 8,
        }}>
          {caseData.tag}
        </span>
      </div>

      {/* ECG Strip */}
      <div style={{ marginTop: 10 }}>
        <MiniECG />
      </div>

      {/* Footer */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "10px 14px 13px",
      }}>
        <span style={{
          fontSize: 11, fontWeight: 700, color: "#475569",
          display: "flex", alignItems: "center", gap: 5,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: caseData.tagColor, display: "inline-block",
          }}/>
          Angle: {caseData.angle}
        </span>
        <span style={{
          color: "#3B82F6", fontSize: 11, fontWeight: 700,
          display: "flex", alignItems: "center", gap: 2,
        }}>
          View Case
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </span>
      </div>
    </div>
  );
}
