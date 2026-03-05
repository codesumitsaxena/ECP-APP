import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const nodes = {
  sa:       { id: "sa",       label: "SA Node",      x: 76,  y: 56,  color: "#2563EB", title: "SA Node",           sub: "Sinoatrial Node",           desc: "The SA node is the natural pacemaker of the heart. It initiates the electrical impulse that triggers each heartbeat, firing at 60–100 bpm in a resting adult.", ecg: "Electrical impulses from the SA node sweeping across the atria produce the", wave: "P wave", waveColor: "#2563EB", wType: "p" },
  av:       { id: "av",       label: "AV Node",      x: 110, y: 96,  color: "#0891B2", title: "AV Node",           sub: "Atrioventricular Node",      desc: "The AV node acts as a relay station between the atria and ventricles. It introduces a crucial 0.1s delay, allowing the ventricles to fill with blood before contracting.", ecg: "The AV node delay is shown in the", wave: "PR interval", waveColor: "#0891B2", wType: "pr" },
  bundle:   { id: "bundle",   label: "Bundle of His",x: 110, y: 126, color: "#0D9488", title: "Bundle of His",     sub: "His-Purkinje System",        desc: "The Bundle of His rapidly conducts impulses from the AV node to the right and left bundle branches, ensuring coordinated ventricular contraction.", ecg: "Conduction through the bundle branches initiates the", wave: "QRS complex", waveColor: "#0D9488", wType: "qrs" },
  purkinjeR:{ id: "purkinjeR",label: "Purkinje (R)", x: 76,  y: 156, color: "#7C3AED", title: "Purkinje (R)",      sub: "Right Ventricular Network",  desc: "Right Purkinje fibers rapidly spread electrical activation throughout the right ventricular wall, triggering its contraction almost simultaneously.", ecg: "Purkinje activation through the right ventricle produces the", wave: "QRS complex", waveColor: "#7C3AED", wType: "qrs" },
  purkinjeL:{ id: "purkinjeL",label: "Purkinje (L)", x: 144, y: 156, color: "#DB2777", title: "Purkinje (L)",      sub: "Left Ventricular Network",   desc: "Left Purkinje fibers activate the larger left ventricle. Its greater muscle mass produces the dominant QRS deflection observed on the ECG.", ecg: "Left ventricular dominance during depolarization shapes the", wave: "QRS morphology", waveColor: "#DB2777", wType: "qrs" },
};

const connections = [
  { from: "sa", to: "av" }, { from: "av", to: "bundle" },
  { from: "bundle", to: "purkinjeR" }, { from: "bundle", to: "purkinjeL" },
];

const nodeOrder = ["sa", "av", "bundle", "purkinjeR", "purkinjeL"];

