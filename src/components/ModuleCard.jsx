export default function ModuleCard({ mod, onResume }) {
  return (
    <div className="bg-white rounded-[18px] p-4 border-[1.5px] border-slate-200 shadow-sm shadow-blue-100">
      
      {/* Top Row */}
      <div className="flex justify-between items-start mb-2">
        <span className="bg-blue-50 text-blue-500 text-[9px] font-bold px-2.5 py-0.5 rounded-full tracking-wide">
          Module {mod.number}
        </span>
        <span className="text-[10px] text-slate-400">Opened {mod.time}</span>
      </div>

      {/* Title */}
      <div className="text-[14px] font-extrabold text-slate-900 my-1.5 mb-3 leading-snug">
        {mod.title}
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-blue-50 rounded-full mb-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${mod.progress}%` }}
        />
      </div>

      {/* Resume Button */}
      <button
        onClick={onResume}
        className="w-full py-2.5 rounded-xl border-none bg-gradient-to-br from-blue-500 to-blue-700 text-white text-[12px] font-bold cursor-pointer tracking-wide hover:opacity-90 active:scale-[0.98] transition-all duration-150"
      >
        Resume Module →
      </button>
    </div>
  );
}