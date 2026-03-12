
const ECGIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <polyline points="2,12 5,12 6.5,6 8,18 9.5,9 11,15 12.5,12 17,12 18.5,6 20,18 21.5,9 23,12"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VectorIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.6"/>
    <line x1="12" y1="3" x2="12" y2="21" stroke={color} strokeWidth="1" strokeDasharray="2 2"/>
    <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1" strokeDasharray="2 2"/>
    <line x1="5.3" y1="5.3" x2="18.7" y2="18.7" stroke={color} strokeWidth="0.8" strokeDasharray="2 2"/>
    <line x1="18.7" y1="5.3" x2="5.3" y2="18.7" stroke={color} strokeWidth="0.8" strokeDasharray="2 2"/>
    <circle cx="12" cy="12" r="2.5" fill={color}/>
    <line x1="12" y1="12" x2="17" y2="7" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
    <polygon points="17,7 15,6 16,9" fill={color}/>
  </svg>
);

export default function QuickToolCard({ tool, onClick }) {
  const icon = tool.id === "ecg_renderer"
    ? <ECGIcon color={tool.iconColor} />
    : <VectorIcon color={tool.iconColor} />;

  return (
    <div
      onClick={onClick}
      style={{
        flex: 1,
        background: "#fff",
        borderRadius: 18,
        padding: "14px 12px 12px",
        border: "1.5px solid #E2E8F0",
        cursor: "pointer",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = `0 6px 18px ${tool.iconColor}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
      onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.96)"}
      onMouseUp={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
    >
      <div style={{
        width: 38, height: 38, borderRadius: 12,
        background: tool.color,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 10,
      }}>
        {icon}
      </div>
      <div style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", marginBottom: 2 }}>
        {tool.title}
      </div>
      <div style={{ fontSize: 10, color: "#94A3B8", lineHeight: 1.4 }}>
        {tool.sub}
      </div>
    </div>
  );
}
