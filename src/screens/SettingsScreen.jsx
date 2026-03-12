// ─── SettingsScreen ───────────────────────────────────────────────────────────

import { useState } from "react";
import {
  Ruler,
  Gauge,
  Palette,
  Bell,
  Moon,
  BarChart2,
  Info,
  LogOut,
  ChevronRight,
  Pencil,
  X,
  Check,
  User,
  Mail,
  GraduationCap,
} from "lucide-react";

// Mock USER data for standalone demo
const USER = {
  name: "Dr. Alex Samuel",
  email: "alex@medical.edu",
  initials: "AS",
};

// ─── Row Component ────────────────────────────────────────────────────────────
const Row = ({ Icon, iconBg, iconColor, label, value, onClick, toggle, danger }) => (
  <div
    onClick={onClick}
    className={`flex items-center py-3 border-b border-slate-100 last:border-b-0 transition-opacity duration-150 ${onClick ? "cursor-pointer hover:opacity-70" : "cursor-default"}`}
  >
    {/* Icon Box */}
    <div
      className={`w-7 h-7 rounded-lg flex items-center justify-center mr-3 shrink-0 ${danger ? "bg-red-50 text-red-500" : ""}`}
      style={!danger ? { background: iconBg || "#F1F5F9", color: iconColor || "#64748B" } : {}}
    >
      <Icon size={14} strokeWidth={2} />
    </div>

    {/* Label & Value */}
    <div className="flex-1">
      <div className={`text-[12px] font-bold ${danger ? "text-red-500" : "text-slate-900"}`}>{label}</div>
      {value && <div className="text-[10px] text-slate-400 mt-0.5">{value}</div>}
    </div>

    {/* Toggle or Chevron */}
    {toggle !== undefined ? (
      <div
        className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors duration-200 shrink-0 ${toggle ? "bg-blue-500" : "bg-slate-200"}`}
        style={{ width: 35, height: 21 }}
      >
        <div
          className="w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all duration-200 shadow"
          style={{ left: toggle ? 17 : 2 }}
        />
      </div>
    ) : onClick ? (
      <ChevronRight size={13} className="text-slate-300" strokeWidth={2.5} />
    ) : null}
  </div>
);

// ─── Profile Edit Modal ───────────────────────────────────────────────────────
function ProfileEditModal({ profile, onSave, onClose }) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [role, setRole] = useState(profile.role || "Medical Student • ECG Training");

  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  const fields = [
    { Icon: User, label: "Full Name", val: name, set: setName, ph: "Dr. Alex" },
    { Icon: Mail, label: "Email", val: email, set: setEmail, ph: "medical@student.edu" },
    { Icon: GraduationCap, label: "Role / Batch", val: role, set: setRole, ph: "Medical Student • ECG Training" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/45 backdrop-blur-sm">
      <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
      <div
        className="w-full max-w-[344px] bg-white rounded-t-2xl px-4 pt-5 pb-8"
        style={{ animation: "slideUp 0.3s cubic-bezier(.34,1.56,.64,1) both" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-base font-black text-slate-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="bg-slate-100 border-none rounded-lg w-6 h-6 flex items-center justify-center cursor-pointer text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Avatar Preview */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xl font-black text-white shadow-lg shadow-blue-200"
            style={{ width: 58, height: 58 }}>
            {initials}
          </div>
        </div>

        {/* Fields */}
        {fields.map(({ Icon, label, val, set, ph }) => (
          <div key={label} className="mb-3">
            <div className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mb-1">
              {label}
            </div>
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl border-[1.5px] border-slate-200 px-3">
              <Icon size={14} className="text-slate-400 shrink-0" strokeWidth={2} />
              <input
                value={val}
                onChange={e => set(e.target.value)}
                placeholder={ph}
                className="flex-1 border-none bg-transparent text-[11.5px] font-semibold text-slate-900 py-2.5 outline-none placeholder:text-slate-300 font-[DM_Sans,sans-serif]"
              />
            </div>
          </div>
        ))}

        {/* Save Button */}
        <button
          onClick={() => onSave({ name, email, role })}
          className="w-full py-3 mt-1.5 bg-gradient-to-br from-blue-500 to-blue-700 border-none rounded-xl cursor-pointer text-white text-[12px] font-extrabold flex items-center justify-center gap-1.5 shadow-lg shadow-blue-200 hover:opacity-90 transition-opacity"
        >
          <Check size={14} strokeWidth={2.5} /> Save Changes
        </button>
      </div>
    </div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
const Section = ({ title, children, borderColor = "border-slate-200" }) => (
  <div className={`bg-white rounded-xl px-3 py-1 border-[1.5px] ${borderColor} mb-3`}>
    {title && (
      <div className="text-[9px] font-bold text-slate-400 tracking-[0.05em] uppercase pt-2.5 pb-0.5">
        {title}
      </div>
    )}
    {children}
  </div>
);

// ─── Main SettingsScreen ──────────────────────────────────────────────────────
export default function SettingsScreen({ onLogout }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [doubleStandard, setDoubleStandard] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [profile, setProfile] = useState({
    name: USER.name,
    email: USER.email,
    role: "Medical Student • ECG Training",
    initials: USER.initials,
  });

  const handleSave = (updated) => {
    const initials = updated.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
    setProfile({ ...updated, initials });
    setShowEdit(false);
  };

  return (
    <div className="font-[DM_Sans,sans-serif] px-3 pt-5 pb-5 min-h-screen bg-slate-50">

      <h1 className="text-[21px] font-black text-slate-900 mb-4">Settings</h1>

      {/* ── Profile Card ── */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-[18px] p-4 mb-5 flex items-center gap-3 text-white relative">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-lg font-black shrink-0">
          {profile.initials}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="text-base font-black">{profile.name}</div>
          <div className="text-[10.5px] opacity-80">{profile.email}</div>
          <div className="text-[9px] mt-1 opacity-70">{profile.role}</div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setShowEdit(true)}
          className="bg-white/20 border border-white/30 rounded-lg w-7 h-7 flex items-center justify-center cursor-pointer text-white shrink-0 hover:bg-white/30 transition-colors"
        >
          <Pencil size={13} strokeWidth={2.5} />
        </button>
      </div>

      {/* ── ECG Preferences ── */}
      <Section title="ECG Preferences">
        <Row
          Icon={Ruler} iconBg="#EFF6FF" iconColor="#3B82F6"
          label="Double Standard Mode" value="20 mm/mV"
          toggle={doubleStandard} onClick={() => setDoubleStandard(!doubleStandard)}
        />
        <Row
          Icon={Gauge} iconBg="#FFF7ED" iconColor="#F97316"
          label="Default Paper Speed" value="25 mm/sec"
          onClick={() => alert("Select paper speed: 12.5, 25, 50 mm/s")}
        />
        <Row
          Icon={Palette} iconBg="#FDF4FF" iconColor="#A855F7"
          label="Grid Color" value="Classic amber"
          onClick={() => alert("Choose ECG grid color theme")}
        />
      </Section>

      {/* ── App Settings ── */}
      <Section title="App">
        <Row
          Icon={Bell} iconBg="#FFF1F2" iconColor="#F43F5E"
          label="Push Notifications"
          toggle={notifications} onClick={() => setNotifications(!notifications)}
        />
        <Row
          Icon={Moon} iconBg="#F0FDF4" iconColor="#22C55E"
          label="Dark Mode" value="Coming soon"
          toggle={darkMode} onClick={() => setDarkMode(!darkMode)}
        />
        <Row
          Icon={BarChart2} iconBg="#EFF6FF" iconColor="#3B82F6"
          label="Progress Report"
          onClick={() => alert("Opening progress report…")}
        />
        <Row
          Icon={Info} iconBg="#F8FAFC" iconColor="#64748B"
          label="About TTOOLECG" value="Version 1.0"
          onClick={() => alert("TTOOLECG v1.0 — ECG Training & Cardiac Vector Theory\nBy Dr. T. Rajini Samuel")}
        />
      </Section>

      {/* ── Logout ── */}
      <Section borderColor="border-red-100">
        <Row Icon={LogOut} label="Sign Out" danger onClick={onLogout} />
      </Section>

      {/* ── Profile Edit Modal ── */}
      {showEdit && (
        <ProfileEditModal
          profile={profile}
          onSave={handleSave}
          onClose={() => setShowEdit(false)}
        />
      )}
    </div>
  );
}