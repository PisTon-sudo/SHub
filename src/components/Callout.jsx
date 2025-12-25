import React, {useEffect, useState} from 'react';

export default function Callout(){
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    const dismissed = localStorage.getItem('calloutDismissed');
    if(!dismissed){
      setVisible(true);
    }
  }, []);

  const close = ()=>{
    localStorage.setItem('calloutDismissed','1');
    setVisible(false);
  };

  if(!visible) return null;

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-6 z-50">
      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-lg p-3 shadow-lg border border-slate-100 dark:border-slate-800">
        <div className="text-sm">🔥 <strong>20% off</strong> your first booking — use <code>PRO20</code></div>
        <a href="/signup" className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Get deal</a>
        <button onClick={close} aria-label="Dismiss promo" className="text-sm text-slate-500">Dismiss</button>
      </div>
    </div>
  );
}
