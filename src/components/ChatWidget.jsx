import React, {useState} from 'react';
import { motion } from 'framer-motion';

export default function ChatWidget(){
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} className="w-80 bg-white dark:bg-slate-900 border rounded-lg shadow p-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Support</div>
            <button onClick={()=>setOpen(false)} className="text-sm">Close</button>
          </div>
          <div className="mt-3 text-sm text-slate-600">Hi! This is a demo chat widget. We'll hook it to backend later.</div>
          <div className="mt-3">
            <input placeholder="Type a message" className="w-full px-3 py-2 rounded border" />
          </div>
        </motion.div>
      )}

      <button onClick={()=>setOpen(o=>!o)} className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">Chat</button>
    </div>
  );
}
