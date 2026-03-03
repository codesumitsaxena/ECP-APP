
export default function ModuleCard({ mod, onResume }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 22,
      padding: "20px",
      border: "1.5px solid #E2E8F0",
      boxShadow: "0 2px 12px rgba(59,130,246,0.06)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{
          background: "#EFF6FF", color: "#3B82F6", fontSize: 11, fontWeight: 700,
          padding: "4px 12px", borderRadius: 20, letterSpacing: 0.3,
        }}>
          Module {mod.number}
        </span>
        <span style={{ fontSize: 12, color: "#94A3B8" }}>Opened {mod.time}</span>
      </div>

      <div style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", margin: "8px 0 14px", lineHeight: 1.3 }}>
        {mod.title}
      </div>

      {/* Progress bar */}
      <div style={{ height: 6, background: "#EFF6FF", borderRadius: 99, marginBottom: 16, overflow: "hidden" }}>
        <div style={{
          width: `${mod.progress}%`, height: "100%",
          background: "linear-gradient(90deg,#3B82F6,#2563EB)",
          borderRadius: 99,
          transition: "width 1s ease",
        }} />
      </div>

      <button
        onClick={onResume}
        style={{
          width: "100%", padding: "14px", borderRadius: 14, border: "none",
          background: "#0F172A", color: "#fff", fontSize: 14, fontWeight: 700,
          cursor: "pointer", letterSpacing: 0.3,
          transition: "background 0.2s, transform 0.15s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#1E293B"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#0F172A"}
        onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"}
        onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        Resume Module →
      </button>
    </div>
  );
}
