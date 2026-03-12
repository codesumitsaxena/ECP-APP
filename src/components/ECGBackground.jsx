
export default function ECGBackground() {
  return (
    <svg
      style={{
        position: "absolute", top: "50%", left: 0, width: "100%",
        transform: "translateY(-50%)", opacity: 0.13, pointerEvents: "none",
      }}
      viewBox="0 0 1320 64" preserveAspectRatio="none"
    >
      <style>{`
        @keyframes ecgDraw { 0% { stroke-dashoffset: 2000; } 100% { stroke-dashoffset: 0; } }
        .ecg-line { stroke-dasharray: 2000; stroke-dashoffset: 2000; animation: ecgDraw 3s ease-out forwards; }
      `}</style>
      <polyline className="ecg-line" fill="none" stroke="#3B82F6" strokeWidth="1.8"
        strokeLinejoin="round" strokeLinecap="round"
        points="0,32 60,32 75,32 82,6 88,58 94,10 100,46 115,32 240,32 255,32 262,5 268,59 274,8 280,45 295,32 420,32 435,32 442,5 448,58 454,9 460,44 475,32 600,32 615,32 622,4 628,60 634,7 640,46 655,32 780,32 795,32 802,6 808,58 814,10 820,45 835,32 960,32 975,32 982,5 988,59 994,8 1000,44 1015,32 1140,32 1155,32 1162,6 1168,58 1174,10 1180,45 1195,32 1320,32"
      />
    </svg>
  );
}
