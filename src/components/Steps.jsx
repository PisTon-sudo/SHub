import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {title: 'Search', desc: 'Find the service you need.'},
  {title: 'Compare', desc: 'Check providers and reviews.'},
  {title: 'Book', desc: 'Hire and start work quickly.'}
];

export default function Steps(){
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold mb-6">How it works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {steps.map((s,i)=>(
          <motion.div key={s.title} initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay: i*0.12}} className="bg-white dark:bg-slate-900 border p-6 rounded-lg shadow">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3">{i+1}</div>
            <h3 className="font-semibold mb-1">{s.title}</h3>
            <p className="text-sm text-slate-500">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
