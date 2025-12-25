import React, {useState} from 'react';
import { reviews as allReviews } from '../data/reviews';
import { motion } from 'framer-motion';

export default function ReviewsList({ serviceId }){
  const list = allReviews.filter(r => r.serviceId === serviceId);
  const [idx, setIdx] = useState(0);
  if(list.length === 0) return <div className="p-4 bg-white dark:bg-slate-900 rounded">No reviews yet.</div>;

  const next = () => setIdx(i => (i+1)%list.length);
  const prev = () => setIdx(i => (i-1+list.length)%list.length);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Reviews</h4>
        <div className="flex gap-2">
          <button onClick={prev} className="px-2 py-1 border rounded">Prev</button>
          <button onClick={next} className="px-2 py-1 border rounded">Next</button>
        </div>
      </div>

      <motion.div key={list[idx].id} initial={{opacity:0, x:20}} animate={{opacity:1,x:0}} transition={{duration:0.3}} className="mt-4">
        <div className="flex items-start gap-3">
          <img src={list[idx].avatar} alt={list[idx].name} className="w-12 h-12 rounded-full" />
          <div>
            <div className="font-semibold">{list[idx].name} <span className="text-sm text-slate-500">• ⭐ {list[idx].rating}</span></div>
            <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">{list[idx].comment}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}