import React, {useState} from 'react';
import { motion } from 'framer-motion';

export default function Gallery({ images = [] }){
  const [idx, setIdx] = useState(0);
  if(!images || images.length===0) return null;
  const prev = () => setIdx(i => (i-1+images.length)%images.length);
  const next = () => setIdx(i => (i+1)%images.length);

  return (
    <div className="rounded-lg overflow-hidden shadow">
      <div className="relative h-64 sm:h-80 bg-slate-100 dark:bg-slate-800">
        <motion.img key={images[idx]} src={images[idx]} alt="gallery" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.25}} className="w-full h-full object-cover" loading="lazy" />

        <button onClick={prev} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-slate-900/70 p-2 rounded-full">‹</button>
        <button onClick={next} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-slate-900/70 p-2 rounded-full">›</button>
      </div>

      {images.length>1 && (
        <div className="flex gap-2 p-2 overflow-x-auto">
          {images.map((src,i)=> (
            <button key={i} onClick={()=>setIdx(i)} className={`w-20 h-12 rounded overflow-hidden border ${i===idx ? 'ring-2 ring-orange-400' : 'opacity-70'}`}>
              <img src={src} alt="thumb" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}