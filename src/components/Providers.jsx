// src/components/Providers.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { providers } from '../data/providers';
import { ChevronRightIcon } from "@heroicons/react/24/outline";

/**
 * Featured Providers Section
 * - Uses HowItWorks-style cards
 * - Can navigate to ProviderCardDetails page via onProviderClick prop
 * - Keyboard accessible
 */
export default function Providers({ onProviderClick }) {
  const handleClick = (id) => {
    // Dispatch legacy custom event and hash for backward compatibility
    try {
      window.dispatchEvent(
        new CustomEvent('provider-selected', { detail: { providerId: id } })
      );
    } catch {}
    try {
      history.replaceState(null, '', `#provider-${id}`);
    } catch {}

    // Navigate to new ProviderCardDetails page if callback is provided
    if (typeof onProviderClick === 'function') {
      onProviderClick(id);
    }
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(id);
    }
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 block"
        >
          Trusted Professionals
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black tracking-tighter dark:text-white"
        >
          Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Providers.</span>
        </motion.h2>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {providers.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${p.name}`}
            onClick={() => handleClick(p.id)}
            onKeyDown={(e) => handleKeyDown(e, p.id)}
            className="group cursor-pointer focus:outline-none"
          >
            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 h-full transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30">

              {/* Avatar & Rating */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-lg"
                  />
                  <div>
                    <div className="text-sm font-black dark:text-white truncate">
                      {p.name}
                    </div>
                    <div className="text-xs font-bold text-slate-400">
                      ⭐ {p.rating} · {p.jobs} jobs
                    </div>
                  </div>
                </div>

                <span className="text-4xl font-black text-slate-100 dark:text-slate-800 group-hover:text-blue-500/20 transition-colors">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Provider Specialty */}
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                {p.title || 'Verified Professional'}
              </p>

              {/* Hover CTA */}
              <div className="mt-8 flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform -translate-x-3 group-hover:translate-x-0">
                View Profile <ChevronRightIcon className="h-3 w-3 stroke-[3]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
