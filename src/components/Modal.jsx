import React, {useEffect, useRef} from 'react';
export default function Modal({open, onClose, title, children}){
  const ref = useRef(null);

  useEffect(()=>{
    if(open) {
      const prev = document.activeElement;
      const first = ref.current && ref.current.querySelector('button, input, [tabindex]');
      if(first) first.focus();
      const onKey = (e)=> { if(e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', onKey);
      return ()=>{ window.removeEventListener('keydown', onKey); if(prev) prev.focus(); };
    }
  },[open]);

  if(!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div ref={ref} role="dialog" aria-modal="true" className="w-full max-w-md bg-white dark:bg-slate-900 rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="px-2 py-1">✕</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}