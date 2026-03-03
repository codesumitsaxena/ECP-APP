
export default function ECGBackground() {
  return (
    <svg
      style={{
        position: "absolute", top: "50%", left: 0, width: "100%",
        transform: "translateY(-50%)", opacity: 0.13, pointerEvents: "none",
      }}
      viewBox="0 0 1320 80" preserveAspectRatio="none"
    >
      <style>{`
        @keyframes ecgDraw { 0% { stroke-dashoffset: 2000; } 100% { stroke-dashoffset: 0; } }
        .ecg-line { stroke-dasharray: 2000; stroke-dashoffset: 2000; animation: ecgDraw 3s ease-out forwards; }
      `}</style>
      <polyline className="ecg-line" fill="none" stroke="#3B82F6" strokeWidth="2.2"
        strokeLinejoin="round" strokeLinecap="round"
        points="0,40 60,40 75,40 82,8 88,72 94,12 100,58 115,40 240,40 255,40 262,6 268,74 274,10 280,56 295,40 420,40 435,40 442,7 448,73 454,11 460,55 475,40 600,40 615,40 622,5 628,75 634,9 640,57 655,40 780,40 795,40 802,8 808,72 814,12 820,56 835,40 960,40 975,40 982,6 988,74 994,10 1000,55 1015,40 1140,40 1155,40 1162,8 1168,72 1174,12 1180,56 1195,40 1320,40"
      />
    </svg>
  );
}
