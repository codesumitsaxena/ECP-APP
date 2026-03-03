// ─── TTOOLECG App Data & Constants ─────────────────────────────────────────

export const USER = {
  name: "Dr. Alex",
  initials: "AD",
  email: "medical@student.edu",
  progress: 42,
  weeklyGain: 5,
  stats: { modules: 3, sims: 12, cases: 8, time: "4h" },
};

export const CURRENT_MODULE = {
  number: 3,
  title: "ECG Leads & Axis Determination",
  time: "2h ago",
  progress: 45,
  description: "Learn to identify leads, calculate the cardiac axis, and determine angle deviation using the hex-axial reference system.",
};

export const MODULES = [
  { id: 1, number: 1, title: "Electrophysiology of the Heart", progress: 100, status: "completed", tag: "Theory" },
  { id: 2, number: 2, title: "ECG Standardization", progress: 100, status: "completed", tag: "Training" },
  { id: 3, number: 3, title: "ECG Leads & Axis Determination", progress: 45, status: "active", tag: "Active" },
  { id: 4, number: 4, title: "Heart Rate Calculation", progress: 0, status: "locked", tag: "Locked" },
  { id: 5, number: 5, title: "Cardiac Vector Theory", progress: 0, status: "locked", tag: "Locked" },
  { id: 6, number: 6, title: "Lead Reversal Simulation", progress: 0, status: "locked", tag: "Locked" },
  { id: 7, number: 7, title: "Precordial Lead Wave Genesis", progress: 0, status: "locked", tag: "Locked" },
  { id: 8, number: 8, title: "Vector-Based ECG Interpretation", progress: 0, status: "locked", tag: "Locked" },
];

export const QUICK_TOOLS = [
  {
    id: "ecg_renderer",
    title: "ECG Renderer",
    sub: "Practice grid analysis",
    color: "#DBEAFE",
    iconColor: "#3B82F6",
    screen: "train",
  },
  {
    id: "vector_sim",
    title: "Vector Sim",
    sub: "Hex-axial model",
    color: "#EDE9FE",
    iconColor: "#7C3AED",
    screen: "train",
  },
];

export const CLINICAL_CASES = [
  {
    id: 1,
    title: "Normal QRS/T Angle",
    sub: "Clinical presentation #1",
    tag: "NORMAL",
    tagColor: "#22C55E",
    tagBg: "#DCFCE7",
    angle: "+68.93°",
    qrs: "68.93°",
    t: "55.26°",
    description: "Normal cardiac vector with QRS/T angle within 60°. Baseline reference case.",
    findings: [["QRS Angle", "68.93°"], ["T Angle", "55.26°"], ["QRS/T diff", "13.67°"], ["Assessment", "Normal"]],
  },
  {
    id: 2,
    title: "Inferior Wall Ischemia",
    sub: "Clinical presentation #842",
    tag: "ISCHEMIA",
    tagColor: "#EF4444",
    tagBg: "#FEE2E2",
    angle: "+110°",
    description: "T-wave inversion in Lead III and aVF. Right axis deviation pattern.",
    findings: [["Axis", "+110°"], ["Lead II", "ST depression"], ["aVF", "T-wave inversion"], ["V1-V4", "Normal"]],
  },
  {
    id: 3,
    title: "Inferior Wall MI",
    sub: "Clinical presentation #3",
    tag: "STEMI",
    tagColor: "#DC2626",
    tagBg: "#FEE2E2",
    angle: "+95°",
    description: "ST elevation in Leads II, III, aVF. Acute inferior STEMI pattern.",
    findings: [["ST elevation", "II, III, aVF"], ["Reciprocal", "aVL depression"], ["Axis", "+95°"], ["Severity", "Acute"]],
  },
  {
    id: 4,
    title: "Intraventricular Conduction Defect",
    sub: "Clinical presentation #4",
    tag: "IVCD",
    tagColor: "#D97706",
    tagBg: "#FEF3C7",
    angle: "+140°",
    description: "Wide QRS/T angle indicating intraventricular conduction defect.",
    findings: [["QRS Duration", ">120ms"], ["QRS/T angle", "Wide"], ["Axis", "+140°"], ["Pattern", "LBBB-like"]],
  },
  {
    id: 5,
    title: "Abnormal QRS/T Angle",
    sub: "Clinical presentation #5",
    tag: "ABNORMAL",
    tagColor: "#7C3AED",
    tagBg: "#EDE9FE",
    angle: "+85°",
    description: "Secondary T-wave changes due to abnormal depolarization sequence.",
    findings: [["QRS Angle", "85°"], ["T Angle", "145°"], ["QRS/T diff", "60°+"], ["Cause", "Secondary T-wave"]],
  },
];

export const TRAIN_TOOLS = [
  { id: "ecg", title: "ECG Renderer", sub: "Interactive ECG grid with P, QRS, T waves", icon: "📈", color: "#DBEAFE", accent: "#3B82F6" },
  { id: "vector", title: "Cardiac Vector Sim", sub: "Hex-axial model with dot product", icon: "🎯", color: "#EDE9FE", accent: "#7C3AED" },
  { id: "heartrate", title: "Heart Rate Calculator", sub: "R-R interval method", icon: "💓", color: "#FCE7F3", accent: "#EC4899" },
  { id: "axis", title: "Axis Determination", sub: "Tanα formula, four-quadrant", icon: "🧭", color: "#D1FAE5", accent: "#10B981" },
  { id: "reversal", title: "Lead Reversal Sim", sub: "All 6 reversal combinations", icon: "🔄", color: "#FEF3C7", accent: "#F59E0B" },
  { id: "chest", title: "Chest Lead Placement", sub: "Drag-and-drop electrodes", icon: "🫁", color: "#FFE4E6", accent: "#F43F5E" },
];