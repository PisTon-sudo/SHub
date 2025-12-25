import React, {useState, useEffect} from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

export default function ScrollTop(){
  const [show, setShow] = useState(false);
  useEffect(()=>{
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return ()=> window.removeEventListener('scroll', onScroll);
  },[]);

  if(!show) return null;
  return (
    <button onClick={()=>window.scrollTo({top:0, behavior:'smooth'})} aria-label="Scroll to top" className="fixed right-6 bottom-6 bg-blue-600 p-3 rounded-full text-white shadow-lg hover:bg-blue-700">
      <ArrowUpIcon className="h-5 w-5" />
    </button>
  );
}