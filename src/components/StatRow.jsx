
const StatItem = ({ value, label }) => (
  <div style={{
    flex: 1,
    background: "#fff",
    borderRadius: 18,
    padding: "14px 8px",
    textAlign: "center",
    border: "1.5px solid #E2E8F0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  }}>
    <div style={{ fontSize: 24, fontWeight: 900, color: "#0F172A", lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", letterSpacing: 0.8, marginTop: 4 }}>{label}</div>
  </div>
);

export default function StatRow({ stats }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <StatItem value={stats.modules} label="MODULES" />
      <StatItem value={stats.sims} label="SIMS" />
      <StatItem value={stats.cases} label="CASES" />
      <StatItem value={stats.time} label="TIME" />
    </div>
  );
}
