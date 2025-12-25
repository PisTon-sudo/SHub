import React, {useEffect, useState} from 'react';
import Modal from './Modal';

export default function BookingModal(){
  const [open, setOpen] = useState(false);
  const [provider, setProvider] = useState(null);

  useEffect(()=>{
    const handler = (e)=>{
      const detail = e && e.detail;
      setProvider(detail || null);
      setOpen(true);
    };
    window.addEventListener('open-book', handler);
    return ()=> window.removeEventListener('open-book', handler);
  },[]);

  return (
    <Modal open={open} onClose={()=>setOpen(false)} title={provider ? 'Book with ' + (provider.name || 'provider') : 'Book service'}>
      <form className="space-y-3">
        <input className="w-full px-3 py-2 border rounded" placeholder="Your full name" />
        <input className="w-full px-3 py-2 border rounded" placeholder="Email or phone" />
        <textarea className="w-full px-3 py-2 border rounded" placeholder="Message (optional)" />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={()=>setOpen(false)} className="px-4 py-2">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Request Booking</button>
        </div>
      </form>
    </Modal>
  );
}