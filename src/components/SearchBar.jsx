import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  ChevronDownIcon, 
  MapPinIcon, 
  SparklesIcon, 
  AdjustmentsHorizontalIcon,
  GlobeAltIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

export default function SearchBar({ value, onChange, onSearch }) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [filters, setFilters] = useState({ category: 'All Categories', type: 'Project Type' });

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onSearch(); 
  };

  return (
    <div className="w-full">
      {/* Container - Glassmorphism */}
      <div className="bg-white dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2rem] p-2 shadow-2xl shadow-blue-500/10 transition-all duration-500">
        
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-stretch gap-2">
          
          {/* Main Input - Grows on Desktop, Full on Mobile */}
          <div className="group relative flex-1 flex items-center bg-slate-50 dark:bg-white/5 rounded-2xl px-4 py-4 md:py-5 border border-transparent focus-within:border-blue-500/50 transition-all">
            <SparklesIcon className="h-5 w-5 text-blue-500 animate-pulse shrink-0" />
            <input 
              className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white text-base md:text-lg placeholder:text-slate-400 dark:placeholder:text-slate-500 pl-3"
              placeholder="What help do you need?"
              value={value}
              onChange={onChange}
              autoComplete="off"
            />
            {value && (
              <button type="button" onClick={() => onChange({ target: { value: '' } })} className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Controls Hub: Filters & Search Button */}
          <div className="flex items-center gap-2">
            {/* Advanced Filters Toggle */}
            <button 
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className={`p-4 md:p-5 rounded-2xl transition-all border ${
                isAdvancedOpen ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-50 dark:bg-white/5 border-transparent text-slate-400'
              }`}
            >
              <AdjustmentsHorizontalIcon className="h-6 w-6" />
            </button>
            
            {/* Submit Button */}
            <button 
              type="submit"
              className="flex-1 lg:flex-none lg:w-48 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs md:text-sm uppercase tracking-widest py-4 md:py-5 px-6 rounded-2xl transition-all active:scale-95 shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              <span>Search</span>
            </button>
          </div>
        </form>

        {/* Advanced Panel - Responsive Grid (Stacks on mobile, 2 columns on tablet+) */}
        {isAdvancedOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 mt-2 border-t border-slate-100 dark:border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-transparent">
              <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Category</label>
              <select className="w-full bg-transparent text-slate-900 dark:text-white text-sm outline-none cursor-pointer font-bold">
                <option className="bg-white dark:bg-slate-900">All Categories</option>
                <option className="bg-white dark:bg-slate-900">Home Repair</option>
                <option className="bg-white dark:bg-slate-900">Tech Help</option>
              </select>
            </div>
            <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-transparent">
              <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Project Scope</label>
              <select className="w-full bg-transparent text-slate-900 dark:text-white text-sm outline-none cursor-pointer font-bold">
                <option className="bg-white dark:bg-slate-900">Remote Only</option>
                <option className="bg-white dark:bg-slate-900">On-Site</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Trending Tags - Desktop only, or scrollable on mobile */}
      <div className="mt-6 flex overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 gap-3 no-scrollbar">
        <span className="shrink-0 text-[10px] text-blue-500 font-black uppercase tracking-[0.2em] bg-blue-500/10 px-3 py-1.5 rounded-md flex items-center">Trending</span>
        {['AI Support', 'Design', 'Plumbing'].map(tag => (
          <button 
            key={tag} 
            onClick={() => { onChange({ target: { value: tag } }); setTimeout(onSearch, 50); }}
            className="shrink-0 text-[11px] text-slate-400 font-bold bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-1.5 rounded-full hover:border-blue-500/50 hover:text-blue-500 transition-all"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
