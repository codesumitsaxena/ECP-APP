// ─── TrainScreen ──────────────────────────────────────────────────────────────

import { useState } from "react";
import {
  Activity,       // ECG Renderer
  Zap,            // Cardiac Vector Sim
  Heart,          // Heart Rate Calculator
  Compass,        // Axis Determination
  FlipHorizontal, // Lead Reversal Sim
  LayoutGrid,     // Chest Lead Placement
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

// ── TRAIN_TOOLS data (inline, replacing TRAIN_TOOLS from appData.js) ──────────
const TRAIN_TOOLS = [
  {
    id: "ecg",
    title: "ECG Renderer",
    sub: "Interactive grid with P, QRS, T waves",
    Icon: Activity,
    color: "#EFF6FF",
    accent: "#3B82F6",
  },
  {
    id: "vector",
    title: "Cardiac Vector Sim",
    sub: "Hex-axial model with dot product",
    Icon: Zap,
    color: "#FFF7ED",
    accent: "#F97316",
  },
  {
    id: "heartrate",
    title: "Heart Rate Calculator",
    sub: "R-R interval method",
    Icon: Heart,
    color: "#FFF1F2",
    accent: "#F43F5E",
  },
  {
    id: "axis",
    title: "Axis Determination",
    sub: "Tano formula, four-quadrant",
    Icon: Compass,
    color: "#F0FDF4",
    accent: "#22C55E",
  },
  {
    id: "reversal",
    title: "Lead Reversal Sim",
    sub: "All 6 reversal combinations",
    Icon: FlipHorizontal,
    color: "#EFF6FF",
    accent: "#6366F1",
  },
  {
    id: "chest",
    title: "Chest Lead Placement",
    sub: "Drag-and-drop electrodes",
    Icon: LayoutGrid,
    color: "#FDF4FF",
    accent: "#A855F7",
  },
];

export default function TrainScreen() {
  const [active, setActive] = useState(null);

  if (active === "ecg")       return <ECGRendererTool   onBack={() => setActive(null)} />;
  if (active === "vector")    return <VectorSimTool     onBack={() => setActive(null)} />;
  if (active === "heartrate") return <HeartRateTool     onBack={() => setActive(null)} />;
  if (active === "axis")      return <AxisTool          onBack={() => setActive(null)} />;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: "20px 18px 0" }}>
      <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }`}</style>
      <h1 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", margin: "0 0 4px" }}>Train</h1>
      <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 24px" }}>Interactive ECG Simulators</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {TRAIN_TOOLS.map((tool, i) => (
          <div
            key={tool.id}
            onClick={() => setActive(tool.id)}
            style={{
              background: "#fff", borderRadius: 22, padding: "20px 16px",
              border: "1.5px solid #E2E8F0", cursor: "pointer",
              transition: "transform 0.18s, box-shadow 0.18s",
              animation: `fadeUp 0.4s ease ${i * 60}ms both`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = `0 8px 24px ${tool.accent}22`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            {/* Icon box — lucide icon instead of emoji */}
            <div style={{
              width: 48, height: 48, borderRadius: 16,
              background: tool.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 14,
              color: tool.accent,
            }}>
              <tool.Icon size={24} strokeWidth={2} />
            </div>

            <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A", marginBottom: 4 }}>{tool.title}</div>
            <div style={{ fontSize: 11, color: "#94A3B8", lineHeight: 1.4 }}>{tool.sub}</div>
            <div style={{
              marginTop: 12, color: tool.accent, fontSize: 11, fontWeight: 700,
              display: "flex", alignItems: "center", gap: 2,
            }}>
              Launch <ChevronRight size={13} strokeWidth={3} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Shared helpers ───────────────────────────────────────────────────────────
function BackButton({ onBack }) {
  return (
    <button
      onClick={onBack}
      style={{
        background: "none", border: "none", cursor: "pointer",
        color: "#3B82F6", fontSize: 14, fontWeight: 700,
        padding: 0, marginBottom: 16,
        display: "flex", alignItems: "center", gap: 6,
      }}
    >
      <ArrowLeft size={15} strokeWidth={2.5} /> Back
    </button>
  );
}

function ScreenTitle({ Icon, color, accent, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
      <div style={{
        width: 38, height: 38, borderRadius: 13,
        background: color, color: accent,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={20} strokeWidth={2} />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", margin: 0 }}>{title}</h2>
    </div>
  );
}

// ─── ECG Renderer Tool ───────────────────────────────────────────────────────
function ECGRendererTool({ onBack }) {
  const [amplitude, setAmplitude] = useState(50);
  const [speed, setSpeed] = useState(25);

  const points = [];
  for (let x = 0; x <= 300; x += 0.5) {
    const t = (x / 300) * 4 * Math.PI;
    const p = Math.exp(-Math.pow(t - 1.2, 2) / 0.08) * 8;
    const q = -Math.exp(-Math.pow(t - 1.55, 2) / 0.01) * (amplitude * 0.15);
    const r = Math.exp(-Math.pow(t - 1.65, 2) / 0.005) * amplitude;
    const s = -Math.exp(-Math.pow(t - 1.75, 2) / 0.008) * (amplitude * 0.2);
    const twave = Math.exp(-Math.pow(t - 2.4, 2) / 0.12) * (amplitude * 0.25);
    const y = 60 - (p + q + r + s + twave);
    points.push(`${x},${y}`);
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: "20px 18px 0" }}>
      <BackButton onBack={onBack} />
      <ScreenTitle Icon={Activity} color="#EFF6FF" accent="#3B82F6" title="ECG Renderer" />

      <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1.5px solid #E2E8F0", marginBottom: 20 }}>
        <svg width="100%" height="120" viewBox="0 0 300 120" preserveAspectRatio="none">
          <rect width="300" height="120" fill="#FFF9F0"/>
          {Array.from({length: 30}).map((_, i) => (
            <line key={`v${i}`} x1={i*10} y1="0" x2={i*10} y2="120" stroke="#FBBF24" strokeWidth={i%5===0?0.8:0.4}/>
          ))}
          {Array.from({length: 12}).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i*10} x2="300" y2={i*10} stroke="#FBBF24" strokeWidth={i%5===0?0.8:0.4}/>
          ))}
          <polyline fill="none" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round"
            points={points.join(" ")}/>
        </svg>
      </div>

      <div style={{ background: "#fff", borderRadius: 20, padding: "18px", border: "1.5px solid #E2E8F0", marginBottom: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#475569", display:"flex", justifyContent:"space-between" }}>
            AMPLITUDE (mV) <span style={{ color: "#3B82F6" }}>{(amplitude / 50).toFixed(1)} mV</span>
          </label>
          <input type="range" min="10" max="100" value={amplitude} onChange={e => setAmplitude(+e.target.value)}
            style={{ width: "100%", marginTop: 8, accentColor: "#3B82F6" }}/>
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#475569", display:"flex", justifyContent:"space-between" }}>
            PAPER SPEED <span style={{ color: "#3B82F6" }}>{speed} mm/s</span>
          </label>
          <div style={{ display:"flex", gap:8, marginTop:8 }}>
            {[12.5, 25, 50].map(s => (
              <button key={s} onClick={() => setSpeed(s)} style={{
                flex:1, padding:"8px", borderRadius:10,
                border: speed===s ? "2px solid #3B82F6" : "1.5px solid #E2E8F0",
                background: speed===s ? "#EFF6FF" : "#F8FAFC",
                color: speed===s ? "#3B82F6" : "#475569",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
              }}>{s}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Vector Sim Tool ─────────────────────────────────────────────────────────
function VectorSimTool({ onBack }) {
  const [angle, setAngle] = useState(60);
  const [magnitude, setMagnitude] = useState(1.0);
  const cx = 130, cy = 130, r = 100;
  const rad = (angle * Math.PI) / 180;
  const vx = cx + Math.cos(rad) * r * magnitude;
  const vy = cy - Math.sin(rad) * r * magnitude;

  const leads = [
    { name: "Lead I", angle: 0 }, { name: "Lead II", angle: 60 },
    { name: "Lead III", angle: 120 }, { name: "aVR", angle: -150 },
    { name: "aVL", angle: -30 }, { name: "aVF", angle: 90 },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: "20px 18px 0" }}>
      <BackButton onBack={onBack} />
      <ScreenTitle Icon={Zap} color="#FFF7ED" accent="#F97316" title="Cardiac Vector Sim" />

      <div style={{ background:"#fff", borderRadius:20, border:"1.5px solid #E2E8F0", overflow:"hidden", marginBottom:16 }}>
        <svg width="100%" viewBox="0 0 260 260" style={{ display:"block" }}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#EFF6FF" strokeWidth="1"/>
          {leads.map(l => {
            const lr = (l.angle * Math.PI) / 180;
            const x2 = cx + Math.cos(lr) * r;
            const y2 = cy - Math.sin(lr) * r;
            const x1 = cx - Math.cos(lr) * r;
            const y1 = cy + Math.sin(lr) * r;
            return (
              <g key={l.name}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 3"/>
                <text x={x2 + (x2-cx)*0.12} y={y2 + (y2-cy)*0.12 + 4}
                  fontSize="9" fill="#64748B" textAnchor="middle" fontWeight="700">{l.name}</text>
              </g>
            );
          })}
          <line x1={cx} y1={cy} x2={vx} y2={vy} stroke="#3B82F6" strokeWidth="3" strokeLinecap="round"/>
          <circle cx={vx} cy={vy} r="5" fill="#3B82F6"/>
          <circle cx={cx} cy={cy} r="3" fill="#0F172A"/>
          <text x={cx} y={cy - r - 10} fontSize="10" fill="#3B82F6" textAnchor="middle" fontWeight="800">
            {angle}° / {magnitude.toFixed(1)} mV
          </text>
        </svg>
      </div>

      <div style={{ background:"#fff", borderRadius:20, padding:"18px", border:"1.5px solid #E2E8F0", marginBottom:16 }}>
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:12, fontWeight:700, color:"#475569", display:"flex", justifyContent:"space-between" }}>
            ANGLE <span style={{ color:"#3B82F6" }}>{angle}°</span>
          </label>
          <input type="range" min="-180" max="180" value={angle} onChange={e => setAngle(+e.target.value)}
            style={{ width:"100%", marginTop:8, accentColor:"#3B82F6" }}/>
        </div>
        <div>
          <label style={{ fontSize:12, fontWeight:700, color:"#475569", display:"flex", justifyContent:"space-between" }}>
            MAGNITUDE <span style={{ color:"#3B82F6" }}>{magnitude.toFixed(1)} mV</span>
          </label>
          <input type="range" min="0.1" max="2" step="0.1" value={magnitude} onChange={e => setMagnitude(+e.target.value)}
            style={{ width:"100%", marginTop:8, accentColor:"#3B82F6" }}/>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
        {leads.map(l => {
          const proj = Math.cos((angle - l.angle) * Math.PI / 180) * magnitude;
          const pos = proj > 0;
          return (
            <div key={l.name} style={{ background:"#F8FAFC", borderRadius:12, padding:"10px 12px", border:"1.5px solid #E2E8F0" }}>
              <div style={{ fontSize:11, color:"#94A3B8", fontWeight:700 }}>{l.name}</div>
              <div style={{ fontSize:16, fontWeight:900, color: pos ? "#3B82F6" : "#EF4444" }}>
                {pos ? "+" : ""}{proj.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Heart Rate Tool ─────────────────────────────────────────────────────────
function HeartRateTool({ onBack }) {
  const [method, setMethod] = useState("small");
  const [value, setValue] = useState(20);
  const hr = method === "small" ? Math.round(1500 / value)
    : method === "large" ? Math.round(300 / value)
    : value * 6;

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", padding:"20px 18px 0" }}>
      <BackButton onBack={onBack} />
      <ScreenTitle Icon={Heart} color="#FFF1F2" accent="#F43F5E" title="Heart Rate Calculator" />

      <div style={{ background:"linear-gradient(135deg,#3B82F6,#1D4ED8)", borderRadius:22, padding:"28px 24px", marginBottom:20, textAlign:"center", color:"#fff" }}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:8 }}>
          <Heart size={22} fill="#fff" strokeWidth={0} style={{ opacity:0.75 }}/>
        </div>
        <div style={{ fontSize:13, fontWeight:600, opacity:0.8, marginBottom:6 }}>CALCULATED HEART RATE</div>
        <div style={{ fontSize:56, fontWeight:900, lineHeight:1 }}>{hr}</div>
        <div style={{ fontSize:14, opacity:0.8 }}>beats per minute</div>
      </div>

      <div style={{ background:"#fff", borderRadius:20, padding:"20px", border:"1.5px solid #E2E8F0", marginBottom:16 }}>
        <div style={{ fontSize:12, fontWeight:700, color:"#475569", marginBottom:10 }}>CALCULATION METHOD</div>
        <div style={{ display:"flex", gap:8, marginBottom:16 }}>
          {[["small","1500/small sq"],["large","300/large sq"],["count","Count × 6"]].map(([m, label]) => (
            <button key={m} onClick={() => setMethod(m)} style={{
              flex:1, padding:"8px 4px", borderRadius:10, fontSize:11, fontWeight:700, cursor:"pointer",
              border: method===m ? "2px solid #3B82F6" : "1.5px solid #E2E8F0",
              background: method===m ? "#EFF6FF" : "#F8FAFC",
              color: method===m ? "#3B82F6" : "#64748B",
            }}>{label}</button>
          ))}
        </div>
        <label style={{ fontSize:12, fontWeight:700, color:"#475569", display:"flex", justifyContent:"space-between" }}>
          {method === "small" ? "SMALL SQUARES IN R-R" : method === "large" ? "LARGE SQUARES IN R-R" : "R-R COUNT IN 10s"}
          <span style={{ color:"#3B82F6" }}>{value}</span>
        </label>
        <input type="range" min="3" max="50" value={value} onChange={e => setValue(+e.target.value)}
          style={{ width:"100%", marginTop:8, accentColor:"#3B82F6" }}/>
        <div style={{ marginTop:12, padding:"12px 14px", background:"#EFF6FF", borderRadius:12, fontSize:13, color:"#1D4ED8", fontWeight:700 }}>
          Formula: {method === "small" ? `1500 ÷ ${value} = ${hr} bpm` : method === "large" ? `300 ÷ ${value} = ${hr} bpm` : `${value} × 6 = ${hr} bpm`}
        </div>
      </div>
    </div>
  );
}

// ─── Axis Determination Tool ─────────────────────────────────────────────────
function AxisTool({ onBack }) {
  const [leadI, setLeadI] = useState(1.0);
  const [aVF, setAVF] = useState(0.8);
  const angle = Math.round(Math.atan2(1.154 * aVF, leadI) * 180 / Math.PI);
  const quadrant = angle >= 0 && angle <= 90 ? "Normal" : angle > 90 ? "RAD" : angle < -30 ? "LAD" : "Normal";
  const qColor = { Normal: "#22C55E", RAD: "#EF4444", LAD: "#F59E0B" }[quadrant] || "#22C55E";

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", padding:"20px 18px 0" }}>
      <BackButton onBack={onBack} />
      <ScreenTitle Icon={Compass} color="#F0FDF4" accent="#22C55E" title="Axis Determination" />

      <div style={{ background:"#fff", borderRadius:22, border:"1.5px solid #E2E8F0", overflow:"hidden", marginBottom:16 }}>
        <svg width="100%" viewBox="0 0 260 260" style={{ display:"block" }}>
          <rect width="260" height="260" fill="#F8FAFC"/>
          <line x1="130" y1="30" x2="130" y2="230" stroke="#CBD5E1" strokeWidth="1.5"/>
          <line x1="30" y1="130" x2="230" y2="130" stroke="#CBD5E1" strokeWidth="1.5"/>
          {[-90,-60,-30,0,30,60,90,120,150,-120,-150,-180].map(a => {
            const ar = a * Math.PI / 180;
            const x2 = 130 + Math.cos(ar)*95;
            const y2 = 130 - Math.sin(ar)*95;
            return <line key={a} x1="130" y1="130" x2={x2} y2={y2} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3"/>;
          })}
          <line x1="130" y1="130"
            x2={130 + Math.cos(angle * Math.PI / 180) * 90}
            y2={130 - Math.sin(angle * Math.PI / 180) * 90}
            stroke={qColor} strokeWidth="3" strokeLinecap="round"/>
          <circle cx={130 + Math.cos(angle * Math.PI / 180) * 90} cy={130 - Math.sin(angle * Math.PI / 180) * 90}
            r="5" fill={qColor}/>
          <circle cx="130" cy="130" r="3" fill="#0F172A"/>
          <text x="130" y="20" textAnchor="middle" fontSize="10" fill={qColor} fontWeight="900">
            Axis: {angle}° — {quadrant}
          </text>
        </svg>
      </div>

      <div style={{ background:"#fff", borderRadius:20, padding:"18px", border:"1.5px solid #E2E8F0", marginBottom:16 }}>
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:12, fontWeight:700, color:"#475569", display:"flex", justifyContent:"space-between" }}>
            LEAD I VOLTAGE <span style={{ color:"#3B82F6" }}>{leadI.toFixed(1)} mV</span>
          </label>
          <input type="range" min="-2" max="2" step="0.1" value={leadI} onChange={e => setLeadI(+e.target.value)}
            style={{ width:"100%", marginTop:8, accentColor:"#3B82F6" }}/>
        </div>
        <div>
          <label style={{ fontSize:12, fontWeight:700, color:"#475569", display:"flex", justifyContent:"space-between" }}>
            aVF VOLTAGE <span style={{ color:"#3B82F6" }}>{aVF.toFixed(1)} mV</span>
          </label>
          <input type="range" min="-2" max="2" step="0.1" value={aVF} onChange={e => setAVF(+e.target.value)}
            style={{ width:"100%", marginTop:8, accentColor:"#3B82F6" }}/>
        </div>
        <div style={{ marginTop:12, padding:"12px 14px", background:"#EFF6FF", borderRadius:12, fontSize:13, color:"#1D4ED8", fontWeight:600 }}>
          tan α = (1.154 × {aVF.toFixed(1)}) ÷ {leadI.toFixed(1)} = {(1.154 * aVF / (leadI || 0.01)).toFixed(3)}
        </div>
      </div>

      <div style={{ padding:"14px 18px", borderRadius:16, border:`2px solid ${qColor}`, background:`${qColor}15`,
        display:"flex", alignItems:"center", gap:8 }}>
        <Compass size={16} color={qColor} strokeWidth={2.5}/>
        <span style={{ fontSize:14, fontWeight:800, color: qColor }}>{quadrant} Axis</span>
        <span style={{ fontSize:13, color:"#64748B", marginLeft:4 }}>{angle}°</span>
      </div>
    </div>
  );
}