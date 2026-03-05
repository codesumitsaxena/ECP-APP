export default function ModuleCard({ mod, onResume }) {
  return (
    <div className="bg-white rounded-[22px] p-5 border-[1.5px] border-slate-200 shadow-sm shadow-blue-100">
      
      {/* Top Row */}
      <div className="flex justify-between items-start mb-2.5">
        <span className="bg-blue-50 text-blue-500 text-[11px] font-bold px-3 py-1 rounded-full tracking-wide">
          Module {mod.number}
        </span>
        <span className="text-xs text-slate-400">Opened {mod.time}</span>
      </div>

      {/* Title */}
      <div className="text-[17px] font-extrabold text-slate-900 my-2 mb-3.5 leading-snug">
        {mod.title}
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 bg-blue-50 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${mod.progress}%` }}
        />
      </div>

      {/* Resume Button */}
      <button
        onClick={onResume}
        className="w-full py-3.5 rounded-2xl border-none bg-gradient-to-br from-blue-500 to-blue-700 text-white text-sm font-bold cursor-pointer tracking-wide hover:opacity-90 active:scale-[0.98] transition-all duration-150"
      >
        Resume Module →
      </button>
    </div>
  );
}