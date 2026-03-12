
export default function MiniECG({ color = "#EF4444", bg = "#FFF5F5", gridColor = "#FECACA" }) {
  return (
    <svg width="100%" height="54" viewBox="0 0 300 54"
      preserveAspectRatio="none" style={{ display: "block" }}>
      <rect width="300" height="54" fill={bg} />
      {/* Grid vertical */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="54"
          stroke={gridColor} strokeWidth="0.6" />
      ))}
      {/* Grid horizontal */}
      {[0, 1, 2, 3].map((i) => (
        <line key={`h${i}`} x1="0" y1={i * 18} x2="300" y2={i * 18}
          stroke={gridColor} strokeWidth="0.6" />
      ))}
      <polyline fill="none" stroke={color} strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"
        points="
          0,27 35,27
          42,27 45,35 48,11 51,43 54,19 60,27
          110,27 115,27 118,35 121,9 124,43 127,17 133,27
          190,27 195,27 198,35 201,9 204,45 207,15 213,27
          260,27 265,27 268,35 271,10 274,44 277,16 283,27
          300,27
        "
      />
    </svg>
  );
}
