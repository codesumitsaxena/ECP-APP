// ─── SettingsScreen ───────────────────────────────────────────────────────────

import { useState } from "react";
import { USER } from "../data/appData.js";
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

// ─── Row Component ────────────────────────────────────────────────────────────
const Row = ({ Icon, iconBg, iconColor, label, value, onClick, toggle, danger }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex", alignItems: "center", padding: "15px 0",
      borderBottom: "1px solid #F1F5F9",
      cursor: onClick ? "pointer" : "default",
      transition: "opacity 0.15s",
    }}
    onMouseEnter={e => onClick && (e.currentTarget.style.opacity = "0.7")}
    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
  >
    <div style={{
      width: 36, height: 36, borderRadius: 12,
      background: danger ? "#FEF2F2" : (iconBg || "#F1F5F9"),
      display: "flex", alignItems: "center", justifyContent: "center",
      marginRight: 14, flexShrink: 0,
      color: danger ? "#EF4444" : (iconColor || "#64748B"),
    }}>
      <Icon size={18} strokeWidth={2} />
    </div>

    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: danger ? "#EF4444" : "#0F172A" }}>{label}</div>
      {value && <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 1 }}>{value}</div>}
    </div>

    {toggle !== undefined ? (
      <div style={{
        width: 44, height: 26, borderRadius: 13,
        background: toggle ? "#3B82F6" : "#E2E8F0",
        position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0,
      }}>
        <div style={{
          width: 20, height: 20, borderRadius: "50%", background: "#fff",
          position: "absolute", top: 3, left: toggle ? 21 : 3,
          transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
        }} />
      </div>
    ) : onClick ? (
      <ChevronRight size={16} color="#CBD5E1" strokeWidth={2.5} />
    ) : null}
  </div>
);

// ─── Profile Edit Modal ───────────────────────────────────────────────────────
// NOTE: To wire this up, pass real user state from parent or context.
// Currently uses local state — integrate with your auth/user store as needed.
function ProfileEditModal({ profile, onSave, onClose }) {
  const [name, setName]   = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [role, setRole]   = useState(profile.role || "Medical Student • ECG Training");

  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: "rgba(15,23,42,0.45)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
    }}>
      <div style={{
        width: "100%", maxWidth: 430,
        background: "#fff", borderRadius: "28px 28px 0 0",
        padding: "28px 22px 40px",
        animation: "slideUp 0.3s cubic-bezier(.34,1.56,.64,1) both",
      }}>
        <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>Edit Profile</div>
          <button onClick={onClose} style={{
            background: "#F1F5F9", border: "none", borderRadius: 10,
            width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#64748B",
          }}>
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Avatar preview */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "linear-gradient(135deg,#3B82F6,#1D4ED8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, fontWeight: 900, color: "#fff",
            boxShadow: "0 4px 16px #3B82F633",
          }}>{initials}</div>
        </div>

        {/* Fields */}
        {[
          { Icon: User,         label: "Full Name",   val: name,  set: setName,  ph: "Dr. Alex"                    },
          { Icon: Mail,         label: "Email",       val: email, set: setEmail, ph: "medical@student.edu"          },
          { Icon: GraduationCap,label: "Role / Batch",val: role,  set: setRole,  ph: "Medical Student • ECG Training"},
        ].map(({ Icon, label, val, set, ph }) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.07em", marginBottom: 6 }}>
              {label.toUpperCase()}
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "#F8FAFC", borderRadius: 14,
              border: "1.5px solid #E2E8F0", padding: "0 14px",
            }}>
              <Icon size={16} color="#94A3B8" strokeWidth={2} />
              <input
                value={val}
                onChange={e => set(e.target.value)}
                placeholder={ph}
                style={{
                  flex: 1, border: "none", background: "transparent",
                  fontSize: 14, fontWeight: 600, color: "#0F172A",
                  padding: "13px 0", outline: "none",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </div>
          </div>
        ))}

        {/* Save button */}
        <button
          onClick={() => onSave({ name, email, role })}
          style={{
            width: "100%", padding: "15px", marginTop: 8,
            background: "linear-gradient(135deg,#3B82F6,#1D4ED8)",
            border: "none", borderRadius: 16, cursor: "pointer",
            color: "#fff", fontSize: 15, fontWeight: 800,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 4px 16px #3B82F633",
          }}
        >
          <Check size={18} strokeWidth={2.5} /> Save Changes
        </button>
      </div>
    </div>
  );
}

