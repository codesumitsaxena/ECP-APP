const StatItem = ({ value, label }) => (
  <div className="flex-1 bg-white rounded-2xl p-3 border border-[#E2E8F0] text-center shadow-sm">
    <div className="text-lg font-bold text-[#0F172A] leading-none">{value}</div>
    <div className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider mt-1">{label}</div>
  </div>
);

export default function StatRow({ stats }) {
  return (
    <div className="flex gap-2">
      <StatItem value={stats.modules} label="Modules" />
      <StatItem value={stats.sims} label="Sims" />
      <StatItem value={stats.cases} label="Cases" />
      <StatItem value={stats.time} label="Hours" />
    </div>
  );
}
