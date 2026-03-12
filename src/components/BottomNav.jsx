import { useState } from "react";

const NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? "#3B82F6" : "none"}
        stroke={active ? "#3B82F6" : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  },
  {
    id: "learn",
    label: "Learn",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke={active ? "#3B82F6" : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    id: "train",
    label: "Train",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke={active ? "#3B82F6" : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
      </svg>
    ),
  },
  {
    id: "cases",
    label: "Cases",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke={active ? "#3B82F6" : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke={active ? "#3B82F6" : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
];

export default function BottomNav({ active, setActive }) {
  const [pressed, setPressed] = useState(null);

  return (
    <>
      <style>{`
        @keyframes navPop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pillSlide {
          0% { opacity: 0; transform: scaleX(0.3); }
          100% { opacity: 1; transform: scaleX(1); }
        }
        .nav-item { transition: transform 0.15s ease; }
        .nav-item:active { transform: scale(0.88); }
        .nav-dot { animation: navPop 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      `}</style>

      {/* Spacer so content not hidden behind nav */}
      <div style={{ height: 66 }} />

      <div style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 312,
        zIndex: 200,
        padding: "0 12px 12px",
        boxSizing: "border-box",
        pointerEvents: "none",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 22,
          border: "1.5px solid rgba(226,232,240,0.8)",
          boxShadow: "0 6px 24px rgba(59,130,246,0.12), 0 1px 6px rgba(0,0,0,0.06)",
          display: "flex",
          padding: "8px 6px 8px",
          pointerEvents: "all",
        }}>
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                className="nav-item"
                onClick={() => setActive(item.id)}
                onMouseDown={() => setPressed(item.id)}
                onMouseUp={() => setPressed(null)}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  padding: "5px 3px",
                  borderRadius: 14,
                  position: "relative",
                  transition: "background 0.2s",
                  transform: pressed === item.id ? "scale(0.88)" : "scale(1)",
                }}
              >
                {/* Active pill background */}
                {isActive && (
                  <div style={{
                    position: "absolute",
                    top: 2, left: "50%",
                    transform: "translateX(-50%)",
                    width: 36, height: 36,
                    borderRadius: 12,
                    background: "linear-gradient(135deg,rgba(59,130,246,0.12),rgba(37,99,235,0.08))",
                    animation: "pillSlide 0.25s ease forwards",
                  }} />
                )}

                {/* Icon */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  {item.icon(isActive)}
                </div>

                {/* Label */}
                <span style={{
                  fontSize: 9,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#3B82F6" : "#94A3B8",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: 0.2,
                  transition: "color 0.2s",
                  position: "relative",
                  zIndex: 1,
                }}>
                  {item.label}
                </span>

                {/* Active dot */}
                {isActive && (
                  <div className="nav-dot" style={{
                    width: 3, height: 3, borderRadius: "50%",
                    background: "#3B82F6",
                  }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
