import { Activity, Zap } from "lucide-react";

export default function QuickToolCard({ tool, onClick }) {
  const Icon = tool.id === "ecg_renderer" ? Activity : Zap;

  return (
    <div
      onClick={onClick}
      className="flex-1 bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm flex flex-col items-center text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1 active:scale-95"
    >
      <div 
        className="w-11 h-11 rounded-2xl mb-3 flex items-center justify-center shadow-sm border border-white"
        style={{ background: tool.color, color: tool.iconColor }}
      >
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <div className="text-sm font-bold text-[#0F172A] leading-tight">{tool.title}</div>
      <div className="text-[10px] text-[#94A3B8] leading-tight mt-1 font-medium">{tool.sub}</div>
    </div>
  );
}
