import React, {useState, useRef, useEffect} from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { notifications as initial } from '../data/notifications';

export default function NotificationBell(){
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(initial);
  const btnRef = useRef(null);

  useEffect(()=>{
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  },[]);

  const unread = items.filter(i => !i.read).length;
  const markAll = () => setItems(items.map(i => ({...i, read:true})));

  return (
    <div className="relative">
      <button ref={btnRef} aria-haspopup="true" aria-expanded={open} onClick={()=>setOpen(o=>!o)} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400">
        <BellIcon className="h-5 w-5" />
        {unread > 0 && <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full text-xs px-1">{unread}</span>}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded shadow-lg z-50">
          <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="font-semibold">Notifications</div>
            <button onClick={markAll} className="text-sm text-slate-500">Mark all</button>
          </div>
          <div className="max-h-64 overflow-auto">
            {items.map(n => (
              <div key={n.id} className={`p-3 border-b last:border-b-0 ${n.read ? 'bg-transparent' : 'bg-orange-50 dark:bg-slate-800/40'}`}>
                <div className="font-semibold text-sm">{n.title}</div>
                <div className="text-xs text-slate-500">{n.body} • {n.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
