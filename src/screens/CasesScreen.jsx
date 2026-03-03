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
    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: "52px 18px 0" }}>
      <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }`}</style>
      <h1 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", margin: "0 0 4px" }}>Clinical Cases</h1>
      <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 20px" }}>
        {CLINICAL_CASES.length} reference cases by Dr. T. Rajini Samuel
      </p>

      {/* Filter Chips */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 20,
        scrollbarWidth: "none", WebkitScrollbar: { display: "none" } }}>
        {tags.map(tag => (
          <button key={tag} onClick={() => setFilter(tag)} style={{
            padding: "7px 16px", borderRadius: 22, border: "none",
            background: filter === tag ? "#3B82F6" : "#fff",
            color: filter === tag ? "#fff" : "#64748B",
            fontSize: 12, fontWeight: 700, cursor: "pointer",
            border: filter === tag ? "none" : "1.5px solid #E2E8F0",
            whiteSpace: "nowrap", flexShrink: 0,
            transition: "all 0.2s",
          }}>
            {tag}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
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