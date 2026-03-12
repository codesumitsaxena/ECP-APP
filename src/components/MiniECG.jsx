export default function MiniECG({ 
  color = "#2563EB", 
  bg = "#FFF9F2", 
  gridColor = "#FBBF24" 
}) {
  return (
    <svg 
      width="100%" 
      height="64" 
      viewBox="0 0 300 64"
      preserveAspectRatio="none" 
      className="block"
    >
      <rect width="300" height="64" fill={bg} />
      
      {/* Grid vertical */}
      {Array.from({ length: 31 }).map((_, i) => (
        <line 
          key={`v${i}`} 
          x1={i * 10} y1="0" x2={i * 10} y2="64"
          stroke={gridColor} 
          strokeWidth={i % 5 === 0 ? "0.6" : "0.3"} 
          strokeOpacity={i % 5 === 0 ? "0.4" : "0.2"}
        />
      ))}
      
      {/* Grid horizontal */}
      {Array.from({ length: 7 }).map((_, i) => (
        <line 
          key={`h${i}`} 
          x1="0" y1={i * 10} x2="300" y2={i * 10}
          stroke={gridColor} 
          strokeWidth={i % 5 === 0 ? "0.6" : "0.3"} 
          strokeOpacity={i % 5 === 0 ? "0.4" : "0.2"}
        />
      ))}

      <polyline 
        fill="none" 
        stroke={color} 
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
        points="
          0,32 35,32
          42,32 45,40 48,16 51,48 54,24 60,32
          110,32 115,32 118,40 121,14 124,48 127,22 133,32
          190,32 195,32 198,40 201,14 204,50 207,20 213,32
          260,32 265,32 268,40 271,15 274,49 277,21 283,32
          300,32
        "
      />
    </svg>
  );
}
