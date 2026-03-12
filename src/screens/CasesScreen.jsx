// ─── CasesScreen ─────────────────────────────────────────────────────────────

import { useState } from "react";
import CaseCard from "../components/CaseCard.jsx";
import CaseModal from "../components/CaseModal.jsx";
import { CLINICAL_CASES } from "../data/appData.js";

export default function CasesScreen() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("ALL");

  const tags = ["ALL", "NORMAL", "ISCHEMIA", "STEMI", "IVCD", "ABNORMAL"];
  const filtered = filter === "ALL" ? CLINICAL_CASES : CLINICAL_CASES.filter(c => c.tag === filter);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: "16px 14px 0" }}>
      <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }`}</style>
      <h1 style={{ fontSize: 21, fontWeight: 900, color: "#0F172A", margin: "0 0 3px" }}>Clinical Cases</h1>
      <p style={{ fontSize: 10.5, color: "#64748B", margin: "0 0 16px" }}>
        {CLINICAL_CASES.length} reference cases by Dr. T. Rajini Samuel
      </p>

      {/* Filter Chips */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 3, marginBottom: 16,
        scrollbarWidth: "none", WebkitScrollbar: { display: "none" } }}>
        {tags.map(tag => (
          <button key={tag} onClick={() => setFilter(tag)} style={{
            padding: "5.5px 13px", borderRadius: 18, border: "none",
            background: filter === tag ? "#3B82F6" : "#fff",
            color: filter === tag ? "#fff" : "#64748B",
            fontSize: 10, fontWeight: 700, cursor: "pointer",
            border: filter === tag ? "none" : "1.5px solid #E2E8F0",
            whiteSpace: "nowrap", flexShrink: 0,
            transition: "all 0.2s",
          }}>
            {tag}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {filtered.map((c, i) => (
          <div key={c.id} style={{ animation: `fadeUp 0.4s ease ${i * 70}ms both` }}>
            <CaseCard caseData={c} onClick={() => setSelected(c)} />
          </div>
        ))}
      </div>

      {selected && (
        <CaseModal
          caseData={selected}
          onClose={() => setSelected(null)}
          onStart={() => { setSelected(null); alert(`Starting analysis: ${selected.title}`); }}
        />
      )}
    </div>
  );
}