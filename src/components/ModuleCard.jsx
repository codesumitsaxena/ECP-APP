export default function ModuleCard({ mod, onResume }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm">
      {/* Top Row */}
      <div className="flex justify-between items-center mb-2">
        <span className="bg-[#EFF6FF] text-[#2563EB] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          Module {mod.number}
        </span>
        <span className="text-[10px] text-[#94A3B8] font-medium">{mod.time}</span>
      </div>

      {/* Title */}
      <div className="text-sm font-bold text-[#0F172A] mt-2 mb-3 leading-snug">
        {mod.title}
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 bg-[#EFF6FF] rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-[#2563EB] rounded-full transition-all duration-700 ease-out"
          style={{ width: `${mod.progress}%` }}
        />
      </div>

      {/* Resume Button */}
      <button
        onClick={onResume}
        className="w-full py-2.5 bg-[#2563EB] text-white text-xs font-semibold rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg shadow-blue-100"
      >
        Resume Module →
      </button>
    </div>
  );
}