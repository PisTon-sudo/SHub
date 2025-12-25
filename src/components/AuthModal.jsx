import React, {useState, useEffect} from 'react';
import Modal from './Modal';

export default function AuthModal(){
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('login');

  useEffect(()=>{
    const handler = (e) => {
      // support both { detail: { mode: '...' } } and stringified detail for backward compatibility
      let detail = e && e.detail;
      if (typeof detail === 'string') {
        try { detail = JSON.parse(detail); } catch (err) { detail = null; }
      }
      if (detail && detail.mode) setMode(detail.mode);
      setOpen(true);
    };
    window.addEventListener('open-auth', handler);
    return ()=> window.removeEventListener('open-auth', handler);
  },[]);

  return (
    <Modal open={open} onClose={()=>setOpen(false)} title={mode === 'login' ? 'Log in' : 'Sign up'}>
      {mode === 'login' ? (
        <form className="space-y-3">
          <input className="w-full px-3 py-2 border rounded" placeholder="Email or phone" />
          <input type="password" className="w-full px-3 py-2 border rounded" placeholder="Password" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={()=>setOpen(false)} className="px-4 py-2">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded">Log in</button>
          </div>
        </form>
      ) : (
        <form className="space-y-3">
          <input className="w-full px-3 py-2 border rounded" placeholder="Full name" />
          <input className="w-full px-3 py-2 border rounded" placeholder="Email" />
          <input type="password" className="w-full px-3 py-2 border rounded" placeholder="Password" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={()=>setOpen(false)} className="px-4 py-2">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded">Sign up</button>
          </div>
        </form>
      )}
    </Modal>
  );
}