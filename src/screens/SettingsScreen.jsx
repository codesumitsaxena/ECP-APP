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
// ─── Row Component ────────────────────────────────────────────────────────────
const Row = ({ Icon, label, value, onClick, toggle, danger }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-4 py-3.5 border-b border-[#E2E8F0] last:border-b-0 ${onClick || toggle !== undefined ? "cursor-pointer" : ""}`}
  >
    <div className="flex items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 shrink-0 ${danger ? "bg-red-50 text-red-500" : "bg-[#EEF2F7] text-[#2563EB]"}`}>
        <Icon size={16} strokeWidth={2} />
      </div>
      <div>
        <div className={`text-sm font-medium ${danger ? "text-red-500" : "text-[#0F172A]"}`}>{label}</div>
        {value && <div className="text-xs text-[#94A3B8] mt-0.5">{value}</div>}
      </div>
    </div>
    {toggle !== undefined ? (
      <div className={`w-10 h-5 rounded-full relative transition-colors duration-200 shrink-0 ${toggle ? "bg-[#2563EB]" : "bg-[#CBD5E1]"}`}>
        <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all duration-200 shadow-sm ${toggle ? "left-[22px]" : "left-0.5"}`} />
      </div>
    ) : onClick ? (
      <ChevronRight size={14} className="text-[#94A3B8]" strokeWidth={2.5} />
    ) : null}
  </div>
);

function ProfileEditModal({ profile, onSave, onClose }) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [role, setRole] = useState(profile.role || "Medical Student • ECG Training");
  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center bg-[#0F172A]/40 backdrop-blur-sm px-4">
      <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
      <div className="w-full max-w-sm bg-white rounded-t-3xl px-5 pt-6 pb-10" style={{ animation: "slideUp 0.3s ease both" }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-[#0F172A]">Edit Profile</h2>
          <button onClick={onClose} className="bg-[#EEF2F7] p-2 rounded-full text-[#2563EB]"><X size={18} /></button>
        </div>
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#2563EB] flex items-center justify-center text-xl font-bold text-white uppercase">{initials}</div>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block px-1">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#EEF2F7] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium text-[#0F172A] outline-none" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block px-1">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#EEF2F7] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium text-[#0F172A] outline-none" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block px-1">Role / Batch</label>
            <input value={role} onChange={e => setRole(e.target.value)} className="w-full bg-[#EEF2F7] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium text-[#0F172A] outline-none" />
          </div>
        </div>
        <button onClick={() => onSave({ name, email, role })} className="w-full py-4 bg-[#2563EB] text-white rounded-xl text-sm font-bold shadow-lg flex items-center justify-center gap-2"><Check size={18} /> Save Changes</button>
      </div>
    </div>
  );
}

export default function SettingsScreen({ onLogout }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [doubleStandard, setDoubleStandard] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [profile, setProfile] = useState({ name: USER.name, email: USER.email, role: "Medical Student • ECG Training", initials: USER.initials });

  const handleSave = (updated) => {
    const initials = updated.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
    setProfile({ ...updated, initials });
    setShowEdit(false);
  };

  return (
    <div className="min-h-screen bg-[#EEF2F7] px-4 pt-5 pb-0">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-5">Settings</h1>
      {/* Profile Card Fixed with bg-[#2563EB] only */}
      <div className="bg-[#2563EB] rounded-2xl p-4 flex items-center justify-between mb-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold text-white">{profile.initials}</div>
          <div>
            <div className="text-white font-semibold text-sm leading-tight">{profile.name}</div>
            <div className="text-white/80 text-xs mt-0.5">{profile.email}</div>
            <div className="text-white/70 text-[10px] mt-0.5">{profile.role}</div>
          </div>
        </div>
        <button onClick={() => setShowEdit(true)} className="text-white/80 p-1 hover:text-white"><Pencil size={18} /></button>
      </div>

      <div className="mb-5">
        <h3 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2 px-1">ECG PREFERENCES</h3>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <Row Icon={Ruler} label="Double Standard Mode" value="20 mm/mV" toggle={doubleStandard} onClick={() => setDoubleStandard(!doubleStandard)} />
          <Row Icon={Gauge} label="Default Paper Speed" value="25 mm/sec" onClick={() => alert("Select paper speed")} />
          <Row Icon={Palette} label="Grid Color" value="Classic amber" onClick={() => alert("Choose grid color")} />
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2 px-1">APP</h3>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <Row Icon={Bell} label="Push Notifications" toggle={notifications} onClick={() => setNotifications(!notifications)} />
          <Row Icon={Moon} label="Dark Mode" value="Coming soon" toggle={darkMode} onClick={() => setNotifications(!notifications)} />
          <Row Icon={BarChart2} label="Progress Report" onClick={() => alert("Opening progress report…")} />
          <Row Icon={Info} label="About TTOOLECG" value="Version 1.0" onClick={() => alert("TTOOLECG v1.0")} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-0">
        <Row Icon={LogOut} label="Sign Out" danger onClick={onLogout} />
      </div>

      {showEdit && <ProfileEditModal profile={profile} onSave={handleSave} onClose={() => setShowEdit(false)} />}
    </div>
  );
}