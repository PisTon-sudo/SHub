import React from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  UserGroupIcon, 
  CalendarIcon, 
  HandThumbUpIcon,
  ChevronRightIcon 
} from "@heroicons/react/24/outline";

const steps = [
  {
    number: '01',
    title: 'Discover Talent',
    desc: 'Browse our curated network of 2025 verified professionals.',
    icon: MagnifyingGlassIcon,
    color: 'from-blue-500 to-cyan-400'
  },
  {
    number: '02',
    title: 'Compare & Vet',
    desc: 'Review ratings, portfolios, and real-time response metrics.',
    icon: UserGroupIcon,
    color: 'from-indigo-500 to-purple-400'
  },
  {
    number: '03',
    title: 'Instant Booking',
    desc: 'Schedule services instantly with secure smart-contract logic.',
    icon: CalendarIcon,
    color: 'from-fuchsia-500 to-pink-400'
  },
  {
    number: '04',
    title: 'Quality Delivery',
    desc: 'Get your job done with a 100% satisfaction guarantee.',
    icon: HandThumbUpIcon,
    color: 'from-emerald-500 to-teal-400'
  }
];

export default function HowItWorks() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center mb-20">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 block"
        >
          Simplified Workflow
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black tracking-tighter dark:text-white"
        >
          How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Works.</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connection Line (Desktop Only) */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0" />

        {steps.map((s, idx) => (
          <motion.div 
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative z-10"
          >
            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 h-full transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30">
              
              {/* Step Number & Icon */}
              <div className="flex justify-between items-start mb-8">
                <div className={`p-4 rounded-3xl bg-gradient-to-br ${s.color} shadow-lg shadow-blue-500/20 text-white`}>
                  <s.icon className="h-7 w-7" />
                </div>
                <span className="text-5xl font-black text-slate-100 dark:text-slate-800 group-hover:text-blue-500/20 transition-colors">
                  {s.number}
                </span>
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-black mb-3 dark:text-white group-hover:text-blue-600 transition-colors">
                {s.title}
              </h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                {s.desc}
              </p>

              {/* Bottom Decoration */}
              <div className="mt-8 flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                Learn More <ChevronRightIcon className="h-3 w-3 stroke-[3]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
