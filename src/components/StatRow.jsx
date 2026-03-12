
const StatItem = ({ value, label }) => (
  <div style={{
    flex: 1,
    background: "#fff",
    borderRadius: 14,
    padding: "11px 6px",
    textAlign: "center",
    border: "1.5px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  }}>
    <div style={{ fontSize: 19, fontWeight: 900, color: "#0F172A", lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 8.5, fontWeight: 700, color: "#94A3B8", letterSpacing: 0.8, marginTop: 3 }}>{label}</div>
  </div>
);

export default function StatRow({ stats }) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <StatItem value={stats.modules} label="MODULES" />
      <StatItem value={stats.sims} label="SIMS" />
      <StatItem value={stats.cases} label="CASES" />
      <StatItem value={stats.time} label="TIME" />
    </div>
  );
}