// ─── Main SettingsScreen ──────────────────────────────────────────────────────
export default function SettingsScreen({ onLogout }) {
  const [notifications,  setNotifications]  = useState(true);
  const [darkMode,       setDarkMode]        = useState(false);
  const [doubleStandard, setDoubleStandard]  = useState(false);
  const [showEdit,       setShowEdit]        = useState(false);

  // Local profile state — swap with your global user store if needed
  const [profile, setProfile] = useState({
    name:     USER.name,
    email:    USER.email,
    role:     "Medical Student • ECG Training",
    initials: USER.initials,
  });

  const handleSave = (updated) => {
    const initials = updated.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
    setProfile({ ...updated, initials });
    setShowEdit(false);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: "52px 18px 0" }}>

      <h1 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", margin: "0 0 20px" }}>Settings</h1>

      {/* ── Profile Card ── */}
      <div style={{
        background: "linear-gradient(135deg,#3B82F6,#1D4ED8)",
        borderRadius: 22, padding: "22px 20px", marginBottom: 24,
        display: "flex", alignItems: "center", gap: 16, color: "#fff",
        position: "relative",
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, fontWeight: 900, flexShrink: 0,
        }}>
          {profile.initials}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 900 }}>{profile.name}</div>
          <div style={{ fontSize: 13, opacity: 0.8 }}>{profile.email}</div>
          <div style={{ fontSize: 11, marginTop: 4, opacity: 0.7 }}>{profile.role}</div>
        </div>

        {/* Edit button */}
        <button
          onClick={() => setShowEdit(true)}
          style={{
            background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 12, width: 36, height: 36,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#fff", flexShrink: 0,
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.28)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
        >
          <Pencil size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* ── ECG Preferences ── */}
      <div style={{ background: "#fff", borderRadius: 20, padding: "4px 18px", border: "1.5px solid #E2E8F0", marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: 0.8, padding: "14px 0 4px" }}>
          ECG PREFERENCES
        </div>
        <Row Icon={Ruler}   iconBg="#EFF6FF" iconColor="#3B82F6"
          label="Double Standard Mode" value="20 mm/mV"
          toggle={doubleStandard} onClick={() => setDoubleStandard(!doubleStandard)} />
        <Row Icon={Gauge}   iconBg="#FFF7ED" iconColor="#F97316"
          label="Default Paper Speed" value="25 mm/sec"
          onClick={() => alert("Select paper speed: 12.5, 25, 50 mm/s")} />
        <Row Icon={Palette} iconBg="#FDF4FF" iconColor="#A855F7"
          label="Grid Color" value="Classic amber"
          onClick={() => alert("Choose ECG grid color theme")} />
      </div>

      {/* ── App Settings ── */}
      <div style={{ background: "#fff", borderRadius: 20, padding: "4px 18px", border: "1.5px solid #E2E8F0", marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: 0.8, padding: "14px 0 4px" }}>
          APP
        </div>
        <Row Icon={Bell}      iconBg="#FFF1F2" iconColor="#F43F5E"
          label="Push Notifications"
          toggle={notifications} onClick={() => setNotifications(!notifications)} />
        <Row Icon={Moon}      iconBg="#F0FDF4" iconColor="#22C55E"
          label="Dark Mode" value="Coming soon"
          toggle={darkMode} onClick={() => setDarkMode(!darkMode)} />
        <Row Icon={BarChart2} iconBg="#EFF6FF" iconColor="#3B82F6"
          label="Progress Report"
          onClick={() => alert("Opening progress report…")} />
        <Row Icon={Info}      iconBg="#F8FAFC" iconColor="#64748B"
          label="About TTOOLECG" value="Version 1.0"
          onClick={() => alert("TTOOLECG v1.0 — ECG Training & Cardiac Vector Theory\nBy Dr. T. Rajini Samuel")} />
      </div>

      {/* ── Logout ── */}
      <div style={{ background: "#fff", borderRadius: 20, padding: "4px 18px", border: "1.5px solid #FEE2E2", marginBottom: 16 }}>
        <Row Icon={LogOut} label="Sign Out" danger onClick={onLogout} />
      </div>

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