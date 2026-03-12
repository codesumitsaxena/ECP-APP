import { useState } from "react";
import {
  Activity,
  Zap,
  Heart,
  Compass,
  FlipHorizontal,
  LayoutGrid,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

function BackButton({ onBack }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-[#2563EB] text-sm font-semibold mb-5 group"
    >
      <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" strokeWidth={2.5} />
      Back
    </button>
  );
}

function ScreenTitle({ Icon, color, accent, title, sub }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-white" style={{ background: color, color: accent }}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-[#0F172A] leading-tight">{title}</h2>
        {sub && <p className="text-xs text-[#64748B] font-medium">{sub}</p>}
      </div>
    </div>
  );
}

// ── TRAIN_TOOLS data ─────────────────────────────────────────────────────────
const TRAIN_TOOLS = [
  { id: "ecg", title: "ECG Renderer", sub: "Interactive waves", Icon: Activity, color: "#EEF2F7", accent: "#2563EB" },
  { id: "vector", title: "Vector Sim", sub: "Hex-axial model", Icon: Zap, color: "#EEF2F7", accent: "#2563EB" },
  { id: "heartrate", title: "Heart Rate", sub: "Calculation formulas", Icon: Heart, color: "#EEF2F7", accent: "#2563EB" },
  { id: "axis", title: "Axis Tool", sub: "Quadrants & angles", Icon: Compass, color: "#EEF2F7", accent: "#2563EB" },
  { id: "reversal", title: "Lead Reversal", sub: "Electrode swaps", Icon: FlipHorizontal, color: "#EEF2F7", accent: "#2563EB" },
  { id: "chest", title: "Chest Leads", sub: "V1-V6 placement", Icon: LayoutGrid, color: "#EEF2F7", accent: "#2563EB" },
];

