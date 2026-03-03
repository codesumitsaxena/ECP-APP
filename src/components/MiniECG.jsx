
export default function MiniECG({ color = "#EF4444", bg = "#FFF5F5", gridColor = "#FECACA" }) {
  return (
    <svg width="100%" height="68" viewBox="0 0 300 68"
      preserveAspectRatio="none" style={{ display: "block" }}>
      <rect width="300" height="68" fill={bg} />
      {/* Grid vertical */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="68"
          stroke={gridColor} strokeWidth="0.6" />
      ))}
      {/* Grid horizontal */}
      {[0, 1, 2, 3].map((i) => (
        <line key={`h${i}`} x1="0" y1={i * 22} x2="300" y2={i * 22}
          stroke={gridColor} strokeWidth="0.6" />
      ))}
      <polyline fill="none" stroke={color} strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"
        points="
          0,34 35,34
          42,34 45,42 48,18 51,50 54,26 60,34
          110,34 115,34 118,42 121,16 124,50 127,24 133,34
          190,34 195,34 198,42 201,16 204,52 207,22 213,34
          260,34 265,34 268,42 271,17 274,51 277,23 283,34
          300,34
        "
      />
    </svg>
  );
}
