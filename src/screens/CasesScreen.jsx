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
    <div className="min-h-screen bg-[#EEF2F7] px-4 pt-5 pb-0">
      <h1 className="text-2xl font-bold text-[#0F172A]">Clinical Cases</h1>
      <p className="text-sm text-[#64748B] mb-5">
        {CLINICAL_CASES.length} reference cases by Dr. T. Rajini Samuel
      </p>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-5">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border-none outline-none cursor-pointer ${filter === tag
                ? "bg-[#2563EB] text-white shadow-md shadow-blue-200"
                : "bg-white text-[#64748B] border border-[#E2E8F0]"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 mb-0">
        {filtered.map((c) => (
          <div key={c.id}>
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