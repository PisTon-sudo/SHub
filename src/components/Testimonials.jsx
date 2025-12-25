import React, {useState, useEffect} from 'react';
import { testimonials } from '../data/testimonials';
import { motion } from 'framer-motion';

export default function Testimonials(){
  const [idx, setIdx] = useState(0);
  useEffect(()=>{
    const id = setInterval(()=> setIdx(i=> (i+1)%testimonials.length), 4500);
    return ()=> clearInterval(id);
  },[]);

  const next = () => setIdx((i)=> (i+1)%testimonials.length);
  const prev = () => setIdx((i)=> (i-1+testimonials.length)%testimonials.length);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold mb-6">Testimonials</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div>
          <motion.div key={testimonials[idx].id} initial={{opacity:0, x:50}} animate={{opacity:1,x:0}} transition={{duration:0.5}} className="bg-white dark:bg-slate-900 border p-6 rounded-lg shadow-lg">
            <div className="flex items-start gap-4">
              <img src={testimonials[idx].avatar} className="w-14 h-14 rounded-full" alt={testimonials[idx].name} />
              <div>
                <div className="font-semibold">{testimonials[idx].name}</div>
                <div className="text-sm text-slate-500">⭐ {testimonials[idx].rating}</div>
                <p className="mt-3 text-slate-600 dark:text-slate-300">“{testimonials[idx].comment}”</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-2 mt-4">
            <button aria-label="Previous testimonial" onClick={prev} className="px-3 py-1 border rounded">Prev</button>
            <button aria-label="Next testimonial" onClick={next} className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>

        <aside className="bg-white dark:bg-slate-900 border rounded-lg p-6 shadow-lg">
          <h3 className="font-semibold text-lg">Get the service you need</h3>
          <p className="text-sm text-slate-500 mt-2">Find qualified professionals in minutes and get 4% off your first booking.</p>
          <div className="mt-4">
            <a href="#services" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md">Find Providers</a>
          </div>
        </aside>
      </div>
    </section>
  );
}
