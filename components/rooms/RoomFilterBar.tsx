"use client";

interface RoomFilterBarProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  resultsCount: number;
}

export default function RoomFilterBar({ filters, activeFilter, onFilterChange, resultsCount }: RoomFilterBarProps) {
  return (
    <div className="max-w-4xl mx-auto relative z-20 -mt-8 px-6">
      {/* ប្តូរមកប្រើ bg-white/90 ដើម្បីឱ្យភ្លឺស្រឡះ */}
      <div className="bg-white/90 backdrop-blur-2xl p-2 rounded-full border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-between overflow-x-auto custom-scrollbar">
        <div className="flex gap-2 pl-2">
          {filters.map((filter) => (
            <button 
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                activeFilter === filter 
                  ? "bg-amber-500 text-white shadow-[0_4px_15px_rgba(245,158,11,0.3)] scale-105" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {filter === "All" ? "All Rooms" : filter}
            </button>
          ))}
        </div>
        <div className="pr-4 pl-2 text-slate-500 flex items-center gap-2 font-bold text-sm">
          <span className="text-amber-500">{resultsCount}</span> Rooms
        </div>
      </div>
    </div>
  );
}