export default function TrainScreen() {
  const [active, setActive] = useState(null);

  if (active === "ecg") return <ECGRendererTool onBack={() => setActive(null)} />;
  if (active === "vector") return <VectorSimTool onBack={() => setActive(null)} />;
  if (active === "heartrate") return <HeartRateTool onBack={() => setActive(null)} />;
  if (active === "axis") return <AxisTool onBack={() => setActive(null)} />;

  return (
    <div className="min-h-screen bg-[#EEF2F7] px-4 pt-5 pb-0">
      <h1 className="text-2xl font-bold text-[#0F172A]">Train</h1>
      <p className="text-sm text-[#64748B] mb-6">Interactive ECG Simulators</p>

      <div className="grid grid-cols-2 gap-3 mb-0">
        {TRAIN_TOOLS.map((tool) => (
          <div
            key={tool.id}
            onClick={() => setActive(tool.id)}
            className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm flex flex-col items-center text-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            <div className="w-12 h-12 rounded-2xl mb-3 flex items-center justify-center shrink-0 border border-white shadow-sm bg-[#EEF2F7] text-[#2563EB]">
              <tool.Icon size={24} strokeWidth={2.5} />
            </div>
            <div className="text-sm font-semibold text-[#0F172A] leading-tight">{tool.title}</div>
            <div className="text-[10px] text-[#94A3B8] leading-tight mt-1">{tool.sub}</div>
            <div className="mt-3 text-[10px] font-bold flex items-center gap-1 text-[#2563EB]">
              Launch <ChevronRight size={10} strokeWidth={3} />
            </div>
          </div>
        ))}
      </div>
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
    <div className="min-h-screen bg-[#EEF2F7] px-4 pt-5 pb-0">
      <BackButton onBack={onBack} />
      <ScreenTitle Icon={Activity} color="#EEF2F7" accent="#2563EB" title="ECG Renderer" sub="Adjust amplitude and paper speed" />

      <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm mb-5">
        <svg width="100%" height="160" viewBox="0 0 300 120" preserveAspectRatio="none" className="block bg-[#FFF9F2]">
          {Array.from({ length: 31 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="120" stroke="#FBBF24" strokeWidth={i % 5 === 0 ? 0.6 : 0.3} />
          ))}
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 10} x2="300" y2={i * 10} stroke="#FBBF24" strokeWidth={i % 5 === 0 ? 0.6 : 0.3} />
          ))}
          <polyline fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" points={points.join(" ")} />
        </svg>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm mb-0">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">AMPLITUDE (mV)</span>
            <span className="text-sm font-bold text-[#2563EB]">{(amplitude / 50).toFixed(1)} mV</span>
          </div>
          <input type="range" min="10" max="100" value={amplitude} onChange={e => setAmplitude(+e.target.value)} className="w-full h-1.5 bg-[#EEF2F7] rounded-full appearance-none accent-[#2563EB] cursor-pointer" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-2">PAPER SPEED</span>
          <div className="grid grid-cols-3 gap-2">
            {[12.5, 25, 50].map(s => (
              <button key={s} onClick={() => setSpeed(s)} className={`py-2 rounded-xl text-xs font-bold border transition-all ${speed === s ? "bg-[#2563EB] text-white shadow-sm" : "bg-white border-[#E2E8F0] text-[#64748B]"}`}>
                {s} <span className="text-[8px] opacity-70 ml-0.5">mm/s</span>
              </button>
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
    { name: "Lead I", angle: 0 }, { name: "Lead II", angle: 60 }, { name: "Lead III", angle: 120 },
    { name: "aVR", angle: -150 }, { name: "aVL", angle: -30 }, { name: "aVF", angle: 90 },
  ];

  return (
    <div className="min-h-screen bg-[#EEF2F7] px-4 pt-5 pb-0">
      <BackButton onBack={onBack} />
      <ScreenTitle Icon={Zap} color="#EEF2F7" accent="#2563EB" title="Vector Sim" sub="Hex-axial reference system" />

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-md overflow-hidden mb-5">
        <svg width="100%" viewBox="0 0 260 260" className="block p-4 bg-white">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F1F5F9" strokeWidth="2" strokeDasharray="4 4" />
          {leads.map(l => {
            const lr = (l.angle * Math.PI) / 180;
            const x2 = cx + Math.cos(lr) * r;
            const y2 = cy - Math.sin(lr) * r;
            const x1 = cx - Math.cos(lr) * r;
            const y1 = cy + Math.sin(lr) * r;
            return (
              <g key={l.name}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 2" />
                <text x={x2 + (x2 - cx) * 0.15} y={y2 + (y2 - cy) * 0.15 + 3} className="text-[10px] fill-[#94A3B8] font-bold" textAnchor="middle">{l.name}</text>
              </g>
            );
          })}
          <line x1={cx} y1={cy} x2={vx} y2={vy} stroke="#2563EB" strokeWidth="4" strokeLinecap="round" className="drop-shadow-sm" />
          <circle cx={vx} cy={vy} r="6" fill="#2563EB" className="drop-shadow-md" />
          <circle cx={cx} cy={cy} r="4" fill="#0F172A" />
          <text x={cx} y={cy - r - 15} textAnchor="middle" className="text-sm font-bold fill-[#2563EB]">
            {angle}° / {magnitude.toFixed(1)} mV
          </text>
        </svg>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm mb-5 space-y-5">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">ANGLE</span>
            <span className="text-sm font-bold text-[#2563EB]">{angle}°</span>
          </div>
          <input type="range" min="-180" max="180" value={angle} onChange={e => setAngle(+e.target.value)} className="w-full h-1.5 bg-[#EEF2F7] rounded-full appearance-none accent-[#2563EB] cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">MAGNITUDE</span>
            <span className="text-sm font-bold text-[#2563EB]">{magnitude.toFixed(1)} mV</span>
          </div>
          <input type="range" min="0.1" max="2" step="0.1" value={magnitude} onChange={e => setMagnitude(+e.target.value)} className="w-full h-1.5 bg-[#EEF2F7] rounded-full appearance-none accent-[#2563EB] cursor-pointer" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-0">
        {leads.map(l => {
          const proj = Math.cos((angle - l.angle) * Math.PI / 180) * magnitude;
          return (
            <div key={l.name} className="bg-white rounded-xl p-2 border border-[#E2E8F0] text-center">
              <div className="text-[8px] text-[#94A3B8] font-bold mb-1 uppercase tracking-tight">{l.name}</div>
              <div className={`text-xs font-bold ${proj >= 0 ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                {proj > 0 ? "+" : ""}{proj.toFixed(2)}
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
  const hr = method === "small" ? Math.round(1500 / value) : method === "large" ? Math.round(300 / value) : value * 6;

  return (
    <div className="min-h-screen bg-[#EEF2F7] px-4 pt-5 pb-0">
      <BackButton onBack={onBack} />
      <ScreenTitle Icon={Heart} color="#EEF2F7" accent="#2563EB" title="HR Calculator" sub="Formula-based ECG calculation" />

      <div className="bg-[#2563EB] rounded-3xl p-6 mb-5 text-center text-white shadow-lg">
        <div className="text-[10px] font-bold opacity-70 uppercase tracking-widest mb-1">Estimated Heart Rate</div>
        <div className="text-6xl font-black">{hr}</div>
        <div className="text-sm font-medium opacity-80 mt-1">Beats Per Minute</div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm mb-0 space-y-6">
        <div>
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-3">CALCULATION METHOD</span>
          <div className="flex gap-2">
            {[["small", "1500 ÷ n"], ["large", "300 ÷ n"], ["count", "n × 6"]].map(([m, label]) => (
              <button key={m} onClick={() => setMethod(m)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${method === m ? "bg-[#2563EB] text-white shadow-sm" : "bg-white border-[#E2E8F0] text-[#64748B]"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
              {method === "small" ? "SMALL SQUARES" : method === "large" ? "LARGE SQUARES" : "6-SECOND COUNT"}
            </span>
            <span className="text-sm font-bold text-[#2563EB]">{value}</span>
          </div>
          <input type="range" min="3" max="50" value={value} onChange={e => setValue(+e.target.value)} className="w-full h-1.5 bg-[#EEF2F7] rounded-full appearance-none accent-[#2563EB] cursor-pointer" />
        </div>
        <div className="bg-[#EEF2F7] p-3 rounded-xl border border-[#E2E8F0]">
          <div className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider mb-1">Applied Formula</div>
          <div className="text-sm font-bold text-[#0F172A]">
            {method === "small" ? `1500 ÷ ${value} = ${hr} bpm` : method === "large" ? `300 ÷ ${value} = ${hr} bpm` : `${value} × 6 = ${hr} bpm`}
          </div>
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
  const qColor = { Normal: "#10B981", RAD: "#EF4444", LAD: "#F59E0B" }[quadrant] || "#10B981";

  return (
    <div className="min-h-screen bg-[#EEF2F7] px-4 pt-5 pb-0">
      <BackButton onBack={onBack} />
      <ScreenTitle Icon={Compass} color="#EEF2F7" accent="#2563EB" title="Axis Tool" sub="Determine QRS axis in 2D" />

      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-md overflow-hidden mb-5">
        <svg width="100%" viewBox="0 0 260 260" className="block bg-white">
          <line x1="130" y1="30" x2="130" y2="230" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="30" y1="130" x2="230" y2="130" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
          {[-30, 0, 90, 120, 180].map(a => {
            const ar = a * Math.PI / 180;
            return <line key={a} x1="130" y1="130" x2={130 + Math.cos(ar) * 90} y2={130 - Math.sin(ar) * 90} stroke="#E2E8F0" strokeWidth="1" />;
          })}
          <line x1="130" y1="130" x2={130 + Math.cos(angle * Math.PI / 180) * 95} y2={130 - Math.sin(angle * Math.PI / 180) * 95} stroke={qColor} strokeWidth="5" strokeLinecap="round" className="drop-shadow-lg transition-all duration-500 ease-out" />
          <circle cx={130 + Math.cos(angle * Math.PI / 180) * 95} cy={130 - Math.sin(angle * Math.PI / 180) * 95} r="7" fill={qColor} className="drop-shadow-lg" />
          <circle cx="130" cy="130" r="4" fill="#0F172A" />
          <text x="130" y="250" textAnchor="middle" className="text-base font-black uppercase tracking-widest" style={{ fill: qColor }}>
            {quadrant} Axis ({angle}°)
          </text>
        </svg>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm mb-0 space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">LEAD I (mV)</span>
            <span className="text-sm font-bold text-[#2563EB]">{leadI.toFixed(2)}</span>
          </div>
          <input type="range" min="-2" max="2" step="0.01" value={leadI} onChange={e => setLeadI(+e.target.value)} className="w-full h-1.5 bg-[#EEF2F7] rounded-full appearance-none accent-[#2563EB] cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">aVF (mV)</span>
            <span className="text-sm font-bold text-[#2563EB]">{aVF.toFixed(2)}</span>
          </div>
          <input type="range" min="-2" max="2" step="0.01" value={aVF} onChange={e => setAVF(+e.target.value)} className="w-full h-1.5 bg-[#EEF2F7] rounded-full appearance-none accent-[#2563EB] cursor-pointer" />
        </div>
        <div className="bg-[#EEF2F7] p-3 rounded-xl border border-[#E2E8F0] text-center">
          <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest block mb-1">Calculation result</span>
          <div className="text-sm font-bold text-[#0F172A]">tan α = (1.154 × {aVF.toFixed(1)}) / {leadI.toFixed(1)}</div>
        </div>
      </div>
    </div>
  );
}