function ECGPreview({ type, color }) {
  const paths = {
    p:   "M10,30 L50,30 Q60,30 65,20 Q70,10 75,20 Q80,30 95,30 L170,30",
    pr:  "M10,30 L40,30 Q50,30 55,20 Q60,10 65,20 Q70,30 90,30 L110,30",
    qrs: "M10,30 L80,30 L84,38 L88,38 L98,4 L106,54 L112,30 L170,30",
  };
  return (
    <svg viewBox="0 0 180 60" style={{ width: "100%", height: 56 }}>
      <line x1="0" y1="30" x2="180" y2="30" stroke="#E2E8F0" strokeWidth="1.5" />
      <path d={paths[type] || paths.p} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function InteractiveDiagram({ navigate }) {
  const [selected, setSelected] = useState("sa");
  const [animStep, setAnimStep] = useState(0);
  const [cardVisible, setCardVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setAnimStep((s) => (s + 1) % nodeOrder.length), 700);
    return () => clearInterval(t);
  }, []);

  const handleSelect = (id) => {
    setCardVisible(false);
    setTimeout(() => { setSelected(id); setCardVisible(true); }, 160);
  };

  const node = nodes[selected];

  return (
    <div style={{ width: "100%", maxWidth: 390, background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", boxShadow: "0 0 60px rgba(0,0,0,0.1)" }}>
      <style>{`
        .id-node { cursor: pointer; transition: all 0.18s ease; }
        .id-node:hover { filter: brightness(1.08); }
        .id-pill { cursor: pointer; border: none; transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1); }
        .id-pill:hover { transform: scale(1.06); }
        .id-pill:active { transform: scale(0.96); }
        .id-cont-btn { background: linear-gradient(135deg, #2563EB, #1D4ED8); border: none; cursor: pointer; transition: all 0.2s ease; }
        .id-cont-btn:hover { transform: translateY(-1px); box-shadow: 0 12px 28px rgba(37,99,235,0.42); }
        @keyframes idFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .id-fade { opacity: 0; animation: idFadeUp 0.28s ease forwards; }
        @keyframes ecgDraw { from { stroke-dashoffset: 400; } to { stroke-dashoffset: 0; } }
        .ecg-anim { stroke-dasharray: 400; animation: ecgDraw 1s ease forwards; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "52px 20px 14px", background: "#fff", borderBottom: "1px solid #F1F5F9" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => navigate("lessonContent")} style={{ width: 38, height: 38, borderRadius: 12, background: "#F1F5F9", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ArrowLeft size={18} color="#374151" strokeWidth={2.5} />
          </button>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: "#2563EB", letterSpacing: "0.1em", textTransform: "uppercase" }}>INTERACTIVE DIAGRAM</p>
            <h1 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Heart Electrical Conduction</h1>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 28px" }}>

        {/* Heart Diagram */}
        <div style={{ background: "#F8FAFF", borderRadius: 20, padding: "16px", marginBottom: 14, border: "1px solid #E0EAFF" }}>
          <svg viewBox="0 0 220 210" style={{ width: "100%", height: 210 }}>
            <defs>
              <radialGradient id="hg" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#DBEAFE" />
                <stop offset="100%" stopColor="#BFDBFE" />
              </radialGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="cb"/><feMerge><feMergeNode in="cb"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            {/* Heart body */}
            <path d="M110,185 C65,158 18,122 18,82 C18,54 38,38 62,38 C79,38 94,46 110,62 C126,46 141,38 158,38 C182,38 202,54 202,82 C202,122 155,158 110,185Z" fill="url(#hg)" stroke="#93C5FD" strokeWidth="1.5" />
            {/* Vessels */}
            <path d="M96,40 C92,22 82,14 76,8" fill="none" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />
            <path d="M110,40 C110,22 114,14 117,7" fill="none" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" />
            <path d="M126,44 C138,26 146,17 153,11" fill="none" stroke="#93C5FD" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M170,66 C186,58 196,52 204,46" fill="none" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
            <path d="M50,66 C34,58 24,52 16,48" fill="none" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
            {/* Chamber */}
            <line x1="110" y1="65" x2="110" y2="174" stroke="#93C5FD" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
            <line x1="55" y1="100" x2="165" y2="100" stroke="#93C5FD" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
            {/* Connections */}
            {connections.map((c, i) => {
              const f = nodes[c.from]; const t = nodes[c.to];
              const isLit = animStep > i;
              return <line key={i} x1={f.x} y1={f.y} x2={t.x} y2={t.y} stroke={isLit ? f.color : "#CBD5E1"} strokeWidth={isLit ? 2 : 1} opacity={isLit ? 0.85 : 0.4} style={{ transition: "all 0.35s ease" }} />;
            })}
            {/* Pulse dot */}
            <circle cx={nodes[nodeOrder[animStep]].x} cy={nodes[nodeOrder[animStep]].y} r="5" fill="#FBBF24" filter="url(#glow)" opacity="0.95" style={{ transition: "all 0.35s ease" }} />
            {/* Node circles + labels */}
            {Object.values(nodes).map((n) => {
              const isSel = selected === n.id;
              return (
                <g key={n.id} className="id-node" onClick={() => handleSelect(n.id)}>
                  {isSel && <circle cx={n.x} cy={n.y} r="14" fill={n.color} opacity="0.12" />}
                  <circle cx={n.x} cy={n.y} r={isSel ? 9 : 7} fill={isSel ? n.color : "#fff"} stroke={n.color} strokeWidth="2" filter={isSel ? "url(#glow)" : "none"} style={{ transition: "all 0.2s ease" }} />
                  {/* Label bubble */}
                  <rect x={n.x < 110 ? n.x - 54 : n.x + 14} y={n.y - 9} width={n.label.length * 5.8 + 12} height={18} rx="5" fill={isSel ? n.color : "#fff"} stroke={n.color} strokeWidth="1.5" />
                  <text x={n.x < 110 ? n.x - 54 + (n.label.length * 5.8 + 12) / 2 : n.x + 14 + (n.label.length * 5.8 + 12) / 2} y={n.y + 4.5} fontSize="7" fontWeight="700" fill={isSel ? "#fff" : n.color} textAnchor="middle" fontFamily="Plus Jakarta Sans">
                    {n.label}
                  </text>
                </g>
              );
            })}
            <text x="110" y="200" fontSize="7.5" fontWeight="700" fill="#94A3B8" textAnchor="middle" letterSpacing="1.5">HUMAN HEART ANATOMY</text>
          </svg>

          {/* Node Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center", marginTop: 10 }}>
            {Object.values(nodes).map((n) => (
              <button key={n.id} className="id-pill" onClick={() => handleSelect(n.id)}
                style={{ padding: "5px 12px", borderRadius: 99, fontSize: 10, fontWeight: 700, border: `2px solid ${n.color}`, background: selected === n.id ? n.color : "transparent", color: selected === n.id ? "#fff" : n.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {n.label}
              </button>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div key={selected} className="id-fade" style={{ background: "#fff", borderRadius: 18, padding: "18px", marginBottom: 12, boxShadow: "0 2px 14px rgba(0,0,0,0.07)", border: "1px solid #F1F5F9", opacity: cardVisible ? 1 : 0, transition: "opacity 0.15s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: node.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" fill={node.color} /><circle cx="12" cy="12" r="8" stroke={node.color} strokeWidth="1.5" fill="none" opacity="0.3" /></svg>
            </div>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{node.title}</h2>
              <p style={{ fontSize: 11, fontWeight: 600, color: node.color }}>{node.sub}</p>
            </div>
          </div>
          <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, fontWeight: 400 }}>{node.desc}</p>
        </div>

        {/* ECG Card */}
        <div key={`ecg-${selected}`} className="id-fade" style={{ borderRadius: 18, padding: "16px", border: `1px solid ${node.waveColor}30`, background: node.waveColor + "0D", opacity: cardVisible ? 1 : 0, transition: "opacity 0.15s" }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: node.waveColor, marginBottom: 10, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>How this affects the ECG</p>
          <div style={{ background: "#fff", borderRadius: 12, padding: "10px 12px", marginBottom: 10 }}>
            <ECGPreview type={node.wType} color={node.waveColor} />
          </div>
          <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.65 }}>
            {node.ecg} <strong style={{ color: node.waveColor }}>{node.wave}</strong> on the ECG.
          </p>
        </div>
      </div>

      {/* Footer Button */}
      <div style={{ padding: "12px 16px 36px", background: "#fff", borderTop: "1px solid #F1F5F9" }}>
        <button className="id-cont-btn" onClick={() => navigate("quiz")} style={{ width: "100%", padding: "15px", borderRadius: 14, color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Continue Learning
        </button>
      </div>
    </div>
  );
}